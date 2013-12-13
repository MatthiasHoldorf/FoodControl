namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The FoodCategoryService class represents a service for the FoodCategory model.
    /// </summary>
    public class FoodCategoryService : Service, IFoodCategoryService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public FoodCategoryService(IDALContext context) : base(context) { }

        public IEnumerable<FoodCategory> GetAll()
        {
            return context.FoodCategory.GetAll();
        }
    }
}
