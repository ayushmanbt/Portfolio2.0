---
title: Making the Default HTML Button Appealing
date: 2020-02-01
layout: default
slug: making-default-HTML-button-appealing
desc: One of the key elements of your website is the buttons. If you open any website, you will find some buttons. Buttons are used for add interactivity to a website. So, having a proper button is a key to having a successful website online. So today we will turn the ugly button in normal HTML, to something beautiful.
main_img: /making_appealing_css_buttons/thumbnail.png
tags: CSS, Buttons, CSS-Buttons
---

One of the key elements of your website is the buttons. If you open any website, you will find some buttons. Buttons are used for add interactivity to a website. So, having a proper button is a key to having a successful website online. So today we will turn the ugly button in normal HTML, to something beautiful. So, without further adieu let's start.

## Understanding the problems of the current HTML button

The normal HTML button was styled at the dawn of web development. So, of course, there are a lot of things off about the normal CSS buttons, like:

1. The Button has a small font size. Having a larger font would make the
2. The buttons have a gradient background and unreasonable border which do not match with the design trends of 2020.
3. There is no spacing between the text and the border of the button.
4. At this moment, if we hover over a button, it doesn't acknowledge that it is clickable. We will need some animations to fix this.

So we are starting with a button like this:

![Picture of default HTML Button](/making_appealing_css_buttons/default_HTML_button.png)

And will end on something like this:

![Picture of default Final Stled Button](/making_appealing_css_buttons/final_button_style.png)

with all the buttons checked for the points I previously mentioned.

## Step 0: Setting up the project

So, we are starting with a basic HTML page with a button in it. And we will also be linking up the CSS file in the header. So the file will look like this:

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Stylish Buttons</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button>Hello World</button>
</body>

</html>
```

Now in style.css my initial linking is to reset everything:

```CSS
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

The "\*" selects everything, i.e. every elements in HTML and sets their margin to 0px, padding to 0px and the box-sizing to _border-box_. Having the box-sizing to _border-box_ includes the <!-- Skeptical --> padding and border sizing in the sizing of the element. This helps me to set the positioning of elements properly.

I know, these changes made the look of the page even worse. So, Let's get to fixing this. But before that just let me bring the button to the center of the screen. For that, at first, let's make our body to 100% of our viewport height, i.e. 100vh here I'm using _display: flex_ property on the body of the webpage. The two features coming with the display flex are _justify-content_ and _align-items_. Setting these both to _center_ will center our button to the webpage. In CSS this code looks like this:

