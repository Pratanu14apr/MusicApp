const clientId = "c40c32a8511648d1a1a01e5c8e45354f";
const clientSecret = "85a8f2bfc5f244adb4a5ced0be843f3f";
let i = 0;
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
  console.log(data);
  const accessToken = data.access_token;
  console.log(accessToken);
  return accessToken;
};
getToken()
  .then(token => console.log(token))
  .catch(error => console.error(error));

const accessToken =
  "BQDzHtRr8Mr-wv3qpB84rCb4iPlqoXdgwCHmVfqgBIiH6XNVhq52qOKf6Zt2f7Ft6F8zDPnhVE_DfAW39UfkS1DA416x5T27CbfuRAYnzGgfGdq6p-Qw";
const artistId = "1mYsTxnqsietFxj1OgoGbG";

fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => localStorage.setItem("api", JSON.stringify(data.tracks)));

let arr = JSON.parse(localStorage.getItem("api"));
console.log(arr);
arr.map(m => {
  let mainBl = document.getElementById("mainBlock");
  let newEle = document.createElement("div");
  newEle.setAttribute("id", "div");
  newEle.innerHTML += `
    <div id="container1">  <img id="image1" src="${m.album.images[0].url}" > 
  <h1 src="${m.preview_url}" id="name"> ${m.name}<h1>
  </div>`;
  // console.log(document.getElementById("div").children[0].children[0]);
  console.log(newEle.innerHTML);
  let proton = document.getElementById("div").children[0].children[0];
  proton.onclick = function (e) {
    console.log(e);
    console.log(e.target);
    console.log(document.getElementById("div").innerHTML);
    let currentSong = e.target.getAttribute("src");
    // console.log("pro");
    let aa = document.getElementById("mainPlayer");
    aa.setAttribute("src", currentSong);
  };
  document.getElementById("image1").onclick = function (f) {
    console.log(f.target);
    let imgSmall = f.target.getAttribute("src");
    let bb = document.getElementById("smallImg");
    bb.setAttribute("src", imgSmall);
  };
  // let player = document.getElementById("playerDiv");
  mainBl.appendChild("newEle");
});

