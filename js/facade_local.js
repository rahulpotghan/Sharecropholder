//var backendUrl = 'http://svn428.dev.unit9.net/';
var backendUrl = 'http://slaveryfootprint.org/';


//Hiranya added
$(document).ready(function(){
  if(jQuery.browser.msie && jQuery.browser.version.substring(0, 1) <= 7){
       //document.getElementById("share_tw_counter").style.display = "none";
	document.getElementById("share_tw_counter").style.visibility = "hidden";
        document.getElementById("share_tw_counterx").style.visibility = "hidden";
	document.getElementById("sf_counter").style.visibility = "hidden";
  }
});
//End of Hiranya added 


require([
    "order!/static/js/libs/underscore-min.js",
    "order!/static/js/libs/backbone-min.js",
    "order!http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js",
    "order!/static/js/libs/json2.js",
    "order!views",
    "order!models",
    "order!/static/js/libs/jquery.cookie.js",
    "order!/static/js/libs/jquery.jsoncookie.js",
    "order!routes"
    ], function() {
        window.AppFacade = {
            states: {},
            init: function(){
                var self = this;
			
                if (!jQuery.browser.msie) {
                    var timeout = 500;
                }else{
                    var timeout = 0;
                }
			
                setTimeout(function(){
                    self.userModel = new UserModel({});
                    self.survey = new SurveyCollection();
                    self.score = new ScoreCollection();
                    self.tags = new TagsCollection();
                    self.controller = new Controller();
                    Backbone.history.start();
                    self.getContentObject();
                    self.registerFineTuningSection();
                    self.adjustHeight();
                    self.questionNavigationRegister();
                    self.setupFooterView();
                    self.getAllTags();
                    self.prepareCMS();            
                    self.facebookTwitterQuestionShareHandler();
                    self.checkName();
					
					if(window.location.pathname == '/about/' || window.location.pathname == '/')
					{
						self.fetchUser();
					}
				
                }, timeout);

			
                var o = $.JSONCookie("sfp_activity_feed");
                self.activityJSON = o.feed || [];
			
                if(typeof jQuery.browser != "undefined"){
                    if(jQuery.browser.msie){
                        self.msie = true;
                        jQuery("html").addClass("msie");
                    }
                }
			
                if (typeof(AppFacade.clearbool) == "undefined") {
                    AppFacade.clearbool = 1;
                }
			
                jQuery("#overlay").click(function() {
                    AppFacade.closeFineTuning();
                })
			
                AppFacade.forcePrompts = true; //set this to false to enable fine-tuning prompts to not show after user has dismissed one.
                AppFacade.showPrompts = true;
                jQuery("#mtv a").live('click', function() {
                    popup = window.open('http://www.againstourwill.org/schools/leaderboard?group_id='+self.userModel.get("group_id") , 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
                });
			
			
                jQuery(window).resize(function(){
                    self.adjustHeight();
                })
			
                if(window.location.host == "slaveryfootprint.org" || window.location.host == "slaveryfootprint.com" || window.location.host == "localhost"){
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: '280260322003158', 
                            status: true, 
                            cookie: true,
                            xfbml: true
                        });
												//http://bugs.developers.facebook.net/show_bug.cgi?id=20168
												if(jQuery.browser.msie) {
													FB.UIServer.setLoadedNode = function(a,b){FB.UIServer._loadedNodes[a.id]=b;};
												}
                        self.FBInit = true;
                        self.loginSetup();
                    };
                }else if(window.location.host == "madeinafreeworld.org"){
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: '269757969721441', 
                            status: true, 
                            cookie: true,
                            xfbml: true
                        });
												//http://bugs.developers.facebook.net/show_bug.cgi?id=20168
												if(jQuery.browser.msie) {
													FB.UIServer.setLoadedNode = function(a,b){FB.UIServer._loadedNodes[a.id]=b;};
												}
                        self.FBInit = true;
                        self.loginSetup();
                    };
                }else if(window.location.host == "svn428.test.unit9.net"){
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: '221451924581194', 
                            status: true, 
                            cookie: true,
                            xfbml: true
                        });
												//http://bugs.developers.facebook.net/show_bug.cgi?id=20168
												if(jQuery.browser.msie) {
													FB.UIServer.setLoadedNode = function(a,b){FB.UIServer._loadedNodes[a.id]=b;};
												}
                        self.FBInit = true;
                        self.loginSetup();
                    };
                } else if(window.location.host == "svn428.dev.unit9.net"){
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: '137287816368803', 
                            status: true, 
                            cookie: true,
                            xfbml: true
                        });
												//http://bugs.developers.facebook.net/show_bug.cgi?id=20168
												if(jQuery.browser.msie) {
													FB.UIServer.setLoadedNode = function(a,b){FB.UIServer._loadedNodes[a.id]=b;};
												}
                        self.FBInit = true;
                        self.loginSetup();
                    };
                }

			

                //280260322003158					

                var e = document.createElement('script');
                e.async = true;
                e.src = document.location.protocol +
                '//connect.facebook.net/en_US/all.js';
                document.getElementById('fb-root').appendChild(e);
			
                if (window.location.hash === "" && window.location.pathname == "/survey/") {
                    window.location.hash = "#where_do_you_live";
                } else if (window.location.hash === "" && window.location.pathname == "/signup/") {
                    window.location.hash = "#login";
                } else if (window.location.hash === "" && window.location.pathname == "/survey/") {
                    window.location.hash = "#results";
                } else if (window.location.hash === "" && window.location.pathname == "/about/") {
                    window.location.hash = "#aboutus";
                }
            
                //Ensure cookie detecting sign-up path is false.
                if(window.location.pathname !== '/slavery/results/' && window.location.pathname !== '/slavery/signup/')  {
                    AppFacade.setUserComingFromResults(false);
                }
			
                // Disable refine mode if user does the survey again
                if(window.location.pathname == '/results/') {
                //jQuery.cookie("refine_mode", false);
                }
			
            },
            getCount: function(){
                var self = this;
                jQuery.ajax({
                    "type": "GET", 
                    "url":"/gateway/site/count",
                    "success": function(data){
                        self.numericValue = parseInt(data.val);
                        var count = self.processCountValue();			
                        jQuery("#sf_counter").text(count);
                        jQuery("#share_tw_counter").text(count);
                        jQuery("#share_tw_counterx").text(count);
                    }
                });
			
        },
        processCountValue: function(count){
	
            var self = this;
            if(count){
                self.numericValue = self.numericValue + count;
            }
			
            if(self.numericValue >= 1000){
                if(self.numericValue.toString().length == 4){
                    var value = self.numericValue.toString()[0];
					
                }else if(self.numericValue.toString().length == 5){
                    var value = self.numericValue.toString()[0] + self.numericValue.toString()[1];
					
                }else if(self.numericValue.toString().length == 6){
                    var value = self.numericValue.toString()[0] + self.numericValue.toString()[1] + self.numericValue.toString()[2];
                }
                value = value + "K";
            }
			
            if(value){
                return value;
            }else{
                return self.numericValue;
            }
			
        },
        checkName: function(){
            var o = jQuery.JSONCookie("sfp_name");
            if(o.name){
                jQuery("#login #name").text("Hi, "+ o.name+".");
				
				
				
				
                jQuery("#login #signup").text("Logout");
				
                jQuery("#login #signup").click(function(e){
                    jQuery.ajax({
                        "url" : "/gateway/site/logout", 
                        "type":"POST", 
                        "success":function(data){ 
                            jQuery.JSONCookie("sfp_name", { }, {
                                path: '/'
                            });
                            jQuery("#login #signup").text("Signup");
                            jQuery("#login #name").text("");
                            jQuery("#login #signup").unbind();
						

                        }
                    });
					
                FB.logout(function(response) { 
                    jQuery("#facebook_login").html('<img src="/static/css/img/signup/facebook_login.png" alt="login with facebook" />');
                    self.loginSetup();
                });
					
					
                e.preventDefault();
                });
				
				
        }else{
				
    }
    },
    /*getTwitterMessage: function(type) {
        if (type == "results") {
            return "http://twitter.com/home?status=I'm finding out how many slaves work for me in the global supply chain. What's your slavery footprint? %23slaveryfootprint.org";
        } else if (type == "progress") {
            return "http://twitter.com/home?status=I'm finding out how many slaves work for me in the global supply chain. What's your slavery footprint? %23slaveryfootprint.org";
        } else if (type == "compare") {
            return "http://twitter.com/home?status=I'm finding out how many slaves work for me in the global supply chain. What's your slavery footprint? %23slaveryfootprint.org";
        }
    },
    openTwitterPage: function(type) {
        var self = this;
        //self.postTwitter();
        var newwindow=window.open(self.getTwitterMessage(type),'twitter_popup','height=300,width=450');
        if (window.focus) {
            newwindow.focus()
            }
    },*/
    facebookTwitterQuestionShareHandler: function(){
        var self = this;
        if(self.currentView) {
            self.currentView.logintimes = 0;
        }    
        $('#share_tw').unbind("click");
        $('#share_tw').click(function () {
            postTwitter();
            var newwindow=window.open("http://twitter.com/intent/tweet?text=Iâ€™m finding out how many slaves work for me in the global supply chain. Whatâ€™s your slavery footprint? %23slaveryfootprint",'twitter_popup','height=300,width=450');
            if (window.focus) {
                newwindow.focus()
                }
            return false;
        });
        
        //Hira
        $('#share_twx').unbind("click");
        $('#share_twx').click(function () {
            postTwitter();
            var newwindow=window.open("http://twitter.com/intent/tweet?text=Iâ€™m finding out how many slaves work for me in the global supply chain. Whatâ€™s your slavery footprint? %23slaveryfootprint",'twitter_popup','height=300,width=450');
            if (window.focus) {
                newwindow.focus()
                }
            return false;
        });
        //Hira-End
			         
        $('#tw_sf').die("click");           
        $('#tw_sf').live('click', function() {
            if(getTwitterFact()){
                postTwitter();
                var newwindow=window.open("http://twitter.com/intent/tweet?text="+self.currentView.twitter_fact.replace('%u2014','-'),'twitter_popup','height=300,width=450');
                if (window.focus) {
                    newwindow.focus()
                    }
                return false;
            }
            a
        });
        $('#fb_sf').die("click");   
        jQuery('#fb_sf').live('click', function(e) {
            //console.log("fb_sf still has events binded");
            FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                    if(getFBFact()){
                        postFactFB();
                    }

                } else {
                    if ( self.currentView.logintimes == 0 || isNaN(self.currentView.logintimes)) {
                        FB.login(function(response) {
                            if(response.authResponse){
                                if(getFBFact()){
                                    postFactFB();
                                }
                            }
                        });
                    } 
                    self.currentView.logintimes++;
                    if (self.currentView.logintimes == 2) self.currentView.logintimes = 0;
                }
            });                   
        });
			
        function getTwitterFact(){
            self.currentView.twitter_fact = jQuery("p[data-fact_twitter]").attr("data-fact_twitter");
            self.currentView.twitter_fact = escape(self.currentView.twitter_fact);
            ////console.log(self.currentView.twitter_fact);
            return true;
        }
			
			
			
        function getFBFact(){
            self.currentView.fact_title = jQuery("h3[data-fact_title=true]").text();
            self.currentView.fact = jQuery("p[data-fact_body=true]").text();
            return true;
        }
			
        function postFactFB(){
            FB.ui(
            {
                method: 'feed',
                name: self.currentView.fact_title,
                link: window.location.host,
                picture: "http://respond.callandresponse.org/page/-/slavery_footprint/fb_icon.png",
                description: self.currentView.fact
            },
            function(response) {
                if (response && response.post_id) {
                    jQuery.ajax({
                        "url":"/gateway/score/facebook",
                        "type":"POST",
                        "success":function(data){ 
                            self.updateActivityJSON("facebook");
                            var count = self.processCountValue(1);
                            jQuery("#sf_counter").text(count);
                            jQuery("#share_tw_counter").text(count);
                            jQuery("#share_tw_counterx").text(count);
                        }
                    });
            } 
            }
            );
    }
			
    //			//console.log(self.numericValue);
			
    function postTwitter(){
        jQuery.ajax({
            "url":"/gateway/score/twitter",
            "type":"POST",
            "success":function(data){ 
                self.updateActivityJSON("twitter");
                var count = self.processCountValue(1);
                jQuery("#sf_counter").text(count);
                jQuery("#share_tw_counter").text(count);
                jQuery("#share_tw_counterx").text(count);
					
            }
        });
				
}
			
},
registerDonation: function(){
    var self = this;
    jQuery.ajax({
        "url":"/gateway/score/donation",
        "type":"POST",
        "success":function(data){ 
            self.updateActivityJSON("donate");
        }
    });
},
registerLetter: function(){
    var self = this;
    jQuery.ajax({
        "url":"/gateway/score/letter",
        "type":"POST",
        "success":function(data){ 
            self.updateActivityJSON("letter");
        }
    });
},
updateActivityJSON: function(type){
    var self = this;
    var now = new Date();
    var curr_date 	= now.getDate();
    var curr_month 	= now.getMonth() + 1; //months are zero based
    var curr_year 	= now.getFullYear();
    var date = curr_month +"/"+ curr_date + "/" + curr_year;
			
    var length = self.activityJSON.length+1;

			
			
    var obj = {
        "order": length, 
        "data": {
            "type":type, 
            "date": date.toString()
            }
        };
self.activityJSON.push(obj);
			
if(length > 5){
    ////console.log(self.activityJSON);
    self.activityJSON.shift();
////console.log(self.activityJSON);
}
			
jQuery.JSONCookie("sfp_activity_feed", {
    "feed" : self.activityJSON
    }, {
    path: '/'
});	
			
},
setupFooterView: function(){
    var self = this;
    self.footer = new FooterView();
},
registerFineTuningSection: function(){
    var self = this;
    self.fineTuningSection = new FineTuningView();
},
nextQuestion: function(){
    var self = this;
    self.closeFineTuning();
			
    if(typeof self.nextIdHash === "string"){
				
        if(self.nextIdHash == "results"){
            window.location = "/my-footprint/#results";
            return
        }
				
        window.location.hash = self.nextIdHash;
				
    }
	
	if (AppFacade.currentView.pageID == 2) {
	   jQuery.ajax({
	       "url":"/gateway/user/current",
	       "type" : "PUT",
	       "data" : JSON.stringify(window.AppFacade.userModel.attributes),
	       "success": function(data){
				//console.log(data);
				//console.log("+");
	       }
	   });
	}
	
    AppFacade.clearbool = 1;
    self.saveSurvey();
},
prevQuestion: function(){
    var self = this;
    if(typeof self.nextIdHash === "string"){
        window.location.hash = self.prevIdHash;
    }
    self.saveSurvey();
},
adjustHeight: function(){
				
    if(jQuery("div[rel=different_layout]").length <= 0){
        var windowHeight = jQuery(window).height(); 
        var mainHeight = jQuery("#main").height();

        var change_main_margin_height = (windowHeight / 2) - (mainHeight / 2);
        jQuery("#main").css("margin-top", change_main_margin_height + "px");
					
					
					
    }else{
        jQuery("#main").css("margin-top", "0px");
    }
		

},
changeNextButton: function(){
			
    if(jQuery("#nextquestion").hasClass("branding-next_question_new_inactive")){
        jQuery("#nextquestion").removeClass("branding-next_question_new_inactive");
        jQuery("#nextquestion").addClass("branding-next_question_new_active");	
    }
},
resetNextButton: function(){
    AppFacade.passThrough = false;
    jQuery("#nextquestion").removeClass("branding-next_question_new_active");
    jQuery("#nextquestion").addClass("branding-next_question_new_inactive");
},
questionNavigationRegister: function(){
    var self = this;
			
    jQuery("#nextquestion #next").unbind();
    jQuery("#nextquestion #next").click(function(){
				
				
        if((self.currentView.pageID == 5)&&(!self.page5Check) || self.currentView.pageID == 3 || self.currentView.pageID == 8){
					        
            if (AppFacade.forcePrompts != true) {
					
                /*jQuery("#overlay").css("display", "none");
			           	jQuery("body").addClass("overlay_on");
			           	jQuery("#overlay").fadeIn(500);*/
			           	
                if (AppFacade.showPrompts == true) {
							
                    //Showing
							
                    if (self.currentView.pageID == 3 && AppFacade.getCurrentView().childrenList.length < 1) {
                    //do nothing
                    } else {
                            	
                        //console.log("go deeper");
                        jQuery("body").addClass("overlay_on");
                        jQuery("#overlay").fadeIn(500);
                        jQuery("#go_deeper_bs").css("display","block");
                        AppFacade.showPrompts = false;	   
                    }
                }
						
            } else if (self.currentView.promptDismissed != true && AppFacade.forcePrompts == true){
                //forcePrompts true - ALWAYS showing. and user didn't dismiss the prompt yet.
                        
                jQuery("#overlay").click(function() {
                    self.currentView.promptDismissed = true;
                    jQuery("#overlay").fadeOut(500);
                    jQuery("body").removeClass("overlay_on");
                    jQuery("#go_deeper_bs").css("display","none");
                    AppFacade.showPrompts = false;    
                    AppFacade.childrenstop = false;
                });
						
                if (self.currentView.pageID == 3 && AppFacade.getCurrentView().childrenList.length < 1) {
                //do nothing
                } else {
                    jQuery("body").addClass("overlay_on");
                    jQuery("#overlay").fadeIn(500);
                    jQuery("#go_deeper_bs").css("display","block");
                    self.currentView.promptDismissed = true;
                    return;
                }
            }	
        }
				
        jQuery(this).unbind();
				
        if(AppFacade.survey.length > 0 ){
					
            if (AppFacade.getCurrentView().templateID == "#do_you_have_children") {
                if (typeof(AppFacade.childrenstop) === "undefined" || AppFacade.childrenstop === false) {
                    self.saveSurvey();
                    self.currentView.animateOut("next");
                } else {
                    self.questionNavigationRegister();
                    return;
                }
            } else {
                self.saveSurvey();
                self.currentView.animateOut("next");
            }
        } 
        else if(AppFacade.passThrough){
            self.saveSurvey();
            self.currentView.animateOut("next");
        } else {
            self.questionNavigationRegister();
            return;
        }
				
    //self.currentView.animateOut("next");
				
    });
			
// jQuery("#nextquestion #previous").click(function(){
// 	 self.saveSurvey();
// 	 self.currentView.animateOut("previous");
// 	
// });
			
			
},
loginSetup: function(){
			
    var self = this;
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {

            // Logs in the blank facebook user
            self.createFBUser(response);
					
					
					
            jQuery("#facebook_login").html("Logout of Facebook");
            //history.go(-1);
					
            FB.api('/me', function(response) {
                ////console.log(response);
                self.FBUser = response;
						
                jQuery.JSONCookie("sfp_name", {
                    "name" : response.first_name
                    }, {
                    path: '/'
                });
						
                //jQuery("#facebook_login").text("Logout");
                jQuery("#facebook_login").unbind();
                jQuery("#facebook_login").click(function(){
							
                    /*FB.logout(function(response) { 
								jQuery("#facebook_login").html('<img src="/static/css/img/signup/facebook_login.png" alt="login with facebook" />');
								self.loginSetup();
							});*/
                    });
            });
        } else {

            jQuery("#facebook_login").click(function(){
                /*FB.login(function(response) {
							if (response.session) {
							// Logs in the blank facebook user
							self.createFBUser(response);
							
							history.go(-1);
							
							jQuery("#facebook_login").html("Logout of Facebook");

							FB.api('/me', function(response) {
								////console.log(response);
								
								self.FBUser = response;
								
								jQuery.JSONCookie("sfp_name", { "name" : response.first_name }, {path: '/'});
								
								jQuery("#facebook_login").unbind();
								//jQuery("#facebook_login").text("Logout");
								jQuery("#facebook_login").click(function(){
									FB.logout(function(response) { 
										jQuery("#facebook_login").html('<img src="/static/css/img/signup/facebook_login.png" alt="login with facebook" />');
										self.loginSetup();
									});
								});
							});
						}
						}, {"perms": "user_location,user_about_me,user_birthday,email"});*/
                });
        }
    });


},
createFBUser: function(response){
    var self = this;
////console.log('l_1');
/*jQuery.ajax({
				"url" : "/gateway/site/login",
				"type" : "POST",
				"success" : function(data){
					self.userModel.fetch({
						"success": function(){
							self.userModel.set({"first_name": self.FBUser.first_name });
							self.userModel.set({"last_name" : self.FBUser.last_name });
						}
					});

					
					self.score.fetch({
						"success" : function(collection, response){
							// TODO: Add success response for the survey
							//self.populateFineTune(self.currentView.pageID);
						},
						"error" : function(collection, response){
							// TODO: add Error response for the survey
						}
					});
				}
			});*/
},
registerBlankUser: function(){
			
    var self = this;
    jQuery.ajax({
        "url" : "/gateway/user",
        "type" : "POST",
        "error": function(data){
            //console.log(JSON.stringify(data));
        },
        "success" : function(data){
        	//console.log('registerBlankUser');
            //console.dir(data)
            self.postBlankUser(data.user_id)
        }
    })
},
postBlankUser: function(id){
    ////console.log("Test")
    var self = this;
    ////console.log('l_2');
    var blankData = {};
    blankData['id'] = id;
    if (AppFacade.userModel.attributes.lng) {
        if (AppFacade.userModel.attributes.lng.length > 0) {
            blankData['lng'] = AppFacade.userModel.attributes.lng;
            blankData['lat'] = AppFacade.userModel.attributes.lat;
        }
    }
    //console.log('postBlankUser');
    jQuery.ajax({
        "url" : "/gateway/site/login",
        "type" : "POST",
        "data" : JSON.stringify(blankData),
        "success" : function(data){
        	//console.log('login');
        	//console.dir(data);
            self.fetchUser();
            /*
            self.userModel.fetch({
                "success": function(model, response){
                ////console.log(model,response);
                ////console.log("user model fetched", response);
                }
            });
            */
        }
    });
},
getContentObject: function(){
    var self = this;
// jQuery.ajax({
// 	"url" : "/lib/json",
// 	"type" : "GET",
// 	"dataType": "json",
// 	"success" : function(data){
// 		self.contentObject = data;
// 		
// 		self.currentView.admin();
// 	}
// })
},
saveSurvey: function(finetune){
    var self = this;
			
    try {
        var postVars = {
            meta: self.currentView.getStateJson()
            };
        //console.log('saving state: ' + JSON.stringify(postVars));
        jQuery.ajax({
            "url":"/gateway/state/question/" + AppFacade.currentView.pageID,
            "type":"POST",
            "data": JSON.stringify(postVars),
            "success":function(data) {
            //console.log('state saved successfully');
            },
            "error":function(req) {
            //console.log('error saving state');
            }
        });
    } catch(e) {
    //console.log('cant save state for Q' + AppFacade.currentView.pageID+"\n"+e.message)
    }
			
    for( var i=0, l=self.survey.models.length; i<l; i++ ){
        self.survey.models[i].attributes.clear = self.clearbool;
    }
			
    var json = self.survey.toJSON();
			
    ////console.log('json BEFORE: ' + JSON.stringify(json));
			
    var clear;
    for( var i=0, l=json.length; i<l; i++ ){
        if(json[i].clear == 0){
            clear = true;
            break;
        }
    }
			
    if( clear ){
        for( i=0; i<l; i++) {
            json[i].clear = 0;
        }
    }
			
    //console.log('json to save is: ');
    //console.log(json);
			
			
    if(json.length > 0){
        if(typeof self.userModel.get("id") === "undefined"){
            //throw new Error("no user id set");
            return;
        }
        ////console.log(JSON.stringify(json));
        if(finetune){
					
        }else{
            self.survey.reset();
        }

        jQuery.ajax({
            "url":"/gateway/survey/"+self.userModel.get("id"),
            "type":"POST",
            "data": JSON.stringify(json),
            "success": function(data){
                self.fetchScore();
            }
        });

    // jQuery.ajax({
    // 	"url":"/gateway/survey/question/"+self.currentView.pageID,
    // 	"type":"DELETE",
    // 	"data": JSON.stringify(json),
    // 	"success": function(data){
    // 		//console.log(data);
    // 
    // 	}
    // });
								
    }

},
fetchUser: function(){
	//console.log('fetchUser');
    var self = this;
	
    if(typeof self.userModel.get("id") === "undefined"){
        self.userModel.fetch({
            "success": function(model,response){
                ////console.log(response)
                self.userModel.set(response);
						
                if(self.userModel.get("group_id")){
                    jQuery(".alt").addClass("group");
                    jQuery(".alt").removeClass("non_group");
                    
                    jQuery("#group_name").text(model.attributes.group_name);
                }
						
                if(self.userModel.get("login")){
                    jQuery(".alt").addClass("logged-in");
                    jQuery(".alt").removeClass("not-logged-in");
                }
						
                if(self.userModel.get("facebook_id")){
                    jQuery(".alt").addClass("logged-in");
                    jQuery(".alt").removeClass("not-logged-in");
                }
                
                self.currentView.userModelReady(model);
						
            //self.currentView.render();
            },
            "error": function(model,response){
                self.registerBlankUser();
               // self.fetchUser();
            }
        });
    } else {
    	self.currentView.userModelReady(self.userModel);
		jQuery("#group_name").text(self.userModel.attributes.group_name);
    }

},
getScore: function(ref){
    var self = this;
    var score = {};
    jQuery.ajax({
        "url" :  (AppFacade.publicProfile ? "/gateway/user/reportuuid/" + AppFacade.publicProfileId : "/gateway/user/report/current"),
        "type" : "GET",
        "dataType": "json",
        "success" : function(data){
					
            // for(var item in data){
            // 	////console.log(data[item])
            // 	var id = data[item].question_id;
            // 	if(typeof score["total"] === "undefined"){
            // 		score["total"] = parseFloat(data[item].score);
            // 	}else{
            // 		if(!isNaN(parseFloat(data[item].score))){
            // 			score["total"] = score["total"] + parseFloat(data[item].score);
            // 		}
            // 		
            // 	}
            // 	
            // 	if(typeof score[id] === "undefined"){
            // 		score[id] = parseFloat(data[item].score);
            // 	}else{
            // 		score[id] = score[id]+parseFloat(data[item].score);
            // 	}
            // }
            // //console.log(score);
					
            //self.slaveryScore = Math.floor(data.score);
            //self.slaveCount = Math.floor(self.slaveryScore/15);
            ref.scoreCB(data.score);
        }
				
    });
},
getQuestionsScores: function(cb, sel){
    var self = this;
    var score = {};
    jQuery.ajax({
        "url" : (AppFacade.publicProfile ? "/gateway/score/currentuuid/" + AppFacade.publicProfileId :  "/gateway/score/current" ),
        "type" : "GET",
        "dataType": "json",
        "success" : function(data){
					
            for(var item in data){
                //if(data[item].product_name == "Sweatshirt")
                ////console.log(data[item]);
                            
                ////console.log(data[item])
                var id = data[item].question_id;
                if(typeof score["total"] === "undefined"){
                    score["total"] = parseFloat(data[item].score*data[item].amount);
                }else{
                    if(!isNaN(parseFloat(data[item].score))){
                        score["total"] = score["total"] + parseFloat(data[item].score*data[item].amount);
                    }
							
                }
						
                if(typeof score[id] === "undefined"){
                    score[id] = parseFloat(data[item].score*data[item].amount);
                }else{
                    score[id] = score[id]+parseFloat(data[item].score*data[item].amount);
                }
                        
            //if(score[3] != 0)
            // //console.log(score[3] + "(" + data[item].score + " " + data[item].amount + " " + data[item].product_name + ")");
            }
					
            ////console.log("question scores");
            ////console.log(score);
					
                    
					
					
					
            //self.slaveryScore = Math.floor(data.score);
            //self.slaveCount = Math.floor(self.slaveryScore/15);
            sel.getQuestions(score);
        }
				
    });
			
			
},
getTop5: function(ref){
    var self = this;
    jQuery.ajax({
        "url" : (AppFacade.publicProfile ? "/gateway/score/top5uuid/" + AppFacade.publicProfileId : "/gateway/score/top5"),
        "type" : "GET",
        "dataType": "json",
        "success" : function(data){
            self.top5 = data;
            ref.top5CB(self.top5);
        }
    })
},
getAllTags: function(cb){
    var self = this;
    // self.tags.fetch({
    // 	"success": function(collection, response){
    // 
    // 	}
    // });
    var arr = [];
			
    /*
				var c = self.score.select(function(m){
					//return m.get("product_name") == model.get("product_name");
					return m.get("question_id") === self.currentView.pageID.toString();
				});
			*/
    c = self.score.toArray();
			
			
			
    ////console.log(c, "c");
				
    arr.push(c)

			
			
    self.tags.reset();
    self.tags.add(c);

    self.fineTuningSection.populateAndRender({
        "tags" : c
    });
    self.fineTuningSection.tags = arr;
    //self.populateFineTune();
    if(cb){
//self.populateFineTune();
}
},
fetchScore: function(){
    var self = this;
    self.fetchUser();
    self.adjustHeight();
    //jQuery("#fine_tune_items").empty();
			
            
    if(AppFacade.currentView.pageID == 8)
    {
        //jQuery.ajax({"url":"/gateway/product/all/"+AppFacade.currentView.pageID,"type":"GET","success":function(data){ self.score.reset(); self.score.add(data); self.getAllTags(true);  }});
        jQuery.ajax({
            "url":"/gateway/score/current/"+AppFacade.currentView.pageID,
            "type":"GET",
            "success":function(data){
                self.score.reset();
                self.score.add(data);
                self.getAllTags(true);
            }
        });
}
else
{
    jQuery.ajax({
        "url":"/gateway/score/current/"+AppFacade.currentView.pageID,
        "type":"GET",
        "success":function(data){
            self.score.reset();
            self.score.add(data);
            self.getAllTags(true);
        }
    });
                
}
			
			
},
freeworldPoints: function(cb){
    jQuery.ajax({
        "url":"/gateway/user/freeworld/current",
        "type":"GET",
        "success": 
        function(data){ 
            if(data){
                cb.pointsCB(data);
            }
        }
			
    });
},
populateFineTune: function(questionId){
			
    var self = this;
    var o = {};
    var product_names = self.tags.pluck("product_name");
    if(self.tags.length > 0){
        self.score.each(function(model){
            //This was commented out by todd.
            /* var c = self.score.select(function(m){
					 	return m.get("product_name") == model.get("product_name");
					 });	
					 o[model.get("Product_id")] = c;
					
					 var t = self.tags.select(function(tag){
					 	if(typeof tag != "undefined"){
					 		return tag.get("product_name") === model.get("product_name");
					 	}
					 	
					 });
					
					 if(typeof t[0].get("id") != "undefined"){  
					  //console.log(model.get("amount"), model.get("product_name"),  t[0].get("id"))
					 }
					
					 if(t.length > 0){
					 	if(t[0].id != model.get("Tag_id")){
					 		t[0].set({"Tag_id": model.get("Tag_id"), "length" : model.get("amount")  });
					 	}else{
					 		t[0].set({ "length" : model.get("amount")  });
					 	}
					 }*/
            //Commenting ended here.
					
            });
				
        self.tags.each(function(tag){
            var go = true;
            self.score.each(function(model){
                if(model.get("product_name") == tag.get("product_name")){
                    go = false;
                }
            });
            if(go){
                tag.set({
                    "Tag_id": tag.get("id")
                    });
                self.score.add(tag);
            }
					
        });
				
				
        jQuery("#fine_tune_items").empty();
        self.fineTuningSection.filterByPageID(self.currentView.pageID, self.score.models);
				
    }

			
//var data = self.score.select(function(model){ return model.get("question_id") == questionId });
//var _tempObj = {}
// for(var model in data){
// 	var id = data[model].get("Product_id");
// 	_tempObj[id] = {};
// 	_tempObj[id].collection = _.select(data, function(model){ return model.get("Product_id") === id });
// 	_tempObj[id].length = _tempObj[id].collection.length;
// 	_tempObj[id].product_name = data[model].get("product_name");
// 	_tempObj[id].tag_id = data[model].get("Tag_id");
// 	_tempObj[id].question_id = data[model].get("question_id");
// }
//self.fineTuningSection.populateAndRender({ "score" : _tempObj });
},
closeFineTuning: function() {
    if (AppFacade.fineTuningSection.active == true) {
        //Fine tune panel is open; closing it.
        jQuery('#fine_tuning').animate({
            left:'-390'
        },600);
        jQuery('#fine_tune_close').css('display','none');
        jQuery('#fine_tune_open').fadeIn(1000);
        jQuery('#overlay').fadeOut(200)
        AppFacade.fineTuningSection.active = false;
    }
},
registerTheCurrentView: function(view){
    var self = this;
    self.currentView = view;
},
getCurrentView: function() {
    var self = this;
    return self.currentView;
},
registerNextId: function(id){
    var self = this;
    self.nextIdHash = id;
},
registerPrevId: function(id){
    var self = this;
    self.prevIdHash = id;
},
prepareCMS: function() {
    var self = this;
		
    //Next aim: Detect CMS changes and create appropriate JSON object for sending to database.
    //This var is temporary for testing - we need to pass in real JSON as stated above.
    var json = [{
        "PageID":"1",
        "ContentArea1":"Homepage_updatedd",
        "ContentArea2":"forms",
        "ContentArea3":"now",
        "ContentArea4":"working",
        "ContentArea5":"successfully! Hooray."
    },{
        "PageID":"2",
        "ContentArea1":"asdfasdf",
        "ContentArea2":"asdf",
        "ContentArea3":"09823908243809",
        "ContentArea4":"908239082348",
        "ContentArea5":"8723dx"
    },{
        "PageID":"3",
        "ContentArea1":"asdfasdf",
        "ContentArea2":"asdf",
        "ContentArea3":"09823908243809",
        "ContentArea4":"908239082348",
        "ContentArea5":"8723dx"
    }];	
		
    jQuery('a.cms_update').click(function(e){
        e.preventDefault();
        self.updateCMS(json);
    })
		
},
updateCMS: function(json) {
    var self = this;
    jQuery('#admin').load("cms_update.php", {
        Updates: json
    });
},
touchHandler: function(event)
{
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type="mousemove";
            break;        
        case "touchend":
            type="mouseup";
            break;
        default:
            return;
    }

    //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //           screenX, screenY, clientX, clientY, ctrlKey, 
    //           altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
        first.screenX, first.screenY, 
        first.clientX, first.clientY, false, 
        false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
},
		
