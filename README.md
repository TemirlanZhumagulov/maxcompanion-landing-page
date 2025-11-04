## MaxCompanion Landing (Next.js 14)

### Quickstart
1. Create `.env.local` in project root:
```
SUPABASE_URL="https://zotbgqsucubbldokifcm.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```
**Important:** You provided the anon key, but you need the SERVICE_ROLE_KEY to bypass RLS. Get it from:
1. Supabase Dashboard → Settings → API
2. Copy the "service_role" key (not the anon key)
3. Replace "YOUR_SERVICE_ROLE_KEY" above
```
2. Install and run:
```
pnpm i # or npm i / yarn
pnpm dev
```

### Deploy (Vercel)
- Add the two env vars in Vercel Project Settings.
- Deploy.



