jquery.onAppear
===============

## Synopsis

jQuery plugin that provides an "appear" event, indicating an element is now within the window or any scrollable element's viewport.
By binding an even listener on the event, you can lazy load images, videos, extra listing items, extra pages (infinite scrolls), etc.

## Why?

There are many similar jQuery plugins available but none that worked for my needs. What makes this plugin different:

- Triggers an event when the element becomes visible (defaults to 'appear'). Just bind an event listener to load your content.
- Works on any scrollable element. Defaults to the window, but also works for scrollable divs.
- Can be stacked: A large element that is lazy loaded when it 'appears' can insert smaller placeholders that are also lazy loaded. 
- Can be enabled on different elements with different options (multiple instances).
- Waits for the user to stop scrolling before firing the event, avoids loading hundreds of items if a user scrolls fast over a large page.
- Small and simple code-base, only ~100 lines, less than 1kB minified/gzipped.

## Usage

The plugin will only fire 'appear' events for the elements you initialize it with.

```js
$(selector).on('appear', function() {
  // This gets executed when the item becomes visible.
  // Do whatever you need here, like replacing the element with something more fancy, animating the element,
  // or ajax loading content. 

  // As an example here, we make it flicker:
  $(this).hide();
  $(this).fadeIn();
});

// call initAppear() after your appear event handler(s) are bound.
$(selector).initAppear();
```

For a more complex example, see demo.html.


## Options

The initAppear() accepts the following options. Below are the defaults:

```js
{
  container: $(window), // The element on which the plugin will listen for 'scroll' events. Should be the window or your scrollable block element.
  scrollDelay: 200, // Waits 200 msecs for the user to stop scrolling before firing. Recommended for performance, but can be set to 0.
  event: 'appear', // The event name to trigger. Can be set to any string.
  once: false, // Trigger the event only once, usefull if you are lazy loading content
};
```

