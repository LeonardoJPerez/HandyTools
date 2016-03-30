namespace HandyTools.Models
{
    public interface IUser
    {
        string LastName { get; set; }

        string FirstName { get; set; }

        string UserName { get; set; }

        string Password { get; set; }
    }
}