```CSS
body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

And, our webpage looks like this:

![screenshot of button on the center of the webpage](/making_appealing_css_buttons/initial_button_fullscreen.png)

## Step 1: Changing the font size

Currently, the button is really small, so the first smart thing will be to increase the font size of this button. For that, I will be selecting the button by the tag name, in my CSS and set the font size to 2 rem.

```CSS
button{
    font-size: 2rem;
}
```

![screenshot of button with the updated font size](/making_appealing_css_buttons/font_size_update.png)

So, that was easy, let's get to the next step.

## Step 2: Changing the background

As I told before, this default background and the border do not look good. So there can be two kinds of changes:

### 1. Having a solid background

To have a solid background we need to just change the _background-color_ property of the button. There is a cool website named [UI Color Picker](https://uicolorpicker.com/). So, let's pick a beautiful color. So, the code looks like this:

```CSS
button {
    font-size: 2rem;
    background-color: #6ab04c;
}
```

![screenshot of changed button color](/making_appealing_css_buttons/button_color_update_initial.png)

_(From now on I will be showing just the button in the close screenshot)_

If you see minutely you can see a horrible border with 3D effect. So, it will be visually more appealing to remove this border. This can be done with _border: none_. Now the CSS code looks like this:

```CSS
button {
    font-size: 2rem;
    background-color: #6ab04c;
    border: none;
}
```

![screenshot of changed button color with changed border](/making_appealing_css_buttons/button_color_update_final.png)

This looks much much better according to me.

### 2. Having a solid border

Another cool approach might be to have no background, just some border. I recommend to create 2px wide borders. So, now I will make a border with the greenish color I have used in the previous fill example. So, the CSS will look like this:

```css
button {
  font-size: 2rem;
  border: 2px solid #6ab04c;
  background-color: none;
}
```

And this button looks like this:

![screenshot of changed button color with changed border](/making_appealing_css_buttons/bordered-button.png)

But now, you will notice, the border of the button is too close to the inner text. So, let's fix the next point.

## Step 3: Fixing the padding

It is really easy to add padding to a button with _padding_ property. If only one value is passed to the padding, we get all-around padding. But having the same padding all around does not make our button look good.

![screenshot of same padding applied on all the directions](/making_appealing_css_buttons/same_padding_button.png)

So, the next option will be to pass specific padding around the x-axis and the y-axis. For such 2 value property in CSS, the first value affects properties along the y-axis and the second value affects along the x-axis. According to my experience with CSS _10px 20px_ padding is the best for the dimensions we are working with. So now the CSS looks like this:

```CSS
button {
    font-size: 2rem;
    border: 2px solid #6ab04c;
    background: none;
    padding: 10px 20px;
}
```

and the button looks like this:

![screenshot of different padding applied on x and y directions](/making_appealing_css_buttons/different_padding_button.png)

## Step 4: Showing that the button is clickable

The best way to show that a button can be clicked is to show some changes when the cursor hovers over the button. It can easily be done with the property _cursor: pointer_. So, after adding this the CSS looks like:

```CSS
button {
    font-size: 2rem;
    border: 2px solid #6ab04c;
    background: none;
    padding: 10px 20px;
    cursor: pointer;
}
```

And, the button looks like this:

![screenshot gif of cursor hover pointer](/making_appealing_css_buttons/on_hover_pointer.gif)

But this is not enough. Some obvious color change will be beautiful and appealing.

### Animation for buttons with solid background color

For buttons with solid color, we can either lighten the color or darken the color and change the text color with respect to the darker background. But in this case, having a light background may cause contrast issue for the light background. So I will be going with the option of having a dark background and light text. The CSS will look like:

```CSS
button:hover {
    background-color: #1c440b;
    color: white;
}
```

And the result looks somethng like this:

![screenshot gif of colour change on cursor hover](/making_appealing_css_buttons/on_hover_color_change.gif)

But the problem is that this transition is really fast and we need to smooth it down. Luckily, CSS provides a property called transition, to control these kinds of transition/change of CSS properties. So, the syntax for declaring transition is: _transition: property-which-is-changed timing time-function-to-use_

The _timing_ denotes the number of seconds to take to complete the animation. I personally prefer **0.2s** to be the timing. The timing function denotes the curve to follow while changing the value of a CSS property. The function I like really is **ease-in-out**. And, the properties we are going to apply these translations on are _background-color_ and _color_. So we need to add this line to our CSS:

```CSS
button{
    /* rest of the button code */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
```

So, now instead of instant change of color flashing in our eyes, we got a smooth but subtle transition:

![screenshot gif of colour change of button on hover](/making_appealing_css_buttons/on_hover_with_transition.gif)

### Animation for buttons with border

For buttons with the border only it will be smart to change the background color from transparent to the color of the border of the button within a certain time. This will be really easy with this piece of CSS code:

```CSS
button{
    /* rest of button code */
    transition: background-color 0.2s ease-in-out;
}
button:hover{
    background: #6ab04c;
}
```

![screenshot gif of colour change of button on hover](/making_appealing_css_buttons/on_hover_with_transition_bordered.gif)

## Bonus Suggestions

While these buttons are fine, there are still some ways to improve these buttons:

1. Adding some rounded edge to the button. It really depends on the style of your website. But it is really easy to implement:

```CSS
button{
    /* other css properties */
    border-radius: 40px;
}
```

In that case the button will look like this.

![screenshot of round edge button](/making_appealing_css_buttons/rounded_button.png)

2. Adding some fun fill-up effect to the button will also make the button appealing. I leave this as a fun project for people reading this post. I might be doing a tutorial later in future.

Until next time stay happy, stay coding.
