var roomPage = require('../../../pages/roomPage.js');
var loginPage = require('../../../pages/loginPage.js');
var chatPage = require('../../../pages/chatPage.js');
var expect = require('../../../utils/chai.js');

var chatName = "";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Before(async () => {
  await loginPage.init();
  await chatPage.init();
  return roomPage.init();
});

Given('The chat.io main page', async () => {
  //todo find a way to get addTokensCookies() working
  //await loginPage.addTokensCookies();
  //return browser.get(`${browser.params.baseurl}/rooms`);
  await browser.get(browser.params.baseurl);
  await loginPage.signIn();
  return roomPage.waitUntilRoomFormIsLoaded();
});

When('The user fill the room name', async () => {
  chatName = await roomPage.setNewChatNameInput();
  await roomPage.clickOnCreateChatButton();
  return roomPage.enterRoom(chatName);
});

Then('A new room is created', async () => {
  await chatPage.waitUntilChatIsLoaded();
  return expect(await chatPage.getChatTitle()).to.eql(chatName);
});

After(async () => {
  // Todo find a way to deleted from rooms Collection Documents with title starting with `automation_`
});
