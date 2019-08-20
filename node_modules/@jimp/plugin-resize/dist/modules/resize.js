"use strict";

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.typed.float32-array");

// JavaScript Image Resizer (c) 2012 - Grant Galitz
// Released to public domain 29 July 2013: https://github.com/grantgalitz/JS-Image-Resizer/issues/4
function Resize(widthOriginal, heightOriginal, targetWidth, targetHeight, blendAlpha, interpolationPass, resizeCallback) {
  this.widthOriginal = Math.abs(Math.floor(widthOriginal) || 0);
  this.heightOriginal = Math.abs(Math.floor(heightOriginal) || 0);
  this.targetWidth = Math.abs(Math.floor(targetWidth) || 0);
  this.targetHeight = Math.abs(Math.floor(targetHeight) || 0);
  this.colorChannels = blendAlpha ? 4 : 3;
  this.interpolationPass = Boolean(interpolationPass);
  this.resizeCallback = typeof resizeCallback === 'function' ? resizeCallback : function () {};
  this.targetWidthMultipliedByChannels = this.targetWidth * this.colorChannels;
  this.originalWidthMultipliedByChannels = this.widthOriginal * this.colorChannels;
  this.originalHeightMultipliedByChannels = this.heightOriginal * this.colorChannels;
  this.widthPassResultSize = this.targetWidthMultipliedByChannels * this.heightOriginal;
  this.finalResultSize = this.targetWidthMultipliedByChannels * this.targetHeight;
  this.initialize();
}

Resize.prototype.initialize = function () {
  // Perform some checks:
  if (this.widthOriginal > 0 && this.heightOriginal > 0 && this.targetWidth > 0 && this.targetHeight > 0) {
    this.configurePasses();
  } else {
    throw new Error('Invalid settings specified for the resizer.');
  }
};

Resize.prototype.configurePasses = function () {
  if (this.widthOriginal === this.targetWidth) {
    // Bypass the width resizer pass:
    this.resizeWidth = this.bypassResizer;
  } else {
    // Setup the width resizer pass:
    this.ratioWeightWidthPass = this.widthOriginal / this.targetWidth;

    if (this.ratioWeightWidthPass < 1 && this.interpolationPass) {
      this.initializeFirstPassBuffers(true);
      this.resizeWidth = this.colorChannels === 4 ? this.resizeWidthInterpolatedRGBA : this.resizeWidthInterpolatedRGB;
    } else {
      this.initializeFirstPassBuffers(false);
      this.resizeWidth = this.colorChannels === 4 ? this.resizeWidthRGBA : this.resizeWidthRGB;
    }
  }

  if (this.heightOriginal === this.targetHeight) {
    // Bypass the height resizer pass:
    this.resizeHeight = this.bypassResizer;
  } else {
    // Setup the height resizer pass:
    this.ratioWeightHeightPass = this.heightOriginal / this.targetHeight;

    if (this.ratioWeightHeightPass < 1 && this.interpolationPass) {
      this.initializeSecondPassBuffers(true);
      this.resizeHeight = this.resizeHeightInterpolated;
    } else {
      this.initializeSecondPassBuffers(false);
      this.resizeHeight = this.colorChannels === 4 ? this.resizeHeightRGBA : this.resizeHeightRGB;
    }
  }
};

