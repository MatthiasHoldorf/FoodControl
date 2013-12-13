namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The ActivityService class represents a service for the Activity model.
    /// </summary>
    public class ActivityService : Service, IActivityService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public ActivityService(IDALContext context) : base(context) { }

        public void Add(Activity activity)
        {
            context.Activity.Create(activity);
            context.SaveChanges();
        }

        public IEnumerable<Activity> GetAll()
        {
            return context.Activity.GetAll();
        }
        /// <summary>
        /// Returns the activity entries which are not marked as deleted -> all current activity entries.
        /// </summary>
        /// <returns>a list of current activities</returns>
        public IEnumerable<Activity> GetCurrentActivityEntries()
        {
            return context.Activity.GetAll().Where(p => p.IsDeleted != true).GroupBy(p => p.Name).Select(p => p.LastOrDefault());
        }
        
        public void Update(Activity activity)
        {
            context.Activity.Update(activity);
            context.SaveChanges();
        }
        public void Delete(Activity activity)
        {
            context.Activity.Delete(activity);
            context.SaveChanges();
        }
        /// <summary>
        /// Marks an activity as deleted.
        /// </summary>
        /// <param name="activiy">the activity to be marked as deleted.</param>
        public void MarkAsDelete(Activity activiy)
        {
            List<Activity> sameNames = GetAll().Where(p => p.Name.ToUpper() == activiy.Name.ToUpper()).ToList();

            foreach (Activity item in sameNames)
            {
                item.IsDeleted = true;
                Update(item);
            }
        }
    }
}
