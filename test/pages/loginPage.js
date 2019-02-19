var wrappers = require('../utils/wrappers.js');
var AuthService = require('../utils/auth.js');
var expCond = protractor.ExpectedConditions;

module.exports = {

  init: () => {
    loginForm = element(by.css('form[class="login-form"]'));
    registerForm = element(by.css('form[class="register-form"]'));

    usernameLoginInput = loginForm.element(by.css('input[name="username"]'));
    passwordLoginInput = loginForm.element(by.css('input[name="password"]'));
    usernameRegisterInput = registerForm.element(by.css('input[name="username"]'));
    passwordRegisterInput = registerForm.element(by.css('input[name="password"]'));

    createAnAccountButton = loginForm.element(by.cssContainingText('.message','Create an account'));
    messageSuccess = loginForm.element(by.cssContainingText('message success','Your account has been created. Please log in.'));

    loginButton = loginForm.element(by.css('button[type="submit"]'));
    submitButton = registerForm.element(by.css('button[type="submit"]'));
  },

  setUsernameLoginInput: async (username) => usernameLoginInput.sendKeys(username),
  setPasswordLoginInput: async (password) => passwordLoginInput.sendKeys(password),

  setUsernameRegisterInput: async (username = '') => {

    if (username == '') {
      const id = await wrappers.getHash();
      username = `automation_${id}`;
    }

    return usernameRegisterInput.sendKeys(username);
  },
  setPasswordRegisterInput: async (password = 'd3f4ultP4ssw0rd') => passwordRegisterInput.sendKeys(password),

  waitUntilLoginFormIsLoaded: async () => wrappers.waitForVisible(loginForm),
  waitUntilRegisterFormIsLoaded: async () => wrappers.waitForVisible(registerForm),

  clickOnCreateAccountButton: async () => wrappers.click(createAnAccountButton),
  clickOnLoginButton: async () => wrappers.click(loginButton),
  clickOnSubmitButton: async () => wrappers.click(submitButton),

  signIn: async (account = browser.params.login.account, pass = browser.params.login.password) => {
    await browser.wait(await expCond.visibilityOf(usernameLoginInput), 5000, 'element usernameLoginInput() not displayed after 5 seconds!');
    await usernameLoginInput.sendKeys(account);
    await browser.wait(await expCond.visibilityOf(passwordLoginInput), 5000, 'element passwordLoginInput() not displayed after 5 seconds!');
    await passwordLoginInput.sendKeys(pass);
    return wrappers.click(loginButton);
  },

  addTokensCookies: async (email = browser.params.login.account, pass = browser.params.login.password) => {
      try {
        if (!browser.params.cookie) {
          AuthService.setCredentials(email, pass);
          await AuthService.userSignIn();
          await browser.get(browser.params.baseurl);
          return browser.manage().addCookie({
            name: 'Cookie',
            value: AuthService.tokens.cookie
          });
        }
        return null;
      } catch (error) {
        throw new Error(`ERROR AT LOGIN METHOD\n${error}`);
    }
  }

};
