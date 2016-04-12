using System.Collections.Generic;

namespace HandyTools.Web.API.Interfaces
{
    public interface IReportRepository
    {
        IEnumerable<string> GetReport1();

        IEnumerable<string> GetReport2();

        IEnumerable<string> GetReport3();
    }
}