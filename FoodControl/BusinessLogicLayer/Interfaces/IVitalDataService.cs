namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the VitalDataService class.
    /// </summary>
    public interface IVitalDataService
    {
        void Add(VitalData vitalData);
        int GetLastId();
        IEnumerable<VitalData> GetVitalDataByUserId(int userId);
        VitalData GetVitalDataByUserIdAndDate(int userId, DateTime date);
    }
}
