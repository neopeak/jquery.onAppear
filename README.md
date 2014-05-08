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

## Usage

For performance reasons, the plugin will only fire 'appear' events for the elements you initialize it with.

```js
$(selector).initAppear();
$(selector).on('appear', function() {
  // This gets executed when the item becomes visible.
  // Do whatever you need here, like replacing the element with something more fancy, animating the element,
  // or ajax loading content. 

  // As an example here, we make it flicker:
  $(this).hide();
  $(this).fadeIn();
});
```


Here is a more complex example. Suppose you want to lazy-load and fade-in images when they appear, to create a nice effect and reduce bandwidth

```html
<html>
<body>
<p>Some long text here</p>
<img data-src="mypicture.jpg" class="lazy" />
</body>
</html>
```

```js
var lazyImgs = $("img.lazy");
lazyImgs.css('opacity': '0');
lazyImgs.initAppear();
lazyImgs.on('appear', function() {
  $(this).attr('src', $(this).attr('data-src'));
  $(this).fadeIn();
});
```


