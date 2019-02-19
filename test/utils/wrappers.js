var uuidv1 = require('uuid/v1');
var loremIpsum = require('lorem-ipsum');
var expCond = protractor.ExpectedConditions;

module.exports = {

  getHash: async () => uuidv1(),

  waitForVisible: async (element, timeout = browser.params.DEFAULT_TIMEOUT, message = `Wait for visibility of ${element.locator()} timed out after ${timeout / 1000} seconds`) => {
    return browser.wait(await expCond.visibilityOf(element), timeout, message);
  },

  click: async (element, timeout = browser.params.DEFAULT_TIMEOUT) => {
    await browser.wait(await expCond.elementToBeClickable(element), timeout, `Element with locator ${element.locator().toString()} is not clickable!`);
    const originalStyle = await element.getAttribute('style');
    await browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])', element, 'style', 'border: 2px solid red; border-style: dashed;');
    await browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])', element, 'style', originalStyle);
    return element.click();
  }

};
