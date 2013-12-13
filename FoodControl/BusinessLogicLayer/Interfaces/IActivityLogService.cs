namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the ActivityLogService class.
    /// </summary>
    public interface IActivityLogService
    {
        void Add(ActivityLog activityLog);
        IEnumerable<ActivityLog> GetActivityLogByUserId(int userId);
        IEnumerable<ActivityLog> GetActivityLogByUserIdAndDate(int userId, DateTime date);
        IEnumerable<DateTime> GetDistinctDateList(IEnumerable<ActivityLog> activityLog);
        NutrientAggregation GetKiloCaloriesForSpecificDate(int userId, DateTime date);
        IList<NutrientAggregation> GetKiloCaloriesList(IEnumerable<ActivityLog> activityLog);
        void Update(ActivityLog activityLog);
        void Delete(ActivityLog activityLog);
    }
}
