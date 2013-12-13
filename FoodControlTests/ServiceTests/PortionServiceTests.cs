using System.Collections.Generic;
using FoodControl.BusinessLogicLayer;
using FoodControl.DataAccessLayer;
using FoodControl.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace FoodControlTests.ServiceTests
{
    /// <summary>
    /// This is a test class for <see cref="PortionService"/> and is intended
    /// to contain all <see cref="PortionService"/> Unit Tests
    ///</summary>
    [TestClass]
    public class PortionServiceTests
    {
        private IBLLContext _BLLcontext;
        private Mock<IDALContext> _DALcontextMock;
        private List<Portion> _portionList;

        /// <summary>
        /// Initialises the test context which provides
        /// information about and functionality for the current test run.
        ///</summary>
        [TestInitialize]
        public void Init()
        {
            _DALcontextMock = new Mock<IDALContext>();

            // test-values that should be returned by DataAccessLayer
            _portionList = new List<Portion>
            {
               new Portion(){PortionID = 1,Name = "portionNumerOne"},
               new Portion(){PortionID = 2, Name = "portionNumberTwo"}
            };

            // setup the mocked DataAccessLayer object
            _DALcontextMock.Setup(context => context.Portion.GetAll()).Returns(_portionList);

            // instantiate the BusinessLayerContext with the mocked object of the DataAccessLayer
            _BLLcontext = new BLLContext(_DALcontextMock.Object);
        }

        /// <summary>
        /// Unit-test for <see cref="PortionService"/>.GetPortionByName().
        /// </summary>
        /// <remarks>
        /// Checks, if GetPortionByName() returns the correct portion. 
        /// </remarks>
        [TestMethod]
        public void ReturnPortionByName()
        {
            // act
            var result = _BLLcontext.Portion.GetPortionByName("portionNumberTwo");

            // assert
            Assert.AreEqual(_portionList[1].Name, result.Name);
        }
    }
}

