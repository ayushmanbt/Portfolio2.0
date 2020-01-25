---
title: Step Up Your CSS Game With SASS - SASS for Beginners
date: 2020-01-25
layout: default
slug: step-up-css-with-sass
desc: SASS is an awesome thing. SASS gives steroids to CSS which takes your CSS writing experience to a whole new level. Once you get a hang of CSS, it is really difficult to write CSS.
main_img: /sass-is-sassy/thumbnail.png
tags: SCSS, SASS, CSS
---

So, recently I was experimenting with SASS and it is awesome. Once you get a hang of it, it is really difficult to get back to normal CSS. Now, without further adieu let's jump into the details of SASS. But before starting, a disclaimer, everything done in SASS can be done in CSS, SASS just makes thing easier.

## What is SASS?

The acronym SASS stands for Syntactically Awesome Style Sheet. It is basically a CSS pre-processor which will be compiled down to normal CSS. Now, there are two versions of SASS: The actual SASS which works based on indentation, and the SCSS, which is syntactically very similar to normal CSS, and will be used by me for this post.

## The Perks of SASS over CSS

So, let's see why we need a CSS pre-processor like SASS to work with:

#### 1. The nesting of element styles:

Suppose you have this HTML layout in your page:

```HTML
<div class="container">
    <h1>Hello World</h1>
</div>
```

Now if you want to style this specific _h1_ in CSS you have to write like this:

```CSS
.container h1{
    /* Your style goes here */
}
```

But in similar condition with SCSS you can directly nest the h1 style inside the _.container_ specific style like so:

```SCSS
.container{
    // container style goes here
    h1{
        // h1 style goes here
    }
}
```

That way if you change any style, for example, _background-color_ of the container, which may demand style change in the _h1_ as well, then you don't have to search the whole document for that specific _.container h1_. Instead, you can easily find it nested inside the _.container_ class. This brings me to the next point beautiful about SASS,

#### 2. Organized:

SCSS keeps your code organized. In normal CSS, the element related _:hover_, _:active_, _::before_, _::after_ etc. can be created anywhere. But, the nesting feature of SCSS helps us to keep the code organized. You can easily define _:hover_ like so:

```SCSS
.container{
    // code here
    &:hover{
        // code here
    }
}
```

If you are wondering, then this "&" is used to reference the parent under which the code is being written. So, in this case, the _&:hover_ translates to _.container:hover_.

#### 3. Browser Compatibility Coverage:

As SCSS is compiled to normal CSS, so it compiles the given CSS to the normal property as well as legacy browser compatible _-ms_ , _-moz_, _-webkit_ properties. For example:

_The SASS/SCSS I Wrote:_

```SCSS
.container {
    display: flex;
}
```

_The CSS generated:_

```CSS
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

Now you might be asking, but Ayushman, how to get started with this adrenaline injected version of CSS.

#### 4. Multi file Setup:

You can have multiple files imported into the main SCSS code as a partial. In that case the partials won't be translated to separate files and will be written down into one file. In that way, your code stays modular and easy to access. For example:

_in \_variable.scss:_

```SCSS
//Having the _ in the name makes any compiler to treat the file as a partial file hence that is not translated it into a different file

//the notation below is the declaration of a variable in SCSS
$primary-color: #234467;
```

_in style.scss::_

```SCSS
// this imports the _variables.scss
@import "./_variables.scss";

.container{
    bacground-color: $primary-color;
}
```

So, now if I compile it then the CSS generated will be:

```CSS
.container {
  background-color: #234467;
}
```

That means, the value of _primary-color_ is brought from _\_variables.scss_ and put into the compiled version of the code.

## Getting Started with writing SCSS code

There are many ways to set up SCSS in your project. There is a package called _node-sass_ for npm users which convert SCSS to CSS. But, in this post, I will be telling you an easier way to get started with SASS. If you use [Visual Studio Code](https://code.visualstudio.com) there is a nice extension named [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) which depends on another extension named [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Both these extensions are developed by Ritwick Dey. With the help of this extension, whenever you write SCSS code you will get a _Watch SASS_ button.
![Picture of Watch Sass Button](/sass-is-sassy/watch_sass_button.png)

Clicking this button while working on a SASS file will generate a _filename.css_ and _filename.css.map_ file in the working directory. Referencing this CSS file will let you use SCSS to write required style and then have it compiled to normal CSS, which can be understood by the browsers.

So, with that let's have a look at how to use basic SCSS to step up your CSS game.

## Variables:

Though implemented in CSS. But I think at this moment the variables scene in CSS is half baked. But, the variables in SCSS are really robust. It is really easy to update variables and use them

## Extending the style of another element:

How many times have you wondered to have some style defined in one element also applied to another? Instead of having a lot of classes attached to your HTML element, you can extend those properties.

Here is a basic example of extending properties:

```SCSS
.container {
    background-color: darkgray;
}

