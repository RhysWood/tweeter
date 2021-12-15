/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1639350094296
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1639436494296
    }
  ]

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      let $renderTweet = createTweetElement(tweet);
      $('.tweet-container').append($renderTweet);
    }
  }

  const createTweetElement = function (tweet) {
    const $tweet = $(`<article> 
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
      <p>${tweet.created_at}</p>
    </div>
    <div id="tweet-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
  </article>`);
    return $tweet;
  }
  renderTweets(tweetData);
});

