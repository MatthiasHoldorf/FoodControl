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
    /// This is a test class for <see cref="ActivityService"/> and is intended
    /// to contain all <see cref="ActivityService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class ActivityServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<Activity> _activityList;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // test-values that should be returned by DataAccessLayer
            _activityList = new List<Activity>
            {
                new Activity() { Name = "TestActivityToBeDeleted", IsDeleted = false },
                new Activity() { Name = "TestActivity" }
            };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.Activity.GetAll()).Returns(_activityList);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);
        }

        /// <summary>
        /// Unit-test for <see cref="ActivityService"/>.GetCurrentActivityEntries().
        /// </summary>
        /// <remarks>
        /// Checks, if GetCurrentActivityEntries() returns the current list of activity entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnCurrentActivityEntries()
        {
            // act
            var currentActivityList = _BLLcontext.Activity.GetCurrentActivityEntries().ToList();

            // assert
            Assert.IsTrue(currentActivityList.Count == 2);
        }

        /// <summary>
        /// Unit-test for <see cref="ActivityService"/>.MarkAsDelete().
        /// </summary>
        /// <remarks>
        /// Checks, if "TestActivityToBeDeleted" is marked as deleted and did not occur in the current list of activity entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnActivityEntriesWithoutMarkedAsDeleted()
        {
            // arrange
            Activity activity = _BLLcontext.Activity.GetCurrentActivityEntries().ToList()[0];

            // act
            _BLLcontext.Activity.MarkAsDelete(activity);
            var updatedActivityList = _BLLcontext.Activity.GetCurrentActivityEntries().ToList();

            // assert
            Assert.IsTrue(updatedActivityList.Count == 1);
        }
    }
}

