var myIcon = L.icon({
  iconUrl: "pin.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

var answerLat;
var answerLng;
var guess;
var guessed = false;
var guessMarker;
var polyline;
var randomNumber;
var map;

map = L.map("map", { minZoom: 2 }).setView([0, 0], 1);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

function fetchData() {
  fetch("results.csv")
    .then(response => response.text())
    .then(data => {
      const rows = data.split("\n").map(row => row.split(","));
      randomNumber = Math.floor(Math.random() * rows.length);
      answerLat = parseFloat(rows[randomNumber][2]);
      answerLng = parseFloat(rows[randomNumber][3]);
      document.getElementById("imageView").src = "https://www.google.com/maps/embed?pb=!4v1620280487393!6m8!1m7!1sv1x3-QY98-pdFShVQ1UmhQ!2m2" + "!1d" + answerLat + "!2d" + answerLng + "!3f0!4f0!5f1.0";
    })
    .catch(error => console.error('Error reading CSV:', error));
}

fetchData();

document.getElementById("map").style.cursor = "crosshair";

document.addEventListener("keypress", (event) => {
  if ((event.key === "Enter" || event.key === " ") && guessMarker) {
    guessed = true;
    document.getElementById("imageView").style.display = "none";
    document.getElementById("results").style.display = "block";
    L.marker([answerLat, answerLng], { icon: myIcon }).addTo(map);
    
    if (polyline) {
      polyline.setLatLngs([guessMarker.getLatLng(), [answerLat, answerLng]]);
    } else {
      polyline = L.polyline([guessMarker.getLatLng(), [answerLat, answerLng]], { color: "black", dashArray: "10px" }).addTo(map);
    }
    
    map.fitBounds(L.latLngBounds(guessMarker.getLatLng(), [answerLat, answerLng]), { padding: [100, 100] });
    
    document.getElementById("score").innerHTML = "Score: " + Math.round(5000 / (1 + (Math.round(map.distance(guessMarker.getLatLng(), [answerLat, answerLng]) / 1000) / 2000) ** 2));
    document.getElementById("distance").innerHTML = "Distance: " + Math.round(map.distance(guessMarker.getLatLng(), [answerLat, answerLng]) / 1000) + " km";
  }
});

document.addEventListener("click", () => {
  if (guessed == true) {
    window.location = "game.html";
  }
});

function onMapClick(e) {
  if (guessed == false) {
    guess = e.latlng;
    if (guessMarker) {
      guessMarker.setLatLng(guess);
    } else {
      guessMarker = L.marker(guess, { icon: myIcon }).addTo(map);
    }
  }
}

map.on("click", onMapClick);
