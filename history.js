document.addEventListener("DOMContentLoaded", function () {
    let historyDiv = document.getElementById("searchHistory");
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (history.length === 0) {
        historyDiv.innerHTML = "<p>No recent searches.</p>";
    } else {
        historyDiv.innerHTML = history.map(word => `<p>${word}</p>`).join("");
    }
});

        function loadHistory() {
            const historyList = document.getElementById("historyList");
            historyList.innerHTML = "";
            let history = JSON.parse(localStorage.getItem("history")) || [];

            if (history.length === 0) {
                historyList.innerHTML = "<p>No search history available.</p>";
            } else {
                history.forEach(entry => {
                    const p = document.createElement("p");
                    p.textContent = entry.word;
                    historyList.appendChild(p);
                });
            }
        }

        window.onload = loadHistory;