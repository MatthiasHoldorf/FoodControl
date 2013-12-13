using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="Activity"/> repository and is intended
    /// to contain the basic <see cref="Activity"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class ActivityRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private Activity _activity;
        private List<ActivityLog> _activityLogList;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the activity object.
            _activityLogList = new List<ActivityLog>();
            _activity = new Activity
            {
                ActID = 1,
                IsDeleted = false,
                MET = 8,
                Name = "TestActivity",
                ActivityLogs = _activityLogList
            };
        }
        /// <summary>
        /// Unit-test for <see cref="Activity"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if TestActivity is created.
        /// </remarks>
        [TestMethod]
        public void AddActivity()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.Activity.Create(_activity);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_activity, _context.Activity.GetAll().LastOrDefault());
                Assert.AreEqual(_activity, _context.Activity.GetById(_activity.ActID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Activity"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if TestActivity is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateActivity()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Activity.Create(_activity);
                _context.SaveChanges();

                // assert activity is added
                Assert.AreEqual(_activity, _context.Activity.GetById(_activity.ActID));

                // Act
                _activity.Name = "updatedActivity";
                _activity.MET = 13.7m;
                _context.Activity.Update(_activity);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_activity, _context.Activity.GetById(_activity.ActID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Activity"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if TestActivity is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteActivity()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Activity.Create(_activity);
                _context.SaveChanges();

                // assert activity is added
                Assert.AreEqual(_activity, _context.Activity.GetById(_activity.ActID));

                // act
                _context.Activity.Delete(_activity);
                _context.SaveChanges();

                // assert activity is deleted
                Assert.IsNull(_context.Activity.GetById(_activity.ActID));
            }
        }
    }
}
