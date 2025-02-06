const apiKey = "ebab3efc-884f-4dcc-be1e-663733c5d2af"; // Replace with your actual API key
const apiUrl = "https://dictionaryapi.com/api/v3/references/sd4/json";

async function getDefinition() {
  const word = document.getElementById("wordInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word to search.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const url = `${apiUrl}/${word}?key=${apiKey}`;
    console.log("Fetching:", url); // Debug the URL
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Response status:", response.status); // Debug status code
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response data:", data); // Debug API response

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No definitions found for the given word.");
    }

    // Extract additional details
    const entry = data[0];
    const definition = entry.shortdef?.[0] || "No definition found.";
    const partOfSpeech = entry.fl || "Unknown";
    // const pronunciation = entry.hwi?.hw || "Not available";
    // const synonyms = entry.meta?.syns?.[0]?.join(", ") || "None";
    // const examples = entry.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.find(dt => dt[0] === "vis")?.[1]?.[0]?.t || "No example available.";

    // <p><strong>Pronunciation:</strong> ${pronunciation}</p>
    // <p><strong>Synonyms:</strong> ${synonyms}</p> 
    // <p><strong>Example:</strong> ${examples}</p>
    resultDiv.innerHTML = `
      <h2>${word}</h2>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
    `;
  } catch (error) {
    console.error("Error occurred:", error); // Log error details
    resultDiv.innerHTML = `<p>${error.message}. Please try again.</p>`;
  }
}
