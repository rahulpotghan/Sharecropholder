/*!
 * Tiny Circleslider 1.1
 * http://www.baijs.nl/tinycircleslider/
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 05 / 12 / 2010
 * Depends on library: jQuery
 */
(function($){
	$.fn.tinycircleslider = function(options){
		var defaults = { 
			interval: false, // move to another block on intervals.
			intervaltime: 3500, // interval time in milliseconds.
			snaptodots: true, //shows dots when user starts dragging and snap to them.
			hidedots: true, //fadesout the dots when user stops dragging.
			radius: 140, // Used to determine the size of the circleslider
			lightbox: false, // when you have links with a lightbox attached this most be true for normal links to work correctly this must be false.
			callback: null, // function that executes after every move
			snapcount: 5,
			arrowdiv: null,
			piediv: null,
			countdiv: null
		};
		var options = $.extend(defaults, options);  
		var snapCount = options.snapcount;
		var oCircle = $(this);
		var oCircleX = oCircle.outerWidth();
		var oCircleY = oCircle.outerHeight();
		var oThumb = $('.thumb', oCircle)[0];
		var oThumbX = $(oThumb).outerWidth();
		var oThumbY = $(oThumb).outerHeight();	
		var oOverview = $('.overview', oCircle);
		var oDot = {};
		var oTimer, oTimer2, oTimer3;
		var oChildren = oOverview.children();
		var oLinks = $('a',oChildren);
		var iPageX = $(oChildren[0]).outerWidth(true);
		var iChildsLength = snapCount, iOrginalAngle = 0, iCounter = 0, iCurrent = 0, iFramerate = 1;
		var arrowDiv = options.arrowdiv;
		var pieDiv = options.piediv;
		var countDiv = options.countdiv;
		var lastDegrees = 0;
		var oPos = {};
		
		initialize();
		
		var self = this;
		var api = {
			setSliderDegrees: function(val){
				var t = ( val / 180 * Math.PI);
				
				setCSS(t);
				
			
			}
		}
		
		return $.extend(self, api, {});
		
	
				
		function initialize(){
			if(options.snaptodots){setDots()};
			iOrginalAngle = 1;
			setEvents();
			if(options.interval){setTimer(true)}
		};		
		function setEvents(){
			oThumb.onmousedown = start;
			oThumb.ontouchstart = function(oEvent){
				oEvent.preventDefault();
				oThumb.onmousedown = null;
				start(oEvent);
				return false;
			}
			if(oLinks.length > 0){
				oCircle.css({'cursor':'pointer'}).click(function(oEvent){
					if ($(oEvent.target).hasClass('overlay')) {
						if (options.lightbox) {$(oLinks[iCurrent]).trigger('click'); }
						else {location.href = oLinks[iCurrent].href;}
					}
					return false;
				});
			}
			if(options.snaptodots){oDot.click(function(){if(iCounter == 0)gotoSlide($(this).text()-1)});}
		};
		function start(oEvent){
			clearTimeout(oTimer3);
			$(document).mousemove(drag);
			document.ontouchmove = function(oEvent){
				$(document).unbind('mousemove');
				drag(oEvent);
			};
			document.onmouseup = oThumb.onmouseup = end;
			oThumb.ontouchend = document.ontouchend = function(oEvent){
				document.onmouseup = oThumb.onmouseup = null;
				end(oEvent);
			}
			if(options.snaptodots && options.hidedots){oDot.stop(true, true).fadeIn('slow');}
			return false;
		};
		function end(oEvent){
			$(document).unbind('mousemove');
			document.ontouchmove = document.ontouchend = document.onmouseup = oThumb.onmouseup = oThumb.ontouchend = null;
			clearTimeout(oTimer2);
			
			if(options.snaptodots){
				if(options.hidedots){oDot.stop(true, true).fadeOut('slow');}
				calculateMove();
			};
			if(options.interval){setTimer();}
			return false;
		};
		function setTimer(bFirst){
			oTimer3 = setTimeout(function(){gotoSlide(iChildsLength * Math.random(), true)}, (bFirst ? 50 : options.intervaltime));
		};
		function setDots() {
			oDot = $('.dot', oCircle);
			var posX, posY;
			var oDotX = oDot.outerWidth(), oDotY = oDot.outerHeight();
			var iLength = (snapCount);
			
			var angle = 360 * (Math.PI/180);
			
			
			
			
			for(var i = 1; i <= iLength; i++){
				posY = Math.round(-Math.cos(i * angle - angle) * options.radius + (oCircleY /2 - oDotY /2) );
				posX = Math.round(Math.sin(i * angle - angle) * options.radius + (oCircleX /2 - oDotX /2) );
				//console.log('For ' +i+ ': Y='+posY+', X='+posX+'.');
				oDot.clone().addClass('dot-'+i).css({ left: posX, top: posY }).html('<span>'+i+'</span>').insertAfter(oDot);
			}
			oDot.remove();
			oDot = $('.dot', oCircle);
		};
		function drag(oEvent){
			oEvent.preventDefault();
			if(typeof(oEvent.touches) != 'undefined' && oEvent.touches.length == 1){ 
			    var oEvent = oEvent.touches[0]; 
			}
			oPos = {
				x: oEvent.pageX - oCircle.offset().left - (oCircleX / 2),
				y: oEvent.pageY - oCircle.offset().top - (oCircleY / 2)
			}

			iOrginalAngle = Math.atan2(oPos.x, -oPos.y);
			setCSS(iOrginalAngle);
			return false;
		};
		function calculateMove(){
			var iDropped = (iOrginalAngle * 180 / Math.PI) / (360 / iChildsLength) * 100;
			var iDot = Math.round((iOrginalAngle * 180 / Math.PI) / (360 / iChildsLength)) * 100;
			iFramerate = Math.max(1,Math.round(Math.abs(iDot - iDropped) /10));
			var iStep = ((iOrginalAngle * iDot / iDropped * 100) - (iOrginalAngle * 100)) / iFramerate;
			oTimer2 = setTimeout(function(){ stepMove(iStep, false); }, 100);
		};
		function setCSS(angle, bFireCallback){
			
			if (!isNaN(angle)) {
				var iDegrees = Math.round( angle * 180 / Math.PI);
				iDegrees = iDegrees < 0 ? iDegrees +360 : iDegrees;
				
				
				//moves the 'overview' div according to angle.
				var rDegrees = iDegrees - 120;
				
				//oOverview[0].style.left = -(iDegrees / 360 * ((iPageX * (iChildsLength)))) + 'px';
				
				//$('#debug').html('Mouse pos x: '+oPos.x+' <br/>lastDegrees: '+lastDegrees+' <br/>iDegrees: '+iDegrees);
				//console.log("degrees "+iDegrees+" posx "+oPos.x+" last "+lastDegrees);
				var draw = true
				if (iDegrees < 180 && oPos.x >= 0 && lastDegrees > 270) {
					//console.log("RIGHT");
					//PREVENT the scrolling.
					//console.log("denied! went from 360 to 0.");
					angle = 0;
					iDegrees = 360;
					rDegrees = iDegrees - 120;
					if(lastDegrees == iDegrees) {
						draw = false;
					}		
				} else if (iDegrees > 230 && oPos.x < 0 && lastDegrees <180) {
					//console.log("LEFT");
					//console.log("denied! went from 0 to 360.");
					angle = 0;
					iDegrees = 0;
					rDegrees = iDegrees - 120;
					if(lastDegrees == iDegrees) {
						draw = false;
					}		
				} 
				if(draw){
					//console.log("RIGHT");
					//degrees is on the right
					oThumb.style.top = Math.round(-Math.cos(angle) * options.radius + (oCircleY /2 - oThumbY /2)) + 'px';
					oThumb.style.left = Math.round(Math.sin(angle) * options.radius + (oCircleX /2 - oThumbX /2)) + 'px';
					
					$(arrowDiv).css('-webkit-transform','rotate('+rDegrees+'deg)');
					$(arrowDiv).css('-moz-transform','rotate('+rDegrees+'deg)');
					$(arrowDiv).css('-ms-transform','rotate('+rDegrees+'deg)');
					$(arrowDiv).css('transform','rotate('+rDegrees+'deg)');
					
					var colorCount = Math.round(iDegrees/360 * 100);
					$(countDiv).html(colorCount+'%');
					var pieRotate = Math.round(iDegrees/2);
					
					$(pieDiv).css('-moz-transform','rotate('+pieRotate+'deg)');
					$(pieDiv).css('-webkit-transform','rotate('+pieRotate+'deg)');
					$(pieDiv).css('-ms-transform','rotate('+pieRotate+'deg)');
					$(pieDiv).css('transform','rotate('+rDegrees+'deg)');
					
					iCurrent = (Math.round(iChildsLength -1, Math.round(iDegrees / 360 * iChildsLength)));
					if(typeof options.callback == 'function')options.callback(colorCount,pieDiv,options.pieid,options.arrayid);
					lastDegrees = iDegrees;
					
				} else {
					return false;
				}
				
			}
		};
	};

})(jQuery);