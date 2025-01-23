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
  
      if (meanings.length === 0) {
        throw new Error("No definitions available.");
      }
  
      const definition = meanings[0].definitions[0].definition || "No definition available.";
      const example = meanings[0].definitions[0].example || "No example available.";
  
      resultDiv.innerHTML = `
        <h2>${word}</h2>
        <p><strong>Definition:</strong> ${definition}</p>
        <p><strong>Example:</strong> ${example}</p>
        <p><strong>Phonetics:</strong> ${phonetics}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p>${error.message}. Please try again.</p>`;
    }
  }
  