<div align="center">
  <img width="1215" height="777" alt="MarkerMind" src="https://github.com/user-attachments/assets/af3e167f-afb7-4063-809b-2522ccd0090a" />
</div>

# MarkerMind

**MarkerMind** is an AI-powered application designed to simplify and enhance the process of analyzing research literature. With MarkerMind, researchers and bioinformaticians can easily extract key insights from pasted text or uploaded PDFs, including:

* **Cell Types** mentioned in the text
* **Marker Genes** associated with each cell type
* **Methods** used to identify these markers
* **Context** (biological, experimental, etc.) in which the markers are discussed

Built with researchers in mind, MarkerMind streamlines the process of mining literature for single-cell and tissue profiling studies. Whether you're parsing a published study or analyzing a new dataset, MarkerMind helps you access relevant marker information efficiently and accurately.

---

## 🚀 Access the App

Start using MarkerMind today!
👉 [Visit MarkerMind](https://markermind.netlify.app/)

---

## 🧑‍💻 Run and Deploy Your AI Studio App

This section provides everything you need to run MarkerMind locally on your machine.

**View your app in AI Studio:**
👉 [MarkerMind on AI Studio](https://ai.studio/apps/drive/1hap9ibdzfqdyLtZ8R6Ezsp-82NqEYKiK)

### 🔧 Run Locally

**Prerequisites:**

* [Node.js](https://nodejs.org/): Make sure you have Node.js installed.

### Steps:

1. **Install Dependencies:**
   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

2. **Configure API Key:**
   Set your `GEMINI_API_KEY` in the `.env.local` file to authenticate API calls. This key is required to interact with Gemini’s backend services.

3. **Run the App Locally:**
   Start the development server by running:

   ```bash
   npm run dev
   ```

The app will now be accessible at `http://localhost:3000` in your web browser.

---

## 📖 Features & Capabilities

* **AI-Powered Extraction:** MarkerMind uses advanced machine learning models to accurately detect and extract biological markers and cell types.
* **Supports Multiple Formats:** Upload PDFs or paste text to extract data — no need for complex formatting.
* **Flexible Context Understanding:** Whether you're dealing with cell-specific studies, pathology reports, or single-cell RNA sequencing, MarkerMind adapts to your research needs.

---

## 🛠️ Contributing

Interested in contributing to MarkerMind? We welcome contributions from the community! To get started:

1. Fork this repository.
2. Clone your fork to your local machine.
3. Create a new branch for your feature or bug fix.
4. Write tests for your changes.
5. Submit a pull request.

---

## 📄 License

MarkerMind is open-source software released under the [MIT License](LICENSE). Feel free to contribute, fork, or use it in your own projects!
