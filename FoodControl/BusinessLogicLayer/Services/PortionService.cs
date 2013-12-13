namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The PortionService class represents a service for the Portion model.
    /// </summary>
    public class PortionService : Service, IPortionService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public PortionService(IDALContext context) : base(context) { }

        public void Add(Portion portion)
        {
            context.Portion.Create(portion);
            context.SaveChanges();
        }
        /// <summary>
        /// Returns the portion of the given name.
        /// </summary>
        /// <param name="name">portion´s name.</param>
        /// <returns>the portion</returns>
        public Portion GetPortionByName(string name)
        {
            return context.Portion.GetAll().Where(p => p.Name.ToUpper() == name.ToUpper()).LastOrDefault();
        }
        
        public IEnumerable<Portion> GetAll()
        {
            return context.Portion.GetAll();
        }
    }
}
