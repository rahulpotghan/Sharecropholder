// Thanks to Mathias Pettersson for the initial inspiration: 
//   http://github.com/mape
// See also the PeepCode Screencast on Node.js
//   https://peepcode.com/products/nodejs-i



function ResultsMap() {
	
  var we_are_on = [];	
	
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  var self = this;

  this.init = function() {
    self.drawMap();
    self.viewDidResize();

    // Sample locations:

  //  self.drawMarker({  latitude:'51.5'
  //                    , longitude:'-0.1'
  //                    , city:"London"
  //                    , title:'14ºC'});
  // 
  };

  this.drawMap = function () {
    self.map = Raphael('results_map', 0, 0);
    self.map.canvas.setAttribute('viewBox', '0 0 603 299');

    self.map.path(resultsmap).attr({
        stroke: 'black'
      , fill: '#10afb5'
      , 'stroke-width': 0.0
    });
  }

  this.viewDidResize = function () {
    var width = 783,
      windowHeight = jQuery(window).height(),
      mapCanvasHeight = 783 * (443.0 / 783.0);

    self.map.setSize(width, mapCanvasHeight);

  }

  this.geoCoordsToMapCoords = function (latitude, longitude) {
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    var mapWidth = 609,
      mapHeight = 306,
      x, y, mapOffsetX, mapOffsetY;

    x = (mapWidth * (180 + longitude) / 360) % mapWidth;

    latitude = latitude * Math.PI / 180;
    y = Math.log(Math.tan((latitude / 2) + (Math.PI / 4)));
    y = (mapHeight / 2) - (mapWidth * y / (2 * Math.PI));

    mapOffsetX = mapWidth * 0.084;
    mapOffsetY = mapHeight * 0.069;

    return {
      x: (x - mapOffsetX) * 0.98,
      y: (y + mapOffsetY + 15),
      xRaw: x,
      yRaw: y
    };
  }

  this.drawMarker = function (message) {
	
	/// prop
    var latitude = message.latitude,
      longitude = message.longitude,
      text = message.city,
      city = message.city,
	  score = (message.score * 20),
      x, y;

	

    var mapCoords = this.geoCoordsToMapCoords(latitude, longitude);
    x = mapCoords.x;
    y = mapCoords.y;
	if(typeof self.person != "undefined"){
		jQuery(self.person.node).remove();
	}
	
	if(typeof self.flag != "undefined"){
		jQuery(self.flag.node).remove();
	}
	
	//console.log(score)
	
	if(score > 40){
		score = 40;
	}
	
	if(score < 9){
		score = 9;
	}
	
	var flag = self.map.circle(50,50,score);
	flag.scale(0.8, 0.8);
    flag.translate(-35, -34); // Reset location to 0,0
   	flag.translate(x, y);
	flag.attr({

        fill: '#fcc500'
        ,stroke: 'transparent'
    });
	
    var person = self.map.circle(50,50,5);
    person.scale(0.8, 0.8);
    person.translate(-35, -34); // Reset location to 0,0
   	person.translate(x, y);
    person.attr({
        fill: '#E84A4F'
        ,stroke: 'transparent'
		,"stroke-width":2
    });

    // var title = self.map.text(x, y + 11, text);
    // title.attr({
    //     fill: 'black'
    //   , "font-size": 10
    //   , "font-family": "'Helvetica Neue', 'Helvetica', sans-serif"
    //   , 'font-weight': 'bold'
    // });
    // var subtitle = self.map.text(x, y + 21, city);
    // subtitle.attr({
    //     fill: '#999'
    //   , "font-size": 7
    //   , "font-family": "'Helvetica Neue', 'Helvetica', sans-serif"
    // });

    var hoverFunc = function () {
      person.attr({
        fill: 'white'
      });
      jQuery(title.node).fadeIn('fast');
      // jQuery(subtitle.node).fadeIn('fast');
    };
    var hideFunc = function () {
      person.attr({
        fill: '#ff9'
      });
      // jQuery(title.node).fadeOut('slow');
      // jQuery(subtitle.node).fadeOut('slow');
    };

	jQuery(flag.node).css({"cursor": "pointer"});
	jQuery(person.node).css({"cursor": "pointer"});

    jQuery(person.node).toggle(function(){
	
		for(var i =0; i<we_are_on.length;i++){
			var p = we_are_on[i]["person"];
			var f = we_are_on[i]["flag"];
			p.attr({
				fill: "#E84A4F"
			});
			f.attr({
				fill: "#fcc500"
			});
		}
		we_are_on = [];
	
		we_are_on.push({"person": person, "flag" : flag });
		
		jQuery("#tooltip h3").text(message.city);
		var fact = getCountryFacts(message.city);
		jQuery("#tooltip p").text(fact);
		jQuery("#tooltip").slideDown(200);
		person.attr({
			fill: "#FFF"
		});
		flag.attr({
			fill: "#e8494e"
		});
	}, function(){
		jQuery("#tooltip").slideUp(200);
		person.attr({
			fill: "#E84A4F"
		});
		flag.attr({
			fill: "#fcc500"
		});
	});
	
	jQuery(flag.node).toggle(function(){
		
		for(var i =0; i<we_are_on.length;i++){
			var p = we_are_on[i]["person"];
			var f = we_are_on[i]["flag"];
			p.attr({
				fill: "#E84A4F"
			});
			f.attr({
				fill: "#fcc500"
			});
		}
		we_are_on = [];
	
		we_are_on.push({"person": person, "flag" : flag });
		
		jQuery("#tooltip h3").text(message.city);
		var fact = getCountryFacts(message.city);
		jQuery("#tooltip p").text(fact);
		jQuery("#tooltip").slideDown(200);
		person.attr({
			fill: "#FFF"
		});
		flag.attr({
			fill: "#e8494e"
		});
	}, function(){
		jQuery("#tooltip").slideUp(200);
		person.attr({
			fill: "#E84A4F"
		});
		flag.attr({
			fill: "#fcc500"
		});
	});
	
    // self.person.animate({
    //   scale: '0.6, 0.6'
    // }, 2000, 'elastic', function () {
    //   // jQuery(title.node).fadeOut(5000);
    //   // jQuery(subtitle.node).fadeOut(5000);
    // });
  }

  this.init();
  return self;

}

