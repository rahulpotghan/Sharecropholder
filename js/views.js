//var backendUrl = 'http://svn428.dev.unit9.net/';
var backendUrl = 'http://slaveryfootprint.org/';

var View = Backbone.View.extend({
    el: jQuery("#main"),
    initialize: function(pageID){
        var self = this;
        self.pageID = pageID;
        self.admin();
        this.render();
    },
	question_ids: {"3": "Children", "4" : "Home", "5": "Food", "6" : "Medicine", "7" : "Jewellery", "8" : "Gadgets", "9" : "Sports", "10": "Clothing"},
    admin: function(){
        var self = this;
        var obj = window.AppFacade.contentObject;
        if(typeof obj === "object"){
            for(var item in obj){
                var pageID = obj[item].PageID;
                if(self.pageID == pageID){
                    jQuery("#update" + pageID).css("display","block");
                    jQuery("#update" + pageID).submit(function(e){
                        self.update_cms(e, this);
                    })
                }else{
                    jQuery("#update" + pageID).css("display","none");
                }
                
            }
        }
    },
    animateIn: function(cb, ref){
        var self = this;
        self.animate = new AnimationHandler(self.templateID+"_content", cb, ref, self.pageID);
    },
	registerShares: function(){
		jQuery("#share_facebook").click(function(){
			
			//jQuery.ajax({"url":"/gateway/score/facebook","type":"POST","success":function(data){ 
			//}});
			
			
		});
               jQuery("#share_twitter").unbind("click");
		jQuery("#share_twitter").click(function(){
		
			//e.preventDefault();
			var slaves = "multiple";
			
			if (AppFacade.userSlaves != null && typeof(AppFacade.userSlaves) != "undefined") {
				slaves = AppFacade.userSlaves;
			}
                        var sharestring = escape('I have '+slaves+' slaves working for me, find out how many slaves work for you at SlaveryFootprint.org. #slaveryfootprint');
                        //openPopup('http://twitter.com/home?status='+sharestring);
                        var newwindow=window.open('http://twitter.com/intent/tweet?text='+sharestring,'twitter_popup','height=300,width=450');
                        if (window.focus) {
                            newwindow.focus()
                        }
			
                        jQuery.ajax({"url":"/gateway/score/twitter","type":"POST","success":function(data){ 
                                
			}});
		});
	},
    animateOut: function(type){
        var self = this;
				jQuery("body").addClass("loading");
		
		
		
		
		AppFacade.states[self.templateID] = jQuery(AppFacade.currentView.templateID + "_content").html();
		
		
        if(typeof self.animate != "undefined"){
				
				self.animate.animateOut(type, AppFacade.currentView.templateID + "_content");           

        }
    },
    handleInputChangeEvent: function(e){
		AppFacade.changeNextButton();
        var self = this;
        var key = jQuery(e.target).attr("name");
        
        if(typeof self.pageID == "undefined"){
            return
        }
        
        if(typeof self.templateID == "undefined"){
            return
        }
        
        var val = jQuery(e.target).val();
        
        var questionModel = new QuestionModel({
            "param": self.templateID,
            "value": jQuery(e.target).attr("name"),
            "quantity": val, 
            "question_id" : self.pageID,
            "clear" : AppFacade.clearbool
        });


        if(typeof self.models === "undefined"){
            self.models = {};
        }
        if(self.models[key]){
            var cid = self.models[key].cid;
            AppFacade.survey.remove(cid);
            if(questionModel){
                AppFacade.survey.add(questionModel);
            }
            self.models[key] = questionModel;
        }else{
            self.models[key] = questionModel;
            if(questionModel){
                AppFacade.survey.add(questionModel);

            }
        }
        
    },
    addQuestionModel: function(tag, value, id){
        var self = this;


		
        if(AppFacade.survey.length == 0){
			AppFacade.changeNextButton();
		}
        //allow option to change tags
        
        if(id){
            var key = id;
        }else{
            var key = tag;
        }
        
        if(typeof self.pageID == "undefined"){
            return
        }
        
        if(typeof self.templateID == "undefined"){
            return
        }
        
        var val = value;
        
        var questionModel = new QuestionModel({
            "param": self.templateID,
            "value": tag,
            "quantity": val, 
            "question_id" : self.pageID,
            "clear" : AppFacade.clearbool
        });


        if(typeof self.models === "undefined"){
            self.models = {};
        }
        if(self.models[key]){
            var cid = self.models[key].cid;
            AppFacade.survey.remove(cid);
            if(questionModel){
                AppFacade.survey.add(questionModel);
            }
            self.models[key] = questionModel;
        }else{
            self.models[key] = questionModel;
            if(questionModel){
                AppFacade.survey.add(questionModel);

            }
        }
        
    },
	
	clearAnswers: function(questionModel, id) {
		if(typeof self.models === "undefined"){
            self.models = {};
        }
        if(self.models[id]) {
            var cid = self.models[id].cid;
            AppFacade.survey.reset();
        }
	},
	
    addSingleAnswer: function (questionModel, id, ignoreDuplicate){
        
        if(AppFacade.survey.length == 0){
			AppFacade.changeNextButton();
		}
		
        if(typeof self.models === "undefined"){
            self.models = {};
        }
        if(self.models[id] && ignoreDuplicate !== true){
            var cid = self.models[id].cid;
            AppFacade.survey.remove(cid);
            if(questionModel){
                AppFacade.survey.add(questionModel);
            }
            self.models[id] = questionModel;
        }else{
            self.models[id] = questionModel;
            if(questionModel){
                AppFacade.survey.add(questionModel);
            }
        }
        
    },
    submitQuestion: function(e){
        e.preventDefault();
        AppFacade.saveSurvey();
    },
    update_cms: function(e, rel){
        jQuery('#success').css('display','none');
        jQuery('#error').css('display','none');
        jQuery('#loading').css('display','block');
        //gather form action and data.
        var action = jQuery(rel).attr('action');
        var data = jQuery(rel).serialize();
        //carry out the ajax post
        jQuery.ajax({
            "url": action,
            "type":"POST",
            "data": data,
            //functions upon success
            "success": function(data){
                //hide loading gif
                jQuery('#loading').css('display','none');
                //display success message
                jQuery('#success').css('display','block');

            }
        })
        e.preventDefault();
    },
    render: function(callback, ref){
        var self = this;

        var obj = {
            "user" : AppFacade.userModel.attributes,
            "survey" : AppFacade.survey.attributes,
            "score" : AppFacade.score,
            "tags" : AppFacade.tags
        }
        
		// if(!AppFacade.states[self.templateID]){
		// 	AppFacade.states[self.templateID] = jQuery(self.templateID+"_content").html();
		// 	jQuery(this.el).html(this.template.tmpl(obj));
		// }else{
		// 	
		// 	var el = jQuery("<div>");
		// 	var s = self.templateID;
		// 	
		// 	while(s.charAt(0) == '#')
		// 	    s = s.substr(1);
		// 	

		// 	
		// 	el.attr("id", s+"_content");
		// 	el.html(AppFacade.states[self.templateID]);
		// 	jQuery(this.el).html(el);
		// }
		
		
		// For Magic. Stop loader after this line.
		
		jQuery(this.el).html(this.template.tmpl(obj));
		
		if (AppFacade.currentView) {
			//INTERACT WITH UI ELEMENTS BEFORE ANIMATION HERE.
			if (AppFacade.currentView.pageID == 8 || AppFacade.currentView.templateID == "#scores") {
				AppFacade.currentView.beforeAnimation();
			}
		}
		
        self.animateIn(callback, ref);
		self.registerShares();
		AppFacade.getCount();
        return this;
    }
});

var FooterView = View.extend({
    el: jQuery("#footer"),
    events: {
        "click #fb_like":"handleFbLike",
        "click #tweet":"handleTweet"
    },
    initialize: function(pageID){
        var self = this;
        jQuery('#share_fb').click(function () {
				jQuery('#share_fb_box').toggle();
			});
		AppFacade.facebookTwitterQuestionShareHandler();
    },
    userModelReady: function(userModel) {
    
    },
    handleFbLike: function(e) {
        var url = "gateway/score/facebook";    
        jQuery.ajax({
            type: "POST",
            url: url,
            data: null,
            dataType: "json",
            success: function(){
                if (data.val == false) {

                } else if (data.val == true) {

                   }                   
            }
        });
    },
    handleTweet: function(e) {
        var url = "gateway/score/twitter";    
        jQuery.ajax({
            type: "POST",
            url: url,
            data: null,
            dataType: "json",
            success: function(data){
                if (data.val == false) {

                } else if (data.val == true) {

                   }               
            }
        });
    }
});

var Homepage = View.extend({
    template: jQuery("#homepage"),
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.admin();
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js"], function() {
            self.render();
            
            
        });
        
    },
    userModelReady: function(userModel) {
    
    }
});


var WhereDoYouLive = View.extend({
    template: jQuery("#where_do_you_live"),
    events: {
        "submit #location_postcode_form form" : "postcode_submit",
		"click #location_enter" : "postcode_submit"
    },
   initialize: function(obj) {
        var v = new Array();
        v[1] = "10_8_0";
        v = navigator.userAgent.match(/Mac OS X ([\d_]+)/);
        var isOSX8 = true;
        if(v!=null && v[1] >= "10_8_0") { 
        //alert("You are using Mac OS X 10.8.0 and above ");
         isOSX8 = true;
        }else {
			  //alert("SLavery doesnt Exist ");
         isOSX8 = false;
        }
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        self.admin();

    },
    rendered: false,
    userModelReady: function(userModel) {
			var self = this;
			if(self.rendered) {
				return
			} else {
				self.rendered = true;
			}
			
			require(["/static/js/libs/jquery.path.js",  
							 "/static/js/libs/jquery.easing.1.3.js",
							 "order!/static/js/libs/raphael-min.js",
							 "order!/static/js/libs/location_map.js",
							 "/static/js/json.models/map.js",
							 "async!http://maps.google.com/maps/api/js?v=3.4&sensor=false"], function() {
					self.render();
					self.locationMap = new LocationMap();
                    
                    var v = navigator.userAgent.match(/Mac OS X ([\d_]+)/);
                    var isOSX8 = true;
                    if(v[1] >= "10_8_0") { 
                    //alert("Tikloo is ROCKSTAR ");
                     isOSX8 = true;
                    }else {
                     isOSX8 = false;
                    }
					
					if(userModel && userModel.attributes) {
						if(!userModel.attributes.city){
								if(userModel.attributes.location){
								        if(!isOSX8)
										self.getCityFromYahoo(userModel.attributes.location, "");
								}else{
								        if(!isOSX8)
										self.getLocation();
								}
						}else{
								self.latitude = userModel.attributes.lat;
								self.longitude = userModel.attributes.lng;
								self.city = userModel.attributes.city;
								self.addCityToMap();
						}
					}

					jQuery(window).resize(function() {
						self.locationMap.viewDidResize();
					});
					
			});
    },
    postcode_submit: function(e) {
        var self = this;
        var submission_data = jQuery("#postcode_input").val();
		
		if(self.validateZipCode(submission_data)){
			self.geocode({"address": submission_data});
	        return false;
		}else{
			jQuery("#location_postcode_form").addClass("error");
			jQuery("#location_enter").addClass("location-enter_button_error");
			jQuery("#location_postcode_form form label").text("Not Valid Zip Code");
			
			
			setTimeout(function(){
				jQuery("#location_postcode_form").removeClass("error");
				jQuery("#location_enter").removeClass("location-enter_button_error");
				jQuery("#location_postcode_form form label").text("Enter your Zip Code");
			}, 5000);
			
			e.preventDefault();
			
		}


    },
	validateZipCode: function(elementValue){
		var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
		//return zipCodePattern.test(elementValue);
		return true;
	},
    getLocation: function(){
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                       
                        var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        //console.log(latlng);
                        self.geocode({"latLng":latlng});
                         AppFacade.userModel.set({"lat": pos.coords.latitude});
                        AppFacade.userModel.set({"lng": pos.coords.longitude});
                         //AppFacade.userModel.save();
                    },function error(error) {
                        switch(error.code) 
			{
				case error.TIMEOUT:
					alert ('Timeout');
					break;
				case error.POSITION_UNAVAILABLE:
					alert ('Position unavailable');
					break;
				case error.PERMISSION_DENIED:
					alert ('Permission denied');
					break;
				case error.UNKNOWN_ERROR:
					alert ('Unknown error');
					break;
			}
                    },{maximumAge:Infinity,
            timeout:10000});

        } else {
            
        }
    },
    geocode: function(obj) {
        var self = this;
        var geocoder = new google.maps.Geocoder();

        self.model.unset("initialized");

        if (typeof obj.address === "string") {
			if(!jQuery.browser.msie){
				//self.getCityFromYahoo(obj.address);
	            //return;
			}

        }
		
		try
		{
			geocoder.geocode(obj, function(results, status) {
				
				if (status == google.maps.GeocoderStatus.OK) {
					if (results) {
						var counter = 0;
						for (var item in results[0].address_components) {
							
							if(jQuery.browser.msie){
								if(typeof results[0].address_components[item].types === "object"){
									if (results[0].address_components[item].types[0] == "sublocality"){
	
										AppFacade.changeNextButton();
										AppFacade.passThrough = true;
										AppFacade.userModel.set({"city": results[0].address_components[item].long_name});
										jQuery("#location_postcode_form form label").text("You live in "+results[0].address_components[item].long_name);
									}
								}
								
							}
							
							if(typeof results[0].address_components[item].types != "undefined"){
								if (typeof results[0].address_components[item].types[0] === "string") {
									if (results[0].address_components[item].types[0] == "locality") {
										self.localityString = results[0].address_components[item].long_name;
										if(jQuery.browser.msie){
																					counter++;
	
										}
	
									}
	
									if (results[0].address_components[item].types[0] == "country") {
										self.countryString = results[0].address_components[item].long_name;
									}
								}
							}
	
						}
	
						if (counter <= 4)
						{
							self.getCityFromYahoo(self.localityString, self.countryString);
						}
					} else {
						self.showGeocodingError(2);
					}
				} else {
					self.showGeocodingError(1);
				}
	
			});
		} catch(e)
		{
			self.showGeocodingError(0);
		}
    },
	
	showGeocodingError: function(errorNo) {
		alert('Geocoding error ' + errorNo);
	},
	
    getCityFromYahoo: function(locale, country){
        var self = this;
        //  "url" : "http://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"+locale+"%20"+country+"%22&diagnostics=true",
	           
        
       	//if(!jQuery.browser.msie){
       		//    "url": "http://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"
	         //   +locale+"%20"+country+"%22&diagnostics=true",
			$.ajax({
	            "type": "GET",
	            //"dataType": "json",
              //"url" : "/test.php?locale="+locale+"&country="+country,
	            "dataType": "jsonp",
              "url" : "http://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"+encodeURIComponent(locale)+"%20"+encodeURIComponent(country)+"%22",
	           "success": function(data) {

	                if (_.size(data.query.results) > 0) {

	                    if (data.query.count > 1) {
	                        self.latitude =  data.query.results.Result[0].latitude;
	                        self.longitude = data.query.results.Result[0].longitude;
	                        self.city = data.query.results.Result[0].city;


	                    } else {
	                        self.latitude = data.query.results.Result.latitude;
	                        self.longitude =data.query.results.Result.longitude;
	                        self.city = data.query.results.Result.city;

	                    }


	                    AppFacade.userModel.set({"lat": self.latitude, "lng": self.longitude, "location": self.city});
	                    //AppFacade.userModel.save(); no save please, we already have a blank user



	                }
	                self.addCityToMap();

	            },
				"error": function(data, status){
					jQuery("#location_postcode_form").addClass("error");
					jQuery("#location_enter").addClass("location-enter_button_error");
					jQuery("#location_postcode_form form label").text("Location not found.");
					
					AppFacade.changeNextButton();
					AppFacade.passThrough = true;
					
					self.showGeocodingError(3);
				}
	        });
		//}


    },
    addCityToMap: function(){
        var self = this;
        if(typeof self.locationMap != "undefined"){
            self.locationMap.drawMarker({
                  latitude: self.latitude
                 , longitude: self.longitude
                 , city: self.city
                 , title:''
            });
			AppFacade.changeNextButton();
			AppFacade.passThrough = true;
                        self.saveLocation();
        }

    },
    saveLocation: function () {
        var self = this;
        
       // console.log(JSON.stringify(window.AppFacade.userModel.attributes));
        
        /*if (typeof(self.countryString) === "undefined" ) window.AppFacade.userModel.attributes.location = "-";
        else window.AppFacade.userModel.attributes.location = self.countryString;
        if (typeof(self.city) === "undefined" ) window.AppFacade.userModel.attributes.city = "-";
        else window.AppFacade.userModel.attributes.city =self.city;*/
        
        jQuery.ajax({
                "url":"/gateway/user/current",
                "type" : "PUT",
                "data" : JSON.stringify(window.AppFacade.userModel.attributes),
                "success": function(data){

                }
        });
    }

});

var DoYouHaveChildren = View.extend({
    template: jQuery("#do_you_have_children"),
    events: {

        "keyup #do_you_have_children_content input[type=text]" : "handleInputChangeEvent",
        "change #do_you_have_children_content input[type=radio]" : "handleInputChangeEvent",
        "submit #do_you_have_children_content form" : "submitQuestion"
    },
    
    ageSlider: null,
    selectedChild: "none",
    selectedAge: 5,
    childrenList: [],
    childId: 0,
    
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.addClicked = false; 
        
        AppFacade.childrenstop = true;
        
        _.bindAll(self,"render");
        
        AppFacade.survey.add(self.model);    
        self.admin();
        
        self.ageSlider = null;
        self.selectedChild = "none";
        self.selectedAge = 5;
        self.childrenList = new Array();
        self.childId = 0;
        
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"
                 ], function() {
            self.render();
            
            jQuery("#no_dont_include").unbind("click");
            jQuery("#add_girl span").unbind("click");
            jQuery("#add_boy span").unbind("click");   
            
            jQuery("#no_dont_include").click(function() {
                self.dontInclude();
            });
            
            jQuery("#add_girl span").click(function() {
                self.addGirl();
            });
            
            jQuery("#add_boy span").click(function() {
                self.addBoy();
            });
            
            ////console.log("slider");
            self.ageSlider = jQuery("#age-slider").slider({
            orientation: 'vertical',
            value:5,
            min: 0,
            max: 16,
            step: 1,
            slide: function( event, ui ) {
                self.updateChild(ui.value);
                self.selectedAge = ui.value;
            }
        });       
        });
        
		//Get skintone - checking appfacade.skintone, otherwise cookie, otherwise default 2.
		if (jQuery.cookie('skintone') == null && typeof(AppFacade.skinTone) === "undefined") {
			AppFacade.skinTone = 2;
		} else if (jQuery.cookie('skintone') == null && typeof(AppFacade.skinTone) != "undefined") {
			AppFacade.skinTone = AppFacade.skinTone;
		} else {
			AppFacade.skinTone = jQuery.cookie('skintone');
		}
        
        jQuery('.dialogue_text_container h2').text("Fine Tune.");
        jQuery('#fine_tuning_dialogue_text').text("Throughout the survey refine your answers here for a more accurate score.");
        AppFacade.clearbool = 1;
    },
    userModelReady: function(userModel) {
    
    },
    modelUpdated: function(){
    },
    
    dontInclude: function(r){
        var self = this;
		self.animateOut("next");

		self.addQuestionModel("InfM", 0);
		self.addQuestionModel("InfF", 0);
		self.addQuestionModel("K2-12M", 0);
		self.addQuestionModel("K2-12F", 0);
		self.addQuestionModel("K13-16F", 0);
		self.addQuestionModel("K13-16M", 0);
		
    },
    
    updateChild: function(age) {
        var self = this;
        
        // update age text
        jQuery("#age_text").html(age);   
        
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone+"_toddler");  
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone);
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy_inactive");
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone+"_teenager");
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone+"_toddler");  
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone);
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl_inactive");
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone+"_teenager");
        
        // update sprite
        if(age >= 13)
        {
            jQuery("#boy_inactive").addClass("do_you_have_children-"+self.selectedChild+AppFacade.skinTone+"_teenager");
            jQuery("#select_age").css("top", "100px");
        }
        else if(age >= 3)
        {
            jQuery("#boy_inactive").addClass("do_you_have_children-"+self.selectedChild+AppFacade.skinTone);
            jQuery("#select_age").css("top", "160px");
        }
        else
        {
            jQuery("#boy_inactive").addClass("do_you_have_children-"+self.selectedChild+AppFacade.skinTone+"_toddler");
            jQuery("#select_age").css("top", "230px");
        }
        
    },
    
    addChildOn: function() {
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy_inactive");
        
        jQuery("#add_boy .text").html("Cancel");
        jQuery("#add_girl .text").html("Done");
        
        jQuery("#plus_green").removeClass("do_you_have_children-plus_green");
        jQuery("#plus_green").addClass("do_you_have_children-cancel");
        
        jQuery("#plus_red").removeClass("do_you_have_children-plus_red");
        jQuery("#plus_red").addClass("do_you_have_children-done");
        
        jQuery(".age-text").addClass("age-text-black");
        jQuery(".age-text-black").removeClass("age-text");
        
        jQuery("#slider .text").html("Slide to change age");
        
        jQuery("#select_age .text").addClass("textblack");
        jQuery("#select_age .text").removeClass("text");
        
        jQuery("#age-slider").css("display", "block");
        jQuery("#slider_button").css("display", "none");
       
    
    },
    
    addChildOff: function() {
        var self = this; 
        
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone+"_toddler");  
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone);
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy_inactive");
        jQuery("#boy_inactive").removeClass("do_you_have_children-boy"+AppFacade.skinTone+"_teenager");
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone+"_toddler");  
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone);
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone+"_inactive");
        jQuery("#boy_inactive").removeClass("do_you_have_children-girl"+AppFacade.skinTone+"_teenager");
        jQuery("#boy_inactive").addClass("do_you_have_children-boy_inactive");
                    
        jQuery("#add_boy .text").html("Add Boy");
        jQuery("#add_girl .text").html("Add Girl");
        
        jQuery("#plus_green").addClass("do_you_have_children-plus_green");
        jQuery("#plus_green").removeClass("do_you_have_children-cancel");
        
        jQuery("#plus_red").addClass("do_you_have_children-plus_red");
        jQuery("#plus_red").removeClass("do_you_have_children-done");
        
        jQuery("#slider_button").addClass("do_you_have_children-slider_button");
        jQuery("#slider_button").removeClass("slider_button_active");
        
        jQuery(".age-text-black").addClass("age-text");
        jQuery(".age-text").removeClass("age-text-black");
        
        jQuery("#slider .text").html("");
        
        jQuery("#select_age .textblack").addClass("text");
        jQuery("#select_age .text").removeClass("textblack");
        
        jQuery("#age-slider").css("display", "none");
        jQuery("#slider_button").css("display", "block");        
        
        jQuery("#age_text").html(5);
        jQuery("#age-slider").slider("value", 5);
        self.selectedAge = 5;
        
        jQuery("#select_age").css("top", "160px");
    },
    
    addBoy: function(r) {
        var self = this;
        
        if(self.addClicked)
        {           
            self.addChildOff();
            
            self.addClicked = false;
        }
        else
        {
            jQuery("#boy_inactive").addClass("do_you_have_children-boy"+AppFacade.skinTone);
            
            self.selectedChild = "boy";
            
            self.addChildOn();
            
            self.addClicked = true;
        }
        
    },
    
    addGirl: function(r) {
        var self = this; 
        
        if(self.addClicked)
        {
            self.addChildToList(self.selectedChild, self.selectedAge);            
        
            self.addChildOff();
            
            self.addClicked = false;
        }
        else
        {            
            jQuery("#boy_inactive").addClass("do_you_have_children-girl"+AppFacade.skinTone);
            
            self.selectedChild = "girl";
            self.addChildOn();            
            
            self.addClicked = true;
        }
    },
    
    addChildToList: function(sex, age) {
        var self = this;		
        
        if(self.childrenList.length >= 4) {
        	//Make counter appear, add to it, send requests etc.
        	
        	var id = self.childId;
	        self.childId++;
	        
        	var child = {"sex": sex, "age": age, "id": id};
	        self.childrenList.push(child);        
	        self.processChildrenSurvey(child);
	        
	        jQuery('#children_counter').text("Children: "+self.childrenList.length);
        	jQuery('#children_counter').show();
        	
        } else {
            //If less than 4 kids.
	        
	        
	        
	        var divClass = sex+AppFacade.skinTone;
	        
	        if(age >= 13)
	        {
	            divClass = sex+AppFacade.skinTone + "_teenager";
	        }
	        else if(age < 3)
	        {
	            divClass = sex+AppFacade.skinTone + "_toddler";
	        }
	        
	        var i = self.childrenList.length + 1;
	        
	        var offset = 0;// + (i - 1) * 70;
	        
	        var id = self.childId;
	        self.childId++;
	        
			var child = {"sex": sex, "age": age, "id": id};
	        self.childrenList.push(child);        
	        self.processChildrenSurvey(child);
			
			var len = jQuery("#children_list").children().length;
			
			if(len == 0){
				var change = 0;
			}else if(len == 1){
				var change = 40;
			}else if(len == 2){
				var change = 80;
			}else if(len == 3){
				var change = 120;
			}else if(len == 4){
				var change = 160;
			}
			
	        jQuery("#children_list").append("<span data-sex='"+sex+"' data-age='"+age+"' class=\"do_you_have_children-" + divClass + "_small\" id=\"child_" + id + "\" style='margin-left: "+ offset + "px; position: relative; left: -"+change+"px; width: 82px; height: 194px; float: left; cursor: pointer; display: block'></span>")
	        
	        jQuery('#children_counter').text("Children: "+self.childrenList.length);
	        jQuery('#children_counter').hide();
	        
	     } //(end if less than 4 kids)
	     
	        
	jQuery("#child_" + id).click(function() { //using id
				
				 if(self.childrenList.length >= 5) {
				 		
				 		var count = self.childrenList.length -1;
				 		
				 		var age = self.childrenList[count].age;
				 		var sex = self.childrenList[count].sex;
				 		
				 		self.processChildrenSurvey({"sex": sex, "age": age}, true); //backend action
				 		
				 		
						//console.log(self.childrenList[count]);
						self.childrenList.splice(count, 1);   //Limitation to this functionality is that you can only remove the last child on the list unless there is 4 or less.
			            
			            jQuery('#children_counter').text("Children: "+self.childrenList.length);
			            jQuery('#children_counter').show();
			            
			            if(self.childrenList.length < 5) {
			            	 jQuery('#children_counter').hide();
			            }
				 
				 } else {
						
						//console.log("removing a visible child");
						jQuery('#children_counter').hide();
						
						var age = jQuery(this).attr("data-age");
						var sex = jQuery(this).attr("data-sex");
			            jQuery(this).remove();
			
						self.processChildrenSurvey({"sex": sex, "age": age}, true);
			
			            for(var j = 0; j < self.childrenList.length; j++)
			            {
			                if(self.childrenList[j].id == id)
			                {
			                	//console.log(self.childrenList[j]);
			                    self.childrenList.splice(j, 1);
			                }    
			            }
			            
			            for(var j = 0; j < self.childrenList.length; j++)
			            {                
			                jQuery("#child_" + self.childrenList[j].id).css("left", -j * 40);
							
			            }
			            
			            if(self.childrenList.length == 0)
			            {
			                jQuery("#tap_to_remove").css("display", "none");
			            }
			            
			           
						
	            
	            }
	            
	            // console.log("There are now "+self.childrenList.length+" children in the list.");
	 });
	        
	        
		jQuery("#tap_to_remove").css("display", "block");
        //console.log("There are now "+self.childrenList.length+" children in the list.");
    },
	kids: {},
	processChildrenSurvey: function(child, remove){
		
		var self = this;
		AppFacade.changeNextButton();
		AppFacade.childrenstop = false;
		
		if(child.sex == "boy"){
			var tagSex = "M";
		}else{
			var tagSex = "F";
		}
		
		if(child.age <= 2 || child.age == 0){
			var prefix = "Inf";
		}else if ((child.age > 2) && (child.age <= 12)){
			var prefix = "K2-12";
		}else{
			var prefix = "K13-16";
		}
		
		var tag = prefix + tagSex;
	
		if(!remove){
			//add
			if(typeof self.kids[tag] === "undefined" || isNaN(self.kids[tag])){
				self.kids[tag] = 1;
			}else{
				self.kids[tag] = self.kids[tag] + 1;
			}
		}else{
			//remove
			if(typeof self.kids[tag] == 0){
				self.kids[tag] = 0;
			}else if (isNaN(self.kids[tag])) {
				//console.log(tag);
				self.kids[tag] = self.kids[tag] - 1;
			}else{
				self.kids[tag] = self.kids[tag] - 1;
			}
		}
		
		self.addQuestionModel(tag, self.kids[tag]);
		
	},
	
	restoreState: function(data) {
		var self = this;
		
		//e.g. data = {"meta":{"children":[{"sex":"boy","age":"3"},{"sex":"girl","age":"5"}]}} 
		var childrenCount = data.children.length;
		
		for( i=0; i < childrenCount; i++) {
			self.addChildToList(data.children[i].sex, data.children[i].age);	
		}
	},
	
	getStateJson: function() {
		var self = this;
		var stateJson = {children: []};
		for(i = 0; i < self.childrenList.length; i ++) {
			stateJson.children.push({sex: self.childrenList[i].sex, age: self.childrenList[i].age});
		}
		return stateJson;
	}
	
});         

