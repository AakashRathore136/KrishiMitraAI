# KrishiMitra AI

This is a Next.js (App Router) project structured for building and scaling UI without turning the codebase into a dumpster fire. It’s component-first, TypeScript-based, and intentionally boring in the best way.


Tech Stack

->Next.js (App Router)

->React

->TypeScript

->PostCSS

->PNPM / NPM

If you don’t know these already, this repo is not where you should start learning them.

Folder Structure
.
├── app/            # App Router pages, layouts, routes

├── components/     # Reusable UI components

├── hooks/          # Custom React hooks

├── lib/            # Shared utilities & helpers

├── public/         # Static assets

├── styles/         # Global and shared styles

├── components.json # Component configuration

├── next.config.mjs

├── postcss.config.mjs

├── tsconfig.json


Each folder has a single responsibility.

# Getting Started

Install dependencies:
### bash
-> pnpm install
### or
->npm install


Run the development server:
### bash
pnpm dev
### or
npm run dev


Open your browser at:
### arduino
http://localhost:3000


If this fails, check your Node version and package manager before blaming the code.


# Styling Rules (Read This)

-> Global styles live in styles/

-> Component-specific styles stay with the component

-> Do not dump everything into one global file out of laziness

Messy CSS compounds faster than bad logic.

# Components

* Components in components/ should be reusable

* Page-specific UI belongs near the page, not here

* Props should be explicit — hidden behavior is how bugs survive code review

If a component can’t explain itself by reading its props, it’s badly designed.

# Hooks

Custom hooks live in hooks/.

Use a hook only when:

* Logic is reused

* Or state management would otherwise be duplicated

If it’s used once, don’t pretend it’s reusable.

Contributing Guidelines

* If you’re modifying this repo:

* Don’t add dependencies “just in case”

* Don’t commit unfinished experiments

Don’t ignore the existing structure

Every change should have a reason. If you can’t explain it, don’t push it.
