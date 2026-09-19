# MatchMyAgent GoDaddy staging — notes

Updated: 2026-09-19 ~15:45 AEST (Australia/Brisbane)  
Folder: `/workspace/matchmyagent-godaddy/`  
**Locked brand: MatchMyAgent**  
**Soft-canonical / intended domain: `https://matchmyagent.com.au`**

## Rename history (operator)
- Formerly staged as FirstPick / firstpickagent.com.au under `/workspace/first-pick-godaddy/`.
- **FirstPick brand pause resolved** — Mia/Damien locked **MatchMyAgent** + **matchmyagent.com.au**.
- Hold `firstpickagent.com.au` permanently (do not use as production host).
- Folder renamed to `matchmyagent-godaddy` after content rebrand.

## Brand kit (locked interim)
| Item | Status |
|------|--------|
| Wordmark | Header text lockup **“MatchMyAgent”** (Sora) + tagline “Hunter matching · NSW” — **no FirstPick Manus PNG** |
| Mark / favicon | Simple geometric **M** SVG (`favicon.svg`, `brand/logos/mark.svg`) + PNG/ICO — not Manus doc+magnifier |
| Colour tokens | Interim navy `#071b2b`, teal `#1fb8a5` / `#70e1d2`, cream `#f4f2eb`, coral `#ff6b4a` |
| Fonts | Sora (headings) + Manrope (body) via Google Fonts |
| Theme color | `#071b2b` meta |
| Archived | Old Manus FirstPick mark under `brand/logos/_archived-firstpick-manus/` |

## Done (site scaffold)
- MVP: home, how-it-works, enquire (FormSubmit → damienmueller@gmail.com), about, privacy, thank-you, 404
- Guides + councils preserved; site-wide nav + sticky call bar
- Canonicals / sitemap / robots / llms / FormSubmit `_next` → **matchmyagent.com.au**
- `js/main.js` MatchMyAgent attribution only (no agent CC invented)
- **Chat stub:** floating “Ask MatchMyAgent · chat soon” → enquire; ElevenLabs widget TBD (no SDK, no API keys)

## Gaps / TBD
| Gap | Owner / note |
|-----|----------------|
| **Domain purchase** | Ops — `matchmyagent.com.au` (do not buy from this agent pass) |
| **GoDaddy hosting upload** | After domain owned — upload this folder |
| **FormSubmit agent CC** | TBD — do not invent `_cc` list |
| **FormSubmit `_next`** | Points at `https://matchmyagent.com.au/thank-you.html` |
| **Manus matcher** | Still linked as product reference (`firstpickage-*.manus.space`); don’t cancel until replaced |
| **ElevenLabs chat** | Stub only; wire when Damien approves |
| **GSC / GA4** | After domain live |

## How to preview locally
```bash
cd /workspace/matchmyagent-godaddy
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```
Root-absolute paths require serving from this folder root. Do not open as `file://`.

## Hard rules
- MatchMyAgent branding only — zero Premier logos / agent phones / Premier CTAs on UI
- No Stripe / property payment flows
- Do not modify `/workspace/first-pick-edu/` or `/workspace/first-pick-site/`
- Do not buy domains or spend from this agent pass

## Sanity
`rg -i 'FirstPick|First Pick|firstpickagent|Premier|Rodney|Vlado|premierestateagents' … --glob '*.html' --glob '*.css' --glob '*.js'`  
Expect CLEAN on public pages (ignore “Port Stephens”; Manus matcher hostname OK).

## Ready for Grok re-QA
- Brand lock applied across HTML/CSS/JS/sitemap/robots/llms.
- Soft-canonical `https://matchmyagent.com.au`.
- Text lockup + M favicon in place; FirstPick Manus mark retired from UI.
- **Ready for Grok re-QA** of staging at `/workspace/matchmyagent-godaddy/`.
