var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var words 	= [];

app.get('/scrape', function(req, res){
	var json = { woorden : "" }
	var woorden;

	var alfabet = {
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

	var scrape = function(callback) {
		// function scrape(callback) {
			var url = 'http://www.woordenlijst.net/woorden_beginnend_met.php?current=' + alfabet[letter];
		    request(url, function(error, response, body) {
		      if (error) {
		        return console.error('upload failed:', error);
		      }

		    var $ = cheerio.load(body);
		    links = $(".productlistingcontentsl a");
		      $(links).each(function(i, link){    
		        var sop = $(this).text();
		        words[i] = sop;
				words.push(', '); 
			    callback(words);
		      });
		    // words.push(', '); 
		    // callback(words);
		    });
		}
		for (letter in alfabet) {
			    scrape(function(err, words, letter){
			    	if (err) return console.log(err);
					json.woorden = words;
			    	// for (var i=0; i<3; i++){
			    	// 	console.log("Done! " + i);
			    	// }


				});
		}		
		
	 	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			console.log('File successfully written! - Check your project directory for the output.json file');
		})

	res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;


// // define our function with the callback argument
// function some_function(arg1, arg2, callback) {
//     // this generates a random number between
//     // arg1 and arg2
//     var my_number = Math.ceil(Math.random() *
//         (arg1 - arg2) + arg2);
//     // then we're done, so we'll call the callback and
//     // pass our result
//     callback(my_number);
// }
// // call the function
// some_function(5, 15, function(num) {
//     // this anonymous function will run when the
//     // callback is called
//     console.log("callback called! " + num);
// });

