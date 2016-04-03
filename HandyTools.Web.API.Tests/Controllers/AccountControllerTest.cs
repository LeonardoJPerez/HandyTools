using HandyTools.Models;
using HandyTools.Web.API.Controllers;
using HandyTools.Web.API.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.Results;

namespace HandyTools.Web.API.Tests.Controllers
{
    [TestClass]
    public class AccountControllerTest
    {
        [TestMethod]
        public void GetByUserName_HappyPath()
        {
            // Arrange
            const string username = "find.leonardo@gmail.com";
            const string firstName = "Leonardo";

            var repository = Substitute.For<IUserRepository>();
            var controller = Substitute.For<AccountController>(repository);

            IHttpActionResult dto = new OkNegotiatedContentResult<Customer>(new Customer { UserName = username, FirstName = firstName }, controller);
            controller.GetByUserName(Arg.Any<string>()).ReturnsForAnyArgs(dto);

            // Act
            var result = controller.GetByUserName(username) as OkNegotiatedContentResult<Customer>;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(username, result.Content.UserName);
        }

        [TestMethod]
        public void UserDoesntExist()
        {
            // Arrange
            var repository = Substitute.For<IUserRepository>();
            var controller = Substitute.For<AccountController>(repository);
            var badRequest = Substitute.For<InvalidModelStateResult>(new ModelStateDictionary(), controller);

            controller.GetByUserName(Arg.Any<string>()).Returns(badRequest);

            // Act
            var result = controller.GetByUserName(string.Empty);

            // Assert
            Assert.IsInstanceOfType(result, typeof(InvalidModelStateResult));
        }
    }
}