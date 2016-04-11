using HandyTools.Database;
using HandyTools.Models;
using HandyTools.Web.API.Enums;
using HandyTools.Web.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HandyTools.Web.API.Repositiory
{
    public class ToolRepository : BaseRepository, IToolRepository
    {
        public ToolRepository(IDbContext context) : base(context)
        {
        }

        public Tool CreateTool(Tool model)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tool> GetTools(ToolType? type)
        {
            switch (type)
            {
                case ToolType.Construction:
                    return this.Context.GetModels<ConstructionTool>("", "", useView: true);

                case ToolType.Hand:
                    return this.Context.GetModels<HandTool>("", "", useView: true);

                case ToolType.PowerTool:
                    return this.Context.GetModels<PowerTool>("", "", useView: true);

                default:
                    return this.Context.GetModels<Tool>("", "");
            }
        }

        public Tool UpdateTool(Tool model)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetToolTypes()
        {
            return Enum.GetNames(typeof (ToolType)).ToList();
        }
    }
}