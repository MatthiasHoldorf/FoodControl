namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the FoodService class.
    /// </summary>
    public interface IFoodService
    {
        void Add(Food food);
        IEnumerable<Food> GetAll();
        IEnumerable<Food> GetCurrentFoodEntries();
        void Update(Food food);
        void Delete(Food food);
        void MarkAsDelete(Food food);
    }
}
