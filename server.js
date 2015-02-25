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
	var dictionary = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z"
	];

	dictionary.forEach(function(letter){
		var url = 'http://www.woordenlijst.net/woorden_beginnend_met.php?current=' + letter;
		request(url, function(letter) {
			return function(err, resp, body) {
				if (err) throw err;

				console.log("Started scraping letter: " + letter);

				$ = cheerio.load(body);
				links = $(".productlistingcontentsl a");
			    $(links).each(function(i, link){
		        	words[i] = $(this).text();
		        });
		        result.push(words);
		        console.log("Finished scraping letter: " + letter);

		        if (letter == "Z") {
		       	 	fs.writeFile('output.json', JSON.stringify(result, null, 4), function(err){
		       	 		if (err) throw err;
						console.log('File successfully written! - Check your project directory for the output.json file');
					});
		        	return console.log("DONE!!!");
		        }
	    	};

	    	request.end();

		}(letter));
	});

});

app.listen('8081');
console.log('Ready for scraping on port 8081');
exports = module.exports = app;