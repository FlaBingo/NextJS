NextAuth setup:
- created auth.ts in root
- created prisma.ts in lib folder (copy pasted from next auth doc, prisma adapter)
- created /app/api/auth/[...nextauth]/route.ts (setup handlers, get, post)

Problem was the version of next-auth, change it to `"next-auth": "^5.0.0-beta.25"`

changed file by nextauth:
- auth.ts
- lib/prisma.ts
- lib/auth.actions.ts
- app/api/auth/[...nextauth]/route.ts