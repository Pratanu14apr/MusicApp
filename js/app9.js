// ! api start
const clientId = "c40c32a8511648d1a1a01e5c8e45354f";
const clientSecret = "85a8f2bfc5f244adb4a5ced0be843f3f";
let i = 0;
let j = 0;
let arr = [];
let artists = [
  "7qjJw7ZM2ekDSahLXPjIlN",
  "1mYsTxnqsietFxj1OgoGbG",
  "4IKVDbCSBTxBeAsMKjAuTs",
];
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  const accessToken = data.access_token;
  console.log(artists);
  artists.map(m => {
    // let qqq = fetch("./artistId.json");
    // console.log(qqq);
    // qqq
    //   .then(res => {
    //     let ff = res.json();
    //     return ff;
    //   })
    //   .then(resp => {
    //     console.log(resp);
    //     resp.artists.map(m => {
    //       console.log(m.id);

    //       console.log(typeof m);
    fetch(`https://api.spotify.com/v1/artists/${m}/top-tracks?market=US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        let a = response.json();
        console.log(a);
        return a;
      })
      .then(data => {
        console.log(data);
        data.tracks.map(data2 => {
          arr.push(data2.preview_url);
          // console.log(data2);
          let img = document.getElementsByClassName("img")[0];
          img.innerHTML += `<figure id=${j} class="jsfig"> <img src="${data2.album.images[0].url}"> <br> <audio id="audio"  src='${data2.preview_url}' controls></audio></figure> `;
          j++;
          let imgq = document.getElementsByTagName("figure");
          let ArrImg = Array.from(imgq);
          ArrImg.map(b => {
            // console.log(b)
            let aa = document.getElementsByClassName("songs")[0];
            let urlAudio = b.children[2].getAttribute("src");
            // console.log(urlAudio);
            b.addEventListener("click", e => {
              j = b.getAttribute("id");
              console.log(j);
              // console.log(e);
              document.getElementById("play-section").style.display = "block";
              btn3.style.display = "none";
              btn6.style.display = "block";
              aa.innerHTML = `<audio id="dis-audio" src='${urlAudio}'autoplay></audio>`;
            });
          });
        });
      });
    // });
  });
  // });
};
getToken();

// ! buttons
let btn3 = document.getElementsByClassName("button-3")[0];
let btn6 = document.getElementsByClassName("button-6")[0];
let btn1 = document.getElementsByClassName("button-1")[0];
let btn2 = document.getElementsByClassName("button-2")[0];
let btn4 = document.getElementsByClassName("button-4")[0];
// console.log(btn4);
let btn5 = document.getElementsByClassName("button-5")[0];
btn3.addEventListener("click", () => {
  btn3.style.display = "none";
  btn6.style.display = "block";
  document.getElementById("dis-audio").play();
});
btn6.addEventListener("click", () => {
  btn6.style.display = "none";
  btn3.style.display = "block";
  document.getElementById("dis-audio").pause();
});
btn4.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  console.log(bb);
  if (j < arr.length - 1) {
    j++;
    // console.log(arr)
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    btn3.style.display = "none";
    btn6.style.display = "block";
    console.log(j);
    // console.log(bb);
  } else {
    j = 0;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn2.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  if (j > 0) {
    j--;
    // console.log(arr)
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    btn3.style.display = "none";
    btn6.style.display = "block";
    console.log(j);
    // console.log(bb);
  } else {
    j = arr.length - 1;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn1.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  if (j > 0 && j < arr.length) {
    j = Math.floor(Math.random() * 9 + 1);
    // console.log(arr)
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    console.log(j);
    // console.log(bb);
  } else {
    j = 0;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn5.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  if (j > 0 && j < arr.length) {
    // j = b.getAttribute("id");
    // console.log(arr)
    console.log(j);
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    // console.log(bb);
  } else {
    j = 0;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});

// ! buttons end
