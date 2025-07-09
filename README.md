# JOURNEY BUILER REACT CHALLENGE

<p align="center">
    <img src="https://img.shields.io/badge/React-19.1.0-20232a?logo=react&logoColor=%2361DAFB" />
    <img src="https://img.shields.io/badge/Node.js-20.11.1-6DA55F?logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-7.0.0-646CFF?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-5.8.3-007ACC?logo=typescript&logoColor=white" />
</p>

## 🎥 Presentation

![video](assets/video.mp4)

> [!TIP]
> The demo video is available directly in this repository at `assets/videos/presentation.mkv`.  
Due to the video's length and the fact that my YouTube account is not yet verified, I was unable to upload it to the platform.

---

## 🧠 Descripción

**Journey Builder** is an interactive application for visualizing and managing *prefill* relationships between forms within a wizard-like flow, represented as a **Directed Acyclic Graph (DAG)**.

This tool allows you to:

- View all forms and their fields.
- Automatically detect fields with prefill configured from another form.
- Configure or modify valid prefill relationships.
- Ensure that forms selectable as prefill sources are properly connected in the graph.

---

## ⚙️ Graph Functionality

- Forms are represented as nodes (`nodes`) with connections (`edges`).
- Prefill relationships are only allowed from **antecesores** forms in the graph (not just any form).
- `graph.ts` contains key functions such as:
  - `getFormFieldsWithPrefill(graph)` → returns the table of fields with possible prefill relationships.
  - `getUpstreamFormsWithFields(formId)` → returns valid forms that can prefill the current one.

---

## Requirements

- [Node JS](https://nodejs.org/es).
- [Server backend]() running.

## Run local

Clone repository
```bash
    https://github.com/AndresOrozcoDev/journey_builder_react_challenge.git
    cd journey_builder_react_challenge
```

Install dependencies
```bash
    npm i
```

Run server
```bash
    npm run dev
```

## 📁 Project Structure

```bash
├── App.tsx                  # Main page and global state controller
├── components/
│   ├── FormList.tsx         # Table to list forms and fields
│   ├── FormPrefill.tsx      # Form to manage Prefill settings
│   ├── FormDelete.tsx       # Form to delete Prefill relationships
│   ├── Modal.tsx            # Modal component
│   ├── Loader.tsx           # Loading indicator component
│   └── Toast.tsx            # Notification (toast) component
├── utils/
│   ├── graph.ts             # Graph logic and traversal utilities
│   └── types.ts             # Type definitions and interfaces
├── services/
│   └── avantosApi.ts        # HTTP service to fetch Avantos data
```

---

> [!WARNING]
> This challenge does not include any backend endpoints for modifying data. The edit and delete actions are simulated only at the interface level (React).

## Autor

**Andrés Orozco**

- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)