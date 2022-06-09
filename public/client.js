const socket = io();
const posts = document.querySelector("#posts");
const div = document.getElementById("posts");

function gamesInfoAdd(games) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  for (let i = 0; i < games.length; i++) {
    posts.innerHTML += `
    <div class="d-flex flex-row bd-highlight mb-3 g-0">
    <div class="col-md-4">
      <img src="${games[i].img}" class="rounded-start" style="object-fit: cover; width:100%; height:100%">
    </div>
    <div class="col-md-8 border-0" style="width: 400px">
      <div class="card-body position-relative">
        <h6 class="card-title position-absolute top-0 start-0 ps-3 pt-1 fs-4 text-light">${games[i].name}</h6>
        <a href="${games[i].videoUrl}" target="_blank"><img src="https://img.icons8.com/color/344/youtube-play.png" class="" style="width: 21px; position: absolute; right: 70px; bottom: 130px"></a>
        <img src="https://img.icons8.com/fluency/344/star.png" class="position-absolute top-0 end-0 pt-2 me-5" style="width:21px" id="star">
        <p class="card-text position-absolute top-0 end-0 pe-3 pt-2 text-light">${games[i].score}</p>
        <hr style="color:white">
        <p class="card-text align-middle fs-6 text-light" title="${games[i].descriptionFull}">${games[i].description}</p>
      </div>
    </div>

    <div class="col-md-8 border-0" style="width: 700px">
    <div class="card-body position-relative">
      <h6 class="card-title position-absolute top-0 start-0 ps-3 pt-1 fs-4 text-light">Вписалось: ${games[i].userScore}</h6>
      <hr style="color:white">
      <p class="card-text align-middle text-light">Тут будут ники проголосовавших..</p>
    </div>
  </div>
  </div>
  `;
  }
}

socket.on("connect", () => {
  console.log("WS-соединение установлено", socket.id);
});

socket.on("games:incoming", (games) => {
  console.log("Ответ с сервера пришел", games);
  gamesInfoAdd(games);
});
