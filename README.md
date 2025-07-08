# ✨ Concise AI - Article Summarizer Chrome Extension

**Concise AI** is a powerful Chrome extension that uses **Gemini AI** (via a secure proxy) to summarize articles directly on any webpage. Choose from **brief**, **detailed**, or **bullet** summaries and export them as beautiful PDFs with a logo.

---

## 📽️ Live Demo

https://github.com/user-attachments/assets/de20c67a-050e-4267-9169-e3d22e1d809b

---

## 🖼️ Screenshots

### 🔹 Extension Popup UI  
![Popup Screenshot](https://github.com/Abdurrehman96x/Concise-AI/blob/9a19f426685cad54b3b88ff58ee9bba89e580a92/screenshots/popup-ui.png.png)

### 🔹 Summary Result  
![Summary Text](https://github.com/Abdurrehman96x/Concise-AI/blob/9a19f426685cad54b3b88ff58ee9bba89e580a92/screenshots/summary-result.png.png)

### 🔹 Generated PDF with Logo  
![PDF Output](https://github.com/Abdurrehman96x/Concise-AI/blob/9a19f426685cad54b3b88ff58ee9bba89e580a92/screenshots/pdf-output.png.png)

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

https://github.com/Abdurrehman96x/gemini-proxy-server

So we use a **Node.js-based proxy server** hosted on [Vercel](https://vercel.com) that:

- Accepts POST requests with raw article text
- Sends it to **Gemini 2.0 Flash** (via Gemini API)
- Returns a clean summary to the extension

### 📡 API Endpoint Used
```bash
https://gemini-proxy-server.vercel.app/api/summarize
