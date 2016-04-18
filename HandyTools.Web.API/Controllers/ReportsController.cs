using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.ViewModels;
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
        [Route("{id}")]
        public IHttpActionResult Get(int id, [FromBody] ReportRequest request)
        {
            switch (id)
            {
                case 1:
                    return Ok(this._repository.GetReport1(request.StartDate, request.EndDate));

                case 2:
                    return Ok(this._repository.GetReport2(request.StartDate, request.EndDate));

                case 3:
                    return Ok(this._repository.GetReport3(request.StartDate, request.EndDate));

                default:
                    return BadRequest();
            }
        }
    }
}