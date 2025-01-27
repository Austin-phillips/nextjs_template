This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Setup Instructions

1. **Create Vercel Project and Get the Database URL**

   - Go to [Vercel](https://vercel.com) and create a new project.
   - Follow the prompts to import your repository.
   - Once the project is created, navigate to the project settings.
   - Under the "Environment Variables" section, add a new variable:
     - `DATABASE_URL` with the value obtained from your database provider.
   - Copy the `DATABASE_URL` value and add it to your local `.env` file.

   ```env
   DATABASE_URL=your_database_url_here
   ```

2. **Run the "db:reset-and-seed" Job**

   - Open your terminal and navigate to the project directory.
   - Run the following command to reset the database:

   ```bash
   npm run db:reset-and-seed
   ```

3. **Generate NEXTAUTH_SECRET**

   - Run the following command in your terminal to generate a secure token:

   ```bash
   openssl rand -hex 32
   ```

   - Copy the generated token and add it to your `.env` file:

   ```env
   NEXTAUTH_SECRET=your_generated_token_here
   ```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
