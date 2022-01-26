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


    //For Variant Product Single page

      function getVariantFromOptions() {
        let variantArr = []
        // console.log('hit', variantArr);
        $(".single-size insput").map(function (i, el) {
          let variant = { value: $(el).val(), index: $(el).data('index') };
          variantArr.push(variant);
        });
        return variantArr;
      }

      function updateHistoryState(variant) {

        if (!history.replaceState || !variant) {
          return;
        }
        var newurl = window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          '?variant=' +
          variant.id;

        window.history.replaceState({ path: newurl }, '', newurl);
      }

      $('.single-size input').on('change', function () {

        var form = document.querySelector('input[name="id"]:checked').value;

        var selectedValues = getVariantFromOptions();
        var variants = window.product.variants;
        var currency = window.Shopify.currency.active;
        // console.log(selectedValues)

        variants.forEach(function(item) {
          if(item.title == form){
            updateHistoryState(item)
            $('#variant-id').val(item.id);
            const price = item.price.toString();
            $('#price-single-page').html(currency+ " " + price.slice(0, -2) + ".00");
          }
      });

        var found = _.find(variants, function (variant) {
          return selectedValues.every(function (values) {
            return _.isEqual(variant[values.index], values.value);
          });
        });
        // console.log(found)
        // updateHistoryState(found)
        // $('#variant-id').val(found.id)
      });
  });

})(jQuery);