.block {
    @extend .container;
    color: green;
}
```

This translates to this CSS:

```CSS
.container, .block {
  background-color: darkgray;
}

.block {
  color: green;
}
```

## Using mixins

How many times you have to write the _display flex_ and _justify-content center_ just to display items in the center of the page. That's where mixins drop in. Using mixins we can use a specific piece of code repeatedly, and if we need a change there is only one place we need to change the code.

Here is a basic example of mixin:

```SCSS
@mixin flex-center {
    display: flex;
    justify-content: center;
}

.container {
    @include flex-center();
}
```

This translates to this CSS:

```CSS
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
```

As you can tell from this line: _flex-center()_ these mixins can have arguments too. For example, in the previous example if we wanted to have a different background for different elements implementing _flex-center_ mixin we can do this:

```SCSS
@mixin flex-center($bgcolor: transparent) {
    display: flex;
    justify-content: center;
    background-color: $bgcolor;
}

.container {
    @include flex-center();
}

.container_2 {
    @include flex-center(yellow);
}
```

The _\$bgcolor_ is the argument given to the mixin and the default value is given as transparent.

Now, in _container_2_ I passed the argument as yellow. So, the compiled code looks like:

```CSS
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: transparent;
}

.container_2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: yellow;
}
```

## if-else statement

Do you know, in SCSS you can also have if-else statements? For example, in the previous example, if we have a dark background we need to set the text color to white. We can set up our previous example like this, we can pass another variable making dark-background true and false:

```SCSS
@mixin flex-center($bgcolor: transparent, $dark-bg: false) {
    display: flex;
    justify-content: center;
    background-color: $bgcolor;

    @if $dark-bg {
        color: #ffffff;
    }

    @else {
        color: #000;
    }
}

.container {
    @include flex-center(black, true);
}

.container2 {
    @include flex-center(yellow, false);
}
```

This translates to this CSS:

```CSS
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: black;
  color: #ffffff;
}

.container2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: yellow;
  color: #000;
}
```

## Functions

There is a lot of confusions regarding functions and mixins in SCSS. While mixins let you have some CSS properties implemented for a specific class, functions help us to have values returned for specific things. For example, we can set white text for a div with a dark background and black text for div with a light background using functions like so:

```SCSS
@function return_text_color($bgcolor) {
    @if lightness($bgcolor)<50 {
        @return white;
    }

    @else {
        @return black;
    }
}

.container {
    background-color: black;
    color: return_text_color(black);
}

.container2 {
    background-color: yellow;
    color: return_text_color(yellow);
}
```

The compiled CSS looks like:

```CSS
.container {
  background-color: black;
  color: white;
}

.container2 {
  background-color: yellow;
  color: black;
}
```

Here, I used a built in function in SCSS for detecting the lightness of a color.

## Bonus: Using Mixins and Functions together

So, it will be a nice idea to end this post by using the last mixin along with the last function I wrote. It will make the text centered and properly colored. But, disclaimer, I was having some problem with transparent background, which can be fixed with another if statement. I left that as an exercise for the viewer.

The SCSS:

```SCSS
@function return_text_color($bgcolor) {
    @if lightness($bgcolor)<50 {
        @return white;
    }

    @else {
        @return black;
    }
}

@mixin flex-center($bgcolor) {
    display: flex;
    justify-content: center;
    background-color: $bgcolor;
    color: return_text_color($bgcolor);
}

.container {
    @include flex-center(#333);
}

.container2 {
    @include flex-center(yellow);
}
```

The CSS:

```CSS
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: #333;
  color: white;
}

.container2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  background-color: yellow;
  color: black;
}
```

## Conclusion

There is a lot more to explore in the world of SCSS. But these features I mentioned are really cool to start with. Once you get the hang of SCSS, it is really hard to get back to CSS. Hope you make awesome projects with superpowers of SCSS. Stay happy, stay coding.