setUserComingFromResults: function(val) {
    jQuery.cookie("user_coming_from_results", val, {
        expires: 1, 
        path: '/'
    });
},

isUserComingFromResults: function() {
    if (jQuery.cookie("user_coming_from_results") != null && (jQuery.cookie("user_coming_from_results") == "true" || jQuery.cookie("user_coming_from_results") == true)) {
        return true;
    } else {
        return false;
    }
},
onLoggedIn: function() {
    var el = jQuery("<div>");
    jQuery("div.messages").remove();
    el.addClass("messages");
    jQuery(el).addClass("ok");
    jQuery(el).text("You are now logged in.");
    jQuery(".signup_body").prepend(el);
    jQuery(el).slideDown(200);
			
    /*
			* TODO: Make a backend call to check the survey status (if the user has taken the survey yet or not) and redirect to an appropriate page
			*/
    ////console.log("logged in");
    ////console.log(window.location);
    jQuery.ajax({
        "url":"/gateway/user/lastquestion",
        "type":"GET",
        "success": 
        function(data){ 
            if(data){
                ////console.log(data);
                if(data.value) {
                    // user completed the survey
                            
                    if(window.location.pathname.indexOf("signup") != -1){
                        window.location = "/my-footprint/#results";
                    //window.location = "/results";
                    }
                }
                else
                {                        
                    // user did not complete the survey
                    var questions = new Array("where_do_you_live", "gender_and_age", "do_you_have_children", "whats_under_your_roof", "whats_on_your_plate", "medicine_cabinet", "jewellery", "gadgets", "sporting_goods", "closet_clothing", "paid_for_sex");
                            
                    if(window.location.pathname.indexOf("signup") != -1)       
                        window.location = "/survey/#" + questions[data.last_question_id - 1];
                }
            }
        },
        "error": function(jqXHR, textStatus, errorThrown) {
        ////console.log("Error: " + textStatus + " " + errorThrown);
        }
            
    });
            
            
            
					
    setTimeout(function(){
        jQuery(el).slideUp(200, function(){
            jQuery(el).remove();
        });
	
    }, 10000);
},
		
