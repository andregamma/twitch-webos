import "./main.css"

const queryParams = new URLSearchParams(window.location.search);

const channel = queryParams.get('channel');

var options = {
  width: "100%",
  height: "100%",
  channel,
  parent: ["twitch-player.andregama.dev", "localhost"]
};

if(channel) {
  var player = new Twitch.Player("app", options);
}
// player.setVolume(0.5);
