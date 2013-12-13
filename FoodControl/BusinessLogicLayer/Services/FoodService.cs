namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The FoodService class represents a service for the Food model.
    /// </summary>
    public class FoodService : Service, IFoodService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public FoodService(IDALContext context) : base(context) { }

        public void Add(Food food)
        {
            context.Food.Create(food);
            context.SaveChanges();
        }
        
        public IEnumerable<Food> GetAll()
        {
            return context.Food.GetAll();
        }
        /// <summary>
        /// Returns the food entries which are not marked as deleted -> all current food entries.
        /// </summary>
        /// <returns>a list of current foods</returns>
        public IEnumerable<Food> GetCurrentFoodEntries()
        {
            return context.Food.GetAll().Where(food => food.IsDeleted != true).GroupBy(food => food.Name).Select(food => food.LastOrDefault());
        }

        public void Update(Food food)
        {
            context.Food.Update(food);
            context.SaveChanges();
        }

        public void Delete(Food food)
        {
            context.Food.Delete(food);
            context.SaveChanges();
        }
        /// <summary>
        /// Marks a food as deleted.
        /// </summary>
        /// <param name="activiy">the food to be marked as deleted.</param>
        public void MarkAsDelete(Food food)
        {
            List<Food> sameNames = GetAll().Where(p => p.Name.ToUpper() == food.Name.ToUpper()).ToList();

            foreach (Food item in sameNames)
            {
                item.IsDeleted = true;
                Update(item);
            }
        }
    }
}
