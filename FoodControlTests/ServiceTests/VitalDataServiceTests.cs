using System;
using System.Collections.Generic;
using System.Linq;
using FoodControl.BusinessLogicLayer;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace FoodControlTests.ServiceTests
{   /// <summary>
    /// This is a test class for <see cref="VitalDataService"/> and is intended
    /// to contain all <see cref="VitalDataService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class VitalDataServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<VitalData> _vitalDataList;

        private User _vitalDataUser;
        private VitalData _vitalData1;
        private VitalData _vitalData2;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // initialise the user for the vital data
            _vitalDataUser = new User()
            {
                UserID = 1337,
            };

            // test-values that should be returned by DataAccessLayer
            _vitalData1 = new VitalData() { Date = DateTime.Now, UserID = _vitalDataUser.UserID, VitalID = 1 };
            _vitalData2 = new VitalData() { Date = DateTime.Now.AddDays(1), UserID = _vitalDataUser.UserID, VitalID = 2 };
            _vitalDataList = new List<VitalData> { _vitalData1, _vitalData2 };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.VitalData.GetAll()).Returns(_vitalDataList);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);

        }

        /// <summary>
        /// Unit-test for <see cref="VitalDataService"/>.GetLastId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetLastId() returns the ID of the last vital data entry.
        /// </remarks>
        [TestMethod]
        public void ReturnLastVitalDataId()
        {
            // act
            var lastVitalDataId = _BLLcontext.VitalData.GetLastId();
            // assert
            Assert.AreEqual(_vitalData2.VitalID, lastVitalDataId);
        }

        /// <summary>
        /// Unit-test for <see cref="VitalDataService"/>.GetVitalDataByUserId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetVitalDataByUserId() returns the vitalDataList for _vitalDataUser.
        /// </remarks>
        [TestMethod]
        public void ReturnVitalDataForUser()
        {
            // act
            var vitalDataListForUser = _BLLcontext.VitalData.GetVitalDataByUserId(_vitalDataUser.UserID).ToList();
            // assert
            Assert.AreEqual(_vitalDataUser.UserID, vitalDataListForUser[0].UserID);
            Assert.IsTrue(vitalDataListForUser.Count == _vitalDataList.Count);
        }

        /// <summary>
        /// Unit-test for <see cref="VitalDataService"/>.GetVitalDataByUserIdAndDate().
        /// </summary>
        /// <remarks>
        /// Checks, if GetVitalDataByUserIdAndDate() returns the vital data for tomorrow and _nutritionLogUser.
        /// </remarks>
        [TestMethod]
        public void ReturnVitalDataByUserIdAndDate()
        {
            // act
            var vitalDataForUserAndTomorrow = _BLLcontext.VitalData.GetVitalDataByUserIdAndDate(_vitalDataUser.UserID, DateTime.Now.AddDays(1));

            // assert
            Assert.AreEqual(_vitalDataUser.UserID, vitalDataForUserAndTomorrow.UserID);
            Assert.AreEqual(DateTime.Now.AddDays(1).ToShortDateString(), vitalDataForUserAndTomorrow.Date.ToShortDateString());
        }
    }
}

