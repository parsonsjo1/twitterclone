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
	console.log ("writing"); 
	// https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
	var newTweetRef = chattyref.push(); 
	var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
	newTweetRef.set ({
		'message': message, 
		'sender': $("#input_sender").val(),
		'timeStamp' : timeStamp});
	console.log ("written at: " + timeStamp); 
}

// see https://firebase.google.com/docs/database/web/retrieve-data
function startTweetListener () 
{ 
	var list = chattyref.orderByChild('timeStamp').on('child_added', function (tweet) { 
			var sender = tweet.val().sender;
			var message = tweet.val().message; 
			var timeStamp = tweet.val().timeStamp;
			$("#tweetlist").prepend(
										'<div class="col-xs-6 col-xs-offset-3 tweet">' +
											'<p><div class="col-xs-12" id="sender">' + sender + '</div>' +
											'<div class="col-xs-10 col-xs-offset-1" id="message">'+ message + '</div>' +
											'<div class="col-xs-6 col-xs-offset-7" id="timeStamp">' + timeStamp + '</div></p>' +
											'<div class="row">' +
												'<div class="col-xs-4 icons">' +
													'<span class="fa fa-reply" aria-hidden="true"></span>' +
												'</div>' + 
												'<div class="col-xs-4 icons">' +
													'<span class="fa fa-heart" aria-hidden="true"></span>' +
												'</div>' +
												'<div class="col-xs-4 icons">' +
													'<span class="fa fa-trash" aria-hidden="true"></span>' +
												'</div>' +
											'</div>' +
										'</div>'

									); 
	}); 
}
	
$( document ).ready(function() {
	startTweetListener (); 

	//Hide tweet box
	$(".more_info").hide();

	//User pressed the enter key while in the input box
	$('#tweetbox').keypress(function(event) {
		console.log($("#input_tweet").val());

		if(event.key == "Enter")
		{
			//clear command
			if($("#input_tweet").val() == "admin_clear")
			{
				$("#tweetlist").empty();
				chattyref.set({});
			}
			else
				addtweet($('#input_tweet').val());
			$("#input_tweet").val("");
		}
		// note that the tweetlister may start before the tweet is added
		// because the random name generator might take some time to respond.
		//addtweet ($('#input_tweet').val()); 
	})

	//User activated the input box
	$("#input_tweet").focus(function(event) {
		$(".more_info").slideDown(1000);
	});

	//Hide element when focus is lost
	$("#tweetbox").focusout(function(event) {
		setTimeout(function() {
			var focus = $(document.activeElement);
			if(focus.is(".tweetbox_child") || $(".tweetbox_child").has(focus).length)
			{

			}
			else
			{
				$(".more_info").slideUp(1000);
			}
		}, 0);	
	});

	//User pushed the delete button

	//User pushed the thumbs up

	//User pushed the thumbs down
}); 