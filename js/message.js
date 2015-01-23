(function($){
  var $heart = $('.heartbeat');
  var $message = $('.message');
  var $background = $('.background-image');
  var randomImg = 'img/'+Math.floor(Math.random()*(14-1) +1)+'.jpg';

  $heart.click(function(){
    $message.css('display','block');
  });

  $background.css('background-image', 'url('+randomImg+')');

}(window.jQuery));