Resize.prototype._resizeWidthInterpolatedRGBChannels = function (buffer, fourthChannel) {
  var channelsNum = fourthChannel ? 4 : 3;
  var ratioWeight = this.ratioWeightWidthPass;
  var outputBuffer = this.widthBuffer;
  var weight = 0;
  var finalOffset = 0;
  var pixelOffset = 0;
  var firstWeight = 0;
  var secondWeight = 0;
  var targetPosition; // Handle for only one interpolation input being valid for start calculation:

  for (targetPosition = 0; weight < 1 / 3; targetPosition += channelsNum, weight += ratioWeight) {
    for (finalOffset = targetPosition, pixelOffset = 0; finalOffset < this.widthPassResultSize; pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
      outputBuffer[finalOffset] = buffer[pixelOffset];
      outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1];
      outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2];
      if (fourthChannel) outputBuffer[finalOffset + 3] = buffer[pixelOffset + 3];
    }
  } // Adjust for overshoot of the last pass's counter:


  weight -= 1 / 3;
  var interpolationWidthSourceReadStop;

  for (interpolationWidthSourceReadStop = this.widthOriginal - 1; weight < interpolationWidthSourceReadStop; targetPosition += channelsNum, weight += ratioWeight) {
    // Calculate weightings:
    secondWeight = weight % 1;
    firstWeight = 1 - secondWeight; // Interpolate:

    for (finalOffset = targetPosition, pixelOffset = Math.floor(weight) * channelsNum; finalOffset < this.widthPassResultSize; pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
      outputBuffer[finalOffset + 0] = buffer[pixelOffset + 0] * firstWeight + buffer[pixelOffset + channelsNum + 0] * secondWeight;
      outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + channelsNum + 1] * secondWeight;
      outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + channelsNum + 2] * secondWeight;
      if (fourthChannel) outputBuffer[finalOffset + 3] = buffer[pixelOffset + 3] * firstWeight + buffer[pixelOffset + channelsNum + 3] * secondWeight;
    }
  } // Handle for only one interpolation input being valid for end calculation:


  for (interpolationWidthSourceReadStop = this.originalWidthMultipliedByChannels - channelsNum; targetPosition < this.targetWidthMultipliedByChannels; targetPosition += channelsNum) {
    for (finalOffset = targetPosition, pixelOffset = interpolationWidthSourceReadStop; finalOffset < this.widthPassResultSize; pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
      outputBuffer[finalOffset] = buffer[pixelOffset];
      outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1];
      outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2];
      if (fourthChannel) outputBuffer[finalOffset + 3] = buffer[pixelOffset + 3];
    }
  }

  return outputBuffer;
};

Resize.prototype._resizeWidthRGBChannels = function (buffer, fourthChannel) {
  var channelsNum = fourthChannel ? 4 : 3;
  var ratioWeight = this.ratioWeightWidthPass;
  var ratioWeightDivisor = 1 / ratioWeight;
  var nextLineOffsetOriginalWidth = this.originalWidthMultipliedByChannels - channelsNum + 1;
  var nextLineOffsetTargetWidth = this.targetWidthMultipliedByChannels - channelsNum + 1;
  var output = this.outputWidthWorkBench;
  var outputBuffer = this.widthBuffer;
  var trustworthyColorsCount = this.outputWidthWorkBenchOpaquePixelsCount;
  var weight = 0;
  var amountToNext = 0;
  var actualPosition = 0;
  var currentPosition = 0;
  var line = 0;
  var pixelOffset = 0;
  var outputOffset = 0;
  var multiplier = 1;
  var r = 0;
  var g = 0;
  var b = 0;
  var a = 0;

  do {
    for (line = 0; line < this.originalHeightMultipliedByChannels;) {
      output[line++] = 0;
      output[line++] = 0;
      output[line++] = 0;

      if (fourthChannel) {
        output[line++] = 0;
        trustworthyColorsCount[line / channelsNum - 1] = 0;
      }
    }

    weight = ratioWeight;

    do {
      amountToNext = 1 + actualPosition - currentPosition;
      multiplier = Math.min(weight, amountToNext);

      for (line = 0, pixelOffset = actualPosition; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetOriginalWidth) {
        r = buffer[pixelOffset];
        g = buffer[++pixelOffset];
        b = buffer[++pixelOffset];
        a = fourthChannel ? buffer[++pixelOffset] : 255; // Ignore RGB values if pixel is completely transparent

        output[line++] += (a ? r : 0) * multiplier;
        output[line++] += (a ? g : 0) * multiplier;
        output[line++] += (a ? b : 0) * multiplier;

        if (fourthChannel) {
          output[line++] += a * multiplier;
          trustworthyColorsCount[line / channelsNum - 1] += a ? multiplier : 0;
        }
      }

      if (weight >= amountToNext) {
        actualPosition += channelsNum;
        currentPosition = actualPosition;
        weight -= amountToNext;
      } else {
        currentPosition += weight;
        break;
      }
    } while (weight > 0 && actualPosition < this.originalWidthMultipliedByChannels);

    for (line = 0, pixelOffset = outputOffset; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetTargetWidth) {
      weight = fourthChannel ? trustworthyColorsCount[line / channelsNum] : 1;
      multiplier = fourthChannel ? weight ? 1 / weight : 0 : ratioWeightDivisor;
      outputBuffer[pixelOffset] = output[line++] * multiplier;
      outputBuffer[++pixelOffset] = output[line++] * multiplier;
      outputBuffer[++pixelOffset] = output[line++] * multiplier;
      if (fourthChannel) outputBuffer[++pixelOffset] = output[line++] * ratioWeightDivisor;
    }

    outputOffset += channelsNum;
  } while (outputOffset < this.targetWidthMultipliedByChannels);

  return outputBuffer;
};

