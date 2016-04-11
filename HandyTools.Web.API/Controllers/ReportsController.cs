using HandyTools.Web.API.Enums;
using HandyTools.Web.API.Interfaces;
using System.Web.Http;

namespace HandyTools.Web.API.Controllers
{
    [RoutePrefix("api/reports")]
    public class ReportsController : ApiController
    {
        protected IReportRepository _repository;

        public ReportsController(IReportRepository repository)
        {
            this._repository = repository;
        }

        // GET api/reports/5
        [HttpGet]
        [Route("{type}")]
        public IHttpActionResult Get(ReportType type)
        {
            switch (type)
            {
                case ReportType.Report1:
                    return Ok(this._repository.GetReport1());
                    break;

                case ReportType.Report2:
                    return Ok(this._repository.GetReport1());
                    break;

                case ReportType.Report3:
                    return Ok(this._repository.GetReport1());
                    break;

                default:
                    return BadRequest();
            }
        }
    }
}