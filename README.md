# Experiments with sRGB and P3 using Node + GraphicsMagick / ImageMagick
> Permit the detection and preservation of the P3 colors in Node image editing.

## Getting Started

This is a NodeJS project, so ensure you have first install the depdendencies like any other using npm or Yarn.

```
$ yarn start
```

This will load each sample image in the [./images/](./images/) directory and process them one by one, gathering the results. This project includes some sample images from various models of iPhone.  Images specifically available in P3 are also included - these are images from WebKit and photos taken on the iPhone 7 (which saves photos with the P3 pallet).

The images will be processed using:

* [GraphicsMagick](https://github.com/aheckmann/gm) - see [TestWithGraphicsMagick.js](./src/GraphicsMagick/TestWithGraphicsMagick.js)
* [Sharp](https://github.com/lovell/sharp)  - see [TestWithSharp.js](./src/sharp/TestWithSharp.js)

**:warning: GraphicsMagick is being used with [ImageMagick](https://www.imagemagick.org/s) enabled. So you might need to install this at system level first, for example, via brew.**

## Goals :microscope:

The objective is to test these libraries and their performance with the following goals.

* Can the library determine if the source image is P3.
* Can the library perform an operation (such as resize) without loosing any part of the spectrum.
* Can the library save the output of the operation preserving the P3 information present.

In other words, can we take a P3 image and make a small thumbnail that is also P3, without loss or downgrade (such as ending up with sRGB).

## What is P3 and why should I care?

Newer Apple devices such as MacBooks and iPhones have new displays that support the P3 color profile. This profile
enables the hardware display to display more colors than the ubiqitous sRGB standard that exists virtually everywhere else.

However, when processing images tagged with P3, or RAW image files, it is important our processing software doesn't 'flatten' these
images and downgrade them to sRGB - especially if the images might end up being used in these new devices. For example, shown inside an iPhone app or on MacBook.

So we should detect and preserve images that have been exported using P3.

This project is a small test to determine how to do that using NodeJS and GraphicsMagick.

## Current Situation

WebKit (read: Safari) supports being able to render images correctly that have been tagged with P3. Any other images are rendered in sRGB.



