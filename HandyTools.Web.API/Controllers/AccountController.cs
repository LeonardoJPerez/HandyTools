using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.Models;
using System.Web.Http;
using System.Web.Http.Description;

namespace HandyTools.Web.API.Controllers
{
    [RoutePrefix("api/profile")]
    public class AccountController : ApiController
    {
        protected IUserRepository _repository;

        public AccountController(IUserRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Profile/{id}
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetByUserName(string id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (string.IsNullOrEmpty(id)) { return BadRequest(ModelState); }

            return Ok(this._repository.GetCustomer(id));
        }

        // POST: api/Profile/{id}
        [HttpPost]
        [Route("{id}")]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult UpdateCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (string.IsNullOrEmpty(customer.UserName)) { return BadRequest(ModelState); }

            return Ok(this._repository.UpdateCustomer(customer));
        }

        // PUT: api/Profile/
        [HttpPut]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult AddCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(this._repository.UpdateCustomer(customer));
        }

        // POST: api/Profile/login
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(Login login)
        {
            if (ModelState.IsValid)
            {
                switch (login.Type.ToLower())
                {
                    case "customer":
                        return Ok<LoginResponse>(new LoginResponse
                        {
                            UserName = login.UserName,
                            Code = this._repository.AuthenticateUser<Customer>(login.UserName, login.Password),
                            Role = login.Type
                        });

                    case "clerk":
                        return Ok<LoginResponse>(new LoginResponse
                        {
                            UserName = login.UserName,
                            Code = this._repository.AuthenticateUser<Clerk>(login.UserName, login.Password, false),
                            Role = login.Type
                        });

                    default:
                        return BadRequest("Invalid Parameters.");
                }
            }

            return BadRequest("Invalid Parameters.");
        }
    }
}