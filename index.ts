// app/server.ts
import { Hono } from 'hono'

const app = new Hono()

const APP_PREFIX = '/linkhub'
const BASE_URL = process.env.BASE_URL || ''
const GITHUB_USER = process.env.GITHUB_USER || 'KM-rira'
const GITHUB_URL = `https://github.com/${GITHUB_USER}/`

const worldIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M2 12h20"></path>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
</svg>
`

const githubIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 8 10.95c.6.1.82-.25.82-.55v-2.15c-3.25.7-3.93-1.57-3.93-1.57-.53-1.35-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.2 1.8 1.2 1.05 1.8 2.75 1.28 3.42.98.1-.76.4-1.28.72-1.57-2.6-.3-5.33-1.3-5.33-5.8 0-1.28.45-2.33 1.2-3.15-.12-.3-.52-1.5.12-3.12 0 0 .98-.32 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.52 3.18-1.2 3.18-1.2.65 1.62.25 2.82.13 3.12.75.82 1.2 1.87 1.2 3.15 0 4.52-2.74 5.5-5.35 5.8.42.36.8 1.1.8 2.2v3.25c0 .3.2.66.83.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
</svg>
`

const links = [
    {
        name: 'growry',
        path: '/growry',
        github: 'growry',
    },
    {
        name: 'hono-note',
        path: '/hono-note/frontend',
        github: 'hono-note',
    },
    {
        name: 'profile',
        path: '/profile',
        github: 'profile',
    },
    {
        name: 'trends-summary',
        path: '/trends-summary',
        github: 'trends-summary',
    },
]

app.get('/env-check', (c) => {
    return c.json({
        BASE_URL: process.env.BASE_URL ?? null,
        GITHUB_USER: process.env.GITHUB_USER ?? null,
    })
})

app.get('/favicon.ico', (c) => {
    return c.body(null, 204)
})

app.get('/linkhub/health', (c) => {
    return c.text('linkhub server.ts is updated')
})

app.get(APP_PREFIX, (c) => {
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

          .row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          .name {
            font-size: 16px;
            font-weight: 500;
            word-break: break-word;
          }

          .actions {
            display: flex;
            gap: 10px;
            flex-shrink: 0;
          }

          .icon-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid #334155;
            background: #0f172a;
            color: #cbd5e1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .icon-btn:hover {
            transform: translateY(-1px);
            border-color: #60a5fa;
            color: #60a5fa;
            box-shadow: 0 6px 12px rgba(0,0,0,0.25);
          }

          .icon-btn svg {
            width: 20px;
            height: 20px;
            display: block;
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
            ${links.map((l) => `
              <div class="card">
                <div class="row">
                  <span class="name">${l.name}</span>

                  <div class="actions">
                    <a
                      class="icon-btn"
                      href="${BASE_URL}${l.path}"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="${l.name} を開く"
                      aria-label="${l.name} を開く"
                    >
                      ${worldIcon}
                    </a>

                    <a
                      class="icon-btn"
                      href="${GITHUB_URL}${l.github}"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="${l.name} の GitHub を開く"
                      aria-label="${l.name} の GitHub を開く"
                    >
                      ${githubIcon}
                    </a>
                  </div>
                </div>
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
