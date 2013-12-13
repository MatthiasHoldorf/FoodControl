namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using System.Linq;

    /// <summary>
    /// The VitalDataService class represents a service for the VitalData model.
    /// </summary>
    public class VitalDataService : Service, IVitalDataService
    {
        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public VitalDataService(IDALContext context) : base(context) { }

        public void Add(VitalData vitalData)
        {
            context.VitalData.Create(vitalData);
            context.SaveChanges();
        }
        /// <summary>
        /// Returns the ID of the last vital data entry.
        /// </summary>
        /// <returns>the last vital data entry.</returns>
        public int GetLastId()
        {
            return context.VitalData.GetAll().LastOrDefault().VitalID;
        }
        /// <summary>
        /// Returns a list of vital data for the specific user.
        /// </summary>
        /// <param name="userId">the user id.</param>
        /// <returns>the list of vital data.</returns>
        public IEnumerable<VitalData> GetVitalDataByUserId(int userId)
        {
            return context.VitalData.GetAll().Where(v => v.UserID == userId);
        }
        /// <summary>
        /// Returns the vital data for a specific user and date.
        /// </summary>
        /// <param name="userId">the user id.</param>
        /// <param name="date">the specific date.</param>
        /// <returns>the vital data.</returns>
        public VitalData GetVitalDataByUserIdAndDate(int userId, DateTime date)
        {
            return GetVitalDataByUserId(userId).Where(v => v.Date <= date.AddDays(+1)).OrderByDescending(v => v.Date).FirstOrDefault();
        }
    }
}
