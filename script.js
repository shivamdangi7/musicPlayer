const jsmediatags = window.jsmediatags;
let musicnum = 1;
document.querySelector("#input").addEventListener("change", (event) => {
  const file = event.target.files[musicnum];

  jsmediatags.read(file, {
    onSuccess: function (tag) {
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      document.querySelector(
        "#cover"
      ).style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;

      document.querySelector("#title").textContent = tag.tags.title;
      document.querySelector("#artist").textContent = tag.tags.artist;
      document.querySelector("#album").textContent = tag.tags.album;
      document.querySelector("#genre").textContent = tag.tags.genre;
    },
    onError: function (error) {
      console.log(error);
    },
  });
});
let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let song = document.getElementById("song");

const input = document.getElementById("input");
// input.addEventListener("change", function () {
//   const selectedFile = input.files[0];
//   const fileReader = new FileReader();

//   fileReader.onload = function () {
//     song.src = fileReader.result;
//   };
//   fileReader.readAsDataURL(selectedFile);
// });

input.addEventListener("change", function () {
  const selectedFile = input.files[musicnum];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    song.src = fileReader.result;
    song.play();
  };
  fileReader.readAsDataURL(selectedFile);
});
// function nextFile() {
//   const currentIndex = input.selectedIndex;
//   const nextIndex = currentIndex + 1;
//   if (nextIndex < input.options.length) {
//     input.selectedIndex = nextIndex;
//     input.dispatchEvent(new Event("change"));
//   }
// }
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.textContent === "pause") {
    song.pause();
    ctrlIcon.textContent = "play_arrow";
  } else {
    song.play();
    ctrlIcon.textContent = "pause";
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
};

function playNext() {
  musicnum++;
  const selectedFile = input.files[musicnum];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    song.src = fileReader.result;
    song.play();
  };
  fileReader.readAsDataURL(selectedFile);
}
function playPrevious() {
  musicnum--;
  const selectedFile = input.files[musicnum];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    song.src = fileReader.result;
    song.play();
  };
  fileReader.readAsDataURL(selectedFile);
}
