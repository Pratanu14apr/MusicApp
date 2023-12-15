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
  const artistId = "2RS1R0tueoL8EJXTSBAt2F";
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data =>
      data.tracks.map(m => {
        let data = JSON.stringify(m);
        console.log(data);
        console.log(m.name);
        i++;
        localStorage.setItem(`spotifydata${i}`, data);

        let data1 = localStorage.getItem(`spotifydata${i}`);
        let data2 = JSON.parse(data1);
        console.log(data2);
        //  console.log(data2.preview_url);
        //  console.log(data2.album.id);
        //  console.log(data2.name);
        let res = data2.album.external_urls.spotify;
        console.log(res);
        document.getElementById("div").innerHTML += `
        <div class="album">${(location.href =
          data2.album.external_urls.spotify)}</div>
        // <div class="album">${data2.preview_url}</div>
        `;
      })
    );
};
getToken();
