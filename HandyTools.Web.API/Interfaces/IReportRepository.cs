using HandyTools.Models;
using System;
using System.Collections.Generic;

namespace HandyTools.Web.API.Interfaces
{
    public interface IReportRepository
    {
        IEnumerable<Report1> GetReport1(DateTime startDate, DateTime endDate);

        IEnumerable<Report2> GetReport2(DateTime startDate, DateTime endDate);

        IEnumerable<Report3> GetReport3(DateTime startDate, DateTime endDate);
    }
}