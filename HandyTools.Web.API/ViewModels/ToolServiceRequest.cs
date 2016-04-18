using System;

namespace HandyTools.Web.API.ViewModels
{
    public class ToolServiceRequest
    {
        public double Cost { get; set; }

        public string Clerk { get; set; }

        public int ID { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}