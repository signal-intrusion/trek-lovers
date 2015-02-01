(function () {

  var map = document.getElementsByClassName('map--container')[0];
  var iframe = document.getElementsByClassName('map--iframe')[0];

  map.addEventListener('click', function(event){
    iframe.classList.remove('is-disabled');
  }, true);

  map.addEventListener('mouseleave', function(event){
    iframe.classList.add('is-disabled');
  }, true);

}());
