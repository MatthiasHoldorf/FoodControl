namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the UserService class.
    /// </summary>
    public interface IUserService
    {
        void Add(User user);
        IEnumerable<Profile> GetAllProfiles();
        int GetLastId();
        User GetUserById(int userId);
        int Count();
        void Update(User user);
    }
}
