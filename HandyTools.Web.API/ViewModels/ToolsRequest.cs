using HandyTools.Web.API.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace HandyTools.Web.API.ViewModels
{
    public class ToolRequest
    {
        [Required]
        public ToolType ToolType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}