var WhatsUnderYourRoof = View.extend({
    template: jQuery("#whats_under_your_roof"),
    events: {
        "click #car1" : "removeVehicle",
        "click #car2" : "removeVehicle",
        "click #scooter" : "removeVehicle",
        "click #options a" : "handleOptionClick",
        "click .home_layer div[data-state=on]" : "handleHouseRoomClick",
        "click .rent_layer div[data-state=on]" : "handleHouseRoomClick"
    },
    house: [],
    house_rent: [],
    tags: {},
    house_class: ".home_layer",
    initialize: function(obj, _new) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;

        self.admin();
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"
                 ], function() {
					self.render(self.createDraggables,self);

					
					self.createDropRegion();

            		self.house = [];
            		self.house_rent = [];
			//             if(_new){
			// 
			// }else{
			// 	self.render();
			// 	self.createDraggables();
			// 	self.createDropRegion();
			// 	
			// }
			
            

        });
        //<span data-spritereference="whats_under_your_roof-bedroom_overlay" class="whats_under_your_roof-bedroom_overlay"></span>
        
        AppFacade.clearbool = 1;
        
    },
    userModelReady: function(userModel) {
    
    },
    createDropRegion: function(){
        var self = this;
        var l = (self.house.length)+1;
        
        jQuery(self.home).droppable("destroy");
        
        if((l >=1) && (l<=7)){
            var drp = jQuery(".home_layer div[rel="+l+"]").droppable({

                drop: function(event,ui){
                    self.dropProcess(event,ui,drp,0);

                }
            });
        } else {
        	var drp = jQuery(".home_layer").droppable({

                drop: function(event,ui){
                    self.dropProcess(event,ui,drp,1);

                }
            });
        	
        }

        var l = (self.house_rent.length)+1;
        
        if((l >=1) && (l<=5)){
            var drp2 = jQuery(".rent_layer div[rel="+l+"]").droppable({

                drop: function(event,ui){
                    self.dropProcess(event,ui,drp2,0);

                }
            });
        } else {
        	var drp2 = jQuery(".rent_layer").droppable({

                drop: function(event,ui){
                    self.dropProcess(event,ui,drp2,1);

                }
            });
        	
        }


        self.home = jQuery("#college_layer_drop").droppable({
            drop: function(event,ui){
            	self.dropProcess(event,ui,self.home,0);
               
        }});

		self.home = jQuery("#couch_surfing_layer_drop").droppable({
            drop: function(event,ui){
            	self.dropProcess(event,ui,self.home,0);
               
        }});
    },
	dropProcess: function(event,ui,drp,garage){
		
		var self = this;
		var val = jQuery(ui.draggable[0]).data("tag");

        if(val == "whats_under_your_roof-car_overlay" || val == "Car"){
			if(typeof self.car === "undefined"){
					self.car = true;
					
				if(self.carvalue){
					self.carvalue = self.carvalue + 1;
				}else{
					self.carvalue = 1;
				}	
				

					
				self.addQuestionModel("Car", self.carvalue);
                jQuery(".garage_layer").removeClass().addClass("garage_layer");
                
            }else if (typeof self.car2 === "undefined"){
				self.car2 = true;
				if(self.carvalue){
					self.carvalue = self.carvalue + 1;
				}else{
					self.carvalue = 1;
				}	
				

					
				self.addQuestionModel("Car", self.carvalue);
			}
            self.garageProcess(event,ui);
			return
        }
        
        if(val == "whats_under_your_roof-motorcycle_overlay"  || val == "Motorcycle"){
                if(typeof self.motorcycle === "undefined"){
                    self.motorcycle = true;
					
					if(self.scootervalue){
						self.scootervalue = self.scootervalue + 1;
					}else{
						self.scootervalue = 1;
					}


					self.addQuestionModel("Moto", 1);
                    jQuery(".garage_layer").removeClass().addClass("garage_layer");;
                }
            
			self.garageProcess(event,ui);
            return
        }
        
        if(val == "whats_under_your_roof-bicycle_overlay" || val == "Bicycle"){
			if(typeof self.bicycle === "undefined"){
                self.bicycle = true;

                jQuery(".garage_layer").removeClass().addClass("garage_layer");
            }
			self.garageProcess(event,ui);
            return
        }



        
        self.dragged = ui.draggable[0];
        jQuery(drp).droppable("destroy");
        setTimeout(function(){
            self.createDropRegion();
        }, 20);
	},
	garageProcess: function(event,ui){
			var self = this;
            
            if(self.car && self.bicycle){
				if(!self.college){
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage3");
				}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
                
				jQuery("#bicycle").css("display", "block");
				
				jQuery("#car1").css("display", "block");
				if(self.car2){
					jQuery("#car2").css("display", "block");
				}
				
            }else if (self.car && self.motorcycle){
				if(!self.college){
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage3");
				} else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
                
				jQuery("#scooter").css("display", "block");
				jQuery("#car1").css("display", "block");
				if(self.car2){
					jQuery("#car2").css("display", "block");
				}
            }else if (self.car){
				if(!self.college){
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				} else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
                
				jQuery("#car1").css("display", "block");
				if(self.car2){
					jQuery("#car2").css("display", "block");
				}
            }else if (self.bicycle){
				if(!self.college){
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage1");
				}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
                
				jQuery("#bicycle").css("display", "block");
            }else if(self.motorcycle){
				if(!self.college){
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage1");
				}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
                
				jQuery("#scooter").css("display", "block");
            }
            
        
	},

    
	garageCheck: function(){
		var self = this;
		if(self.car && self.bicycle){
			if(!self.college){
				jQuery(".garage_layer").addClass("whats_under_your_roof-garage3");
			}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
            
			jQuery("#bicycle").css("display", "block");
			
			jQuery("#car1").css("display", "block");
			if(self.car2){
				jQuery("#car2").css("display", "block");
			}
			
        }else if (self.car && self.motorcycle){
			if(!self.college){
				jQuery(".garage_layer").addClass("whats_under_your_roof-garage3");
			}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
            
			jQuery("#scooter").css("display", "block");
			jQuery("#car1").css("display", "block");
			if(self.car2){
				jQuery("#car2").css("display", "block");
			}
        }else if (self.car){
			if(!self.college){
				jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
			}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
            
			jQuery("#car1").css("display", "block");
			if(self.car2){
				jQuery("#car2").css("display", "block");
			}
        }else if (self.bicycle){
			if(!self.college){
				jQuery(".garage_layer").addClass("whats_under_your_roof-garage1");
			}else {
					jQuery(".garage_layer").addClass("whats_under_your_roof-garage2");
				}
            
			jQuery("#bicycle").css("display", "block");
        }else if(self.motorcycle){
			if(!self.college){
				jQuery(".garage_layer").addClass("whats_under_your_roof-garage1");
			}
            
			jQuery("#scooter").css("display", "block");
        }
	},
    
    
    removeVehicle: function(r) {
        var self = this;
        
        var id = r.currentTarget.getAttribute("id");
        ////console.log("removing vehicle");
        ////console.log(r.currentTarget.getAttribute("id")); 
                        
        if(id == "car1")
        {
            delete self.car;
            self.carvalue = self.carvalue - 1;
        }
        else if(id == "car2")
        {
            delete self.car2;
            self.carvalue = self.carvalue - 1;
        }
        else if(id == "scooter")
        {
            delete self.motorcycle;  
            self.scootervalue = 0;
        }
        
        jQuery("#" + id).css("display", "none");
        
        var carsUndefined = (typeof self.carvalue === "undefined") || (self.carvalue == 0);
        var scooterUndefined = (typeof self.scootervalue === "undefined") || (self.scootervalue == 0);
        
        ////console.log(self.carvalue);
        ////console.log(self.scootervalue);
        ////console.log(carsUndefined);
        ////console.log(scooterUndefined);
        
        if(carsUndefined && scooterUndefined)
        {
            jQuery(".garage_layer").removeClass().addClass("garage_layer");
            ////console.log("remove garage");
        }
        else if(scooterUndefined && !carsUndefined)
        {
            jQuery(".garage_layer").removeClass().addClass("garage_layer").addClass("whats_under_your_roof-garage2");
        }
        else if(carsUndefined && !scooterUndefined)
        {
            jQuery(".garage_layer").removeClass().addClass("garage_layer").addClass("whats_under_your_roof-garage1");
        }
        
        self.addQuestionModel("Car", self.carvalue);
        self.addQuestionModel("Moto", self.scootervalue);
    },
        
    createDraggables: function(){
        var self = this;
        var items = jQuery("#menu li");
        
        items.each(function(i){
            var el = jQuery("<span>");
            var attributes = this.attributes;
            var p = this;
            
            for(var i=0;i<attributes.length;i++){
				// if(attributes[i].name == "class"){
				// 	jQuery("."+attributes[i].value).remove();
				// 	
				// }
				
				
                
                if(attributes[i].name == "data-spritereference"){
					
					jQuery("#menu li ."+attributes[i].value).remove();
                    el.attr(attributes[i].name, attributes[i].value);
                    el.addClass(attributes[i].value);
                }
                
                if(attributes[i].name == "data-tag"){
                    el.attr(attributes[i].name, attributes[i].value);
                }
                
                var top = jQuery(this).css("top");
                var left = jQuery(this).css("left");
            }
            
            el.draggable({
                stop: function(event, ui) { 
                    setTimeout(function(){
                        if(typeof self.dragged != "undefined"){
                            
                            self.dragged = undefined;
                            self.handleMenuClick(el.clone());
                            
                            jQuery(el).css("top", "0px");
                            jQuery(el).css("left", "0px");
                            
                        }else{
                            jQuery(el).animate({"top" : "0px", "left": "0px"}, 200, "easeOutSine");
                        }
                        
                    }, 10);
                }
                
            });
            
            jQuery(p).prepend(el);

        })
    },
    handleOptionClick : function(e){
        var self = this;
        var tag = jQuery(e.currentTarget).attr("data-tag");
		self.tag=tag;
		self.option=e.currentTarget;
		
        /*self.house = [];
        
        jQuery(".home_layer").removeClass().addClass("whats_under_your_roof-house1 home_layer");
        jQuery(".home_layer div").attr("data-state", "off").removeClass().addClass("block").removeAttr("data-tag").removeAttr("data-spritereference");
        jQuery(".home_layer div[rel=1]").addClass("ui-droppable");
        
        jQuery(".rent_layer").removeClass().addClass("whats_under_your_roof-rent_1 rent_layer");
        jQuery(".rent_layer div").attr("data-state", "off").removeClass().addClass("block").removeAttr("data-tag").removeAttr("data-spritereference");
        jQuery(".rent_layer div[rel=1]").addClass("ui-droppable");
        jQuery(".rent_layer div").addClass("h_" + jQuery(".rent_layer div").attr("rel"));
        
        self.createDropRegion();
        
        //self.addQuestionModel(tag, self.tags[tag]);*/
        
        for(var t in self.tags)
        {
        	self.tags[t] = 0;
            self.addQuestionModel(t, 0);
        }
        //self.tags = [];
        
        //console.log(self.tags);
        //console.log(self.house_rent);
		
        self.addQuestionModel(tag, 1, "type");
        
				jQuery(".home_layer div").removeClass().addClass("block");
				jQuery(".home_layer div").attr("data-state", "off");
				jQuery(".home_layer div").removeAttr("data-tag");
				jQuery(".home_layer div").removeAttr("data-spritereference");
        jQuery(".home_layer").removeClass().addClass("home_layer whats_under_your_roof-house1");

        self.house = [];

				jQuery(".rent_layer div").removeClass().addClass("block");
				jQuery(".rent_layer div").attr("data-state", "off");
				jQuery(".rent_layer div").removeAttr("data-tag");
				jQuery(".rent_layer div").removeAttr("data-spritereference");
        jQuery(".rent_layer").removeClass().addClass("rent_layer whats_under_your_roof-rent_1");
        self.house_rent = [];
		
		jQuery(".garage_layer").removeClass().addClass("garage_layer");
		
		self.createDropRegion();
		
		if(tag == "Renter"){
			self.college = false;
			self.house_class = ".rent_layer";
			jQuery(".rent_layer").css("display", "block");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","renter");
			jQuery("#menu").removeClass("college");
			
		}else if (tag == "Owner"){
			self.college = false;
			self.house_class = ".home_layer";
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "block");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","owner");
			jQuery("#menu").removeClass("college");
			
			
		}else if(tag === "Student"){
			self.college = true;
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "block");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","college");
			jQuery("#menu").addClass("college");
			
			
		}else if(tag === "Csurfer"){
			self.college = true;
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "block");
			jQuery(".garage_layer").attr("rel","college");
			jQuery("#menu").addClass("college");
		}
		
		self.garageCheck();

        jQuery("#options li a").removeClass("whats_under_your_roof-option_on");
        jQuery(e.currentTarget).addClass("whats_under_your_roof-option_on");
        
    },
    handleMenuClick: function(e){
        var self = this;
        
        if(typeof e.currentTarget === "undefined"){
            var tag = jQuery(e).attr("data-tag");
            var ref = jQuery(e).attr("data-spritereference");
        }else{
            var tag = jQuery(e.currentTarget).attr("data-tag");
            var ref = jQuery(e.currentTarget).attr("data-spritereference");
        }

        var house_length,house_offset;
        if(self.house_class == ".home_layer") {
					house_length = self.house.length;
					house_offset = house_length+ 1;        	

					if((house_offset >=1) && (house_offset <=7)){
							self.house.push({"tag" : tag, "ref" : ref});
							jQuery(".home_layer div[rel="+house_offset+"]").addClass(ref);
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-state", "on");
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-tag", tag);
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-spritereference", ref);
							
							
							if(typeof self.tags[tag] === "undefined"){
									self.tags[tag] = 1;
							}else{
									self.tags[tag] = self.tags[tag] + 1;
							}
					
							if(house_offset != 7){
									jQuery(".home_layer").removeClass("whats_under_your_roof-house"+house_offset);
									jQuery(".home_layer").addClass("whats_under_your_roof-house"+(house_offset+1));
							}
							
	
							
							self.addQuestionModel(tag, self.tags[tag]);
							
					}

        } else {
					house_length = self.house_rent.length;
					house_offset = house_length+ 1;
					
					if((house_offset >=1) && (house_offset <=5)){
							self.house_rent.push({"tag" : tag, "ref" : ref});
							jQuery(".rent_layer div[rel="+house_offset+"]").addClass(ref);
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-state", "on");
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-tag", tag);
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-spritereference", ref);
							
							
							if(typeof self.tags[tag] === "undefined"){
									self.tags[tag] = 1;
							}else{
									self.tags[tag] = self.tags[tag] + 1;
							}
					
							if(house_offset != 5){
									jQuery(".rent_layer").removeClass("whats_under_your_roof-rent_"+house_offset);
									jQuery(".rent_layer").addClass("whats_under_your_roof-rent_"+(house_offset+1));
							}
													
							self.addQuestionModel(tag, self.tags[tag]);
							
					}
					
        }
        
        
    },
    handleHouseRoomClick: function(e){
        var self = this;
        var tag = jQuery(e.currentTarget).attr("data-tag");
        var ref = jQuery(e.currentTarget).attr("data-spritereference");
        var rel = jQuery(e.currentTarget).attr("rel");
        

        var house_length,house_offset,house_max,house_current;
        if(self.house_class == ".home_layer") {
					house_length = self.house.length;
					house_offset = house_length;
					house_max = 7;
					house_current = self.house;
				} else {
					house_length = self.house_rent.length;
					house_offset = house_length;
					house_max = 5;
					house_current = self.house_rent;
				}        

        if((house_offset >=1) && (house_offset <=house_max)){
            
            
            house_current.remove(rel-1);
            
            
            jQuery(e.currentTarget).removeClass();
            jQuery(e.currentTarget).addClass("h_"+rel);
            jQuery(e.currentTarget).addClass("block");
            jQuery(e.currentTarget).attr("data-state", "off");
            
            if(typeof self.tags[tag] === "undefined"){
                throw new Error("cannot be undefined");
            }else{
                self.tags[tag] = self.tags[tag] - 1;
            }
        
            if(house_offset != 0){
            	if(self.house_class == ".home_layer") {
								jQuery(".home_layer").removeClass("whats_under_your_roof-house"+(house_offset+1));
								jQuery(".home_layer").addClass("whats_under_your_roof-house"+(house_offset));
							} else {
								jQuery(".rent_layer").removeClass("whats_under_your_roof-rent_"+(house_offset+1));
								jQuery(".rent_layer").addClass("whats_under_your_roof-rent_"+(house_offset));							
							}
            }
            

            jQuery(self.house_class+" div").removeClass();
            jQuery(self.house_class+" div").addClass("block");
            jQuery(self.house_class+" div").attr("data-state", "off");
            
            
            for(var item in house_current){
                if(item != "remove"){
                    

                    jQuery(self.house_class+" div[rel="+(parseInt(item)+1)+"]").addClass(house_current[item].ref);
                    jQuery(self.house_class+" div[rel="+(parseInt(item)+1)+"]").attr("data-tag",house_current[item].tag);
                    jQuery(self.house_class+" div[rel="+(parseInt(item)+1)+"]").attr("data-spritereference", house_current[item].ref);
                    jQuery(self.house_class+" div[rel="+(parseInt(item)+1)+"]").attr("data-state", "on");
                    
                    
                }
                
            }
            
            
            
            self.createDropRegion();

            self.addQuestionModel(tag, self.tags[tag]);
            
        }
    },
    
    addRoom: function (tag, ref) {
    	var self = this;
        AppFacade.turnOnClear = true;
        var house_length,house_offset;
        if(self.house_class == ".home_layer") {
					house_length = self.house.length;
					house_offset = house_length+ 1;        	

					if((house_offset >=1) && (house_offset <=7)){
							self.house.push({"tag" : tag, "ref" : ref});
							jQuery(".home_layer div[rel="+house_offset+"]").addClass(ref);
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-state", "on");
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-tag", tag);
							jQuery(".home_layer div[rel="+house_offset+"]").attr("data-spritereference", ref);
							
							
							if(typeof self.tags[tag] === "undefined"){
									self.tags[tag] = 1;
							}else{
									self.tags[tag] = self.tags[tag] + 1;
							}
						
							self.addQuestionModel(tag, self.tags[tag]);
					
							if(house_offset != 7){
									jQuery(".home_layer").removeClass("whats_under_your_roof-house"+house_offset);
									jQuery(".home_layer").addClass("whats_under_your_roof-house"+(house_offset+1));
							}
					}

				} else {
					house_length = self.house_rent.length;
					house_offset = house_length+ 1;        					

					if((house_offset >=1) && (house_offset <=5)){
							self.house_rent.push({"tag" : tag, "ref" : ref});
							jQuery(".rent_layer div[rel="+house_offset+"]").addClass(ref);
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-state", "on");
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-tag", tag);
							jQuery(".rent_layer div[rel="+house_offset+"]").attr("data-spritereference", ref);
							
							
							if(typeof self.tags[tag] === "undefined"){
									self.tags[tag] = 1;
							}else{
									self.tags[tag] = self.tags[tag] + 1;
							}
					
							self.addQuestionModel(tag, self.tags[tag]);

							if(house_offset != 7){
									jQuery(".rent_layer").removeClass("whats_under_your_roof-rent_"+house_offset);
									jQuery(".rent_layer").addClass("whats_under_your_roof-rent_"+(house_offset+1));
							}
					}

				}   
        
		//need to create the following function: addRoom(name,quantity) where name= "Bathrooms/Car/Moto/HOffice/Bedrooms"
    	//console.log("recieved \""+name+"\", "+quantity+". **need to finish off this function**");
    },
    switchOption: function(tag){ 
		var self=this;
		self.addQuestionModel(tag, 1, "type");
		self.tag=tag;
		jQuery(".garage_layer").removeClass().addClass("garage_layer");
		
		if(tag == "Renter"){
			self.college = false;
			self.house_class = ".rent_layer";
			jQuery(".rent_layer").css("display", "block");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","renter");
			jQuery("#menu").removeClass("college");
			
		}else if (tag == "Owner"){
			self.college = false;
			self.house_class = ".home_layer";
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "block");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","owner");
			jQuery("#menu").removeClass("college");
			
			
		}else if(tag === "Student"){
			self.college = true;
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "block");
			jQuery(".couch_surfing_layer").css("display", "none");
			jQuery(".garage_layer").attr("rel","college");
			jQuery("#menu").addClass("college");
			
			
		}else if(tag === "Csurfer"){
			self.college = true;
			jQuery(".rent_layer").css("display", "none");
			jQuery(".home_layer").css("display", "none");
			jQuery(".college_layer").css("display", "none");
			jQuery(".couch_surfing_layer").css("display", "block");
			jQuery(".garage_layer").attr("rel","college");
			jQuery("#menu").addClass("college");
		}
		
		self.garageCheck();

        jQuery("#options li a").removeClass("whats_under_your_roof-option_on");
		
       // jQuery(e.currentTarget).addClass("whats_under_your_roof-option_on");
	},
    restoreState: function(data) {
		var self = this;
		self.tags = [];
		
		var roomCount = data.house.length;
		if(data.type!="undefined") {
			self.switchOption(data.type);
                        if (data.type == "Student") self.college = true;
                        if (data.type == "Csurfer") self.college = true;
                }
		jQuery("#options li a").each(function(index){
			//console.log(index+" "+this.getAttribute("data-tag"));
			if(this.getAttribute("data-tag")==data.type)
				jQuery(this).addClass("whats_under_your_roof-option_on");
		});
		for( i=0; i < roomCount; i++) {
			self.addRoom(data.house[i].tag, data.house[i].ref);	
		}
		if(data.car!==""){
			self.carvalue=data.car;
			if (self.carvalue == 1)  {
				self.car = true;
			} else {
                            self.car = true;
                            self.car2 = true;
                        }
			self.garageCheck();
			self.addQuestionModel("Car", self.carvalue);
		}
    if(data.scooter!==""){
			self.scootervalue=data.scooter;
			if (self.scootervalue == 1)  {
				self.motorcycle = true;
			}
			self.garageCheck();
			self.addQuestionModel("Moto", self.scootervalue);
		}
		
		
		setTimeout(function(){
            self.createDropRegion();
        }, 20);
	},
	getStateJson: function() {
		var self = this;
		
		var stateJson = {house: [],car:'',scooter:'',type:'',option:''};
                 if (self.tag != "Student" && self.tag != "Csurfer") {
                    var current_house;
                    if(self.house_class == ".home_layer") {
                            current_house = self.house;
                    } else {
                            current_house = self.house_rent;
                    }
                    for(i = 0; i < current_house.length; i ++) {
                            stateJson.house.push({"tag":current_house[i].tag,"ref":current_house[i].ref});
                    }
                 }
		stateJson.type=self.tag;
		//stateJson.option=self.option;
		if(self.carvalue>0)
			stateJson.car=self.carvalue;
		if (self.scootervalue > 0)
                        stateJson.scooter=self.scootervalue;
		return stateJson;
	}
    
});
// Food Question
var WhatsOnYourPlate = View.extend({
    template: jQuery("#whats_on_your_plate"),
    stage2 : {},
    interval: 0,
    interval2: 0,
    events: {
        "click #food_categories li" : "handleFoodCategoryClick"
    },
    appetite: "M",
    fixMozillaSwiffy: function(el) {
			var svg_canvas = jQuery(el).find("svg"),
					h = svg_canvas.attr("style").match(/height:(\d+)/),
					w = svg_canvas.attr("style").match(/width:(\d+)/);
			if(h && h[1]) {
				svg_canvas.css("height",h[1]+"px");
			}
			if(w && w[1]) {
				svg_canvas.css("width",w[1]+"px");
			}    
    },
    initialize: function(obj) {
        var self = this;
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        AppFacade.showPrompts = true;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
		if(jQuery.browser.msie || jQuery.browser.opera){
			self.blackbrowsers = true;
		}
		
		if(jQuery.browser.mozilla){
			self.blackbrowsers = true;
			jQuery("html").addClass("mozilla");
		}
		

		if (!self.blackbrowsers) {

			var loader = ["/static/js/libs/jquery.path.js",  
	                 "/static/js/libs/jquery.easing.1.3.js",
	                 "order!/static/js/libs/raphael-min.js",
	                 "order!/static/js/libs/g.raphael-min.js",
	                 "order!/static/js/libs/g.pie-min.js", 
	                 "/static/js/libs/jquery.tinycircleslider.custom.js",
	                 "/static/js/libs/swiffy.js",
	                 "/static/js/json.models/whats_on_your_plat/fruits.js",
	                 "/static/js/json.models/whats_on_your_plat/fish.js",
	                 "/static/js/json.models/whats_on_your_plat/meat.js",
	                 "/static/js/json.models/whats_on_your_plat/dairy.js",
	                 "/static/js/json.models/whats_on_your_plat/grains.js",
	                 "/static/js/json.models/whats_on_your_plat/bird.js",
	                 "/static/js/json.models/whats_on_your_plat/bear.js",	                 
	                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"];
		}else{
			var loader = [		 "/static/js/libs/jquery.path.js",  
	                 "/static/js/libs/jquery.easing.1.3.js",
	                 "order!/static/js/libs/raphael-min.js",
	                 "order!/static/js/libs/g.raphael-min.js",
	                 "order!/static/js/libs/g.pie-min.js",
	                 "/js/jquery.ifixpng.js",
	                 "/static/js/libs/transform.js",
	                 "/static/js/libs/jquery.tinycircleslider.custom.js",
	                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"];
		}

        require(loader, function() {
         
            self.render(self.animationComplete, self);

			// jQuery("#overlay").css("display", "none");
			//            	jQuery("body").addClass("overlay_on");
			//            	jQuery("#overlay").fadeIn(500);
			// 
			// jQuery("body").addClass("overlay_on");
			//            	jQuery("#overlay").fadeIn(500);
			// 		    jQuery("#go_deeper_bs").css("display","block");
		
			/*jQuery("#go_deeper_ok").click(function(){
			
	           	jQuery("body").removeClass("overlay_on");
	           	jQuery("#overlay").fadeOut(500);
			    //jQuery("#go_deeper_bs").css("display","none");
			    jQuery("#go_deeper_bs").hide();
				self.fineTuneToggle();
			});*/
			
			/*jQuery("#go_deeper_bs").toggle();
			
			jQuery("#go_deeper_bs").toggle(function(e){
				jQuery("#go_deeper_bs").css("display","none");
				jQuery("body").removeClass("overlay_on");
	           	jQuery("#overlay").fadeOut(500);
	           	self.fineTuneToggle();
			}, function() {
				jQuery("#go_deeper_bs").css("display","block");
			})*/
			
			
			// method one
			if (!self.blackbrowsers) {
	            self.stage = new swiffy.Stage(document.getElementById("fruit_canvas"), AppFacade.whats_on_your_plate_fruit);
	            self.stage.start();
	            self.stage.stop();
	            if($.browser.mozilla) {
	            	self.fixMozillaSwiffy(jQuery("#fruit_canvas"));
	            }
			} else {
			// end method 
    					if((jQuery.browser.msie && jQuery.browser.version < 9)) {
    						$("#food_illustration div.whats_on_your_plate-arrow").css("backgroundImage","url(/static/css/img/food/arrow.gif)");
	    					$("#food_illustration div.whats_on_your_plate-plate").css("backgroundColor","#F7F7EF");
    						$("#food_illustration").find("#slider,#bird,#bear").css("backgroundColor","#F7F7EF");
    						$("#food_illustration div.image").css("backgroundColor","#F7F7EF");
    						$.ifixpng('/img/home/pixel.gif');
    						$("#whats_on_your_plate_content a.ui-slider-handle").ifixpng();
    					}
    					
      }
            self.createMainPies();

			
			
        });
        
        //POST default values to backend for fine-tuning.
       	self.addQuestionModel("vegetables", 1, "vegetables");
    	self.addQuestionModel("seafood", 1, "seafood");
    	self.addQuestionModel("dairy", 1, "dairy");
    	self.addQuestionModel("meat", 1, "meat");
    	self.addQuestionModel("grains", 1, "grains");
    	self.addQuestionModel("beverages", 1, "beverages");
    	
    	AppFacade.clearbool = 1;
		
		jQuery('.dialogue_text_container h2').text("Get detailed.");
		jQuery('#fine_tuning_dialogue_text').text("Remember, we made some assumptions about your diet. Coffee? Tea?");
    },
    userModelReady: function(userModel) {
    
    },
    animationComplete: function(){
        var self = this;
        self.pieGraphSmallSetup();
        jQuery("#food_categories li").addClass("ready");

        var pos = jQuery("#food_categories li:eq(0)").position();
        
        jQuery("#list_background").fadeIn(200);
        jQuery("#list_background").animate({top:pos.top, left: pos.left}, 1000, "easeOutSine", function(){
            jQuery("#food_categories li:eq(0)").removeClass("ready");
            
        });
        

    },
    percents: [20,20,20,20,20],
    previous_percents: [20,20,20,20,20],
    createMainPies: function(){
    	var isiPad = navigator.userAgent.match(/iPad/i) != null;
       
        var self = this;
        var sliders = jQuery("#food_illustration .slider");
       
       	jQuery("#slider_scope a").unbind("mousedown").unbind("mouseup").mousedown(function(){
					//method Three
					if (!self.blackbrowsers) {
								self.stage.start();
								self.interval = window.varianceInterval;
								self.stage2.start();
								self.interval2 = window.varianceInterval;
								self.playing = true;			
					}
					//end method
				}).mouseup(function(){
					if (!self.blackbrowsers) {
						window.varianceInterval = self.interval;
						self.stage.stop();
						window.varianceInterval = self.interval2;
						self.stage2.stop();
					}				
				});
       
        for(var i=0; i<sliders.length;i++){
            var el = jQuery(sliders[i]);
            var id = el.attr("id").toString();
            var color = "blue"; // el.attr("data-color").toString();
            var amt = self.percents[i];
            var diff = 100 - amt;
            var piechartid = jQuery(el).find(".piechart").attr("id");
            var colorCount = jQuery("#colorCount"+i);
            var arrow = jQuery(el).find("div.whats_on_your_plate-arrow");
            
            jQuery(el).unbind("mousedown");
            jQuery(el).unbind("mouseup");
            jQuery("body").unbind("mouseup");
         
            
            jQuery(el).mousedown(function(){
				//method Three
				if (!self.blackbrowsers) {
	                self.stage.start();
	                self.interval = window.varianceInterval;
	                self.playing = true;
                }
                //end method
            });
            
            jQuery("body").mouseup(function(){
                var total = 0;
                for(var i=0; i<self.percents.length;i++){
                    total = total + self.percents[i];
                }
                
                var remainder = 0
                for(var i=0; i<self.percents.length;i++){
                    var node = self.percents[i];
                    ////console.log("body mouseup index "+i+" node "+node+" total "+total);
                    var percent = Math.round((node/total)*100+remainder);
                    ////console.log("body mouseup index "+i+" percent "+percent+" remainder "+remainder);
                    remainder = (node/total)*100 + remainder - percent;
                    ////console.log("remainder body mouseup index "+i+" "+remainder);
                    if(Math.abs(remainder) >= 1) {
                    	percent += parseInt(remainder);
                    	remainder = remainder - parseInt(remainder);
                    }
                    self.percents[i] = percent;
                    self.previous_percents[i] = self.percents[i];
                    ////console.log("set body mouseup index "+i+" to "+self.percents[i]);
                }
                
                self.pieGraphSmallSetup();
                if (!self.blackbrowsers) {
									window.varianceInterval = self.interval;
									self.stage.stop();
									if(self.stage2 && self.stage2.stop) {
										window.varianceInterval = self.interval2;
										self.stage2.stop();
									}
								}
            });
            
            /*
            jQuery(el).mouseup(function(e){
                //self.createMainPies();
                var total = 0;
                for(var i=0; i<self.percents.length;i++){
                    total = total + self.percents[i];
                }
                
                var remainder = 0
                for(var i=0; i<self.percents.length;i++){
                    var node = self.percents[i];
                    var percent = Math.round((node/total)*100);
                    remainder += (node/total)*100 - percent;
                    if(Math.abs(remainder) > 1) {
                    	percent += parseInt(remainder);
                    	remainder = remainder - parseInt(remainder);
                    }
                    self.percents[i] = percent;
                    self.previous_percents[i] = self.percents[i];
                    //console.log("set slider mouseup index "+i+" to "+self.percents[i]);
                }
                
				
								var _id = jQuery(this).attr("data-id");

                self.pieGraphSmallSetup(undefined, _id);
                // method four
                if (!self.blackbrowsers) {
                	self.stage.stop();
				}
				//end method
            });*/
            
            
	            var ts = jQuery(el).tinycircleslider({'interval': false, 
	            snapcount: 0, 
	            'snaptodots': false, 
	            hidedots:false, 
	            radius: 55, 
	            callback: function(percentage,deg,pieid,arrayid){
	                    var not_zero_plates = 0,
	                    		force_all_perc = false;
	                    jQuery.each(self.previous_percents,function(i,value){
	                    	if(value != 0 && i != arrayid) {
	                    		not_zero_plates++;
	                    	}
	                    });
	                    ////console.log("not_zero_plates "+not_zero_plates);
	                    //if everything is zero we have to change all plates
	                    if(not_zero_plates == 0) {
	                    	not_zero_plates = 4;
	                    	force_all_perc = true;
	                    }
	                    
	                    if(percentage > self.percents[arrayid]){
	                        var offset = (percentage - self.percents[arrayid]) / not_zero_plates;
			                    ////console.log("offset "+offset);
	                        if((self.percents[arrayid] >= 0) && (self.percents[arrayid] <= 100)){
	                            for(var j =0;j<self.percents.length;j++){
	                                if(j != arrayid){
	                                    if(self.previous_percents[j]==0 && !force_all_perc) {
	                                    	continue;
	                                    }
	                                    if((self.percents[j] - offset) > 0){
	                                        self.percents[j] = self.percents[j] - offset;
	                                    }else{
	                                        
	                                        self.percents[j] = 0;
	                                    }
	                                    
	
	                                }else{
	                                    
	                                    if(percentage > 0){
	                                        self.percents[arrayid] = percentage;
	                                    }else{
	                                        self.percents[arrayid] = 0;
	                                    }
	                                    
	
	                                }
	                            }
	                    }
	
	                    }else{
	                    		var offset = (self.percents[arrayid] - percentage) / not_zero_plates;
			                    ////console.log("offset "+offset);
	                       	if((self.percents[arrayid] >= 0) && (self.percents[arrayid] <= 100)){
	                            for(var j =0;j<self.percents.length;j++){
                                        if(self.previous_percents[j]==0  && !force_all_perc) {
                                                continue;
                                        }
	                                if(j != arrayid){
	                                    self.percents[j] = self.percents[j] + offset;
	                                }else{
	                                    
	                                    
	                                    
	                                    
	                                    if(percentage > 0){
	                                        self.percents[arrayid] = percentage;
	                                    }else{
	                                        self.percents[arrayid] = 0;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                
	                //self.previousMainPercentage = percentage;
	                var a_percent = 100 - percentage;
	                //self.createPieGraph(pieid, "blue", 60, 60, 52, [a_percent,percentage]);
	                
                                    AppFacade.closeFineTuning();
					
	                self.pieGraphSmallSetup(arrayid);
	                self.calculateSurveyTags();
	                
	            }, 
	            piediv: "#"+piechartid,
	            pieid: piechartid,
	            arrayid: i, 
	            countdiv: colorCount, 
	            arrowdiv: arrow});
	            if((amt > 0) && (amt < 100))
	            {
	                //self.createPieGraph(piechartid, "blue", 60, 60, 52, [diff,amt]);
	    						//fix a IE8 bug, we have to switch visibility in order to draw this element correctly
	    						//draw when the element is visible, than hide and reshow if it was originnaly visible
	    						var invisible = jQuery.browser.msie &&  jQuery.browser.version < 9;
	    						var display = el.css("display");
	    						el.show();
	                ts.setSliderDegrees(360*amt/100);
									el.hide(); 
									el.css("display",display);
	            }

            
        }
        
        
    },
    calculateSurveyTags: function(){
        var self = this;
        for(var i=0; i<self.percents.length; i++){
            switch(i){
                case 0:
                    // Veggies
                    var qty = self.calculateQty(self.percents[i]);
                    ////console.log(qty);
                    self.addQuestionModel("vegetables", qty, "vegetables");
                    //console.log(qty+ " "+self.percents[i]);
                    break;
                case 1:
                    // Fish
                    var qty = self.calculateQty(self.percents[i]);
                    self.addQuestionModel("seafood", qty, "seafood");
                    //console.log(qty+ " "+self.percents[i]);
                    break;
                case 2:
                    // Dairy
                    var qty = self.calculateQty(self.percents[i]);
                    self.addQuestionModel("dairy", qty, "dairy");
                   // console.log(qty+ " "+self.percents[i]);
                    break;
                case 3:
                    // Meat
                    var qty = self.calculateQty(self.percents[i]);
                    self.addQuestionModel("meat", qty, "meat");
                    //console.log(qty+ " "+self.percents[i]);
                    break;
                case 4:
                    //Grains
                    var qty = self.calculateQty(self.percents[i]);
                    self.addQuestionModel("grains", qty, "grains");
                    //console.log(qty+ " "+self.percents[i]);
                    break;    
            }
        }
    },
    calculateQty: function(amount){
        var self = this;
        /*if(amount < 10){
            if((self.appetite == "M") || (self.appetite == "S")){
                return 0;
            }else if((self.appetite == "L") || (self.appetite == "XL")){
                return 0;
            }else if (self.appetite == "XXL"){
                return 1;
            } else{
                return 0;
            }*/
            
            var qty = 0;
            
            if(amount == 0)
            {
                qty = 0;
            }
            else if(amount <= 20)
            {
                qty = 1;
            }
            else if(amount <= 30)
            {
                qty = 2;
            }
            else if(amount <= 40)
            {
                qty = 3;
            }
            else if(amount <= 49)
            {
                qty = 4;
            }
            else
            {
                qty = 5;
            }
            if (qty > 0) {
                if(self.appetite == "XS")
                {
                    qty -= 2;
                }
                else if(self.appetite == "S")
                {
                    qty -= 1;
                }
                else if(self.appetite == "L")
                {
                    qty += 1;
                }
                else if(self.appetite == "XL")
                {
                    qty += 2;
                }
                else if(self.appetite == "XXL")
                {
                    qty += 3;
                }
            }
            
            if(qty < 0)
            {
                qty = 0;
            }
            
            if(qty > 5)
            {
                qty = 5;
            }
            
            if(qty == 0 && amount > 0)
            {
                qty = 1;
            }
            
            return qty;
            
        /*}
        else if((amount <= 33) && (amount > 10)){
            
            if((self.appetite == "M") || (self.appetite == "S")){
                return 1;
            }else if((self.appetite == "L") || (self.appetite == "XL")){
                return 2;
            }else if (self.appetite == "XXL"){
                return 3;
            } else{
                return 0;
            }
            
        }else if((amount <= 66) && (amount > 33)){
            
            if((self.appetite == "M") || (self.appetite == "S")){
                return 2;
            }else if((self.appetite == "L") || (self.appetite == "XL")){
                return 3;
            }else if (self.appetite == "XXL"){
                return 4;
            } else{
                return 1;
            }
            
            
            
        }else if((amount <= 99) && (amount > 66)){
            if((self.appetite == "M") || (self.appetite == "S")){
                return 3;
            }else if((self.appetite == "L") || (self.appetite == "XL")){
                return 4;
            }else if (self.appetite == "XXL"){
                return 5;
            } else{
                return 2;
            }
        }   */
        
    },
    getAppetite : function () {
    	var self = this;
    	if (self.appetite == "XXL") return 95;
    	if (self.appetite == "XL") return 40;
    	if (self.appetite == "L") return 75;
    	if (self.appetite == "M") return 55;
    	if (self.appetite == "S") return 45;  
    	if (self.appetite == "XS") return 20; 
    },
    handleFoodCategoryClick: function(e){
        var self = this;
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        var pos = jQuery(e.currentTarget).position();
        var active = jQuery(e.currentTarget).attr("data-illustration");
        var canvas = jQuery(e.currentTarget).attr("data-canvas");
    
    	
        if(jQuery.browser.msie && jQuery.browser.version < 8) {
            jQuery("#food_illustration li").removeClass("active");
        }

        jQuery("#food_illustration").fadeOut(400, function(){
            jQuery("#food_illustration li").removeClass("active");
            jQuery("#food_illustration #"+active).addClass("active");
        });

        jQuery("#food_categories li").addClass("ready");
        jQuery("#list_background").animate({top:pos.top, left: pos.left}, 500, "easeOutSine", function(){
            
                jQuery(e.currentTarget).removeClass("ready");
                
				if (!self.blackbrowsers) {
				jQuery(".image").empty();
				}

                jQuery(".image").removeClass("noImage");
                
            
            if(active != "food_portions_illustration"){
                jQuery(".slider").css({"display": "none"});
                var timeout = setTimeout(function(){
                    jQuery(".slider").fadeIn(500);
                    jQuery(".image").addClass("noImage");
                }, 1000);



				// Method two
                if (!self.blackbrowsers) {
                  self.stage = new swiffy.Stage(document.getElementById(canvas+"_canvas"), AppFacade["whats_on_your_plate_"+canvas]);
	                self.stage.start();
	                self.stage.stop();
                        if($.browser.mozilla) {
                                self.fixMozillaSwiffy(jQuery("#"+canvas+"_canvas"));
                        }	                
                }
				// end method

            }else{
                jQuery( "#slider_scope" ).slider({
                    orientation: "vertical",
                    range: "max",
                    max: 100,
                    min: 20,
                    value: self.getAppetite(),
                    slide: function( event, ui ) {
                    	
                    	jQuery("#slider_instructions").fadeOut();
                    	
                        if(ui.value <= 30){
                            self.appetite = "XS";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                        if((ui.value <= 50) && (ui.value >= 31)){
                            self.appetite = "S";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                        if((ui.value <= 60) && (ui.value >= 51)){
                            self.appetite = "M";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                        if((ui.value <= 70) && (ui.value >= 61)){
                            self.appetite = "L";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                        if((ui.value <= 80) && (ui.value >= 71)){
                            self.appetite = "XL";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                        if((ui.value <= 100) && (ui.value >= 91)){
                            self.appetite = "XXL";
                            jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
                            self.calculateSurveyTags();
                        }
                        
                    }
                });
                jQuery("#slider_scope").find(".ui-slider-handle").addClass("whats_on_your_plate-slider_cursor");
								jQuery("#slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");
                jQuery("#slider_scope").find(".ui-slider-handle").css("marginLeft", "-44px");
                if((jQuery.browser.msie && jQuery.browser.version < 9)) {
                            var handle = $("#whats_on_your_plate_content a.ui-slider-handle").ifixpng();
                            handle.attr("style",handle.attr("style").replace(/(background-image\s*:\s*none)/i,"$1!important"));
                            if(jQuery.browser.version < 8) {
                                    $("#bird").css("top","25px");
                            }
                    }

                
                
				// Method two
                if (!self.blackbrowsers) {
                	canvas = canvas.split(",");
									
                  self.stage = new swiffy.Stage(document.getElementById(canvas[0]+"_canvas"), AppFacade["whats_on_your_plate_"+canvas[0]]);
	                self.stage.start();
	                self.stage.stop();
                        if($.browser.mozilla) {
                                self.fixMozillaSwiffy(jQuery("#"+canvas[0]+"_canvas"));
                        }	                
	                
	                if(canvas.length == 2) {
                                self.stage2 = new swiffy.Stage(document.getElementById(canvas[1]+"_canvas"), AppFacade["whats_on_your_plate_"+canvas[1]]);
                                self.stage2.start();
                                self.stage2.stop();	                
                                if($.browser.mozilla) {
                                        self.fixMozillaSwiffy(jQuery("#"+canvas[1]+"_canvas"));
                                }	                
	                }
                }
                
            }
                
            jQuery("#food_illustration").fadeIn(200, function(){
                self.createMainPies();
            });
            
        });
       // if (isiPad) {	
	     	//	var el = jQuery('#'+active);
	    // } 
        
    },
	checks_Percent: {},
    pieGraphSmallSetup: function(arrayid, check){
        var self = this;
        var pieGraphIDs = jQuery(".paper");
        for(var i=0; i<pieGraphIDs.length;i++){
            var el = jQuery(pieGraphIDs[i]);
            var id = el.attr("id").toString();
            
            if(typeof arrayid === "undefined"){
                				
				//if(self.percents[i] == 1){
				//	var amount = 0;
				//}else{
					var amount = self.percents[i];
				//}

                jQuery("#colorCount"+i).text(amount+"%");
            }
            
            var color = el.attr("data-color").toString();
			if(i == check){
				if(self.percents[i] == 0){
					self.checks_Percent["hold"+i] = i;
				}else{
					delete self.checks_Percent["hold"+i];
				}
				

				
			}
			
			for(var item in self.checks_Percent){
				
				jQuery("#colorCount"+self.checks_Percent[item]).text("0%");
				
			}
			
			
			if(check){
				

				
			}

			
			
			

			
			
			var amt = self.percents[i];
            var diff = 100 - amt;
            if((amt >= 0) && (amt < 100)){

                
                if(typeof arrayid === "number"){
                    if(arrayid == i){
                        self.createPieGraph(id, color, 29, 31, 28, [diff,amt]);
                    }
                }else{
                    self.createPieGraph(id, color, 29, 31, 28, [diff,amt]);
                }

                
            }
            
        }


    },
    createPieGraph: function(id, color, dimx, dimy, radius, startArray){
        var self = this;
        
        if(color === "blue"){
            var color = "#6CD2E0";
        }else{
            var color = "#FF837A"
        }        
        if(typeof self.pieCharts === "undefined"){
            self.pieCharts = {};
        }
        self.pieCharts[id] = {"paper": Raphael(id)};
        var p = self.pieCharts[id].paper.g.piechart(dimx, dimy, radius, startArray).attr({"fill":color,"stroke-width": 0, "opacity": 0});
        p.each(function(){
            if(this.sector.value.order == 1){
                this.sector.attr({"fill":color, "opacity": 0.65});
                activeSector=this.sector;                
            }    
        });
    },
	
    restoreSliders: function (quantity, index) {
		//console.log("recieved \""+name+"\", "+quantity+". **need to finish off this function**");
	var self = this;
		//self.percents = self.previous_percents = [35, 10, 25, 15, 15];
        self.percents[index] = quantity;
        self.previous_percents[index] = quantity;
        self.pieGraphSmallSetup(index);
		// TODO: position sliders
    },
    
    restoreState: function(data) {
    	var self = this;	
		var foodsCount = data.food.length;
		
		for( i=0; i < (foodsCount-1); i++) {
			self.restoreSliders(data.food[i].percent, i);	
		}
		self.appetite = data.food[foodsCount-1].appetite;
		self.pieGraphSmallSetup();
		jQuery("#food_portions_list .food_menu_text h2").text(self.appetite);
       // self.calculateSurveyTags();
		//console.log( self.getAppetite());
		//jQuery( "#slider_scope" ).slider({ value: self.getAppetite() });
	},
	getStateJson: function() {
		var self = this;
		var stateJson = {food: []};
		for(i = 0; i < self.percents.length; i ++) {
			stateJson.food.push({percent: self.percents[i]});
		}
		stateJson.food.push({appetite: self.appetite});
		
		return stateJson;
	}
});

var MedicineCabinet = View.extend({
    template: jQuery("#medicine_cabinet"),
    events: {
        "click #shelves .shelve_item": "clickItem",
        "click #shelves .shelve_item_small": "clickItem",
        "keyup #medicine_cabinet_content input[type=text]" : "handleInputChangeEvent",
        "change #medicine_cabinet_content input[type=radio]" : "handleInputChangeEvent",
        "submit #medicine_cabinet_content form" : "submitQuestion"
    },
    initialize: function(obj) {
    		AppFacade.clearbool = 1;
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.admin();
        AppFacade.fetchUser();
    },
    rendered: false,
    userModelReady: function(userModel) {
      var self = this;      
      if(self.rendered) {
      	return;
      } else {
      	self.rendered = true;
      }
      require([
				 
				 "/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js"
				 // "/static/js/libs/swiffy.js",
				 // "/static/js/json.models/medicine_cabinet/aspirin.js",
				 // "/static/js/json.models/medicine_cabinet/aspirin_off.js"
				
			], function() {
        self.render();

				if(!userModel || userModel.attributes.gender == "female"){
					self.addQuestionModel("lip_gloss", 1, "lip_gloss");
					self.addQuestionModel("mascara", 1, "mascara");
					self.addQuestionModel("concealor", 1, "concealor");
					self.addQuestionModel("foundation", 1, "foundation");
					self.addQuestionModel("blush", 1, "blush");
					self.addQuestionModel("eye_pencil", 1, "eye_pencil");
					self.addQuestionModel("lip_stick", 1, "lip_stick");
					self.addQuestionModel("blush", 1, "blush");
                    self.addQuestionModel("womens_fragrance", 1, "womens_fragrance");
																		
					self.addQuestionModel("nail_polish_remover", 1, "nail_polish_remover");
			        
					jQuery("#main").removeClass("male");

				}else{
					jQuery("#main").addClass("male");
					jQuery("span.male_off").each(function() {
						self.states[this.id] = false;
						jQuery(this).removeClass("medicine_cabinet-"+this.id).addClass("medicine_cabinet_off-"+this.id);
					});
					
					self.addQuestionModel("shaving_cream", 1, "shaving_cream");
					self.addQuestionModel("sunscreen", 1, "sunscreen");
					self.addQuestionModel("moisturizer", 1, "moisturizer");
					self.addQuestionModel("dental_floss", 1, "dental_floss");
					self.addQuestionModel("mouthwash", 1, "mouthwash");
					self.addQuestionModel("toothpaste", 1, "toothpaste");
					self.addQuestionModel("toothbrush", 1, "toothbrush");
					
					self.addQuestionModel("hand_sanitizer", 1, "hand_sanitizer");
				}
				self.addQuestionModel("fair_trade", 1, "fair_trade");
				self.addQuestionModel("soap", 1, "soap");
				self.addQuestionModel("conditioner", 1, "conditioner");
				self.addQuestionModel("body_wash", 1, "body_wash");
				self.addQuestionModel("hairbrush", 1, "hairbrush");
				self.addQuestionModel("aspirin", 1, "aspirin");
				
				self.addQuestionModel("contact_lenses", 1, "contact_lenses");
				//self.addQuestionModel("womens_fragrance", 1, "womens_fragrance");
				self.addQuestionModel("deodorant", 1, "deodorant");
				
				//self["aspirin"] = new swiffy.Stage(document.getElementById("aspirin"), AppFacade["aspirin_canvas"]);
				//self["aspirin"].start();
				//self["aspirin"].stop();
				//self.states["aspirin"] = true;
      });
    
    },
    states: {},
    clickItem: function(r, id) {
        var self = this;
        
        var item = r ? r.currentTarget.getAttribute('id') : id; 
        
		if(typeof self.states[item] === "undefined"){
			self.states[item] = false;
			jQuery("#" + item).removeClass("medicine_cabinet-"+item);
			jQuery("#" + item).addClass("medicine_cabinet_off-"+item);
			self.addQuestionModel(item, 0, item);
		}else if(self.states[item] == false){
			self.states[item] = true;
			jQuery("#" + item).removeClass("medicine_cabinet_off-"+item);
			jQuery("#" + item).addClass("medicine_cabinet-"+item);
			self.addQuestionModel(item, 1, item);
		}else{
			self.states[item] = false;
			jQuery("#" + item).removeClass("medicine_cabinet-"+item);
			jQuery("#" + item).addClass("medicine_cabinet_off-"+item);
			self.addQuestionModel(item, 0, item);
		}
	


        //jQuery("#" + item).removeClass("shelve_item");
        
        
    },
    
    restoreItem: function(item, value) {
        var self = this;
		//console.log(value);
		
		if (value != 0) {
			if(self.states[item] == false){
				//console.log("on");
				self.states[item] = true;
				jQuery("#" + item).removeClass("medicine_cabinet_off-"+item);
				jQuery("#" + item).addClass("medicine_cabinet-"+item);
				self.addQuestionModel(item, 1, item);
			}
		} else {
			//console.log("off");
			self.states[item] = false;
			jQuery("#" + item).removeClass("medicine_cabinet-"+item);
			jQuery("#" + item).addClass("medicine_cabinet_off-"+item);
			self.addQuestionModel(item, 0, item);
		}
        
    },
	
	selectItem: function (name, value) {
		var self = this;
		self.restoreItem(name, value);
    },
    
    restoreState: function(data) {
    	var self = this;	
		var itemsCount = data.medicine.length;
		
		for( i=0; i < itemsCount; i++) {
			//console.log(data.medicine[i].label, data.medicine[i].value);
			self.selectItem(data.medicine[i].label, data.medicine[i].value);	
		}
	},
	getStateJson: function() {
		var self = this;
		var stateJson = {medicine: []};
		for (label in self.states){
			stateJson.medicine.push({"label":label,"value": self.states[label]});
		}
		
		return stateJson;
	}
});


var Jewellery = View.extend({
    template: jQuery("#jewellery"),
    events: {
        "keyup #jewellery_content input[type=text]" : "handleInputChangeEvent",
        "change #jewellery_content input[type=radio]" : "handleInputChangeEvent",
        "submit #jewellery_content form" : "submitQuestion"
    },
	scores: {},
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.admin();
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
				 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"], function() {
            self.render(self.fine, self);
            
        });
        
        AppFacade.changeNextButton();
		AppFacade.passThrough = true;
		
		AppFacade.clearbool = 1;
		
		self.addQuestionModel("gold", 0, 0);
		self.addQuestionModel("precious_stones", 0, 0);
		self.addQuestionModel("silver", 0, 0);
		self.addQuestionModel("platinum", 0, 0);
		self.addQuestionModel("diamond", 0, 0);
		
		//Get gender - checking appfacade.gender, otherwise cookie, otherwise default male.
		if (jQuery.cookie('gender') == null && typeof(AppFacade.gender) === "undefined") {
			self.gender = "male";
		} else if (jQuery.cookie('gender') == null && typeof(AppFacade.gender) != "undefined") {
			self.gender = AppFacade.gender;
		} else {
			self.gender = jQuery.cookie('gender');
		}
    },
    userModelReady: function(userModel) {
    
    },
	fine: function(){
		var self = this;
		jQuery( "#diamonds_slider_scope" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: 5,
			slide: function( event, ui ) {
				var value = ui.value;
				var amt = (152 * (value/100));
				jQuery("#diamonds_slider_scope_progress").css("width", amt + "px");
				self.checkScore(value, "diamonds");
				AppFacade.closeFineTuning();
		}});
	    jQuery("#diamonds_slider_scope").find(".ui-slider-handle").addClass("jewelry-slider_button");
        jQuery("#diamonds_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");

		jQuery( "#precious_slider_scope" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: 5,
			slide: function( event, ui ) {
				var value = ui.value;
				var amt = (152 * (value/100));
				jQuery("#precious_slider_scope_progress").css("width", amt + "px");
				self.checkScore(value, "precious");
				AppFacade.closeFineTuning();
		}});
	    jQuery("#precious_slider_scope").find(".ui-slider-handle").addClass("jewelry-slider_button");
        jQuery("#precious_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");

		jQuery( "#gold_slider_scope" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: 5,
			slide: function( event, ui ) {
				var value = ui.value;
				var amt = (152 * (value/100));
				jQuery("#gold_slider_scope_progress").css("width", amt + "px");
				self.checkScore(value, "gold");
				AppFacade.closeFineTuning();
		}});
	    jQuery("#gold_slider_scope").find(".ui-slider-handle").addClass("jewelry-slider_button");
        jQuery("#gold_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");


		jQuery( "#silver_slider_scope" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: 5,
			slide: function( event, ui ) {
				var value = ui.value;
				var amt = (152 * (value/100));
				jQuery("#silver_slider_scope_progress").css("width", amt + "px");
				self.checkScore(value, "silver");
				AppFacade.closeFineTuning();
		}});
	    jQuery("#silver_slider_scope").find(".ui-slider-handle").addClass("jewelry-slider_button");
        jQuery("#silver_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");

		jQuery( "#platinum_slider_scope" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: 5,
			slide: function( event, ui ) {
				var value = ui.value;
				
				var amt = (152 * (value/100));
				jQuery("#platinum_slider_scope_progress").css("width", amt + "px");
				self.checkScore(value, "platinum");
				AppFacade.closeFineTuning();
		}});
	    jQuery("#platinum_slider_scope").find(".ui-slider-handle").addClass("jewelry-slider_button");
        jQuery("#platinum_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");
		
	},
	checkScore: function(val, ref){
		var self = this;
		
		
		if((val >= 0) && (val <=3  )){
			self.scores[ref] = 0;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 4) && (val <=7 )){
			self.scores[ref] = 1;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 8) && (val <=11 )){
			self.scores[ref] = 2;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 12) && (val <=15 )){
			self.scores[ref] = 3;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 16) && (val <=19 )){
			self.scores[ref] = 4;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 20) && (val <=23 )){
			self.scores[ref] = 5;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 24) && (val <=27 )){
			self.scores[ref] = 6;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 28) && (val <=31 )){
			self.scores[ref] = 7;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 32) && (val <=35 )){
			self.scores[ref] = 8;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 36) && (val <=39 )){
			self.scores[ref] = 9;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 40) && (val <=43 )){
			self.scores[ref] = 10;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 44) && (val <=47 )){
			self.scores[ref] = 11;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 48) && (val <=51 )){
			self.scores[ref] = 12;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 52) && (val <=55 )){
			self.scores[ref] = 13;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 56) && (val <=59 )){
			self.scores[ref] = 14;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 60) && (val <=70 )){
			self.scores[ref] = 20;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		
		if((val >= 71) && (val <=80 )){
			self.scores[ref] = 30;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 81) && (val <=90 )){
			self.scores[ref] = 40;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		if((val >= 91) && (val <=100 )){
			self.scores[ref] = 50;
			jQuery("#"+ref+"_box").text(self.scores[ref]);
		}
		
		self.showItems(self.scores[ref], ref);
		
		if(ref == "diamonds"){
			var tag = "diamond";
		}
		
		if(ref == "precious"){
			var tag = "precious_stones";
		}
		
		if(ref == "gold"){
			var tag = "gold";
		}
		
		if(ref == "silver"){
			var tag = "silver";
		}
		
		if(ref == "platinum"){
			var tag = "platinum";
		}		
		
        //console.log("saving " + tag + " = " + self.scores[ref]);
		self.addQuestionModel(tag, self.scores[ref], ref);
		
	},
	getIdScore: function(ref,total) {
		return Math.round(Math.min(ref,10)*total/10);		
	},
	showItems: function(amt, ref){
		var self = this,
				total = jQuery("#jewelry_right ."+ref).css("display", "none");
		if(amt != 0){
			for(var i=1, score = self.getIdScore(amt,total.length); i<=score; i++){
				jQuery("#"+ref+"_f"+i).css("display", "block");
			}
		}

	},
	assignScore: function (name, quantity) {
		var self = this;
		
		self.scores[name] = quantity;
		self.showItems(self.scores[name], name);
		
		jQuery("#"+name+"_box").text(self.scores[name]);
		if(name == "diamonds"){
			var tag = "diamond";
		}
		
		if(name == "precious"){
			var tag = "precious_stones";
		}
		
		if(name == "gold"){
			var tag = "gold";
		}
		
		if(name == "silver"){
			var tag = "silver";
		}
		
		if(name == "platinum"){
			var tag = "platinum";
		}		
		        
		self.addQuestionModel(tag, self.scores[name], name);
		
	},
	restoreSliders: function (name, quantity) {
		var self = this;
		
		self.assignScore(name,quantity);

		if(quantity<14){
		
			var amt = (152 * (((quantity*4)+2)/100));
			jQuery("#"+name+"_slider_scope_progress").css("width", amt + "px");
			jQuery("#"+name+"_slider_scope").find(".ui-slider-handle").css("left", (amt-10)+"px");

		}else if(quantity==20){

			var amt = (152 * (65/100));

			jQuery("#"+name+"_slider_scope_progress").css("width", amt + "px");
			jQuery("#"+name+"_slider_scope").find(".ui-slider-handle").css("left", (amt-10)+"px");

		}else if(quantity==30){

			var amt = (152 * (75/100));
			jQuery("#"+name+"_slider_scope_progress").css("width", amt + "px");
			jQuery("#"+name+"_slider_scope").find(".ui-slider-handle").css("left", (amt-10)+"px");

		}else if(quantity==40){

			var amt = (152 * (85/100));
			jQuery("#"+name+"_slider_scope_progress").css("width", amt + "px");
			jQuery("#"+name+"_slider_scope").find(".ui-slider-handle").css("left",(amt-10)+"px");

		}else if(quantity==50){

			var amt = (152 * (95/100));
			jQuery("#"+name+"_slider_scope_progress").css("width", amt + "px");
			jQuery("#"+name+"_slider_scope").find(".ui-slider-handle").css("left", "100%");

		}

		
		
		//console.log("recieved \""+name+"\", "+quantity+".");
		//console.log(jQuery("#"+name+"_slider_scope").find(".ui-slider-handle"));
		

		
    },
    
    restoreState: function(data) {
    	var self = this;	
			if (typeof(data.jewellery) != "undefined") {
				for( var i = 0, jewelleryCount = data.jewellery.length; i < jewelleryCount; i++) {
					self.restoreSliders(data.jewellery[i].value, data.jewellery[i].quantity);	
				}
			}
	},
	
	
	getStateJson: function() {
		var self = this;
		var stateJson = {jewellery: []};
		//for(i = 0; i < self.jewellery.length; i ++) {
		
		stateJson.jewellery.push({"value":"diamonds", quantity:self.scores["diamonds"]});
		stateJson.jewellery.push({"value":"precious", quantity:self.scores["precious"]});
		stateJson.jewellery.push({"value":"gold", quantity:self.scores["gold"]});
		stateJson.jewellery.push({"value":"silver", quantity:self.scores["silver"]});
		stateJson.jewellery.push({"value":"platinum", quantity:	self.scores["platinum"]});
		//}
		//jQuery.cookie("refine_mode", true,120);
		return stateJson;
	}
});
var Gadgets = View.extend({
    template: jQuery("#gadgets"),
	selection: "",
    events: {
        "keyup #gadgets_content input[type=text]" : "handleInputChangeEvent",
        "change #gadgets_content input[type=radio]" : "handleInputChangeEvent",
        "submit #gadgets_content form" : "submitQuestion",
        "click #gadget_list a" : "gadgetHandler"
    },
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.admin();
        AppFacade.fetchUser();
		
		if(jQuery.browser.msie || jQuery.browser.mozilla){
			require(["/static/js/libs/jquery.path.js",  
	                 "/static/js/libs/jquery.easing.1.3.js",
					 "https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"
					], function() {
	            self.render(self.animationComplete, self);
	            self.gadgets = jQuery("#gadget_list a");
	            self.previousMainClass = "gadgets-main_none";
	        });
		}else{
			
			require(["/static/js/libs/jquery.path.js",  
	                 "/static/js/libs/jquery.easing.1.3.js",
					 "/static/js/libs/swiffy.js",
					 "/static/js/json.models/gadgets/gadget_geek.js",
					 "/static/js/json.models/gadgets/gamer.js",
					 "/static/js/json.models/gadgets/regular_joe.js",
					 "/static/js/json.models/gadgets/stereophile.js",
					 "/static/js/json.models/gadgets/technophobe.js"
					], function() {
	            self.render(self.animationComplete, self);
	            self.gadgets = jQuery("#gadget_list a");
	            self.previousMainClass = "gadgets-main_none";
	        });
		}
		
		
		
		if (typeof(AppFacade.skinTone) === "undefined") {
				AppFacade.skinTone = 2;
		}


		AppFacade.questionNavigationRegister();
		AppFacade.clearbool = 1;
		
		self.skinTone = 2;
		
		//Get skintone - checking appfacade.skintone, otherwise cookie, otherwise default 2.
		if (jQuery.cookie('skintone') == null && typeof(AppFacade.skinTone) === "undefined") {
			self.skinTone = 2;
		} else if (jQuery.cookie('skintone') == null && typeof(AppFacade.skinTone) != "undefined") {
			self.skinTone = AppFacade.skinTone;
		} else {
			self.skinTone = jQuery.cookie('skintone');
		}
        
        jQuery('.dialogue_text_container h2').html("<h2>Electronics<br/>are big.</h2>");
        jQuery('#fine_tuning_dialogue_text').text("Care to fine tune your numbers?");
        
        if (AppFacade.userModel.attributes.age != null && AppFacade.userModel.attributes.gender != null) {
        
        	self.age = AppFacade.userModel.attributes.age;
	    	self.gender = AppFacade.userModel.attributes.gender;
    	
    		self.populateGadgetFace(self.age, self.gender);
    	
		}
        
        
    },
    rendered: false,
    userModelReady: function(userModel) {
		
		var self = this;
		
		if(self.rendered) {
			return
		} else {
			self.rendered = true;
		}
    	
    	if (userModel.attributes.age != null && userModel.attributes.gender != null) {
    		
    		self.age = userModel.attributes.age;
	    	self.gender = userModel.attributes.gender;
    	
    		self.populateGadgetFace(self.age, self.gender);
    	
		}
		
		
    },
    populateGadgetFace: function(age,gender){
    		var self = this;
    		
    		self.gender = gender;
    		self.age = age;
	    	
	    	//Convert male/female in man/woman
	    	if (self.gender == "male") {
				self.sex = "man";
			} else if (self.gender == "female") {
				self.sex = "woman";
			}
	    
	    	// Fallbacks incase there is no age defined or they are null due to problem with userModel.
	    	if (typeof(self.age) === "undefined" || self.age == null) {
	        	self.age = 25;
	        }
	         if (typeof(self.gender) === "undefined" || self.gender == null) {
	        	self.gender = "male";
	        }
	        if (typeof(self.sex) === "undefined" || self.sex == null) {
	        	self.sex = "man";
	        }
	        
	        //get a "generation" to display appropriate age according to image naming.
			self.generation = "young";
			
			if (self.age >= 35 && self.age < 55) {
				self.generation = "adult";
			} else if (self.age >= 55) {
				self.generation = "old";
			} else if (self.age < 35) {
				self.generation = "young";
			}
			
	        
	        if (typeof(self.generation) != "undefined" && typeof(self.sex) != "undefined" && typeof(self.skinTone) != "undefined") {
		        jQuery('#gadget_man').removeClass();
		        jQuery('#gadget_man').addClass("item");
		        jQuery('#gadget_man').css("display","block");
				jQuery('#gadget_man').addClass("gadgets-"+self.sex+self.skinTone+"_"+self.generation);
			}
			
			//tweak position of face to match headphones according to image.
			if (self.sex == "man") {
				if (self.generation == "old") {
					jQuery('#gadget_man').css("margin-left","-2px");
				} else if (self.generation == "adult") {
					jQuery('#gadget_man').css("margin-left","1px");
				} else if (self.generation == "young"){
					jQuery('#gadget_man').css("margin-left","1px");
				}
			} else if (self.sex == "woman") {
				if (self.generation == "old") {
					jQuery('#gadget_man').css("margin-left","3px");
				} else if (self.generation == "adult") {
					jQuery('#gadget_man').css("margin-left","-5px");
					jQuery('#gadget_man').css("width","91px");
				} else if (self.generation == "young"){
					jQuery('#gadget_man').css("margin-left","0");
				}
			}
    },
    gadgetHandler: function(e){
        var self = this;
        self.selectItem(e.currentTarget.id);
    },
	beforeAnimation: function() {
		var self = this;
		self.populateGadgetFace(self.age, self.gender);
	},
	selectItem: function(name) {
		var self = this;
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        jQuery('#headphones').removeClass();
        
    	if (name == "gadget_geek") {
            if (isiPad) {
                jQuery('#headphones').removeClass();
                jQuery('#headphones').addClass("item");
                jQuery('#headphones').addClass("gadgets-headphones_pink");
            	
            } else {
    		setTimeout(function(){
	        	jQuery('#headphones').removeClass();
	        	jQuery('#headphones').addClass("item");
	        	jQuery('#headphones').addClass("gadgets-headphones_pink");
	        },3200);
            }

    	} else if (name == "stereophile") {
            if (isiPad) {
                jQuery('#headphones').removeClass();
                jQuery('#headphones').addClass("item");
                jQuery('#headphones').addClass("gadgets-headphones_orange");
            } else {
    		setTimeout(function(){
	        	jQuery('#headphones').removeClass();
	        	jQuery('#headphones').addClass("item");
	        	jQuery('#headphones').addClass("gadgets-headphones_orange");
	        },2200);
            }

    	} else if (name == "gamer") {
            if (isiPad) {
                jQuery('#headphones').removeClass();
                jQuery('#headphones').addClass("item");
                jQuery('#headphones').addClass("gadgets-headphones_red");
            	
            } else {
        	setTimeout(function(){
	        	jQuery('#headphones').removeClass();
	        	jQuery('#headphones').addClass("item");
	        	jQuery('#headphones').addClass("gadgets-headphones_red");
	        },2000);
            }
        } else if (name == "regularjoe") {
            if (isiPad) {	
                jQuery('#headphones').removeClass();
                jQuery('#headphones').addClass("item");
                jQuery('#headphones').addClass("gadgets-headphones_green");
            
            } else {
        	setTimeout(function(){
	        	jQuery('#headphones').removeClass();
	        	jQuery('#headphones').addClass("item");
	        	jQuery('#headphones').addClass("gadgets-headphones_green");
	        },2000);
            }
        }
        
        
        self.gadgets.each(function(i){
        if(name != jQuery(this).attr("id")){
            if(jQuery(this).attr("rel") == "on"){
                //jQuery(this).attr("rel","off");
                jQuery(this).addClass("gadgets-"+jQuery(this).attr("id")+"_off");
                jQuery(this).removeClass("gadgets-"+jQuery(this).attr("id")+"_on");
                

                //new swiffy.Stage(document.getElementById(ele), AppFacade[ele]);
                
            }
        }else{
        	self.selection = name;
			

            jQuery(this).removeClass("gadgets-"+jQuery(this).attr("id")+"_off");
            jQuery(this).addClass("gadgets-"+jQuery(this).attr("id")+"_on");
            
            jQuery("#gadget_main").removeClass(self.previousMainClass);
			jQuery("#gadget_main").empty();
            

			self.previousMainClass = "gadgets-main_"+jQuery(this).attr("id");
			
			if(jQuery.browser.msie || jQuery.browser.opera || jQuery.browser.mozilla){
				
				var el = jQuery("<div>");
				el.attr("id","main_inner_gadgets");
				jQuery("#gadget_main").append(el);
				el.css({"width":"589px", "height":"350px"});
				var flashvars = {
				};
				var params = {
				  wmode: "transparent"
				};
				var attributes = {
				  id: "gadget_main",
				  name: "gadget_main"
				};
				
				swfobject.embedSWF("/static/flash/gadgets/"+jQuery(this).attr("id")+"_canvas.swf", "main_inner_gadgets", "589", "350", "9.0.0","expressInstall.swf", flashvars, params, attributes);
				
				
			}else{
				
				/// Play animation
				// Insert iPad here
				// Add background image onto #gadget_main
				
				
				if (isiPad) {	
					jQuery('#gadget_main').css("background-image","url('/static/css/img/gadgets/main_"+jQuery(this).attr("id")+".png')");
				} else {
                                        self.stage = new swiffy.Stage(document.getElementById("gadget_main"), AppFacade[jQuery(this).attr("id")+"_canvas"]);
                                        self.stage.start();
				}
				
				
			}
			
			//self.stage.stop();
//          jQuery("#gadget_main").addClass("gadgets-main_"+jQuery(this).attr("id"));

            /*var answer = jQuery(this).attr("data-answer");
            var questionModel = new QuestionModel({
                "param": self.templateID,
                "value": answer,
                "quantity": 1, 
                "question_id" : self.pageID,
                "clear" : AppFacade.clearbool
            });
            
            console.log(questionModel);
            self.addSingleAnswer(questionModel, self.templateID);*/
            
			
            var answers = new Array("technophobe", "regular_joe", "stereophile", "gamer", "gadget_geek");
          	
			// remove all answers given for this question:
			self.clearAnswers(questionModel, self.templateID);
			
			var selectedModel = null;
			for(var i = 0; i < answers.length; i ++)
            {        
                var qty = (jQuery(this).attr("data-answer") == answers[i]) ? 1 : 0;
                var questionModel = new QuestionModel({
                    "param": self.templateID,
                    "value": answers[i],
                    "quantity": qty, 
                    "question_id" : self.pageID,
                    "clear" : AppFacade.clearbool
                });
                
				// the third parameter, true, is to force addition of multiple answers for the same question
                if(qty == 1) {
					selectedModel = questionModel;
				} else {
					self.addSingleAnswer(questionModel, self.templateID, true);
				}
            }
            self.addSingleAnswer(selectedModel, self.templateID, true);
        }
            

        })
	},
	
    restoreState: function(data) {
    	var self = this;	
		self.selectItem(data.selection);	
	},
	
	getStateJson: function() {
		var self = this;
		//console.log(self.selection);
		return {selection: self.selection};
	}
}); 
var SportingGoods = View.extend({
    template: jQuery("#sporting_goods"),
    events: {
        "keyup #sporting_goods_content input[type=text]" : "handleInputChangeEvent",
        "change #sporting_goods_content input[type=radio]" : "handleInputChangeEvent",
        "submit #sporting_goods_content form" : "submitQuestion",
        "click .block" : "handleSportSelection"
    },
	ids: [],
	selection: [],
	sports : ["baseball",
        				"americanfootball",
        				"cycling",
        				"football",
        				"skiing",
        				"camping",
        				"running",
        				"snowboarding",
        				"golf",
        				"snorkling",
        				"surfing",
        				"waterskiing",
        				"fishing",
        				"snowwalking"],
    initialize: function(obj) {
        var self = this;        
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;

        AppFacade.currentView = self;

        self.admin();
        
        if (isiPad || jQuery.browser.msie || jQuery.browser.opera || jQuery.browser.mozilla) {
        
    	var sports = self.sports;
    	self.preloaded_animations = [];
    	require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js"
                 ], function() {
		            self.render();
		        	for (var i = 0;i< sports.length;i++) {
								var canvas = jQuery('#'+sports[i]+'_canvas');
								canvas.css({
									"backgroundImage": "url('/static/css/img/sports/"+sports[i]+".png')",
									"zIndex": "3000",
									"width": "150px",
									"maxWidth": "148px",
									"height": "115px"
								});
								jQuery( "#sporting_facts" ).append('<div style="display:none;background-image:url(\'/static/css/img/sports/'+sports[i].replace("_canvas","")+'_gif.gif\')"><div>');
								self.preloaded_animations.push(jQuery("<img>").attr("src","/static/css/img/sports/"+sports[i].replace("_canvas","")+"_gif.gif"));
		        	}	            
        		});
	        		
        } else {
	        require(["/static/js/libs/jquery.path.js",  
	                 "/static/js/libs/jquery.easing.1.3.js",
	                 "/static/js/libs/swiffy.js",
	                 "/static/js/json.models/sports_question/baseball.js",
	                 "/static/js/json.models/sports_question/americanfootball.js",
	                 "/static/js/json.models/sports_question/cycling.js",
	                 "/static/js/json.models/sports_question/football.js",
	                 "/static/js/json.models/sports_question/skiing.js",
	                 "/static/js/json.models/sports_question/snowboarding.js",
	                 "/static/js/json.models/sports_question/golf.js",
	                 "/static/js/json.models/sports_question/snorkling.js",
	                 "/static/js/json.models/sports_question/surfing.js",
	                 "/static/js/json.models/sports_question/fishing.js",
	                 "/static/js/json.models/sports_question/waterskiing.js",
	                 "/static/js/json.models/sports_question/running.js",
	                 "/static/js/json.models/sports_question/camping.js",
	                 "/static/js/json.models/sports_question/snowwalking.js"
	                 ], function() {
	            self.render();
	            // Call to iterate over the elements
	            
	            self.registerAnimations();
	            
	            //Registry pattern
	            self.registry = {};
	            
	        });
        }

		AppFacade.changeNextButton();
		AppFacade.passThrough = true;
		
       	self.ipadtoggle = {
        		'cycling_canvas' : false,
        		'baseball_canvas' : false,
        		'americanfootball_canvas' : false,
        		'football_canvas' : false,
        		'skiing_canvas' : false,
        		'camping_canvas' : false,
        		'running_canvas' : false,
        		'snowboarding_canvas' : false,
        		'golf_canvas' : false,
        		'snorkling_canvas' : false,
        		'waterskiing_canvas': false,
        		'fishing_canvas' : false,
        		'snowwalking_canvas' : false,
        		'surfing_canvas' : false
        };
        
       AppFacade.clearbool = 1;	
        				
       self.addQuestionModel("baseball", 0, "baseball");
       self.addQuestionModel("americanfootball", 0, "baseball");
       self.addQuestionModel("cycling", 0, "cycling");
       self.addQuestionModel("football", 0, "football");
       self.addQuestionModel("skiing", 0, "skiing");
       self.addQuestionModel("camping", 0, "camping");
       self.addQuestionModel("running", 0, "running");
       self.addQuestionModel("snowboarding", 0, "snowboarding");
       self.addQuestionModel("golf", 0, "golf");
       self.addQuestionModel("snorkling", 0, "snorkling");
       self.addQuestionModel("surfing", 0, "surfing");
       self.addQuestionModel("waterskiing", 0, "waterskiing");
       self.addQuestionModel("fishing", 0, "fishing");
       self.addQuestionModel("snowwalking", 0, "snowwalking");
      AppFacade.saveSurvey();
       
    },
    userModelReady: function(userModel) {
    
    },
    registerAnimations: function() {
            
            var self = this;

			
            self.animations = {};
            jQuery('.done').each(function() {
                var ele = this.getAttribute("id");
                self.animations[ele] = new swiffy.Stage(document.getElementById(ele), AppFacade[ele]);
                self.animations[ele].start();
                self.animations[ele].stop();
            });
            
            
    },
    handleSportSelection: function(e) {
        var self = this;
		self.selectItem(jQuery(e.currentTarget), jQuery(e.currentTarget).attr("id"), jQuery(e.currentTarget).attr("data-tag"));
    },
	
	selectItem: function(target, id, tag) {
		var self = this;
		if(jQuery.inArray(id,self.ids) == -1) {
			self.selection.push({id: id, target: target, tag: tag});
			self.ids.push(id);
		}
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
     	//iPad toggle.
		if(isiPad || jQuery.browser.msie || jQuery.browser.opera || jQuery.browser.mozilla){
			var sports = self.sports;
			
			if (self.ipadtoggle[id] === false) {
	
	            // animation not playing, turn it on.
	          	 jQuery("#"+id).css('background-image',"url('/static/css/img/sports/"+id.replace("_canvas","")+"_gif.gif')");
                        
                          //jQuery("#"+id).css("width","153px");
                          //jQuery("#"+id).css("height","119px");
				 self.addQuestionModel(tag, 1, tag);
				 self.ipadtoggle[id] = true;
	            
	        } else if (self.ipadtoggle[id] === true){
	        	
		         // animation is playing; turn it off.
				 jQuery("#"+id).css('background-image',"url('/static/css/img/sports/"+id.replace("_canvas","")+".png')");
                                 
			     self.addQuestionModel(tag, 0, tag);
			     self.ipadtoggle[id] = false;
			         
	        } else {

	            jQuery("#"+id).css('background-image',"url('/static/css/img/sports/"+id.replace("_canvas","")+"_gif.gif')");
                    
                      
	            self.addQuestionModel(tag, 1, tag);
	            self.ipadtoggle[id] = true;
	        }
			
		} else {
        //Non-ipad toggle.
	        if (typeof self.registry[id] === "undefined") {

	            // animation not playing, turn it on.
	          	 jQuery("#"+id).empty();
				 self.animations[id] = new swiffy.Stage(document.getElementById(id), AppFacade[id]);
		         self.animations[id].start();
		         //self.animations[id].stop();
		         
				 self.registry[id] = true;
	            
	        } else if (self.registry[id]){
		         // animation is playing; turn it off.
		         // Note: empties div and creates new swiffy object to avoid swiffy bugs.
	         	 jQuery("#"+id).empty();
				 self.animations[id] = new swiffy.Stage(document.getElementById(id), AppFacade[id]);
		         self.animations[id].start();
		         self.animations[id].stop();
		         self.registry[id] = false;
	        } else {
	            self.animations[id].start();
	            self.registry[id] = true;
	        }

        	//register selections (non-Ipad).
	        if(self.registry[id]){
	            self.addQuestionModel(tag, 1, tag);
	        }else{
	            self.addQuestionModel(tag, 0, tag);
	        }
        
    }        
	},
    
	restoreSports: function (sport) {
		//console.log("recieved \""+sport+"\", need to select. **need to finish off this function**");

		// TODO: select sport
    },
    
    restoreState: function(data) {
    	var self = this;	
		for(var i = 0; i < data.length; i ++) {
			if(data[i].value) self.selectItem(data[i].selection.target, data[i].selection.id, data[i].selection.tag);
		}
	},
	
	getStateJson: function() {
		var self = this;
		var stateJson = [];
		for(var i = 0; i < self.selection.length; i ++) {
			stateJson.push({selection: self.selection[i], value: self.registry[self.selection[i].id]});
		}
		return stateJson;
	}
        
});


