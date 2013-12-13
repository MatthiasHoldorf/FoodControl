namespace FoodControl.DataAccessLayer
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Linq;

    /// <summary>
    /// The ![CDATA[ Repository<T> ]]> class is the base class for all repositories.
    /// All CRUD-Operation of model data can be queried in this class by use of generic.
    /// </summary>
    /// <typeparam name="T">The type of the model class to be iniated.</typeparam>
    public class Repository<T> : IRepository<T> where T : class
    {
        /// <summary>
        /// The _context property represents the context to the current Database.
        /// </summary>
        protected DatabaseContext _context;

        /// <summary>
        /// The _Entities property returns a generic IDbSet.
        /// </summary>
        private IDbSet<T> _Entities
        {
            get { return this._context.Set<T>(); }
        }        

        /// <summary>
        /// The _shareContext property indicates whether the context, when creating an instance of this class, is shared or not.
        /// </summary>
        private bool _shareContext = false;

        /// <summary>
        /// In this constructor the _shareContext property is set to true, 
        /// because the class that instantiates the instance will provide the context.
        /// Therefore, this class must take care of committing the data.
        /// </summary>
        /// <param name="context">Represents a context of a Database.</param>
        public Repository(DatabaseContext context)
        {
            this._context = context;
            _shareContext = true;
        }

        /// <summary>
        /// In this constructor the _shareContext property remains false,
        /// because the _context property will be initiated new each time.
        /// </summary>
        public Repository()
        {
            this._context = new DatabaseContext();
        }

        /// <summary>
        /// Create an entry of the given parameter entity, with the type of the given class T.
        /// </summary>
        /// <param name="entity">Object to be created.</param>
        public void Create(T entity)
        {
            var newEntry = _Entities.Add(entity);

            if (!_shareContext)
                _context.SaveChanges();
        }

        /// <summary>
        /// Find an entry of the given parameter id, with the type of the given class T.
        /// </summary>
        /// <param name="id">The id to serach for.</param>
        /// <returns>The searched entity.</returns>
        public T GetById(int id)
        {
            return _Entities.Find(id);
        }

        /// <summary>
        /// Get all entries of the given class T.
        /// </summary>
        /// <returns>An IEnumerable of all entries of the given class T.</returns>
        public IEnumerable<T> GetAll()
        {
            return _Entities.AsEnumerable<T>();
        }

        /// <summary>
        /// Update an entry of the given parameter entity, with the type of the given class T.
        /// </summary>
        /// <param name="entity">The object to be updated.</param>
        public void Update(T entity)
        {
            var entry = _context.Entry(entity);
            _Entities.Attach(entity);
            entry.State = EntityState.Modified;

            if (!_shareContext)
                _context.SaveChanges();
        }

        /// <summary>
        /// Delete an entry of the given parameter entity, wit the type of the given class T.
        /// </summary>
        /// <param name="entity">The object to be deleted.</param>
        public void Delete(T entity)
        {
            _Entities.Remove(entity);

            if (!_shareContext)
                _context.SaveChanges();
        }

        private bool disposed = false;

        /// <summary>
        /// Implementation of IDisposable. ![CDATA[ IRepository<T> ]]> inherits from IDisposable. 
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
        /// Implementation of IDisposable. ![CDATA[ IRepository<T> ]]> inherits from IDisposable. 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
