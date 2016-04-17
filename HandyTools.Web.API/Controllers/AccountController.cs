using HandyTools.Models;
using HandyTools.Web.API.Enums;
using HandyTools.Web.API.Helpers;
using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.ViewModels;
using System.Text.RegularExpressions;
using System.Threading;
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

            var username = UserHelper.DecodeUser(id);
            if (!this.IsValidUserName(username)) { return BadRequest(ModelState); }

            return Ok(this._repository.GetCustomer(username));
        }

        // POST: api/account/
        [HttpPost]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult AddCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(this._repository.CreateCustomer(customer));
        }

        // PUT: api/account/
        [HttpPut]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult UpdateCustomer([FromBody] Customer customer)
        {
            Thread.Sleep(1000);

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (string.IsNullOrEmpty(customer.UserName)) { return BadRequest(ModelState); }

            return Ok(this._repository.UpdateCustomer(customer));
        }

        // POST: api/account/login
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(LoginRequest loginViewModel)
        {
            if (ModelState.IsValid)
            {
                switch (loginViewModel.Role)
                {
                    case UserRole.Customer:
                        var code = this._repository.AuthenticateUser<Customer>(loginViewModel.UserName, loginViewModel.Password);
                        return Ok(new LoginViewModel
                        {
                            UserName = loginViewModel.UserName,
                            Code = code,
                            Role = code == 1 ? UserRole.Customer : UserRole.NewCustomer
                        });

                    case UserRole.Clerk:
                        return Ok(new LoginViewModel
                        {
                            UserName = loginViewModel.UserName,
                            Code = this._repository.AuthenticateUser<Clerk>(loginViewModel.UserName, loginViewModel.Password, false),
                            Role = loginViewModel.Role
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