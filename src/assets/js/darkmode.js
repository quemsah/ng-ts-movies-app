const enableDarkMode = () => {
  $('h4, button').not('.check').toggleClass('text-white');
  $('.list-panel a').toggleClass('dark-grey-text');
  $('.card .card-profile').toggleClass('dark-card-admin');
  $('body, .navbar').toggleClass('white-skin navy-blue-skin');
  $('#dark-mode').toggleClass('white text-dark btn-outline-black dark-card-admin').removeClass('text-dark');
  $('body').toggleClass('dark-bg-admin');
  $('h6, .card, p, td, th, i, li a, h2, h4, h5, input, label').not(
    '#slide-out i, #slide-out a, .dropdown-item i, .dropdown-item').toggleClass('text-white').removeClass('text-dark');
  $('.btn-dash').toggleClass('grey blue').toggleClass('lighten-3 darken-3');
  $('.gradient-card-header').toggleClass('white black lighten-4');
  $('.list-panel a').toggleClass('navy-blue-bg-a text-white').toggleClass('list-group-border');
  $('.card, .card-rating, .card-favourite, .card-watch-later').toggleClass('dark-card-admin');
  $('.card-rating a').toggleClass('text-white');
  $('.card-favourite a').toggleClass('text-white');
  $('.card-watch-later a').toggleClass('text-white');
  $('.dropdown-content').toggleClass('dark-card-admin');
  $('.dropdown-content li > a, .dropdown-content li > span').toggleClass('text-white');
  $('.chip').toggleClass('text-white').toggleClass('dark-card-admin');
  $('.full-movie-card').removeClass('dark-card-admin');
  $('.card .actor-card').removeClass('dark-card-admin');
  $('.card .actor-card').toggleClass('white-skin navy-blue-skin');
  //comments start
  $('.question-card .btn.btn-sm').toggleClass('dark-card-admin');
  $('i.far.fa-thumbs-up').removeClass('text-white');
  $('i.far.fa-thumbs-down').removeClass('text-white');
  $('i.far.fa-trash-alt').removeClass('text-white');
  //$('i.far.fa-edit').removeClass('text-white');
  $('.comment-btns a i.far.fa-edit').toggleClass('simple-gray-text');
  //comments end
  $('.select-rating').toggleClass('text-white');
  $('.select-option').toggleClass('dark-card-admin');
  $('.form-control').removeClass('text-dark').toggleClass('text-white');
  $('.movie-bg.card').removeClass('dark-card-admin').removeClass('text-white');
  $('.movie-bg.card i').removeClass('text-white');
  $('.form-control').toggleClass('text-white');
  $('.md-form textarea.md-textarea').toggleClass('text-white');
}

const disableDarkMode = () => {
  $('h4, button').not('.check').removeClass('text-white');
  $('.list-panel a').removeClass('dark-grey-text');
  $('.card .card-profile').removeClass('dark-card-admin');
  $('body, .navbar').removeClass('white-skin navy-blue-skin');
  $('#dark-mode').removeClass('white text-dark btn-outline-black dark-card-admin').toggleClass('text-dark');
  $('body').removeClass('dark-bg-admin');
  $('h6, .card, p, td, th, i, li a, h2, h4, h5, input, label').not(
    '#slide-out i, #slide-out a, .dropdown-item i, .dropdown-item').removeClass('text-white');
  $('.btn-dash').removeClass('grey blue').removeClass('lighten-3 darken-3');
  $('.gradient-card-header').removeClass('white black lighten-4');
  $('.list-panel a').removeClass('navy-blue-bg-a text-white').removeClass('list-group-border');
  $('.card, .card-rating, .card-favourite, .card-watch-later').removeClass('dark-card-admin');
  $('.card-rating a').removeClass('text-white');
  $('.card-favourite a').removeClass('text-white');
  $('.card-watch-later a').removeClass('text-white');
  $('.dropdown-content').removeClass('dark-card-admin');
  $('.dropdown-content li > a, .dropdown-content li > span').removeClass('text-white');
  $('.chip').removeClass('text-white').removeClass('dark-card-admin');
  $('.full-movie-card').toggleClass('dark-card-admin');
  $('.card .actor-card').toggleClass('dark-card-admin');
  $('.card .actor-card').removeClass('white-skin navy-blue-skin');
  //comments start
  $('.question-card .btn.btn-sm').removeClass('dark-card-admin');
  $('i.far.fa-thumbs-up').toggleClass('text-white');
  $('i.far.fa-thumbs-down').toggleClass('text-white');
  $('i.far.fa-trash-alt').toggleClass('text-white');
  //$('i.far.fa-edit').toggleClass('text-white');
  $('.comment-btns a i.far.fa-edit').removeClass('simple-gray-text');
  //comments end
  $('.select-rating').removeClass('text-white');
  $('.select-option').removeClass('dark-card-admin');
  $('.form-control').toggleClass('text-dark').removeClass('text-white');
  $('.movie-bg.card').toggleClass('dark-card-admin').toggleClass('text-white');
  $('.movie-bg.card i').toggleClass('text-white');
  $('.form-control').removeClass('text-white');
  $('.md-form textarea.md-textarea').removeClass('text-white');
}

//  $('#dark-mode').click(function (event) {
//    enableDarkMode(event);
//  });

//  сразу
//  (function ($) {
//    $('#dark-mode').ready(function (event) {
//      enableDarkMode(event);
//      console.log('Dark mode!');
//    });
//  })(jQuery);

//  сразу
//  (function (event) {
//    enableDarkMode(event);
//    console.log('Dark mode is on!');
//  })();
