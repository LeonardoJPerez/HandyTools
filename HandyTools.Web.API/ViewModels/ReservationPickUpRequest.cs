using System;
using System.ComponentModel.DataAnnotations;

namespace HandyTools.Web.API.ViewModels
{
    public class ReservationPickUpRequest
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public DateTime PickuUpDate { get; set; }

        [Required]
        public string PickupHandledby { get; set; }

        [Required]
        public string CCNameOnCard { get; set; }

        [Required]
        public string CCExpirationDate { get; set; }

        [Required]
        public string CCNumber { get; set; }

        [Required]
        public string CCType { get; set; }
    }
}