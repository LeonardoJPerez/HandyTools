using HandyTools.Web.API.Enums;
using System;

namespace HandyTools.Web.API.ViewModels
{
    public class ToolRequest
    {
        public DateTime EndDate { get; set; }

        public DateTime StartDate { get; set; }

        public ToolType? ToolType { get; set; }

        public double DailyRentalCharge { get; set; }

        public double Deposit { get; set; }

        public string Description { get; set; }

        public string LongDescription { get; set; }

        public double OriginalPrice { get; set; }

        public double SalePrice { get; set; }
    }
}