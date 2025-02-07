const apiKey = "i9h9kyffh9feg5npmq36s8dx2tj8iergq7ch5k5glkbjb0uok";
const apiUrl = "https://api.wordnik.com/v4/word.json";
const wordOfTheDayUrl = "https://api.wordnik.com/v4/words.json/wordOfTheDay";

// Fetch Definition
async function getDefinition() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) return alert("Please enter a word");

  try {
    const response = await fetch(`${apiUrl}/${word}/definitions?api_key=${apiKey}`);
    const data = await response.json();

    console.log("API Response:", data);

    if (!Array.isArray(data) || data.length === 0 || !data[0].text) {
      document.getElementById("result").innerHTML = `<p>No definition found.</p>`;
    } else {
      document.getElementById("result").innerHTML = `
        <h2>${word}</h2>
        <p>${data[0].text}</p>
      `;
      saveToHistory(word);
    }
  } catch (error) {
    console.error("API Error:", error);
    document.getElementById("result").innerHTML = `<p>Could not load the definition.</p>`;
  }
}

// Fetch Word of the Day
async function fetchWordOfTheDay() {
  try {
    const response = await fetch(`${wordOfTheDayUrl}?api_key=${apiKey}`);
    const data = await response.json();

    if (!data || !data.word) {
      console.warn("Invalid Word of the Day:", data);
      return;
    }

    localStorage.setItem("wordOfTheDay", data.word);
    localStorage.setItem("wotdDate", new Date().toISOString().split("T")[0]);

    displayWordOfTheDay(data.word);
  } catch (error) {
    console.error("Error fetching Word of the Day:", error);
  }
}

// Display Word of the Day
async function displayWordOfTheDay(word) {
  const wotdDiv = document.getElementById("wordOfTheDay");

  try {
    const response = await fetch(`${apiUrl}/${word}/definitions?api_key=${apiKey}`);
    const data = await response.json();
    const definition = data[0]?.text || "No definition available.";

    wotdDiv.innerHTML = `<h2>Word of the Day: ${word}</h2><p>${definition}</p>`;
  } catch (error) {
    console.error("Error loading Word of the Day:", error);
    wotdDiv.innerHTML = `<p>Could not load the definition.</p>`;
  }
}

// Run on Page Load
window.onload = function () {
  fetchWordOfTheDay();
};


// Text-to-Speech Pronunciation
function playPronunciation(word) {
  let speech = new SpeechSynthesisUtterance(word);
  speech.lang = "en-US";
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech);
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Voice Search
function startVoiceSearch() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  
  recognition.onresult = function(event) {
    document.getElementById("wordInput").value = event.results[0][0].transcript;
    getDefinition();
  };
  
  recognition.start();
}

// Search History
function saveToHistory(word) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
  if (!history.includes(word)) {
    history.unshift(word);
    if (history.length > 5) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  displayHistory();
}

function displayHistory() {
  let historyDiv = document.getElementById("searchHistory");
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyDiv.innerHTML = `<h3>Recent Searches</h3>${history.map(w => `<p>${w}</p>`).join("")}`;
}

// Set Username
let username = localStorage.getItem("username") || "";
function setUsername() {
  username = prompt("Enter your name:");
  if (username) {
    localStorage.setItem("username", username);
  }
}

window.onload = function () {
  fetchWordOfTheDay();
  displayHistory();
};
