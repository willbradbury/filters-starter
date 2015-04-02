var BRIGHTNESS_SHIFT = 20;
var THRESHOLD = 150;

function applyFilter(pixels,modifyFunc){
	for(var i= 0;i<pixels.length;i+=4){
		var red = pixels[i];
		var green = pixels[i+1];
		var blue = pixels[i+2];
		
		var newPixels = modifyFunc(red,green,blue)
		
		pixels[i] = newPixels[0];
		pixels[i+1] = newPixels[1];
		pixels[i+2] = newPixels[2];
	}
	
	return pixels;
}

/* Filters the given pixels to grayscale.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterGrayscale(pixels) {
	return applyFilter(pixels,function(red,green,blue){
		var avg = red*.3+green*.4+blue*.3;
		return [avg,avg,avg];
	});
}

/* Brightens the given pixels.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterBrighten(pixels) {
	return applyFilter(pixels,function(red,green,blue){
		return [red + BRIGHTNESS_SHIFT, green + BRIGHTNESS_SHIFT, blue + BRIGHTNESS_SHIFT]
	});
}

/* Applies a threshold filter to the given pixels. Makes all pixels above
 * the threshold black and all pixels below the threshold white.
 *
 * Arguments:
 * pixels -- an array of pixel values
 */
function filterThreshold(pixels) {
	return applyFilter(pixels,function(red,green,blue){
		if(Math.sqrt(red*red + green*green + blue*blue) > THRESHOLD){
			return [255,255,255];
		}else{
			return [0,0,0];
		}
	});
}
