using System;
using System.ComponentModel.DataAnnotations;

namespace HandyTools.Web.API.ViewModels
{
    public class ReservationDropOffRequest
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public DateTime DropOffDate { get; set; }

        [Required]
        public string DropOffHandledBy { get; set; }
    }
}