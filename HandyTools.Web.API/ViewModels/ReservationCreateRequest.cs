using HandyTools.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HandyTools.Web.API.ViewModels
{
    public class ReservationCreateRequest
    {
        public string CustomerUserName { get; set; }

        public double? DailyTotal
        {
            get { return this.Tools.Sum(t => t.DailyRentalCharge); }
        }

        public double? DepositTotal
        {
            get { return this.Tools.Sum(t => t.Deposit); }
        }

        public DateTime EndDate { get; set; }

        public DateTime StartDate { get; set; }

        public IEnumerable<Tool> Tools { get; set; }
    }
}