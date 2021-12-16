/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //inserts the tweet into the tweet-container section
  const renderTweets = function (tweets) {
    //Makes sure that you don't load all tweets again
    $('.tweet-container').empty()
    //loop through tweets
    for (const tweet of tweets) {
      //renderTweet passes tweet into createTweet
      let $renderTweet = createTweetElement(tweet);
      //appends the tweet to the tweetContainer element
      $('.tweet-container').append($renderTweet);
    }
  }

  //creates a new tweet element using jQuery
  const createTweetElement = function (tweet) {
    const $tweet = $(
    `<article>
       <div class="tweet-box-top">
          <div id="tweet-user">
             <img src="${tweet.user.avatars}"> 
             <p>${tweet.user.name}</p>
          </div>
          <div>${tweet.user.handle}</div>
       </div>
       <div>
          <div id="the-tweet">
             <p>${tweet.content.text}</p>
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
      renderTweets(tweet);
    })
  }
  loadTweets();
})

