(function ($) {
  "use strict";
  /*-------------------------------------------
  preloader active
  --------------------------------------------- */
  jQuery(window).on('load', function () {
    jQuery('.preloader').fadeOut('slow');
  });

  /*-------------------------------------------
  Sticky Header
  --------------------------------------------- */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 80) {
      $('#sticky').addClass('stick');
    } else {
      $('#sticky').removeClass('stick');
    }
  });

  jQuery(document).ready(function () {
    $('.close-btn').on('click', function () {
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
      console.log(newVal);
      $('input#quantity').val(newVal);
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
    $('.search-btn a').on('click', function () {
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

      variants.forEach(function (item) {
        if (item.title == form) {
          updateHistoryState(item)
          $('.variant-idss').val(item.id);
          const price = item.price.toString();
          $('#price-single-page').html(currency + " " + price.slice(0, -2) + ".00");
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


    //Add To Cart
    $('.skipChart').on('click', function (e) {
      var form = $('#addToCart');
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/cart/add',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
          var current_url = window.location.href;
          console.log(current_url);
          window.location.href = current_url;
          // $('div#offcanvasCart').toggleClass('show');
          // $('div#offcanvasCart').css({
          //   'visibility': 'visible'
          // });
        }
      });
    });

    //Update To Cart Data
    $('.updateSkipBtn').on('click', function (e) {
      var form = $('#cartUpdate');
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/cart',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
          var current_url = window.location.href;
          console.log(data, current_url);
          document.location.href = current_url;
          $('div#offcanvasCart').toggleClass('show');
          // $('div#offcanvasCart').css({
          //   'visibility': 'visible'
          // });
        }
      });
    });

  });

  //Remove Product
  $('.close-item').on('click', function (e) {
    var form = $('#cartUpdate');
    var User_id = $(this).attr('data-id');
    console.log(User_id);
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: "/cart/change",
      dataType: 'json',
      data: {
        "line": User_id,
        "quantity": 0
      },
      success: function (data) {
        var current_url = window.location.href;
        document.location.href = current_url;
        
      }
    });
  });

// $('.btn-close').on('click', function () {
//   $('div#offcanvasCart').toggleClass('show');
//   $('div#offcanvasCart').css({
//     'visibility': 'hidden'
//   });
// });

//Ajax Search for Search Bar

//Ajax Search Result
$(document).ready(function () {
  $("#search-box").keyup(function () {
    console.log('iiin')
    const search_result = $('.search-item-list');
    const query = document.querySelector('input').value;
    const searchSection = $('.search-section');
    var ajax_spiner = $('.search-loading');

    if (query != '') {
      $.ajax(
        {
          url: '/search/suggest.json?q=' + query + '&resources[type]=product',
          type: 'GET',
          dataType: 'json',
          beforeSend: function () {
            ajax_spiner.show();
          }
        }
      ).done(function (data) {
        if (data.resources.results.products != null) {
          search_result.hide();
          $(search_result).empty();
          data.resources.results.products.forEach(function (product) {
            console.log(product)
            search_result.show();
            var html = '<a href="' + product.url + '" class="single-search-item">';
            html += '<div class="item-thumbnail">';
            html += '<img src="' + product['image'] + '" alt="" width="80px" alt="product image">';
            html += '</div>';
            html += '<div class="item-info">';
            html += '<h3>' + product.title + '</h3>';
            html += '</div>';
            html += '</a>';
            ajax_spiner.hide();
            $(search_result).append(html);
          });
        } else {
          search_result.hide();
          $(search_result).empty();
          $(search_result).append("<li>No Data Found</li>");
        }
      });
    } else {
      search_result.hide();
      $(search_result).empty();
      $(search_result).append("<li>No Data Found</li>");
    }
    $(search_result).empty();
  });

});


}) (jQuery);