Resize.prototype._resizeHeightRGBChannels = function (buffer, fourthChannel) {
  var ratioWeight = this.ratioWeightHeightPass;
  var ratioWeightDivisor = 1 / ratioWeight;
  var output = this.outputHeightWorkBench;
  var outputBuffer = this.heightBuffer;
  var trustworthyColorsCount = this.outputHeightWorkBenchOpaquePixelsCount;
  var weight = 0;
  var amountToNext = 0;
  var actualPosition = 0;
  var currentPosition = 0;
  var pixelOffset = 0;
  var outputOffset = 0;
  var caret = 0;
  var multiplier = 1;
  var r = 0;
  var g = 0;
  var b = 0;
  var a = 0;

  do {
    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
      output[pixelOffset++] = 0;
      output[pixelOffset++] = 0;
      output[pixelOffset++] = 0;

      if (fourthChannel) {
        output[pixelOffset++] = 0;
        trustworthyColorsCount[pixelOffset / 4 - 1] = 0;
      }
    }

    weight = ratioWeight;

    do {
      amountToNext = 1 + actualPosition - currentPosition;
      multiplier = Math.min(weight, amountToNext);
      caret = actualPosition;

      for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
        r = buffer[caret++];
        g = buffer[caret++];
        b = buffer[caret++];
        a = fourthChannel ? buffer[caret++] : 255; // Ignore RGB values if pixel is completely transparent

        output[pixelOffset++] += (a ? r : 0) * multiplier;
        output[pixelOffset++] += (a ? g : 0) * multiplier;
        output[pixelOffset++] += (a ? b : 0) * multiplier;

        if (fourthChannel) {
          output[pixelOffset++] += a * multiplier;
          trustworthyColorsCount[pixelOffset / 4 - 1] += a ? multiplier : 0;
        }
      }

      if (weight >= amountToNext) {
        actualPosition = caret;
        currentPosition = actualPosition;
        weight -= amountToNext;
      } else {
        currentPosition += weight;
        break;
      }
    } while (weight > 0 && actualPosition < this.widthPassResultSize);

    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
      weight = fourthChannel ? trustworthyColorsCount[pixelOffset / 4] : 1;
      multiplier = fourthChannel ? weight ? 1 / weight : 0 : ratioWeightDivisor;
      outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] * multiplier);
      outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] * multiplier);
      outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] * multiplier);

      if (fourthChannel) {
        outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] * ratioWeightDivisor);
      }
    }
  } while (outputOffset < this.finalResultSize);

  return outputBuffer;
};

Resize.prototype.resizeWidthInterpolatedRGB = function (buffer) {
  return this._resizeWidthInterpolatedRGBChannels(buffer, false);
};

Resize.prototype.resizeWidthInterpolatedRGBA = function (buffer) {
  return this._resizeWidthInterpolatedRGBChannels(buffer, true);
};

Resize.prototype.resizeWidthRGB = function (buffer) {
  return this._resizeWidthRGBChannels(buffer, false);
};

Resize.prototype.resizeWidthRGBA = function (buffer) {
  return this._resizeWidthRGBChannels(buffer, true);
};

