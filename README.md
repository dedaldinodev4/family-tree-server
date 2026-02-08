# 🚀 Minimal Backend API

A minimal backend built with **Node.js**, **Fastify**, **Prisma ORM**, and **SQLite**.  
Ideal for **MVPs**, small projects, and modern frontend integrations (React, Vue, etc).  
Ready for deployment on **Render**.

---

## 🧱 Tech Stack

- Node.js
- Fastify
- TypeScript
- Prisma ORM
- Zod
- SQLite
- Render (Deployment)

---

## 📁 Project Structure

```bash
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── libs/
│   │   └── prisma.ts
│   ├── http/
│   │   └── routes/
│   │       ├── moments
│   │       └── members
│   ├── index.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
