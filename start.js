var yay;

function password() {
  sha256(document.getElementById("inputField").value).then((hash) => {
    if (hash == "16aba5393ad72c0041f5600ad3c2c52ec437a2f0c7fc08fadfc3c0fe9641d7a3") {
      sessionStorage.setItem("accessGranted", "true");
      document.getElementById("inputField").style.borderColor = "green";
      document.getElementById("lock").style.display = "none";
    } else {
      document.getElementById("inputField").style.borderColor = "red";
    }
  })
}

document.getElementById("formField").addEventListener("submit", function (event) {
  event.preventDefault();
  password();
});
document.getElementById("move").addEventListener("click", function () {
  window.location.href = "game.html"
});

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector('video');
  video.playbackRate = 2;
});

const audio = document.querySelector('audio');
document.addEventListener('click', function () {
  audio.play().catch(error => {
    console.log('Autoplay prevented:', error);
  });
});
