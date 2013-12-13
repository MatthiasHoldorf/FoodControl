using System;
using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="ActivityLog"/> repository and is intended
    /// to contain the basic <see cref="ActivityLog"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class ActivityLogRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private ActivityLog _activityLog;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the ActivityLog object.
            _activityLog = new ActivityLog()
            {
                ALID = 1337,
                ActID = 1,
                UserID = 1,
                Duration = 50,
                Date = DateTime.Now.AddDays(-1),
            };
        }
        /// <summary>
        /// Unit-test for <see cref="ActivityLog"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if ActivityLog is created.
        /// </remarks>
        [TestMethod]
        public void AddActivityLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.ActivityLog.Create(_activityLog);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_activityLog, _context.ActivityLog.GetAll().LastOrDefault());
                Assert.AreEqual(_activityLog, _context.ActivityLog.GetById(_activityLog.ALID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="ActivityLog"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if ActivityLog is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateActivityLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.ActivityLog.Create(_activityLog);
                _context.SaveChanges();

                // assert ActivityLog is added
                Assert.AreEqual(_activityLog, _context.ActivityLog.GetById(_activityLog.ALID));

                // Act
                _activityLog.Duration = 60;

                _context.ActivityLog.Update(_activityLog);
                _context.SaveChanges();

                // Assert
                Assert.IsTrue(_context.ActivityLog.GetById(_activityLog.ALID).Duration == 60);
                Assert.AreEqual(_activityLog, _context.ActivityLog.GetById(_activityLog.ALID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="ActivityLog"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if ActivityLog is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteActivityLog()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.ActivityLog.Create(_activityLog);
                _context.SaveChanges();

                // assert ActivityLog is added
                Assert.AreEqual(_activityLog, _context.ActivityLog.GetById(_activityLog.ALID));

                // act
                _context.ActivityLog.Delete(_activityLog);
                _context.SaveChanges();

                // assert ActivityLog is deleted
                Assert.IsNull(_context.ActivityLog.GetById(_activityLog.ALID));
            }
        }

    }
}
