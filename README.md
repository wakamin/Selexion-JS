# Selexion JS

Custom select option dropdown using plain Javascript with no dependency.

## How to use?

Include the non minified or minified js and css from the dist folder into your html.

Add class `selexion-select` in you select element.

    <select name="basic" id="basic" class="selexion-select">
    	<option value="">Please Select</option>
    	<option value="option_1">Option 1</option>
    	<option value="option_2">Option 2</option>
    	<option value="option_3">Option 3</option>
    </select>

## Development

Development using Visual Studio Code and Gulp. Simply run these commands:

-   If this is the first time, run `npm install`
-   Install live server VS Code extensions
-   Open live server on index.html
-   Run `npm start`
-   If you want to change the style, do it in src/scss/selexion.scss
