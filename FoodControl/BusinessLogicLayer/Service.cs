namespace FoodControl.BusinessLogicLayer
{
    using System;
    using FoodControl.DataAccessLayer;

    /// <summary>
    /// The Service class is the base class for all services.
    /// </summary>
    public class Service : IDisposable
    {
        protected IDALContext context;

        /// <summary>
        /// In This constructor the class initiating the instance will provide the context.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public Service(IDALContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// In this constructor the _context property will be initiated new each time.
        /// </summary>
        public Service()
        {
            this.context = new DALContext();
        }

        private bool disposed = false;

        /// <summary>
        /// Implementation of IDisposable.
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        /// <summary>
        /// Implementation of IDisposable.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
