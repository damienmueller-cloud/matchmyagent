# MatchMyAgent GoDaddy staging — notes

Updated: 2026-09-19 ~18:20 AEST (Australia/Brisbane)  
Folder: `/workspace/matchmyagent-godaddy/`  
**Locked brand name: MatchMyAgent**  
**Soft-canonical / intended domain: `https://matchmyagent.com.au`**

## Logo status (Damien 2026-09-19)
- **LOCKED: C3** red outline house + wordmark — `brand/logo-concepts/C3-wordmark-red-house-outline.png` (applied in `9e79dfc`).
- **C2 solid house REJECTED** — do not re-apply.
- Header / favicon / apple-touch / OG use C3 (Mia). MatchMyAgent branding only — no Premier.
- Concepts A–E + C2 remain under `brand/logo-concepts/` for history only.

## Widget mobile fix (shipped this pass)
- **QA fail:** ElevenLabs convai widget overlaid stepper chips + enquire textarea at ~390px width.
- **Fix (CSS only):** `css/styles.css` — `--convai-clearance` + `body { padding-bottom }` with `env(safe-area-inset-bottom)`; extra clearance ≤430px. Widget kept (`agent_7301m2wa5jx7f218s1knqk6ykewg`).
- Goal: stepper chips and enquire fields fully tappable on mobile.

## Apex / CNAME spot-check (2026-09-19 ~18:15 AEST)
- `http://matchmyagent.com.au/` → **200** (GitHub Pages; `CNAME` = `matchmyagent.com.au`).
- `http://www.matchmyagent.com.au/` → **301** → `http://matchmyagent.com.au/`.
- `https://damienmueller-cloud.github.io/matchmyagent/` → **301** → apex HTTP (Pages custom-domain redirect).
- Earlier intermittent **400** on apex not reproduced this check; likely DNS/CNAME race or bare-host probe without Pages ready. **Do not enforce HTTPS** from this pass (cert/HSTS out of scope).
- Soft-canonical remains `https://matchmyagent.com.au` in HTML; serving over HTTP OK for staging.

## Geography strategy (Damien lock)
- **PILOT** = Newcastle / Hunter NSW
- **SCALE** = whole of Australia — architecture + copy must not paint into Newcastle-only forever
- Hero: “Starting in Newcastle & the Hunter” + “Built to expand across Australia”
- Steppers: reusable nationally (pilot options OK now + “More regions coming” / free-text suburb)
- Guides/councils: Newcastle-first OK; label pilot / more regions coming
- Avoid “we only serve Newcastle” absolute language

## Interactive redesign (draft shipped)
- Short ADHD-friendly home: 1-line headline, one primary CTA + soft secondary, chat hint bottom-right
- 3-step tap stepper (area → timeline → goal) → enquire prefill via `sessionStorage` + query params
- Guides/councils as compact cards / expand-collapse (less essay prose on home)
- FormSubmit enquire kept → `damienmueller@gmail.com`
- ElevenLabs widget kept — agent `agent_7301m2wa5jx7f218s1knqk6ykewg`
- Mobile-first + LCP-aware (WEB_STANDARDS.md)
- **Mobile widget clearance CSS shipped** (see above)

## Brand kit (locked C3)
| Item | Status |
|------|--------|
| Wordmark / mark | **C3** red outline house + wordmark (header `logo-img`) |
| Favicon / OG | C3-derived (Mia `9e79dfc`) |
| Colour tokens | Interim navy `#071b2b`, teal `#1fb8a5` / `#70e1d2`, cream `#f4f2eb`, coral `#ff6b4a` |
| Fonts | Sora (headings) + Manrope (body) via Google Fonts |
| Concepts | `brand/logo-concepts/` A–E + C2/C3 for partner review |

## Done (site scaffold)
- MVP: home, how-it-works, enquire (FormSubmit), about, privacy, thank-you, 404
- Guides + councils preserved; site-wide nav + sticky call bar
- Canonicals / sitemap / robots / llms / FormSubmit `_next` → **matchmyagent.com.au**
- **ElevenLabs chat (live):** agent `agent_7301m2wa5jx7f218s1knqk6ykewg` + mobile clearance CSS

## Gaps / TBD
| Gap | Owner / note |
|-----|----------------|
| **Final logo** | **C3 locked** (`9e79dfc`) — do not re-apply C2 |
| **Domain purchase** | Ops — `matchmyagent.com.au` |
| **GoDaddy hosting upload** | After domain owned |
| **FormSubmit agent CC** | TBD — do not invent `_cc` list |
| **Manus matcher** | Still linked as product reference; don’t cancel until replaced |
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
- Logo locked to **C3 outline**; do not re-apply C2 solid

## Sanity
`rg -i 'FirstPick|First Pick|firstpickagent|Premier|Rodney|Vlado|premierestateagents' … --glob '*.html' --glob '*.css' --glob '*.js'`  
Expect CLEAN on public pages (ignore “Port Stephens”; Manus matcher hostname OK).

## Ready for Grok re-QA
- ElevenLabs mobile overlap CSS clearance shipped (`--convai-clearance` / body padding-bottom; chips + enquire tappable).
- Logo **C3 locked** (outline house) — not C2 solid.
- Soft-canonical `https://matchmyagent.com.au`; apex HTTP 200 observed (do not enforce HTTPS).

## Widget clearance re-fix (2026-09-19)
- Stronger mobile `--convai-panel-clearance` on `#match-steps` / stepper / enquire
- Embed: `variant="compact"` `dismissible="true"`
- ElevenLabs widget compact + expandable mobile

## National waitlist copy (2026-09-19)
- Hunter = live pilot; other AU regions encouraged to register interest via stepper/enquire.
