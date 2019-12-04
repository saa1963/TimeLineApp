namespace TimeLineApp.services
{
    public interface IUserStorage
    {
        bool Save(string login, string email, string password);
        bool Contains(string login);
        bool Remove(string login);
        bool Logon(string login, string password);
    }
}
