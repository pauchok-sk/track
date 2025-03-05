export function videoSrc() {
  const buttons = document.querySelectorAll("[data-video-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const videoId = btn.dataset.videoBtn;
        const videoSrc = btn.dataset.src;
        const videoPoster = btn.dataset.poster;

        videoLoad(videoSrc, videoPoster, videoId);

        buttons.forEach((btn) => btn.classList.remove("_active"));
        btn.classList.add("_active");
      });
    });
  }

  function videoLoad(src, poster, id) {
    const currentVideo = document.querySelector(`[data-video="${id}"]`);
    const wrapperVideo = currentVideo.closest(".video");
    const videoSourceHtml = currentVideo.querySelector("source");

    if (wrapperVideo.classList.contains("_played")) {
      wrapperVideo.classList.remove("_played");
    }

    currentVideo.removeAttribute("controls");
    currentVideo.poster = poster;
    videoSourceHtml.src = src;

    currentVideo.load();
  }
}

export function videoPlayer() {
  const buttons = document.querySelectorAll(".video__btn");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const video = btn.closest(".video");
        const videoMain = video.querySelector(".video__main");

        videoMain.setAttribute("controls", "");
        videoMain.play();

        video.classList.add("_played");
      });
    });
  }
}
