For prisma installation:
- npm i prisma --save-dev
- npm i @prisma/client
- npx prisma init
After creating schemas
- npx prisma db push

Got an Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
- npx prisma generate // still didn't work
- change import statement from "@prisma/client" to "../generated/prisma" in "./src/lib/prisma.ts"


✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn Prisma would have added DATABASE_URL but it already exists in .env
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. 
Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started