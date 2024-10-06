var yay;

function password() {
    sha256(document.getElementById("inputField").value).then((hash)=>{
    if (hash == "16aba5393ad72c0041f5600ad3c2c52ec437a2f0c7fc08fadfc3c0fe9641d7a3") {
      window.location="game.html";
    }})
}
document.getElementById("formField").addEventListener("submit", password);

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector('video');
  video.playbackRate = 2;
}); 

const audio = document.querySelector('audio');
document.addEventListener('click', function() {
  audio.play().catch(error => {
      console.log('Autoplay prevented:', error);
  });
});
