using System;
using System.Text;

namespace HandyTools.Web.API.Helpers
{
    static public class UserHelper
    {
        /// <summary>
        /// Decodes the user from a base64 string.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <returns></returns>
        public static string DecodeUser(string username)
        {
            try
            {
                byte[] data = Convert.FromBase64String(username);
                return Encoding.UTF8.GetString(data);
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}