isUserInRefineMode: function() {
    return jQuery.cookie("refine_mode") == "true";
},
		
onQuestionReady: function(id) {
    var self = this;
    // temoporarily ignoring refine mode and considering it's always true
    if(AppFacade.isUserInRefineMode() == true || true) {
        jQuery.ajax({
            "url":"/gateway/state/question/" + (id || AppFacade.currentView.pageID),
            "type":"GET",
            "success":function(data) {
                ////console.log(data);
                AppFacade.currentView.animate.animateIn(data);
                /* try {
							
						} catch(e) {}*/
                jQuery("body").removeClass("loading");
            },
            "error":function(req) {
                AppFacade.currentView.animate.animateIn();
                //console.log("Error with ajax request.");
                //console.log(req);
                jQuery("body").removeClass("loading");
            }
        });
    }
},
shareProgressOnFacebook: function() {
		
    var shareDescription = "I am earning Free World points! Find out how many slaves work for you and earn Free World points at SlaveryFootprint.org.";
				
    if (typeof(AppFacade.userModel.attributes.freeworld_score) != "undefined") {
        AppFacade.userPoints = AppFacade.userModel.attributes.freeworld_score;
        var shareDescription = "I have earnt "+AppFacade.userPoints+" Free World points! Find out how many slaves work for you and earn Free World points at SlaveryFootprint.org.";
    }
    
    window.AppFacade.awardFreeWorldPoint('facebook');
    jQuery.ajax({
        "async": false,
        "url":"/gateway/user/graph/freeworld/",
        "type":"GET",
        "success":function(data) {
            //console.log(data.url);
			//if(FB && FB.getSession() != null)
			//{
			//	console.log('opening popup');
            	window.open("uploadFB.php?url=" + data.url, "Share_Popup", 'menubar=0,resizable=0,width=480,height=90,top=200,left=400');
			//} else
			//{
			//	console.log('logging in');
			//	FB.login(function(response) {console.log('opening popup 2');window.open("uploadFB.php?url=" + data.url, "Share_Popup", 'menubar=0,resizable=0,width=480,height=90,top=200,left=400');}, {perms: 'user_location,user_about_me,user_birthday,email,publish_stream'});
			//}
        // openPopup("uploadFB.php?url=" + data.url);
        /*$.post("uploadFB.php", { url: data.url },
                                               function(data) {
                                                // alert("Data Loaded: " + data);
                                                 if (data.error) {
                                                   //  window.location = data.error;
                                                 } else {
                                                     alert("Everything is ok");
                                                 }
                                               },"json");*/
        /*var params = {};
						params['message'] = 'How many slaves work for you?';
						params['type'] = 'photo';
						params['name'] = 'Slavery Footprint';
						params['description'] = 'I have '+AppFacade.userSlaves+' slaves working for me, find out how many slaves work for you at SlaveryFootprint.org.';
						params['link'] = 'http://www.slaveryfootprint.org';
						params['picture'] = data.url;
						params['caption'] = 'How many slaves work for you?';
						  
						FB.api('/me/photos', 'post', params, function(response) {
						  if (!response || response.error) {
						    //console.log(response.error);
						  } else {
						    alert('Published to stream - you might want to delete it now!');
						  }
						});
                                                    
                                                var params = {};
						params['message'] = 'How many slaves work for you?';
						params['type'] = 'photo';
						params['name'] = 'Slavery Footprint';
						params['image'] = backendUrl +'user_results/3105-0.png';
						  
						FB.api('/me/photos', 'post', params, function(response) {
						  if (!response || response.error) {
						   // console.log(response.error);
						  } else {
						    alert('Published to stream - you might want to delete it now!');
						  }
						});*/
        /*  var url = 'https://graph.facebook.com/me/photos';
                                                this.fileUpload(data.url, url);*/
		
        /*FB.ui(
					  {
						"method": 'stream.publish',
						"attachment":
						{
							"media": [{
								"type": "image",
								"src": data.url,
								"href": "http://www.slaveryfootprint.org"
							}]
						}
					}, function(response) {
						if (response && response.post_id) {
						  window.AppFacade.awardFreeWorldPoint('facebook');
						} else {
							// post not published, DO NOT AWARD POINTS!
						}
					  }
					);*/
        },
        "error":function(req) {
        //console.log("Error with ajax request.");
        //console.log(req);
        }
    });
},
		
