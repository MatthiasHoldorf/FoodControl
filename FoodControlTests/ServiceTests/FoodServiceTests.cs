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
    /// This is a test class for <see cref="FoodService"/> and is intended
    /// to contain all <see cref="FoodService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class FoodServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<Food> _foodList;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // test-values that should be returned by DataAccessLayer
            _foodList = new List<Food>
            {
                new Food { FoodID = 123, Name = "TestFoodToBeDeleted", IsDeleted = false },
                new Food { FoodID = 456, Name = "TestFood" }
            };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.Food.GetAll()).Returns(_foodList);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);
        }
        /// <summary>
        /// Unit-test for <see cref="FoodService"/>.GetCurrentFoodEntries().
        /// </summary>
        /// <remarks>
        /// Checks, if "TestFood" is in the current list of food entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnCurrentFoodEntries()
        {
            // act
            var result = _BLLcontext.Food.GetCurrentFoodEntries().LastOrDefault();

            // assert
            Assert.AreEqual(_foodList[1].Name, result.Name);
        }

        /// <summary>
        /// Unit-test for <see cref="FoodService"/>.MarkAsDelete().
        /// </summary>
        /// <remarks>
        /// Checks, if "TestFoodToBeDeleted" is marked as deleted and did not occur in the current list of food entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnFoodEntriesWithoutMarkedAsDeleted()
        {
            // arrange
            Food food = _BLLcontext.Food.GetCurrentFoodEntries().ToList()[0];

            // act
            _BLLcontext.Food.MarkAsDelete(food);
            var updatedFoodList = _BLLcontext.Food.GetCurrentFoodEntries().ToList();

            // assert
            Assert.IsTrue(updatedFoodList.Count == 1);
        }
    }
}
