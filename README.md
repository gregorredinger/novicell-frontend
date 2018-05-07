# Novicell Frontend

Novicell Default Frontend package is a framework for your frontend setup, and a Gulp based boilerplate for optimizing your frontend flow. It includes PostCSS, CSSNext and Flexboxgrid, for starting your new website's development.
When setup, it also helps you optimize images, combine SVGs to a sprite, minifying CSS and Javascript.

### Table of content
* [Quick start](#quick-start)
* [Installation](#installation)
* [What is GULP](#what-is-gulp)
* [How to use GULP](#how-to-use-gulp)
* [What is Fractal](#how-to-use-fractal)
* [How to use Fractal](#what-is-fractal)
* [SVG sprite sheet](#svg-sprite-sheet)
* [Favicon generator](#favicon-generator)
* [Post-CSS components](#post-css-components)
* [Third party plugins](#third-party-plugins)
* [Contribution](#contribution)
* [License](#license)

## Quick start

Browse to 
r project folder and clone the repo `git clone https://github.com/novicell/novicell-frontend.git/.`. Then run `npm install` for getting dependencies and start the build proccess. Run `gulp watch` to start watching file changes and continuous copilation.


##  Installation

- Download and install Node.js min. v. 6.9.x (https://nodejs.org/en/download/)
- Download and install Git (newest) (http://git-scm.com/downloads)
  Remember to check "Git bash here" in context menu options.

  To check if node is working, go to Gitbash / Terminal and type `node -v`
  If you get a version number, you're good to go :+1:
  
  If you NEVER before ran novicell-frontend setup, you need to install Gulp globally on your machine.

```sh
npm install -g gulp
```


## What is GULP

GULP is a streaming build system - or short for:

*"I'll take care of minifiyng the images, scripts, styles and icons.
Now you just focus on doing what you do best: CODE!"*

Learn more here: https://gulpjs.com/

## How to use GULP

First navigate to your website
```sh
cd c:\"Visual studio projects"\project-name\Project.Website
```

* To build everything and get the latest dependencies (also runs the build task): `npm i`
* To build whats already in there (runs the build task): `gulp`
* To never touch the cmd window again (runs the watch task): `gulp watch`
* To Stop/Restart GULP: `CTRL + c`

All tasks can be run like: `gulp <task name>`.

### Gulp tasks

The following tasks are available in this package:

* `build` - Runs all the tasks defined in: `gulp/config.js > tasksToBuild`
* `clean` - Deletes the files/directories defined in: `gulp/config.js > pathsToClean`
* `rebuild` - Runs the clean task, and then the build task.
* `styles` -  Minifies and bundles CSS files defined in: `gulp/config.js > bundles > {bundleName} > styles`
* `scripts` - Minifies and bundles JS files defined in: `gulp/config.js > bundles > {bundleName} > scripts`
* `images` -  Minifies images defined in: `gulp/config.js > bundles > {bundleName} > images`
* `icons` - Minifies and generates a svg sprite, from the icons defined in: `gulp-config.json > bundles > {bundleName} > icons`
* `copy` -  Copies the fonts defined in: `gulp/config.js > Copy on build`
* `deploy` -  Uploads file via FTP, configuration can be found in `gulp/config.js`
* `watch`

  * Listens for filechanges and runs the scripts, styles, images, icons or fonts task whenever a file is changed.
  * Generates sourcemaps for CSS and JS.
  * Also it automatically refreshes your browser window, using [Livereload Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

**NOTE:** The distribution path for each task, can be defined in gulp/config.json - so can the basePath.


## What is Fractal

Fractal is a powerful component library & styleguide that fit the way you work.
It includes a local server for rapid development and a powerful styleguide.
Learn more here: https://fractal.build/


## How to use Fractal

Heres a short intro to using Fractal. For more information take a look at [Fractal guide](http://fractal.build/guide).

#### Local server
For starting a local server with watch and sync run:
```sh
gulp fractal
```

#### Static site
For building the static site run:

```sh
gulp fractal:build
```

## Handlebars
We've added som extra functionallity to the handlbars parser. Here's the helpers we've added:


### Helpers

#### Equals
Equal helper is comparing with 2 variables from your config.json, with the === operator.
Fx. in your context, create a property called: `foo`, and in your template you can now check, if foo === bar, like this:
```handlebars
{{#if foo equals="bar"}}
  true
{{else}}
  false
{{/if}}
```

#### Times
Times helper is an equivelant of a for loop, this example will give 10x span. `{{this}}` refers to the index of the loop.
```handlebars
{{#times 10}}
    <span>{{this}}</span>
{{/times}}
```

#### Compare
Compare helper is for comparing values with different operators. Available operators: `"==", "===", "!=", "<", ">", "<=", ">=", "typeof"`
```handlebars
{#compare @index 5 operator="<="}}
  <span>lower than/equals 5</span>
{{else}}
  <span>higher than 5</span>
{{/compare}}
```

#### Math
Math helper provides operators for addition, subtraction, dividing, multiplying and modulus with two values.
```handlebars
{{math @index "+" 1}}
```


## SVG sprite sheet

Use SVG's from the SVG sprite generated by GULP like the following. The `#icon-lock` is the ID of the current SVG in the sprite. This is based on the name of the original SVG in the `assets/images/icons/`-directory.
So ´/images/icons/lock.svg` are referenced like this:

```html
<svg class="icon icon-lock">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/icons/icons.svg#icon-lock"></use>
</svg>
```

## Favicon generator
By running `gulp favicons`, favicons will be generated automatically for all devices. 

1. Replace: `assets/favicons/favicons-master.png` with the favicon in 512x512 pixels `png`-format
2. Run `gulp favicons`
3. Insert html from `dist/favicons/index.html` in your sites `<head>` section


## Post-CSS components
As a grid we have been inspired by [Flexboxgrid](http://flexboxgrid.com/), to make our own grid. It is almost a plug-n-play replacement for the Bootstrap 3+ grid. You can look at the Flexboxgrid.com example page, for further documentation.

There's a few basic setups that you will always need for all your projects. Buttons, Grid, Form elements, Tables. (Well, maybe you won't use tables).
For futher documentation on how to use PostCSS, have a look in the [Novicell Frontend Wiki](https://github.com/Novicell/novicell-frontend/wiki)

## BEM syntax
Quick example of [BEM class notation](https://css-tricks.com/bem-101/). For further info take a look at the [Novicell frontend guidelines](https://novicell.github.io/frontenddocs/)

### Buttons
There's some default styling for buttons as well, including two modifiers.
```html
<button class="button">Primary button</button>
<button class="button button--secondary">Secondary button</button>
<button class="button button--ghost">Ghost button</button>
```

### Forms
Default styling for form inputs. In regards to checkboxes and radiobuttons, refer to the `base.forms` folder.
```html
<input type="text" class="input" placeholder="Default input">
```

### Tables
```html
<table class="table">
    etc...
</table>
```

## Third party plugins
Third party javascript plugins like `angular` or `owl-carousel` is handled by *[NPM](https://www.npmjs.com/)*.
Install a new plugin by running `npm install <plugin> --save` or adding the plugin and version to the `package.json` under "dependencies".

**NOTE**: The section called `devDependencies` is **reserved for the build tool only.**

**Always remember to specify a specific version number without `^` or `~`.**

**Here's an example of a `package.json`**
```javascript
...
"devDependencies": {
    ...
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-concat": "^2.6.0",
    "gulp-cssnano": "^2.1.2",
    "gulp-file-include": "^1.0.0",
    "gulp-if": "^2.0.1",
    "gulp-imagemin": "^3.0.2"
    ...
},
"dependencies" : {
    "svg4everybody": "2.1.3",
    "owl-carousel": "2.2.0",
    "angular": "1.6.0"
    ...
  },
```

Next you have to add your plugins in the `gulp/config.js`, in your vendor bundle for minfication an concatination.

**Here's an example of a bundle in the `gulp/config.js`**
```javascript
bundles: [
{
  name: "vendor",
  ignorePlugins: ["jscs", "jshint", "watch"], // add "minify", to ignore minifaction on a bundle
  scripts: [
    vendorPath + "/svg4everybody/dist/svg4everybody.js",
    vendorPath + "/jquery/dist/jquery.js",
    vendorPath + "/owl.carousel/dist/owl.carousel.min.js"
    ...
  ]
}
```

## Contribution

Looking to contribute something? **Here's how you can help.**
Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License
The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)
