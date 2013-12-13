using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="Portion"/> repository and is intended
    /// to contain the basic <see cref="Portion"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class PortionRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private Portion _portion;
        private Food _food;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the portion object.
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

            _portion = new Portion()
            {
                Name = "TestPortion",
                PortionID = 1337,
                Foods = new List<Food>() { _food }
            };
        }
        /// <summary>
        /// Unit-test for <see cref="Portion"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if TestPortion is created.
        /// </remarks>
        [TestMethod]
        public void AddPortion()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.Portion.Create(_portion);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_portion, _context.Portion.GetAll().LastOrDefault());
                Assert.AreEqual(_portion, _context.Portion.GetById(_portion.PortionID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Portion"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if TestPortion is updated.
        /// </remarks>
        [TestMethod]
        public void UpdatePortion()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Portion.Create(_portion);
                _context.SaveChanges();

                // assert portion is added
                Assert.AreEqual(_portion, _context.Portion.GetById(_portion.PortionID));

                // Act
                _portion.Name = "updatedFood";
                _portion.Foods.ToList()[0].Name = "updatedFoodName";
                _portion.Foods.ToList()[0].KiloCalories = 13.37m;
                _context.Portion.Update(_portion);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_portion, _context.Portion.GetById(_portion.PortionID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Portion"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if TestPortion is deleted.
        /// </remarks>
        [TestMethod]
        public void DeletePortion()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Portion.Create(_portion);
                _context.SaveChanges();

                // assert portion is added
                Assert.AreEqual(_portion, _context.Portion.GetById(_portion.PortionID));

                // act
                _context.Portion.Delete(_portion);
                _context.SaveChanges();

                // assert portion is deleted
                Assert.IsNull(_context.Portion.GetById(_portion.PortionID));
            }
        }
    }
}
