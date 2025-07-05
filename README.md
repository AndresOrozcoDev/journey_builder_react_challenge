# JOURNEY BUILER REACT CHALLENGE

<p align="center">
    <img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
    <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" />
</p>

## 🧠 Descripción

**Journey Builder** es una aplicación interactiva para visualizar y gestionar relaciones de *prefill* entre formularios dentro de un flujo tipo *wizard*, representado como un **grafo dirigido acíclico (DAG)**.

Esta herramienta permite:

- Ver todos los formularios y sus campos.
- Detectar automáticamente campos con prefill configurado desde otro formulario.
- Configurar o modificar relaciones de prefill válidas.
- Asegurar que los formularios seleccionables como prefill estén correctamente conectados en el grafo.

---

## ⚙️ Funcionalidad del grafo

- Los formularios están representados como nodos (`nodes`) con conexiones (`edges`).
- Solo se permiten relaciones de prefill desde formularios **antecesores** en el grafo (no cualquiera).
- `graph.ts` contiene funciones clave como:
  - `getFormFieldsWithPrefill(graph)` → devuelve la tabla de campos con posibles relaciones de prefill.
  - `getUpstreamFormsWithFields(formId)` → devuelve formularios válidos que pueden hacer prefill en el actual.

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

## 📁 Estructura del Proyecto

```bash
    ├── App.tsx                   # Página principal y controlador de estado general
├── components/
│   ├── FormList.tsx         # Tabla principal que lista los formularios y sus campos
│   ├── FormPrefill.tsx      # Modal para crear/editar configuración de prefill
│   ├── FormDelete.tsx       # Modal de confirmación para eliminar prefill
│   ├── Modal.tsx            # Contenedor reutilizable de modal
│   ├── Loader.tsx           # Spinner de carga
│   └── Toast.tsx            # Componente de notificación de errores
├── utils/
│   ├── graph.ts             # Lógica para analizar el grafo y extraer relaciones de formularios y campos
│   └── types.ts             # Tipos TypeScript para las entidades del grafo
├── services/
│   └── avantosApi.ts        # Llamada mock a la API `GetActionBlueprintGraph`
```