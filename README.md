# Tinyfade.js
A tiny (~1kb gzipped) plain JavaScript library for fully responsive image slideshows.

[View Demo](https://moqmar.github.io/tinyfade.js/)

### Sizing Information
The height of the first image is used as the slideshow height. Ideally, all images should be the same height. If not, make sure that the first image is the tallest one.

### Usage example
```html
<script src="tinyfade.min.js">
<link rel="stylesheet" src="tinyfade.min.css">

<!-- ... -->

<div class="tinyfade">
  <img src="https://source.unsplash.com/trvP9JiYC1E/750x500">
  <img src="https://source.unsplash.com/Z0tTnl_eOIo/750x500">
  <img src="https://source.unsplash.com/WSFY8g2CJDo/750x500">
</div>

<script>
  let tf = new Tinyfade(
    ".tinyfade", // Element
    3000,        // Interval in milliseconds (-1 for manual mode, default = 5000)
    1000         // Animation duration (default = 1000)
  );

  // Navigate
  tf.next();
  tf.prev();
  let thirdImage = tf.e.getElementsByTagName("img")[2];
  tf.goto(thirdImage);

  // Control
  tf.pause();
  tf.continue();
  tf.destroy(); // Stop everything and delete references.

  // Events
  tf.addEventListener("goto", function(current, last) {
    console.log("Showing " + current.src + " (last image: " + last.src + ")");
  });

  // Try it yourself:
  // press F12 and access the Tinyfade instance you see above using "tf"
</script>
```
