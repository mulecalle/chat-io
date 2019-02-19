var loginPage = require('../../../pages/loginPage.js');
var roomPage = require('../../../pages/roomPage.js');
var expect = require('../../../utils/chai.js');

Before(async () => {
  await loginPage.init();
  return roomPage.init();
});

Given('The chat.io login page', async () => {
  await browser.get(browser.params.baseurl);
  return loginPage.waitUntilLoginFormIsLoaded();
});

When('The user completes the user and password fields at the register page', async () => {
  await loginPage.setUsernameLoginInput(browser.params.login.account);
  await loginPage.setPasswordLoginInput(browser.params.login.password);
  return loginPage.clickOnLoginButton();

});

Then('The user access the main page', async () => {
  await roomPage.waitUntilRoomFormIsLoaded();
  return expect(roomForm).to.exist;
});
