using System;
using System.Collections.Generic;
using System.Data;

namespace HandyTools.Database
{
    public static class DataTableExtensions
    {
        /// <summary>
        /// Converts a DataTable to a List<T> of objects.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table">The table.</param>
        /// <returns></returns>
        public static List<T> TableToList<T>(this DataTable table)
        {
            var rez = new List<T>();
            foreach (DataRow rw in table.Rows)
            {
                var item = Activator.CreateInstance<T>();
                foreach (DataColumn cl in table.Columns)
                {
                    var pi = typeof(T).GetProperty(cl.ColumnName);
                    if (pi == null || rw[cl] == DBNull.Value) continue;

                    var propType = Nullable.GetUnderlyingType(pi.PropertyType) ?? pi.PropertyType;
                    pi.SetValue(item, Convert.ChangeType(rw[cl], propType), new object[0]);
                }
                rez.Add(item);
            }
            return rez;
        }
    }
}