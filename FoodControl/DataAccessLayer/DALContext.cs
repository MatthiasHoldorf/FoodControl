namespace FoodControl.DataAccessLayer
{
    using System;
    using FoodControl.Model;

    /// <summary>
    /// The DALContext ensures that only one instance of the database connection will be used in all repositories.
    /// The class holds a generic property ![CDATA[ Repository<T> ]]> for each model class.
    /// </summary>
    public class DALContext : IDALContext, IDisposable
    {
        /// <summary>
        /// The _context property represents the context to the current Database.
        /// </summary>
        private DatabaseContext _context;

        /// <summary>
        /// Each model class is represented by a property through a generic class ![CDATA[ Repository<T> ]]>.
        /// </summary>
        private Repository<ActivityLog> _activityLogRepository;
        private Repository<Activity> _activityRepository;
        private Repository<FoodCategory> _foodCategoryRepository;
        private Repository<Food> _foodRepository;
        private Repository<NutritionLog> _nutritionLogRepository;
        private Repository<Portion> _portionRepository;
        private Repository<Profile> _profileRepository;
        private Repository<User> _userRepository;
        private Repository<VitalData> _vitalDataRepository;

        /// <summary>
        /// In this constructor the single instance of the DataBaseContext gets instantiated.
        /// </summary>
        public DALContext()
        {
            _context = new DatabaseContext();
        }

        #region Getter

        /// <summary>
        /// Get the generic base class instantiated with the ActivityLog type.
        /// </summary>
        public IRepository<ActivityLog> ActivityLog
        {
            get { return this._activityLogRepository ?? (_activityLogRepository = new Repository<ActivityLog>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the Activity type.
        /// </summary>
        public IRepository<Activity> Activity
        {
            get { return this._activityRepository ?? (_activityRepository = new Repository<Activity>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the FoodCategory type.
        /// </summary>
        public IRepository<FoodCategory> FoodCategory
        {
            get { return this._foodCategoryRepository ?? (_foodCategoryRepository = new Repository<FoodCategory>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the Food type.
        /// </summary>
        public IRepository<Food> Food
        {
            get { return this._foodRepository ?? (_foodRepository = new Repository<Food>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the NutritionLog type.
        /// </summary>
        public IRepository<NutritionLog> NutritionLog
        {
            get { return this._nutritionLogRepository ?? (_nutritionLogRepository = new Repository<NutritionLog>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the Portion type.
        /// </summary>
        public IRepository<Portion> Portion
        {
            get { return this._portionRepository ?? (_portionRepository = new Repository<Portion>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the Profile type.
        /// </summary>
        public IRepository<Profile> Profile
        {
            get { return this._profileRepository ?? (_profileRepository = new Repository<Profile>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the User type.
        /// </summary>
        public IRepository<User> User
        {
            get { return this._userRepository ?? (_userRepository = new Repository<User>(_context)); }
        }

        /// <summary>
        /// Get the generic base class instantiated with the VitalData type.
        /// </summary>
        public IRepository<VitalData> VitalData
        {
            get { return this._vitalDataRepository ?? (_vitalDataRepository = new Repository<VitalData>(_context)); }
        }

        #endregion

        /// <summary>
        /// Implementation of IUnitOfWork. IDALContext inherits from IUnitOfWork.
        /// </summary>
        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        /// <summary>
        /// Implementation of IDisposable. IDALContext inherits from IUnitOfWork, which inherits from IDisposable. 
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        /// <summary>
        /// Implementation of IDisposable. IDALContext inherits from IUnitOfWork, which inherits from IDisposable. 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
