using HandyTools.Database;

namespace HandyTools.Web.API.Repositiory
{
    public class ToolRepository : BaseRepository
    {
        public ToolRepository(IDbContext context) : base(context)
        {
        }
    }
}