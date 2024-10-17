var yay;

function password() {
  sha256(document.getElementById("inputField").value).then((hash) => {
    if (hash == "5646622f206dd420a883d9ce3ddc5b11d968e4ccad1f4f48882275baa3ffba02") {
      sessionStorage.setItem("accessGranted", "true");
      document.getElementById("inputField").style.borderColor = "green";
      document.getElementById("lock").style.display = "none";
      document.getElementById("lockIcon").style.display = "none";
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
  sessionStorage.setItem("mode", "move");
  window.location.href = "game.html"
});
document.getElementById("nmpz").addEventListener("click", function () {
  sessionStorage.setItem("mode", "nmpz");
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
