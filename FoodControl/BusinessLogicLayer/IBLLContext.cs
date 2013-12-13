namespace FoodControl.BusinessLogicLayer
{
    using System;
    using FoodControl.DataAccessLayer;

    /// <summary>
    /// The basic contract for the BLLContext class.
    /// The IBLLContext class is implementing the IDisposable interface.
    /// </summary>
    public interface IBLLContext : IDisposable
    {
        IActivityLogService ActivityLog { get; }
        IActivityService Activity { get; }
        IFoodCategoryService FoodCategory{ get; }
        IFoodService Food { get; }
        INutritionLogService NutritionLog{ get; }
        IPortionService Portion { get; }
        IProfileService Profile { get; }
        IUserService User { get; }
        IVitalDataService VitalData { get; }
    }
}
