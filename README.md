## Getting Started [Next.js](https://nextjs.org/)

```bash
npx create-next-app@latest
#after config
cd [project name]
#run the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started [Prisma](https://www.prisma.io/)

```bash
npx prisma init #create prisma folder
#after update schema and .env for datebase
npx prisma db push
#run the development server
yarn dev
```
When updated file `schema.prisma`
```bash
npx prisma generate
```
## Update Latest Version Package
using npx (so you don't have to install a global package)
```bash
npx npm-check-updates -u
yarn install
```