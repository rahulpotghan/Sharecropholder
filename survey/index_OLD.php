<!doctype html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Slavery Footprint - Survey</title>
		<meta name="description" content="How many slaves work for you? There are 27 million slaves in the world today. Many of them contribute to the supply chains that end up in the products we use every day. Find out how many slaves work for you, and take action." />
		<meta name="author" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta property="og:title" content="Slavery Footprint"/>
	    <meta property="og:image" content="http://madeinafreeworld.org/fb_icon.png"/>
		<meta property="og:description" content="How many slaves work for you? There are 27 million slaves in the world today. Many of them contribute to the supply chains that end up in the products we use every day. Find out how many slaves work for you, and take action."/>
		
		
		<link rel="shortcut icon" href="http://sharecropholder.com/favicon.ico">
		<link rel="apple-touch-icon" href="http://sharecropholder.com/apple-touch-icon.png">
		<script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>
		<script type="text/javascript" charset="utf-8" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
		<!--<script type="text/javascript">
				if((jQuery.browser.msie && jQuery.browser.version <= 7) || (window.screen.availWidth < 1024 && !navigator.userAgent.match(/iPad/i))) {
					window.location.href = "../unsupported.html";
				}
		</script> -->
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css" type="text/css" media="all" />
		<link rel="stylesheet" href="http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css" type="text/css" media="all" />
		<link rel="stylesheet" href="http://sharecropholder.com/static/css/stylesheets/screen.css">

		<link rel="stylesheet" type="text/css" href="http://sharecropholder.com/static/css/stylesheets/hira_navi.css" />
		<link rel="stylesheet" type="text/css" href="http://sharecropholder.com/static/css/stylesheets/hira_l8.css" />

		<script src="http://sharecropholder.com/js/hiranya_l8box.js"></script>
		<script src="http://sharecropholder.com/js/hiranya_navi.js"></script>

		<script src="http://sharecropholder.com/static/js/libs/modernizr-1.7.min.js"></script>
        <script src="http://sharecropholder.com/static/js/login.js"></script>
        
        <script src="http://sharecropholder.com/static/js/libs/jquery.jscrollpane.min.js"></script>
        
		<script><?php if (stripos($_SERVER['HTTP_USER_AGENT'], 'iPad')) { ?>
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	function load() {
		function reorient(e) {
			var portrait = (window.orientation == 0 || window.orientation == 180);
			if(portrait) {

				//alert("Rotate to use the site");
				jQuery("#overlay").css("display", "none");
	           	jQuery("body").addClass("overlay_on");
	           	jQuery("#overlay").fadeIn(500);
				jQuery("#portrait_popup").css("display", "block");
				jQuery("#portrait_popup").css("z-index", "9001");
				jQuery('#portrait_popup').addClass("show_ipad_popup");
				jQuery("#overlay").css("width","1000px");
				jQuery('#link').click(function () {
						fadeOut();
						
				});
			} else { fadeOut(); }
			
		}
		function fadeOut() {
			jQuery("#portrait_popup").css("display", "none");
			jQuery("#overlay").css("display", "none");
           	jQuery("body").removeClass("overlay_on");
           	jQuery("#overlay").fadeOut(500);
			jQuery("#results_popup").css("display", "none");
		}


		window.onorientationchange = reorient;
		window.setTimeout(reorient, 0);

		init();
	}

	function touchHandler(event) {
		var touches = event.changedTouches, first = touches[0], type = "";
		switch(event.type) {
			case "touchstart":
				type = "mousedown";
				break;
			case "touchmove":
				type = "mousemove";
				break;
			case "touchend":
				type = "mouseup";
				break;
			default:
				return;
		}

		//initMouseEvent(type, canBubble, cancelable, view, clickCount,
		//           screenX, screenY, clientX, clientY, ctrlKey,
		//           altKey, shiftKey, metaKey, button, relatedTarget);

		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);

		first.target.dispatchEvent(simulatedEvent);
		//event.preventDefault();
	}

	function init() {

		document.addEventListener("touchstart", touchHandler, true);
		document.addEventListener("touchmove", touchHandler, true);
		document.addEventListener("touchend", touchHandler, true);
		document.addEventListener("touchcancel", touchHandler, true);
	}
<?php }?></script>

    <script type="text/javascript">
	
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-26310856-1']);
		_gaq.push(['_trackPageview']);
	
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	
	</script>
	
				
<!-- Start Open Web Analytics Tracker -->
<script type="text/javascript">
//<![CDATA[
var owa_baseUrl = 'http://slaveryfootprint.org/owa/';
var owa_cmds = owa_cmds || [];
owa_cmds.push(['setSiteId', '52ea583216d1372c3dfe18f653160701']);
owa_cmds.push(['trackPageView']);
owa_cmds.push(['trackClicks']);
owa_cmds.push(['trackDomStream']);

