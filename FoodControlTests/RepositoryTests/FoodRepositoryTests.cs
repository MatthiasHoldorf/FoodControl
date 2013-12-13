using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests
{
    /// <summary>
    /// This is a test class for <see cref="Food"/> repository and is intended
    /// to contain the basic <see cref="Food"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class FoodRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private Food _food;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the food object.
            _food = new Food
            {
                PortionID = 1,
                Name = "TestFood",
                KiloCalories = 100,
                Carbohydrate = 1,
                Protein = 20,
                Fat = 1,
                Sugar = 0,
                Salt = 0,
                Saturates = 0,
                BaseUnit = 20,
                MeasuringUnit = 1,
            };
        }
        /// <summary>
        /// Unit-test for <see cref="Food"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if TestFood is created.
        /// </remarks>
        [TestMethod]
        public void AddFood()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.Food.Create(_food);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_food, _context.Food.GetAll().LastOrDefault());
                Assert.AreEqual(_food, _context.Food.GetById(_food.FoodID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Food"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if TestFood is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateFood()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Food.Create(_food);
                _context.SaveChanges();

                // assert _food is added
                Assert.AreEqual(_food, _context.Food.GetById(_food.FoodID));

                // Act
                _food.Name = "updatedFood";
                _food.KiloCalories = 133.7m;
                _context.Food.Update(_food);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_food, _context.Food.GetById(_food.FoodID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Food"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if TestFood is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteFood()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Food.Create(_food);
                _context.SaveChanges();

                // assert _food is added
                Assert.AreEqual(_food, _context.Food.GetById(_food.FoodID));

                // act
                _context.Food.Delete(_food);
                _context.SaveChanges();

                // assert _food is deleted
                Assert.IsTrue(_context.Food.GetAll().LastOrDefault().IsDeleted);
                Assert.IsNull(_context.Food.GetById(_food.FoodID));
            }
        }
    }
}
