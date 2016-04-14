﻿using HandyTools.Web.API.Enums;

namespace HandyTools.Models
{
    public class PowerTool : Tool
    {
        public override string Type { get; protected set; }

        public PowerTool()
        {
            this.Type = ToolType.PowerTool.ToString();
        }
    }
}