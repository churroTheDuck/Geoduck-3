var yay;

function password() {
  sha256(document.getElementById("inputField").value).then((hash) => {
    if (hash == "d6b1f388b74ea9b2b08aa2e94b003049a912b80f7381758327d5ef4eca435ce6") {
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

const audio = document.querySelector('audio');
document.addEventListener('click', function () {
  audio.play().catch(error => {
    console.log('Autoplay prevented:', error);
  });
});
