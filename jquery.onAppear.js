/*
 * jQuery.onAppear v0.1.1
 * https://github.com/neopeak/jquery.onAppear
 *
 * Copyright 2014, Cedric Veilleux <cveilleux@neopeak.com>
 *
 * Licensed under the Apache v2 Licence
 */
;(function($) {

  function inViewport(element, viewportRect) {
    var elementRect = element.getBoundingClientRect();

    // the element is visible if it has at least one of its corner in the container
    var corners = [{x: elementRect.left, y: elementRect.top},
                   {x: elementRect.right, y: elementRect.top},
                   {x: elementRect.left, y: elementRect.bottom},
                   {x: elementRect.right, y: elementRect.bottom}];

    for(var i = 0; i < corners.length; i++) {
      var corner = corners[i];
      if (corner.y <= viewportRect.bottom &&
          corner.y >= viewportRect.top &&
          corner.x >= viewportRect.left &&
          corner.x <= viewportRect.right) {
        return true;
      }
    }

    return false;
  }

  function getViewport(container) {
    if (container[0] == window) {
      var screenHeight = window.innerHeight || document.documentElement.clientHeight;
      var screenWidth = window.innerWidth || document.documentElement.clientWidth;
      return {top: 0, left: 0, right: screenWidth, bottom: screenHeight, height: screenHeight, width: screenWidth};
    }
    return container[0].getBoundingClientRect();
  }

  function delayedAppearCheck(instance) {
    if (instance.timer) {
       clearTimeout(instance.timer);
    }
    instance.timer = setTimeout(
      function() {
        instance.timer = false;
        appearCheck(instance);
      },
      instance.options.scrollDelay
    );
  }

  function appearCheck(instance) {
    // do nothing if all items have been processed
    if (instance.items.length == 0)
      return;

    // what's the viewport?
    var viewportRect = getViewport(instance.options.container);

    // find the elements that are in viewport
    var newList = [];
    for(var i = 0; i < instance.items.length; i++) {
      if (inViewport(instance.items[i], viewportRect)) {
        $(instance.items[i]).trigger(instance.options.event);

      } else if (instance.options.once) {
        // item not visible, we will try again next time
        newList.push(instance.items[i]);
      }
    }

    // clean up if 'once' options is enabled
    if (instance.options.once) {
      instance.items = newList;
    }

  }

  $.fn.initAppear = function(options) {
    // do nothing if nothing selected
    if($(this).length == 0)
      return;

    var defaults = {
      container: $(window),
      scrollDelay: 200,
      event: 'appear',
      once: false,
    };

    options = $.extend(defaults, options);

    var instance = {options: options, items: this.get()};

    var instanceChecker = function() {
      delayedAppearCheck(instance);
    };

    options.container.on('scroll', instanceChecker);
    $(window).on('resize', instanceChecker);

    appearCheck(instance);
  };

})(jQuery);
