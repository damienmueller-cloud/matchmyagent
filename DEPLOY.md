# MatchMyAgent — deploy

**GitHub Pages** serves from branch `gh-pages` (root). Custom domain: `matchmyagent.com.au` (CNAME in repo).

## ElevenLabs chatbot (live)
- Agent id: `agent_3201m3750m01ess9kv2r5kba1ggk`
- Widget greeting: `override-first-message` on each embed (Elle agent allows first_message overrides; agent's own first_message is phone-worded)
- Mode: voice + text; auth disabled (public widget)
- Embed: `<elevenlabs-convai>` + `https://unpkg.com/@elevenlabs/convai-widget-embed` on every HTML page (once per page, before `</body>`)
- No secrets / API keys in site files

## Ship updates
```bash
cd /workspace/matchmyagent-godaddy
# after editing on main:
git add -A && git commit -m "…" && git push origin main
# mirror SoT onto Pages branch (same tree as main):
git fetch origin
git checkout -B gh-pages origin/gh-pages
git checkout main -- .
git add -A
git commit -m "Deploy: sync main → gh-pages" || true
git push origin gh-pages
git checkout main
```
Or, when histories match: `git push origin main:gh-pages`.

## Live URLs
- https://matchmyagent.com.au/
- https://damienmueller-cloud.github.io/matchmyagent/ (if Pages path allows)
