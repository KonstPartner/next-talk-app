# NextTalk

**NextTalk** is a modern full-featured web application built with **Next.js + React + TypeScript**.
It allows users to read and create posts, leave comments, react to content, track viewing history, and explore preview posts from an external API.
The app focuses on clean architecture, scalable state management, accessibility, and a modern UI.

---

## Live Demo

> [next-talk-app.vercel.app/](https://next-talk-app.vercel.app/)

---

## Features

- **Modern Next.js application (App Router)** with React and TypeScript
- **Posts feed** with infinite scroll, sorting, search, and tag filtering
- **Post details page** with comments, reactions, and view counter
- **User authentication** (register / login)
- **Create, edit, and delete posts**
- **Comments system** with creation, deletion, and likes
- **Reactions system** (likes / dislikes) for posts and comments
- **Viewed posts history** stored in user profile and persisted locally
- **Dark / light theme support**
- **Responsive layout** for desktop and mobile
- **Accessible UI** (ARIA roles, keyboard navigation, screen reader support)

---

## Core Technologies

### Frontend Framework

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **React DOM** — DOM rendering

### Data Fetching & Server State

- **TanStack Query** — data fetching, caching, mutations

### State Management

- **Zustand** — lightweight client state (filters, theme, viewed history)

### Forms & Validation

- **React Hook Form** — form state and validation

### UI & Styling

- **Tailwind CSS 4** — utility-first styling

### UX & Utilities

- **react-intersection-observer** — infinite scroll & visibility tracking

### Type Safety

- **TypeScript 5**

### Mock Backend

- **json-server** — local REST API for users, posts, comments

---

## Installation

Install dependencies:

```bash
  npm install
```

---

## Development

Run the Next.js development server:

```bash
  npm run dev
```

Application will be available at:

```
  http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
  npm run build
```

Start the production server:

```bash
  npm run start
```

---

## Local API (json-server)

The application uses **json-server** as a mock backend for:

- users
- posts
- comments
- reactions
- viewed history

Run local API:

```bash
  npm run api
```

API will be available at:

```
  http://localhost:4000
```

> ⚠️ **Important:**
> The local API works only in local development or self-hosted production.
> In cloud deployments (e.g. Vercel), the json-server backend is **not available**.

---

## Notes

- Authentication is implemented **client-side only**, using json-server as a mock backend.
- Passwords are **hashed on the client** before storing in `db.json` (for demo purposes only).

---

## Next.js vs Vite (comparison)

This project is built with **Next.js (App Router)**. For comparison, there is also a SPA built with **Vite + React**:

- Vite project repo: [react-spa-app](https://github.com/KonstPartner/react-spa-app)
- Live demo: [react-spa-app/preview](https://konstpartner.github.io/react-spa-app/)

### Why Next.js here

- **SSR / SSG / ISR**: can render pages on the server for faster first load and better SEO.
- **App Router + Server Components**: flexible rendering strategy (server/client split).
- **Routing & layouts**: routing is built-in, including nested layouts and route-level loading/error states.
- **Fullstack-ready**: easy to add API routes / server actions when needed.

### Why Vite can be a better fit sometimes

- **Fast dev server** and very lightweight setup.
- Great for **pure SPA** use-cases where SSR isn’t needed.
- Simpler mental model: build a client app + connect to APIs.

### Key differences (high level)

- **Next.js**: framework (routing, SSR, build/runtime conventions).
- **Vite**: bundler/dev server (you choose router, SSR setup is optional and manual).
