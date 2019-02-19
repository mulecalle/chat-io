var wrappers = require('../utils/wrappers.js');

module.exports = {

  init: () => {
    chatForm = element(by.css('div[class="chat"]'));
    chatRoomTitle = chatForm.element(by.css('div[class="chat-about"] div[class="chat-room"]'));
  },

  waitUntilChatIsLoaded: async () => wrappers.waitForVisible(chatForm),
  getChatTitle: async () => chatRoomTitle.getText()

};
