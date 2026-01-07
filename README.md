<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1G2Z6fsSlxet7dLo2biSogzIQKNVAbIDN

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Ensure your serverless endpoint is configured with a service account (no client API keys). The UI calls `POST /api/agent` with `{ "prompt": "...", "systemInstruction": "..." }` and expects `{ "text": "..." }`.
3. Run the app:
   `npm run dev`
