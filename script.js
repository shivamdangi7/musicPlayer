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
const dropshodow = () => {
  document.querySelector(
    "#cover"
  ).style.filter = `drop-shadow(0px 0px 5px ${randcolor()})`;
};

const skipPrevious = document.querySelector("#skipPrevious");
skipPrevious.addEventListener("click", playPrevious);
skipPrevious.addEventListener("click", showfunction);
skipPrevious.addEventListener("click", dropshodow);

const skipNext = document.querySelector("#skipNext");
skipNext.addEventListener("click", playNext);
skipNext.addEventListener("click", showfunction);
skipNext.addEventListener("click", dropshodow);

// if (parseInt(song.currentTime) == parseInt(song.duration)) {
// const duration = song.duration;

song.addEventListener("ended", function () {
  playNext();
  showfunction();
  dropshodow();
});

let keys = {
  sft: false,
  r: false,
  l: false,
};

// Shift + Right

addEventListener("keydown", (event) => {
  // console.log(event);
  if (event.key === "Shift") {
    keys.sft = true;
  }
  if (event.key === "ArrowRight") {
    keys.r = true;
  }

  if (keys.sft && keys.r) {
    console.log("Shift + r");
    playNext();
    showfunction();
    dropshodow();
  }
});

addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    keys.sft = false;
  }
  if (event.key === "ArrowRight") {
    keys.r = false;
  }
});

// Shift+Left

addEventListener("keydown", (event) => {
  // console.log(event);
  if (event.key === "Shift") {
    keys.sft = true;
  }
  if (event.key === "ArrowLeft") {
    keys.l = true;
  }

  if (keys.sft && keys.l) {
    console.log("Shift + l");
    playPrevious();
    showfunction();
    dropshodow();
  }
});

addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    keys.sft = false;
  }
  if (event.key === "ArrowRight") {
    keys.l = false;
  }
});

//Going  after Shift Right if i go towards shift+left it triggers right and left
