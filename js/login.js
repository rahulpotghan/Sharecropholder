var _showSignup = true;
var _redirect = false;
var _redirectOnLogout = false;
var _redirectTo;
var _redirectToLogout;
var _isFacebookLoggedIn = false;
var _backendUser = null;

if(!window["console"]) {
	window["console"] = {log: function() {}};
}
if(!window.console["log"]) {
	window.console["log"] = function() {};
}

if (window.location.pathname == "/") {
	jQuery.ajax({
							"url": "/gateway/user/lastquestion",
							"type" : "GET",
							"success": function(data){
								//console.log(data);
								if (data.value == true) {
										window.location = window.location.protocol + "//" + window.location.host + "/results/#results";
								} else if (data.value == false) {
										var hash = getPageName(data.last_question_id);
										window.location = window.location.protocol + "//" + window.location.host + hash;
								}

							}
	})
}

function getPageName(pageID) {
	switch(pageID)
	{
	case 1:
	  return "#where_do_you_live";
	case 2:
	  return "#gender_and_age";
	case 3:
	  return "#do_you_have_children";
	case 4:
	  return "#whats_under_your_roof";
	case 5:
	  return "#whats_on_your_plate";
	case 6:
	  return "#medicine_cabinet";
	case 7:
	  return "#jewellery";
	case 8:
	  return "#gadgets";
	case 9:
	  return "#sporting_goods";
	case 10:
	  return "#closet_clothing";
	case 11:
	  return "#paid_for_sex";
	default:
	  return "#where_do_you_live";
	}
}

function initFacebook() {
	window.fbAsyncInit = function() {
		//console.log('host: ' + window.location.host);
		if(window.location.host.indexOf("slaveryfootprint.org") != -1 || window.location.host.indexOf("sharecropholder.com") != -1) {
			FB.init({appId: '280260322003158', status: true, cookie: true, xfbml: true});
		}else if(window.location.host.indexOf("madeinafreeworld.org") != -1) {
			FB.init({appId: '269757969721441', status: true, cookie: true, xfbml: true});
		} else if(window.location.host.indexOf("svn428.test.unit9.net") != -1) {
			FB.init({appId: '221451924581194', status: true, cookie: true, xfbml: true});
		} else {
			FB.init({appId: '137287816368803', status: true, cookie: true, xfbml: true});
		}
		//http://bugs.developers.facebook.net/show_bug.cgi?id=20168
		if(jQuery.browser.msie) {
			FB.UIServer.setLoadedNode = function(a,b){FB.UIServer._loadedNodes[a.id]=b;};
		}

		FB.getLoginStatus(fbLoginStatus);
    	FB.Event.subscribe('auth.statusChange', fbLoginStatus);

		if(isUserLoggedIn()) {
       		showHeaderName();
     	} else {
        	showHeaderLogin();
     	}
	};

	(function() {
		var e = document.createElement('script');
		e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
	}());
}

function dontShowSignup() {
	_showSignup = false;
}

function ifLoggedInRedirectTo(to) {
	_redirectTo = to;
	_redirect = true;
}

function getLoginButton() {
	try {
		if(!isUserLoggedIn()) {
			document.write(getLoginButtonSpan());
		} else {
			document.write(getHelloButtonSpan(''));
			FB.api('/me', function(response) {
				//document.getElementById('login').innerHTML = getHelloButtonHtml(response.name);
			});
		}
	} catch(e) {
		document.write(getLoginButtonSpan());
	}
}

function getHelloButtonSpan(name) {
	return '<span id="login">' + getHelloButtonHtml(name) + '</span>';
}

function getHelloButtonHtml(name) {
	return '<a href="/results/#results" id="login" class="header">Hi, ' + ((name.indexOf(' ') > -1) ? name.substring(0, name.indexOf(' ')) : name) + '</a><a href="javascript:void(0)" id="logout" class="header" style="margin-left: 10px; color: #aaaaaa;" onclick="toggleFacebookLogin()">Logout</a>';
}

function getLoginButtonSpan() {
	return '<span id="login">' + getLoginButtonDivHtml() + '</span>';
}

