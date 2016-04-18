using HandyTools.Models;
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

        // POST api/tool/
        [HttpPost]
        public IHttpActionResult GetTools([FromBody] ToolRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return Ok(this._repository.GetTools(request.ToolType, request.StartDate, request.EndDate));
        }

        // POST api/tool/clerk
        [HttpPost]
        [Route("clerk")]
        public IHttpActionResult GetToolsForClerk([FromBody] ToolRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return Ok(this._repository.GetToolsForClerk(request.ToolType));
        }

        // POST api/tool/sale/
        [HttpPost]
        [Route("sell")]
        public IHttpActionResult MarkForSale([FromBody] ToolSaleRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            return Ok(this._repository.MarkForSale(request.ID, request.Clerk, request.SalePrice));
        }

        // POST api/tool/service/
        [HttpPost]
        [Route("service")]
        public IHttpActionResult MarkForService([FromBody] ToolServiceRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            var serviceOrder = new ServiceOrder()
            {
                Cost = request.Cost,
                DateCompleted = request.EndDate,
                DateCreated = request.StartDate,
                ServiceBy = request.Clerk,
                ToolID = request.ID
            };

            return Ok(this._repository.MarkForService(serviceOrder));
        }

        // POST api/tool/new
        [HttpPost]
        [Route("new")]
        public IHttpActionResult AddTool([FromBody] ToolRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            var tool = new Tool
            {
                Description = request.Description,
                OriginalPrice = request.OriginalPrice,
                DailyRentalCharge = request.DailyRentalCharge,
                Deposit = request.Deposit,
                LongDescription = request.LongDescription,
                Type = request.ToolType.ToString()
            };

            var newTool = this._repository.CreateTool(tool);
            if (request.ToolType == Enums.ToolType.PowerTool)
            {
                this._repository.AddAccessory(newTool.ID, request.Accessories);
            }

            return Ok(newTool);
        }
    }
}