Resize.prototype.resizeHeightInterpolated = function (buffer) {
  var ratioWeight = this.ratioWeightHeightPass;
  var outputBuffer = this.heightBuffer;
  var weight = 0;
  var finalOffset = 0;
  var pixelOffset = 0;
  var pixelOffsetAccumulated = 0;
  var pixelOffsetAccumulated2 = 0;
  var firstWeight = 0;
  var secondWeight = 0;
  var interpolationHeightSourceReadStop; // Handle for only one interpolation input being valid for start calculation:

  for (; weight < 1 / 3; weight += ratioWeight) {
    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
      outputBuffer[finalOffset++] = Math.round(buffer[pixelOffset++]);
    }
  } // Adjust for overshoot of the last pass's counter:


  weight -= 1 / 3;

  for (interpolationHeightSourceReadStop = this.heightOriginal - 1; weight < interpolationHeightSourceReadStop; weight += ratioWeight) {
    // Calculate weightings:
    secondWeight = weight % 1;
    firstWeight = 1 - secondWeight; // Interpolate:

    pixelOffsetAccumulated = Math.floor(weight) * this.targetWidthMultipliedByChannels;
    pixelOffsetAccumulated2 = pixelOffsetAccumulated + this.targetWidthMultipliedByChannels;

    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels; ++pixelOffset) {
      outputBuffer[finalOffset++] = Math.round(buffer[pixelOffsetAccumulated++] * firstWeight + buffer[pixelOffsetAccumulated2++] * secondWeight);
    }
  } // Handle for only one interpolation input being valid for end calculation:


  while (finalOffset < this.finalResultSize) {
    for (pixelOffset = 0, pixelOffsetAccumulated = interpolationHeightSourceReadStop * this.targetWidthMultipliedByChannels; pixelOffset < this.targetWidthMultipliedByChannels; ++pixelOffset) {
      outputBuffer[finalOffset++] = Math.round(buffer[pixelOffsetAccumulated++]);
    }
  }

  return outputBuffer;
};

Resize.prototype.resizeHeightRGB = function (buffer) {
  return this._resizeHeightRGBChannels(buffer, false);
};

Resize.prototype.resizeHeightRGBA = function (buffer) {
  return this._resizeHeightRGBChannels(buffer, true);
};

Resize.prototype.resize = function (buffer) {
  this.resizeCallback(this.resizeHeight(this.resizeWidth(buffer)));
};

Resize.prototype.bypassResizer = function (buffer) {
  // Just return the buffer passed:
  return buffer;
};

Resize.prototype.initializeFirstPassBuffers = function (BILINEARAlgo) {
  // Initialize the internal width pass buffers:
  this.widthBuffer = this.generateFloatBuffer(this.widthPassResultSize);

  if (!BILINEARAlgo) {
    this.outputWidthWorkBench = this.generateFloatBuffer(this.originalHeightMultipliedByChannels);

    if (this.colorChannels > 3) {
      this.outputWidthWorkBenchOpaquePixelsCount = this.generateFloat64Buffer(this.heightOriginal);
    }
  }
};

Resize.prototype.initializeSecondPassBuffers = function (BILINEARAlgo) {
  // Initialize the internal height pass buffers:
  this.heightBuffer = this.generateUint8Buffer(this.finalResultSize);

  if (!BILINEARAlgo) {
    this.outputHeightWorkBench = this.generateFloatBuffer(this.targetWidthMultipliedByChannels);

    if (this.colorChannels > 3) {
      this.outputHeightWorkBenchOpaquePixelsCount = this.generateFloat64Buffer(this.targetWidth);
    }
  }
};

Resize.prototype.generateFloatBuffer = function (bufferLength) {
  // Generate a float32 typed array buffer:
  try {
    return new Float32Array(bufferLength);
  } catch (error) {
    return [];
  }
};

Resize.prototype.generateFloat64Buffer = function (bufferLength) {
  // Generate a float64 typed array buffer:
  try {
    return new Float64Array(bufferLength);
  } catch (error) {
    return [];
  }
};

Resize.prototype.generateUint8Buffer = function (bufferLength) {
  // Generate a uint8 typed array buffer:
  try {
    return new Uint8Array(bufferLength);
  } catch (error) {
    return [];
  }
};

module.exports = Resize;
//# sourceMappingURL=resize.js.map