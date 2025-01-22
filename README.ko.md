# indulgentia-front

> [NextJS](https://nextjs.org/)으로 구축된 Web

## 설정 전 준비사항
다음 정보가 필요합니다:
1. 기본사항
  - NEXT_PUBLIC_FRONTEND_URL: `NEXT_PUBLIC_FRONTEND_URL=<indulgentia-front-URL>`
  - NEXT_PUBLIC_API_URL: `NEXT_PUBLIC_API_URL=<indulgentia-front-URL>/api`
2. Supabase
  - NEXT_PUBLIC_SUPABASE_URL: Supabase URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anon key
  - SUPABASE_ADMIN_KEY: Supabase secret key
3. Github App
  - NEXT_PUBLIC_GITHUB_APP_INSTALL_URL: Github install URL for Github App [indulgentia-github](https://github.com/zarathucorp/indulgentia-github)
  - GITHUB_APP_ID
  - GITHUB_CLIENT_ID
  - GITHUB_CLIENT_SECRET: Github client secret for Github App [indulgentia-github](https://github.com/zarathucorp/indulgentia-github)
  - GITHUB_PRIVATE_KEY: Github private key for Github App [indulgentia-github](https://github.com/zarathucorp/indulgentia-github)
  - REDIRECT_URI: `REDIRECT_URI=<indulgentia-front-URL>/next-api/github/callback`
4. 결제
  - ENABLE_PAYMENT: Payment 기능 사용 여부
  - NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY(선택): Toss payments client key
  - TOSS_PAYMENTS_SECRET_KEY(선택): Toss payments secret key
5. 문의사항(선택)
  - NEXT_PUBLIC_INQUIRY_URL: POST 요청을 통한 문의사항 자체 URL
  - NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY: 채널톡 라이브러리 사용을 위한 plugin key

## 설정

```sh
git clone https://github.com/zarathucorp/indulgentia-front.git

# 환경변수 설정
cd indulgentia-front
touch .env  # dev와 prod 환경 분리 가능합니다. 자세한 사항은 NextJS 문서를 참조해주세요.

# 설정 전 준비사항 환경변수에 입력
(...)

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## 라이선스

[MIT](LICENSE) (c) 2025 Zarathu Co.,Ltd