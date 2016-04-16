using HandyTools.Web.API.Enums;

namespace HandyTools.Models
{
    public class ConstructionTool : Tool
    {
        public override string Type { get; set; }

        public ConstructionTool()
        {
            this.Type = ToolType.Construction.ToString();
        }
    }
}