namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the NutritionLogService class.
    /// </summary>
    public interface INutritionLogService
    {
        void Add(NutritionLog nutritionLog);
        IEnumerable<NutritionLog> GetNutritionLogByUserId(int userId);
        IEnumerable<NutritionLog> GetNutritionLogByUserIdAndDate(int userId, DateTime date);
        IEnumerable<DateTime> GetDistinctDateList(IEnumerable<NutritionLog> nutritionLog);
        NutrientAggregation GetNutritionAggregationForSpecificDate(int userId, DateTime date);
        IList<NutrientAggregation> GetNutritionAggregationList(IEnumerable<NutritionLog> nutritionLog);
        void Update(NutritionLog nutritionLog);
        void Delete(NutritionLog nutritionLog);
    }
}
