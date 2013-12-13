namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The UserService class represents a service for the User model.
    /// </summary>
    public class UserService : Service, IUserService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public UserService(IDALContext context) : base(context) { }

        public void Add(User user)
        {
            context.User.Create(user);
            context.SaveChanges();
        }
        /// <summary>
        /// Returns all profiles.
        /// </summary>
        /// <returns>a list of profiles.</returns>
        public IEnumerable<Profile> GetAllProfiles()
        {
            return context.User.GetAll().Select(u => u.Profile);
        }
        /// <summary>
        /// Returns the ID of the last user entry.
        /// </summary>
        /// <returns>the last user ID.</returns>
        public int GetLastId()
        {
            return context.User.GetAll().LastOrDefault().UserID;
        }
        /// <summary>
        /// Returns a user for the specific ID.
        /// </summary>
        /// <param name="userId">the user id.</param>
        /// <returns>the user.</returns>
        public User GetUserById(int userId)
        {
            return context.User.GetById(userId);
        }
        /// <summary>
        /// Returns the number of user entries.
        /// </summary>
        /// <returns>the number of user entries.</returns>
        public int Count()
        {
            return context.User.GetAll().Count();
        }

        public void Update(User user)
        {
            context.User.Update(user);
            context.SaveChanges();
        }
    }
}
