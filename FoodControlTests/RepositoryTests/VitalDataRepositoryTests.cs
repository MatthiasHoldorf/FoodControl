using System;
using System.Transactions;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FoodControlTests.RepositoryTests
{
    /// <summary>
    /// This is a test class for <see cref="VitalData"/> repository and is intended
    /// to contain the basic <see cref="VitalData"/> repository Unit Tests.
    ///</summary>
    [TestClass]
    public class VitalDataRepositoryTests
    {
        private IDALContext _context = new DALContext();
        private VitalData _vitalData;
        private User _user;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            // initialise the vital data object.
            _user = new User()
            {
                UserID = 1337,
                FirstName = "Voll",
                LastName = "Horst",
                Birthday = DateTime.Now.AddDays(-6666),
                ActivityLevel = 1,
                Sex = 2,
                ProfileID = 1
            };
            _vitalData = new VitalData
            {
                Date = DateTime.Now,
                UserID = 1337,
                VitalID = 1888,
                BodyHeight = 180,
                BodyWeight = 100,
                User = _user
            };
        }
        /// <summary>
        /// Unit-test for <see cref="VitalData"/>.Create().
        /// </summary>
        /// <remarks>
        /// Checks, if TestVitalData is created.
        /// </remarks>
        [TestMethod]
        public void AddVitalData()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Act
                _context.VitalData.Create(_vitalData);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_vitalData, _context.VitalData.GetById(_vitalData.VitalID));
            }
        }
        /// <summary>
        /// Unit-test for <see cref="VitalData"/>.Update().
        /// </summary>
        /// <remarks>
        /// Checks, if TestVitalData is updated.
        /// </remarks>
        [TestMethod]
        public void UpdateVitalData()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.VitalData.Create(_vitalData);
                _context.SaveChanges();

                // assert vitalData is added
                Assert.AreEqual(_vitalData, _context.VitalData.GetById(_vitalData.VitalID));

                // Act
                _vitalData.BodyHeight = 185;
                _vitalData.BodyWeight = 133.7m;
                _context.VitalData.Update(_vitalData);
                _context.SaveChanges();

                // Assert
                Assert.AreEqual(_vitalData, _context.VitalData.GetById(_vitalData.VitalID));
                Assert.IsTrue(_context.VitalData.GetById(_vitalData.VitalID).BodyHeight == 185);
                Assert.IsTrue(_context.VitalData.GetById(_vitalData.VitalID).BodyWeight == 133.7m);
            }
        }
        /// <summary>
        /// Unit-test for <see cref="VitalData"/>.Delete().
        /// </summary>
        /// <remarks>
        /// Checks, if TestVitalData is deleted.
        /// </remarks>
        [TestMethod]
        public void DeleteVitalData()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // arrange
                _context.VitalData.Create(_vitalData);
                _context.SaveChanges();

                // assert vitalData is added
                Assert.AreEqual(_vitalData, _context.VitalData.GetById(_vitalData.VitalID));

                // act
                _context.VitalData.Delete(_vitalData);
                _context.SaveChanges();

                // assert vitalData is deleted
                Assert.IsNull(_context.VitalData.GetById(_vitalData.VitalID));
            }
        }

    }
}
