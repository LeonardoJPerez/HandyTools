﻿using System;

namespace HandyTools.Web.API.ViewModels
{
    public class ReservationViewModel
    {
        public string ID { get; set; }

        public long DateCreated { get; set; }

        public long StartDate { get; set; }

        public long EndDate { get; set; }

        public string CustomerUserName { get; set; }

        public long PickUpDate { get; set; }

        public long DropOffDate { get; set; }

        public string PickUpHandledBy { get; set; }

        public string DropOffHandledBy { get; set; }

        public string Tools { get; set; }

        public double? Deposit { get; set; }

        public double? RentalPrice { get; set; }
    }
}