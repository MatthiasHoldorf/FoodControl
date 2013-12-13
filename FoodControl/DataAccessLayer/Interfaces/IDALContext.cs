namespace FoodControl.DataAccessLayer
{
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the DALContext class.
    /// The IDALContext class is implementing the IUnitOfWork interface.
    /// </summary>
    public interface IDALContext : IUnitOfWork
    {
        IRepository<ActivityLog> ActivityLog { get; }
        IRepository<Activity> Activity { get; }
        IRepository<FoodCategory> FoodCategory { get; }
        IRepository<Food> Food { get; }
        IRepository<NutritionLog> NutritionLog { get; }
        IRepository<Portion> Portion { get; }
        IRepository<Profile> Profile { get; }
        IRepository<User> User { get; }
        IRepository<VitalData> VitalData { get; }
    }
}
