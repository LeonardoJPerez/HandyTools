using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using System.Web.Http;

namespace HandyTools.Web.API.Controllers
{
    /// <summary>
    /// Provides functionality to the api/reservation/ route.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    [RoutePrefix("api/reservation")]
    public class ReservationController : ApiController
    {
        protected IReservationRepository _repository;

        public ReservationController(IReservationRepository repository)
        {
            this._repository = repository;
        }

        // GET api/reservation/{username}
        /// <summary>
        /// Gets the list of Reservations by Customer's Username.
        /// </summary>
        /// <param name="username">The username of the Customer.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{username}")]
        public IHttpActionResult Get(string username)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            if (string.IsNullOrEmpty(username)) { return BadRequest("Missing Username value"); }

            return Ok(this._repository.GetReservations(username));
        }

        // GET api/reservation/{id}
        [HttpGet]
        [Route("{id}")]
        public Reservation Get(int id)
        {
            return new Reservation();
        }

        [HttpPost]
        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        [HttpPut]
        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}