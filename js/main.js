(function($) {
  $.fn.drags = function(opt) {

    opt = $.extend({
      handle: "",
      cursor: "move"
    }, opt);

    isTouch = function(reset) {
      if (typeof(Modernizr) !== 'undefined') return Modernizr.touch;

      if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
        return true;
      } else {
        return false;
      }
    };

    if (opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }

    return $el.css('cursor', opt.cursor).bind("mousedown touchstart", function(ev) {
      if (opt.handle === "") {
        var $drag = $(this).prev().addClass('draggable');
      } else {
        var $drag = $(this).prev().addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        curX = (isTouch() ? ev.originalEvent.touches[0].pageX : ev.pageX),
        curY = (isTouch() ? ev.originalEvent.touches[0].pageY : ev.pageY),
        pos_y = $drag.offset().top + drg_h - curY,
        pos_x = $drag.offset().left + drg_w - curX;
      $drag.css('z-index', -1).parents().bind("mousemove touchmove", function(ev) {
        var curX = (isTouch() ? ev.originalEvent.touches[0].pageX : ev.pageX),
        curY = (isTouch() ? ev.originalEvent.touches[0].pageY : ev.pageY);
        $('.draggable').offset({
          top: curY + pos_y - drg_h,
          left: curX + pos_x - drg_w
        }).bind("mouseup touchend", function() {
          $(this).prev().removeClass('draggable').css('z-index', z_idx);
        });
      });
      ev.preventDefault(); // disable selection
    }).bind("mouseup touchend", function(ev) {
      if (opt.handle === "") {
        $(this).prev().removeClass('draggable');
      } else {
        $(this).prev().removeClass('active-handle').parent().removeClass('draggable');
      }
      ev.preventDefault();
    });

  }
})(jQuery);

$("#image2").drags();