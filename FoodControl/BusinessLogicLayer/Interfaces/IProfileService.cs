namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using FoodControl.Model;

    /// <summary>
    /// The basic contract for the ProfileService class.
    /// </summary>
    public interface IProfileService
    {       
        void Add(Profile profile);
        IEnumerable<Profile> GetAll();
        IEnumerable<Profile> GetCurrentProfileEntries();
        Profile GetProfileByUserId(int userId);
        int GetLastId();
        Profile GetProfileById(int profileId);
        NutrientAggregation GetTargetValuesById(int profileId);
        Profile GetSuggestedProfile(User user, VitalData vitalData, int objective);
        void Update(Profile profile);
        void Delete(Profile profile);
        void MarkAsDelete(Profile profile);
    }
}
