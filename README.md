<div align="center">

# 🟩 Wordle en Español

**Adivina la palabra del día en 6 intentos.**

[![Deploy](https://github.com/TU_USUARIO/wordle-es/actions/workflows/deploy.yml/badge.svg)](https://github.com/TU_USUARIO/wordle-es/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)

Una nueva palabra cada día · Estadísticas persistentes · Compartir resultado

[**▶ Jugar ahora**](https://TU_USUARIO.github.io/wordle-es/)

---

<img src="https://img.shields.io/badge/🟩🟨⬛🟩🟩-WORDLE-1a1b21?style=for-the-badge&labelColor=1a1b21" />

</div>

## ✨ Características

- **Palabra diaria** — Cada día se genera una nueva palabra de 5 letras a partir de un diccionario de palabras españolas comunes, determinista por fecha (todos los jugadores ven la misma palabra).
- **6 intentos** con feedback visual inmediato:
  - 🟩 **Verde** → Letra correcta en la posición correcta
  - 🟨 **Amarillo** → Letra correcta en posición incorrecta
  - ⬛ **Gris** → Letra no presente en la palabra
- **Teclado virtual** interactivo con colores sincronizados al estado de cada letra.
- **Teclado físico** — Compatible con escritura por teclado, incluyendo la **Ñ**.
- **Animaciones fluidas** — Flip reveal, pop-in, shake en error, bounce al ganar.
- **Estadísticas completas** — Partidas jugadas, porcentaje de victorias, racha actual/máxima, distribución de intentos.
- **Compartir resultado** — Genera la cuadrícula de emojis para copiar y compartir.
- **Persistencia** — Progreso y estadísticas se guardan en `localStorage`.
- **Responsive** — Diseñado para funcionar en desktop, tablet y móvil.
- **Countdown** — Temporizador hasta la siguiente palabra.

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| **React 18** | UI con componentes funcionales y hooks |
| **TypeScript** | Tipado estricto en toda la base de código |
| **Vite 6** | Bundler ultrarrápido con HMR |
| **CSS Variables** | Sistema de diseño coherente y themeable |
| **localStorage** | Persistencia de partida y estadísticas |
| **GitHub Actions** | CI/CD — deploy automático a GitHub Pages |

## 📁 Estructura del proyecto

```
wordle-es/
├── public/
├── src/
│   ├── components/
│   │   ├── Cell.tsx          # Celda individual del grid
│   │   ├── Row.tsx           # Fila de 5 celdas
│   │   ├── Grid.tsx          # Grid completo (6 filas)
│   │   ├── Keyboard.tsx      # Teclado virtual
│   │   ├── StatsModal.tsx    # Modal de estadísticas
│   │   └── Toast.tsx         # Notificaciones toast
│   ├── data/
│   │   └── words.ts          # Diccionario de palabras españolas
│   ├── hooks/
│   │   ├── game-logic.ts     # Lógica pura: evaluación, persistencia, utilidades
│   │   └── useWordle.ts      # Hook principal con estado del juego
│   ├── styles/
│   │   └── global.css        # Variables CSS, animaciones, estilos base
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Entry point
│   └── types.ts              # Definiciones TypeScript
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions → GitHub Pages
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Instalación y desarrollo

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9

### Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/wordle-es.git
cd wordle-es
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build de producción

```bash
npm run build
npm run preview    # Previsualizar el build
```

## 🌐 Deployment

### Opción A: GitHub Pages (automático)

El repositorio incluye un workflow de GitHub Actions que despliega automáticamente a GitHub Pages cada vez que haces push a `main`.

**Setup:**

1. Ve a **Settings → Pages** en tu repositorio de GitHub.
2. En **Source**, selecciona **GitHub Actions**.
3. Haz push a `main` — el deploy se ejecuta automáticamente.
4. Tu juego estará disponible en `https://TU_USUARIO.github.io/wordle-es/`

> **Nota:** Si tu repositorio tiene un nombre diferente a `wordle-es`, actualiza el campo `base` en `vite.config.ts` para que coincida.

### Opción B: Vercel

```bash
npm i -g vercel
vercel
```

### Opción C: Netlify

```bash
npm run build
# Arrastra la carpeta `dist/` al dashboard de Netlify
```

## 🎮 Cómo jugar

1. Escribe una palabra de 5 letras usando el teclado virtual o tu teclado físico.
2. Pulsa **ENTER** para confirmar tu intento.
3. Observa el feedback de colores y ajusta tu siguiente intento.
4. Tienes **6 intentos** para adivinar la palabra del día.
5. ¡Comparte tu resultado con amigos!

## 🔧 Personalización

### Añadir más palabras

Edita `src/data/words.ts`:
- **`SOLUCIONES`** — Palabras que pueden ser la solución del día (deben ser comunes y reconocibles).
- **`EXTRA_VALIDAS`** — Palabras adicionales aceptadas como intento pero que no serán solución.

### Cambiar tema visual

Modifica las CSS variables en `src/styles/global.css`:

```css
:root {
  --color-correct: #5a9a60;  /* Verde */
  --color-present: #c9a644;  /* Amarillo */
  --color-absent:  #4a4d56;  /* Gris */
  --bg-primary:    #13141a;  /* Fondo principal */
  /* ... */
}
```

## 📄 Licencia

[MIT](./LICENSE) — Usa, modifica y comparte libremente.

---

<div align="center">

Hecho con ☕ y mucho *¿tiene la Ñ?*

</div>
