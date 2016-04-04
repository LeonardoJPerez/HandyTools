using HandyTools.Models;
using HandyTools.Web.API.Helpers;
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
        [Route("getbyuser/{username}")]
        public IHttpActionResult GetByUser(string username)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            if (string.IsNullOrEmpty(username)) { return BadRequest("Missing Username value"); }

            var decodedUsername = UserHelper.DecodeUser(username);
            return Ok(this._repository.GetReservations(decodedUsername));
        }

        // GET api/reservation/{id}
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            if (id <= 0) { return BadRequest(); }
            return Ok(this._repository.GetReservation(id));
        }

        [HttpPut]
        // PUT api/reservation
        public IHttpActionResult Put(int id, [FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            if (string.IsNullOrEmpty(""))
            {
                return BadRequest("Missing Username value");
            }

            // Add Date Checks
            // Add Tools limit checks
            // Add customer username check
            // Add Credit card information check.
 
            return Ok(this._repository.CreateReservation(reservation));
        }
    }
}