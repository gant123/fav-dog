# FavDog

[![Nx Logo](https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png)](https://nx.dev)

Welcome to **FavDog** – a modular, modern workspace built with [Nx](https://nx.dev), featuring React with Vite, Tailwind CSS, and automated release management with Nx Release. This project was designed to help dog lovers search and favorite adoptable shelter dogs, with robust CI/CD and release automation in place.

---

## About the Project

**FavDog** is a front-end application that provides a friendly user interface to browse and favorite shelter dogs. It leverages modern technologies:

- **NX** – For managing the monorepo, running tasks, and ensuring a scalable project architecture.
- **Vite** – As the bundler, providing a fast development experience.
- **Tailwind CSS** – For rapid, utility‑first styling.
- **Nx Release** – To automate versioning, changelog generation, and release management.
- **Nx Cloud** – To improve build performance and task distribution.

This workspace is configured to use these tools optimally. For example, the `nx.json` file declares generator defaults for React applications and libraries, ensuring that all new code adheres to our best practices. The build targets and named inputs are set up to improve caching and to enforce a clean production build.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (we use Node 20 for production)
- [Nx CLI](https://nx.dev) (if needed globally: `npm install -g nx`)
- A package manager (npm or yarn)

### Installation

Clone the repository and install dependencies:

```sh
git clone <your-repo-url>
cd fav-dog
npm ci --legacy-peer-deps
```
