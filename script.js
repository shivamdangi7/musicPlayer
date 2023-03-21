const jsmediatags = window.jsmediatags;
let musicnum = 0;
function thumbnail() {
  document.querySelector("#input").addEventListener("change", (event) => {
    const file = event.target.files[musicnum];
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        console.log(tag);
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
      },
      onError: function (error) {
        console.log(error);
      },
    });
  });
}

let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let song = document.getElementById("song");

const input = document.getElementById("input");

const inputPlay = () => {
  const selectedFile = input.files[musicnum];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    song.src = fileReader.result;
    song.play();
  };
  fileReader.readAsDataURL(selectedFile);
  console.log(musicnum);
};

// input is got played as soon they are changed
input.addEventListener("change", function () {
  inputPlay();
});

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
    // console.log(progress.value);
  }, 500);
}
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
};

// if (progress.value == 100) {
//   playNext();
//   showfunction();
// }
function playNext() {
  console.log(`beforePlayNext ${musicnum}`);
  if (musicnum >= 0 && musicnum < input.files.length - 1) {
    musicnum++;
    inputPlay();
  }
}

function playPrevious() {
  console.log(`beforePlayPrevious ${musicnum}`);
  if (musicnum > 0 && musicnum < input.files.length) {
    musicnum--;
    inputPlay();
  }
}

const showfunction = function () {
  // musicnum--;
  console.log("previous file");

  const file = input.files[musicnum];
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      console.log(tag);
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
    },
    onError: function (error) {
      console.log(error);
    },
  });
};

const randcolor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};
const skipPrevious = document.querySelector("#skipPrevious");
skipPrevious.addEventListener("click", playPrevious);
skipPrevious.addEventListener("click", showfunction);
skipPrevious.addEventListener("click", function () {
  document.querySelector(
    "#cover"
  ).style.filter = `drop-shadow(0px 0px 5px ${randcolor()})`;
});

const skipNext = document.querySelector("#skipNext");
skipNext.addEventListener("click", playNext);
skipNext.addEventListener("click", showfunction);
skipNext.addEventListener("click", function () {
  document.querySelector(
    "#cover"
  ).style.filter = `drop-shadow(0px 0px 5px ${randcolor()})`;
});
