using System;

namespace HandyTools.Models
{
    public class ServiceOrder : BaseModel, IIdentifier
    {
        public string ID { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateCompleted { get; set; }

        public double Cost { get; set; }

        public string ServiceBy { get; set; }

        public int ToolID { get; set; }
    }
}