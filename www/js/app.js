// Dom7
var $$ = Dom7;

var welcomescreen_slides = [
  {
    id: 'slide0',
    title: 'Slide 0', // optional
    picture: '<div class="tutorialicon">♥</div>',
    text: 'Welcome to this tutorial. In the next steps we will guide you through a manual that will teach you how to use this app.'
  },
  {
    id: 'slide1',
    title: 'Slide 1', // optional
    picture: '<div class="tutorialicon">✲</div>',
    text: 'This is slide 2'
  },
  {
    id: 'slide2',
    title: 'Slide 2', // optional
    picture: '<div class="tutorialicon">♫</div>',
    text: 'This is slide 3'
  },
  {
    id: 'slide3',
    //title: 'NO TITLE', 
    picture: '<div class="tutorialicon">☆</div>',
    text: 'Thanks for reading! Enjoy this app.<br><br><a id="tutorial-close-btn" href="#">End Tutorial</a>'
  }
];

var options = {
  'bgcolor': '#0da6ec',
  'fontcolor': '#fff'
}

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.jonathanregis.perezfrench', // App bundle ID
  name: 'Perez French', // App name
  theme: 'auto', // Automatic theme detection
  init: false, //we will init manually later cause we need to run some functins before app is initialized
  welcomescreen: { // Setup welcomescreen plugin
    slides: welcomescreen_slides,
    options: options,
  },
  template7Pages: true,
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ],
      preferences: {
          language: "french"
      },
      translations: translationPhrases
    };
  },
  //routes
  // App root methods
  methods: {
    translate: function (phrase,transform) {
        phrase = phrase.replace("&nbsp;"," ");
        //var language = app.language
        var language = 'fr-FR';
        var translation;
      if(typeof app.data.translations[language] !== 'undefined'){
          translation = app.data.translations[language][phrase.toLowerCase()] ? app.data.translations[language][phrase.toLowerCase()] : phrase;
      }
      else{
          translation = phrase
      }
      if(typeof transform != "undefined"){
          if(transform === 'uc'){
              translation = translation.toUpperCase();
          }
          if(transform === 'lc'){
              translation = translation.toLowerCase();
          }
          if(transform === 'ucw'){
              translation = translation.ucwords();
          }
      }
      return translation;
    },
    userInfo: function(i){
        //var userData = {fullname: "Jonathan Regis",email:"jonathan.regis@epareto.com",userId:1,username:"iamregis"};
        if(isJson(localStorage.userInfo)){
           var userData = JSON.parse(localStorage.userInfo);
        }
        if(typeof userData === "object" && typeof userData[i] !== "undefined"){
            return i != null ? userData[i] : userData;
        }
        
        else{
            return "";
        }
        
    },
    ifLoggedIn: function(instruction,fail){
        if(isLoggedIn() != false){
            return typeof instruction === "function" ? instruction() : instruction;
        }
        else{
            return fail();
        }
    }
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/',
});
var preachingsView = app.views.create('#view-preachings', {
  url: '/preachings/'
});

var eventsView = app.views.create('#view-events',{
    url: '/events/'
});

var contactsView = app.views.create('#view-contacts',{
    url: '/contacts/'
});

// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
    app.preloader.show("Logging in");
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  cordova.plugins.firebase.auth.signInWithEmailAndPassword(username, password).then(function(userInfo) {
    // user is signed in
    localStorage.setItem("loggedin",true);
    localStorage.setItem("userInfo",JSON.stringify(userInfo));
    // Close login screen
    app.loginScreen.close('#my-login-screen');
    location.reload();
}).catch(function(error){
    alert("Sorry: "+error);
})

});

String.prototype.ucwords = function(){
    var str = this.toLowerCase();
    return (str + '')
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase()
    })
}

function logout(){
    app.preloader.show("Logging out");
    cordova.plugins.firebase.auth.signOut().then(function() {
        // Sign-out successful.
        window.FirebasePlugin.unregister();
        localStorage.removeItem("loggedin");
        location.reload();
      }).catch(function(error) {
        alert("Could not log out:\n"+error)
      });
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

document.addEventListener('deviceready',onDeviceReady,false);
function onDeviceReady(){
    
    if(typeof cordova != 'undefined' ) {
        
        if(cordova.platformId == 'android'){
            StatusBar.backgroundColorByHexString("06185e");
        }
        
        window.FirebasePlugin.getToken(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log(token);
            alert(token);
        }, function(error) {
            console.error(error);
            alert(error);
        });
    }
    setTimeout(function(){
        renderJsLines()
    },4000)
}

app.init();

$$("[data-view]").click(function(){
    var view = $$(this).attr("data-view");
    app.tab.show(view);
})

function renderJsLines(){
    $$(".pre-ini-js").each(function(e,i){
        var code = $$(this).text().replace("{--","").replace("--}","");
        var rendered = eval(code);
        $$(this).html(rendered);
    })
}
function loginButton(){
    str = '<a href="#" class="button button-raised button-fill login-screen-open color-green" data-login-screen="#my-login-screen">'+t("Sign In","uc")+'</a>';
    return str;
}
function htmlentities(s){
    return s.replace("<","&lt;").replace(">","&gt;");
}
t = app.methods.translate;
function isLoggedIn(){
    if(localStorage.getItem("loggedin"))
    {
        return true;
    }
    else {
        return false
    }
}

$$(document).on('page:init',".page[data-name='preachings']",function(e){
//    $$(".navbar.transparent").css("background-color","transparent");
//    $$(".page-content").on("scroll",function(x){
//        var max = 130;
//        var current = $$(this).scrollTop();
//        var opacity = (current / 130 * 100) / 100;
//        $$(".navbar.transparent").css("background","rgba(2, 15, 70,"+opacity+")");
//        //console.log(opacity)
//    })
    pSearchbar = app.searchbar.create({el: ".searchbar",inputEl:".sinput",backdrop:true});
    $$("input[type='search']").on("keyup",function(e){
        //alert("searched "+pSearchbar.query)
    })
    $$("input[type='search']").on("focus",function(e){
        //reload preachings
    })
    
    var panel = app.panel.create({
        el: '.panel-left',
      })
})

app.panel.enableSwipe();

renderJsLines();