/*
 * Tinyfade - responsive image slideshow backgrounds with plain javascript.
 *
 * Copyright (c) 2017 Moritz Marquardt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function Tinyfade(e, interval, animationSpeed) {
    if (Object.getPrototypeOf(this) != Tinyfade.prototype) throw new Error("Tinyfade not called as a constructor");

    this.e = (typeof e == "string") ? document.querySelector(e) : e;
    this.e.classList.add("tinyfade-js");
    this.c = this.e.firstElementChild;
    this.c.classList.add("tinyfade-current");
    this.l = {};

    // Set animation speed
    this.s = animationSpeed; if (this.s == undefined) this.s = 750;
    let s = document.createElement("style");
    s.textContent = ".tinyfade img {transition: opacity " + this.s + "ms}";
    this.e.insertBefore(s, this.c);
    
    // Set interval
    this.i = interval || 5000;
    if (this.i > 0) this.j = setInterval(tf => tf.next(), this.i, this);
}
Tinyfade.prototype.goto = function(c) {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    // Show current
    c.classList.add("tinyfade-current");

    // Hide last
    this.c.classList.add("tinyfade-last");
    this.c.classList.remove("tinyfade-current");
    setTimeout(l => l.classList.remove("tinyfade-last"), this.s, this.c);

    // Fire event
    this.fire("goto", c, this.c);

    // Update current
    this.c = c;
    
}
Tinyfade.prototype.next = function() {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    let e = this.c.nextElementSibling || this.e.firstElementChild.nextElementSibling;
    this.goto(e);
}
Tinyfade.prototype.prev = function() {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    let e = this.c.previousElementSibling;
    if (!e || e.tagName == "STYLE") e = this.e.lastElementChild;
    this.goto(e);
}
Tinyfade.prototype.pause = function() {
    if (this.j == null) throw new Error("This Tinyfade instance is paused or has been destroyed.");

    clearInterval(this.j);
    this.j = null;
}
Tinyfade.prototype.continue = function() {
    if (this.j != null) throw new Error("This Tinyfade instance is already running.");
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    if (this.i > 0) this.j = setInterval(tf => tf.next(), this.i, this);
}
Tinyfade.prototype.destroy = function() {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    this.e.classList.remove("tinyfade-js");
    this.c.classList.remove("tinyfade-current");
    this.e.getElementsByClassName("tinyfade-last").classList.remove("tinyfade-last");
    this.e.removeChild(this.e.firstElementChild);
    clearInterval(this.j);
    this.e = this.c = this.l = this.s = this.i = this.j = null;
}
Tinyfade.prototype.addEventListener = function(e, f) {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    if (!this.l[e]) this.l[e] = [];
    this.l[e].push(f);
}
Tinyfade.prototype.fire = function(e, ...p) {
    (this.l[e] || []).forEach(f => f(...p));
}
