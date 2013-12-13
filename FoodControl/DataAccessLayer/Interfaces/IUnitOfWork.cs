namespace FoodControl.DataAccessLayer
{
    using System;
    
    /// <summary>
    /// This interface represents the unit of work pattern.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        void SaveChanges();
    }
}
