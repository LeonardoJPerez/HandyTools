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
                { nameof(toolType), toolType.ToString()  }
            };

            return this.Context.GetModels<Tool>(parameters);
        }

        public IEnumerable<Tool> GetToolsForClerk(ToolType? toolType)
        {
            var parameters = new Dictionary<object, object>()
            {
                { nameof(toolType), toolType.ToString()  }
            };

            return this.Context.Execute<Tool, object>("GetToolsClerk", parameters);
        }

        public Tool UpdateTool(Tool model)
        {
            return this.Context.SetModel(model);
        }

        public IEnumerable<string> GetToolTypes()
        {
            return Enum.GetNames(typeof(ToolType)).ToList();
        }

        public Tool MarkForSale(int toolId, string clerk, decimal salePrice)
        {
            var parameters = new Dictionary<object, object>
            {
                { nameof(toolId), toolId },
                { nameof(clerk), clerk },
                { nameof(salePrice), salePrice },
            };

            return this.Context.Execute<Tool, object>("MarkForSale", parameters).FirstOrDefault();
        }

        public Tool MarkForService(ServiceOrder serviceOrder)
        {
            var parameters = new Dictionary<object, object>()
            {
                { "toolId", serviceOrder.ToolID  },
                { "dateCreated", serviceOrder.DateCreated  },
                { "dateCompleted", serviceOrder.DateCompleted  },
                { "cost", serviceOrder.Cost  },
                { "servicedBy", serviceOrder.ServiceBy  }
            };

            return this.Context.Execute<Tool, object>("InsertServiceOrder", parameters).FirstOrDefault();
        }

        public void AddAccessory(int ID, List<string> accessories)
        {
            for (int i = 0; i < accessories.Count; i++)
            {
                var d = new Dictionary<object, object>()
                {
                    { "id", ID },
                    { "accessory", accessories[i] }
                };

                this.Context.Execute<Tool, object>("InsertAccessory", d).FirstOrDefault();
            }
        }

        public IEnumerable<Accessory> GetAccessories(int toolId)
        {
            var parameters = new Dictionary<object, object>()
            {
                { "id", toolId },
            };

            return this.Context.Execute<Accessory, object>("GetAccessories", parameters);
        }
    }
}