// run jquery once the page loads - "on ready"
$(document).ready(function() {
  //target tweet-text ID - on input, run function
  $("#tweet-text").on('input', function() {
    //counter is targeted
    const counter = $('.counter');
    //'this' being textarea (#tweet-text), count the length of the value inputted
    let length = $(this).val().length;
    //set max char count
    const maxCount = 140;
    //make the counter text equal to the remainnig chars
    counter.text(maxCount - length);
    //set counter color to a burgandy if >140 chars exceeded
    if (length > 140) {
      counter.css('color', '#C70039');
    } else {
      counter.css('color', 'black');
    }
  });
});