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
            const string username = "kalashnikov.987@gmail.com";
            const string usernameEncoded = "a2FsYXNobmlrb3YuOTg3QGdtYWlsLmNvbQ==";
            const string firstName = "Leonardo";

            var repository = Substitute.For<IUserRepository>();
            var controller = Substitute.For<AccountController>(repository);

            IHttpActionResult dto = new OkNegotiatedContentResult<Customer>(new Customer { UserName = username, FirstName = firstName }, controller);
            controller.GetByUserName(usernameEncoded).Returns(dto);

            // Act
            var result = controller.GetByUserName(usernameEncoded) as OkNegotiatedContentResult<Customer>;

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

            controller.GetByUserName(string.Empty).Returns(badRequest);

            // Act
            var result = controller.GetByUserName(string.Empty);

            // Assert
            Assert.IsInstanceOfType(result, typeof(InvalidModelStateResult));
        }
    }
}