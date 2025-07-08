# ✨ Concise AI - Article Summarizer Chrome Extension

**Concise AI** is a powerful Chrome extension that uses **Gemini AI** (via a secure proxy) to summarize articles directly on any webpage. Choose from **brief**, **detailed**, or **bullet** summaries and export them as beautiful PDFs with a logo.

---

## 📽️ Live Demo



---

## 🖼️ Screenshots

### 🔹 Extension Popup UI  
![Popup Screenshot](screenshots/popup-ui.png)

### 🔹 Summary Result  
![Summary Text](screenshots/summary-result.png)

### 🔹 Generated PDF with Logo  
![PDF Output](screenshots/pdf-output.png)

---

## 🧠 Summary Modes

- 📝 **Brief** – 2-3 line abstract
- 📚 **Detailed** – Paragraph-style explanation
- 📌 **Bullet Points** – Key highlights in bullets

---

## 🚀 How It Works

1. Extracts article text from the current webpage using a content script.
2. Sends the text to a **proxy server** that securely connects to the **Gemini Pro API**.
3. Returns a clean summary based on the selected mode (brief, detailed, bullets).
4. Allows copy or PDF export with branding.

---

## 🔐 About Gemini Proxy Server

Due to **CORS restrictions**, browser extensions can't call Google's Gemini API directly from the frontend.

So we use a **Node.js-based proxy server** hosted on [Vercel](https://vercel.com) that:

- Accepts POST requests with raw article text
- Sends it to **Gemini 2.0 Flash** (via Gemini API)
- Returns a clean summary to the extension

### 📡 API Endpoint Used
```bash
https://gemini-proxy-server.vercel.app/api/summarize
