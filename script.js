class DogVisionConverter{
  fileInput = document.getElementById("fileInput");
  submitButton = document.getElementById("submitButton");
  canvasTag = document.getElementById("canvas");
  reader = new FileReader();
  drawnNormal = false;
  drawingInProgress = false;

  constructor() {
    this.reader.onload = () => {
      this.createCanvas(this.reader.result);
    };

    this.submitButton.addEventListener("click", () => {
      let file = this.fileInput.files[0];
      this.reader.readAsDataURL(file);
    });

    this.canvasTag.addEventListener("click", () => {
      this.drawnNormal = !this.drawnNormal;

      if (this.drawnNormal) this.drawNormal();
      else this.invert();
    });
  }

  createCanvas = (image) => {
    this.img = new Image();
    this.img.crossOrigin = "anonymous";
    this.img.src = image;
    this.img.onload = () => {
      this.canvasTag.width = this.img.width;
      this.canvasTag.height = this.img.height;
      this.ctx = this.canvasTag.getContext("2d");

      this.ctx.filter = "brightness(50%) blur(6px)";
      this.invert();
    };
  };

  drawNormal = () => {
    this.ctx.filter = "none";
    this.ctx.drawImage(this.img, 0, 0);
  };

  invert = () => {
    this.ctx.filter = "brightness(50%) blur(6px)";
    this.ctx.drawImage(this.img, 0, 0);
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvasTag.width,
      this.canvasTag.height
    );
    
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      data[i] = (green + red) / 2; //r
      data[i + 1] = (green + red) / 2; //g
    }
    this.ctx.putImageData(imageData, 0, 0);
  };
}
const dogVisionConverter = new DogVisionConverter();