function getCountryFacts(country) {
	switch (country) {
		case "Africa":
			return "Enslaved, beaten, and forced to work in sub-human conditions, children satisfy the demand for cheap labor in Africa's agricultural, mining and fishing industries. Raw materials from slavery include: Platinum, Titanium, Chromium, Diamond, Cotton, Limestone, Gold. Copper";
		case "Brazil":
			return "Over 25,000 Brazilian men and boys are enslaved on cattle ranches, logging camps and mining camps, sugar-cane plantations and large farms producing corn, cotton, soy and charcoal. Raw materials from slavery include: Brick, Castor Oil, Coffee, Corn, Cotton, Emerald, Iron, Pig Iron, Soybeans, Silicon";
		case "China":
			return "Coal mines, brick kilns and factories in the poorest regions of China operate illegally, using much of China’s estimated 150 million internal migrants as slaves. Raw materials from slavery include: Acrylic, Cashmere, Coal, Cotton, Gold, Graphite, Leather, Limestone, Linen, Mercury, Nylon, Pearl, Quartz, Silicon, Silk, Silver, Tin, Tungsten, Wool, Pig Iron, Lead, Lithium, Polyester";
		case "Burma":
			return "Burmese military authorities threaten both children and adults into many forms of forced labor and even military service. Raw materials from slavery include: Brick, Rubber";
		case "Ecuador":
			return "In everything from ice cream to makeup to soap, palm oil is one of the world's most in demand products—which is unfortunate for the Colombian refugees and migrants enslaved producing it on Ecuadorian palm oil plantations. Raw materials from slavery include: Brick, Gold";
		case "Dominican Republic":
			return "Both Haitians and Dominicans are trafficked within the Dominican Republic's construction, agricultural and domestic service industries. Raw materials from slavery include: Aloe, Coffee ";
		case "Egypt":
			return "Local gangs prey on Egypt's hundreds of thousands of street children, forcing them to beg and selling them for sex. Raw materials from slavery include: Cotton, Limestone, Timber";
		case "France":
			return "Commercial sex trafficking networks controlled by Bulgarians, Romanians, Nigerians, and the French themselves force around 20,000 women into prostitution in France. Raw materials from slavery include: Silicon";
		case "Germany":
			return "Although 25% of all European sex trafficking victims pass through Germany, the majority of traffickers convicted in the country are not required to serve any jail time. Raw materials from slavery include: Acetone, Acrylic, Alcohol, Polysilicon, Quartz, Sand"; 
		case "Ghana":
			return "10,000 children work in Ghanaian gold mines alone. Thousands more are enslaved in the agricultural, sex and service industries. The total number of traffickers convicted in 2010? Four. Raw materials from slavery include: Gold";
		case "Hungary":
			return "While many Hungarians are trafficked to the United Kingdom, Spain, Canada and the United States, many more find themselves enslaved within Hungary. ";
		case "India":
			return "Millions from India's lower castes are enslaved in brick kilns, rice mills, and embroidery factories. Hundreds of thousands more are trafficked to the Middle East, United States and Europe to work as domestic servants and low-skilled laborers. Raw materials from slavery include: Beeswax, Brick, Carbon, Coal, Cotton, Graphite, Leather, Limestone, Linen";
		case "Indonesia":
			return "Indonesian brokers traffic 50% of all Indonesians working abroad - around 4.5 million people - equal to the entire population of Washington D.C. Raw materials from slavery include: Late, Nickel, Palm Oil, Rubber, Tin";
		case "Italy":
			return "Agriculture and the service industry drive Italy's forced labor market. Organized crime is usually responsible for trafficking and overseeing victims from Poland, Romania, Pakistan, Albania, Morocco, Bangladesh, China, Ghana, and Cote d’Ivoire. Raw materials from slavery include: Coral, Leather, Quartz, Sand";
		case "Afghanistan":
			return "Organized criminal networks force Afghan boys into prostitution, street begging, carpet-weaving and drug smuggling throughout Afghanistan, Pakistan, Saudi Arabia and Iran. Raw materials from slavery include: Brick, Cashmere";
		case "Argentina":
			return "Argentina is a trafficking hub for Bolivians, Paraguayans, Peruvians and Argentine citizens from the poorer northern provinces. Most are enslaved on farms and in sweatshops or forced to beg on the street. Raw materials from slavery include: Beeswax, Brick, Cotton, JoJoba, Soybeans";
		case "Australia":
			return "Leveraging family and business connections overseas, Australian crime syndicates traffic in labor from throughout Asia and the Pacific. Victims are enslaved by a combination of document confiscation, threats of physical harm, and debt bondage. Raw materials from slavery include: Cobalt, Gold, Iron, Lanolin Oil, Lead, Nickel, Pearl, Wool, Titanium"
		case "Bangladesh":
			return "Not unlike Antebellum America, recruiters in Bangladesh charge up to $6,000 for placement services, only to offer jobs paying as little as $100 a month and effectively sentence workers to a life of debt bondage as they try to repay the fee. Raw materials from slavery include: Brick, Leather ";
		case "Bolivia":
			return "\"Loaned\" by their families, trafficked Bolivian children are forced to work in mines, on farms or run drugs. Adults are trafficked to Argentina, Brazil, Chile, Peru, Spain, and the United States to slave in sweatshops, factories, and agriculture. Raw materials from slavery include: Corn, gold, Silver, Tin, Zinc";
		case "Cambodia":
			return "Cambodian women and children are trafficked throughout Southeast Asia. Most end up forced into prostitution, begging, domestic service, shrimping or in the production of bricks, rubber and salt. Raw materials from slavery include: Brick, Rubber";
		case "Canada":
			return "Many Asians, Eastern Europeans and Latin Americans legally immigrate to Canada only to find themselves exploited in agricultural, manufacturing and processing plants. Raw materials from slavery include: Aluminum, Jade, Linen, Platinum, Tungsten, Titanium";
		case "Chile":
			return "Luring women and girls with fraudulent job offers, Chilean traffickers force their victims into prostitution and domestic service. Traffickers also use children as drug mules along the Peruvian and Bolivian boarders. Chile’s raw materials include: Borax, copper, Lithium, Mercury";
		case "Democratic Republic of Congo":
			return "Slavery isn't confined to mining, agricultural and sex industries in the DRC. The Congolese Army enslaves hundreds to carry munitions, supplies, looted goods, water and firewood or to construct facilities. Many die of exhaustion or are just killed. Raw materials from slavery include: Cobalt, 			Coltan, Copper, Coffee, Diamond, Gold, Tungsten, Tin";
		case "Japan":
			return "Japanese traffickers import migrant workers from throughout Asia and hold them captive through debt bondage, threats of violence or deportation and blackmail. Raw materials from slavery include: Pearl, Pig Iron, Polysilicon, Quartz, Cadmium";
		case "South Korea":
			return "Hundreds of thousands of migrants work under the Employment Permit System in the ROK. Employers abuse the excessive power the EPS grants them, often withholding wages, confiscating passports and forcing employees to work under horrid conditions. ";
		case "Malaysia":
			return "Malaysia enslaves close to four million documented and undocumented foreigners. Recruited to work in hotels and restaurants, once they arrive most are forced into Malaysia's thriving sex trade or onto plantations and construction sites. Raw materials from slavery include: Latex, Palm Oil, Rubber, Ruby, Wood/Timber, Mother of Pearl";
		case "Mali":
			return "The Malian agricultural, mining, service and sex industries aren't the only ones exploiting children. Religious leaders also force boys to work and beg for them. Raw materials from slavery include: Gold.";
		case "Mexico":
			return "Mexico's trafficking is primarily internal. Victims from Chiapas, Veracruz, Puebla, Oaxaca, and Tlaxcala are forced into farming, domestic service, construction and street begging within Mexico as well as the United States. Raw materials from slavery include: Coffee, Silver, Aloe, Cedar Wood, Fluorspar";
		case "Mongolia":
			return "Promised a husband by South Korean marriage brokers, Mongolian women arrive only to find themselves enslaved instead of engaged. Meanwhile, Mongolian men are trafficked to China, Turkey, Kazakhstan, the Czech Republic and Poland. Raw materials from slavery include: Cashmere, 			Coal, Fluorspar";
		case "Nigeria":
			return "The Nigerian slave trade revolves around children. Those not trafficked out of the country find themselves forced into domestic servitude, prostitution or are sent to gold mines and stone quarries. Religious leaders force others to beg. Raw materials from slavery include: Gypsum";
		case "Pakistan":
			return "Landowners enslave 1.8 million Pakistanis as bonded laborers in the agricultural and brick industries. Those seeking legal help are often kidnapped along with their families. Raw materials from slavery include: Leather, Coal, Brick, Cotton ";
		case "Peru":
			return "The Peruvian slave trade cuts across many industries—the men are forced mine, log, farm and make bricks. The women are enslaved as prostitutes. The children made to beg and run drugs. Raw materials from slavery include: Tin, JoJoba, Silver, Wood/Timber, Zinc, Brick, Copper";
		case "Philippines":
			return "Filipino traffickers move so many victims they've starting chartering flights to transport them. Most are bound for factories, construction sites, fishing vessels, and plantations throughout Asia and the Middle East. Raw materials from slavery include: Corn, Rubber";
		case "Russia":
			return "Across Russia you'll find over one million slaves. On the streets of Moscow you'll find an estimated 20,000-30,000 children involved in prostitution. Raw materials from slavery include: Nickel, Mica, Pig iron, Platinum, Aluminum, Tungsten, Petroleum";
		case "Saudi Arabia":
			return "Because Saudi Arabia requires foreign workers to get an \"exit visa\" from their employers, Asian and African migrants can work months or even years beyond their contract before employers grant them an exit permit. Raw materials from slavery include: Ethylene, Paraffin, Petroleum, Acetone, 			Alcohol";
		case "South Africa":
			return "Nigerian gangs run the sex trade within South Africa, sending women to the United States to be exploited. Chinese and Taiwanese men are enslaved in mobile sweatshops that move in and out of Lesotho and Swaziland to evade labor inspection. Raw materials from slavery include: Chromium, Titanium";
		case "Spain":
			return "Migrants aren't the only ones exploited in Spain. Spanish nationals find themselves trafficked within the country's domestic service, agriculture, construction and tourism sectors as well. Raw materials from slavery include: Gypsum";
		case "Taiwan":
			return "Taiwanese labor brokers charge migrants up to $8,000 in recruitment fees, enslaving them in Taiwan’s manufacturing, domestic and fishing industries until they come up with the money. Raw materials from slavery include: Nylon, Polyester";
		case "Thailand":
			return "While slaves in the Thai garment, sex and domestic sectors certainly don't have it easy, the Thai fishing industry is particularly brutal. Physical violence and murder at sea is well documented. Raw materials from slavery include: Latex, Rubber";
		case "Turkey":
			return "Turkish organized crime forces children into the drug trade, prostitution, and pick pocketing. Turkish children are also trafficked through forced marriage. Raw materials from slavery include: Acrylic, Cotton";
		case "Turkmenistan":
			return "Traffickers target men and women from Turkmenistan for domestic servitude in Turkey, Russia, the United Kingdom, as well as within Turkmenistan. Raw materials from slavery include: Cotton";
		case "United Kingdom":
			return "Unaccompanied children in the UK are especially vulnerable to trafficking. Many are forced into prostitution or to beg and steal. Gangs are known to force children to work in cannabis farms. ";
		case "USA":
			return "14,500 to 17,500 victims are trafficked in the U.S. each year. Most are women and children forced into the sex industry. Raw materials from slavery include: Copper, Corn, Gold, Nylon, Soybeans, Limestone, Propane";
		case "Uzbekistan":
			return "Slavery in Uzbekistan centers around cotton. During the harvest the government forces school- age children, along with adults, to pick cotton. Russian traffickers also target Uzbeks for the Russian agricultural and construction industries. Raw materials from slavery include: Cotton, Silk";
		case "Zambia":
			return "Zambian women and children are exploited in the country's domestic, agricultural and textile sectors while men are forced to work in mines and on construction sites. Raw materials from slavery include: Cobalt, Cotton, Emerald. ";
		case "Vietnam":
			return "Just in Ghana, 10,000 children work in the gold mines. Now add Burundi, Senegal, Mali, Peru, Vietnam... Raw materials from slavery include: Coffee. ";
		case "Kyrgyzstan":
			return "The Kazakh tobacco industry forces entire families from throughout Central Asia and Africa to pick tobacco.";
		case "EU":
			return "Raw materials from slavery include: Ethanol, Rayon.";
		case "Burkina Faso":
			return "Raw materials from slavery include: Gold, Cotton.";
		case "Myanmar":
			return "Raw materials from slavery include: Jade, Ruby.";
		case "Venezuela":
			return "Raw materials from slavery include: Aloe.";
		case "Ukraine":
			return "Raw materials from slavery include: Coal";

	}
}