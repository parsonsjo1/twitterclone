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

function addtweet () 
{
	//console.log ("writing message"); 
	// https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
	var newTweetRef = chattyref.push(); 
	var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
	newTweetRef.set ({
		'message': $("#input_tweet").val(), 
		'sender': $("#input_sender").val(),
		'inReplyTo': "",
		'timeStamp' : timeStamp});
	//console.log ("written at: " + timeStamp); 
	$("#input_tweet").val("");
}

function replyToTweet (inReplyTo) 
{
	//console.log ("writing " + $("#" + inReplyTo + " #row_reply #input_reply").val()); 
	// https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
	var newTweetRef = chattyref.push(); 
	var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
	newTweetRef.set ({
		'message': $("#" + inReplyTo + " #row_reply #input_reply").val(), 
		'sender': $("#" + inReplyTo + " #row_reply #input_sender").val(),
		'inReplyTo' : inReplyTo,
		'timeStamp' : timeStamp
	});
	//console.log ("written at: " + timeStamp); 
	$("#" + inReplyTo + " #row_reply #input_reply").val("");
}

// see https://firebase.google.com/docs/database/web/retrieve-data
function startTweetListener () 
{ 
	var list = chattyref.orderByChild('timeStamp').on('child_added', function (tweet) { 
		var sender = tweet.val().sender;
		var message = tweet.val().message;
		//console.log("message: " + message); 
		var inReplyTo = tweet.val().inReplyTo;
		var timeStamp = tweet.val().timeStamp;
		var key = tweet.key;
			if(inReplyTo == "")
			{
				$("#tweetlist").prepend(
											'<div class="col-xs-6 col-xs-offset-3 tweet" id=' + '"' + key + '">' +
												'<p><div class="col-xs-12" id="sender">' + sender + '</div>' +
												'<div class="col-xs-10 col-xs-offset-1" id="message">'+ message + '</div>' +
												'<div class="col-xs-12" id="timeStamp">' + timeStamp + '</div></p>' +
												'<div class="row">' +
													'<div class="col-xs-4 icons" id="icons_reply">' +
														'<div class="fa fa-reply" id=' + '"' + key + '" aria-hidden="true"></div>' +
													'</div>' + 
													'<div class="col-xs-4 icons" id="icons_heart">' +
														'<div class="fa fa-heart" id=' + '"' + key + '" aria-hidden="true"></div>' +
													'</div>' +
													'<div class="col-xs-4 icons" id="icons_trash">' +
														'<div class="fa fa-trash" id=' + '"' + key + '" aria-hidden="true"></div>' +
													'</div>' +
												'</div>' +
												'<div class="row" id="row_reply">' + 
													'<div class="col-xs-12" id="replybox">' +
														'<div class="col-xs-12 replybox_child">' +
															'<input class="input" id="input_reply" maxlength="100" placeholder="What\'s Your Reply?"></input>' +
														'</div>' +
														'<div class="col-xs-8 replybox_child">' +
															'<input class="input" id="input_sender" maxlength="30" placeholder="What\'s Your Name?"></input>' +
														'</div>' +
														'<div class="col-xs-4 replybox_child">' +
															'<button class="button fa fa-twitter" id="button_reply">Reply!</button>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</div>'
										); 
			}
			else
			{
				var id = "#" + inReplyTo;
				var width = $(id + " > div").css("width");
				width = parseInt(width);
				width = width*(0.9);
				width = width + "px";
				console.log(".reply_" + inReplyTo);
				console.log("id" + id);
				$(id).after(
								'<div class="col-xs-6 col-xs-offset-3 tweet_reply_container reply_' + inReplyTo +'" id="' + key +'">' +
									'<div class="col-xs-12 pull-right tweet_reply"  style="width:' + width + '">' +
										'<p><div class="col-xs-12" id="sender">' + sender + '</div>' +
										'<div class="col-xs-10 col-xs-offset-1" id="message">'+ message + '</div>' +
										'<div class="col-xs-12" id="timeStamp">' + timeStamp + '</div></p>' +
										'<div class="row">' +
											'<div class="col-xs-4 icons" id="icons_reply">' +
												'<div class="fa fa-reply" id="' + key + '" aria-hidden="true"></div>' +
											'</div>' + 
											'<div class="col-xs-4 icons" id="icons_heart">' +
												'<div class="fa fa-heart" id="' + key + '" aria-hidden="true"></div>' +
											'</div>' +
											'<div class="col-xs-4 icons" id="icons_trash">' +
												'<div class="fa fa-trash" id="' + key + '" aria-hidden="true"></div>' +
											'</div>' +
										'</div>' +
									'</div>' +
									'<div class="col-xs-12" id="row_reply" style="padding-right:0;">' + 
										'<div class="col-xs-12 pull-right" id="replybox" style="width:' + width + '; margin-top:0;">' +
											'<div class="col-xs-12 replybox_child">' +
												'<input class="input" id="input_reply" maxlength="100" placeholder="What\'s Your Reply?"></input>' +
											'</div>' +
											'<div class="col-xs-8 replybox_child">' +
												'<input class="input" id="input_sender" maxlength="30" placeholder="What\'s Your Name?"></input>' +
											'</div>' +
											'<div class="col-xs-4 replybox_child">' +
												'<button class="button fa fa-twitter" id="button_reply">Reply!</button>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>'
							); 
			}
	});

	chattyref.orderByChild('timeStamp').on('child_removed', function (tweet) { 
			//console.log(tweet.key);
			var key = "#" + tweet.key;
			$(key).remove();
	});

}
	
