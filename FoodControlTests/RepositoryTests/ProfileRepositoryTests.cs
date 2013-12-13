using System.Linq;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="Profile"/> repository and is intended
    /// to contain the basic <see cref="Profile"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class ProfileRepositoryTests
    {

        private IDALContext _context = new DALContext();
        private Profile _profile;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the portion object.       

            _profile = new Profile
            {
                ProfileID = 1337,
                Name = "TestProfile",
                TV_Calories = 2500m
            };
        }
        /// <summary>
        /// Unit-test for <see cref="Profile"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if TestProfile is created.
        /// </remarks>
        [TestMethod]
        public void AddProfile()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.Profile.Create(_profile);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_profile, _context.Profile.GetAll().LastOrDefault());
                Assert.AreEqual(_profile, _context.Profile.GetById(_profile.ProfileID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Profile"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if TestProfile is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateProfile()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Profile.Create(_profile);
                _context.SaveChanges();

                // assert profile is added
                Assert.AreEqual(_profile, _context.Profile.GetById(_profile.ProfileID));

                // Act
                _profile.Name = "updatedProfile";
                _profile.TV_Calories = 1337m;
                _context.Profile.Update(_profile);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_profile, _context.Profile.GetById(_profile.ProfileID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="Profile"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if TestProfile is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteProfile()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.Profile.Create(_profile);
                _context.SaveChanges();

                // assert profile is added
                Assert.AreEqual(_profile, _context.Profile.GetById(_profile.ProfileID));

                // act
                _context.Profile.Delete(_profile);
                _context.SaveChanges();

                // assert profile is deleted
                Assert.IsNull(_context.Profile.GetById(_profile.ProfileID));
            }
        }

    }
}
