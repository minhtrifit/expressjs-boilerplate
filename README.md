# EXPRESSJS BOILERPLATE DOCUMENTATION

<img src="https://img.shields.io/github/stars/minhtrifit/expressjs-boilerplate"/> ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/minhtrifit/expressjs-boilerplate)

# 📋 Table of Contents

1. [Required & Technical Stack](#required-technical-stack)
2. [Config](#config)
3. [Installation](#installation)
4. [API List](#api-list)

## 💻 Required & Technical Stack <a name="required-technical-stack"></a>

- Node version: >18.x (recommend 24.12.0)
- [Express.js](https://expressjs.com)
- [ProgreSQL](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)

## ⚙️ Config .env file <a name="config"></a>

- Config [.env]() file in root dir with path `./.env`
- Project use [Prisma](https://www.prisma.io/docs/getting-started) as ORM

```bash
BASE_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=expressjs_boilerplate
DATABASE_URL="postgresql://postgresql:123456@localhost:5432/expressjs_boilerplate"

# IF AUTHENTICATED WITH ADMIN ROLE
ADMIN_CODE=USER_FOR_CREATE_USER

# IF USING SEND EMAIL SERVICE
EMAIL_USER=
EMAIL_PASSWORD=
```

## 📦 Installation <a name="installation"></a>

⛓️‍💥 Intall packages & dependencies

```console
npm install
```

💽 Run **DEVELOPMENT** mode (need to install packages & dependencies first)

```console
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

💽 Run **PRODUCTION** mode (need to install packages & dependencies first)

```console
npm run prod
```

✅ Check **ESLint**

```console
npm run lint
```

🛠️ Fix **ESLint**

```console
npm run lint:fix
```

✅ Check **Prettier**

```console
npm run prettier
```

🛠️ Fix **Prettier**

```console
npm run prettier:fix
```

⛃ Create **Prisma** migration

```console
npm run prisma:migrate:dev
```

⟲ Reset **Prisma** database

```console
npm run prisma:reset
```

🌱 Seed **Prisma** database

```console
npm run prisma:seed
```

## 📝 API List<a name="api-list"></a>

Local URL: **http://localhost:5000/api-docs**

### Global Request Header

| Key               | Value                          | Required |
| ----------------- | ------------------------------ | -------- |
| `Accept-Language` | `vi` or `en` (default is `vi`) | ❌       |
