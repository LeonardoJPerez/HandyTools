using HandyTools.Database;

namespace HandyTools.Web.API.Repositiory
{
    public class ServiceOrderRepository : BaseRepository
    {
        public ServiceOrderRepository(IDbContext context) : base(context)
        {
        }
    }
}