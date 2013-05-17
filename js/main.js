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

    return $el.css('cursor', opt.cursor).bind("mousedown touchstart", function(e) {
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
      $drag.css('z-index', -1).parents().bind("mousemove touchmove", function(e) {
        var topPosition = e.pageY + pos_y - drg_h,
          leftPosition = e.pageX + pos_x - drg_w;
        console.log(topPosition, ':', leftPosition);
        $('.draggable').offset({
          top: topPosition,
          left: leftPosition
        }).bind("mouseup touchend", function() {
          $(this).prev().removeClass('draggable').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).bind("mouseup touchend", function() {
      if (opt.handle === "") {
        $(this).prev().removeClass('draggable');
      } else {
        $(this).prev().removeClass('active-handle').parent().removeClass('draggable');
      }
    });

  }
})(jQuery);
$("#image2").pep({
  shouldEase: false,
  debug: false,
  drag: function(ev, obj) {
    var el = $(obj.el);
    var topPosition = el.position().top,
          leftPosition = el.position().left;
    $('#image1').offset({
          top: topPosition,
          left: leftPosition
      });
  }
});

//$("#image2").drags();