var ClosetClothing = View.extend({
    template: jQuery("#closet_clothing"),
    events: {
        "keyup #closet_clothing_content input[type=text]" : "handleInputChangeEvent",
        "change #closet_clothing_content input[type=radio]" : "handleInputChangeEvent",
        "submit #closet_clothing_content form" : "submitQuestion"
    },
    
    multiplier: 2,
    values: [],
    tagAssignments: [],
    gender: "female",
    
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        self.admin();
        
		//Get gender - checking appfacade.gender, otherwise cookie, otherwise default male.
		if (jQuery.cookie('gender') == null && typeof(AppFacade.gender) === "undefined") {
			self.gender = "male";
		} else if (jQuery.cookie('gender') == null && typeof(AppFacade.gender) != "undefined") {
			self.gender = AppFacade.gender;
		} else {
			self.gender = jQuery.cookie('gender');
		}
        
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"], function() {
            
			self.render(self.initItems, self);
            
            jQuery("#button_denim").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("denim", ui.value); 
                    AppFacade.closeFineTuning();                
                }
            });  
            
            jQuery("#button_tops").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("tops", ui.value); 
                    jQuery("#drag_here").css("left", 228 + ui.value * 2.82);
                    jQuery("#drag_here").fadeOut(700);
                    AppFacade.closeFineTuning(); 
                }
            });  
            
            jQuery("#button_dress").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("dress", ui.value); 
                    AppFacade.closeFineTuning();
                }
            });
            
             jQuery("#button_lingerie").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("lingerie", ui.value); 
                    AppFacade.closeFineTuning();
                }
            });
            
            jQuery("#button_outerwear").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("outerwear", ui.value); 
                    AppFacade.closeFineTuning(); 
                }
            });
            
            jQuery("#button_casual").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("casual", ui.value); 
                    AppFacade.closeFineTuning(); 
                }
            });
            
            jQuery("#button_leather").slider({
                orientation: 'horizontal',
                value:50,
                min: 0,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    self.updateClothes("leather", ui.value);
                    AppFacade.closeFineTuning(); 
                }
            });
            //AppFacade.saveSurvey(true);
        });
        
        
        
        self.values['denim'] = 50;
        self.values['tops'] = 50;
        self.values['dress'] = 50;
        self.values['lingerie'] = 50;
        self.values['outerwear'] = 50;
        self.values['casual'] = 50;
        self.values['leather'] = 50;
            		
		if(self.gender === "male"){
			
		    self.tagAssignments['denim'] = "male_denim";
	        self.tagAssignments['tops'] = "male_shirts";
	        self.tagAssignments['dress'] = "suits";
	        self.tagAssignments['lingerie'] = "underwear";
	        self.tagAssignments['outerwear'] = "outerwear";
	        self.tagAssignments['casual'] = "cas_shoes";
	        self.tagAssignments['leather'] = "leather_shoes";	
			
			self.updateClothes("tops", 50);
			self.updateClothes("denim", 50); 
			self.updateClothes("dress", 50); 
			self.updateClothes("lingerie", 50); 
			self.updateClothes("outerwear", 50); 
			self.updateClothes("casual", 50); 
			self.updateClothes("leather", 50); 
			
		}else if (self.gender === "female") {
			
			self.tagAssignments['denim'] = "female_denim";
	        self.tagAssignments['tops'] = "female_shirts";
	        self.tagAssignments['dress'] = "dresses";
	        self.tagAssignments['lingerie'] = "lingerie";
	        self.tagAssignments['outerwear'] = "outerwear";
	        self.tagAssignments['casual'] = "cas_shoes";
	        self.tagAssignments['leather'] = "leather_shoes";
	        
			self.updateClothes("tops", 50);
			self.updateClothes("denim", 50); 
			self.updateClothes("dress", 50); 
			self.updateClothes("lingerie", 50); 
			self.updateClothes("outerwear", 50); 
			self.updateClothes("casual", 50); 
			self.updateClothes("leather", 50);
		}
		
		
		AppFacade.clearbool = 1;
		

    },
    userModelReady: function(userModel) {
    
    },
    updateClothes: function(clothType, value)
    {
        var self = this;
        
        self.values[clothType] = value;
        
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
                 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"], function() {
                    jQuery("#button_" + clothType).slider({value: value});
                 });
                
        jQuery('.' + clothType + '_number').html(self.values[clothType]);     

        for(var i = 1; i <= self.values[clothType] / self.multiplier; i++)
        {		
        		
				jQuery('#'+clothType+i).addClass('closet_clothing-' + self.gender + '_' + clothType + i);
        }

        for(var i = self.values[clothType] / self.multiplier + 1; i <= 50; i++)
        {
            jQuery('#'+clothType+i).removeClass('closet_clothing-male_' + clothType + i);
            jQuery('#'+clothType+i).removeClass('closet_clothing-female_' + clothType + i);
        }
        
        //console.log(clothType + " " + self.tagAssignments[clothType] + " " + self.values[clothType]);
        //console.log(self.tagAssignments[clothType]+" + "+self.values[clothType]+" + "+clothType);
        self.addQuestionModel(self.tagAssignments[clothType], self.values[clothType], clothType);    
        
        // add a tag
        if(self.values[clothType] > 0)
        {        
            if(AppFacade.userModel.get("gender") == "male")
            {
                self.addQuestionModel("male_clothing", 1);        
            }
            else if(AppFacade.userModel.get("gender") == "female")
            {
                self.addQuestionModel("female_clothing", 1);        
            }
        }
    },
    
    initItems: function() {
        var self = this;     
        
        //jQuery('#tops .tops_number').html('test');
        for(var cloth in self.values)
        {
            
            jQuery('#' + cloth + ' .' + cloth + '_number').html(self.values[cloth]);
        }
        
        var gender = AppFacade.userModel.get("gender");
        if(gender != "male")
            gender = "female";
            
        /*jQuery('#denim1').addClass('closet_clothing-' + gender + '_denim1');
        jQuery('#denim2').addClass('closet_clothing-' + gender + '_denim2');
        jQuery('#denim3').addClass('closet_clothing-' + gender + '_denim3');
        jQuery('#denim4').addClass('closet_clothing-' + gender + '_denim4');
        jQuery('#denim5').addClass('closet_clothing-' + gender + '_denim5');
        jQuery('#denim6').addClass('closet_clothing-' + gender + '_denim6');
        
        jQuery('#tops1').addClass('closet_clothing-' + gender + '_tops1');
        jQuery('#tops2').addClass('closet_clothing-' + gender + '_tops2');
        jQuery('#tops3').addClass('closet_clothing-' + gender + '_tops3');
        jQuery('#tops4').addClass('closet_clothing-' + gender + '_tops4');
        jQuery('#tops5').addClass('closet_clothing-' + gender + '_tops5');
        
        jQuery('#dress1').addClass('closet_clothing-' + gender + '_dress1');
        jQuery('#dress2').addClass('closet_clothing-' + gender + '_dress2');
        jQuery('#dress3').addClass('closet_clothing-' + gender + '_dress3');
        jQuery('#dress4').addClass('closet_clothing-' + gender + '_dress4');
        jQuery('#dress5').addClass('closet_clothing-' + gender + '_dress5');
        jQuery('#dress6').addClass('closet_clothing-' + gender + '_dress6');
        jQuery('#dress7').addClass('closet_clothing-' + gender + '_dress7');
        jQuery('#dress8').addClass('closet_clothing-' + gender + '_dress8');
        jQuery('#dress9').addClass('closet_clothing-' + gender + '_dress9'); 
    
        jQuery('#lingerie1').addClass('closet_clothing-' + gender + '_lingerie1');
        jQuery('#lingerie2').addClass('closet_clothing-' + gender + '_lingerie2');
        jQuery('#lingerie3').addClass('closet_clothing-' + gender + '_lingerie3');
        jQuery('#lingerie4').addClass('closet_clothing-' + gender + '_lingerie4');
        jQuery('#lingerie5').addClass('closet_clothing-' + gender + '_lingerie5');
        jQuery('#lingerie6').addClass('closet_clothing-' + gender + '_lingerie7');  
        
        jQuery('#outerwear1').addClass('closet_clothing-' + gender + '_outerwear1');
        jQuery('#outerwear2').addClass('closet_clothing-' + gender + '_outerwear2');
        jQuery('#outerwear3').addClass('closet_clothing-' + gender + '_outerwear3');
        jQuery('#outerwear4').addClass('closet_clothing-' + gender + '_outerwear4'); 
        
        jQuery('#casual1').addClass('closet_clothing-' + gender + '_casual1');
        jQuery('#casual2').addClass('closet_clothing-' + gender + '_casual2');
        jQuery('#casual3').addClass('closet_clothing-' + gender + '_casual3');
        jQuery('#casual4').addClass('closet_clothing-' + gender + '_casual4'); 
        
        jQuery('#leather1').addClass('closet_clothing-' + gender + '_leather1');
        jQuery('#leather2').addClass('closet_clothing-' + gender + '_leather2');
        jQuery('#leather3').addClass('closet_clothing-' + gender + '_leather3');
        jQuery('#leather4').addClass('closet_clothing-' + gender + '_leather4');
        jQuery('#leather5').addClass('closet_clothing-' + gender + '_leather5');   */
        
        var types = new Array("denim", "tops", "dress", "lingerie", "outerwear", "casual", "leather");
        
        for(var j = 0; j < types.length; j++)
        {
            for(var i = 1; i <= self.values[types[j]]; i++)
            {
                jQuery('#'+types[j]+i).addClass('closet_clothing-' + self.gender + '_' + types[j] + i);
            }
        }
        
    },
    
