using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.Models;
using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Description;

namespace HandyTools.Web.API.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        protected IUserRepository _repository;

        public AccountController(IUserRepository repository)
        {
            _repository = repository;
        }

        // GET: api/account/{id}
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetByUserName(string id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (string.IsNullOrEmpty(id)) { return BadRequest(ModelState); }

            byte[] data = Convert.FromBase64String(id);
            string username = Encoding.UTF8.GetString(data);

            if (!this.IsValidUserName(username)) { return BadRequest(ModelState); }

            return Ok(this._repository.GetCustomer(username));
        }

        // POST: api/account/{id}
        [HttpPost]
        [Route("{id}")]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult UpdateCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (string.IsNullOrEmpty(customer.UserName)) { return BadRequest(ModelState); }

            return Ok(this._repository.UpdateCustomer(customer));
        }

        // PUT: api/account/
        [HttpPut]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult AddCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(this._repository.UpdateCustomer(customer));
        }

        // POST: api/account/login
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

        #region Private Methods

        private bool IsValidUserName(string username)
        {
            return Regex.IsMatch(username,
               @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
               @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
               RegexOptions.IgnoreCase);
        }

        #endregion Private Methods
    }
}