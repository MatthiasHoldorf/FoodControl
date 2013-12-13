using System;
using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="NutritionLog"/> repository and is intended
    /// to contain the basic <see cref="NutritionLog"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class NutritionLogRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private NutritionLog _nutritionLog;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the NutritionLog object.
            _nutritionLog = new NutritionLog()
            {
                NLID = 1337,
                UserID = 1,
                Quantity = 50,
                FoodID = 1,
                Date = DateTime.Now.AddDays(-1),
                Daytime = 2,
                ProfileID = 1
            };
        }
        /// <summary>
        /// Unit-test for <see cref="NutritionLog"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if NutritionLog is created.
        /// </remarks>
        [TestMethod]
        public void AddNutritionLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.NutritionLog.Create(_nutritionLog);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_nutritionLog, _context.NutritionLog.GetAll().LastOrDefault());
                Assert.AreEqual(_nutritionLog, _context.NutritionLog.GetById(_nutritionLog.NLID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="NutritionLog"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if NutritionLog is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateNutritionLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.NutritionLog.Create(_nutritionLog);
                _context.SaveChanges();

                // assert NutritionLog is added
                Assert.AreEqual(_nutritionLog, _context.NutritionLog.GetById(_nutritionLog.NLID));

                // Act
                _nutritionLog.Quantity = 60;

                _context.NutritionLog.Update(_nutritionLog);
                _context.SaveChanges();

                // Assert
                Assert.IsTrue(_context.NutritionLog.GetById(_nutritionLog.NLID).Quantity == 60);
                Assert.AreEqual(_nutritionLog, _context.NutritionLog.GetById(_nutritionLog.NLID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="NutritionLog"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if NutritionLog is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteNutritionLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.NutritionLog.Create(_nutritionLog);
                _context.SaveChanges();

                // assert NutritionLog is added
                Assert.AreEqual(_nutritionLog, _context.NutritionLog.GetById(_nutritionLog.NLID));

                // act
                _context.NutritionLog.Delete(_nutritionLog);
                _context.SaveChanges();

                // assert NutritionLog is deleted
                Assert.IsNull(_context.NutritionLog.GetById(_nutritionLog.NLID));
            }
        }
    }
}
