# Forward-kinematic system with a pencil

## Introduction

This is very a simplified forward-kinematic system which is an entry for the [js1k-2018](https://js1k.com/2018-coins/) competition. Try it to find out beautiful patterns applying simple rules.

## Files

`index.html` is a shim environment provided by the contest organizers.

`human-readable/app.js` is a place you might want to take a look to understand what's going on in the application.

 `src/app.js` is what was actually developed having in mind further minification. It was automatically minified into `dist/app.min.js` by the Gulp plugin.

Finally, `submission/app.min.js` is a result of aggressive minification by means of the [Closure Compiler](https://closure-compiler.appspot.com/home) and a couple of further tweaks. That's what was submitted to the competition.

## How to

To start observing how patterns emerge, one should fill the input field using the following format `[arms_lengths]&[arms_rotation_speeds]` where

`arms_lengths` - is a string containing comma-separated values (in pixels) of the arm lengths. Inability to convert the value to a number defaults to 50 pixels.

`arms_rotation_speeds` - is a string containing comma-separated values (in degrees) of the arm rotation speeds i.e. a change of the angle per frame. The system will try to maintain 60 fps, so the value of 6 here will give you a full circle in a second. Inability to convert the value to a number defaults to 1 degree.

Each string value is trimmed before converting to number, so spaces don't matter.

The number of the arms is defined by the number of the arm lengths. So if the number of the rotation speeds is less then that, the missing slots will be filled with default values.

Once the input loses focus - the app starts animating the arms. The last arm has a pencil in its hand. :smile: Enjoy!
