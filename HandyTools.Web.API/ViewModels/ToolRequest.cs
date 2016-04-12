using HandyTools.Web.API.Enums;
using System;

namespace HandyTools.Web.API.ViewModels
{
    public class ToolRequest
    {
        public DateTime EndDate { get; set; }

        public DateTime StartDate { get; set; }

        public ToolType ToolType { get; set; }
    }
}