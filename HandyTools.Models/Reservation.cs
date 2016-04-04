using System;

namespace HandyTools.Models
{
    public class Reservation : BaseModel, IIdentifier
    {
        public string ID { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string CustomerUserName { get; set; }

        public DateTime PickUpDate { get; set; }

        public DateTime DropOffDate { get; set; }

        public string PickUpHandledBy { get; set; }

        public string DropOffHandledBy { get; set; }

        public string CCNameOnCard { get; set; }

        public string CCExpirationDate { get; set; }

        public string CCNumber { get; set; }

        public string CCTYype { get; set; }

        public string Tools { get; set; }

        public double? Deposit { get; set; }

        public double? RentalPrice { get; set; }

        public string PickUpClerk { get; set; }

        public string DropOffClerk { get; set; }
    }
}