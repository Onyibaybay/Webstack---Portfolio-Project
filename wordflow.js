async function getDefinition() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");
  
    if (!word) {
      resultDiv.innerHTML = "<p>Please enter a word to search.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p>Loading...</p>";
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      const meanings = data[0]?.meanings || [];
      const phonetics = data[0]?.phonetics[0]?.text || "No phonetics available.";
  
      