namespace HandyTools.Models
{
    public class Report1 : BaseModel
    {
        public string ID { get; set; }

        public string Description { get; set; }

        public double Revenue { get; set; }

        public double Cost { get; set; }

        public double Profit { get; set; }
    }

    public class Report2 : BaseModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int Reservations { get; set; }

        public int Tools { get; set; }
    }

    public class Report3 : BaseModel
    {
        public string ClerkID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int HandledPickups { get; set; }

        public int HandledDropoffs { get; set; }

        public int Total { get; set; }
    }
}