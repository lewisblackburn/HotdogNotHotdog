/* The uploader form */
$(function() {
  $(":file").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();

      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
});

function imageIsLoaded(e) {
  $("#uploadedImage").attr("src", e.target.result);
  init();
}

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/agc6XE6C/";

let model, webcam, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    var img = document.getElementById("uploadedImage");
    const prediction = await model.predict(img);

    for (let i = 0; i < maxPredictions; i++) {
      //   const classPredicition =
      //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      console.log(prediction[i].className, prediction[i].probability);
      if (prediction[i].className == "not hotdog") {
        if (prediction[i].probability >= 0.8) {
          $("#label-container").text("not hotdog");
        } else {
          $("#label-container").text("hotdog");
        }
      }
    }
  }

  predict();
}