(function() {
	var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
	owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
	_owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
	var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
}());
//]]>
</script>
<!-- End Open Web Analytics Code -->
				
		
	
	
	
	</head>
	<body <?php if (stripos($_SERVER['HTTP_USER_AGENT'], 'iPad') && stripos($_SERVER['HTTP_USER_AGENT'], 'Safari')) { ?>onload="load()"<?php }?>>
		<div id="portrait_popup">
				<p id="header">This site works best in landscape</p>
				<p id="subheader">Please rotate your iPad</p>
				<img src="/static/css/img/general/popup_ipad.png" />
				<span ><a id="link" href="javascript:void(0);">Continue <img src="/static/css/img/general/popup_continue_button.png" /></a></span>
		</div>
		<div id="overlay"></div>
		<header>
			<div>
				<h2><b id="question_number"> 1 </b><span> of </span> 11 <span class="branding-pipe"></span><b id="question_text"></b><div id="question_additional_text"></div></h2>
                <span id="group_name"></span>
				<span id="login"><a id="name"></a> <a href="/signup/#signup" id="signup">Signup</a> <span style="margin-left:10px;">&nbsp;</span> <a href="/signup/#login" id="login">Login</a> </span>
			</div>
		</header>
		<section id="fine_tuning">
			<span id="fine_tune_link">
				<div id="go_deeper_bs" class="fine_tuning-tooltip">
					<div class="dialogue_text_container">
						<h2>Go Deeper</h2>
						<p id="fine_tuning_dialogue_text">There are coffee people. Then there are tea people. We took some assumptions about your diet. Use this sidebar to refine your answers at any stage of the survey.</p>
					</div>
					<a id="go_deeper_ok" href="javascript:void(0)"> </a>
				</div> <span id="fine_tune_open"></span> <span id="fine_tune_close"></span> </span>
			<div id="fine_tuning_content">
				<script type="text/x-jquery-tmpl" id="fine_tuning_tmpl">
					<div id="fine_tune_top">
					<img src="/static/img/logo_white.png" alt="Slavery.Footprint"/>
					<h2>Fine Tune</h2>
					<p>Throughout the survey, refine your answers here for a more accurate score.
					{{if additional_text}}
        		<span id="fine_tune_top_text">{{html additional_text}}</span>
    			{{/if}}
    			</p>
					</div>
					<div id="fine_tune_items">
					<ul>
					{{each tags}}
					{{if $value.attributes.category_name}}
					<li id="item_${$index}" class="category ${tags[$index].attributes.category_name}">
					<span class="label" >${tags[$index].attributes.category_caption}</span>
					</li>					
					{{else}}
					<li id="item_${$index}">
					<span class="controls">
					<span class="minus" rel="${tags[$index].attributes.Tag_id}">-</span>
					<span class="count">${tags[$index].attributes.amount}</span>
					<span class="plus" rel="${tags[$index].attributes.Tag_id}">+</span>
					</span>
					<span class="label">${tags[$index].attributes.product_name}</span>
					</li>
					{{/if}}
					{{/each}}
					</ul>
					</div>
				</script>
			</div>
		</section>
		<a href="javascript:void(0)" class="branding-next_question_new_inactive" id="nextquestion"> <span id="next"></span> <span id="previous"></span> <span id="next_loading"></span> </a>
		<div id="container">
			<div id="main" role="main">
				<script type="text/x-jquery-tmpl" id="homepage">
					<div id="homepage_content" class="content_type">
					<div class="item" style="top:50px; position: absolute; left: 50px;"></div>

					<div class="item" id="video"></div>
					<h3 class="item" id="next"><a href="javascript:void(0)" onclick="/survey/#where_do_you_live"></a>
					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="where_do_you_live">
					<div id="where_do_you_live_content" class="content_type">

					<div class="item" id="location_map"></div>

					<div class="item" id="location_postcode_form">
					<form>
					<label for="postcode_input">Enter your city</label>
					<input type="text" id="postcode_input" class="location-postcode" name="postcode_input" />
					<a href="javascript:void(0)" id="location_enter" class="location-enter_button"></a>
					</form>
					<div class="location-house" id="location_house"></div>
					</div>

					<div class="item sidebar" id="location_sidebar">
					<span class="location-globe_icon"></span>
					<h3 data-fact_title="true">Let's start with this.</h3>
					<p data-fact_body="true" data-fact_twitter="There are at least 27 million slaves worldwide—roughly the combined population of Australia and New Zealand. Crikey! #slaveryfootprint" style="width:85%">There are at least 27 million slaves worldwide. That’s roughly the combined population of Australia and New Zealand. Crikey!</p>
					<div class="ft_sharable_fact" rel="horizontal_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>
					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="gender_and_age">
					<div id="gender_and_age_content">
					<div id="woman" class="item">
					<a href="javascript:void(0)" class="gender_and_age-femalecutout"></a>
					</div>
					<div id="man" class="item">
					<a href="javascript:void(0)" class="gender_and_age-malecutout"></a>
					</div>
					<div class="item" id="yourgender">
					<span id="select_tone">
						<a href="javascript:void(0)" rel="tone" data-tone="1" class="gender_and_age-tone1"></a>
						<a href="javascript:void(0)" rel="tone" data-tone="2" class="gender_and_age-tone2 gender_and_age-tone2selected"></a>
						<a href="javascript:void(0)" rel="tone" data-tone="3" class="gender_and_age-tone3"></a>
					</span>
					<span id="select_gender">
						<span class="gender_and_age-circleone" id="circleone"></span>
						<span class="text">Your gender</span>
					</span>
					</div>
					
					
					
					<div class="item" id="skintext">
					This will not affect your score
					</div>
					<div class="item" id="yourage">
					<span class="gender_and_age-circletwo" id="circletwo"></span>
					<span class="text">Your age</span>
					</div>
					<span id="gender_and_age-squiggle1" class="item gender_and_age-squiggle1off"></span>
					<span id="gender_and_age-squiggle2" class="item gender_and_age-squiggle2off"></span>
					<span id="gender_and_age-squiggle3" class="item gender_and_age-squiggle3off"></span>
					<div class="item gender_and_age-youage" id="gender_and_age-youage">
					<span class="age">25</span>
					</div>
					<div class="item gender_and_age-volumecontrolsoff" id="gender_and_age-volumecontrols">

					<span href="javascript:void(0)" class="volumecontrol minus" id="volumecontrol_minus">Minus</span>
					<span href="javascript:void(0)" class="volumecontrol plus" id="volumecontrol_plus">Plus</span>
					</div>
					<div id="sidebar" class="item">
					<span class="gender_and_age-sign_form_icon"></span>
					<h3 data-fact_title="true">OJ Simpson, Justin Bieber, and slavery.</h3>
					<p data-fact_body="true" data-fact_twitter="Pakistanis sold into slavery at 13 work until 30. Those released today were enslaved when Justin Bieber was born. #slaveryfootprint">Many Pakistani boys are signed away to bonded labor at the age of 13. The contracts last until they are 30. If those boys were released today, they would have begun their work when: OJ Simpson drove his white SUV down a freeway, Bill Clinton gave his first State of the Union, and Justin Bieber was born.</p>
					<br/><br/>
					<div class="ft_sharable_fact" rel="vertical_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>

					</div>
					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="do_you_have_children">
					<div id="do_you_have_children_content" class="content_type">
					<!--<div class="item" style="top:50px; position: absolute; left: 50px;"></div>
					
					

					<form style="position:absolute; top: 20px; left: 260px;">
					<label>Infant Male</label>
					<input name="InfM"  type="text" /><br/>
					<label>Infant Female</label>
					<input name="InfF"  type="text" /><br/>
					<label>Male 2-12 years</label>
					<input name="K2-12M"  type="text" /><br/>
					<label>Female 2-12 years</label>
					<input name="K2-12F"  type="text" /><br/>
					<label>Male 13-16 years</label>
					<input name="K13-16M"  type="text" /><br/>
					<label>Female 13-16 years</label>
					<input name="K13-16F"  type="text" /><br/>
					</form>
					<style>
					label { width: 150px; display: block; float: left; margin-bottom: 5px; margin-right:50px; padding:15px 0 0 0; color:#2f2f2e; font-style:italic }
					input { float: left; margin-bottom: 10px; padding:13px; background:#EAEAE3; -webkit-box-shadow:inset 1px 1px 6px #b0b0ab; border:1px solid #EEE; font-family:Georgia; font-size:14px; font-style:italic; color:#2f2f2e; text-align:center}
					input[type=submit] {background:#B0B0AB;color:white; position:absolute; left:110px; top:360px;}
					</style>
					<div id="response"></div>
					</div>-->
					
					<span class="item" id="children_counter">Children: 5</span>

					<div class="item" id="slider">
					<span class="text"></span>
					<span class="do_you_have_children-slider_bar" id="slider_bar"></span>
					<span class="do_you_have_children-slider_button" id="slider_button"></span>

					<div id="age-slider">

					</div>
					</div>

					<div class="item" id="no_dont_include">
					<span class="text dont_include">No / Don't include<br />children in my score.</span>
					<span class="do_you_have_children-dont_include dont_include" id="dont_include"></span>
					</div>

					<div class="item" id="add_boy">
					<span class="do_you_have_children-plus_green" id="plus_green"></span>
					<span class="text">Add Boy</span>
					</div>

					<div class="item" id="add_girl">
					<span class="do_you_have_children-plus_red" id="plus_red"></span>
					<span class="text">Add Girl</span>
					</div>

					<div class="item" id="children">
					<span class="do_you_have_children-boy_inactive" id="boy_inactive"></span>
					</div>

					<div class="item" id="select_age">
					<span class="text">Age</span>
					<div id="age-text-container"><span class="age-text" id="age_text">5</span></div>
					</div>

					<div id="children_list" class="item">
					</div>

					<span id="tap_to_remove" class="do_you_have_children-tap_to_remove"></span>

					<div class="item sidebar" rel="sidebar" id="sidebar">
					<span class="do_you_have_children-bricks_icon"></span>
					<h3 data-fact_title="true">Everyone in Orlando walks into a kiln.</h3>
					<p data-fact_body="true" data-fact_twitter="250,000 children live and work in Pakistani brick kilns—that's more than the population of Orlando, FL. #slaveryfootprint">
					In 2007, Save the Children reported that 250,000 children live and work in Pakistani brick kilns in complete social isolation. That's more than the population of Irvine, CA, Baton Rouge, LA, or Orlando, FL.
					</p>
					<div class="ft_sharable_fact" rel="vertical_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>
					</div>
					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="whats_under_your_roof">
					<div id="whats_under_your_roof_content" class="content_type">
					<ul id="options" class="item">
					<li class="item"><a data-tag="Renter"  href="javascript:void(0)" class="roundel off whats_under_your_roof-option_off">Renter</a></li>
					<li class="item"><a data-tag="Owner"   href="javascript:void(0)" class="roundel off whats_under_your_roof-option_off whats_under_your_roof-option_on">Owner</a></li>
					<li class="item"><a data-tag="Student" href="javascript:void(0)" class="roundel off whats_under_your_roof-option_off">College Student</a></li>
					<li class="item"><a data-tag="Csurfer" href="javascript:void(0)" class="roundel off whats_under_your_roof-option_off">Couch Surfer</a></li>
					</ul>
					<div id="home" class="item">

					<div class="garage_layer">
                    <div id="bicycle" class="whats_under_your_roof-bicycle"></div>
                    <div id="scooter" class="whats_under_your_roof-scooter"></div>
                    <div id="car1" class="whats_under_your_roof-car"></div>
                    <div id="car2" class="whats_under_your_roof-car"></div>
                    </div>

					
					<div class="rent_layer whats_under_your_roof-rent_1">
					<div class="h_1 block " rel="1" data-state="off"></div>
					<div class="h_2 block " rel="2" data-state="off"></div>
					<div class="h_3 block " rel="3" data-state="off"></div>
					<div class="h_4 block " rel="4" data-state="off"></div>
					<div class="h_5 block " rel="5" data-state="off"></div>
					</div>
					
					<div class="home_layer whats_under_your_roof-house1">
					<div class="h_1 block " rel="1" data-state="off"></div>
					<div class="h_2 block " rel="2" data-state="off"></div>
					<div class="h_3 block " rel="3" data-state="off"></div>
					<div class="h_4 block " rel="4" data-state="off"></div>
					<div class="h_5 block " rel="5" data-state="off"></div>
					<div class="h_6 block " rel="6" data-state="off"></div>
					<div class="h_7 block " rel="7" data-state="off"></div>
					</div>
                    
                    

					<div class="college_layer whats_under_your_roof-college_dorm">
					<div id="college_layer_drop"></div>
					</div>

					<div class="couch_surfing_layer whats_under_your_roof-couch_surfing">
					<div id="couch_surfing_layer_drop"></div>
					</div>

					</div>
					<div id="separator" class="whats_under_your_roof-separator item"></div>
					<ul id="menu">
					<li data-spritereference="whats_under_your_roof-bedroom_overlay" data-tag="Bedrooms" class="rooms item bedroom whats_under_your_roof-bedroom_menu">

					<a href="javascript:void(0)">Bedrooms</a>
					</li>
					<li data-spritereference="whats_under_your_roof-bathroom_overlay" data-tag="Bathrooms" class="rooms item bathroom whats_under_your_roof-bathroom_menu"><a href="javascript:void(0)">Bathrooms</a></li>
					<li data-spritereference="whats_under_your_roof-study_overlay" data-tag="HOffice" class="rooms item home_office whats_under_your_roof-study_menu"><a href="javascript:void(0)">Home Office</a></li>
					<li data-spritereference="whats_under_your_roof-car_overlay" data-tag="Car" class="rooms item car whats_under_your_roof-car_menu"><a href="javascript:void(0)">Car</a></li>
					<li data-spritereference="whats_under_your_roof-motorcycle_overlay" data-tag="Motorcycle" class="rooms item scooter_motorcycle whats_under_your_roof-motorcycle_menu">
					<a href="javascript:void(0)">Scooter Motorcycle</a></li>
					<!-- <li data-spritereference="whats_under_your_roof-bicycle_overlay" data-tag="Bicycle" class="rooms item bicycle whats_under_your_roof-bicycle_menu"><a href="javascript:void(0)">Bicycle</a></li> -->
					</ul>
					
					<h3 class="instruction_top item">I'm a..</h3>
					<h3 class="instruction item">Drag to house</h3>

					<div class="item" rel="sidebar" id="sidebar">
					<span class="whats_under_your_roof-house_icon"></span>
					<h3 data-fact_title="true">No 401K<br/>
					No break room.</h3>
					<p data-fact_body="true" data-fact_twitter="In just one area of SE Asia, 200,000 kids are forced to weave carpets. Honda, Sony and P&G each have fewer employees. #slaveryfootprint">
					More than 200,000 children are forced to work in India&#x27;s carpet belt of Uttar Pradesh. That makes it a pretty large operation, considering Honda, Sony, Procter &amp; Gamble, and Boeing each have fewer employees. </p>
					<br/><br/>
					<div class="ft_sharable_fact" rel="vertical_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>
					</div>
					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="whats_on_your_plate">
					<div id="whats_on_your_plate_content" class="content_type">
					<div class="item" style="top:50px; position: absolute; left: 50px;"></div>

					<span id="list_background" class="item"></span>
					<ul id="food_categories" class="item">
						<li id="fruit_and_veg_list" class="active item" data-illustration="fruit_and_veg_illustration" data-canvas="fruit">
							<div class="item separator"></div>
							<div>
							<div class="paper item" id="fruit_and_veg_paper" data-color="blue"></div>
							<span class="item platebg whats_on_your_plate-small_plate"></span>
							</div>
							<span class="item food_menu_text"><h2 id="colorCount0">20%</h2><p>Fruits and Veggies</p></span>
							<span class="item icon whats_on_your_plate-fruit_and_veg"></span>
						</li>
						
						<li id="fish_list" class="option item" data-illustration="fish_illustration" data-canvas="fish">
							<div class="item separator"></div>
							<div>
							<div class="paper item" id="fish_list_paper" data-color="red"></div>
							<span class="item platebg whats_on_your_plate-small_plate"></span>
							</div>
							<span class="item food_menu_text"><h2 id="colorCount1">20%</h2><p>Fish and Seafood</p></span>
							<span class="item icon whats_on_your_plate-fish"></span>
						</li>
						
						<li id="dairy_eggs_list" class="option item" data-illustration="dairy_eggs_illustration" data-canvas="dairy">
							<div class="item separator"></div>
							<div>
							<div class="paper item" id="dairy_eggs_paper" data-color="blue"></div>
							<span class="item platebg whats_on_your_plate-small_plate"></span>
							</div>
							<span class="item food_menu_text"><h2 id="colorCount2">20%</h2><p>Dairy, eggs</p></span>
							<span class="item icon whats_on_your_plate-dairy_eggs"></span>
						</li>
						
						<li id="meat_poultry_list" class="option item" data-illustration="meat_poultry_illustration" data-canvas="meat">
							<div>
							<div class="paper item" id="meat_poultry_paper" data-color="red"></div>
							<span class="item platebg whats_on_your_plate-small_plate"></span>
							</div>
							<span class="item food_menu_text"><h2 id="colorCount3">20%</h2><p>Meat and Poultry</p></span>
							<div class="item separator"></div>
							<span class="item icon whats_on_your_plate-meat_poultry"></span>
						</li>
						
						<li id="grains_nuts_spices_list" class="option item" data-illustration="grains_nuts_spices_illustration" data-canvas="grains">
							<div class="item separator"></div>
							<div>
							<div class="paper item" id="grains_nuts_spices_paper" data-color="blue"></div>
							<span class="item platebg whats_on_your_plate-small_plate"></span>
							</div>
							<span class="item food_menu_text"><h2 id="colorCount4">20%</h2><p>Grains and Nuts</p></span>
							<span class="item icon whats_on_your_plate-grains_nuts_spices"></span>
						</li>
						
						<li id="food_portions_list" class="option item" data-illustration="food_portions_illustration" data-canvas="bird,bear">
							<div class="item separator"></div>
							<div class="item portions_plates whats_on_your_plate-poritions_plat"></div>
							<span class="item food_menu_text"><h2>M</h2><p>Your Appetite</p></span>
							<span class="item icon whats_on_your_plate-portions_thing"></span>
						</li>
					</ul>

					<ul id="food_illustration" class="item">
					<li id="fruit_and_veg_illustration" class="active">
					<div class="slider whats_on_your_plate-plate" data-id="0">
					<span class="move_slider">Move Slider</span>
					<div class="piechart" id="fruit_chart" style="height:120px; width: 120px; display: block;   position:absolute;  z-index: 20; overflow: hidden;"></div>
					<div class="viewport" class="whats_on_your_plate-plate"></div>
					<div class="whats_on_your_plate-arrow" style="z-index:30;"></div>
					<div class="dot"></div>
					<div class="overlay"></div>
					<div class="thumb whats_on_your_plate-slider"></div>
					</div>

					<div id="fruit_canvas" class="image whats_on_your_plate-fruit_and_veg_illustration">
					<img src="/static/css/img/food/veg.png" class="ieimage" />
					</div>
					</li>
					<li id="fish_illustration">
					<div class="slider whats_on_your_plate-plate" data-id="1">
					<span class="move_slider">Move Slider</span>
					<div class="piechart" id="fish_chart" style="height:120px; width: 120px; display: block;   position:absolute;  z-index: 20; overflow: hidden;"></div>
					<div class="viewport" class="whats_on_your_plate-plate"></div>
					<div class="whats_on_your_plate-arrow" style="z-index:30;"></div>
					<div class="dot"></div>
					<div class="overlay"></div>
					<div class="thumb whats_on_your_plate-slider"></div>
					</div>

					<div id="fish_canvas" class="image whats_on_your_plate-fish_illustration">
					<img src="/static/css/img/food/fish.png" class="ieimage" />
					</div>
					</li>
					<li id="dairy_eggs_illustration">
					<div class="slider whats_on_your_plate-plate" data-id="2">
					<span class="move_slider">Move Slider</span>
					<div class="piechart" id="dairy_eggs_chart" style="height:120px; width: 120px; display: block;   position:absolute;  z-index: 20; overflow: hidden;"></div>
					<div class="viewport" class="whats_on_your_plate-plate"></div>
					<div class="whats_on_your_plate-arrow" style="z-index:30;"></div>
					<div class="dot"></div>
					<div class="overlay"></div>
					<div class="thumb whats_on_your_plate-slider"></div>
					</div>
					<div id="dairy_canvas" class="image whats_on_your_plate-dairy_eggs_illustration">
					<img src="/static/css/img/food/dairy_and_eggs.png" class="ieimage" />
					</div>
					</li>
					<li id="meat_poultry_illustration">
					<div class="slider whats_on_your_plate-plate" data-id="3">
					<span class="move_slider">Move Slider</span>
					<div class="piechart" id="meat_poultry_chart" style="height:120px; width: 120px; display: block;   position:absolute;  z-index: 20; overflow: hidden;"></div>
					<div class="viewport" class="whats_on_your_plate-plate"></div>
					<div class="whats_on_your_plate-arrow" style="z-index:30;"></div>
					<div class="dot"></div>
					<div class="overlay"></div>
					<div class="thumb whats_on_your_plate-slider"></div>
					</div>
					<div id="meat_canvas" class="image whats_on_your_plate-meat_poultry_illustration">
					<img src="/static/css/img/food/meat.png" class="ieimage" />
					</div>
					</li>
					<li id="grains_nuts_spices_illustration" >
					<div class="slider whats_on_your_plate-plate" data-id="4">
					<span class="move_slider">Move Slider</span>
					<div class="piechart" id="grains_nuts_spices_chart" style="height:120px; width: 120px; display: block;   position:absolute;  z-index: 20; overflow: hidden;"></div>
					<div class="viewport" class="whats_on_your_plate-plate"></div>
					<div class="whats_on_your_plate-arrow" style="z-index:30;"></div>
					<div class="dot"></div>
					<div class="overlay"></div>
					<div class="thumb whats_on_your_plate-slider"></div>
					</div>
					<div id="grains_canvas" class="image whats_on_your_plate-grains_nuts_spices_illustration">
					<img src="/static/css/img/food/grains.png" class="ieimage" />
					</div>
					</li>
					<li id="food_portions_illustration">
					<div id="bear" class="whats_on_your_plate-bear"><span>Bear</span><div id="bear_canvas" class="image"></div></div>
					<div id="slider" class="whats_on_your_plate-slider_bg"></div>
					<div id="slider_scope"></div>

					<div id="slider_instructions">
					<span class="slider_instruction_left">Move</span>
					<span class="slider_instruction_right">slider</span>
					</div>

					<div id="bird" class="whats_on_your_plate-bird"><span>Bird</span><div id="bird_canvas" class="image"></div></div>
					</li>
					</ul>
					<div id="facts_sidebar" class="item">
					<span class="whats_on_your_plate-shrimp_icon"></span>
					<h3 data-fact_title="true">Shrimp Cocktail, Anyone?</H3>
					<p data-fact_body="true" data-fact_twitter="The Asian shrimp industry forces workers to peel 40lbs of shrimp a shift under the threat of violence, to feed US demand. #slaveryfootprint">Bonded labor is used for much of Southeast Asia&#x27;s shrimping industry, which supplies more shrimp to the U.S. than any other country. Laborers work up to 20-hour days to peel 40 pounds of shrimp. Those who attempt to escape are under constant threat of violence or sexual assault.</p>
					<br/><br/>
					<div class="ft_sharable_fact" rel="vertical_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>
					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="medicine_cabinet">
					<div id="medicine_cabinet_content" class="content_type">

					<div class="item" id="shelves">
					<span class="medicine_cabinet-shelve" id="shelve_top"></span>
					<span class="medicine_cabinet-shelve" id="shelve_middle"></span>
					<span class="medicine_cabinet-shelve" id="shelve_bottom"></span>

					<span class="medicine_cabinet-tap" id="tap"></span>

					<span class="medicine_cabinet-shaving_cream shelve_item" id="shaving_cream"></span>
					<span class="medicine_cabinet-sunscreen shelve_item" id="sunscreen"></span>
					<span class="medicine_cabinet-moisturizer shelve_item" id="moisturizer"></span>
					<span class="medicine_cabinet-dental_floss shelve_item" id="dental_floss"></span>
					<span class="medicine_cabinet-mouthwash shelve_item" id="mouthwash"></span>
					<span class="medicine_cabinet-toothpaste shelve_item" id="toothpaste"></span>
					<span class="medicine_cabinet-toothbrush shelve_item" id="toothbrush"></span>

					<span class="medicine_cabinet-lip_gloss shelve_item male_off" id="lip_gloss"></span>
					<span class="medicine_cabinet-mascara shelve_item male_off" id="mascara"></span>
					<span class="medicine_cabinet-concealor shelve_item male_off" id="concealor"></span>
					<span class="medicine_cabinet-foundation shelve_item male_off" id="foundation"></span>
					<span class="medicine_cabinet-bronzer shelve_item male_off" id="bronzer"></span>
					<span class="medicine_cabinet-eye_pencil shelve_item male_off" id="eye_pencil"></span>
					<span class="medicine_cabinet-lip_stick shelve_item_small male_off" id="lip_stick"></span>
					<span class="medicine_cabinet-blush shelve_item male_off male_off" id="blush"></span>
					<span class="medicine_cabinet-nail_polish_remover shelve_item male_off" id="nail_polish_remover"></span>

					<span class="medicine_cabinet-hand_sanitizer shelve_item" id="hand_sanitizer"></span>
					<span class="medicine_cabinet-soap shelve_item" id="soap"></span>
					<span class="medicine_cabinet-conditioner shelve_item" id="conditioner"></span>
					<span class="medicine_cabinet-body_wash shelve_item" id="body_wash"></span>
					<span class="medicine_cabinet-hairbrush shelve_item" id="hairbrush"></span>
					<span class="medicine_cabinet-aspirin shelve_item" id="aspirin"></span>
					<span class="medicine_cabinet-contact_lenses shelve_item" id="contact_lenses"></span>
					<span class="medicine_cabinet-womens_fragrance shelve_item" id="womens_fragrance"></span>
					<span class="medicine_cabinet-deodorant shelve_item" id="deodorant"></span>
					</div>

					<div class="item sidebar" rel="sidebar" id="sidebar">
					<span class="medicine_cabinet-hammer_icon"></span>
					<h3 data-fact_title="true">How do I look in this dirt?</h3>
					<p data-fact_body="true" data-fact_twitter="Every day thousands of women buy makeup and thousands of children are forced to mine mica, the sparkles in the makeup. #slaveryfootprint">
					Every day tens of thousands of American women buy makeup. Every day tens of thousands of Indian children mine mica, which is the little sparklies in the makeup.
					</p>

					<div class="ft_sharable_fact margin10top" rel="vertical_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>
					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="jewellery">
					<div id="jewellery_content" class="content_type">

					<div id="jewelry_left">
					<div id="slider" class="item"><span class="jewelry-arrow_slider"></span> <h3>Slide to the number of items you own</h3></div>

					<!-- Dianmonds -->
					<div class="jewelry-diamonds_symbol item" id="diamond_symbol"></div>
					<div id="diamonds_slider_scope" class="sliderscope item"></div>
					<div rel="diamonds" class="slider jewelry-slider_mask diamonds item"></div>
					<div id="diamonds_slider_scope_progress" class="progress item"></div>
					<div id="diamonds_box" class="number_box item">0</div>
					<span id="title_diamond" class="title item">Diamond</span>

					<div class="jewelry-precious_stone_symbol item" id="precious_symbol"></div>
					<div rel="precious" class="slider item jewelry-slider_mask precious"></div>
					<div id="precious_slider_scope" class="sliderscope item"></div>
					<div id="precious_slider_scope_progress" class="progress item"></div>

					<div id="precious_box" class="number_box item">0</div>
					<span id="title_precious" class="title item">Precious Stone</span>

					<div class="jewelry-gold_symbol item" id="gold_symbol"></div>
					<div rel="gold" class="slider item jewelry-slider_mask gold"></div>
					<div id="gold_slider_scope" class="sliderscope item"></div>
					<div id="gold_slider_scope_progress" class="progress item"></div>
					<div id="gold_box" class="number_box item">0</div>
					<span id="title_gold" class="title item">Gold</span>

					<div class="jewelry-silver_symbol item" id="silver_symbol"></div>
					<div rel="silver" class="slider item jewelry-slider_mask silver"></div>
					<div id="silver_slider_scope" class="sliderscope item"></div>
					<div id="silver_slider_scope_progress" class="progress item"></div>
					<div id="silver_box" class="number_box item">0</div>
					<span id="title_silver" class="title item">Silver</span>

					<div class="jewelry-platinum_symbol item" id="platinum_symbol"></div>
					<div rel="platinum" class="slider item jewelry-slider_mask platinum"></div>
					<div id="platinum_slider_scope" class="sliderscope item"></div>
					<div id="platinum_slider_scope_progress" class="progress item"></div>
					<div id="platinum_box" class="number_box item">0</div>
					<span id="title_platinum" class="title item">Platinum</span>

					</div>
					<div id="jewelry_right" class="jewelry-jewellery_stand item">
					<div id="jewelry_right_content">
					<div id="gold_f1" class="jewelry-gold_f1 gold"></div>
					<div id="gold_f2" class="jewelry-gold_f2 gold"></div>
					<div id="gold_f3" class="jewelry-gold_f3 gold"></div>
					<div id="gold_f4" class="jewelry-gold_f4 gold"></div>
					<div id="gold_f5" class="jewelry-gold_f5 gold"></div>
					<div id="gold_f6" class="jewelry-gold_f6 gold"></div>
					<div id="gold_f7" class="jewelry-gold_f7 gold"></div>

					<div id="silver_f1" class="jewelry-silver_f1 silver"></div>
					<div id="silver_f2" class="jewelry-silver_f2 silver"></div>
					<div id="silver_f3" class="jewelry-silver_f3 silver"></div>
					<div id="silver_f4" class="jewelry-silver_f4 silver"></div>

					<div id="precious_f1" class="jewelry-precious_f1 precious"></div>
					<div id="precious_f2" class="jewelry-precious_f2 precious"></div>
					<div id="precious_f3" class="jewelry-precious_f3 precious"></div>
					<div id="precious_f4" class="jewelry-precious_f4 precious"></div>
					<div id="precious_f5" class="jewelry-precious_f5 precious"></div>

					<div id="diamonds_f1" class="jewelry-diamond_f1 diamonds"></div>
					<div id="diamonds_f2" class="jewelry-diamond_f2 diamonds"></div>
					<div id="diamonds_f3" class="jewelry-diamond_f3 diamonds"></div>
					<div id="diamonds_f4" class="jewelry-diamond_f4 diamonds"></div>
					<div id="diamonds_f5" class="jewelry-diamond_f5 diamonds"></div>

					<div id="platinum_f1" class="jewelry-platinum_f1 platinum"></div>
					<div id="platinum_f2" class="jewelry-platinum_f2 platinum"></div>
					<div id="platinum_f3" class="jewelry-platinum_f3 platinum"></div>
					<div id="platinum_f4" class="jewelry-platinum_f4 platinum"></div>
					<div id="platinum_f5" class="jewelry-platinum_f5 platinum"></div>
					</div>

					</div>
					<div rel="sidebar" id="sidebar" class="item">
					<span class="jewelry-ring_icon"></span>
					<h3 data-fact_title="true">Blood isn't limited to diamonds.</h3>
					<p data-fact_body="true" data-fact_twitter="Like diamonds, many rubies are mined with forced labor. Thousands of slaves have been injured or killed in Burmese mines. #slaveryfootprint">Rubies are believed to be Burma's second largest export after teak wood, and are commonly mined using forced labor. Mines are controlled by either the government or the army, who oversee workers in terrible conditions for little or no pay.</p>
					<div class="ft_sharable_fact" rel="horizontal_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>

					</div>
					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="gadgets">
					<div id="gadgets_content" class="content_type">
					<div class="item" style="top:50px; position: absolute; left: 50px;"></div>
					<div id="gadget_man" class="item gadgets-man2_young"></div>
					<div id="headphones" class="item"></div>
					<div id="gadget_main" class="item gadgets-main_none">

					</div>

					<span id="separator" class="item gadgets-spiked_divider"></span>
					<ul id="gadget_list">
					<li><a href="javascript:void(0)" rel="on" data-answer="technophobe" id="technophobe" class="item gadgets-technophobe_on">Technophobe</a></li>
					<li><a href="javascript:void(0)" rel="on" data-answer="regular_joe" id="regularjoe" class="item gadgets-regularjoe_on">Regular Joe</a></li>
					<li><a href="javascript:void(0)" rel="on" data-answer="stereophile" id="stereophile" class="item gadgets-stereophile_on">Stereophile</a></li>
					<li><a href="javascript:void(0)" rel="on" data-answer="gamer" id="gamer" class="item gadgets-gamer_on" q>Gamer</a></li>
					<li><a href="javascript:void(0)" rel="on" data-answer="gadget_geek" id="gadget_geek" class="item gadgets-gadget_geek_on">Gadget Geek</a></li>
					</ul>
					<h3 class="instruction item">Tap one</h3>
					
					<div rel="sidebar" id="sidebar" class="item">
					<span class="gadgets-phone_icon"></span>
					<h3 data-fact_title="true">Dig Out.<br/>Plug In.</h3>
					<p data-fact_body="true" data-fact_twitter="Colton, a conductor used in phones and laptops, is mined by slaves who see nothing of the $2bn the industry generates. #slaveryfootprint">

					Coltan is an effective capacitor found in electronics. A U.S. State Department official was interviewed about Coltan mining in the Democratic Republic of the Congo. He pointed to the reporter&#x27;s smartphone and said, &ldquo;The likelihood that one of these was not touched by a slave is pretty low.&rdquo;

					</p>
					<br style="clear:both"/>
					<div class="ft_sharable_fact margin10top" rel="horizontal_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>

					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="sporting_goods">
					<div id="sporting_goods_content" class="content_type">

					<div id="blocks">
					<div data-tag="baseball" class="block done item" id="baseball_canvas"></div>
					<div data-tag="football" class="block done item" id="americanfootball_canvas"></div>
					<div data-tag="biking" class="block done item" id="cycling_canvas"></div>
					<div data-tag="football" class="block done item" id="football_canvas"></div>
					<div data-tag="skiing" class="block done item" id="skiing_canvas"></div>
					<div data-tag="camping" class="block done item" id="camping_canvas"></div>
					<div data-tag="home_gym" class="block done item" id="running_canvas"></div>
					<div data-tag="snowboarding" class="block done item" id="snowboarding_canvas"></div>
					<div data-tag="golf" class="block done item" id="golf_canvas"></div>
					<div data-tag="snorkeling" class="block done item" id="snorkling_canvas"></div>
					<div data-tag="surfing" class="block done item" id="surfing_canvas"></div>
					<div data-tag="wakeboarding" class="block done item" id="waterskiing_canvas"></div>
					<div data-tag="fishing" class="block done item" id="fishing_canvas"></div>
					<div data-tag="snowwalking" class="block done item" id="snowwalking_canvas"></div>
					<div class="instruction item"><h3>Tap to select</h3></div>
					</div>

					<div id="sporting_facts" class="item">
					<h3 data-fact_title="true" class="item">The not so beautiful game.</h3>
					<p data-fact_body="true" class="item" data-fact_twitter="Chinese soccer ball manufacturers work up to 21 hours in a day, for a month straight. That calls for a red card. #slaveryfootprint">In China, soccer ball manufacturers will work up to 21 hours in a day, for a month straight.<br/>
					Even the toughest American coaches wouldn't ask that from their squads.</p>
					<div class="ft_sharable_fact" rel="horizontal_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>

					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="closet_clothing">
					<div id="closet_clothing_content" class="content_type">

                    <span class="closet_clothing-drag_here item" id="drag_here"></span>
                    
					<div class="item" id="upper_part">
					<span class="closet_clothing-upper_hanger_empty" id="upper_hanger_empty"></span>
					</div>

					<div id="denim_items" class="item">

					<span class="denim" id="denim1"></span>
					<span class="denim" id="denim4"></span>
					<span class="denim" id="denim8"></span>
					<span class="denim" id="denim12"></span>
					<span class="denim" id="denim16"></span>
					<span class="denim" id="denim20"></span>
					</div>

					<div id="tops_items" class="item">
					<span class="tops" id="tops1"></span>
					<span class="tops" id="tops5"></span>
					<span class="tops" id="tops10"></span>
					<span class="tops" id="tops15"></span>
					<span class="tops" id="tops20"></span>
					</div>

					<div id="dress_items" class="item">
					<span class="dress" id="dress1"></span>
					<span class="dress" id="dress3"></span>
					<span class="dress" id="dress5"></span>
					<span class="dress" id="dress8"></span>
					<span class="dress" id="dress10"></span>
					<span class="dress" id="dress13"></span>
					<span class="dress" id="dress15"></span>
					<span class="dress" id="dress18"></span>
					<span class="dress" id="dress20"></span>
					</div>

					<div class="item" id="denim">
					<span class="denim_number">0</span>
					{{if user.gender == "female"}}
					<span class="text">Denim / Pants / Skirts</span>
					{{else}}
					<span class="text">Denim / Pants</span>
					{{/if}}
					</div>

					<div class="item" id="button_denim">
					</div>

					<div class="item" id="tops">
					<span class="tops_number">0</span>
					{{if user.gender == "female"}}
					<span class="text">Tops</span>
					{{else}}
					<span class="text">Shirts / Sweaters</span>
					{{/if}}
					</div>

					<div class="item" id="button_tops">
					</div>

					<div class="item" id="dress">
					<span class="dress_number">0</span>
					{{if user.gender == "female"}}
					<span class="text">Dresses / Suits / Jackets</span>
					{{else}}
					<span class="text">Suits / Jackets</span>
					{{/if}}
					</div>

					<div class="item" id="button_dress">
					</div>

					<div class="item" id="bottom_part">
					<span class="closet_clothing-bottom_left_hanger_empty" id="bottom_left_hanger_empty"></span>
					<span class="closet_clothing-bottom_right_hanger_empty" id="bottom_right_hanger_empty"></span>
					</div>

					<div class="item" id="lingerie">
					<span class="lingerie_number">0</span>
					{{if user.gender == "female"}}
					<span class="text">Lingerie</span>
					{{else}}
					<span class="text">Underwear</span>
					{{/if}}
					</div>

					<div class="item" id="button_lingerie">
					</div>

					<div class="item" id="outerwear">
					<span class="outerwear_number">0</span>
					<span class="text">Accessories</span>
					</div>

					<div class="item" id="button_outerwear">
					</div>

					<div class="item" id="casual">
					<span class="casual_number">0</span>
					<span class="text">Shoes</span>
					</div>

					<div class="item" id="button_casual">
					</div>

					<div class="item" id="leather">
					<span class="leather_number">0</span>
					<span class="text">Leather Shoes</span>
					</div>

					<div class="item" id="button_leather">
					</div>

					<div id="lingerie_items" class="item">
					<span class="lingerie" id="lingerie1"></span>
					<span class="lingerie" id="lingerie4"></span>
					<span class="lingerie" id="lingerie8"></span>
					<span class="lingerie" id="lingerie12"></span>
					<span class="lingerie" id="lingerie16"></span>
					<span class="lingerie" id="lingerie20"></span>
					</div>

					<div id="outerwear_items" class="item">
					<span class="outerwear" id="outerwear1"></span>
					<span class="outerwear" id="outerwear7"></span>
					<span class="outerwear" id="outerwear14"></span>
					<span class="outerwear" id="outerwear20"></span>
					</div>

					<div id="casual_items" class="item">
					<span class="casual" id="casual1"></span>
					<span class="casual" id="casual7"></span>
					<span class="casual" id="casual14"></span>
					<!--span class="casual" id="casual20"></span-->
					</div>

					<div id="leather_items" class="item">
					<span class="leather" id="leather1"></span>
					<span class="leather" id="leather5"></span>
					<span class="leather" id="leather10"></span>
					<span class="leather" id="leather15"></span>
					<span class="leather" id="leather20"></span>
					</div>

					<div class="item sidebar" rel="sidebar" id="sidebar">
					<span class="cotton_icon"></span>
					<h3 data-fact_title="true">School's out for cotton.</h3>
					<p data-fact_body="true" data-fact_twitter="1.4 million children are forced to work in Uzbek cotton fields. There are fewer kids in the NYC public school system. #slaveryfootprint">
					1.4 million children have been forced to work in Uzbek cotton fields. There are fewer children in the entire New York City public school system.
					</p>

					<div class="ft_sharable_fact margin10top" rel="horizontal_right">
					<a href="javascript:void(0)" id="fb_sf">Facebook</a>
					<a href="javascript:void(0)" id="tw_sf">Twitter</a>
					<span id="sf_counter">0</span>
					</div>

					</div>

					</div>
				</script>
				<script type="text/x-jquery-tmpl" id="paid_for_sex">
					<div id="paid_for_sex_content" class="content_type">
					<div class="item" style="top:50px; position: absolute; left: 50px;">&nbsp;</div>
					<div id="sex_slider_scope" class="sliderscope"></div>
					<div id="zipper" class="zip_cropped-zip_cropped_00001"></div>
					<div id="behind_zipper">
					<h3>OK, We're not going to make you answer this one but here are some facts you<br/> should know.</h3>
					<p id="sex_p_1">
					The sex industry relies heavily on force, fraud, and coercion.
					</p>
					<p id="sex_p_2">
					Whether in massage parlors, brothels, or the streets,
					</p>
					<p id="sex_p_3">
					prostituted persons are regularly subjected to
					</p>
					<p id="sex_p_4">
					violence and denied the money they bring in.
					</p>
					<p id="sex_p_5">
					If you participate in these activities, you
					</p>
					<p id="sex_p_6">
					are contributing to the demand that
					</p>
					<p id="sex_p_7">
					fuels sex trafficking&mdash;making
					</p>
					<p id="sex_p_8">
					your slavery footprint
					</p>
					<p id="sex_p_9">
					inestimably bigger.
					</p>
					</div>

					</div>
				</script>
			</div>
			<div id="root_footer"></div>
		</div>
		<!-- End Container. -->

<div id="footer-navi">
	<div id="moredive">
            <div id="closer"><label onclick="moreClose();">X</label></div>
            <ul class="moreul">
                <li><a href="http://slaveryfootprint.org/about/#privacy">Privacy Policy</a></li>
                <li><a href="http://slaveryfootprint.org/about/#methodology">Methodology</a></li>
                <li><a href="http://slaveryfootprint.org/about/#terms">Terms and Conditions</a></li>
                <li><a href="http://slaveryfootprint.org/about/#getapp">Get App</a></li>
            </ul>
        </div>
    <div id="navi-dive">
        <ul id="list-nav">
            <li id="our_st"><a onClick="lightLoader(2);">Our Story</a></li>
            <li id="your_st"><a onClick="lightLoader(1);">Your Story</a></li>
            <li><a href="http://slaveryfootprint.tumblr.com/">Blog</a></li>
            <li><a href="https://donate.slaveryfootprint.org/page/contribute/fundraiser">Donate</a></li>
            <li id="more_diver"><a onclick="moreOpen();">More</a></li>
        </ul>
    </div>
    
<span id="share_links"> 
    <span id="share_fb">
        <img src="/static/css/img/general/fb_icon.png"/>
        <div id="share_fb_box">
            <img src="http://madeinafreeworld.org/fb_icon.png" width="50"/>
            <div id="share_fb_detail">
                <p>Slavery Footprint</p>
                <iframe src="//www.facebook.com/plugins/like.php?app_id=261713150526982&amp;href=https%3A%2F%2Fwww.facebook.com%2Fmadeinafreeworld&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>
            </div>
            <a id="close_fb" href="javascript:void(0);">X</a>
        </div>
    </span>
    <span id="share_tw">
        <img src="/static/css/img/general/twitter_icon.png"/>
        <div id="share_tw_counter"></div>
    </span>
</span>
		
</div>

		
		<div id="fb-root"></div>
<script>
  initFacebook();
</script>
		<script data-main="http://sharecropholder.com/static/js/facade" src="http://sharecropholder.com/static/js/require-min.js"></script>

<?php include 'light_contain_survey.html'; ?>

	</body>
</html>