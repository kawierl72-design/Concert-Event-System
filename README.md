# Concert Registration — Full Features (MERN)

This scaffold includes:
- Express backend with MongoDB models, auth, QR generation, PDF e-ticket creation, email sending, Stripe/PayPal/GCash endpoints.
- React frontend with Tailwind and custom style.css, admin dashboard, payments placeholders.
- Docker + docker-compose for local run (Mongo + backend).

## Important environment variables
Copy `backend/.env.example` to `backend/.env` and set values for:
- MONGO_URI (for local with Docker use mongodb://mongo:27017/concert_reg)
- JWT_SECRET
- SMTP_HOST / SMTP_USER / SMTP_PASS / FROM_EMAIL (for email sending)
- STRIPE_SECRET_KEY (if using Stripe)
- PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET (if using PayPal)

## Run locally with Docker (recommended)
1. Build & start:
   ```bash
   docker-compose up --build
   ```
   - This starts MongoDB and the backend (backend serves API on port 5000).
2. Frontend (locally):
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Visit http://localhost:3000

## Run locally without Docker
- Backend:
  ```bash
  cd backend
  npm install
  cp .env.example .env
  npm run dev
  ```
- Frontend:
  ```bash
  cd frontend
  npm install
  npm start
  ```

## Admin login (seeded if not present)
- Username: `dan`
- Password: `dan123`

## Stripe / PayPal / GCash
- Stripe: server returns clientSecret; integrate Stripe.js client-side to complete payment and mark registration as paid.
- PayPal: example using `paypal-rest-sdk` server-side; follow PayPal docs for return/callback.
- GCash: placeholder route provided — you must register as a partner and implement according to GCash docs.

## Notes on vulnerabilities
Run `npm audit` and `npm audit fix` as needed. Avoid `--force` unless you accept breaking changes.

If you want, I can now:
- Fully integrate Stripe.js client-side and finalize payment flow.
- Connect real PayPal flow and GCash (requires your API credentials).
- Deploy this to Render / Railway / Vercel and provide a live URL (I will provide steps & config).
