using System.Data;

namespace HandyTools.Database
{
    public class MySqlParameter
    {
        public MySql.Data.MySqlClient.MySqlParameter Parameter { get; set; }

        public ParameterDirection Direction { set; get; } = ParameterDirection.Input;

        public MySqlParameter(MySql.Data.MySqlClient.MySqlParameter parameter)
        {
            this.Parameter = parameter;
        }

        public MySqlParameter()
        {
        }
    }
}