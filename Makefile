all: js css

js:
	cat header > dist/tinyfade.min.js
	uglifyjs --compress --mangle -- tinyfade.js >> dist/tinyfade.min.js

css:
	cat header > dist/tinyfade.min.css
	uglifycss tinyfade.css >> dist/tinyfade.min.css
