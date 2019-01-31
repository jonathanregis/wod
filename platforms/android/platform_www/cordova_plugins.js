cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  },
  {
    "id": "com.applozic.phonegap.applozic",
    "file": "plugins/com.applozic.phonegap/www/applozic.js",
    "pluginId": "com.applozic.phonegap",
    "clobbers": [
      "applozic"
    ]
  },
  {
    "id": "cordova-plugin-firebase.FirebasePlugin",
    "file": "plugins/cordova-plugin-firebase/www/firebase.js",
    "pluginId": "cordova-plugin-firebase",
    "clobbers": [
      "FirebasePlugin"
    ]
  },
  {
    "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
    "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
    "pluginId": "cordova-plugin-firebase-authentication",
    "merges": [
      "cordova.plugins.firebase.auth"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-statusbar": "2.4.2",
  "cordova-plugin-whitelist": "1.3.3",
  "es6-promise-plugin": "4.2.2",
  "cordova-plugin-x-socialsharing": "5.4.1",
  "cordova-plugin-cocoapod-support": "1.6.0",
  "com.applozic.phonegap": "0.8.0",
  "cordova-plugin-firebase": "2.0.5",
  "cordova-plugin-enable-multidex": "0.1.3",
  "cordova-support-android-plugin": "1.0.1",
  "cordova-support-google-services": "1.2.1",
  "cordova-plugin-firebase-authentication": "1.0.1"
};
// BOTTOM OF METADATA
});