restoreState: function(data) {
        var self = this;
        
        jQuery("#denim_items span").removeClass();
        jQuery("#denim_items span").addClass("denim");
        
        jQuery("#tops_items span").removeClass();
        jQuery("#tops_items span").addClass("tops");
        
        jQuery("#dress_items span").removeClass();
        jQuery("#dress_items span").addClass("dress");
        
        jQuery("#lingerie_items span").removeClass();
        jQuery("#lingerie_items span").addClass("lingerie");
        
        jQuery("#outerwear_items span").removeClass();
        jQuery("#outerwear_items span").addClass("outerwear");
        
        jQuery("#casual_items span").removeClass();
        jQuery("#casual_items span").addClass("casual");
        
        jQuery("#leather_items span").removeClass();
        jQuery("#leather_items span").addClass("leather");
        
        
        //e.g. data = {"meta":{"children":[{"sex":"boy","age":"3"},{"sex":"girl","age":"5"}]}} 
        //var childrenCount = data.children.length;
        for(var i = 0; i < data.clothes.length; i++) 
        {
            self.updateClothes(data.clothes[i].type, data.clothes[i].value);
        }
    },
    
    getStateJson: function() {
        var self = this;
        
        //console.log("getting state:");
        var stateJson = {clothes: []};
        // self.values[clothType]
        
        
        for(var obj in self.values)
        {
            stateJson.clothes.push({type: obj, value: self.values[obj]});
        }
        return stateJson;
    }    
    
});



