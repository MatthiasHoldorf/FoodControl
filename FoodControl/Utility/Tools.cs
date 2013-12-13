namespace FoodControl.Utility
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Model.ViewModel;

    /// <summary>
    /// The Tool class provides utility methods that are needed throughout the application.
    /// </summary>
    public static class Tools
    {
        private static IBLLContext _context = new BLLContext();

        /// <summary>
        /// Convert a List of the NutritionLog Model to the ViewModel class ShowNutritionLog.
        /// </summary>
        /// <param name="nutritionLog">The NutritionLog List to convert.</param>
        /// <returns></returns>
        public static IList<ShowNutritionLog> ConvertToShowNutritionLog(IEnumerable<NutritionLog> nutritionLog)
        {
            IList<ShowNutritionLog> showNutritionLog = new List<ShowNutritionLog>();
            
            foreach (NutritionLog nl in nutritionLog.OrderBy(n => n.Daytime))
            {
                var measuringUnit = nl.Food.MeasuringUnit == 1 ? "g" : "ml";

                showNutritionLog.Add(new ShowNutritionLog
                {
                    Daytime = nl.Daytime,
                    Name = nl.Food.Name,
                    Quantity = Math.Round(nl.Quantity) + " " + measuringUnit,
                    KiloCalories = Math.Round(nl.Food.KiloCalories / 100 * nl.Quantity, 2),
                    Carbohydrate = Math.Round(nl.Food.Carbohydrate / 100 * nl.Quantity, 2),
                    Protein =  Math.Round(nl.Food.Protein / 100 * nl.Quantity, 2),
                    Fat = Math.Round(nl.Food.Fat / 100 * nl.Quantity, 2),
                    Sugar = Math.Round(nl.Food.Sugar / 100 * nl.Quantity, 2)
                });
            }

            return showNutritionLog;
        }

        /// <summary>
        /// Convert a List of the ActivityLog Model to the ViewModel class ShowActivityLog.
        /// </summary>
        /// <param name="nutritionLog">The ActivityLog List to convert.</param>
        public static IList<ShowActivityLog> ConvertToShowActivityLog(IEnumerable<ActivityLog> activityLog)
        {
            IList<ShowActivityLog> showActivityLog = new List<ShowActivityLog>();

            foreach (ActivityLog al in activityLog.OrderBy(n => n.Duration))
            {
                VitalData vitalData = _context.VitalData.GetVitalDataByUserIdAndDate(Program.CURRENT_USER.UserID, al.Date);
                var met = al.Activity.MET;
                var duration = (decimal)(al.Duration / 60.0);
                var weight = vitalData.BodyWeight;

                showActivityLog.Add(new ShowActivityLog
                {
                    Name = al.Activity.Name,
                    Duration = al.Duration,
                    KiloCalories = Math.Round(met * duration * weight),
                    MET = al.Activity.MET
                });
            }

            return showActivityLog;
        }

        /// <summary>
        /// Converts a DateTime to an age.
        /// </summary>
        /// <param name="birthday">The DateTime to convert.</param>
        /// <returns></returns>
        public static int ConvertBirthdaytoAge(DateTime birthday)
        {
            DateTime now = DateTime.Today;
            int age = now.Year - birthday.Year;
            if (now < birthday.AddYears(age)) age--;

            return age;
        }

        /// <summary>
        /// Calculate the BMI of a User.
        /// </summary>
        /// <param name="vitalData">The VitalData to calculate with.</param>
        /// <returns></returns>
        public static decimal GetBMI(VitalData vitalData)
        {
            return (decimal)vitalData.BodyWeight / (((decimal)vitalData.BodyHeight / 100) * ((decimal)vitalData.BodyHeight / 100));
        }

        /// <summary>
        /// Get the basic requirements of KiloCalories of a user.
        /// </summary>
        /// <param name="user">The User to get the basic requirements of.</param>
        /// <param name="vitalData">The User associated VitalData.</param>
        /// <returns></returns>
        public static decimal GetBasicRequirements(User user, VitalData vitalData)
        {
            // Grundumsatz: 
            // For males: BMR = (13.75 x KG) + (5 x cm) - (6.76 x age) + 66 * activity level (job) 1,1 1,2 1,3 1,4
            // For females: BMR = (9.56 x KG) + (1.85 x cm) - (4.68 x age) + 655  * activity level (job) 1,1 1,2 1,3 1,4
            decimal tv_KiloCalories = 0;

            if (user != null && vitalData != null )
            {
                switch (user.Sex)
                {
                    // male
                    case 1: tv_KiloCalories = (((decimal)13.75 * vitalData.BodyWeight) +
                                               ((decimal)5 * vitalData.BodyHeight) -
                                               ((decimal)6.76 * Tools.ConvertBirthdaytoAge(user.Birthday)) + 66);
                        break;
                    // female
                    case 2: tv_KiloCalories = (((decimal)9.56 * vitalData.BodyWeight) +
                                               ((decimal)1.85 * vitalData.BodyHeight) -
                                               ((decimal)4.68 * Tools.ConvertBirthdaytoAge(user.Birthday)) + 665);
                        break;
                }
            }

            tv_KiloCalories = tv_KiloCalories * (1 + (decimal)user.ActivityLevel / 10);

            return tv_KiloCalories;
        }
    }
}
