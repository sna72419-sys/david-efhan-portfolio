# David N. Efhan — Portfolio

Developer portfolio built with Next.js, TypeScript, and Tailwind CSS.
Theme: "System Terminal" — a boot-sequence hero and receipt-styled project cards,
inspired by the POS/inventory systems in the projects themselves.

## Getting started

    npm install
    npm run dev

Open http://localhost:3000

## Edit your content

All portfolio content (name, summary, skills, experience, projects, education)
lives in one file: lib/data.ts. Edit that file to update anything on the site.

## Deploy

Easiest option is Vercel:
1. Push this project to a GitHub repo
2. Go to vercel.com, import the repo
3. Deploy (no config needed)

## Structure

- app/page.tsx — assembles all sections
- components/ — Hero, About, Skills, Experience, Projects, Contact, Nav, Footer
- lib/data.ts — all your content in one place