var PaidForSex = View.extend({
    template: jQuery("#paid_for_sex"),
    initialize: function(obj) {
        var self = this;
        var isiPad = navigator.userAgent.match(/iPad/i) != null;

        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        if( window.location.host === 'students.slaveryfootprint.org' || AppFacade.userModel.get("age") < 18 ) {
        		//Skip sex q if user is 17 or under.
				window.location = window.location.protocol + "//" + window.location.host + "/results/#results";
		} else {
        
        self.admin();
        require(["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
				 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js"], function() {
            self.render();

			var ref = "zip_cropped-zip_cropped_000";

			var counter = 1;
			
			
			
			if(isiPad){
				jQuery("#zipper").removeClass();
				jQuery("#zipper").addClass("zip_cropped-zip_cropped_00001_ipad");
				for (var x = 1;x < 52;x++) {
					jQuery( "#zipper" ).append('<div style="display:none" class="zip_cropped-zip_cropped_000'+(x < 10 ? '0'+x : x)+'_ipad"><div>');
				}
			}
			
			
			jQuery( "#sex_slider_scope" ).slider({
	            orientation: "vertical",
	            range: "max",
	            max: 52,
	            min: 0,
	            value: 100,
				slide: function( event, ui ) {
					var value = ui.value;
					value = value - 52;
					value = Math.abs(value);
					
					
					
					
					if(value != 0){
						var temp_ref = ref + self.pad(value);
						jQuery("#zipper").removeClass();
						if (isiPad) jQuery("#zipper").addClass(temp_ref+"_ipad");
						else jQuery("#zipper").addClass(temp_ref);
					}

					//var amt = (152 * (value/100) -15);
					//jQuery("#precious_slider_scope_progress").css("width", amt + "px");
					//self.checkScore(value, "precious");
			}});
			setTimeout(function(){
				//alert("test")
				jQuery("#sex_slider_scope").find(".ui-slider-handle").addClass("sex-sex_handle");
				jQuery("#sex_slider_scope").find(".ui-slider-handle").removeClass("ui-state-default");
				
				
				
			}, 10);
			
	    jQuery("<img>").attr("src",function() {
	    	return jQuery("#zipper").css("background-image").match(/url\("?([^"]*)"?\)/)[1];
	    }).load(function() {
				jQuery("#behind_zipper").css("display","block");
				AppFacade.changeNextButton();
				AppFacade.passThrough = true;	    
	    });
	    
	    /*
	    setTimeout(function(){
				jQuery("#behind_zipper").css("display","block");
				AppFacade.changeNextButton();
				AppFacade.passThrough = true;
			}, 500);
			*/

        });
        
       } //age was at least 18.
        
    },
    userModelReady: function(userModel) {
    
    },
	pad: function(number){
		return (number < 10 ? '0' : '') + number
	}
});

