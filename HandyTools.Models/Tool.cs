using System;

namespace HandyTools.Models
{
    public class Tool : BaseModel, IIdentifier
    {
        public double DailyRentalCharge { get; set; }

        public double Deposit { get; set; }

        public string Description { get; set; }

        public string ID { get; set; }

        public DateTime LastServiced { get; set; }

        public string LongDescription { get; set; }

        public double OriginalPrice { get; set; }

        public double SalePrice { get; set; }
        public string SoldBy { get; set; }

        public DateTime SoldDate { get; set; }

        public virtual string Type { get; protected set; }
    }
}