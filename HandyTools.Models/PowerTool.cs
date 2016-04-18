using HandyTools.Web.API.Enums;

namespace HandyTools.Models
{
    public class PowerTool : Tool
    {
        public override string Type { get; set; }

        public PowerTool()
        {
            this.Type = Web.API.Enums.ToolType.PowerTool.ToString();
        }
    }
}