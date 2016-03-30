namespace HandyTools.Models
{
    public class Customer : IUser
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string HomePhoneAreaCode { get; set; }

        public string HomePhoneNumber { get; set; }

        public string WorkPhoneAreaCode { get; set; }

        public string WorkPhoneNumber { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string PostalCode { get; set; }
    }
}