using HandyTools.Web.API.Enums;
using System.ComponentModel.DataAnnotations;

namespace HandyTools.Web.API.ViewModels
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public UserRole Role { get; set; }
    }
}