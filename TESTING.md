# Testing Guide for E-Commerce Backend

## Server Status
✅ Your server is running on: **http://localhost:4000**

---

## 1. Quick Health Check

### Browser Test
Open in your browser:
```
http://localhost:4000/health
```
**Expected Response:**
```json
{"ok": true}
```

---

## 2. API Documentation (Swagger UI)

### View Interactive API Docs
```
http://localhost:4000/docs
```
This will show you all available endpoints with interactive testing capabilities.

---

## 3. Test Endpoints with PowerShell

### A. Health Check
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/health" -Method GET | Select-Object -ExpandProperty Content
```

### B. Register a New User
```powershell
$registerBody = @{
    email = "test@example.com"
    password = "password123"
    name = "Test User"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### C. Login
```powershell
$loginBody = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### D. List Products
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/products" -Method GET | Select-Object -ExpandProperty Content
```

---

## 4. Test with cURL (if installed)

### Register User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}"
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### List Products
```bash
curl http://localhost:4000/api/products
```

---

## 5. Available API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products (`/api/products`)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

---

## 6. Testing with Postman

1. **Import the collection:**
   - Open Postman
   - Import file: `docs/postman_collection.json`

2. **Set environment variable:**
   - Create variable: `baseUrl` = `http://localhost:4000`

3. **Run tests:**
   - Execute requests in order
   - Auth token will be saved automatically

---

## 7. Run Automated Tests

### Run all tests
```powershell
npx jest
```

### Run tests in watch mode
```powershell
npx jest --watch
```

### Run with coverage
```powershell
npx jest --coverage
```

---

## 8. Database Operations

### Run migrations
```powershell
npx prisma migrate dev
```

### Seed the database
```powershell
npx ts-node prisma/seed.ts
```

### Open Prisma Studio (Database GUI)
```powershell
npx prisma studio
```
This opens a GUI at `http://localhost:5555` to view and edit your database.

---

## 9. Check for Errors

### View Server Logs
The server logs are in your terminal where you ran the dev server.

### Check for TypeScript Errors
```powershell
npx tsc --noEmit
```

### Run Linter
```powershell
npm run lint
```

---

## 10. Test Checklist

- [ ] Health endpoint returns `{"ok": true}`
- [ ] Swagger docs are accessible at `/docs`
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Can list products (even if empty)
- [ ] Database connection is working
- [ ] No TypeScript compilation errors
- [ ] No linting errors

---

## Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution:** This is normal! The root path `/` is not defined. Use `/health` or `/docs` instead.

### Issue: Database connection errors
**Solution:** Check your `DATABASE_URL` in `.env` file and ensure the database is accessible.

### Issue: JWT errors
**Solution:** Make sure `JWT_SECRET` is set in your `.env` file.

### Issue: Port already in use
**Solution:** Change the port in `.env` or kill the process using port 4000:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force
```

---

## Next Steps

1. ✅ Server is running
2. Test the `/health` endpoint
3. View API docs at `/docs`
4. Seed your database with sample data
5. Test authentication endpoints
6. Test product endpoints
7. Run automated tests

**Happy Testing! 🚀**
