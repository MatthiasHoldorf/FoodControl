namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the PortionService class.
    /// </summary>
    public interface IPortionService
    {
        void Add(Portion portion);
        Portion GetPortionByName(string name);
        IEnumerable<Portion> GetAll();
    }
}
