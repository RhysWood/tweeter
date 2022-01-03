/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//resetCounter outside document.ready - can be reused
const resetCounter = () => {
  const counter = $('.counter')
  const maxCount = 140;
  counter.text(maxCount);
}

$(document).ready(function () {
  //prevents XSS (people adding script to txt box to hack)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //inserts the tweet into the tweet-container section
  const renderTweets = function (tweets) {
    //Make sure that you don't load all tweets again
    $('.tweet-container').empty()
    //loop through tweets
    for (const tweet of tweets) {
      //renderTweet passes tweet into createTweet
      let $renderTweet = createTweetElement(tweet);
      //prepend the tweet to the tweetContainer element
      //prepend means the latest tweet will show first
      $('.tweet-container').prepend($renderTweet);
    }
  }

  const errorMessages = function (errMsg) {
    //insert under error ID, display errMsg input
    $('#error').slideDown().text(errMsg);
    //slide up after 3 seconds
    setTimeout(() => {
      $('#error').slideUp();
      //cursor focus back on textarea
      $('textarea').focus();
    }, 3000);
  }
  //creates a new tweet element using jQuery
  const createTweetElement = function (tweet) {

    //tweet user input templates
    const avatar = $("<div>").text(tweet.user.avatars).html();
    const name = $("<div>").text(tweet.user.name).html();
    const handle = $("<div>").text(tweet.user.handle).html();
    const text = $("<div>").text(tweet.content.text).html();

    const $tweet = $(
      `<article>
       <div class="tweet-box-top">
          <div id="tweet-user">
             <img src="${escape(avatar)}"> 
             <p>${escape(name)}</p>
          </div>
          <div>${escape(handle)}</div>
       </div>
       <div>
          <div id="the-tweet">
             <p>${escape(text)}</p>
          </div>
       </div>
       <footer>
          <div>
             <p>${timeago.format(tweet.created_at)}</p>
          </div>
          <div id="tweet-icons">
             <i class="fas fa-flag"></i>
             <i class="fas fa-retweet"></i>
             <i class="far fa-heart"></i>
          </div>
       </footer>
    </article>`
    );
    return $tweet;
  }

  // Post New Tweet
  $('.form-tweet').on('submit', event => {
    //prevent page from reloading
    event.preventDefault();
    //validates tweet size
    let tweetLength = $('#tweet-text').val().length;
    if (tweetLength > 140) {
      errorMessages('YOUR TWEET IS TOOOO LONG! 140 MAX');
      return;
    } else if (!tweetLength) {
      errorMessages('YOU NEED TO ENTER A TWEET FIRST');
    };
    resetCounter();

    //define tweet as the form input and serialize data
    let $tweet = $('.form-tweet').serialize();
    //post tweet to tweets
    $.post('/tweets/', $tweet, (err, data) => {
      loadTweets();
      //clears text box after post
      const $input = $('#tweet-text');
      $input.val('').focus();
    })
  });
  //loads the previous tweets
  const loadTweets = () => {
    $.get('/tweets', (tweet) => {
      //callback to the renderTweet function
      renderTweets(tweet);
    })
  }
  loadTweets();
})

