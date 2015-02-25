var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var words 	= [];

app.get('/scrape', function(req, res){

	res.send('Scraping!');

	var json = [];
	var result = [];
	var words = [];
	var alfabet = {
		'Letter_A' : "A",
		'Letter_B' : "B",
		'Letter_C' : "C",
		'Letter_D' : "D",
		'Letter_E' : "E",
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
		'Letter_Z' : "Z"
	};

	for (var letter in alfabet){
		var url = 'http://www.woordenlijst.net/woorden_beginnend_met.php?current=' + alfabet[letter];
		request(url, function(letter) {
			return function(err, resp, body) {
				if (err) throw err;

				console.log("Begonnen met het scrapen van letter: " + alfabet[letter]);

				$ = cheerio.load(body);
				links = $(".productlistingcontentsl a");
			    $(links).each(function(i, link){
		        	words[i] = $(this).text();
		        });
		        result.push(words);
		        console.log("Klaar met het scrapen van letter: " + alfabet[letter]);

		        if (alfabet[letter] == "Z") {
		       	 	fs.writeFile('output.json', JSON.stringify(result, null, 4), function(err){
		       	 		if (err) throw err;
						console.log('File successfully written! - Check your project directory for the output.json file');
					});
		        	return console.log("DONE!!!");
		        }
	    	};

	    	request.end();

		}(letter));
	}

});

app.listen('8081');
console.log('Klaar om te scrapen op poort 8081');
exports = module.exports = app;