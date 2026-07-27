# ServiceConnect Nigeria

A digital marketplace connecting local communities with verified artisans, built entirely with standard web fundamentals. This application serves as our final capstone project at [Nanocodes](https://nanocodes.com.ng).

## The Tech Stack
To solidify our baseline engineering skills, this project enforces a strict, modern architecture using no frameworks:
* **HTML5** (Semantic layout structure)
* **CSS3** (Unified global design tokens, atomic utility classes, and custom responsive layouts)
* **Vanilla JavaScript** (DOM manipulation and state orchestration)

---

## Engineering Leadership & Collaboration
Beyond the user interface, the core of this project relies on rigorous repository governance and a **collaborative version control strategy**.

As the **Frontend Team Lead and Repository Owner**, I am responsible for enforcing codebase stability, managing layout integrity, and guiding a multi-developer workflow:

* **Branch Protection Rules:** I manage code deployment pipelines where only the Repository Owner has permission to merge staging lines into the protected `main` branch.
* **Strict Code Reviews:** Pull Requests are analyzed line-by-line as architectural gates-rejecting layout regressions (e.g., hardcoded raw CSS blocks) and ensuring all features cleanly inherit centralized component configurations (`css/components.css`, `css/button.css`).
* **Advanced Version Control:** Managing up-to-stream structural changes, resolving detached histories (`--allow-unrelated-histories` pipelines), and coordinating local merge conflict boundaries across active feature branches.

---

## Repository Structure

├── auth/
├── css/
│   ├── button.css         # Shared design tokens for CTAs
│   ├── navbar.css         # Global navigation variables
│   ├── components.css     # Unified global atomic styles
│   └── main.css           # Local feature composition
├── dashboards/
├── js/
├── index.html             # Core Landing Page
└── README.md

Development Workflow Protocol

For contributors working on feature branches:

   Ensure your local workspace mirrors the latest structural updates:
   Bash

   git checkout main
   git pull origin main

   Merge main into your active development tracking line locally to isolate and resolve folder clashes within VS Code before pushing to the cloud.

   Cleanly refactor semantic components to target our unified design token classes instead of implementing standalone, hardcoded overrides.
