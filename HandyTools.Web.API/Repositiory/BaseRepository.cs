using HandyTools.Database;

namespace HandyTools.Web.API.Repositiory
{
    public class BaseRepository
    {
        private readonly IDbContext _dbContext;

        /// <summary>
        /// Gets the context.Gets the Database Context.
        /// </summary>
        public IDbContext Context
        {
            get { return this._dbContext; }
        }

        public BaseRepository(IDbContext context)
        {
            this._dbContext = context;
        }
    }
}