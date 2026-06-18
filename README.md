# neuronest eCommerce — Marketing Site

A multi-language Next.js marketing website for the neuronest eCommerce platform.

## Languages

- English (`/en`)
- Sinhala (`/si`)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). The default locale (English) is served at `/` and `/en`.

Start the marketing API separately (see `../marketing-backend`):

```bash
cd ../marketing-backend
npm run start:dev
```

Set `NEXT_PUBLIC_MARKETING_API_URL=http://localhost:5001/api` in `.env.local`.

## Production

```bash
npm run build
npm start
```

## Adding translations

Edit files in `src/messages/`. Each locale has its own JSON file (e.g. `en.json`, `si.json`).

To add a new language:

1. Add the locale to `src/i18n/routing.ts`
2. Create `src/messages/{locale}.json`
3. Update the middleware matcher in `src/middleware.ts`
