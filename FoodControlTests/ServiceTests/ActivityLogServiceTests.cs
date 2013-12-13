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
    /// This is a test class for <see cref="ActivityLogService"/> and is intended
    /// to contain all <see cref="ActivityLogService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class ActivityLogServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private Mock<IDALContext> _DALcontextVitalDataMock;
        private List<ActivityLog> _activityLogList;
        private User _activityLogUser;
        private Activity activity;
        private List<VitalData> _vitalData;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();
            _DALcontextVitalDataMock = new Mock<IDALContext>();

            // initialise the user data for the activity logs
            _activityLogUser = new User()
            {
                UserID = 1337,
                ActivityLogs = _activityLogList,
            };
            VitalData weigth = new VitalData()
            {
                VitalID = 1,
                UserID = _activityLogUser.UserID,
                Date = DateTime.Now.AddDays(-10),
                BodyHeight = 180,
                BodyWeight = 100m,
                User = _activityLogUser
            };
            _vitalData = new List<VitalData>() { weigth };
            _activityLogUser.VitalDatas = _vitalData;

            // test-values that should be returned by DataAccessLayer
            activity = new Activity() { ActID = 1, Name = "Activity1", MET = 10.5m };
            _activityLogList = new List<ActivityLog>
            {
                new ActivityLog{ Activity = activity, Date=DateTime.Now,Duration=30, User = _activityLogUser, UserID = _activityLogUser.UserID},
                new ActivityLog{ Activity = activity, Date=DateTime.Now.AddHours(1),Duration=30, User = _activityLogUser, UserID = _activityLogUser.UserID},
                new ActivityLog{ Activity = activity, Date=DateTime.Now.AddDays(1),Duration=30, User = _activityLogUser, UserID = _activityLogUser.UserID}
            };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.ActivityLog.GetAll()).Returns(_activityLogList);
            _DALcontextMock.Setup(context => context.VitalData.GetAll()).Returns(_vitalData);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);

        }

        /// <summary>
        /// Unit-test for <see cref="ActivityLogService"/>.GetActivityLogByUserId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetActivityLogByUserId() returns the activityLogList for _activityLogUser.
        /// </remarks>
        [TestMethod]
        public void ReturnActivityLogByUserId()
        {
            // act
            var activityLogListForUser = _BLLcontext.ActivityLog.GetActivityLogByUserId(_activityLogUser.UserID).ToList();
            // assert
            Assert.AreEqual(_activityLogUser.UserID, activityLogListForUser[0].UserID);
            Assert.IsTrue(activityLogListForUser.Count == _activityLogList.Count);
        }

        /// <summary>
        /// Unit-test for <see cref="ActivityLogService"/>.GetActivityLogByUserIdAndDate().
        /// </summary>
        /// <remarks>
        /// Checks, if GetActivityLogByUserIdAndDate() returns the activityLogList for tomorrow and _activityLogUser.
        /// </remarks>
        [TestMethod]
        public void ReturnActivityLogByUserIdAndDate()
        {
            // act
            var activityLogListFor1337andTomorrow = _BLLcontext.ActivityLog.GetActivityLogByUserIdAndDate(_activityLogUser.UserID, DateTime.Now.AddDays(1)).ToList();
            // assert
            Assert.AreEqual(_activityLogUser.UserID, activityLogListFor1337andTomorrow[0].UserID);
            Assert.IsTrue(activityLogListFor1337andTomorrow.Count == 1);
        }

        /// <summary>
        /// Unit-test for <see cref="ActivityLogService"/>.GetDistinctDateList().
        /// </summary>
        /// <remarks>
        /// Checks, if GetDistinctDateList() returns a list with distinct entries.
        /// </remarks>
        [TestMethod]
        public void ReturnDistinctActivityLogDateList()
        {
            // act
            var distinctDateList = _BLLcontext.ActivityLog.GetDistinctDateList(_activityLogList).ToList();
            // assert
            Assert.IsTrue(distinctDateList.Count == 2);
        }
    }
}
