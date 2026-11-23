const anthemVideo = document.querySelector(".testi-anthem-video");

if (anthemVideo) {
  anthemVideo.addEventListener("ended", () => {
    anthemVideo.load();
  });
}
