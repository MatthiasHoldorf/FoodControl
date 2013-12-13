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
    /// This is a test class for <see cref="UserService"/> and is intended
    /// to contain all <see cref="UserService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class UserServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<User> _userList;

        private User _user1;
        private User _user2;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // test-values that should be returned by DataAccessLayer
            _user1 = new User() { UserID = 1000, Profile = new Profile() { ProfileID = 1 } };
            _user2 = new User() { UserID = 1337, Profile = new Profile() { ProfileID = 2 } };
            _userList = new List<User>() { _user1, _user2 };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.User.GetAll()).Returns(_userList);
            _DALcontextMock.Setup(context => context.User.GetById(_user1.UserID)).Returns(_user1);
            _DALcontextMock.Setup(context => context.User.GetById(_user2.UserID)).Returns(_user2);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);


        }

        /// <summary>
        /// Unit-test for <see cref="UserService"/>.GetLastId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetLastId() returns the ID of the last user entry.
        /// </remarks>
        [TestMethod]
        public void ReturnLastUserId()
        {
            // act
            var lastUserId = _BLLcontext.User.GetLastId();
            // assert
            Assert.AreEqual(_user2.UserID, lastUserId);
        }

        /// <summary>
        /// Unit-test for <see cref="UserService"/>.GetUserById().
        /// </summary>
        /// <remarks>
        /// Checks, if GetUserById() returns the user for the userId.
        /// </remarks>
        [TestMethod]
        public void ReturnUserById()
        {
            // act
            var user = _BLLcontext.User.GetUserById(1000);
            // assert
            Assert.AreEqual(_user1, user);
        }

        /// <summary>
        /// Unit-test for <see cref="UserService"/>.GetAllProfiles().
        /// </summary>
        /// <remarks>
        /// Checks, if GetAllProfiles() returns the user profiles.
        /// </remarks>
        [TestMethod]
        public void ReturnAllUserProfiles()
        {
            // act
            var allUserProfiles = _BLLcontext.User.GetAllProfiles().ToList();

            // assert
            Assert.IsTrue(allUserProfiles.Count == _userList.Count);
        }

        /// <summary>
        /// Unit-test for <see cref="UserService"/>.Count().
        /// </summary>
        /// <remarks>
        /// Checks, if Count() returns number of user entries.
        /// </remarks>
        [TestMethod]
        public void ReturnUserCount()
        {
            // act
            var userCount = _BLLcontext.User.Count();

            // assert
            Assert.IsTrue(userCount == _userList.Count);
        }
    }
}

