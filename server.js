var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var words 	= [];

app.get('/scrape', function(req, res){
	var json = { woorden : "" }
	var woorden;

	letters = {
		'Letter_A' : "A",
		'Letter_B' : "B",
		'Letter_C' : "C",
		'Letter_D' : "D",
		'Letter_E' : "E",
		'Letter_D' : "D",
		'Letter_F' : "F",
		'Letter_G' : "G",
		'Letter_H' : "H",
		'Letter_I' : "I",
		'Letter_J' : "J",
		'Letter_K' : "K",
		'Letter_L' : "L",
		'Letter_M' : "M",
		'Letter_N' : "N",
		'Letter_O' : "O",
		'Letter_P' : "P",
		'Letter_Q' : "Q",
		'Letter_R' : "R",
		'Letter_S' : "S",
		'Letter_T' : "T",
		'Letter_U' : "U",
		'Letter_V' : "V",
		'Letter_W' : "W",
		'Letter_X' : "X",
		'Letter_Y' : "Y",
		'Letter_Y' : "Z"
	};

	for (letter in letters) {
		var scrape = function( callback ) {
			var url = 'http://www.woordenlijst.net/woorden_beginnend_met.php?current=' + letters[letter];
		    request(url, function(error, response, body) {
		      if (error) {
		        return console.error('upload failed:', error);
		      }

		    var $ = cheerio.load(body);
		    links = $(".productlistingcontentsl a");
		      $(links).each(function(i, link){    
		        var sop = $(this).text();
		        words[i] = sop;
		      });
		    words.push(', '); 
		    if (callback) callback()
		    });
		}

		
	    scrape(function(words){
	    	for (var i=0; i<2; i++){
	    		console.log("Done! " + i);
	    	}
		});
	    json.woorden = words;


		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			console.log('File successfully written! - Check your project directory for the output.json file');
		})
	}

	res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
