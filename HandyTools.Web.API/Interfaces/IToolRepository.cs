﻿using HandyTools.Models;
using HandyTools.Web.API.Enums;
using System;
using System.Collections.Generic;

namespace HandyTools.Web.API.Interfaces
{
    public interface IToolRepository
    {
        Tool CreateTool(Tool model);

        Tool UpdateTool(Tool model);

        IEnumerable<string> GetToolTypes();

        IEnumerable<Tool> GetTools(ToolType? type);

        IEnumerable<Tool> GetTools(ToolType? type, DateTime? startDate, DateTime? endDate);
    }
}