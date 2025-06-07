# woldra-calcs
calculators for finances

## Financial calculators
This application will consist of calculators relating to financials. This is a front end application only, there is no back end so everything is stored to the client's machine. 

### Bill Splitter
Split bills up with a date range, allow payees to have their own date ranges.

### Budget Rater
Will Rate your budget

### Tech Stack
React and Tailwind

### Setting up GitHub
1. Download and install Git
1. Run this command with your email address 
	`ssh-keygen -t ed25519 -C "your_email@example.com"`
1. Then Run the following command to get your file 
	`clip < ~/.ssh/id_ed25519.pub`
1. Go to your Github >> SSH and GPG Keys and click "New SSH Key"
1. Give it a title
1. Paste what you copied in the "Key" box
1. Click add SSH Key
1. You will be prompted for your password


## Releases to Firebase

### First Time Setup 
1. `curl -sL https://firebase.tools | bash`
1. Login using your Machine's credentials
1. `firebase login`
1. Visit the URL and login
1. `firebase init hosting`
	1. Type `out` to `What do you want to use as your public directory?`
	1. Hit `N` to `Configure as a single-page app (rewrite all urls to /index.html)?`
	1. Hit `N` to `Set up automatic builds and deployes with GitHub?`
	1. Hit `N` to `File out/404.html already exists. Overwrite?`
	1. Hit `N` to `File out/index.html already exists. Overwrite?`
1. `firebase deploy --only hosting`


### 1+ Runs
Once Firebase is setup 
1. `npm run build`
1. `firebase deploy --only hosting` or `firebase deploy`

---






This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
