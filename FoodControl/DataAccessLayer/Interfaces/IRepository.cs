namespace FoodControl.DataAccessLayer
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// The basic contract for the base class ![CDATA[ Repository<T> ]]> of all repositories.
    /// </summary>
    /// <typeparam name="T">The type of the model class.</typeparam>
    public interface IRepository<T>: IDisposable where T : class
    {
        // Create
        void Create(T entity);

        // Read
        T GetById(int id);
        IEnumerable<T> GetAll();

        // Update
        void Update(T entity);

        // Delete
        void Delete(T entity);
    }
}
