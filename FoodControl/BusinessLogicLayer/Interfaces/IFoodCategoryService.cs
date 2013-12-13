namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the FoodCategoryService class.
    /// </summary>
    public interface IFoodCategoryService
    {
        IEnumerable<FoodCategory> GetAll();
    }
}
