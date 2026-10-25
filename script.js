let current = 1;
let selectedMood = "";

const responses = {
  "A little annoyed 😐": ["Okay, we're starting at level 1.", "I can work with this. Please don't upgrade the anger level 😭"],
  "Properly mad 😤": ["Understood. This is serious.", "I would like to formally apologize before this gets worse."],
  "Very mad 😭": ["Oh.", "Okay yeah, I probably deserve a proper conversation for this one. 😭"],
  "Don't even talk to me 💀": ["Noted. Communication privileges temporarily suspended.", "I will respectfully stand over here and wait for my sentence. 🫡"],
  "You need to explain yourself 🤨": ["Ah. The investigation has begun.", "I would like to present my extremely questionable defense."],
  "I'm mad but this is funny 😂": ["WE HAVE A BREAKTHROUGH.", "At least we're laughing. That's basically progress, right? 😭"]
};

function updateProgress() {
  document.getElementById("progressBar").style.width = `${(current / 6) * 100}%`;
}

function showScreen(n) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`screen${n}`).classList.add("active");
  current = n;
  updateProgress();
  window.scrollTo({top: 0, behavior: "smooth"});
}

function nextScreen() {
  if (current < 6) showScreen(current + 1);
}

function choose(button) {
  selectedMood = button.dataset.msg;
  const [title, text] = responses[selectedMood];
  document.getElementById("responseTitle").textContent = title;
  document.getElementById("responseText").textContent = text;
  showScreen(4);
}

const messageBox = document.getElementById("message");
messageBox.addEventListener("input", () => {
  document.getElementById("count").textContent = messageBox.value.length;
});

async function sendMessage() {
  const message = messageBox.value.trim();
  const btn = document.getElementById("sendBtn");

  if (!message) {
    messageBox.focus();
    messageBox.placeholder = "You have to say SOMETHING 😭";
    return;
  }

  // Formspree setup:
  // Replace YOUR_FORMSPREE_ENDPOINT below with your Formspree endpoint.
  const endpoint = "YOUR_FORMSPREE_ENDPOINT";

  if (endpoint === "YOUR_FORMSPREE_ENDPOINT") {
    alert("The website is ready, but email sending still needs the Formspree endpoint added in script.js.");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Sending...";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        mood: selectedMood,
        message: message,
        subject: "Sorry Naima Part 2 — New Message"
      })
    });

    if (!response.ok) throw new Error("Send failed");
    showScreen(6);
  } catch (error) {
    alert("Something went wrong sending the message. Please try again.");
    btn.disabled = false;
    btn.textContent = "Send it →";
  }
}

function restart() {
  messageBox.value = "";
  document.getElementById("count").textContent = "0";
  showScreen(1);
}

updateProgress();
