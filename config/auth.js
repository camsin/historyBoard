/**
 * Created by camendez on 15/11/17.
 */
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '356249854732540', // your App ID
        'clientSecret'  : '98193a8c62c6ab1241d71f0e50b72c4e', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '102853990433-ptbpublucjfifnt9s5nt3i28hvsgrvmd.apps.googleusercontent.com',
        'clientSecret'  : 'sfHNkgr0gbDm8E0-Xr11-G9E',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};