# Kaybee's Blog Repo

[![Deploy Docs](https://github.com/LiuKay/liukay.github.io/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/LiuKay/liukay.github.io/actions/workflows/deploy-docs.yml)

### Reading Address - 阅读地址
- Cloudflare Pages: https://liukay-github-io.pages.dev/
- Github Pages: https://liukay.github.io/
- Gitee Pages: https://kaybee.gitee.io/

### Development

```bash
npx pnpm@8.15.9 install --frozen-lockfile
npx pnpm@8.15.9 docs:dev
```

### Build

```bash
npx pnpm@8.15.9 docs:build
```

Build output:

```text
docs/.vuepress/dist
```

### Deploy to Cloudflare Pages

The Cloudflare Pages project is `liukay-github-io`.

```bash
npx pnpm@8.15.9 docs:build
npx wrangler pages deploy docs/.vuepress/dist --project-name liukay-github-io --branch main
```
