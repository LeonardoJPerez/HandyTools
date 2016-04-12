using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.ViewModels;
using System.Web.Http;

namespace HandyTools.Web.API.Controllers
{
    /// <summary>
    /// Provides functionality to the api/reservation/ route.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    [RoutePrefix("api/tool")]
    public class ToolController : ApiController
    {
        protected IToolRepository _repository;

        public ToolController(IToolRepository repository)
        {
            this._repository = repository;
        }

        // GET api/tool/types
        [HttpGet]
        [Route("types")]
        public IHttpActionResult Types()
        {
            return Ok(this._repository.GetToolTypes());
        }

        // GET api/tool/
        [HttpPost]
        public IHttpActionResult GetTools([FromBody] ToolRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return Ok(this._repository.GetTools(request.ToolType, request.StartDate, request.EndDate));
        }
    }
}