var GenderView = View.extend({
    el: jQuery('#main'),
    template: jQuery("#gender_and_age"),
    events: {
        "click #woman a":"clickWoman",
        "click #man a" : "clickMan",
        "click .on .volumecontrol": "volumeControl",
        "mousedown .volumecontrol": "startTimer",
        "mouseup .volumecontrol": "stopTimer",
		"click #yourgender a": "toneClick"
    },
	timeout : null,
    initialize: function(obj) {
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        //self.template = jQuery(obj.templateID);
        
        AppFacade.skinTone = 2;
        jQuery.cookie( 'skintone', '2',  {expires: 7, path: '/'} );
        
        self.admin();
    
        //self.model.view = self;
       // AppFacade.userModel.view = self;
      
        
    },
    rendered: false,
    userModelReady: function(userModel) {
    	var self = this;
    	if(self.rendered) {
    		return;
    	} else {
    		self.rendered = true;
    	}

			if (userModel && userModel.attributes && userModel.attributes.age) {
					AppFacade.age = userModel.attributes.age;
					self.age = userModel.attributes.age;
			} else {
					AppFacade.age = 25;
					self.age = 25;
			}

			 setTimeout(function(){

							//AppFacade.userModel.bind("change:age",self.userModelChanged);

					 _.bindAll(self,"render","clickWoman","clickMan");
							//AppFacade.userModel.bind("change:age",self.userModelChanged);
			//self.userModelChanged();
			
			}, 1000);
	 
			
			
			require(["/static/js/libs/jquery.path.js", 
							 "/static/js/json.models/one.js", 
							 "/static/js/libs/jquery.easing.1.3.js", 
							 "order!/static/js/libs/raphael-min.js", 
							 "order!/static/js/libs/g.raphael-min.js",
							 "order!/static/js/libs/g.pie-min.js"], function() {
					self.render(self.start, self);
					self.genderRegister();
					self.ageRegister();
										
			});
    	
    },
    startTimer: function (r) {
		if(typeof r != "undefined"){

			var self = this;
	    	self.timeout = setTimeout(function(){self.autoIncrease(self, r);}, 150);
		}

    },
    stopTimer: function () {
		var self = this;
    	clearTimeout(self.timeout);
    	self.timeout = null;
        //self.updateProfile();
    },
    autoIncrease: function(ref, r) {
	var self = ref;
	self.age = eval(self.age);	
	if(r.target.id == "volumecontrol_plus"){
	    	self.age += 1;
	        self.processAge();
        }else{
            if(self.age > 0){
                self.age -= 1;
                self.processAge();
            }    
        }
		
       if (self.timeout != null) var aa  = setTimeout(function(){self.autoIncrease(self, r);},150);
    },
    showTone: function () {
    	jQuery('#select_gender').css("display","none");
        jQuery('#select_tone').css("display","block");
        jQuery('#skintext').css("display","block");
    },
    genderRegister: function(){
        var self = this;
        if(typeof AppFacade.userModel.get("gender") === "string"){
        	self.showTone();
            if(AppFacade.userModel.get("gender") == "male"){
                self.clickMan();
                jQuery.cookie( 'gender', 'male',  {expires: 7, path: '/'} );
            }else{
                self.clickWoman();
                jQuery.cookie( 'gender', 'female',  {expires: 7, path: '/'} );
            }
        }
    },
    ageRegister: function(){
        var self = this;
        if(AppFacade.userModel.get("birth_date")){
            AppFacade.userModel.attributes.age = AppFacade.userModel.birthdayToAge();
        } else if(AppFacade.userModel.get("age")) {
        	AppFacade.userModel.attributes.age = AppFacade.userModel.get("age");
        }
        self.rememberAge();
    },
    
    userModelChanged: function(){
        var self = this;
        
        if(typeof (AppFacade.userModel.get("id")) != "undefined" && (AppFacade.userModel.get("id") != null) && AppFacade.userModel.get("email") != null){
            //User ID exists.
            
            
            if(typeof AppFacade.userModel.get("birth_date") != "string"){
                if(typeof window.AppFacade.FBUser.birthday === "string"){
                    AppFacade.userModel.set({"birth_date": window.AppFacade.FBUser.birthday})
                }
            }
            if(typeof AppFacade.userModel.get("gender") != "string"){
                if(typeof window.AppFacade.FBUser.gender === "string"){
                    AppFacade.userModel.set({"gender": window.AppFacade.FBUser.gender})
                }
            }
            if(typeof AppFacade.userModel.get("location") != "string"){
                if(typeof window.AppFacade.FBUser.location === "object"){
                   AppFacade.userModel.set({"location": window.AppFacade.FBUser.location.name})
                }
            }
         //   console.log(self.age);
                
            self.FBInit = true;
            
            AppFacade.getCurrentView().genderRegister();
            AppFacade.getCurrentView().ageRegister();
            
            AppFacade.userModel.save({url: "/gateway/user/" + AppFacade.userModel.get("id"), type: "PUT"});

        }
    },
    clickWoman: function(){
		AppFacade.changeNextButton();
		AppFacade.passThrough = true;
        var self = this;
        jQuery.cookie( 'gender', 'female',  {expires: 7, path: '/'} );
        self.showTone();
        if(self.genderClicked != "woman"){
          
            jQuery("#man a").removeClass();
			jQuery("#man a").addClass("gender_and_age-malecutout");
            jQuery("#gender_and_age-squiggle1").addClass("gender_and_age-squiggle1on");
            jQuery("#gender_and_age-squiggle2").removeClass("gender_and_age-squiggle2on");
            jQuery("#gender_and_age-squiggle3").addClass("gender_and_age-squiggle3on");
            jQuery("#gender_and_age-volumecontrols").addClass("gender_and_age-volumecontrolson").addClass("on");
            //jQuery("#yourgender").css('opacity', .5);
            //jQuery("#yourage").css('opacity', 1);
            self.genderClicked = "woman";
            AppFacade.userModel.set({"gender":"female"});
			self.checkGenderAge();
            //self.model.save({type:"PUT"});
        }

		AppFacade.userModel.set({"gender":"female"});
        //self.model.save({type:"PUT"});
		
		//console.log('female reset');
		window.AppFacade.userModel.attributes.password = '';
		if($.cookie("group_name"))
		{
			if(window.AppFacade.userModel.attributes.group_name == null || window.AppFacade.userModel.attributes.group_name == '') window.AppFacade.userModel.attributes.group_name = $.cookie("group_name");
			console.log('group name s1');
			console.log(window.AppFacade.userModel.attributes.group_name);
		}
			
		jQuery.ajax({
			"url":"/gateway/user/current",
			"type" : "PUT",
			"data" : JSON.stringify(window.AppFacade.userModel.attributes),
			"success": function(data){

			}
		});
    },
    clickMan: function(){
		AppFacade.changeNextButton();
		AppFacade.passThrough = true;
		jQuery.cookie( 'gender', 'male',  {expires: 7, path: '/'} );
        var self = this;
        self.showTone();
        if(self.genderClicked != "man"){
            
            jQuery("#woman a").removeClass();
			jQuery("#woman a").addClass("gender_and_age-femalecutout");


            jQuery("#gender_and_age-squiggle2").addClass("gender_and_age-squiggle2on");
            jQuery("#gender_and_age-squiggle1").removeClass("gender_and_age-squiggle1on");
            jQuery("#gender_and_age-squiggle3").addClass("gender_and_age-squiggle3on");
            jQuery("#gender_and_age-volumecontrols").addClass("gender_and_age-volumecontrolson").addClass("on");
        
            //jQuery("#yourgender").css('opacity', .5);
            //jQuery("#yourage").css('opacity', 1);
            self.genderClicked = "man";
            AppFacade.userModel.set({"gender":"male"});
			self.checkGenderAge();
            //self.model.save({type:"PUT"});
        }

		AppFacade.userModel.set({"gender":"male"});
        //self.model.save({type:"PUT"});
		//console.log('male reset');
		window.AppFacade.userModel.attributes.password = '';
		if($.cookie("group_name"))
		{
			if(window.AppFacade.userModel.attributes.group_name == null || window.AppFacade.userModel.attributes.group_name == '') window.AppFacade.userModel.attributes.group_name = $.cookie("group_name");
			console.log('group name s2');
			console.log(window.AppFacade.userModel.attributes.group_name);
		}
		
		jQuery.ajax({
			"url":"/gateway/user/current",
			"type" : "PUT",
			"data" : JSON.stringify(window.AppFacade.userModel.attributes),
			"success": function(data){

			}
		});
		
    },
    updateProfile : function () {
        jQuery.ajax({
			"url":"/gateway/user/current",
			"type" : "PUT",
			"data" : JSON.stringify(AppFacade.userModel.attributes),
			"success": function(data){

			}
		});
    },
    volumeControl: function(r){
        var self = this;
        self.age  = eval(self.age);
        if(r.target.id == "volumecontrol_plus"){
            self.age += 1;
            self.processAge();
            //self.userModelChanged();
        }else{
            if(self.age > 0){
                self.age -= 1;
                self.processAge();
                //self.userModelChanged();
            }    
        }
    },
    rememberAge: function () {
                var self = this;
        if (isNaN(self.age) || !self.age || jQuery("#gender_and_age-youage .age").text() == null) { 
        	self.age = 25;
        	//console.log("NaN age - defaulted to 25.");
        }
        jQuery("#gender_and_age-youage .age").text(self.age);
        self.checkGenderAge();
        AppFacade.userModel.set({"age": eval(self.age)});
    },
    processAge: function(){
        var self = this;
        if (isNaN(self.age) || !self.age || jQuery("#gender_and_age-youage .age").text() == null) { 
        	self.age = 25;
        	//console.log("NaN age - defaulted to 25.");
        }
        jQuery("#gender_and_age-youage .age").text(self.age);
        self.checkGenderAge();
        
        AppFacade.age = eval(self.age);
        AppFacade.userModel.age = eval(self.age);
        jQuery.cookie( 'age', self.age,  {expires: 7, path: '/'} );
        
        AppFacade.userModel.set({"age": self.age});
		AppFacade.userModel.set({"password": ''});
        
    },
    checkGenderAge: function(){
        var self = this;
        if(self.genderClicked === "man"){
            if(self.age >= 35 && self.age < 65){
                jQuery("#man a").removeClass();
                jQuery("#man a").addClass("gender_and_age-man"+AppFacade.skinTone+"B");
            }else if(self.age >= 65){
                jQuery("#man a").removeClass();
                jQuery("#man a").addClass("gender_and_age-man"+AppFacade.skinTone+"C");
            }else{
                jQuery("#man a").removeClass();
                jQuery("#man a").addClass("gender_and_age-man"+AppFacade.skinTone+"A");
            }
        }else if(self.genderClicked === "woman"){
			if(self.age >= 35 && self.age < 65){
                jQuery("#woman a").removeClass();
                jQuery("#woman a").addClass("gender_and_age-woman"+AppFacade.skinTone+"B");
            }else if(self.age >= 65){
                jQuery("#woman a").removeClass();
                jQuery("#woman a").addClass("gender_and_age-woman"+AppFacade.skinTone+"C");
            }else{       
                jQuery("#woman a").removeClass();
                jQuery("#woman a").addClass("gender_and_age-woman"+AppFacade.skinTone+"A");
            }
        }
    },
    createPieChart: function(){
        var self = this;
        var r = Raphael("gender_and_age_right_sidebar_pie");
        self.pie = r.g.piechart(95, 75, 74, [80,20]).attr({"fill":"#FDC500","stroke-width": 0});
        self.pie.animate({"rotation": "230 95 75"}, 2500, ">");
        self.pie.each(function(){
            if(this.sector.value.value == 20){
                this.sector.attr({fill:"#000000", "opacity": 1});
                
            }
        });
        self.pie.hover(function() {
            var that = this.sector;
            self.pie.each(function(){
                if(this.sector.id === that.id){
                //    this.sector.animate({"fill":"#333"});
                }
            })
        });
        
    },
	toneClick: function(e){
		var self = this;
		var tone = jQuery(e.currentTarget).attr("data-tone");
		jQuery('#select_tone a').each(
			function () {
				var data = $(this);
				if (data.hasClass("gender_and_age-tone"+data.attr("data-tone")+"selected")) 
					data.removeClass("gender_and_age-tone"+data.attr("data-tone")+"selected");
				if (data.attr("data-tone") == tone) data.addClass("gender_and_age-tone"+tone+"selected");
				
			}
		);
		AppFacade.skinTone = parseInt(tone);
		var tone = parseInt(tone);
		jQuery.cookie( 'skintone', tone,  {expires: 7, path: '/'} );
		self.checkGenderAge();
		
		
	},
    start: function(){
        jQuery("#yourgender").css('opacity', 1);
		setTimeout(function(){
			//self.checkGenderAge();
		}, 500);
		
    }
});

