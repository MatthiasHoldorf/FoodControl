namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The ActivityLogService class represents a service for the ActivityLog model.
    /// </summary>
    public class ActivityLogService : Service, IActivityLogService
    {
        private IBLLContext _BLLcontext = new BLLContext();

        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public ActivityLogService(IDALContext context) : base(context) { }

        public void Add(ActivityLog activityLog)
        {
            context.ActivityLog.Create(activityLog);
            context.SaveChanges();
        }
        /// <summary>
        ///  Returns the activityLogList for a specific user.
        /// </summary>
        /// <param name="userId">the ID of the specific user.</param>
        /// <returns>the activityLogList.</returns>
        public IEnumerable<ActivityLog> GetActivityLogByUserId(int userId)
        {
            var res = context.ActivityLog.GetAll().Where(a => a.UserID == userId);
            return res;
        }

        /// <summary>
        /// Returns the activityLogList for a specific user and date.
        /// </summary>
        /// <param name="userId">the ID of the specific user.</param>
        /// <param name="date">the specific date</param>
        /// <returns>the activityLogList.</returns>
        public IEnumerable<ActivityLog> GetActivityLogByUserIdAndDate(int userId, DateTime date)
        {
            var res = GetActivityLogByUserId(userId).Where(a => a.Date.Date == date.Date);
            return res;
        }
        /// <summary>
        /// Returns a list of distinct dates.
        /// </summary>
        /// <param name="nutritionLog">the list of activityLogs.</param>
        /// <returns> the list of distinct dates.</returns>
        public IEnumerable<DateTime> GetDistinctDateList(IEnumerable<ActivityLog> activityLog)
        {
            return activityLog.Select(d => d.Date.Date).Distinct();
        }
        /// <summary>
        /// Calculates the kilocalories for a specific user and date.
        /// </summary>
        /// <param name="userId">the user id.</param>
        /// <param name="date">the specific date.</param>
        /// <returns>a nutrient aggregation.</returns>
        public NutrientAggregation GetKiloCaloriesForSpecificDate(int userId, DateTime date)
        {
            IEnumerable<ActivityLog> activityLog = GetActivityLogByUserIdAndDate(userId, date);
            VitalData vitalData = _BLLcontext.VitalData.GetVitalDataByUserIdAndDate(userId, date);
            decimal kiloCalroies = 0;

            if (activityLog != null)
            {
                foreach (var item in activityLog)
                {
                    var met = item.Activity.MET;
                    var duration = (decimal)(item.Duration / 60.0);
                    var weight = vitalData.BodyWeight;

                    kiloCalroies += met * duration * weight;
                }
            }

            return new NutrientAggregation { KiloCalories = kiloCalroies, Date = date };
        }

        /// <summary>
        /// Returns a list of nutrient aggregation for a specific list of activity logs.
        /// </summary>
        /// <param name="activityLog"> the list of activity logs.</param>
        /// <returns>list of nutrient aggregations</returns>
        public IList<NutrientAggregation> GetKiloCaloriesList(IEnumerable<ActivityLog> activityLog)
        {
            IList<NutrientAggregation> activityAggregationList = new List<NutrientAggregation>();
            IEnumerable<DateTime> getDistinctDateList = GetDistinctDateList(activityLog);
            int userId = activityLog.Select(n => n.UserID).FirstOrDefault();

            foreach (var date in getDistinctDateList)
            {
                activityAggregationList.Add(GetKiloCaloriesForSpecificDate(userId, date));
            }

            return activityAggregationList;
        }

        public void Update(ActivityLog activityLog)
        {
            context.ActivityLog.Update(activityLog);
            context.SaveChanges();
        }

        public void Delete(ActivityLog activityLog)
        {
            context.ActivityLog.Delete(activityLog);
            context.SaveChanges();
        }
    }
}
