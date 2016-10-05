var config = {
	//apiKey: "AIzaSyBDgHk3_m-vqyUbTGIqgCZ8qAb-CoY5ID4",
	authDomain: "luminous-torch-6850.firebaseapp.com",
	databaseURL: "https://luminous-torch-6850.firebaseio.com",
	storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);
// https://firebase.google.com/docs/reference/js/firebase.database.Reference
var chattyref = firebase.database().ref('chattyJoshy/'); 
moment().format();

// from 
// http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function capitalizeFirst(str)
{
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function addtweet (message) 
{
	// get a random user. 
	// note something important here.  I put the code to write the
	// tweet inside the callback for the ajax request.  
	// this is simplistic, but it makes sure that I've got the 
	// random person back before I try to write to the database. 
	//$.ajax({
	//	url: 'https://randomuser.me/api/?nat=us,gb,fr,br,es',
	//	dataType: 'json',
	//	success: function(data) {
	//		console.log (data);
	//		var name = data.results[0].name; 
	//		var randomUserName = name.first + " " + 
	//							 name.last;
	//		var location = data.results[0].location; 

	//		console.log('name is '+ randomUserName);

	console.log ("writing"); 
	// https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
	var newTweetRef = chattyref.push(); 
	var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
	var sender = "parsonsjo1";
	newTweetRef.set ({
		'message': message, 
		'sender': sender,
		'timeStamp' : timeStamp});
	console.log ("written at: " + timeStamp); 

	//Clear out the input box
	$("#input_tweet").val("");
	//	}
	//});
}

// see https://firebase.google.com/docs/database/web/retrieve-data
function startTweetListener () 
{ 
	var list = chattyref.orderByChild('timeStamp').on('child_added', function (tweet) { 
			var sender = tweet.val().sender;
			var message = tweet.val().message; 
			var timeStamp = tweet.val().timeStamp;
			$("#tweetlist").append('<div class="row tweets"><div class="col-xs-6 col-xs-offset-3"><p><b>' + sender + '</b><br>tweeted: '+ message +'<br>' + timeStamp + '</p></div></div>'); 
	}); 
}
	
$( document ).ready(function() {
	startTweetListener (); 
	$('#input_tweet').keypress(function(event) {
		console.log($("#input_tweet").val());

		if(event.key == "Enter")
		{
			if($("#input_tweet").val() == "clear")
			{
				$("#tweetlist").empty();
				chattyref.set({});
				$("#input_tweet").val("");
			}
			else
				addtweet($('#input_tweet').val());
		}
		// note that the tweetlister may start before the tweet is added
		// because the random name generator might take some time to respond.
		//addtweet ($('#input_tweet').val()); 
	})
}); 