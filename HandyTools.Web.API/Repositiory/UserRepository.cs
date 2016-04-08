using HandyTools.Database;
using HandyTools.Models;
using HandyTools.Web.API.Interfaces;

namespace HandyTools.Web.API.Repositiory
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Gets the customer.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public Customer GetCustomer(string userName)
        {
            return this.Context.GetModel<Customer>(nameof(userName), userName);
        }

        /// <summary>
        /// Gets the clerk.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public Clerk GetClerk(string userName)
        {
            return this.Context.GetModel<Clerk>(nameof(userName), userName);
        }

        /// <summary>
        /// Updates the customer.
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns></returns>
        public Customer UpdateCustomer(Customer customer)
        {
            return this.Context.SetModel(customer);
        }

        /// <summary>
        /// Creates the customer.
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns></returns>
        public Customer CreateCustomer(Customer customer)
        {
            var newModel = this.Context.AddModel(customer);
            return newModel ?? new Customer();
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <param name="validateUserExists">Determines whether to check if the user account exists, prior to auth check.</param>
        /// <returns></returns>
        public int AuthenticateUser<TUser>(string userName, string password, bool validateUserExists = true) where TUser : BaseModel, IUser
        {
            if (!validateUserExists) return this.Context.AuthUser<TUser>(userName, password);

            // We only validate existance of CUstomers. Not clerks.
            if (this.Context.GetModel<TUser>(nameof(userName), userName) == null) { return -1; }

            return this.Context.AuthUser<TUser>(userName, password);
        }

        /// <summary>
        /// Validates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public bool CheckUserName(string userName)
        {
            var user = this.Context.GetModel<Customer>(nameof(userName), userName);
            return user != null;
        }
    }
}