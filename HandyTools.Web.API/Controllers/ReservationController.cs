using HandyTools.Models;
using HandyTools.Web.API.Helpers;
using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.ViewModels;
using System.Linq;
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

        // GET api/reservation/{id}
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            if (id <= 0) { return BadRequest(); }
            return Ok(this._repository.GetReservation(id));
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var reservations = this._repository.GetReservations(null);
            var reservationsViewModels = reservations.Select(r =>
            new ReservationViewModel
            {
                ID = r.ID,
                CustomerUserName = r.CustomerUserName,
                CustomerName = r.CustomerName,
                DateCreated = r.ToUnixTime(r.DateCreated),
                StartDate = r.ToUnixTime(r.StartDate),
                EndDate = r.ToUnixTime(r.EndDate),
                Deposit = r.Deposit,
                RentalPrice = r.RentalPrice,
                DropOffDate = r.ToUnixTime(r.DropOffDate),
                DropOffClerk = r.DropOffClerk,
                PickUpDate = r.ToUnixTime(r.PickUpDate),
                PickUpClerk = r.PickUpClerk,
                Tools = r.Tools,
                ToolItems = r.ToolItems
            });

            return Ok(reservationsViewModels);
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

            var reservations = this._repository.GetReservations(decodedUsername);
            var reservationsViewModels = reservations.Select(r =>
            new ReservationViewModel
            {
                ID = r.ID,
                CustomerUserName = r.CustomerUserName,
                CustomerName = r.CustomerName,
                DateCreated = r.ToUnixTime(r.DateCreated),
                StartDate = r.ToUnixTime(r.StartDate),
                EndDate = r.ToUnixTime(r.EndDate),
                Deposit = r.Deposit,
                RentalPrice = r.RentalPrice,
                DropOffDate = r.ToUnixTime(r.DropOffDate),
                DropOffClerk = r.DropOffClerk,
                PickUpDate = r.ToUnixTime(r.PickUpDate),
                PickUpClerk = r.PickUpClerk,
                Tools = r.Tools
            });

            return Ok(reservationsViewModels);
        }

        // POST api/reservation
        [HttpPost]
        public IHttpActionResult Post([FromBody] ReservationCreateRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            if (request.StartDate > request.EndDate || request.EndDate < request.StartDate)
            {
                return BadRequest("Date Range invalid.");
            }

            if (request.Tools.Count() > 50)
            {
                return BadRequest("Maximum amount of Tools (50+) reached.");
            }

            if (!request.Tools.Any())
            {
                return BadRequest("Tools collection empty.");
            }

            if (request.StartDate > request.EndDate || request.EndDate < request.StartDate)
            {
                return BadRequest("Missing Username value.");
            }

            if (request.StartDate > request.EndDate || request.EndDate < request.StartDate)
            {
                return BadRequest("Missing Username value.");
            }

            // Add customer username check
            var reservation = new Reservation
            {
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Deposit = request.DepositTotal,
                RentalPrice = request.DailyTotal,
                CustomerUserName = request.CustomerUserName,
            };

            return Ok(this._repository.CreateReservation(reservation, request.Tools));
        }

        // POST api/reservation/pickup/
        [HttpPost]
        [Route("pickup")]
        public IHttpActionResult PickUp([FromBody] ReservationPickUpRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            if (string.IsNullOrEmpty(request.PickupHandledby))
            {
                return BadRequest("Clerk Informatin missing.");
            }

            if (request.ID == 0)
            {
                return BadRequest("Reservation ID missing.");
            }

            // Add customer username check
            var reservation = new Reservation
            {
                PickUpClerk = request.PickupHandledby,
                PickUpDate = request.PickuUpDate,
                ID = request.ID,
                CCNameOnCard = request.CCNameOnCard,
                CCNumber = request.CCNumber,
                CCExpirationDate = request.CCExpirationDate,
                CCTYype = request.CCType
            };

            return Ok(this._repository.UpdateReservationPickUp(reservation));
        }

        // POST api/reservation/dropoff/
        [HttpPost]
        [Route("dropoff")]
        public IHttpActionResult DropOff([FromBody] ReservationDropOffRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            if (string.IsNullOrEmpty(request.DropOffHandledBy))
            {
                return BadRequest("Clerk Informatin missing.");
            }

            if (request.ID == 0)
            {
                return BadRequest("Reservation ID missing.");
            }

            // Add customer username check
            var reservation = new Reservation
            {
                DropOffClerk = request.DropOffHandledBy,
                DropOffDate = request.DropOffDate,
                ID = request.ID,
            };

            return Ok(this._repository.UpdateReservationDropOff(reservation));
        }
    }
}