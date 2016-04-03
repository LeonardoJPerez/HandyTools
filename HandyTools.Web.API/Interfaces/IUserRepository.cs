using HandyTools.Models;

namespace HandyTools.Web.API.Interfaces
{
    public interface IUserRepository
    {
        Customer GetCustomer(string userName);

        Clerk GetClerk(string userName);

        Customer UpdateCustomer(Customer customer);

        Customer CreateCustomer(Customer customer);

        int AuthenticateUser<TUser>(string userName, string password, bool validateUserExists = true) where TUser : BaseModel, IUser;

        bool CheckUserName(string userName);
    }
}