$( document ).ready(function() {
	startTweetListener (); 

	//Hide tweet box
	$(".more_info").hide();

	//User pressed the enter key while in the input box
	$('#tweetbox').keypress(function(event) {
		//console.log($("#input_tweet").val());

		if(event.key == "Enter")
		{
			//clear command
			if($("#input_tweet").val() == "admin_clear")
			{
				$("#tweetlist").empty();
				chattyref.set(null);
			}
			else
				addtweet();
		}
		// note that the tweetlister may start before the tweet is added
		// because the random name generator might take some time to respond.
		//addtweet ($('#input_tweet').val()); 
	});

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

	$("#button_tweet").click(function(){
		addtweet();
	}); 
	
	//User pushed the delete button; Using body to delegate for dynamic buttons
	$('body').on('click', '#icons_trash', function(event){
		//delete tweet
		var id = $(event.currentTarget.children).attr('id');
		$(".reply_"+id).each(function(){
			//console.log(this.id);
			chattyref.child(this.id).remove();
		});
		chattyref.child(id).remove();
	}); 

	//User pushed the heart
	$('body').on('click', '#icons_heart', function(event){
		//increase font size
		var id = $(event.currentTarget.children).attr('id');
		//console.log(id);
		var id = "#icons_heart > #" + id;
		var fontSize = parseInt($(id).css("font-size"));
		fontSize = fontSize + 1;
		//console.log("fontSize: " + fontSize);
		var id = ".icons > #" + id;
		$(".icons").css({"font-size": fontSize});
	}); 

	//User pushed the reply
	$('body').on('click', '#icons_reply', function(event){
		//Show reply box
		var id = $(event.currentTarget.children).attr('id');
		//console.log(id);

		var id = "#" + id + " > #row_reply > #replybox";
		if(!$(id).is(":visible"))
		{
			$(id).slideDown(1000);
			$(id + " #input_reply").focus();
		}
	}); 

	//User pressed the enter key while in the reply box
	$('body').on('keypress', '.tweet', function(event) {
		//console.log($("#input_reply").val());

		if(event.key == "Enter")
		{
			var id = $(event.currentTarget).attr('id');
			//console.log(id);
			replyToTweet(id);
		}
	});	

	//User pressed the enter key while in the reply box
	$('body').on('keypress', '.tweet_reply_container', function(event) {
		//console.log($("#input_reply").val());

		if(event.key == "Enter")
		{
			var id = $(event.currentTarget).attr('id');
			//console.log(id);
			replyToTweet(id);
		}
	});	

	//User pressed the enter key while in the counter
	$('body').on('keyup', '#input_counter_max', function(event) {
		var counter_max = $("#input_counter_max").val();
		//console.log("counter" + counter_max);

		if(counter_max == "")
		{
			showTweets($(".tweet").length);
		}
		else if(counter_max < $(".tweet").length + 1)
		{
			showTweets(counter_max);
		}
		else
		{
			$("#input_counter_max").val($(".tweet").length);
			showTweets($(".tweet").length);
		}
	});	

	//Hide element when focus is lost
	$("body").on("focusout", "#row_reply", function(event) {
		setTimeout(function() {
			var focus = $(document.activeElement);
			//console.log(focus);
			var id = $(event.currentTarget.parentElement).attr('id');
			//console.log(id);
			if(focus.is(".replybox_child") || $(".replybox_child").has(focus).length)
			{

			}
			else
			{
				var id = "#" + id + " > #row_reply > #replybox";
				if($(id).is(":visible"))
					$(id).slideUp(1000);
			}
		}, 0);	
	});

	$("body").on("click", "#button_reply", function(event) {
		var id = $(this).closest(".tweet").attr('id');
		if(id == undefined)
			id = $(this).closest(".tweet_reply_container").attr('id');
		replyToTweet(id);
	});

	$("body").on("click", "#button_plus", function(event) {
		var counter_max = $("#input_counter_max").val();
		if(++counter_max < $(".tweet").length + 1)
		{
			$("#input_counter_max").val(counter_max);
			//console.log(counter_max);
			showTweets(counter_max);
		}
		else
		{
			$("#input_counter_max").val(0);
			showTweets(0);
		}
	}); 

	$("body").on("click", "#button_minus", function(event) {
		var counter_max = $("#input_counter_max").val();
		if(--counter_max > -1)
		{
			$("#input_counter_max").val(counter_max);
			//console.log(counter_max);
			showTweets(counter_max);
		}
		else
		{
			$("#input_counter_max").val($(".tweet").length);
			showTweets($(".tweet").length);
		}
	});  

}); 

function showTweets(numberToShow) {
	var counter = 0;
	$(".tweet").each(function(){
		if(++counter > numberToShow)
		{
			//console.log(".reply_" + this.id);
			$(this).hide();
			$(".reply_" + this.id).hide();
		}
		else
		{
			$(this).show();
			$(".reply_" + this.id).show();
		}
	});
}