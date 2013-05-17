(function($) {
  $.fn.drags = function(opt) {

    opt = $.extend({
      handle: "",
      cursor: "move"
    }, opt);

    if (opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }

    return $el.css('cursor', opt.cursor).on("mousedown touchstart", function(e) {
      if (opt.handle === "") {
        var $drag = $(this).prev().addClass('draggable');
      } else {
        var $drag = $(this).prev().addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', -1).parents().on("mousemove touchmove", function(e) {
        var topPosition = e.pageY + pos_y - drg_h,
          leftPosition = e.pageX + pos_x - drg_w;
        console.log(topPosition, ':', leftPosition);
        $('.draggable').offset({
          top: topPosition,
          left: leftPosition
        }).on("mouseup touchend", function() {
          $(this).prev().removeClass('draggable').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup touchend", function() {
      if (opt.handle === "") {
        $(this).prev().removeClass('draggable');
      } else {
        $(this).prev().removeClass('active-handle').parent().removeClass('draggable');
      }
    });

  }
})(jQuery);
$(document).bind('touchstart', function(event) {
  var orig = event.originalEvent;
  var x = orig.changedTouches[0].pageX;
  var y = orig.changedTouches[0].pageY;
  alert("x:" + x + "y:" + y);
});
$("#image1").click(function(e) {
  var parentOffset = $(this).parent().offset();
  //or $(this).offset(); if you really just want the current element's offset
  var relX = e.pageX - parentOffset.left;
  var relY = e.pageY - parentOffset.top;
  console.log(relX, ":", relY);
});

$("#image2").drags();