namespace FoodControl.BusinessLogicLayer
{
    using System;
    using FoodControl.DataAccessLayer;

    /// <summary>
    /// The BLLContext class encapsulates all model services as well as provides them with a single instance of the IDALContext.
    /// </summary>
    public class BLLContext : IBLLContext, IDisposable
    {
        /// <summary>
        /// The _context property represents the data access context from which the CRUD-operations can be called.
        /// </summary>
        private IDALContext _context;

        /// <summary>
        /// Each model class is represented by a property through the according service.
        /// </summary>
        private IActivityLogService _activityLogService;
        private IActivityService _activityService;
        private IFoodCategoryService _foodCategoryService;
        private IFoodService _foodService;
        private INutritionLogService _nutritionLogService;
        private IPortionService _portionService;
        private IProfileService _profileService;
        private IUserService _userService;
        private IVitalDataService _vitalDataService;

        /// <summary>
        /// In this constructor the single instance of the DALContext gets instantiated.
        /// </summary>
        public BLLContext()
        {
            _context = new DALContext();
        }

        /// <summary>
        /// In this constructor the class that instantiates the instance will provide the context. 
        /// </summary>
        public BLLContext(IDALContext context)
        {
            _context = context;
        }

        #region Getter
        /// <summary>
        /// Get the service class representing the ActivityLog model.
        /// </summary>
        public IActivityLogService ActivityLog
        {
            get { return this._activityLogService ?? (_activityLogService = new ActivityLogService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the Activity model.
        /// </summary>
        public IActivityService Activity
        {
            get { return this._activityService ?? (_activityService = new ActivityService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the FoodCategory model.
        /// </summary>
        public IFoodCategoryService FoodCategory
        {
            get { return this._foodCategoryService ?? (_foodCategoryService = new FoodCategoryService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the Food model.
        /// </summary>
        public IFoodService Food
        {
            get { return this._foodService ?? (_foodService = new FoodService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the NutritionLog model.
        /// </summary>
        public INutritionLogService NutritionLog
        {
            get { return this._nutritionLogService ?? (_nutritionLogService = new NutritionLogService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the Portion model.
        /// </summary>
        public IPortionService Portion
        {
            get { return this._portionService ?? (_portionService = new PortionService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the Profile model.
        /// </summary>
        public IProfileService Profile
        {
            get { return this._profileService ?? (_profileService = new ProfileService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the User model.
        /// </summary>
        public IUserService User
        {
            get { return this._userService ?? (_userService = new UserService(_context)); }
        }

        /// <summary>
        /// Get the service class representing the VitalData model.
        /// </summary>
        public IVitalDataService VitalData
        {
            get { return this._vitalDataService ?? (_vitalDataService = new VitalDataService(_context)); }
        }

        #endregion

        private bool disposed = false;

        /// <summary>
        /// Implementation of IDisposable. IBBLContext inherits from IDisposable. 
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
        /// Implementation of IDisposable. IBBLContext inherits from IDisposable. 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
