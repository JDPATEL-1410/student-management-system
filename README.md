# Student Management System — Read-Only (API)

This React project fetches "students" from a public API (jsonplaceholder.typicode.com/users).
It is intentionally **read-only**: Add/Edit/Delete are not supported because the public API does not persist changes.

## How to run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the app:
   ```
   npm start
   ```

3. The app fetches data from:
   `https://jsonplaceholder.typicode.com/users`

Notes:
- The project uses `whatwg-fetch` polyfill for fetch support.
- If you later want writable API, switch to `json-server` or a real backend and modify the fetch calls.

