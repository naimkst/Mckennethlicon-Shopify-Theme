(function($) {
  "use strict";
  /*-------------------------------------------
  preloader active
  --------------------------------------------- */
  jQuery(window).on('load',function() {
    jQuery('.preloader').fadeOut('slow');
  });

  /*-------------------------------------------
  Sticky Header
  --------------------------------------------- */
  $(window).on('scroll', function(){
    if( $(window).scrollTop()>80 ){
      $('#sticky').addClass('stick');
    } else {
      $('#sticky').removeClass('stick');
    }
  }); 
  
  jQuery(document).ready(function(){
    $('.close-btn').on('click', function() {
      $('.header-top').hide();
    });
    /*-------------------------------------------
    js scrollup
    --------------------------------------------- */
    $.scrollUp({
      scrollText: '<i class="fa fa-angle-up"></i>',
      easingType: 'linear',
      scrollSpeed: 300,
      animation: 'fade'
    }); 
    /*-------------------------------------------
    Product Quantity JS
    --------------------------------------------- */
    var productQty = $(".product");
    productQty.append('<button class="inc qty-btn">+</button>');
    productQty.append('<button class= "dec qty-btn">-</button>');
    $('.qty-btn').on('click', function (e) {
      e.preventDefault();
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue > 1) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      $button.parent().find('input').val(newVal);
    });
    /*-------------------------------------------
    product-thumb-slide active
    --------------------------------------------- */
    $('.product-image-slide').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: false,
      asNavFor: '.product-image-thumbnail',
      draggable: false,
    });
    $('.product-image-thumbnail').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product-image-slide',
      dots: false,
      arrows: false,
      focusOnSelect: true,
      vertical: true,
    });
    // search area show hide 
    $('.search-btn a').on('click', function() {
      $('.search-form-area').toggleClass('show');
    });
  });

})(jQuery);