using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineApp.services
{
    public interface IUserStorage
    {
        bool Save(string login, string email, string password);
        bool Contains(string login);
        bool Remove(string login);
    }
}
