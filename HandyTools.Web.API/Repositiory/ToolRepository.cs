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

        public Tool CreateTool(Tool tool)
        {
            var newModel = this.Context.AddModel(tool);
            return newModel ?? new Tool();
        }

        public IEnumerable<Tool> GetTools(ToolType? type)
        {
            return this.GetTools(type, null, null);
        }

        public IEnumerable<Tool> GetTools(ToolType? toolType, DateTime? startDate, DateTime? endDate)
        {
            var parameters = new Dictionary<object, object>()
            {
                { nameof(startDate), startDate  },
                { nameof(endDate), endDate  },
                { nameof(toolType), toolType.ToString()  },
            };

            return this.Context.GetModels<Tool>(parameters);
        }

        public Tool UpdateTool(Tool model)
        {
            return this.Context.SetModel(model);
        }

        public IEnumerable<string> GetToolTypes()
        {
            return Enum.GetNames(typeof(ToolType)).ToList();
        }

        public IEnumerable<Tool> MarkForSale(int toolId, string clerk, decimal salePrice)
        {
            var parameters = new Dictionary<object, object>
            {
                { nameof(toolId), toolId },
                { nameof(clerk), clerk },
                { nameof(salePrice), salePrice },
            };

            return this.Context.Execute<Tool, object>("MarkForSale", parameters);
        }

        public IEnumerable<Tool> MarkForService(int toolId)
        {
            throw new NotImplementedException();
        }
    }
}