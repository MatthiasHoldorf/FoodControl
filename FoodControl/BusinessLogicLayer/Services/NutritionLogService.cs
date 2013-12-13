namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The NutritionLogService class represents a service for the NutritionLog model.
    /// </summary>
    public class NutritionLogService : Service, INutritionLogService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public NutritionLogService(IDALContext context) : base(context) { }

        public void Add(NutritionLog nutritionLog)
        {
            context.NutritionLog.Create(nutritionLog);
            context.SaveChanges();
        }
        /// <summary>
        ///  Returns the nutritionLogList for a specific user.
        /// </summary>
        /// <param name="userId">the ID of the specific user.</param>
        /// <returns>the nutritionLogList.</returns>
        public IEnumerable<NutritionLog> GetNutritionLogByUserId(int userId)
        {
            return context.NutritionLog.GetAll().Where(n => n.UserID == userId);
        }
        /// <summary>
        /// Returns the nutritionLogList for a specific user and date.
        /// </summary>
        /// <param name="userId">the ID of the specific user.</param>
        /// <param name="date">the specific date</param>
        /// <returns>the nutritionLogList.</returns>
        public IEnumerable<NutritionLog> GetNutritionLogByUserIdAndDate(int userId, DateTime date)
        {
            return GetNutritionLogByUserId(userId).Where(n => n.Date.Date == date.Date);
        }
        /// <summary>
        /// Returns a list of distinct dates.
        /// </summary>
        /// <param name="nutritionLog">the list of nutritionLogs.</param>
        /// <returns> the list of distinct dates.</returns>
        public IEnumerable<DateTime> GetDistinctDateList(IEnumerable<NutritionLog> nutritionLog)
        {
            return nutritionLog.Select(d => d.Date.Date).Distinct();
        }
        /// <summary>
        /// Returns a sum of nutrients for a specific user and date.
        /// </summary>
        /// <param name="userId">the userId.</param>
        /// <param name="date">the specific date.</param>
        /// <returns>a nutrientAggregation for a specific user and date</returns>
        public NutrientAggregation GetNutritionAggregationForSpecificDate(int userId, DateTime date)
        {
            IEnumerable<NutritionLog> nutritionLog = GetNutritionLogByUserIdAndDate(userId, date);

            return new NutrientAggregation
            {
                KiloCalories = Math.Round(nutritionLog.Select(f => (f.Food.KiloCalories) / 100 * f.Quantity).Sum()),
                Carbohydrate = Math.Round(nutritionLog.Select(f => f.Food.Carbohydrate / 100 * f.Quantity).Sum()),
                Protein = Math.Round(nutritionLog.Select(f => f.Food.Protein / 100 * f.Quantity).Sum()),
                Fat = Math.Round(nutritionLog.Select(f => f.Food.Fat / 100 * f.Quantity).Sum()),
                Sugar = Math.Round(nutritionLog.Select(f => f.Food.Sugar / 100 * f.Quantity).Sum()),
                Saturates = Math.Round((decimal)nutritionLog.Select(f => f.Food.Saturates / 100 * f.Quantity).Sum()),
                Salt = Math.Round((decimal)nutritionLog.Select(f => f.Food.Salt / 100 * f.Quantity).Sum()),
                Date = nutritionLog.Select(d => d.Date).FirstOrDefault().Date
            };
        }
        /// <summary>
        /// Gets all nutritions for a specific nutrition log.
        /// </summary>
        /// <param name="nutritionLog">the nutrition log.</param>
        /// <returns>a list of all nutritions for the nutrition log.</returns>
        public IList<NutrientAggregation> GetNutritionAggregationList(IEnumerable<NutritionLog> nutritionLog)
        {
            IList<NutrientAggregation> nutritionAggregationList = new List<NutrientAggregation>();
            IEnumerable<DateTime> getDistinctDateList = GetDistinctDateList(nutritionLog);
            int userId = nutritionLog.Select(n => n.UserID).FirstOrDefault();

            foreach (var date in getDistinctDateList)
            {
                nutritionAggregationList.Add(GetNutritionAggregationForSpecificDate(userId, date));
            }

            return nutritionAggregationList;
        }

        public void Update(NutritionLog nutritionLog)
        {
            context.NutritionLog.Update(nutritionLog);
            context.SaveChanges();
        }
        public void Delete(NutritionLog nutritionLog)
        {
            context.NutritionLog.Delete(nutritionLog);
            context.SaveChanges();
        }
    }
}
