using HandyTools.Database;
using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using System;
using System.Collections.Generic;

namespace HandyTools.Web.API.Repositiory
{
    public class ReportsRepository : BaseRepository, IReportRepository
    {
        public ReportsRepository(IDbContext context) : base(context)
        {
        }

        public IEnumerable<Report1> GetReport1(DateTime startDate, DateTime endDate)
        {
            var parameters = new Dictionary<object, object>()
            {
                { nameof(startDate), startDate },
                { nameof(endDate), endDate}
            };

            return this.Context.Execute<Report1, object>("GetReportRevenuePerTool", parameters);
        }

        public IEnumerable<Report2> GetReport2(DateTime startDate, DateTime endDate)
        {
            var parameters = new Dictionary<object, object>()
            {
                { nameof(startDate), startDate },
                { nameof(endDate), endDate}
            };

            return this.Context.Execute<Report2, object>("GetReportRentedTools", parameters);
        }

        public IEnumerable<Report3> GetReport3(DateTime startDate, DateTime endDate)
        {
            var parameters = new Dictionary<object, object>()
            {
                { nameof(startDate), startDate },
                { nameof(endDate), endDate}
            };

            return this.Context.Execute<Report3, object>("GetReportEmployeeOfTheMonth", parameters);
        }
    }
}