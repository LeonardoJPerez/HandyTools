using System.ComponentModel.DataAnnotations;

namespace HandyTools.Web.API.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Type { get; set; }
    }
}