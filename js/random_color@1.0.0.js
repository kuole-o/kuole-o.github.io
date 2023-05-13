function random_color(){
  let random = Math.floor(Math.random()*8+1);
switch (random) {
  case 2 :
    $(this).addClass('randomb');
    break;
  case 3 :
    $(this).addClass('randomc');
    break;
  case 4 :
    $(this).addClass('randomd');
    break;
  case 5 :
    $(this).addClass('randome');
    break;
  case 6 :
    $(this).addClass('randomf');
    break;
  case 7 :
    $(this).addClass('randomg');
    break;
  case 8 :
    $(this).addClass('randomh');
    break;
  case 2 :
    $(this).addClass('randomi');
    break;
  case 1 :
    $(this).addClass('randoma');
    break;
  default :
    $(this).addClass('randomd');
}}

$(document).ready(function(){
function link_color(){
  $("div.flink-list-item").each(random_color);
}
  link_color();
});

window.addEventListener('load', function() {
  function moments_color(){
    $("div.moments-item").each(random_color);
  }
  moments_color();}
);