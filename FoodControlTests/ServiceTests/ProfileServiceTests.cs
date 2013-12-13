using System;
using System.Collections.Generic;
using System.Linq;
using FoodControl.BusinessLogicLayer;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using FoodControl.Utility;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace FoodControlTests.ServiceTests
{
    /// <summary>
    /// This is a test class for <see cref="ProfileService"/> and is intended
    /// to contain all <see cref="ProfileService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class ProfileServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<Profile> _profileList;

        private Profile _profile1;
        private Profile _profile2;

        private User _user;

        private NutrientAggregation _nutritionAggregation;

        private VitalData _vitalData;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // test-values that should be returned by DataAccessLayer
            _user = new User() { UserID = 1337, Birthday = new DateTime(1985, 01, 02), ActivityLevel = 1, Sex = 1 };
            _vitalData = new VitalData() { BodyHeight = 180, BodyWeight = 90 };
            _nutritionAggregation = new NutrientAggregation()
            {
                KiloCalories = 2000m,
                Carbohydrate = 10m,
                Protein = 20m,
                Fat = 30m,
                Sugar = 0m,
                Salt = 13.37m
            };
            _profile1 = new Profile()
            {
                ProfileID = 123,
                Name = "TestProfileToBeDeleted",
                IsDeleted = false
            };
            _profile2 = new Profile()
            {
                ProfileID = 456,
                Name = "TestProfile",
                Users = new List<User>() { _user },
                TV_Calories = _nutritionAggregation.KiloCalories,
                TV_Carbohydrate = 15.5897m,
                TV_Protein = _nutritionAggregation.Protein,
                TV_Fat = _nutritionAggregation.Fat,
                TV_Sugar = _nutritionAggregation.Sugar,
                TV_Salt = _nutritionAggregation.Salt
            };
            _profileList = new List<Profile>() { _profile1, _profile2 };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.Profile.GetAll()).Returns(_profileList);
            _DALcontextMock.Setup(context => context.Profile.GetById(_profile1.ProfileID)).Returns(_profile1);
            _DALcontextMock.Setup(context => context.Profile.GetById(_profile2.ProfileID)).Returns(_profile2);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);
        }

        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.GetLastId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetLastId() returns the ID of the last profile entry.
        /// </remarks>
        [TestMethod]
        public void ReturnLastProfileId()
        {
            // act
            var lastProfileId = _BLLcontext.Profile.GetLastId();
            // assert
            Assert.AreEqual(456, lastProfileId);
        }

        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.GetCurrentProfileEntries().
        /// </summary>
        /// <remarks>
        /// Checks, if GetCurrentProfileEntries() returns the current list of profile entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnCurrentProfileEntries()
        {
            // act
            var result = _BLLcontext.Profile.GetCurrentProfileEntries().ToList();

            // assert
            Assert.IsTrue(result.Count == 2);
        }

        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.MarkAsDelete().
        /// </summary>
        /// <remarks>
        /// Checks, if "TestProfileToBeDeleted" is marked as deleted and did not occur in the current list of profile entries. 
        /// </remarks>
        [TestMethod]
        public void ReturnProfileEntriesWithoutMarkedAsDeleted()
        {
            // arrange
            Profile profile = _BLLcontext.Profile.GetCurrentProfileEntries().ToList()[0];

            // act
            _BLLcontext.Profile.MarkAsDelete(profile);
            var updatedProfileList = _BLLcontext.Profile.GetCurrentProfileEntries().ToList();

            // assert
            Assert.IsTrue(updatedProfileList.Count == 1);
            Assert.AreEqual(_profile2, updatedProfileList[0]);
        }
        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.GetSuggestedProfile().
        /// </summary>
        /// <remarks>
        /// Checks, if GetSuggestedProfile() returns the suggestion of a profil:
        /// lose = currentKiloCalories * (-25%)
        /// hold = currentKiloCalories 
        /// gain = currentKiloCalories * (+25%)
        /// </remarks>
        [TestMethod]
        public void ReturnSuggestedProfile()
        {
            // arrange
            Profile lose = new Profile() { TV_Calories = Tools.GetBasicRequirements(_user, _vitalData) * (.75m) };
            Profile hold = new Profile() { TV_Calories = Tools.GetBasicRequirements(_user, _vitalData) };
            Profile gain = new Profile() { TV_Calories = Tools.GetBasicRequirements(_user, _vitalData) * (1.25m) };

            // act
            var resultLose = _BLLcontext.Profile.GetSuggestedProfile(_user, _vitalData, 1);
            var resultHold = _BLLcontext.Profile.GetSuggestedProfile(_user, _vitalData, 2);
            var resultGain = _BLLcontext.Profile.GetSuggestedProfile(_user, _vitalData, 3);

            // assert
            Assert.AreEqual(lose.TV_Calories, resultLose.TV_Calories);
            Assert.AreEqual(hold.TV_Calories, resultHold.TV_Calories);
            Assert.AreEqual(gain.TV_Calories, resultGain.TV_Calories);

        }
        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.GetTargetValuesById().
        /// </summary>
        /// <remarks>
        /// Checks, if GetTargetValuesById() returns the nutritionAggregation for the specific profile.
        /// </remarks>
        [TestMethod]
        public void ReturnTargetValuesById()
        {
            // act
            var goalValues = _BLLcontext.Profile.GetTargetValuesById(_profileList[1].ProfileID);

            // assert
            Assert.AreEqual(_nutritionAggregation.Salt, goalValues.Salt);
            Assert.AreEqual(_nutritionAggregation.Sugar, goalValues.Sugar);
            Assert.AreNotEqual(_nutritionAggregation.Carbohydrate, goalValues.Carbohydrate);
            Assert.AreEqual(15.5897m, goalValues.Carbohydrate);
        }
        /// <summary>
        /// Unit-test for <see cref="ProfileService"/>.GetProfileByUserId().
        /// </summary>
        /// <remarks>
        /// Checks, if GetProfileByUserId() returns the profil for userId 1337.
        /// </remarks>
        [TestMethod]
        public void ReturnProfileByUserId()
        {
            // act
            var userProfile = _BLLcontext.Profile.GetProfileByUserId(_profileList[1].Users.ToList()[0].UserID);

            // assert
            Assert.AreEqual(_user.UserID, userProfile.Users.ToList()[0].UserID);
        }

        [TestMethod]
        public void ReturnProfileById()
        {
            // act
            var userProfil = _BLLcontext.Profile.GetProfileById(_profile1.ProfileID);

            //assert
            Assert.AreEqual(_profile1, userProfil);
        }


    }
}
