using HandyTools.Models;
using HandyTools.Web.API.Enums;
using HandyTools.Web.API.Interfaces;
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

        // GET api/tool/{type}
        [HttpGet]
        [Route("{type}")]
        public IHttpActionResult Get(ToolType type)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return Ok(this._repository.GetTools(type));
        }

        [HttpPut]
        // PUT api/reservation
        public IHttpActionResult Put(int id, [FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return BadRequest("Missing Username value");
        }
    }
}