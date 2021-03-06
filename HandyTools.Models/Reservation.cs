﻿using System;
using System.Collections.Generic;

namespace HandyTools.Models
{
    public class Reservation : BaseModel, IIdentifier
    {
        public int ID { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string CustomerUserName { get; set; }

        public string CustomerName { get; set; }

        public DateTime? PickUpDate { get; set; }

        public DateTime? DropOffDate { get; set; }

        public string PickUpClerk { get; set; }

        public string DropOffClerk { get; set; }

        public string CCNameOnCard { get; set; }

        public string CCExpirationDate { get; set; }

        public string CCNumber { get; set; }

        public string CCTYype { get; set; }

        public string Tools { get; set; }

        public string ToolIDs { get; set; }

        public IEnumerable<Tool> ToolItems { get; set; }

        public double? Deposit { get; set; }

        public double? RentalPrice { get; set; }

        public long ToUnixTime(DateTime? date)
        {
            if (!date.HasValue) { return 0; }
            return (date.Value.ToUniversalTime().Ticks - 621355968000000000) / 10000;
        }
    }
}