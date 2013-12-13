namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the ActivityService class.
    /// </summary>
    public interface IActivityService
    {
        void Add(Activity activity);
        IEnumerable<Activity> GetAll();
        IEnumerable<Activity> GetCurrentActivityEntries();
        void Update(Activity activity);
        void Delete(Activity activity);
        void MarkAsDelete(Activity activity);
    }
}
