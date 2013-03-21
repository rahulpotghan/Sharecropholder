jQuery(function(){

	jQuery('#updatecontent').submit(function(e){
		//form submitted, remove previous messages & show loading gif.
		$('#success').css('display','none');
		$('#error').css('display','none');
		$('#loading').css('display','block');
		//gather form action and data.
		var action = jQuery(this).attr('action');
		var data = jQuery(this).serialize();
		//carry out the ajax post
		jQuery.ajax({
			"url": action,
			"type":"POST",
			"data": data,
			//functions upon success
			"success": function(r){
				//hide loading gif
				$('#loading').css('display','none');
				//display success message
				$('#success').css('display','block');
				//console.log("Form successfully posted!");
			}
		
		})
		e.preventDefault();
	
	});

});

	//sendCurrentPage NEEDS TO BE RUN EACH TIME A PHASE(hash) CHANGES! ***********
	//currently only triggered by window.onload.


	window.onload = function() {
		sendCurrentPage();
	};

	function detectCurrentPage() { 
		var page = window.location.hash;
		return page;
	}
	
	function convertHashToInt(page) {
		if (page == "#one") {
			return 1;
		} else if (page == "#two") {
			return 2;
		} else if (page == "#three") {
			return 3;
		} else if (page == "#four") {
			return 4;
		} else if (page == "#five") {
			return 5;
		} else if (page == "#six") {
			return 6;
		} else if (page == "#seven") {
			return 7;
		} else if (page == "#eight") {
			return 8;
		} else if (page == "#nine") {
			return 9;
		} else if (page == "#ten") {
			return 10;
		} else if (page == "#eleven") {
			return 11;
		} else if (page == "#twelve") {
			return 12;
		}
	}
	
	function hideAllForms() {
		var i=0;
		for (i=0;i<13;i++) {
			$('#update'+i).css('display','none');
		}
	}
	
	function sendCurrentPage() {
		var page = detectCurrentPage();
		if (page == null) {
		$('#update1').css('display','block') //default to page 1 if no hash.
		} else {
		var pageint = convertHashToInt(page);
		//display:block the detected page form.
		//console.log('update'+pageint);
		hideAllForms();
		$('#update'+pageint).css('display','block');
		}
	
	}

	
    function selectFemale() {
        	$('#female_cutout img').fadeOut(400);
        	$('#female').fadeIn(400);
        	$('#female img').fadeIn(400);
        	unselectMale();
	}
	
	function unselectFemale() {
        	$('#female img').fadeOut(400);
        	$('#female_cutout img').fadeIn(400);
	}
	
	function selectMale() {
        	$('#male_cutout img').fadeOut(400);
        	$('#male').fadeIn(400);
        	$('#male img').fadeIn(400);
        	unselectFemale();
	}
	
	function unselectMale() {
        	$('#male img').fadeOut(400);
        	$('#male_cutout img').fadeIn(400);
	}