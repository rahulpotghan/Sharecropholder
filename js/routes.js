var Controller = Backbone.Router.extend({
    routes: {
		"where_do_you_live" : "where_do_you_live",
        "gender_and_age"   :    "gender_and_age",
		"do_you_have_children" : "do_you_have_children",
		"whats_under_your_roof" : "whats_under_your_roof",
		"whats_on_your_plate" : "whats_on_your_plate",
		"medicine_cabinet" : "medicine_cabinet",
		"jewellery" : "jewellery",
		"gadgets" : "gadgets",
		"closet_clothing" : "closet_clothing",
		"sporting_goods" : "sporting_goods",
		"paid_for_sex" : "paid_for_sex",
		"signup" : "signup",
		"results" : "results",
		"progress": "progress",
		"compare": "compare",
		"donate": "donate",
		"register_letter":"register_letter",
		"getapp":"getapp",
		"aboutus":"aboutus",
		"terms":"terms",
		"privacy":"privacy",
		"methodology":"methodology",
		"login":"login"
    },
	register: function(prevID, nextID, ref, type){
		var body = jQuery("body");
		switch(type){
			case 1:
				// Normal Survey with Fine Tune and Next Button
				body.removeClass();
				body.addClass("not_home loading");
				break;
			case 2:
				// Survey without Funetune but with Next Button
				body.removeClass();
				body.addClass("not_home loading no_fine_tune");
				break;
			case 3:
				// Back button - not a survey page so sans main survey question heading
				body.removeClass();
				body.addClass("results").addClass("back_button");
				break;
			case 4:
				// Signup page
				body.removeClass();
				body.addClass("signup").addClass("results").addClass("back_button");
				break;
		}
		
		if(ref != this.paid_for_sex_reference) {
			jQuery("#question_additional_text").empty().hide();
		}
		//analytics
		_gaq.push(['_trackPageview',window.location.pathname + window.location.hash]);
		
		AppFacade.registerTheCurrentView(ref);
		AppFacade.registerPrevId(prevID);
		AppFacade.registerNextId(nextID);
	},
	reset_delegate_events: function(view) {
		if(view) {
			jQuery(view.el).undelegate();
		}
	},
	where_do_you_live: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(1);
		jQuery("#question_text").text("Where Do You Live?");
		
		this.reset_delegate_events(this.where_do_you_live_reference);
		this.where_do_you_live_reference = new WhereDoYouLive({ 
			model: window.AppFacade.userModel, 
			pageID: 1, 
			templateID: "#where_do_you_live" 
		});
		this.register("welcome", "gender_and_age", this.where_do_you_live_reference, 2);
		AppFacade.fetchScore();
		
	},
	gender_and_age: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(2);
		jQuery("#question_text").text("Let's Start With the Basics.");
		
		this.reset_delegate_events(this.gender_and_age_reference);
		this.gender_and_age_reference = new GenderView({model: window.AppFacade.userModel, pageID: 2, templateID: "#gender_and_age" });
		this.register("where_do_you_live", "do_you_have_children", this.gender_and_age_reference, 2);
		AppFacade.fetchScore();
    },
	do_you_have_children: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(3);
		jQuery("#question_text").text("Do You Have Children?");
		
		this.reset_delegate_events(this.do_you_have_children_reference);
		this.do_you_have_children_reference = new DoYouHaveChildren({ 
			pageID: 3, 
			templateID: "#do_you_have_children" 
		});
		this.register("gender_and_age", "whats_under_your_roof", this.do_you_have_children_reference, 1);
		AppFacade.fetchScore();
	},
	whats_under_your_roof: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(4);
		jQuery("#question_text").text("What's Under Your Roof?");
		
		this.reset_delegate_events(this.whats_under_your_roof_reference);
		this.whats_under_your_roof_reference = new WhatsUnderYourRoof({model: window.AppFacade.userModel, pageID: 4, templateID: "#whats_under_your_roof" }, true);
		this.register("do_you_have_children", "whats_on_your_plate", this.whats_under_your_roof_reference, 1);
		AppFacade.fetchScore();

	},
	whats_on_your_plate: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(5);
		jQuery("#question_text").text("What's on Your Plate?");
		
		this.reset_delegate_events(this.whats_on_your_plate_reference);
		this.whats_on_your_plate_reference = new WhatsOnYourPlate({model: window.AppFacade.userModel, pageID: 5, templateID: "#whats_on_your_plate" });
		this.register("whats_under_your_roof", "medicine_cabinet", this.whats_on_your_plate_reference, 1);
		AppFacade.fetchScore();
	},
	medicine_cabinet: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(6);
		jQuery("#question_text").text("Let's Take a Peek in Your Medicine Cabinet");
		
		this.reset_delegate_events(this.medicine_cabinet_reference);
		this.medicine_cabinet_reference = new MedicineCabinet({model: window.AppFacade.userModel, pageID: 6, templateID: "#medicine_cabinet" });
		this.register("whats_on_your_plate", "jewellery", this.medicine_cabinet_reference, 1);
		AppFacade.fetchScore();
	},
	jewellery: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(7);
		jQuery("#question_text").text("How Much Jewelry Do You Own?");
		
		this.reset_delegate_events(this.jewellery_reference);
		this.jewellery_reference = new Jewellery({model: window.AppFacade.userModel, pageID: 7, templateID: "#jewellery" });
		this.register("medicine_cabinet", "gadgets", this.jewellery_reference, 1);
		AppFacade.fetchScore();
	},
	gadgets: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(8);
		jQuery("#question_text").text("When it comes to electronics, what are you?");
		
		this.reset_delegate_events(this.gadgets_reference);
		this.gadgets_reference = new Gadgets({model: window.AppFacade.userModel, pageID: 8, templateID: "#gadgets" });
		this.register("jewellery", "sporting_goods", this.gadgets_reference, 1);
		AppFacade.fetchScore();
	},
	sporting_goods: function(){
              
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(9);
		jQuery("#question_text").text("What About Sporting Goods?");
		
		this.reset_delegate_events(this.sporting_goods_reference);
		this.sporting_goods_reference = new SportingGoods({model: window.AppFacade.userModel, pageID: 9, templateID: "#sporting_goods" });
		this.register("gadgets", "closet_clothing", this.sporting_goods_reference, 1);
		AppFacade.fetchScore();
	},
	closet_clothing: function(){
		AppFacade.resetNextButton();
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(10);
		jQuery("#question_text").text("What's in Your Closet?");
		
		this.reset_delegate_events(this.closet_clothing_reference);
		this.closet_clothing_reference = new ClosetClothing({model: window.AppFacade.userModel, pageID: 10, templateID: "#closet_clothing" });
		this.register("sporting_goods", "paid_for_sex", this.closet_clothing_reference, 1);
		AppFacade.fetchScore();
	},
	paid_for_sex: function(){
		if (AppFacade.userModel.get("age") < 18) {
    	//Skip sex q if user is 17 or under.
			window.location.href = "/results/#results";
			return;
		}
		
		jQuery("header h2").css("display", "block");
		jQuery("#question_number").text(11);
		jQuery("#question_text").text("How Many Times Have You Paid for Sex?");
		jQuery("#question_additional_text").text("* this will not affect your score").show();

		this.reset_delegate_events(this.paid_for_sex_reference);
		this.paid_for_sex_reference = new PaidForSex({model: window.AppFacade.userModel, pageID: 11, templateID: "#paid_for_sex" });
		this.register("paid_for_sex", "results", this.paid_for_sex_reference, 2);
		AppFacade.fetchScore();
	},
	signup: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.signup_reference);
		this.signup_reference = new SignupView({model: window.AppFacade.userModel, pageID: 15, templateID: "#signup" });

		this.register("paid_for_sex", "welcome", this.signup_reference, 4);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
		
	},
	login: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.login_reference);
		this.login_reference = new LoginView({model: window.AppFacade.userModel, pageID: 15, templateID: "#login" });
		this.register("paid_for_sex", "welcome", this.login_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
		
	},
	results: function(){		
		jQuery("header h2").css("display", "none");

		this.reset_delegate_events(this.score_reference);
		this.score_reference = new ScoreView({model: window.AppFacade.userModel, pageID: 14, templateID: "#scores" });
		this.register("paid_for_sex", "welcome", this.score_reference, 3);
		AppFacade.fetchScore();
		//AppFacade.adjustHeight();
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
				
	},
	progress: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.progress_reference);
		this.progress_reference = new ProgressView({model: window.AppFacade.userModel, pageID: 20, templateID: "#progress" });
		this.register("paid_for_sex", "welcome", this.progress_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
		
	},
	compare: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.compare_reference);
		this.compare_reference = new CompareView({model: window.AppFacade.userModel, pageID: 16, templateID: "#compare" });
		this.register("paid_for_sex", "welcome", this.compare_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
		
	},
	donate: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.donate_reference);
		this.donate_reference = new DonateView({model: window.AppFacade.userModel, pageID: 16, templateID: "#donate" });
		this.register("paid_for_sex", "welcome", this.compare_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	methodology: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.methodology_reference);
		this.methodology_reference = new MethodologyView({model: window.AppFacade.userModel, pageID: 17, templateID: "#methodology" });
		this.register("", "", this.methodology_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	terms: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.terms_reference);
		this.terms_reference = new TermsView({model: window.AppFacade.userModel, pageID: 17, templateID: "#terms" });
		this.register("", "", this.terms_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	privacy: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.privacy_reference);
		this.privacy_reference = new PrivacyView({model: window.AppFacade.userModel, pageID: 17, templateID: "#privacy" });
		this.register("", "", this.privacy_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	method: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.method_reference);
		this.method_reference = new MethodView({model: window.AppFacade.userModel, pageID: 17, templateID: "#method" });
		this.register("", "", this.method_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	getapp: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.getapp_reference);
		this.getapp_reference = new GetAppView({model: window.AppFacade.userModel, pageID: 17, templateID: "#getapp" });
		this.register("", "", this.getapp_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	aboutus: function(){
		jQuery("header h2").css("display", "none");
		//AppFacade.fetchScore();
		this.reset_delegate_events(this.getapp_reference);
		this.aboutus_reference = new AboutUsView({model: window.AppFacade.userModel, pageID: 17, templateID: "#aboutus" });
		this.register("", "", this.aboutus_reference, 3);
		setTimeout(function(){
			AppFacade.adjustHeight();
		}, 250);
	},
	register_letter: function(){
		AppFacade.registerLetter();
		return true;
	}
});

