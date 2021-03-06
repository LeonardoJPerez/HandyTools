using HandyTools.Database;
using HandyTools.Web.API.Interfaces;
using HandyTools.Web.API.Repositiory;
using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace HandyTools.Web.API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            container.RegisterType<IDbContext, HandyToolsDb>();
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<IReservationRepository, ReservationRepository>();
            container.RegisterType<IToolRepository, ToolRepository>();
            container.RegisterType<IReportRepository, ReportsRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}