var SignupView = View.extend({
    template: jQuery("#signup_temp"),
	events: {
		"blur #password" : "confirmPasswords",
		"blur #confirm_password" : "confirmPasswords",
		"click #signup_button" : "processLogin",
		"click #mtv_popup" : "mtvRegister",
		"click #captcha_refresh" : "getCaptcha"
	},
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;

		require(["/static/js/libs/jquery.path.js",  
		         "/static/js/libs/jquery.easing.1.3.js", 
		         "/static/js/libs/jcap.js",
		 		 "/static/js/libs/md5.js"
				], function() {
					self.render();
					AppFacade.adjustHeight();
					/*var _v = sjcap();
					_v = _v + ".jpg";
					jQuery("#cap_img").attr("src", _v);*/
					self.getCaptcha();
					AppFacade.loginSetup();
					if(AppFacade.isUserComingFromResults()) {
						jQuery("#menu").css("cssText","display: block !important;");
					}
					//popup = window.open('http://staging.againstourwill.org/schools/select', 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
		});
    },
    userModelReady: function(userModel) {
    
    },
    getCaptcha: function() {
    	var _v = sjcap();
		_v = _v + ".jpg";
		jQuery("#cap_img").attr("src", _v);
    },
	mtvRegister: function(){
		var self = this;
		if(window.location!="http://slaveryfootprint.org/signup/#signup"&&window.location!="http://www.slaveryfootprint.org/signup/#signup")
			popup = window.open('http://staging.againstourwill.org/schools/select', 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
		else
			popup = window.open('http://www.againstourwill.org/schools/select', 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
		window.addEventListener("message", self.receiveIframeMessage, false); 
	},
	receiveIframeMessage: function (data, callback) {
			/* 
		if(typeof data != "undefined"){
			AppFacade.userModel.set({"group_id": event.data.id });
			 if(AppFacade.userModel.get("login")){
			 	jQuery.ajax({
			 		"type": "PUT",
			 		"url":"/gateway/user",
			 		"data": JSON.stringify({ "group_name" : data.group_name}),
			 		"success": function(data){
			 			//console.log(data, "groups");
			 		}
			 	});
			 }
			 
			 else if(AppFacade.userModel.get("facebook_id")){
			 	jQuery.ajax({
			 		"type": "PUT",
			 		"url":"/gateway/user",
			 		"data": JSON.stringify({ "group_name" : data.group_name}),
			 		"success": function(data){
			 			//console.log(data, "groups");
			 		}
			 	});
			 }
			 else if(AppFacade.userModel.get("id")){
			 	jQuery.ajax({
			 		"type": "PUT",
					"url":"/gateway/user",
			 		"data": JSON.stringify({ "group_name" : data.group_name}),
			 		"success": function(data){
			 			//console.log(data, "groups");
			 		}
			 	});
			 }
			 else{
			 	jQuery.ajax({
			 		"type": "POST",
					"url":"/gateway/user",
			 		"data": JSON.stringify({"group_name" : data.group_name}),
			 		"success": function(data){
			 			//console.log(data, "groups");
			 		}
			 	});
			 
			 }
		
		} */
		//self.slug = data.group_name;
		self.slug = data.slug;
        callback();
    },
	receiveMessage: function(event){
		var self = this;
		if (event.origin !== "http://staging.againstourwill.org")  
          return;
        /* custom handler code here */
		if(typeof event != "undefined"){
//			//console.log(event.data);
			self.slug = event.data.slug;

			//AppFacade.userModel.set({"group_id": event.data.id });
			// if(AppFacade.userModel.get("login")){
			// 	jQuery.ajax({
			// 		"type": "PUT",
			// 		"url":"/gateway/user/current",
			// 		"data": JSON.stringify({ "group_name" : "hmu"}),
			// 		"success": function(data){
			// 			//console.log(data, "groups");
			// 		}
			// 	});
			// }
			// 
			// else if(AppFacade.userModel.get("facebook_id")){
			// 	jQuery.ajax({
			// 		"type": "PUT",
			// 		"url":"/gateway/user/current",
			// 		"data": JSON.stringify({ "group_name" : "hmu"}),
			// 		"success": function(data){
			// 			//console.log(data, "groups");
			// 		}
			// 	});
			// }
			// else{
			// 	jQuery.ajax({
			// 		"type": "POST",
			// 		"url":"/gateway/user/current",
			// 		"data": JSON.stringify({"id":AppFacade.userModel.get("id"), "group_name" : "hmu"}),
			// 		"success": function(data){
			// 			//console.log(data, "groups");
			// 		}
			// 	});
			// }
			

		}

	},
	processLogin: function(e){
		var self = this;
		var fullname = jQuery("#full_name").attr("value");
		
		jQuery.JSONCookie("sfp_name", {"name" : fullname}, {path: '/'});
		
		
		var email = jQuery("#email").attr("value");
		
		if(fullname == ""){
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Please enter a full name.");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
			return;
			
		}
		
		if(email == ""){
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Please enter an email address");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
			
			
			return
		}
		
		
		if(self.checked){
			var password = jQuery("#password").attr("value");
		}
				
		
		if(typeof password === "undefined"){
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Sorry but your passwords do not match");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
			return;
		}
		
		
		if(jcap()){
			//console.log('from results: ' + window.AppFacade.isUserComingFromResults());
			
			var isBlank = false;
			jQuery.ajax({
				"url" : "/gateway/user/current/",
				"type" : "GET",
				"async" : false,
				"success" : function(data){
					if(data.facebook_id == null && data.login == null) isBlank = true;
				}
			});
			
			//var regType = (window.AppFacade.isUserComingFromResults() && isBlank) ? "PUT" : "POST";
			//var regUrl = (window.AppFacade.isUserComingFromResults() && isBlank) ? "/gateway/user/current/" : "/gateway/user/";
			var regType = (isBlank) ? "PUT" : "POST";
			var regUrl = (isBlank) ? "/gateway/user/current/" : "/gateway/user/";
			//console.log(regType);
			

			
			group_name = (window.AppFacade.userModel.attributes.group_name != null && window.AppFacade.userModel.attributes.group_name != '') ? window.AppFacade.userModel.attributes.group_name : $.cookie("group_name");
			console.log('group name s1');
			console.log(window.AppFacade.userModel.attributes.group_name);
			console.log(group_name);
			//console.log('registering with: ' + regType + ' and url: ' + regUrl);
			
					jQuery.ajax({
						"url" : regUrl,
						"type" : regType,
						"data" : JSON.stringify({"login" : email, "password": password, "full_name": fullname,"group_name":group_name}),
						"success" : function(data){
									if(self.slug){
											jQuery.ajax({
												"type": "PUT",
												"url":"/gateway/user/current",
												"data": JSON.stringify({"group_name" : self.slug}),
												"success": function(data){
													var el = jQuery("<div>");
													jQuery("div.messages").remove();
													el.addClass("messages");
													jQuery(el).addClass("ok");
													jQuery(el).text("Thank you. You have signed up successfully.");
													jQuery(".signup_body").prepend(el);
													jQuery(el).slideDown(200);
		
													setTimeout(function(){
														jQuery(el).slideUp(200, function(){
															jQuery(el).remove();
															
															////console.log('l4');
															jQuery.ajax({
																"url":"/gateway/site/login",
																"type":"POST",
																"data" : JSON.stringify({"login":email,"password":password}),
																"success":function(data, status){
																	window.AppFacade.onLoggedIn();
																	return;
																},
																"error": function(data){
																	var el = jQuery("<div>");
																	jQuery("div.messages").remove();
																	el.addClass("messages");
																	jQuery(el).addClass("error");
																	jQuery(el).text("Sorry, but that email is already in our database. Please try another one.");
																	jQuery(".signup_body").prepend(el);
																	jQuery(el).slideDown(200);
													
													
																	setTimeout(function(){
																		jQuery(el).slideUp(200, function(){
																			jQuery(el).remove();
																		});
													
																	}, 10000);
																	return;
																}
															});
														});
		
													}, 3000);
												}
											});
									}else{
										//console.log('l5');
										jQuery.ajax({
											"url":"/gateway/site/login",
											"type":"POST",
											"data" : JSON.stringify({"login":email,"password":password}),
											"success":function(data, status){
												var el = jQuery("<div>");
												jQuery("div.messages").remove();
												el.addClass("messages");
												jQuery(el).addClass("ok");
												jQuery(el).text("Thank you. You have signed up successfully.");
												jQuery(".signup_body").prepend(el);
												jQuery(el).slideDown(200);
				
												setTimeout(function(){
													jQuery(el).slideUp(200, function(){
														jQuery(el).remove();
														window.AppFacade.onLoggedIn();
													});
				
												}, 3000);
												return;
											},
											"error": function(data){
												var el = jQuery("<div>");
												jQuery("div.messages").remove();
												el.addClass("messages");
												jQuery(el).addClass("error");
												jQuery(el).text("Sorry, but that email is already in our database. Please try another one.");
												jQuery(".signup_body").prepend(el);
												jQuery(el).slideDown(200);
																						
												setTimeout(function(){
													jQuery(el).slideUp(200, function(){
														jQuery(el).remove();
													});
												}, 10000);
												return;
											}
										});
									}
						},
						"error": function(data){
							var el = jQuery("<div>");
							jQuery("div.messages").remove();
							el.addClass("messages");
							jQuery(el).addClass("error");
							jQuery(el).text("Sorry, but that email is already in our database. Please try another one.");
							jQuery(".signup_body").prepend(el);
							jQuery(el).slideDown(200);
							
							setTimeout(function(){
								jQuery(el).slideUp(200, function(){
									jQuery(el).remove();
									
									//jQuery("#messages").addClass("error");
									//jQuery("#messages").text("");
								});
								
							}, 10000);
							
						}
						
					}, 10000);
		}else{
			
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Sorry, but the security check failed. Please enter the word correctly.");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
		
		}
	},
	confirmPasswords: function(e){
		var self = this;
		if(e.currentTarget.id == "password"){
			self.check1 = jQuery(e.currentTarget).attr("value");
		}else{
			self.check2 = jQuery(e.currentTarget).attr("value");
		}
		
		if((typeof self.check1 === "string") && (typeof self.check2 === "string")){
			
			if(self.check1 != ""){
				if(self.check2 != ""){
					if(self.check1 == self.check2){
						self.checked = true;
						return true;
					}else{
						self.checked = false;
						return;
					}
					
				}
			}
			
		}
		
	}
    
});

var CompareView = View.extend({
    template: jQuery("#compare"),
 
    maleSelected: false,
    femaleSelected: false,
    
    age0_15Selected: false,
    age15_25Selected: false,
    age25_30Selected: false,
    age30Selected: false,
        
    location1Selected: false,
    location2Selected: false,
 
    initialize: function(obj){
    
        //console.log("compare");
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;

		require(["/static/js/libs/jquery.path.js",  
		                "/static/js/libs/jquery.easing.1.3.js", 
		                "order!/static/js/libs/raphael-min.js",
						"order!/static/js/libs/g.raphael-min.js",
						"order!/static/js/libs/g.pie-min.js",
						"order!/static/js/libs/g.bar-min.js" ], function() {
					//AppFacade.getScore(self);		
                                                $("#twitter_feed").css("display","none");        
						if(!isUserLoggedIn()) {
							window.AppFacade.setUserComingFromResults(true);
							window.location = window.location.protocol + "//" + window.location.host + "/signup/#signup";
						}
					                  
						if(self.checkAdmin()){
							self.render();
							jQuery("#fine_tuning").hide();
							AppFacade.adjustHeight();
							self.createGraphs();
                            
							$("#scrollprompt_results").hide();
                            
						}else{
							setTimeout(function(){
								//if(self.checkAdmin()){
									
									self.render();
									jQuery("#fine_tuning").hide();
									AppFacade.adjustHeight();
									self.createGraphs();

									$("#scrollprompt_results").hide();

								//}else{
									////console.log('red. to signup 1');
									//window.location = "/signup/#signup";
								//}
							}, 1000);
						}

			        });
			        
			        AppFacade.fetchUser();
    },
    userModelReady: function(userModel) {
    
    },
    scrollHandler: function() {
				$(window).unbind("scroll.results");
    		$("#scrollprompt_results").fadeOut();
    },
	checkAdmin: function(){
		if(AppFacade.userModel.get("login")){
			return true;
		}else if(AppFacade.userModel.get("facebook_id")){
            
			return true;
		}else{
			return;
		}
	},
	createGraphs: function(){
		var self = this;
		/*var bar = Raphael("left_graph");
		var chart = bar.g.barchart(1, 1, 280, 186, [[10, 20, 10,40,50,20,70,10]], {gutter: "1%"}).attr({
			
			"fill": "#ec4a4a"
		});
		bar.g.txtattr.font = "22px 'Georgia', Georgia, serif";
		bar.g.txtattr["fill-opacity"] = .7;
		bar.g.text(45, 275, 10);
		bar.g.text(180, 275, "0");
		
		var bar = Raphael("right_graph");
		var chart = bar.g.barchart(1, 1, 280, 186, [[10, 20, 10,40,50,20,70,10]], {gutter: "1%"}).attr({
			
			"fill": "#30aec0"
		});
		bar.g.txtattr.font = "22px 'Georgia', Georgia, serif";
		bar.g.txtattr["fill-opacity"] = .7;
		bar.g.text(45, 275, 10);
		bar.g.text(180, 275, "0");       */
		
		//console.log(data);
        jQuery.ajax({
            "url":"/gateway/user/current",
            "type" : "GET",
            "success": function(data){
                if(data.location)
                {
                    jQuery("#location1").html(data.location);
                }
            }
        });
		
		jQuery("#male").click(function() {
            self.maleSelected = !self.maleSelected;
            
            if(self.maleSelected)
                self.femaleSelected = false;
            
            self.updateFields();
        });
        
        jQuery("#female").click(function() {
            self.femaleSelected = !self.femaleSelected;
            
            if(self.femaleSelected)
                self.maleSelected = false;
                
            self.updateFields();
        });
        
        jQuery("#age0_15").click(function() {
            self.age0_15Selected = !self.age0_15Selected;
            
            if(self.age0_15Selected)
            {
                self.age15_25Selected= false;
                self.age25_30Selected= false;
                self.age30Selected= false;
            }
            
            self.updateFields();
        });
        
        jQuery("#age15_25").click(function() {
            self.age15_25Selected = !self.age15_25Selected;
            
            if(self.age15_25Selected)
            {
                self.age0_15Selected= false;
                self.age25_30Selected= false;
                self.age30Selected= false;
            }
            
            self.updateFields();
        });
        
        jQuery("#age25_30").click(function() {
            self.age25_30Selected = !self.age25_30Selected;
            
            if(self.age25_30Selected)
            {
                self.age0_15Selected= false;
                self.age15_25Selected= false;
                self.age30Selected= false;
            }
            
            self.updateFields();
        });
        
        jQuery("#age30").click(function() {
            self.age30Selected = !self.age30Selected;
            
            if(self.age30Selected)
            {
                self.age0_15Selected= false;
                self.age15_25Selected= false;
                self.age25_30Selected= false;
            }
            
            self.updateFields();
        });
        
        jQuery("#location1").click(function() {
            if(jQuery("#location1").html() == "-")
                return;
        
            self.location1Selected = !self.location1Selected;
            
            if(self.location1Selected)
                self.location2Selected = false;
            
            self.updateFields();
        });

        jQuery("#location2").click(function() {
            self.location2Selected = !self.location2Selected;
            
            if(self.location2Selected)
                self.location1Selected = false;
            
            self.updateFields();
        });
		
        self.updateFields();
	},
    
    updateFields: function() {
        var self = this;
        
        jQuery("#male").removeClass().addClass("compare-gender_" + (self.maleSelected ? "on" : "off"));
        jQuery("#female").removeClass().addClass("compare-gender_" + (self.femaleSelected ? "on" : "off"));
        
        jQuery("#age0_15").removeClass().addClass("compare-small_" + (self.age0_15Selected ? "on" : "off"));
        jQuery("#age15_25").removeClass().addClass("compare-small_" + (self.age15_25Selected ? "on" : "off"));
        jQuery("#age25_30").removeClass().addClass("compare-small_" + (self.age25_30Selected ? "on" : "off"));
        jQuery("#age30").removeClass().addClass("compare-small_" + (self.age30Selected ? "on" : "off"));
        
        jQuery("#location1").removeClass().addClass("compare-large_" + (self.location1Selected ? "on" : "off"));
        jQuery("#location2").removeClass().addClass("compare-large_" + (self.location2Selected ? "on" : "off"));
        
        var otherArr = new Array();
        
        if(self.maleSelected)
            otherArr.push("Male");
        if(self.femaleSelected)
            otherArr.push("Female");
            
        if(self.age0_15Selected)
            otherArr.push("0-15");
        if(self.age15_25Selected)
            otherArr.push("15-25");
        if(self.age25_30Selected)
            otherArr.push("25-30");
        if(self.age30Selected)
            otherArr.push("30+");
            
        if(self.location1Selected)
            otherArr.push(jQuery("#location1").html());
        if(self.location2Selected)
            otherArr.push("World");
            
        if(otherArr.length == 0)
            otherArr.push("Other");
            
        jQuery("#otherLabel").html(otherArr.join(" / "));
        
        var data = new Array();
        
        if(self.maleSelected)
            data.push("\"gender\": \"male\"");
        if(self.femaleSelected)
            data.push("\"gender\": \"female\"");
            
        if(self.age0_15Selected)
            data.push("\"age\": \"0 and 16\"");
        if(self.age15_25Selected)
            data.push("\"age\": \"14 and 26\"");
        if(self.age25_30Selected)
            data.push("\"age\": \"24 and 31\"");
        if(self.age30Selected)
            data.push("\"age\": \"29 and 99\"");
            
        if(self.location1Selected)
            data.push("\"location\": \"" + jQuery("#location1").html() + "\"");
        //if(self.location2Selected)
            //data.push("\"age\": \"World\"");
        
        //console.log(data.join(", "));
        
        jQuery.ajax({
            "url":"/gateway/score/totalquestionscompare",
            "type" : "POST",
            "data": "{" + data.join(", ") + "}",
            "success": function(data){
                ////console.log(data);
                
                var sum = 0;
                var questionValues = new Array();
                
                for(var i = 3; i <= 10; i++)
                    questionValues[i] = 0;
                
                for(var i = 0; i < data.others.length; i++)
                {
                    var item = data.others[i];
                    sum += parseInt(item.slavery_score);
                }
                            
                for(var i = 0; i < data.others.length; i++)
                {
                    var item = data.others[i];   
                    
                    questionValues[item.question_id] = item.slavery_score;
                    
                    if(Math.round(item.slavery_score / sum * 100) > 0)
                    {
                        /*jQuery("#bar_right_" + item.question_id).css("width", Math.round(item.slavery_score / sum * 260) + "px");
                        jQuery("#bar_right_" + item.question_id).css("background", "#ec4a4b");
                        jQuery("#bar_right_" + item.question_id).html(Math.round(item.slavery_score / sum * 100));*/
                        
                        jQuery("#bar_right_" + item.question_id).css("width", Math.round(item.slavery_score / sum * 260) + "px");
                        jQuery("#bar_right_" + item.question_id).css("background", "#ec4a4b");
                        jQuery("#bar_right_" + item.question_id).html(item.slavery_score);
                    }
                    else
                    {
                        jQuery("#bar_right_" + item.question_id).css("width", "20px");
                        jQuery("#bar_right_" + item.question_id).css("background", "#f4cfc9");
                        jQuery("#bar_right_" + item.question_id).html("N/A");
                    }
                }
                
                for(var i = 3; i <= 10; i++)
                {
                    if(questionValues[i] == 0)
                    {
                        jQuery("#bar_right_" + i).css("width", "20px");
                        jQuery("#bar_right_" + i).css("background", "#f4cfc9");
                        jQuery("#bar_right_" + i).html("N/A");
                    }
                }
                
                // self
                
                var sum = 0;
                var questionValues = new Array();
                
                for(var i = 3; i <= 10; i++)
                    questionValues[i] = 0;
                
                for(var i = 0; i < data.me.length; i++)
                {
                    var item = data.me[i];
                    sum += parseInt(item.slavery_score);
                }
                            
                for(var i = 0; i < data.me.length; i++)
                {
                    var item = data.me[i];   
                    
                    questionValues[item.question_id] = item.slavery_score;
                    
                    if(Math.round(item.slavery_score / sum * 100) > 0)
                    {
                        jQuery("#bar_left_" + item.question_id).css("width", Math.round(item.slavery_score / sum * 260) + "px");
                        jQuery("#bar_left_" + item.question_id).css("background", "#30aec0");
                        //jQuery("#bar_left_" + item.question_id).html(Math.round(item.slavery_score / sum * 100));
                        jQuery("#bar_left_" + item.question_id).html(item.slavery_score);
                    }
                    else
                    {
                        jQuery("#bar_left_" + item.question_id).css("width", "20px");
                        jQuery("#bar_left_" + item.question_id).css("background", "#c9e6e4");
                        jQuery("#bar_left_" + item.question_id).html("N/A");
                    }
                }
                
                for(var i = 3; i <= 10; i++)
                {
                    if(questionValues[i] == 0)
                    {
                        jQuery("#bar_left_" + i).css("width", "20px");
                        jQuery("#bar_left_" + i).css("background", "#c9e6e4");
                        jQuery("#bar_left_" + i).html("N/A");
                    }
                }
                
                ////console.log("sum=" + sum)
            }
        });
    }
    
});


var ProgressView = View.extend({
    template: jQuery("#progress"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
        
        
        self.admin();
		
		require(["/static/js/libs/jquery.path.js",  
		                "/static/js/libs/jquery.easing.1.3.js", 
		                "order!/static/js/libs/raphael-min.js",
						"order!/static/js/libs/g.raphael-min.js",
						"order!/static/js/libs/g.pie-min.js",
						"order!/static/js/libs/g.bar-min.js" ], function() {
							
          if(!isUserLoggedIn()) {
          	window.location = window.location.protocol + "//" + window.location.host + "/signup/#signup";
          }
          
          if (AppFacade.feedLoaded || AppFacade.feedLoaded == false) {
              AppFacade.feedLoaded = true;
          } else {
              AppFacade.feedLoaded = false;
          }
          
					if(self.checkAdmin()){
						AppFacade.getScore(self);
						self.render();
						jQuery("#fine_tuning").hide();


						jQuery("#scrollprompt_results").hide();							
						
						if (!AppFacade.feedLoaded) {

								jQuery(document).ready(function() {
												jQuery(function($) {
																jQuery("#twitter_feed").tweet({
																				avatar_size : 32,
																				count : 50,
																				query: "#slaveryfootprint",
																				template : "{text} "
																});
																jQuery("#twitter_feed").css("display","block"); 
												}).bind("loaded", function() {
																jQuery(this).find("a.tweet_action").click(function(ev) {
																				window.open(this.href, "Retweet", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400');
																				ev.preventDefault();
																});
																jQuery("ul.tweet_list").liScroll();
												});
								});
						} else {
							jQuery("#twitter_feed").css("display","block");    			
						}
						
						AppFacade.adjustHeight();
						self.getActivityFeed();
					}else{
                        
								AppFacade.getScore(self);
								self.render();
								jQuery("#fine_tuning").hide();

								jQuery("#scrollprompt_results").hide();							
								
								if (!AppFacade.feedLoaded) {

									$(document).ready(function() {
													jQuery(function($) {
																	jQuery("#twitter_feed").tweet({
																					avatar_size : 32,
																					count : 50,
																					query: "#slaveryfootprint",
																					template : "{text} "
																	});
																	jQuery("#twitter_feed").css("display","block");        
													}).bind("loaded", function() {
																	jQuery(this).find("a.tweet_action").click(function(ev) {
																					window.open(this.href, "Retweet", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400');
																					ev.preventDefault();
																	});
																	jQuery("ul.tweet_list").liScroll();
													});
									});
								} else {
									jQuery("#twitter_feed").css("display","block");    					
								}
								
								AppFacade.adjustHeight();
								self.getActivityFeed();
					}
				
                             
                                
		        });
		
		AppFacade.fetchUser();
					
		
		var first = self.getUrlVars()["done"];
        
        if (typeof(first) != "undefined") {
			AppFacade.registerLetter();
        }
    },
    userModelReady: function(userModel) {
    	if(userModel.attributes.full_name) {
    		if (AppFacade.publicProfile == true) {
	        	var firstName = userModel.attributes.full_name.split(/\b/)[0];
	        	jQuery('#progress_headline').text(firstName+"'s Progress");
        	}
        }
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
	},
    checkAdmin: function(){
                         
        if(AppFacade.userModel.get("login")){
            return true;
        }else if(AppFacade.userModel.get("facebook_id")){
            
            return true;
        }else{
            return;
        }
    },

	getActivityFeed: function(){
		var self = this;
		// var o = $.JSONCookie("sfp_activity_feed");
		// if(o){
		// 	self.processActivityFeed(o.feed);
		// }
		
		
		jQuery.ajax({"url":"/gateway/score/feed","type":"GET","success":function(data){self.processActivityFeed(data);}});
		
		
		
	},
	processActivityFeed: function(data){
		var self = this;
		data = data.reverse();
                self.changeDisplayFeed("none");
		for(var i=0;i<data.length;i++){
			var el = data[i].data;
			var order = i+1;
			if(typeof data[i].data != "undefined"){
				self.createActivityFeedDisplay(order,el);
			}
			
		}
               
	},
        changeDisplayFeed: function (state) {
            jQuery("#activity_one").css("display",state);
            jQuery("#activity_two").css("display",state);
            jQuery("#activity_three").css("display",state);
            jQuery("#activity_four").css("display",state);
            jQuery("#activity_five").css("display",state);
        },
	createActivityFeedDisplay: function(order, el){
		var self = this;
		// id="activity" 
		// <div rel="up" id="activity_one" class="progress-twitter_up"><span>11/07/11</span>		</div>
		var clss = "progress-"+el.type;
		switch(order){
			case 1:
				var element = jQuery("#activity_one");
				clss = clss + "_up";
				break;
			case 2:
				var element = jQuery("#activity_two");
				clss = clss + "_up";
				break;
			case 3:
				var element = jQuery("#activity_three");
				clss = clss + "_down";
				break;
			case 4:
				var element = jQuery("#activity_four");
				clss = clss + "_down";
				break;
			case 5:
				var element = jQuery("#activity_five");
				clss = clss + "_down";
				break;
		}
		element.css("display","block");
		element.removeClass();
		element.addClass(clss);
		element.find("span").text(el.date)
		
		
	},
	pointsCB: function(data){
		var self = this;
		var score = parseInt(data.score);
		if(isNaN(score)){
			score = 0;
		}
		
		self.freeworld = score;
		self.createGraphs();
	},
        
	scoreCB: function(slaves){
                 var self = this;
		self.slaves = Math.ceil(slaves);
		AppFacade.freeworldPoints(self);
                AppFacade.userSlaves = slaves;
        },
	createGraphs: function(){
		var self = this;
		var bar = Raphael("you_everyone_graph");
		var max = Math.max(self.slaves, self.freeworld);
		var chart = bar.g.barchart(1, 1, 280, 320, [[self.slaves, self.freeworld]], 0, {type: "sharp"});
		bar.g.txtattr.font = "22px 'Georgia', Georgia, serif";
		bar.g.txtattr["fill-opacity"] = .7;
		bar.g.text(45, 275 - (max?(225*self.slaves/max):0), self.slaves);
		bar.g.text(180, 275 - (max?(225*self.freeworld/max):0), self.freeworld);
		var count = 0;
		
		chart.each(function(){
			
			if(count == 0){
				this.bar.attr({
					"fill" : "#30aec0"
				});
				bar.rect(this.attrs.x,this.attrs.height-2,this.attrs.width-2,2).insertAfter(this.bar).attr({
					"fill" : "#30aec0",
					"stroke": "none"
				});				
				bar.rect(this.attrs.x,this.attrs.y,this.attrs.width-2,2).insertAfter(this.bar).attr({
					"fill" : "#30aec0",
					"stroke": "none"
				});
			}else{
				this.bar.attr({
					
					"fill": "#ec4a4a"
				});
				bar.rect(this.attrs.x,this.attrs.height-2,this.attrs.width-2,2).insertAfter(this.bar).attr({
					"fill" : "#ec4a4a",
					"stroke": "none"
				});
				bar.rect(this.attrs.x,this.attrs.y,this.attrs.width-2,2).insertAfter(this.bar).attr({
					"fill" : "#ec4a4a",
					"stroke": "none"
				});
	
			}
			count++;
		});
	  
	}
    
});

var ScoreView = View.extend({
    template: jQuery("#scores"),
  events: {
  	"click #mtv_popup" : "mtvRegister"
  },
	locations: {},
	sortedList: [],
	countries: [],
	limit: 18,
    initialize: function(obj){
	
	if (AppFacade.getUrlVars()["user"]) {
                   AppFacade.publicProfile = true;
                   AppFacade.publicProfileId= AppFacade.getUrlVars()["user"];
        }
        var self = this;
	    
        self.data = {};
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		require(["/static/js/libs/jquery.path.js",  
		                "/static/js/libs/jquery.easing.1.3.js", 
		                "order!/static/js/libs/raphael-min.js",
		         		"order!/static/js/libs/results_map.js",
						"order!/static/js/libs/g.raphael-min.js",
						"order!/static/js/libs/g.pie-min.js",
						"order!/static/js/libs/g.bar-min.js",
		         		"/static/js/json.models/results_map.js",], function() {
		            self.calculateScore();	
					self.render();
                    jQuery("#twitter_feed").css("display","none");    	
					jQuery("#fine_tuning").show();
					AppFacade.adjustHeight();
					self.resultsMap = new ResultsMap();
					self.checkFacebook();
					
					if($(window).height()<$(document).height()) {
						$("#scrollprompt_results").show();
					} else {
						$("#scrollprompt_results").hide();							
					}
					$(window).unbind("scroll.results").bind("scroll.results",self.scrollHandler); 
					
					setTimeout(function() {
					
						self.beforeAnimation();
						
						jQuery('#mtv_popup').click(function(){
							self.mtvRegister();
						});
					
					}, 1400);
			});
		        
        // self.calculateScore();
        // self.data = {};
        // self.pageID = obj.pageID;
        // self.templateID = obj.templateID;
        // self.render();
        //self.fineTuneToggle();
        
        self.processCountries();
        
    },
    beforeAnimation: function() {
    	var self = this;
    	
    	jQuery.ajax({
			"url": (AppFacade.publicProfile ? "/gateway/user/uuid/" + AppFacade.publicProfileId : "/gateway/user/current"),
			"type" : "GET",
			"success": function(data){
				//console.log(data);
												 
				if(data.id != null && data.full_name == null && data.facebook_id == null){
					//console.log('showing registration prompt');
					var o = jQuery.JSONCookie("signup_later");
					
					
					jQuery("#you_facebook img").click(function() {
						/*window.AppFacade.setUserComingFromResults(true);
						////console.log('red. to signup 3');
						
						if (!FB.init && AppFacade.userModel.get("email") == null) {
							//manually signed up user
							window.location = window.location.protocol + "//" + window.location.host + "/signup/?merge#signup";
						} else {
							//blank user
							window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
						} */
						
						window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
                        
                        //toggleFacebookLogin();
					});
					
					jQuery("#popup_signup").click(function() {
						AppFacade.setUserComingFromResults(true);
						setTimeout(function() {
							window.location = window.location.protocol + "//" + window.location.host + "/signup/#signup";
						}, 750);
					});
					
					//if(!o.signup_later){
						jQuery("#overlay").css("display", "none");
			           	jQuery("body").addClass("overlay_on");
			           	jQuery("#overlay").fadeIn(500);
						jQuery("#results_popup").css("display", "block");
					//};
					
					jQuery("#no_thanks").click(function(){
						jQuery("#overlay").css("display", "none");
			           	jQuery("body").removeClass("overlay_on");
			           	jQuery("#overlay").fadeOut(500);
						jQuery("#results_popup").css("display", "none");
						AppFacade.setUserComingFromResults(true);
						
						jQuery.JSONCookie("signup_later", {"signup_later" : true}, {path: '/'});
					});
				} else {
				
					if (AppFacade.publicProfile == true) {
				        
				        jQuery('#slave_name').text(data.full_name +  " has");
				        var text =  jQuery('#slave_header').html();
				        jQuery('#slave_header').html(text.replace("You",(data.gender == 'male' ? 'Him' : 'Her')));
				        text = jQuery('#graphs #you_facebook h3').html();
				        jQuery('#graphs #you_facebook h3').html(text.replace("you",data.full_name));
				        text = jQuery('#you_everyone_you_label').html();
				        jQuery('#you_everyone_you_label').html(text.replace("You",data.full_name));
				        jQuery('#top_5 p').remove();
				        jQuery('#next_step').remove();
				        text = jQuery('#top_5 h3').html();
				        jQuery('#top_5 h3').html(text.replace("my",data.full_name+"'s "));
				
				     }
					
				}
				
			}
		});
    	
    	

    },
    userModelReady: function(userModel) {
    
    },
    scrollHandler: function() {
				$(window).unbind("scroll.results");
    		$("#scrollprompt_results").fadeOut();
    },
	mtvRegister: function(){
		var self = this;
		if(window.location!="http://slaveryfootprint.org/results/#results"&&window.location!="http://www.slaveryfootprint.org/results/#results")
			popup = window.open('http://staging.againstourwill.org/schools/select', 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
		else
			popup = window.open('http://www.againstourwill.org/schools/select', 'selector', 'width=600,height=350,toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0');
			//window.addEventListener("message", self.receiveIframeMessage, false); 
		},    
    calculateScore: function(){
        var self = this;
        AppFacade.getScore(self);
        AppFacade.getTop5(self);
        //jQuery("#score_total").text(AppFacade.userScore);
    },
    render: function(callback, ref){
        var self = this;
		
		var obj = {
            "user" : AppFacade.userModel.attributes,
            "survey" : AppFacade.survey.attributes,
            "score" : AppFacade.score,
            "tags" : AppFacade.tags
        }
        
        jQuery(this.el).html(this.template.tmpl(obj));
				self.registerShares();
				AppFacade.getCount();
        return this;
    },
    scoreCB: function(slaves){
        var self = this;
		self.slaves = Math.ceil(slaves);
                self.data.slaves = Math.ceil(slaves);
		jQuery("#slave_score").text(self.data.slaves);
		AppFacade.userSlaves = self.data.slaves;
		AppFacade.userPoints = AppFacade.userModel.attributes.freeworld_score;
		if (AppFacade.userModel.attributes.freeworld_score == null) {
			AppFacade.userPoints = 0;
		}
		AppFacade.getQuestionsScores(self.getQuestions, self);
    },
	getQuestions: function(Mscore){
		var self = this;

		self.score = Mscore;
		self.getEveryOne();
		
	},
	getEveryOne: function(){
		var self = this;
		jQuery.ajax({
			"url": (AppFacade.publicProfile ? "/gateway/user/compare/everyoneuuid/" + AppFacade.publicProfileId : "/gateway/user/compare/everyone"),
			"type" : "GET",
			"success" : function(data){
				self.everyOne = data.everyone.slavery;
				self.createGraphs();
			}
		});
		
		
	},
    top5CB: function(top5){
		
        var self = this;
        self.data.top5 = top5;
		self.latlng = {};
		for(var item in self.data.top5){
			var current = self.data.top5[item];
			var locations = current.locations;
			var question_id = current.question_id;
			
			var rel = parseInt(item)+1;
			if(!isNaN(rel)){
				jQuery("#top_5_items div[rel="+rel+"] span em").text(current.product_name)
			}
			
			if(typeof self.question_ids[question_id] === "string"){
				jQuery("#top_5_items div[rel="+rel+"] h4").text(self.question_ids[question_id])
				if (jQuery("#top_5_items div[rel="+rel+"] h4").text() == "Gadgets") {
					//console.log(jQuery("#top_5_items div[rel="+rel+"] h4").text("Electronics"));
				}
				jQuery("#top_5_items div[rel="+rel+"]").addClass(self.question_ids[question_id]);
			}
			
			for(var loc in locations){
				if(typeof locations[loc].location_id != "undefined"){
					if(typeof self.locations[locations[loc].location_id] === "undefined"){
						self.locations[locations[loc].location_id] = parseFloat(locations[loc].slave_hours);
						self.latlng[locations[loc].location_id] = {"lat" : locations[loc].lat, "lng": locations[loc].lng};
						
					}else{
						self.locations[locations[loc].location_id] = self.locations[locations[loc].location_id] + parseFloat(locations[loc].slave_hours);
					}
				}
			}
		}
		

		
		var array = _.toArray(self.locations);
		array = array.sort().reverse();
		if(array.length >= self.limit){
			array.splice(self.limit);
		}
		for(var i=0; i<array.length;i++){
			_.map(self.locations, function(num, key){if(num === array[i]){self.sortedList.push([key,num]);}});
		}

		for(var i=0; i<self.sortedList.length;i++){
			//self.getCountryLatLng(self.sortedList[i][0], self.sortedList[i][1]);
			
			self.countries.push({city: self.sortedList[i][0], score: self.sortedList[i][1], id: self.sortedList[i][0], latitude: parseInt(self.latlng[self.sortedList[i][0]].lat), longitude: parseInt(self.latlng[self.sortedList[i][0]].lng)});
			
			
		}
		self.processCountries();
		
    },
	getCountryLatLng: function(country, score){
		
		var self = this;
		
			jQuery.ajax({
	            "type": "GET",
	            "dataType": "json",
	            "url": "http://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20geo.placefinder%20where%20country%3D%22"+country+"%22&diagnostics=true",
	            "success": function(data) {
					
					self.countries.push({city: data.query.results.Result.country, score: score, id: country, latitude: data.query.results.Result.latitude, longitude: data.query.results.Result.longitude});
					if(self.countries.length === self.limit){
						self.processCountries();
					}
	            }
	        });
	},
	processCountries: function(){
		var self = this;
		for(var i=0;i<self.countries.length;i++){
			self.resultsMap.drawMarker(self.countries[i]);
		}
		
	},
	checkFacebook: function(){
		
		var self = this;

		
		jQuery.ajax({"type":"GET", 
                            "url": (AppFacade.publicProfile ? "/gateway/user/Compare/Friendsuuid/" + AppFacade.publicProfileId : "/gateway/user/compare/friends"), 
                            "success":function(data){
                            
			 
			
			if(!data){
			
					FB.getLoginStatus(function(response){
						if (response) {
							var loginStatus = response.status;
							
							if (typeof(loginStatus) === "undefined") {
				
								//not logged in to facebook
			                    //jQuery("#you_facebook_graph").click(
			                    //        function () {toggleFacebookLogin();}
			                    //);
			                    jQuery("#you_facebook_graph").click(function(e) {
								        window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
								});
			                    
								jQuery("#you_facebook_graph").html("<img src='/static/css/img/results/facebook_notification.png' style='margin-left:50px; margin-top:5px;' />");
								
							} else if (loginStatus == "connected") {
								
								//logged into facebook but no friends completed
			                    //jQuery("#you_facebook_graph").click(
			                    //        function () {toggleFacebookLogin();}
			                    //);
			                    jQuery("#you_facebook_graph").click(function(e) {
								        window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
								});
			                    
			                    
			                    jQuery("#you_facebook_graph").html("<img src='/static/css/img/results/facebook_notification_logged_in.png' style='margin-left:50px; margin-top:5px;'/>");
							}
						}
					});

				
			}else{
				var pie = Raphael("you_facebook_graph");
					  //var pchart = pie.g.piechart(20, 20, 20, [20,20,20,20,20]).attr({"fill":color,"stroke-width": 0, "opacity": 0});


				var ara1 = [];
				var names = [];


				var _score = 0;



				for(var item in data){




					if(typeof data[item].slavery_points === "number"){
						ara1.push(data[item].slavery_points);
						_score = _score + data[item].slavery_points;
						//names.push(data[item].full_name);
					}

				}



				var _ara = [];

				for(var item in ara1){

					var amount = ara1[item]/_score;


					if(!isNaN(amount*100)){
						_ara.push(amount*100);
					}

				}



				var bchart = pie.g.piechart(190, 100, 100, _ara).attr({"stroke-width": 0});
				var count = 0;
				var colorArr = ["31afc0","e84a4e","fec500","251d13","603813","fde8a7","f6931e","22b472","c0272e","d9d4d0","163053","f75686","f44723","b0dec3"];
				bchart.each(function(i){




				//this.sector.title(names[i]);
				this.sector.attr({
					"fill": "#"+colorArr[count]
				})
				count++;
					  });
			}

			
			
		},"error": function(data){
					var json = jQuery.parseJSON(data.responseText);
					if (json.val == false) {
						//not logged in to facebook
	                    //jQuery("#you_facebook_graph").click(
	                     //       function () {toggleFacebookLogin();}
	                    //);
	                    jQuery("#you_facebook_graph").click(function(e) {
						        window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
						});
	                    
						jQuery("#you_facebook_graph").html("<img src='/static/css/img/results/facebook_notification.png' style='margin-left:50px; margin-top:5px;'/>");
					}
			
					FB.getLoginStatus(function(response){
						if (response) {
							var loginStatus = response.status;
							
							if (typeof(loginStatus) === "undefined") {
								//logged into facebook but no friends completed
								
			                    //jQuery("#you_facebook_graph").click(
			                    //        function () {toggleFacebookLogin();}
			                    //);
			                    jQuery("#you_facebook_graph").click(function(e) {
								        window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
								});
			                    
								//not logged in to facebook
								jQuery("#you_facebook_graph").html("<img src='/static/css/img/results/facebook_notification.png' style='margin-left:50px; margin-top:5px;'/>");
								
							} else if ( loginStatus == "connected"){
							
								//logged into facebook but no friends completed
								
			                    //jQuery("#you_facebook_graph").click(
			                    //        function () {toggleFacebookLogin();}
			                    //);
			                    jQuery("#you_facebook_graph").click(function(e) {
								        window.location = window.location.protocol + "//" + window.location.host + "/signup/#login";
								});
			                    
			                    
								//logged into facebook but no friends completed
			                    jQuery("#you_facebook_graph").html("<img src='/static/css/img/results/facebook_notification_logged_in.png' style='margin-left:50px; margin-top:5px;' />")
							}
						} 
					});
			
		
		}});
		
	},
	createGraphs: function(){
		var self = this;
		var bar = Raphael("you_everyone_graph");
		if(typeof self.everyOne != "undefined"){
			var chart = bar.g.barchart(1, 1, 300, 220, [[self.slaves, self.everyOne]], 0, {type: "sharp"});
			
		}
		bar.g.txtattr.font = "22px 'Georgia', Georgia, serif";
		bar.g.txtattr["fill-opacity"] = .7;
		bar.g.text(45, 175, self.slaves);
		bar.g.text(180, 175, Math.floor(self.everyOne));
		var count = 0;
		
		chart.each(function(){
			
			if(count == 0){
				this.bar.attr({
					"fill" : "#ec4a4a"
				})
			}else{
				this.bar.attr({
					
					"fill": "#30aec0"
				})
	
			}
			count++;
		});
		

	    //console.log(self.score);
	
        //console.log("Start:");
        var max = 0;
        for(var item in self.score)
        {
            //console.log(self.score[item]);
            if(!isNaN(self.score[item]) && self.score[item] > max && !isNaN(item))
                max = self.score[item];
        }
    
        //console.log("Max: " + max);
    
		for(var item in self.score)
		{
            //console.log(self.score[item]);
        
			if(!isNaN(parseInt(self.score[item]))){
				var factor = item/self.score["total"];
				//var amt = 110*factor;
                //console.log(item + ": " + self.score[item] + " - " + self.score[item] / max);
                var amt = 100 * self.score[item] / max;
				jQuery("#top_5_graph span[data-question="+item+"]").css("width", Math.floor(amt) + "px");
			}
		}
	  
	}
});

var FineTuningView = View.extend({
    el: jQuery("#fine_tuning_content"),
    template: jQuery("#fine_tuning_tmpl"),
    events: {
        "click .minus" : "minusItem",
        "click .plus" : "plusItem"
    },
    initialize: function(){
        var self = this;
        self.data = {};
        
        self.render();
        
        jQuery('#fine_tune_close').hide();
        
        require(
        		
        		["/static/js/libs/jquery.path.js",  
                 "/static/js/libs/jquery.easing.1.3.js",
				 "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js",
                "/static/js/libs/jquery.jscrollpane.min.js", 
        		"/static/js/libs/jquery.mousewheel.js"], 
        	
            
            
        	function(){
		    jQuery(window).resize(function(){
	            jQuery('#fine_tune_items').css('height',''+window.innerHeight - 160+'px');
	            jQuery('#fine_tune_items').jScrollPane();
	        });
		});
		
		jQuery("#overlay").click(function() {
			AppFacade.closeFineTuning();
		})
        
        jQuery('#refine_link').click(function(){
			//set 'refine mode' cookie, redirect.
			jQuery.cookie("refine_mode", true, {expires: 1, path: '/'});
			setTimeout('window.location = window.location.protocol + "//" + window.location.host + "/survey/#do_you_have_children"', 500);
		})
		
        jQuery("#fine_tune_link").click(function(){ 
			
			
			if (self.active == false || typeof(self.active) === "undefined") { //FINE TUNING OPEN
	            self.active = true;
                
                
	            
	           if (AppFacade.turnOnClear) AppFacade.clearbool = 1;
                   else AppFacade.clearbool = 0;
				//console.log("clearbool 0");
	            
	           window.AppFacade.page5Check = true;
	            
	            jQuery('#fine_tuning').animate({left:'0'},600);
	            jQuery('#fine_tune_items').css('height',''+document.documentElement.clientHeight - 160+'px');
                
				
						AppFacade.saveSurvey(true);
						jQuery('#fine_tune_items').css("backgroundImage","");
						jQuery('#fine_tune_items li').hide();
						
	       		jQuery('#overlay').fadeIn(200)
		    		jQuery("#go_deeper_bs").css("display","none");
	
                jQuery('#fine_tune_items').jScrollPane();
	            jQuery('#fine_tune_open').css('display','none');
	            jQuery('#fine_tune_close').fadeIn(1000);
                
				
	            
	        } else { //FINE TUNING CLOSE
	        
	            self.active = false;
	            
	            jQuery('#fine_tuning').animate({left:'-390'},600);
	            jQuery('#fine_tune_close').css('display','none');
	            jQuery('#fine_tune_open').fadeIn(1000);
	            
	           	jQuery('#overlay').fadeOut(200)
	        }	
	   
                
        })
    },
    userModelReady: function(userModel) {
    
    },
    checkScore: function(val, ref, rel){
		var self = this;
		
		
		//if((val >= 0) && (val <=3  )){
			//self.scores[ref] = 0;
			//jQuery("#"+ref+"_box").text(self.scores[ref]);
            jQuery("."+ref+"_box").text(val+'%');
            self.sliderChange(rel, val);
            
		//}
    },
    minusItem: function(e){
        var self = this;
        var ref = jQuery(e.currentTarget).attr("rel");
        var length = jQuery(e.currentTarget).parent().find(".count").text();
		length = parseInt(length);
        
        var min_val_input_obj = $('#fine_tuning_content').find('.controls_min_val:eq(0)');
        var min_val = $(min_val_input_obj).length ? $(min_val_input_obj).val() : 0;

        if(length > min_val){
            length--;
            
			jQuery(e.currentTarget).parent().find(".count").text(length);
	        
	        jQuery.ajax(
	            {
	                "url" : "/gateway/score/product/"+ref,
	                "type" : "DELETE" ,
	                "data" : JSON.stringify({"question_id": AppFacade.currentView.pageID}),
	                "success" : function(data){
	                }
	            });
	            
	        AppFacade.clearbool = 0;
        }       
    },
        sliderChange: (function(rel, val){
            //alert('success');
        var self = this;
        //var ref = "45";
        //var length = jQuery(e.currentTarget).parent().find(".count").text();
        //var length = 5;
		var length = 0;
		length = parseInt(length);
		
		//var max_val_input_obj = $('#fine_tuning_content').find('.controls_max_val:eq(0)');
        //var max_val = $(max_val_input_obj).length ? $(max_val_input_obj).val() : 100;
		var max_val = 100;
		
		if (length < max_val) {
			length++;
			
	        //jQuery(e.currentTarget).parent().find(".count").text(length);
	        
	        jQuery.ajax(
	            {
	                "url" : "/gateway/score/slider/"+rel+"/"+val,
	                "type" : "POST" ,
	                "data" : JSON.stringify({"question_id": AppFacade.currentView.pageID}),
	                "success" : function(data){
							//Ready.
							//console.log("Item was added - ready to reshow items!");
							//console.log(data);
	                }
	            });
	            
	        AppFacade.clearbool = 0;
		}
        
        //console.log(ref);
    }),
    plusItem: function(e){
        var self = this;
        var ref = jQuery(e.currentTarget).attr("rel");
        var length = jQuery(e.currentTarget).parent().find(".count").text();
		length = parseInt(length);
		
		var max_val_input_obj = $('#fine_tuning_content').find('.controls_max_val:eq(0)');
        var max_val = $(max_val_input_obj).length ? $(max_val_input_obj).val() : 100;
		
		if (length < max_val) {
			length++;
			
	        jQuery(e.currentTarget).parent().find(".count").text(length);
	        
	        jQuery.ajax(
	            {
	                "url" : "/gateway/score/product/"+ref,
	                "type" : "POST" ,
	                "data" : JSON.stringify({"question_id": AppFacade.currentView.pageID}),
	                "success" : function(data){
							//Ready.
							//console.log("Item was added - ready to reshow items!");
							//console.log(data);
	                }
	            });
	            
	        AppFacade.clearbool = 0;
		}
        
        //console.log(ref);
    },
    filterByPageID: function(id, data){
        var self = this;
        var array = [];
        
        jQuery(data).each(function(){
            if(this.get("question_id") == id){
                array.push(this);
            }
        });
        var obj = {"tags": array};
        
        if(id == 5) {
        	//#whats_on_your_plate
        	obj.additional_text = "On a scale of 1 to 5 how often do you consume these items?<br />0 = never, 5 = all the time";
        }
        
        self.populateAndRender(obj);
    },
    populateAndRender: function(obj){
        var self = this;
        jQuery('#fine_tune_items,#fine_tune_top_text').empty();
		var pageId = 0;
		try {
			pageId = AppFacade.currentView.pageID;
		} catch(e) {}
        if(pageId == 5) {
        	//#whats_on_your_plate
        	obj.additional_text = 'On a scale of 0 to 5 how often do you consume these items?<br />0 = never, 5 = all the time<input type="hidden" class="controls_min_val" value="0" /><input type="hidden" class="controls_max_val" value="5" />';
        	var new_tags = [];
        	if(obj.tags.length) {
        		var categories = obj.tags[0].attributes;
        		jQuery.each(categories,function(name,category) {
        			var caption;
        			switch(name) {
        				case "grains":
        					caption = "Grains and Nuts";
        					break;
        				case "vegetables":
        					caption = "Fruits and Veggies";
        					break;
        				case "meat":
        					caption = "Meat and Poultry";
        					break;
        				case "seafood":
        					caption = "Fish and Seafood";
        					break;        				
        				case "dairy":
        					caption = "Dairy, Eggs";
        					break;
        				case "beverages":
        					caption = "Beverages";
        					break;
        				default:
        					caption = "Other";
        					break;
        			}
        			new_tags.push({attributes: {category_name: name, category_caption: caption}});
        			jQuery.each(category,function(i,item) {
        				new_tags.push({attributes: item});
        			});
        		});
        		obj.tags = new_tags;
        	}
        } else {
            //obj.additional_text = 'On a scale of 0 to 5 how often do you consume these items?<br />0 = never, 5 = all the time<input type="hidden" class="controls_min_val" value="0" /><input type="hidden" class="controls_max_val" value="5" />';
        }


        self.data = obj;
        
        for(var i = 0; i< obj.tags.length; i++)
        {
            if(obj.tags[i].attributes.product_name == "Fair Trade")
            {
                var slider_value = obj.tags[i].attributes.amount;
                break;
            } else
            {
                var slider_value = 0;
            }
        }

        self.render();
        
        if (jQuery('#fine_tune_items')) {
        	jQuery('#fine_tune_items').css("backgroundImage","none");
	        jQuery('#fine_tune_items').css('height',''+document.documentElement.clientHeight - 160+'px');
	        jQuery('#fine_tune_items').jScrollPane();
		}
        jQuery( "#diamonds_slider_scope1" ).slider({
            orientation: "horizontal",
            range: "max",
            max: 100,
            min: 0,
            value: slider_value,
			slide: function( event, ui ) {
				var value = ui.value;
                //var rel = jQuery("#diamonds_slider_scope1").attr("rel");
				var amt = (152 * (value/100));
				jQuery("#diamonds_slider_scope_progress1").css("width", amt + "px");
				//self.checkScore(value, "diamonds1", rel);
                //self.plusItem();
				//AppFacade.closeFineTuning();
		},
            change: function(event, ui){
                var value = ui.value;
                 var rel = jQuery("#diamonds_slider_scope1").attr("rel");
                 self.checkScore(value, "diamonds1", rel);
            }
        });
	    jQuery("#diamonds_slider_scope1").find(".ui-slider-handle").addClass("fine-tune-slider-button");
        jQuery("#diamonds_slider_scope1").find(".ui-slider-handle").removeClass("ui-state-default");
        jQuery("#diamonds_slider_scope1").find(".ui-widget-header").css('background', 'none');
    },
    render: function() {
        var self = this;jQuery(this.el).html(this.template.tmpl(self.data));
        
        
	    
        return this;
    }
    
});

var AnimationHandler = View.extend({
    initialize: function(id, cb, klass, pageID){
        var self = this;
        self.cb = cb;
        self.klass = klass;
        self.contentID = id;
        self.pageID = pageID;
        self.animateObjects();
    },
    animateObjects: function(){
        
        var self = this;
        self.DISTANCE = 500;
        self.containerWidth = (jQuery(self.el).width() / 2 -300);
        self.containerHeight = (jQuery(self.el).height() / 2);
        jQuery('body').css('overflow','hidden');
        
        self.items = jQuery(self.contentID + " .item").length;
        var count = 0;
        jQuery(self.contentID + " .item").each(function(i) {
            
            var left = parseInt(jQuery(this).css('left')),
            		top = parseInt(jQuery(this).css('top'));
            
            //I'm not sure but i think we can just use position and not css
            if(isNaN(left) || isNaN(top)) {
            	var position = jQuery(this).position();
            	left = position.left;
            	top = position.top;
            }
            
            var pointWidth = left - self.containerWidth;
            var pointHeight = top - self.containerHeight;


            if (pointWidth < 0) {
                var angle = -30;
                var endX = left - 500;
                
            } else {
                var angle = 30;
                var endX = left + 500;
            } //angle is  -30 if off to the left, 30 if off to the right.

            var startX = (pointWidth * self.DISTANCE) / 2;
            var startY = (pointHeight + self.DISTANCE);
            var endY = (pointHeight + self.DISTANCE) * -15;
            

            var _b = {
                start: {
                    x: startX,
                    y: startY,
                    angle: angle
                },
                end: {
                    x: left,
                    y: top,
                    angle: angle,
                    length: 0.25,
                    easing: "easeOutBounce"
                }
            }

            var _c = {
                start: {
                    x: left,
                    y: top,
                    angle: angle
                },
                end: {
                    x: endX,
                    y: endY,
                    angle: angle,
                    length: 0.25
                }
            }

						
						var visible = jQuery(this).is(":visible") ? jQuery(this).css("display") : false;
						jQuery(this).data({"in": _b, "out": _c, visible: visible});
            if(visible) {
            	jQuery(this).hide();
            }
						
						
            
            /*
            jQuery(this).animate({path : new jQuery.path.bezier(_b)}, 1800, "easeOutQuint", function() {
                       var ob = this;
                       count++;
                       if(count == self.items){
                       self.callBack();
					   jQuery('body').css('overflow','visible');
                    }
                    
            });
            */
            
            
        });
        
        window.AppFacade.onQuestionReady(self.pageID);
        
    },
    userModelReady: function(userModel) {
    
    },
    animateIn: function(data) {
    	var self = this,
    			count = 0;
    	jQuery(self.contentID + " .item").each(function(i) {
    		var obj_data = jQuery(this).data();
    		if(obj_data.visible) {
    			jQuery(this).css("display",obj_data.visible);
    		}
				jQuery(this).animate({path : new jQuery.path.bezier(obj_data["in"])}, 1800, "easeOutQuint", function() {
					var ob = this;
				 	count++;
				 	if(count == self.items){
						self.callBack(data);
						jQuery('body').css('overflow','visible');
					}							
				});    	
    	});
    },
    animateOut: function(type, id){
        var self = this;
        var count = 0;
		
				if (AppFacade.getCurrentView().templateID == "#whats_on_your_plate") {
					jQuery('#food_categories li').css("background","none");
				}
				
				var items = jQuery(id + " .item");
				items.each(function(i) {
           jQuery(this).animate({path : new jQuery.path.bezier(jQuery(this).data().out)}, 1300, "easeInQuint", function() {
               count++;
               if(count == items.length){
                   if(type == "next"){
                       window.AppFacade.nextQuestion();
					
                   }else{
                       window.AppFacade.prevQuestion();
                   }
				   AppFacade.questionNavigationRegister();

               }
           });
        });


    },
    callBack: function(data){
        var self = this;
        if(typeof self.cb != "undefined"){
            
            var obj = _.bind(self.cb, self.klass);
            obj();
        }
        
				if (data && data.meta != null) { 
						AppFacade.currentView.restoreState(data.meta);
				} else {
						//Fix to show the fine tune the first time
			 //     if (AppFacade.currentView.pageID == 16) AppFacade.currentView.switchOption('Owner');
			 
						//console.log('no state to restore: data');
				}
    }
});

var DonateView = View.extend({
    template: jQuery("#donate"),
	events: {
		"click #donate_submit": "donateSubmit"
	},
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;

		require(["/static/js/libs/jquery.path.js",  
		                "/static/js/libs/jquery.easing.1.3.js", 
		                "order!/static/js/libs/raphael-min.js",
						"order!/static/js/libs/g.raphael-min.js",
						"order!/static/js/libs/g.pie-min.js",
						"order!/static/js/libs/g.bar-min.js" ], function() {	
					self.render();
					
		        });
    },
    userModelReady: function(userModel) {
    
    },
	donateSubmit: function(e){
		var self = this;
		AppFacade.registerDonation();
		//https://donate.callandresponse.org/page/contribute/slavery-footprint
		
		donate = window.open('https://donate.slaveryfootprint.org/page/contribute/slavery-footprint', 'donate', 'width=550,height=400,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0');
		
		
		e.preventDefault();
	}



    
});

var MethodologyView = View.extend({
    template: jQuery("#methodology"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		self.render();
		AppFacade.adjustHeight();
		
		jQuery('.app_back_button').click(function(e) {
			history.back();
		})
		
		jQuery('#share_links iframe').css("margin-top","5px");
		
    },
    userModelReady: function(userModel) {
    
    }
    
});

var TermsView = View.extend({
    template: jQuery("#terms"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		self.render();
		AppFacade.adjustHeight();
		
		jQuery('.app_back_button').click(function(e) {
			history.back();
		})
		
		jQuery('#share_links iframe').css("margin-top","5px");
    }
    
});

var PrivacyView = View.extend({
    template: jQuery("#privacy"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		self.render();
		AppFacade.adjustHeight();
		
		jQuery('.app_back_button').click(function(e) {
			history.back();
		})
		
		jQuery('#share_links iframe').css("margin-top","5px");
		
    },
    userModelReady: function(userModel) {
    
    }
    
});

var GetAppView = View.extend({
    template: jQuery("#getapp"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		self.render();
		AppFacade.adjustHeight();
		
		jQuery('.app_back_button').click(function(e) {
			history.back();
		})
		
		jQuery('#share_links iframe').css("margin-top","19px");
    },
    userModelReady: function(userModel) {
    
    }
    
});

var AboutUsView = View.extend({
    template: jQuery("#aboutus"),
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;
		self.render();
		AppFacade.adjustHeight();
		
		jQuery('.app_back_button').click(function(e) {
			history.back();
		})
		
		jQuery('#share_links iframe').css("margin-top","19px");
    },
    userModelReady: function(userModel) {
    
    }
    
});

var LoginView = View.extend({
    template: jQuery("#login_page"),
	events: {
		"click .button_dark" : "processLogin"
	},
    initialize: function(obj){
        var self = this;
        self.pageID = obj.pageID;
        self.templateID = obj.templateID;        
        self.render();
        AppFacade.adjustHeight();
        
		AppFacade.loginSetup();
		
		
		if(AppFacade.isUserComingFromResults()) {
			jQuery("#menu").css("cssText","display: block !important;");
		}
	},
	userModelReady: function(userModel) {
    
    },
	processLogin: function(){
		var self = this;
		self.email = jQuery("#email").attr("value");
		self.password = jQuery("#password").attr("value");
		
		if(self.email == ""){
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Please enter an email address");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
			return;
		}
		
		if(self.password == ""){
			var el = jQuery("<div>");
			jQuery("div.messages").remove();
			el.addClass("messages");
			jQuery(el).addClass("error");
			jQuery(el).text("Please enter your password");
			jQuery(".signup_body").prepend(el);
			jQuery(el).slideDown(200);
			
			
			setTimeout(function(){
				jQuery(el).slideUp(200, function(){
					jQuery(el).remove();
					
					//jQuery("#messages").addClass("error");
					//jQuery("#messages").text("");
				});
				
			}, 10000);
			return;
		}
		
		////console.log('l6');
		jQuery.ajax({
			"url":"/gateway/site/login",
			"type":"POST",
			"data" : JSON.stringify({"login":self.email,"password":self.password}),
			"success":function(data, status){
				window.AppFacade.onLoggedIn();
				return;
			},
			"error": function(data){
				var el = jQuery("<div>");
				jQuery("div.messages").remove();
				el.addClass("messages");
				jQuery(el).addClass("error");
				jQuery(el).text("We couldn't find those credientals. Please try again.");
				jQuery(".signup_body").prepend(el);
				jQuery(el).slideDown(200);


				setTimeout(function(){
					jQuery(el).slideUp(200, function(){
						jQuery(el).remove();

						//jQuery("#messages").addClass("error");
						//jQuery("#messages").text("");
					});

				}, 10000);
				return;
			}
		});
		
		
	}
});

function openPopup(url) {
	window.open(url, "Share_Popup", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400');
}