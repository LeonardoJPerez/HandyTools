using HandyTools.Models;
using System.Collections.Generic;

namespace HandyTools.Database
{
    public interface IDbContext
    {
        int AuthUser<T>(string userName, string password) where T : BaseModel, IUser;

        IEnumerable<T> GetModels<T>(string key, string value, bool useView = false) where T : BaseModel;

        T GetModel<T>(string key, string value) where T : BaseModel;

        T SetModel<T>(T model) where T : BaseModel;

        T AddModel<T>(T model) where T : BaseModel;
    }
}