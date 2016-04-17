using HandyTools.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Reflection;

namespace HandyTools.Database
{
    public class HandyToolsDb : IDbContext, IDisposable
    {
        /// <summary>
        /// Gets the connection string.
        /// </summary>
        /// <value>
        /// The connection string.
        /// </value>
        public static string ConnectionString => ConfigurationManager.ConnectionStrings["HandyToolsDb"].ConnectionString;

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <typeparam name="TUserModel">The type of the user model.</typeparam>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public int AuthUser<TUserModel>(string userName, string password) where TUserModel : BaseModel, IUser
        {
            var parameters = new List<MySqlParameter>
            {
                new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter("userName", userName)),
                new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter("password", password))
            };

            return this.ExecuteScalarStoredProcedure<int>($"Auth{typeof(TUserModel).Name}", parameters.ToArray());
        }

        /// <summary>
        /// Gets the models.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="useView">if set to <c>true</c> [use view].</param>
        /// <returns></returns>
        public IEnumerable<TModel> GetModels<TModel>(string whereClause = "") where TModel : BaseModel
        {
            return this.GetModels<TModel>(keyValue: null, useView: true, pluralize: true, whereClause: whereClause);
        }

        public IEnumerable<TModel> GetModels<TModel>(Dictionary<object, object> keyValues) where TModel : BaseModel
        {
            return this.GetModels<TModel>(keyValue: keyValues, useView: false, pluralize: true, whereClause: string.Empty);
        }

        /// <summary>
        /// Gets the Models internally.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="useView">if set to <c>true</c> [use view].</param>
        /// <param name="pluralize">if set to <c>true</c> [pluralize].</param>
        /// <returns></returns>
        private IEnumerable<TModel> GetModels<TModel>(Dictionary<object, object> keyValue, bool useView = false, bool pluralize = false, string whereClause = "") where TModel : BaseModel
        {
            var entityName = $"{typeof(TModel).Name}";
            if (pluralize) { entityName = $"{entityName}s"; }

            if (useView)
            {
                var query = $"select * from v{entityName}";
                if (!string.IsNullOrEmpty(whereClause))
                {
                    query = $"{query} where {whereClause}";
                }

                var returnValue = (DataTable)this.Execute($"{query};", CommandType.Text, false, null);
                return returnValue.TableToList<TModel>();
            }
            else
            {
                if (keyValue != null)
                {
                    List<MySqlParameter> parameters = new List<MySqlParameter>();

                    foreach (var kvp in keyValue)
                    {
                        var prop = typeof(TModel).GetProperty(kvp.Key.ToString(), BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                        if (prop != null)
                        {
                            parameters.Add(new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter(prop.Name, kvp.Value)));
                        }
                        else
                        {
                            parameters.Add(new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter(kvp.Key.ToString(), kvp.Value)));
                        }
                    }

                    return this.ExecuteStoredProcedure($"Get{entityName}", parameters.ToArray()).TableToList<TModel>();
                }
                else
                {
                    return this.ExecuteStoredProcedure($"Get{entityName}", null).TableToList<TModel>();
                }
            }
        }

        /// <summary>
        /// Gets the model.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="useView">if set to <c>true</c> [use view].</param>
        /// <returns></returns>
        public TModel GetModel<TModel>(object key, object value) where TModel : BaseModel
        {
            var param = new Dictionary<object, object>() { { key.ToString(), value } };
            return this.GetModels<TModel>(param, useView: false, whereClause: "").FirstOrDefault();
        }

        /// <summary>
        /// Sets (Update) the model into the db.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public TModel SetModel<TModel>(TModel model) where TModel : BaseModel
        {
            var props = typeof(TModel).GetProperties();
            var parameters = new List<MySqlParameter>();

            foreach (var p in props)
            {
                if (p.GetValue(model) != null)
                {
                    parameters.Add(new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter(p.Name, p.GetValue(model))));
                }
            }

            var returnValue = this.ExecuteStoredProcedure($"Set{typeof(TModel).Name}", parameters.ToArray());
            return returnValue.TableToList<TModel>().FirstOrDefault();
        }

        /// <summary>
        /// Adds the model to the db.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public TModel AddModel<TModel>(TModel model) where TModel : BaseModel
        {
            var props = typeof(TModel).GetProperties();
            var parameters = new List<MySqlParameter>();

            foreach (var p in props)
            {
                parameters.Add(new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter(p.Name, p.GetValue(model))));
            }

            var returnValue = this.ExecuteStoredProcedure($"Insert{typeof(TModel).Name}", parameters.ToArray());
            return returnValue.TableToList<TModel>().FirstOrDefault();
        }

        public IEnumerable<TModel> Execute<TModel, TParam>(string spName, Dictionary<TParam, TParam> parameters, CommandType cmdType = CommandType.StoredProcedure) where TModel : BaseModel
        {
            var mysqlParameters = new List<MySqlParameter>();
            foreach (var kvp in parameters)
            {
                mysqlParameters.Add(new MySqlParameter(new MySql.Data.MySqlClient.MySqlParameter(kvp.Key.ToString(), kvp.Value)));
            }

            var result = (DataTable)this.Execute(spName, CommandType.StoredProcedure, false, mysqlParameters.ToArray());
            return result.TableToList<TModel>();
        }

        #region Private Methods

        /// <summary>
        /// Executes the scalar stored procedure.
        /// </summary>
        /// <typeparam name="TType">The type of the type.</typeparam>
        /// <param name="cmd">The command.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
        private TType ExecuteScalarStoredProcedure<TType>(string cmd, params MySqlParameter[] parameters)
        {
            var rv = this.Execute(cmd, CommandType.StoredProcedure, true, parameters);
            return (TType)Convert.ChangeType(rv, typeof(TType));
        }

        /// <summary>
        /// Executes the stored procedure.
        /// </summary>
        /// <param name="spName">Name of the sp.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
        private DataTable ExecuteStoredProcedure(string spName, params MySqlParameter[] parameters)
        {
            return (DataTable)this.Execute(spName, CommandType.StoredProcedure, false, parameters);
        }

        /// <summary>
        /// Executes the specified command text.
        /// </summary>
        /// <param name="cmdText">The command text.</param>
        /// <param name="cmdType">Type of the command.</param>
        /// <param name="returnScalar">if set to <c>true</c> [return scalar].</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
        private object Execute(string cmdText, CommandType cmdType, bool returnScalar, params MySqlParameter[] parameters)
        {
            using (var connection = new MySqlConnection(ConnectionString))
            using (var adapter = new MySqlDataAdapter())
            {
                var cmd = new MySqlCommand(cmdText, connection)
                {
                    CommandType = cmdType
                };

                if (parameters != null)
                {
                    foreach (var param in parameters)
                    {
                        cmd.Parameters.AddWithValue(param.Parameter.ParameterName, param.Parameter.Value);
                        cmd.Parameters[param.Parameter.ParameterName].Direction = param.Direction;
                    }
                }

                connection.Open();

                object result = null;
                MySqlDataReader readerResult = null;

                try
                {
                    var dt = new DataTable();
                    readerResult = cmd.ExecuteReader();
                    adapter.SelectCommand = cmd;

                    switch (cmdType)
                    {
                        case CommandType.Text:
                            dt.Load(readerResult);
                            result = dt;
                            break;

                        case CommandType.StoredProcedure:
                            if (returnScalar)
                            {
                                while (readerResult.Read())
                                {
                                    result = readerResult.GetValue(0);
                                }
                            }
                            else
                            {
                                dt.Load(readerResult);
                                result = dt;
                            }

                            break;

                        case CommandType.TableDirect:
                            break;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                finally
                {
                    readerResult?.Close();
                    connection.Close();
                }

                return result;
            }
        }

        #endregion Private Methods

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
        }
    }
}