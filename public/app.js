const fileInput = document.getElementById("file");
const submit = document.getElementById("submit");
const tracker = document.getElementById("tracker");
const barFill = document.getElementById("barFill");
const trackerText = document.getElementById("trackerText");
const timer = document.getElementById("timer");
const result = document.getElementById("result");

let file = null;
const messages = [
  "Initializing image fingerprint...",
  "Extracting EXIF metadata...",
  "Scanning public databases...",
  "Cross-referencing hashes...",
  "Analyzing visual patterns...",
  "Finalizing ownership trace..."
];

fileInput.addEventListener("change", () => {
  file = fileInput.files[0];
  submit.disabled = !file;
});

submit.addEventListener("click", async () => {
  if(!file) return;

  const fd = new FormData();
  fd.append("photo", file);
  await fetch("/upload", { method:"POST", body:fd });

  submit.disabled = true;
  tracker.hidden = false;
  result.hidden = true;

  let start = Date.now();
  let duration = 20000;
  let msgIndex = 0;

  const interval = setInterval(() => {
    let elapsed = Date.now() - start;
    let percent = Math.min(100, (elapsed / duration) * 100);
    barFill.style.width = percent + "%";

    if(elapsed > (msgIndex + 1) * 3000 && msgIndex < messages.length){
      trackerText.textContent = messages[msgIndex];
      msgIndex++;
    }

    timer.textContent = "Time remaining: " + Math.max(0, Math.ceil((duration - elapsed)/1000)) + "s";

    if(elapsed >= duration){
      clearInterval(interval);
      tracker.hidden = true;
      result.hidden = false;
      submit.disabled = false;
    }
  }, 250);
});