shareResultsOnFacebook: function() {
	
	if (typeof(AppFacade.userSlaves) === "undefined" || AppFacade.userSlaves == null) {
		if (AppFacade.userModel.attributes.slavery_score && AppFacade.userModel.attributes.slavery_score != null) {
       		 AppFacade.userSlaves = Math.round(AppFacade.userModel.attributes.slavery_score / 10);
        }
    }

    FB.ui(
    {
        method: 'feed',
        name: 'Slavery Footprint',
        link: backendUrl +'results/?user='+AppFacade.userModel.attributes.uuid+'#results',
        picture: window.location.protocol + "//" + window.location.host + "/facebook_results_thumbnail.png",
        caption: 'How many slaves work for you?',
        description: 'I have '+AppFacade.userSlaves+' slaves working for me, find out how many slaves work for you at SlaveryFootprint.org.'
    },
    function(response) {
        if (response && response.post_id) {
                                    
            window.AppFacade.awardFreeWorldPoint('facebook');
        } else {
    // post not published, DO NOT AWARD POINTS!
    }
    }
    );
},
		
awardFreeWorldPoint: function(action) {
    jQuery.ajax({
        "async": false,
        "url":"/gateway/score/" + action,
        "type":"POST",
        "success":function(data) {
        }
    });
},
getUrlVars: function()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

}

window.AppFacade.init();

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

});