# Guía de Despliegue y Configuración (Deployment Guide)

Esta guía explica cómo subir tu proyecto **AnimeNexus** a internet y cómo configurar el inicio de sesión.

---

## ☁️ ¿Dónde subirlo? (Vercel vs Netlify vs GitHub Pages)

Recomendación personal: **Vercel** o **Netlify**.

Aunque tu proyecto tiene scripts para `gh-pages`, **GitHub Pages** suele dar problemas con aplicaciones React que usan `react-router` (al recargar la página en una ruta interna, suele dar error 404 a menos que hagas configuraciones complejas/hacks).

**Vercel** y **Netlify** están diseñados para React y manejan esto automáticamente.

### Opción 1: Vercel (Recomendada 🏅)
Es creada por los mismos creadores de Next.js, es rapidísima y muy fácil de usar.

1.  Crea una cuenta en [vercel.com](https://vercel.com).
2.  Instala Vercel CLI si quieres hacerlo por consola (`npm i -g vercel`) o conéctalo con tu GitHub.
3.  **Vía GitHub (Más fácil):**
    *   Sube tu código a un repositorio de GitHub.
    *   En el dashboard de Vercel, dale a "Add New Project" e importa tu repositorio.
    *   Vercel detectará automáticamente que es `Create React App`.
4.  **Variables de Entorno:**
    *   En la configuración del proyecto en Vercel, ve a **Settings > Environment Variables**.
    *   Copia y pega una por una las variables de tu archivo `.env` (las que empiezan con `REACT_APP_FIREBASE_...`).
    *   Esto es crucial para que el Login funcione en producción.
5.  Dale a **Deploy**. ¡Listo!

### Opción 2: Netlify
Similar a Vercel.

1.  Arrastra tu carpeta `build` (generada con `npm run build`) a la zona de "Drop site folder here" en Netlify Drop.
2.  O conéctalo con GitHub para despliegue continuo.
3.  Recuerda añadir un archivo `_redirects` en la carpeta `public` que contenga:
    ```
    /*  /index.html  200
    ```
    Esto soluciona el problema de recargar páginas en React Router.

---

## 🔐 ¿Cómo funciona el Login (Firebase)?

Tu proyecto usa **Firebase Authentication**. Esto significa que no necesitas crear una base de datos de usuarios desde cero; Google se encarga de la seguridad.

### Pasos para que funcione:

1.  **Proyecto en Firebase Console:**
    *   Ve a [console.firebase.google.com](https://console.firebase.google.com).
    *   Crea un nuevo proyecto (o usa el existente).

2.  **Activar Authentication:**
    *   En el menú izquierdo, ve a **Build > Authentication**.
    *   Dale a "Get Started".
    *   En la pestaña **Sign-in method**, activa **Email/Password**.

3.  **Obtener las Keys:**
    *   Ve a la rueda dentada (Configuración del proyecto).
    *   Baja hasta "Tus aplicaciones" (Your apps). Si no hay ninguna, crea una web app (`</>`).
    *   Copia el objeto `firebaseConfig`.
    *   Esos valores son los que van en tu archivo `.env` local y en las Environment Variables de Vercel.

4.  **Dominios Autorizados (IMPORTANTE):**
    *   Por seguridad, Firebase solo permite logins desde dominios que tú autorices.
    *   En Authentication > Settings > **Authorized domains**.
    *   Añade el dominio que te de Vercel (ej: `animenexus.vercel.app`).
    *   Si no haces esto, el login fallará en producción con un error de "authorized domain".

---

## 📝 Resumen pasos para subir hoy mismo:

1.  Asegúrate que tienes el código en GitHub.
2.  Ve a Vercel, importa el repo.
3.  Pega las variables de entorno de Firebase en Vercel.
4.  Añade el dominio de Vercel a la lista blanca de Firebase Console.
5.  ¡Disfruta tu app online!
