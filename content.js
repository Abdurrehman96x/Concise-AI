function getArticleText() {
  // Try finding <article>
  const article = document.querySelector("article");
  if (article && article.innerText.trim().length > 200) {
    return article.innerText.trim();
  }

  // Try GFG or similar: get largest <div> with multiple <p> tags
  const paragraphs = Array.from(document.querySelectorAll("p"));
  const goodParas = paragraphs.filter(p => p.innerText.length > 30);

  if (goodParas.length >= 3) {
    return goodParas.map(p => p.innerText.trim()).join("\n\n");
  }

  // Fallback to body text
  return document.body.innerText.trim().slice(0, 3000); // safety limit
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_ARTICLE_TEXT") {
    try {
      const text = getArticleText();
      if (text && text.length > 100) {
        sendResponse({ text });
      } else {
        sendResponse({ text: null });
      }
    } catch (err) {
      console.error("Error extracting article:", err);
      sendResponse({ text: null });
    }
    return true; // Required for async response
  }
});
console.log("Extracted Text:", getArticleText().slice(0, 300));
