// --- Summarize Article ---
document.getElementById("summarize").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';

  const summaryType = document.getElementById("summary-type").value;

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          resultDiv.innerText = "Failed to inject content script.";
          console.error("Script injection failed:", chrome.runtime.lastError);
          return;
        }

        chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async (res) => {
          if (!res || !res.text) {
            resultDiv.innerText = "Could not extract article text from this page.";
            return;
          }

          try {
            const summary = await getGeminiSummary(res.text, summaryType);
            resultDiv.innerText = summary;
          } catch (error) {
            resultDiv.innerText = error.message || "Failed to generate summary.";
          }
        });
      }
    );
  });
});

// --- Copy to Clipboard ---
document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText = document.getElementById("result").innerText;

  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard.writeText(summaryText).then(() => {
      const copyBtn = document.getElementById("copy-btn");
      const originalText = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      setTimeout(() => {
        copyBtn.innerText = originalText;
      }, 2000);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  }
});

// --- Download as PDF ---
document.getElementById("download-btn").addEventListener("click", () => {
  const resultText = document.getElementById("result").innerText.trim();
  if (!resultText || resultText.includes("Select a summary")) {
    alert("No summary available to download.");
    return;
  }

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert("PDF library not loaded yet. Please try again.");
    return;
  }

  const doc = new jsPDF();
  const lines = doc.splitTextToSize(resultText, 180);
  doc.text(lines, 10, 20);
  doc.save("ai-summary.pdf");
});



// --- Call Gemini Proxy API ---
const API_URL = "https://gemini-proxy-server.vercel.app/api/summarize";

async function getGeminiSummary(text, summaryType) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, type: summaryType }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch summary.");
    }

    const data = await response.json();
    return data?.summary || "No summary available.";
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw new Error("Failed to summarize article.");
  }
}
