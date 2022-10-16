function focusNav(elementTag) {
  let navigasi = document.querySelectorAll('.nav-link');

  for (const nav of navigasi) {
    nav.classList.remove('aktif');
  }

  elementTag.classList.add('aktif');
}

// make autoscroll to certain sections when menu on the navbar is clicked
$(document).ready(function(){
  $('.header').height($(window).height());
 
  $(".navbar a").click(function(){
      $("body,html").animate({
          scrollTop:$("#" + $(this).data('value')).offset().top
      },1000)
   
  })
})