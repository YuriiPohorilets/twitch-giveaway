## RUN DOCKER:

`docker compose up -d`

## RUN cloudflared tunnel:

`cloudflared tunnel --url http://localhost`

---

- Update env
- Update OAuth Redirect URLs

---

## Chat simulator:

`curl -X POST http://localhost:3000/dev/simulate/start \
  -H "Content-Type: application/json" \
  -d '{
    "activeUsers": 30000,
    "messagesPerSecond": 2000,
    "durationSeconds": 10,
    "keyword": "banana",
    "keywordChance": 0.2
  }'`
