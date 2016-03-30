using HandyTools.Models;
using HandyTools.Web.API.Models;
using HandyTools.Web.API.Repositiory;
using System.Web.Http;

namespace HandyTools.Web.API.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        protected UserRepository _repository;

        public AccountController()
        {
            _repository = new UserRepository();
        }

        // GET: api/Profile/{id}
        [HttpGet]
        [Route("{id}")]
        public Customer GetByUserName(string id)
        {
            return this._repository.GetCustomer(id);
        }

        // PUT: api/Profile/{id}
        [HttpPut]
        [Route("{id}")]
        public Customer UpdateCustomer([FromBody] Customer customer)
        {
            return this._repository.UpdateCustomer(customer);
        }

        // POST: api/Profile/
        [HttpPost]
        public Customer AddCustomer([FromBody] Customer customer)
        {
            return this._repository.UpdateCustomer(customer);
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
                            Code = this._repository.AuthenticateUser<Customer>(login.UserName, login.Password)
                        });

                    case "clerk":
                        return Ok<LoginResponse>(new LoginResponse
                        {
                            UserName = login.UserName,
                            Code = this._repository.AuthenticateUser<Clerk>(login.UserName, login.Password, false)
                        });

                    default:
                        return BadRequest("Invalid Parameters.");
                }
            }

            return BadRequest("Invalid Parameters.");
        }
    }
}