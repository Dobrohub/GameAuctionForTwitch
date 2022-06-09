const axios = require("axios");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const tmi = require("tmi.js");
const http = require("http");
const { Server } = require("socket.io");
const translate = require("translate")

const app = express();
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// -------------------------------------------> Подключение api чата твича

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: "Dobrahub",
    password: "",
  },
  channels: ["agronom"],
});

client.connect();

// -------------------------------------------> Подключение api с играми

let url =
  "https://api.rawg.io/api/games/grand-theft-auto-v?key=cc0200dc494748be940aa0d527ff71a7";
let videoUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBPSvvF8PBigMy9OHJv2N3FrSIE7zeYigo&type=video&q=god_of_war_trailer"
const games = [];

function gameListFilter(data) {
  const filterGames = games.filter((el) => el.name === data.name);
  if (filterGames.length >= 1) {
    return true;
  }
}

async function gameList(nameUser, channelTwitch) {
  try {
    const response = await axios.get(url);
    const videoArr = await axios.get(videoUrl)
    const { data } = response;
    const VideoId = videoArr.data.items[0].id.videoId;
    const ruDesc = await translate(`${data.description_raw}`, "ru");
    if (gameListFilter(data)) {
      games.forEach((el) => {
        if (el.name === data.name) {
          el.userScore += 1;
          client.say(
            channelTwitch,
            `@${nameUser}, твоя игра есть в списке, поэтому просто добавляем ей + 1 балл`
          );
        }
      });
    }

    if (!gameListFilter(data) && data.rating !== 0) {
      games.push({
        name: data.name,
        img: data.background_image,
        score: data.rating,
        slug: data.slug,
        description: `${ruDesc.slice(0, 135)}...`,
        descriptionFull: ruDesc,
        userScore: 1,
        videoUrl: `https://www.youtube.com/watch?v=${VideoId}`,
      });
      client.say(channelTwitch, `@${nameUser}, голос принят, игра добавлена`);
    }

    return games.sort((a, b) => b.userScore - a.userScore);
  } catch (error) {
    return games.sort((a, b) => b.userScore - a.userScore);
  }
}

// -------------------------------------------> Рендер главной

app.get("/", (req, res) => {
  res.render("main", { games });
});

// -------------------------------------------> Вебсокет

wsServer.on("connection", (socket) => {
  console.log("WS-соединения установлено", socket.id);

  client.on("message", async (channel, tags, message, self) => {
    console.log(`${tags["display-name"]}: ${message}`);
    const nameUser = `${tags["display-name"]}`;
    const channelTwitch = channel;
    const gameName = message.split(": ").join(" ").split(" ").join("-");
    const videoName = `${message.split(": ").join(" ").split(" ").join("_")}_trailer`
    videoUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBPSvvF8PBigMy9OHJv2N3FrSIE7zeYigo&type=video&q=${videoName}`
    url = `https://api.rawg.io/api/games/${gameName}?key=cc0200dc494748be940aa0d527ff71a7`;
    gameList(nameUser, channelTwitch).then((data) => {
      socket.emit("games:incoming", data);
    });
  });
});

// ----------------------------------------> Запуск сервера

httpServer.listen(PORT, async () => {
  console.log(`Server started on PORT ${PORT}!`);
});
