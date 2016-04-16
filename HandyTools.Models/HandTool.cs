﻿using HandyTools.Web.API.Enums;

namespace HandyTools.Models
{
    public class HandTool : Tool
    {
        public override string Type { get; set; }

        public HandTool()
        {
            this.Type = ToolType.Hand.ToString();
        }
    }
}