namespace FoodControl.BusinessLogicLayer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using FoodControl.DataAccessLayer;
    using FoodControl.Model;
    using FoodControl.Utility;
    using Microsoft.SqlServer.Management.Common;

    /// <summary>
    /// The ProfileService class represents a service for the Profile model.
    /// </summary>
    public class ProfileService : Service, IProfileService
    {
        private IBLLContext _BLLcontext = new BLLContext();

        /// <summary>
        /// In this constructor the base constructor of the Service class is called.
        /// </summary>
        /// <param name="context">Represents a context of the data access layer.</param>
        public ProfileService(IDALContext context) : base(context) { }

        public void Add(Profile profile)
        {
            context.Profile.Create(profile);
            context.SaveChanges();
        }
        
        public IEnumerable<Profile> GetAll()
        {
            return context.Profile.GetAll();
        }
        /// <summary>
        /// Returns the profile entries which are not marked as deleted -> all current profile entries.
        /// </summary>
        /// <returns>a list of current profiles</returns>
        public IEnumerable<Profile> GetCurrentProfileEntries()
        {
            return context.Profile.GetAll().Where(p => p.IsDeleted != true).GroupBy(p => p.Name).Select(p => p.LastOrDefault());
        }
        /// <summary>
        /// Returns a profil for the specific ID.
        /// </summary>
        /// <param name="userId">the user id.</param>
        /// <returns>the profil of the user.</returns>
        public Profile GetProfileByUserId(int userId)
        {
            return context.Profile.GetAll().Where(p => p.Users.Any(u => u.UserID == userId)).FirstOrDefault();
        }
        /// <summary>
        /// Returns the ID of the last profile entry.
        /// </summary>
        /// <returns>the last profile ID.</returns>
        public int GetLastId()
        {
            return context.Profile.GetAll().LastOrDefault().ProfileID;
        }
        /// <summary>
        /// Returns a profile for the specific ID.
        /// </summary>
        /// <param name="profileId">the profile id.</param>
        /// <returns>the user.</returns>
        public Profile GetProfileById(int profileId)
        {
            return context.Profile.GetById(profileId);
        }
        /// <summary>
        /// Returns the target values for a specific profileId.
        /// </summary>
        /// <param name="profileId">the Id for the specific profil.</param>
        /// <returns>target values as nutrition aggregation. </returns>
        public NutrientAggregation GetTargetValuesById(int profileId)
        {
            if (profileId == 0)
                throw new InvalidArgumentException();

            Profile profile = GetProfileById(profileId);

            return new NutrientAggregation
            {
                KiloCalories = (decimal)profile.TV_Calories,
                Carbohydrate = (decimal)profile.TV_Carbohydrate,
                Protein = (decimal)profile.TV_Protein,
                Fat = (decimal)profile.TV_Fat,
                Sugar = (decimal)profile.TV_Sugar,
                Salt = (decimal)profile.TV_Salt
            };
        }

        /// <summary>
        /// Returns a suggestion of a Profile based on user's vitalData and objective.
        /// </summary>
        /// <param name="user">The user to suggest the Profile for</param>
        /// <param name="objective">1 = lose weight, 2 = hold weight, 3 = gain weight</param>
        /// <returns></returns>
        public Profile GetSuggestedProfile(User user, VitalData vitalData, int objective)
        {    
            decimal tv_KiloCalories = 2000;
            string profileName = "Default";

            tv_KiloCalories = Tools.GetBasicRequirements(user, vitalData);

            switch (objective)
            {
                // lose weight
                case 1:
                    tv_KiloCalories += tv_KiloCalories * (decimal)-0.25;
                    profileName = "Gewicht verlieren";
                    break;
                // hold weight (value stays the same)
                case 2:
                    profileName = "Gewicht halten";
                    break;
                // gain weight
                case 3:
                    tv_KiloCalories += tv_KiloCalories * (decimal)+0.25;
                    profileName = "Gewicht zunehmen";
                    break;
            }

            // ETB: 
            // kcal 2000, eiweiß 50, kohlenhydrate 180(270), zucker 90, fett 50(70), ges. fett 20, salz 6.
            // eiweiß 0,025, kohlenhydrate 0,09, zucker 0,045, fett 0,025, ges. fett 0,01, salz 0,003
            return new Profile 
            { 
                Name = profileName,
                TV_Calories = tv_KiloCalories,
                TV_Carbohydrate = tv_KiloCalories * (decimal)0.115,
                TV_Protein = tv_KiloCalories * (decimal)0.025,
                TV_Fat = tv_KiloCalories * (decimal)0.025,
                TV_Sugar = tv_KiloCalories * (decimal)0.02,
                TV_Saturates = tv_KiloCalories * (decimal)0.01,
                TV_Salt = tv_KiloCalories * (decimal)0.003
            };
        }

        public void Update(Profile profile)
        {
            context.Profile.Update(profile);
            context.SaveChanges();
        }

        public void Delete(Profile profile)
        {
            context.Profile.Delete(profile);
            context.SaveChanges();
        }
        /// <summary>
        /// Marks a profile as deleted.
        /// </summary>
        /// <param name="profile">the profile to be marked as deleted.</param>
        public void MarkAsDelete(Profile profile)
        {
            List<Profile> sameNames = GetAll().Where(p => p.Name.ToUpper() == profile.Name.ToUpper()).ToList();

            foreach (Profile item in sameNames)
            {
                item.IsDeleted = true;
                Update(item);
            }
        }
    }
}
