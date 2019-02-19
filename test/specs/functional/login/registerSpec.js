var loginPage = require('../../../pages/loginPage.js');
var expect = require('../../../utils/chai.js');

Before(async () => {
  return loginPage.init();
});

Given('The chat.io register page', async () => {
  await browser.get(browser.params.baseurl);
  await loginPage.waitUntilLoginFormIsLoaded();
  await loginPage.clickOnCreateAccountButton();
  return loginPage.waitUntilRegisterFormIsLoaded();
});

When('The user fills the user and password fields', async () => {
  await loginPage.setUsernameRegisterInput();
  await loginPage.setPasswordRegisterInput();
  await loginPage.clickOnSubmitButton();
  return loginPage.waitUntilLoginFormIsLoaded();
});

Then('A registration success message is displayed', async () => expect(messageSuccess).to.exist);

After(async () => {
  // Todo find a way to deleted from users Collection Documents with username starting with `automation_`
});
