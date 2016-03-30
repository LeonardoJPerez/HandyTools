namespace HandyTools.Models
{
    public class Clerk : IUser
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}