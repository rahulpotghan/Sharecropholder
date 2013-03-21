<?php
$holding = false;

if (stripos($_SERVER['HTTP_USER_AGENT'], 'iPad')) {
header("location: ipad.html");
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:title" content="Slavery Footprint"/>
        <meta property="og:image" content="http://madeinafreeworld.org/fb_icon.png"/>
        <meta property="og:description" content="How many slaves work for you? There are 27 million slaves in the world today. Many of them contribute to the supply chains that end up in the products we use every day. Find out how many slaves work for you, and take action."/>
        <meta name="description" content="How many slaves work for you? There are 27 million slaves in the world today. Many of them contribute to the supply chains that end up in the products we use every day. Find out how many slaves work for you, and take action." />


        <title>Slavery Footprint - Made In A Free World</title>
        <link rel="stylesheet" type="text/css" href="css/main<?php if($holding) echo '_holding'; ?>.css" />
        <link rel="stylesheet" type="text/css" href="static/css/stylesheets/screen.css" />
        <link rel="stylesheet" type="text/css" href="static/css/stylesheets/hira_navi.css" />
        <!--[if IE]>
        <link rel="stylesheet" type="text/css" href="static/css/stylesheets/ie.css" />
        <![endif]-->
        <link rel="stylesheet" type="text/css" href="static/css/stylesheets/hira_l8.css" />
        <script src="js/config<?php if($holding) echo '_holding'; ?>.js"></script>
        <script type="text/javascript" charset="utf-8" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
        <script type="text/javascript">
                        if((window.screen.availWidth < 1024 && !navigator.userAgent.match(/iPad/i))) {
                                                window.location.href = "../mobile2.html";
                        }
        </script> 

        <script type="text/javascript" src="js/jquery.ifixpng.js"></script>
        <script type="text/javascript">
            (function($) {
                $.ifixpng('img/home/pixel.gif');
                $(function() {
                    $("img").ifixpng();
                });
            })(jQuery);
        </script>
        <script src="js/aniscroll.js"></script>
        <script src="js/mantra<?php if($holding) echo '_holding'; ?>.js"></script>
        <script src="js/Tween.js"></script>
        <script src="js/hiranya_l8box.js"></script>
        <script src="js/hiranya_navi.js"></script>

        <script src="static/js/login.js"></script>
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

    <body onLoad="init(); document.getElementById('lightX').style.display='block';">
        <style>
            #Unsuppoted-box
            {

                color:#fff;
                font-family:Georgia, "Times New Roman", Times, serif;
                font-size:14px;
                background-color:#31afc0;
                height:40px;
                width:100%;
                position:absolute;
                top:0;
                left:0;
                z-index:1000;

            }
            #Unsuppoted-box p b
            {
                font-weight:bolder;
            }
            #Unsuppoted-box p
            {
                margin-top:5px;
                margin-left:20px;
            }
            #Unsuppoted-box a
            {
                color:#fff;
                text-decoration:underline;
            }
        </style>

	<style type="text/css" rel="stylesheet">
		.white_contentX {
			display: none;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 700px;
			height: 500px;
			margin-left: -350px;
			margin-top: -250px;
			border: 1px solid  #d7d7d7;
			background-color: #F7F7EF;
			z-index:1002;
			overflow: auto;
			border-radius: 3px;
			box-shadow: 5px 5px 15px #d7d7d7;

			
			-moz-opacity: 0.9;
			opacity:.90;
			filter: alpha(opacity=90);
		}
		#box_closeX{
			position: absolute;
			float: right;
			padding: 10px;
			right: 0%;
		}
		#box_closeX a{
			color: #2faeb6;
			font-weight: bold;
			font-family: Arial;
			font-size: 16px;
			text-decoration: none;
		}
		#box_containtX{
			padding: 10px;
			padding-right: 25px;
			position: absolute;
			float:left;
			text-align: center;
			font-family: Georgia;
		}
		#box_containtX .p1{
			margin-left: 100px;
			font-size: 20px;
			color: #5d5a5a;
			text-align: left;
		}
		#box_containtX img{
			margin-left: 120px;
		}
	</style>

        <div id="Unsuppoted-box">
            <p>
                <b>The browser you are using does not support our survey.</b><br/>
                Please download <A href="http://www.mozilla.org/en-US/">Firefox</A> ,<A href="http://www.google.com/intl/en/chrome/">Chrome</A> or <A href="http://www.apple.com/safari/download/">Safari</A>  for the best experience.</p>
        </div>
        <script type="text/javascript">
            if((jQuery.browser.msie && jQuery.browser.version <= 9))
            {
			
            }
            else
            {
                $("#Unsuppoted-box").css('display','none');
            }
        </script>
        
        <style>
            #miafw-box
            {

                color:#fff;
                font-family:Georgia, "Times New Roman", Times, serif;
                font-size:14px;
 background:url(http://slaveryfootprint.org/zigzag_final.png) repeat-x;
                height:45px;
                width:100%;
                position:absolute;
                top:-1px;
                left:0;
                z-index:1000;
                text-align: left;

            }
            #miafw-box p b
            {
                font-weight:bolder;
            }
            #miafw-box p
            {
                margin-top:5px;
                margin-left:20px;
            }
            #miafw-box a
            {
                color:#fff;
                text-decoration:underline;
            }
        </style>
        
          <div id="miafw-box">
            <p>
            
                <b><a href="http://madeinafreeworld.com" target="_blank">Made in a Free World</a> -</b><em> A solution for business.</em></b><br/>
        
        </div>
        
        <div id="lightX" class="white_contentX">
			<div id="box_containtX">
				<br/>
				<p class="p1">
					You are the generation to end slavery. <br/>
					Lets get slavery out of our system. <br/>
					Find out how your life can be used to change the world. <br/>
					Get your footprint and make some noise. <br/>
				</p><br/><br/>
				<img src="group2.png" /><br/><br/><br/>
				<img src="footer_logo.png" />
			</div>
			<div id="box_closeX">
				<a href = "javascript:void(0)" onclick = "document.getElementById('lightX').style.display='none';document.getElementById('fade').style.display='none'">X</a>
			</div>
		</div>

        <div id="home-container">

            <div id="home-chains">
                <div id="home-chain-left"></div>
                <div id="home-chain-right"></div>
            </div>
            <div id="home-logo"></div>
            <div id="home-menu">
                <div id="home-menu-what"><a onClick="setAniscroll()"><img src="img/home/what.png" border="0" width="111" height="100" /></a></div>
                <div id="home-menu-separator"><img src="img/home/separator.png" border="0" width="38" height="100" /></div>
                <div id="home-menu-findout"><a href="survey/" target="_self"><img src="img/home/find_out.png" border="0" width="86" height="100" /></a></div>
            </div>

            <div id="scrollprompt"></div>
        </div>

        <div id="overlay-logo1"></div>
        <div id="overlay-logo2"></div>

    <header>
      <?php /*<div id="login-button"><script>dontShowSignup(); getLoginButton();</script></div>*/ ?>
            <div id="login-button" style="position: absolute;right: 30px;text-align: right;width: 230px; top:40px; z-index: 2000;"><span><a style="margin-right: 4px;" class="header" href="/sign-up/">Signup /</a><a class="header" href="/signup/#login">Login</a></span></div>
    </header>

        <div id="footer-navi">
            <div id="overlay-footer">
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
        </div>
        <script data-main="http://<?=$_SERVER['HTTP_HOST']?>/static/js/facade" src="http://<?=$_SERVER['HTTP_HOST']?>/static/js/require-min.js"></script>

        <div id="fb-root"></div>
        <?php
        if(!$holding) {
        ?>
        <script>
            initFacebook();
        </script>
        <?php
        }
        ?>
        <div style="display:none;"><div id="login"></div></div>

        <?php include 'light_contain.html'; ?>

    </body>
</html>
