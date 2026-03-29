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
        <style>
          body {
            font-family: sans-serif;
            padding: 20px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin: 10px 0;
          }
          a {
            text-decoration: none;
            color: #0070f3;
          }
        </style>
      </head>
      <body>
        <h1>LinkHub</h1>
        <ul>
        ${links.map(l => `
          <li>
            <a href="${BASE_URL}${l.path}">
              ${l.name}
            </a>
          </li>
        `).join('')}
        </ul>
      </body>
    </html>
  `)
})

export default app
