// app/server.ts
import { Hono } from 'hono'

const app = new Hono()

const BASE_URL = process.env.BASE_URL || ''

const links = [
    { name: 'growry', path: '/growry' },
    { name: 'hono-note', path: '/hono-note/frontend' },
    { name: 'profile', path: '/profile' },
    { name: 'trends-summary', path: '/trends-summary' },
]

app.get('/linkhub', (c) => {
    return c.html(`
    <html>
      <head>
        <title>LinkHub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f172a;
            color: #e5e7eb;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
          }

          h1 {
            font-size: 28px;
            margin-bottom: 30px;
            text-align: center;
          }

          .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .card {
            background: #1e293b;
            border-radius: 12px;
            padding: 16px 20px;
            transition: all 0.2s ease;
            border: 1px solid #334155;
          }

          .card:hover {
            transform: translateY(-2px);
            border-color: #60a5fa;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          }

          .link {
            text-decoration: none;
            color: inherit;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .name {
            font-size: 16px;
            font-weight: 500;
          }

          .arrow {
            font-size: 14px;
            color: #60a5fa;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }

          @media (min-width: 640px) {
            .grid {
              grid-template-columns: 1fr 1fr;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>🚀 LinkHub</h1>

          <div class="grid">
            ${links.map(l => `
              <div class="card">
                <a class="link" href="${BASE_URL}${l.path}" target="_blank">
                  <span class="name">${l.name}</span>
                  <span class="arrow">→</span>
                </a>
              </div>
            `).join('')}
          </div>

          <div class="footer">
            your internal tools hub
          </div>
        </div>
      </body>
    </html>
  `)
})

export default app
