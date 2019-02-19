var request = require('superagent');

const AuthService = {

 url: `${browser.params.baseurl}/login`,

 USER_TOKEN_POST_BODY: {
   username: '',
   password: '',
 },

 tokens: {
   cookie: ''
 },

 setCredentials: (user, pass) => {
   AuthService.USER_TOKEN_POST_BODY.username = user;
   AuthService.USER_TOKEN_POST_BODY.password = pass;
 },

 userSignIn: async () => {
   const response = await request.post(AuthService.url).send(AuthService.USER_TOKEN_POST_BODY);
   const headers = response.res.rawHeaders[9];
   const headersAsArray = headers.split(';');
   AuthService.tokens.cookie = headersAsArray[0];
 }

};

module.exports= AuthService;
