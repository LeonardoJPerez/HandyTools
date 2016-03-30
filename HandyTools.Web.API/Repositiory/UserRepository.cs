using HandyTools.Models;

namespace HandyTools.Web.API.Repositiory
{
    public class UserRepository : BaseRepository
    {
        /// <summary>
        /// Gets the customer.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public Customer GetCustomer(string userName)
        {
            return this._db.GetModel<Customer>(nameof(userName), userName);
        }

        /// <summary>
        /// Gets the clerk.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public Clerk GetClerk(string userName)
        {
            return this._db.GetModel<Clerk>(nameof(userName), userName);
        }

        /// <summary>
        /// Updates the customer.
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns></returns>
        public Customer UpdateCustomer(Customer customer)
        {
            return this._db.SetModel(customer);
        }

        /// <summary>
        /// Creates the customer.
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns></returns>
        public Customer CreateCustomer(Customer customer)
        {
            return this._db.AddModel(customer);
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <param name="validateUserExists">Determines whether to check if the user account exists, prior to auth check.</param>
        /// <returns></returns>
        public int AuthenticateUser<TUser>(string userName, string password, bool validateUserExists = true) where TUser : IUser
        {
            if (!validateUserExists) return this._db.AuthUser<TUser>(userName, password);

            // We only validate existance of CUstomers. Not clerks.
            if (this._db.GetModel<TUser>(nameof(userName), userName) == null) { return -1; }

            return this._db.AuthUser<TUser>(userName, password);
        }

        /// <summary>
        /// Validates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public bool ValidateUser(string userName)
        {
            var user = this._db.GetModel<Customer>(nameof(userName), userName);
            return user != null;
        }
    }
}