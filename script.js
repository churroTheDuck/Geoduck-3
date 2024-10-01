var myIcon = L.icon({
  iconUrl: "pin.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});
var answerLat;
var answerLng;
var guess;
var guessMarker;
var polyline;
var img;
var randomNumber;
var map;

let pw = prompt("Enter password to proceed");if (pw == "very secure") {
  document.getElementById("hide").style.display = "none";
  map = L.map("map", {minZoom: 2}).setView([0, 0], 1);
  map.setMaxBounds([[-90, -180], [90, 180]]);
}

randomNumber = Math.floor(Math.random() * 10000) + 1;
document.getElementById("imageView").src = "images/" + randomNumber + ".png";
document.getElementById("map").style.cursor = "crosshair";
document.addEventListener("keypress", (event) => {
  if ((event.key === "Enter" || event.key === " ") && guessMarker) {
    L.marker([answerLat, answerLng], { icon: myIcon }).addTo(map);
    if (polyline) {
      polyline.setLatLngs([guessMarker.getLatLng(), [answerLat, answerLng]]);
    } else {
      polyline = L.polyline([guessMarker.getLatLng(), [answerLat, answerLng]], { color: "black", dashArray: "10px"}).addTo(map);
    }
    map.fitBounds(L.latLngBounds(guessMarker.getLatLng(), [answerLat, answerLng]), { padding: [50, 50] });
    document.getElementById("answer").innerHTML = "Distance: " + Math.round(map.distance(guessMarker.getLatLng(), [answerLat, answerLng]) / 1000) + "km";
  }
});

var rows = [];

fetch("coords.csv")
  .then(response => response.text())
  .then(data => {
    rows = data.split("\n").map(row => row.split(","));
    answerLat = parseFloat(rows[randomNumber][0]);
    answerLng = parseFloat(rows[randomNumber][1]);
  })
  .catch(error => console.error('Error reading CSV:', error));

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

function onMapClick(e) {
  guess = e.latlng;
  if (guessMarker) {
    guessMarker.setLatLng(guess);
  } else {
    guessMarker = L.marker(guess, { icon: myIcon }).addTo(map);
  }
}

map.on("click", onMapClick);