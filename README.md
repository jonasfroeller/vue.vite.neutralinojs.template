# Neutralino.js Template With Vite.js and Vue.js

A modern starter template combining Neutralino.js, Vite, and Vue 3 with TypeScript support.

## Technologies

- **[Neutralino.js](https://neutralino.js.org/)**   - Lightweight desktop app framework, alternative to Electron
- **[Vite](https://vitejs.dev/)**                   - Next-generation frontend tooling with instant HMR
- **[Vue 3](https://vuejs.org/)**                   - Progressive JavaScript framework with Composition API

## Requirements

- **Node.js 18+**                                   - (required for Vite 6)
- **npm** or **yarn**                               - (package manager)

## Installation

```bash
# Clone the repository
git clone https://github.com/jonasfroeller/vue.vite.neutralinojs.template.git
cd vue.vite.neutralinojs.template

# Install dependencies
yarn

# Update Neutralino binaries
npx neu update

# Customize your app
# - Update `name` and `description` in `package.json`
# - Update `applicationId`, `modes.window.title`, and `cli.binaryName` in `neutralino.config.json`
# - Update `<title>` in `index.html`
# - Replace `public/favicon.ico` and icons
```

## Development

```bash
# Start Vite dev server (port 8080)
yarn dev

# Build and run in Neutralino window
yarn serve:neu
```

## Production Build

```bash
# TypeScript check + Vite build + Neutralino build
yarn build
```

Your app binaries will be in the `dist/` folder.

## Project Structure

```
├── src/                    # Source code
│   ├── main.ts             # App entry point
│   ├── App.vue             # Root component
│   └── env.d.ts            # TypeScript declarations
├── public/                 # Static assets
├── index.html              # HTML entry
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── neutralino.config.json  # Neutralino config
└── package.json            # Package config
```

## Version Info

- Vue 3.5.x
- Vite 6.x
- TypeScript 5.7
- Neutralino 5.4.x
