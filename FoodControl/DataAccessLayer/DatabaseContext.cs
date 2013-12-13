namespace FoodControl.DataAccessLayer
{
    using System.Data.Entity;
    using FoodControl.Model;

    /// <summary>
    /// The DatabaseContext is used for the EntityFramework to communicate with the underlying DataBase.
    /// </summary>
    public partial class DatabaseContext : DbContext
    {
        /// <summary>
        /// No initializer is set for the current database.
        /// </summary>
        static DatabaseContext()
        {
            Database.SetInitializer<DatabaseContext>(null);
        }

        /// <summary>
        /// In this constructor the name of the connection string gets set.
        /// </summary>
        public DatabaseContext()
            : base("Name=DatabaseContext")
        {
        }

        public DbSet<Activity> Activity { get; set; }
        public DbSet<ActivityLog> ActivityLog { get; set; }
        public DbSet<Food> Food { get; set; }
        public DbSet<FoodCategory> FoodCategory { get; set; }
        public DbSet<NutritionLog> NutritionLog { get; set; }
        public DbSet<Portion> Portion { get; set; }
        public DbSet<Profile> Profile { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<VitalData> VitalData { get; set; }

        /// <summary>
        /// In this method the mapping classes will be assigned to the configuration of the DbModelBuilder parameter.
        /// </summary>
        /// <param name="modelBuilder">The according DbModelBuilder.</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ActivityMap());
            modelBuilder.Configurations.Add(new ActivityLogMap());
            modelBuilder.Configurations.Add(new FoodMap());
            modelBuilder.Configurations.Add(new FoodCategoryMap());
            modelBuilder.Configurations.Add(new NutritionLogMap());
            modelBuilder.Configurations.Add(new PortionMap());
            modelBuilder.Configurations.Add(new ProfileMap());
            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new VitalDataMap());
        }
    }
}
