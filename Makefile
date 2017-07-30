all: js css

js:
	cat header > tinyfade.min.js
	uglifyjs --compress --mangle -- tinyfade.js >> tinyfade.min.js

css:
	cat header > tinyfade.min.css
	uglifycss tinyfade.css >> tinyfade.min.css
