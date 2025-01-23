# indulgentia-front

> Web built with [NextJS](https://nextjs.org/)

## Prerequisites
You will need the following information:
1. Basic Information
  - NEXT_PUBLIC_FRONTEND_URL: `NEXT_PUBLIC_FRONTEND_URL=<indulgentia-front-URL>`
  - NEXT_PUBLIC_API_URL: `NEXT_PUBLIC_API_URL=<indulgentia-front-URL>/api`
2. Supabase
  - NEXT_PUBLIC_SUPABASE_URL: Supabase URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anon key
  - SUPABASE_ADMIN_KEY: Supabase secret key
3. Github App
  - NEXT_PUBLIC_GITHUB_APP_INSTALL_URL: Github install URL for Github App [open-rndsillog-githubapp](https://github.com/zarathucorp/open-rndsillog-githubapp)
  - GITHUB_APP_ID
  - GITHUB_CLIENT_ID
  - GITHUB_CLIENT_SECRET: Github client secret for Github App [open-rndsillog-githubapp](https://github.com/zarathucorp/open-rndsillog-githubapp)
  - GITHUB_PRIVATE_KEY: Github private key for Github App [open-rndsillog-githubapp](https://github.com/zarathucorp/open-rndsillog-githubapp)
  - REDIRECT_URI: `REDIRECT_URI=<indulgentia-front-URL>/next-api/github/callback`
4. Payment
  - ENABLE_PAYMENT: Whether to use the Payment feature
  - NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY(optional): Toss payments client key
  - TOSS_PAYMENTS_SECRET_KEY(optional): Toss payments secret key
5. Inquiries(optional)
  - NEXT_PUBLIC_INQUIRY_URL: URL for inquiries via POST request
  - NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY: Plugin key for using Channel Talk library

## Setup

```sh
git clone https://github.com/zarathucorp/indulgentia-front.git

# Set environment variables
cd indulgentia-front
touch .env  # You can separate dev and prod environments. Refer to the NextJS documentation for more details.

# Enter the environment variables from the prerequisites
(...)

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

[MIT](LICENSE) (c) 2025 Zarathu Co.,Ltd