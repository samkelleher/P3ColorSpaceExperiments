# Experiments with sRGB and P3 using Node + GraphicsMagick / ImageMagick
> Permit the detection and preservation of the P3 colors in Node image editing.

## Getting Started

```
$ npm start
```

## Overview

Newer Apple devices such as MacBooks and iPhones have new displays that support the P3 color profile. This profile
enables the hardware display to display more colors than the ubiqitous sRGB standard that exists virtually everywhere else.

However, when processing images tagged with P3, or RAW image files, it is important our processing software doesn't 'flatten' these
images and downgrade them to sRGB - especially if the images might end up being used in these new devices. For example, shown inside an iPhone app or on MacBook.

So we should detect and preserve images that have been exported using P3.

This project is a small test to determine how to do that using NodeJS and GraphicsMagick.

## Current Situation

WebKit (read: Safari) supports being able to render images correctly that have been tagged with P3. Any other images are rendered in sRGB.



