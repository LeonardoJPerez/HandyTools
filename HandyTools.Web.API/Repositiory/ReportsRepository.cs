using HandyTools.Database;
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

        public IEnumerable<string> GetReport1()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetReport2()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetReport3()
        {
            throw new NotImplementedException();
        }
    }
}