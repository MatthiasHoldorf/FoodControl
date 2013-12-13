using System;
using System.Collections.Generic;
using System.Linq;
using FoodControl.BusinessLogicLayer;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;


namespace FoodControlTests.ServiceTests
{
    /// <summary>
    /// This is a test class for <see cref="NutritionLogService"/> and is intended
    /// to contain all <see cref="NutritionLogService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class NutritionLogServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<NutritionLog> _nutritionLogList;

        private User _nutritionLogUser;
        private Food _food;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // initialise the user data for the activity logs
            _nutritionLogUser = new User()
            {
                UserID = 1337,
            };

            // test-values that should be returned by DataAccessLayer
            _food = new Food()
            {
                FoodID = 2,
                Name = "Food1",
                KiloCalories = 10m,
                Carbohydrate = 10m,
                Protein = 10m,
                Fat = 10m,
                Sugar = 10m,
                Saturates = 10m,
                Salt = 10m
            };

            _nutritionLogList = new List<NutritionLog>
            {
                new NutritionLog(){ 
                    NLID = 1,
                    FoodID = _food.FoodID, 
                    Food = _food,  
                    Quantity =5m,
                    Date=DateTime.Now, 
                    User = _nutritionLogUser, 
                    UserID = _nutritionLogUser.UserID
                },
                new NutritionLog()
                { 
                    NLID= 3,
                    FoodID = _food.FoodID, 
                    Food = _food,  
                    Quantity =15m,
                    Date = DateTime.Now.AddDays(1), 
                    User = _nutritionLogUser, 
                    UserID = _nutritionLogUser.UserID
                },
            };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.NutritionLog.GetAll()).Returns(_nutritionLogList);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);

        }

        /// <summary>
        /// Unit-test for <see cref="NutritionLogService"/>.GetNutritionLogByUserId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetNutritionLogByUserId() returns the nutritionLogList for _nutritionLogUser.
        /// </remarks>
        [TestMethod]
        public void ReturnNutritionLogByUserId()
        {
            // act
            var nutritionLogListForUser = _BLLcontext.NutritionLog.GetNutritionLogByUserId(_nutritionLogUser.UserID).ToList();
            // assert
            Assert.AreEqual(_nutritionLogUser.UserID, nutritionLogListForUser[0].UserID);
            Assert.IsTrue(nutritionLogListForUser.Count == _nutritionLogList.Count);
        }

        /// <summary>
        /// Unit-test for <see cref="NutritionLogService"/>.GetNutritionLogByUserIdAndDate().
        /// </summary>
        /// <remarks>
        /// Checks, if GetNutritionLogByUserIdAndDate() returns the nutritionLogList for tomorrow and _nutritionLogUser.
        /// </remarks>
        [TestMethod]
        public void ReturnNutritionLogByUserIdAndDate()
        {
            // act
            var nutritionLogListFor1337andTomorrow = _BLLcontext.NutritionLog.GetNutritionLogByUserIdAndDate(_nutritionLogUser.UserID, DateTime.Now.AddDays(1)).ToList();
            // assert
            Assert.AreEqual(_nutritionLogUser.UserID, nutritionLogListFor1337andTomorrow[0].UserID);
            Assert.IsTrue(nutritionLogListFor1337andTomorrow.Count == 1);
        }

        /// <summary>
        /// Unit-test for <see cref="NutritionLogService"/>.GetDistinctDateList().
        /// </summary>
        /// <remarks>
        /// Checks, if GetDistinctDateList() returns a list with distinct entries.
        /// </remarks>
        [TestMethod]
        public void ReturnDistinctNutritionLogDateList()
        {
            // act
            var distinctDateList = _BLLcontext.NutritionLog.GetDistinctDateList(_nutritionLogList).ToList();
            // assert
            Assert.IsTrue(distinctDateList.Count == 2);
        }

        /// <summary>
        /// Unit-test for <see cref="NutritionLogService"/>.GetNutritionAggregationForSpecificDate().
        /// </summary>
        /// <remarks>
        /// Checks, if if the nutrition aggregation gets calculated correctly for the specific date.
        /// </remarks>
        [TestMethod]
        public void ReturnNutritionAggregationForSpecificDate()
        {
            // arrange results for today
            decimal quantityToday = _nutritionLogList[0].Quantity + _nutritionLogList[1].Quantity;
            NutrientAggregation resultForToday = new NutrientAggregation()
            {
                KiloCalories = Math.Round(_food.KiloCalories / 100 * quantityToday),
                Carbohydrate = Math.Round(_food.Carbohydrate / 100 * quantityToday),
                Protein = Math.Round(_food.Protein / 100 * quantityToday),
                Salt = Math.Round((decimal)_food.Salt / 100 * quantityToday),
                Sugar = Math.Round(_food.Sugar / 100 * quantityToday),
                Saturates = Math.Round((decimal)_food.Saturates / 100 * quantityToday),
                Fat = Math.Round(_food.Fat / 100 * quantityToday),
                Date = DateTime.Now
            };

            // arrange results for tomorrow
            decimal quantityTomorrow = _nutritionLogList[1].Quantity;
            NutrientAggregation resultForTomorrow = new NutrientAggregation()
            {
                KiloCalories = Math.Round(_food.KiloCalories / 100 * quantityTomorrow),
                Carbohydrate = Math.Round(_food.Carbohydrate / 100 * quantityTomorrow),
                Protein = Math.Round(_food.Protein / 100 * quantityTomorrow),
                Salt = Math.Round((decimal)_food.Salt / 100 * quantityTomorrow),
                Sugar = Math.Round(_food.Sugar / 100 * quantityTomorrow),
                Saturates = Math.Round((decimal)_food.Saturates / 100 * quantityTomorrow),
                Fat = Math.Round(_food.Fat / 100 * quantityTomorrow),
                Date = DateTime.Now.AddDays(1)
            };


            // act
            var nutritionAggregationForToday = _BLLcontext.NutritionLog.GetNutritionAggregationForSpecificDate(_nutritionLogUser.UserID, DateTime.Now);
            var nutritionAggregationForTomorrow = _BLLcontext.NutritionLog.GetNutritionAggregationForSpecificDate(_nutritionLogUser.UserID, DateTime.Now.AddDays(1));

            // assert today
            Assert.AreEqual(resultForToday.Date.ToShortDateString(), nutritionAggregationForToday.Date.ToShortDateString());

            // assert tomorrow
            Assert.AreEqual(resultForTomorrow.Date.ToShortDateString(), nutritionAggregationForTomorrow.Date.ToShortDateString());
            Assert.AreEqual(resultForTomorrow.KiloCalories, nutritionAggregationForTomorrow.KiloCalories);
        }

        /// <summary>
        /// Unit-test for <see cref="NutritionLogService"/>.GetNutritionAggregationList().
        /// </summary>
        /// <remarks>
        /// Checks, if GetNutritionAggregationList() returns the correct list for a specific nutrition log.
        /// </remarks>
        [TestMethod]
        public void ReturnNutritionAggregationList()
        {
            // act
            var nutritionAggregationListForNutritionLog = _BLLcontext.NutritionLog.GetNutritionAggregationList(_nutritionLogList).ToList();
            // assert
            Assert.IsTrue(nutritionAggregationListForNutritionLog.Count == 2);
        }
    }
}
