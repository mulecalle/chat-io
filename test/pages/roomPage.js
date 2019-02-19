var wrappers = require('../utils/wrappers.js');

module.exports = {

  init: () => {
    roomForm = element(by.css('div[class="room"]'));
    newRoomInput = roomForm.element(by.css('input[name="title"]'));
    createRoomButton = roomForm.element(by.css('div[class="room-create clearfix"] button'));
    selectRoom = roomName => roomForm.element(by.cssContainingText('li[class="room-item"]', roomName));
  },

  waitUntilRoomFormIsLoaded: async () => wrappers.waitForVisible(roomForm),
  setNewChatNameInput: async (chatName = '') => {

    if (chatName == '') {
      const id = await wrappers.getHash();
      chatname = `automation_${id}`;
    }

    await newRoomInput.sendKeys(chatname);
    return chatname;
  },

  clickOnCreateChatButton: async () => wrappers.click(createRoomButton),

  enterRoom: async (roomName) => {

    if (roomName.length >= 25){
      roomName2 = roomName.slice(0, 25);
      roomName3 = roomName2.concat('...');
      await wrappers.waitForVisible(selectRoom(roomName3));
      return wrappers.click(selectRoom(roomName3));
    }
  }

};
