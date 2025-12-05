# AnimeNexus 🎬

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&style=flat-square)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&style=flat-square)](https://firebase.google.com/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-CSS_in_JS-DB7093?logo=styled-components&style=flat-square)](https://styled-components.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square&logo=vercel)](https://animenexusapp-55u7j8rft-arturokaadus-projects.vercel.app/)

[English](#english) | [Español](#español)

---

<a name="english"></a>
## 🚀 About the Project
**AnimeNexus** is a modern, feature-rich web application designed for anime enthusiasts. It provides a comprehensive platform to discover movies, TV series, and explore detailed character information.

Built with performance and aesthetics in mind, it features a custom **Dark Mode**, **NSFW content gating**, and a seamless user experience powered by **React** and **Jikan API (MyAnimeList)**.

> [!NOTE]
> **Live Demo & Login:**
> To experience the full app (including profile and NSFW sections), you can register a new account or use the test credentials:
> - **Email:** `test@user.com` (or register your own)
> - **Password:** `123456`

### 📸 Screenshots
> *Add your screenshots here*
>
> ![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)
> *Interactive Hero Section & Trending Lists*

### ✨ Key Features
*   **Authentication:** Secure login and registration using **Firstbase**.
*   **Anime Discovery:** Search and browse anime by popularity, score, or upcoming releases.
*   **NSFW Content:** Dedicated, 18+ age-gated sections for "Brutal Moments" and "Hot Characters" with video clips.
*   **Manga Guide:** Smart guide to identify where the anime ends and the manga begins.
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
*   **Dark Mode:** Built-in theme toggler for comfortable viewing.
*   **Age Verification:** Session-based age checks for mature content.

### 🛠️ Tech Stack
*   **Frontend:** React.js (Hooks, Context API)
*   **Styling:** Styled Components (CSS-in-JS)
*   **Backend / Auth:** Firebase v9
*   **Data Source:** Jikan API v4 (MyAnimeList), AniList API
*   **Routing:** React Router v6
*   **Icons:** Iconify

### 🏃‍♂️ How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/animenexus.git
    cd animenexus
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4.  **Start the development server**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

<a name="español"></a>
## 🚀 Sobre el Proyecto
**AnimeNexus** es una aplicación web moderna y completa diseñada para fanáticos del anime. Ofrece una plataforma para descubrir películas, series de TV y explorar información detallada sobre personajes.

Construida pensando en el rendimiento y la estética, cuenta con **Modo Oscuro** personalizado, **protección de contenido NSFW** y una experiencia de usuario fluida impulsada por **React** y la **Jikan API (MyAnimeList)**.

### 📸 Capturas de Pantalla
> *Añade tus capturas aquí*
>
> ![Página Principal](https://via.placeholder.com/800x400?text=Captura+Home)
> *Sección Hero Interactiva y Listas de Tendencias*

### ✨ Características Principales
*   **Autenticación:** Inicio de sesión y registro seguro usando **Firebase**.
*   **Descubrimiento:** Busca y navega animes por popularidad, puntuación o próximos estrenos.
*   **Contenido NSFW:** Secciones dedicadas y protegidas para mayores de 18 (Brutal Moments y Hot Characters) con clips de video.
*   **Guía de Manga:** Guía inteligente para saber en qué capítulo del manga continúa el anime.
*   **Diseño Responsivo:** Totalmente optimizado para móvil, tablet y escritorio.
*   **Modo Oscuro:** Alternancia de temas para una visualización cómoda.
*   **Verificación de Edad:** Chequeo de edad basado en sesión para contenido maduro.

### 🛠️ Tecnologías Usadas
*   **Frontend:** React.js (Hooks, Context API)
*   **Estilos:** Styled Components (CSS-in-JS)
*   **Backend / Auth:** Firebase v9
*   **Fuente de Datos:** Jikan API v4 (MyAnimeList), AniList API
*   **Enrutamiento:** React Router v6
*   **Iconos:** Iconify

### 🏃‍♂️ Cómo Correrlo Localmente

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tuusuario/animenexus.git
    cd animenexus
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**
    Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase:
    ```env
    REACT_APP_FIREBASE_API_KEY=tu_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
    REACT_APP_FIREBASE_APP_ID=tu_app_id
    ```

4.  **Iniciar el servidor de desarrollo**
    ```bash
    npm start
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
