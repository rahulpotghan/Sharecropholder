// Add defaults to the questions
var QuestionModel = Backbone.Model.extend({

});
// Add a survey collection
var SurveyCollection = Backbone.Collection.extend({
	url: "/gateway/survey/",
	initialize: function() {
		var self = this;
		AppFacade.userModel.bind("change", function(){
			self.url = self.url + AppFacade.userModel.get("id");
		});
	}
});

var ScoreCollection = Backbone.Collection.extend({
	url : "/gateway/score/current",
	initialize: function(){
		var self = this;
	},
	calculateScore: function(){
		var self = this;
		var scores = self.pluck("score");
		var score = scores.reduce(function(memo,num){ return parseInt(memo) + parseInt(num) }, 0);
		AppFacade.userScore = score;
	}
	
});

var TagsCollection = Backbone.Collection.extend({
	url: "/gateway/tag/"
});

var UserModel = Backbone.Model.extend({
	defaults: {
		group_name:""
	},
	url: "/gateway/user/current",
	birthdayToAge: function(){
		var self = this;
		var birth_date = self.get("birth_date");
		if(typeof birth_date === "string"){
			var dob = new Date(birth_date);
	        var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	        
			if(today.getMonth() <= dob.getMonth()){
				if(today.getMonth() == dob.getMonth()){
					if(today.getDate() < dob.getDate()){
						var age = (today.getFullYear() - dob.getFullYear()) -1;
					}else{
						var age = (today.getFullYear() - dob.getFullYear());
					}
				}else{
					var age = (today.getFullYear() - dob.getFullYear()) -1;
				}
			}else{
					var age = (today.getFullYear() - dob.getFullYear());
			}
                        if (typeof(self.get("age")) === "undefined" || self.get("age") == null) { 
                            self.set({"age":age});
                        }
			return self.get("age");
		}
	},
	birthdayFromAge: function(){
		var self = this;
		
	}
});

