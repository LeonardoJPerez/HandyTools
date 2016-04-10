using HandyTools.Web.API.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace HandyTools.Web.API.ViewModels
{
    public class LoginResponseViewModel
    {
        public string UserName { get; set; }

        public int Code { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public UserRole Role { get; set; }
    }
}