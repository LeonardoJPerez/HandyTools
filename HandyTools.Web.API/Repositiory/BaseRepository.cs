using HandyTools.Database;

namespace HandyTools.Web.API.Repositiory
{
    public class BaseRepository
    {
        protected HandyToolsDb _db;

        public BaseRepository()
        {
            this._db = new HandyToolsDb();
        }
    }
}