function getLoginButtonDivHtml() {
	if(_showSignup) {
		return '<a href="/signup/#login" id="login" class="header">Login</a>';
	} else {
		return '<a href="/signup/#signup" id="signup" class="header" style="margin-right: 4px;">Signup /</a><a href="/signup/#login" id="login" class="header">Login</a>';
	}
}

function toggleFacebookLogin() {
	if(isUserLoggedIn()) {
		_redirectOnLogout = true;
		FB.logout(function(response) {});
		logoutBackend();
	} else {
		if(window.location.hash == "#signup") {
			facebookSignup();
		} else {
			facebookLogin();
		}
	}
}

function facebookSignup() {
	//console.log('signing up via facebook');
	if(window.AppFacade.isUserComingFromResults()) {
		facebookSignupMerge();
	} else {
		facebookSignupNew();
	}
}

function facebookSignupMerge() {
	facebookLogin();
}

function facebookSignupNew() {
	//console.log('new user');
	jQuery.ajax({
		"async": false,
		"url" : "/gateway/user/",
		"type" : "POST",
		"data" : null,
		"success" : function(data) {
			//console.log('blank user created');
			facebookLogin();
		},
		"error": function(data) {
			//console.log('error creating blank user');
		}
	});
}

function facebookLogin() {

	//console.log('logging in via facebook');

	if(window.location.hash == "#results") {
		window.location = window.location.protocol + '//' + window.location.host + '/signup/#login';
	} else {
		FB.login(function(response) {}, {scope: 'user_location,user_about_me,user_birthday,email,publish_stream'});
	}

}

function isUserLoggedIn() {
	getBackendUser();
	return isUserLoggedInFacebook() || (_backendUser && _backendUser.full_name);
}

function isUserLoggedInFacebook() {
	try {
		return FB.getAuthResponse() != null;
	} catch(e) {
		return false;
	}
}

function loginBackend(accessToken) {
	//console.log('m1');
	var url = window.location.protocol + '//' + window.location.host + '/gateway/site/login';
        jQuery.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({"access":accessToken}),
            dataType: "json",
            success: function(data) {
                //console.log(data);
				try {
					window.AppFacade.onLoggedIn();
                                       // window.location = document.referrer;
				} catch(e) {

                                }
            }
        });
}

var awaiting_for_current_user = false;
function getBackendUser() {
	if(_backendUser || awaiting_for_current_user) return;
	awaiting_for_current_user = true;
	var url = window.location.protocol + '//' + window.location.host + '/gateway/user/current';
        jQuery.ajax({
            type: "GET",
            url: url,
            data: null,
            dataType: "json",
            success: function(data) {
							if(data.full_name) {
								_backendUser = data;
								showHeaderName();
							} else {
								_backendUser = null;
								showHeaderLogin();
							}
            },
            complete: function() {
	            awaiting_for_current_user = false;
            }
        });
}

function logoutBackend() {
	var url = window.location.protocol + '//' + window.location.host + '/gateway/site/logout';
        jQuery.ajax({
            type: "GET",
            url: url,
            data: null,
            dataType: "json",
            success: function(data) {
				if(data) {
					_backendUser = null;
					showHeaderLogin();
					if(_redirectOnLogout) {
						window.location = window.location.protocol + "//" + window.location.host;
					}
                }
            }
        });
}

function showHeaderLogin() {
	//document.getElementById('login').innerHTML = getLoginButtonDivHtml();
}

function showHeaderName() {
	if(isUserLoggedInFacebook()) {
		//document.getElementById('login').innerHTML = getHelloButtonHtml('');
		FB.api('/me', function(response) {
	  		//document.getElementById('login').innerHTML = getHelloButtonHtml(response.name);
		});
	} else if(_backendUser) {
		//document.getElementById('login').innerHTML = getHelloButtonHtml(_backendUser.full_name);
	}
	if(_redirect) window.location = _redirectTo;
}

function fbLoginStatus(response) {
     if(response.authResponse) {
		_isFacebookLoggedIn = true;
       	showHeaderName();
		loginBackend(response.authResponse.accessToken);
     } else if(!isUserLoggedIn()) {
        showHeaderLogin();
		_isFacebookLoggedIn = false;
		if(_redirectOnLogout && !_backendUser) {
			//window.location = window.location.protocol + "//" + window.location.host;
			//console.log("logged out and returning to refferer")
                        window.location = document.referrer;

		}
     }
}
