# MatchMyAgent GoDaddy staging — notes

Updated: 2026-09-19 ~18:57 AEST (Australia/Brisbane)
Folder: `/workspace/matchmyagent-godaddy/`  
**Locked brand name: MatchMyAgent**  
**Soft-canonical / intended domain: `https://matchmyagent.com.au`**


## Manus matcher links removed (2026-09-19)
- All `firstpickage-*.manus.space` public links → `/enquire.html` (or chat copy).
- `secure-chat.js` cache-bust `?v=20260919d2`; injectHint confirmed absent on live+repo.

## SSL hint banner removed (2026-09-19)
- Public “Text chat works… SSL finishes” banner stripped per Damien.
- HTTP still forces text-only silently via `js/secure-chat.js`; no user-facing SSL copy.

## Logo status (Damien 2026-09-19)
- **LOCKED: concept A** house-match + wordmark — `brand/logo-concepts/A-house-match.png` (+ `LOCKED-A-billpayer.jpg` same lock).
- **C3 superseded** — do not re-apply C3 as primary. C2 solid remains rejected.
- Header `brand/logos/logo.png`, favicon / apple-touch / mark-512 / OG use concept A. MatchMyAgent branding only — no Premier.
- Colours: navy `#182868` (+ mid `#2a3f88`, alt `#101860`), coral `#f85850` (accent; `--gold`/`--gold-light` aliased to coral family), cream `#f4f2eb`, ink `#1a1a19`.
- Widget (Max `agent_7301…` (retired from widget 2026-09-25)): logo avatar + shadow CSS + orb fallbacks force navy/coral (concept A); see note below.
- Concepts B–F + C2/C3 remain under `brand/logo-concepts/` for history only.

## Widget navy/coral force (concept A — 2026-09-19 ~18:57 AEST)
- **Issue:** ElevenLabs widget still showed teal orb + black/white UI despite API styles + prior `override-config` (override was replacing server fetch).
- **API:** Parent updating agent Max `agent_7301…` (retired from widget 2026-09-25) avatar to type **image** + coral accent styles.
- **HTML:** Every `<elevenlabs-convai>` now has `avatar-image-url="https://matchmyagent.com.au/brand/logos/avatar-mark.png"` + orb colour fallbacks; **`override-config` removed**.
- **JS:** `js/secure-chat.js` (`?v=20260919w3`) sets avatar-image-url + orb colours, removes override-config, injects brand CSS into each element's `shadowRoot` (`--el-base*` / `--el-accent*`) via MutationObserver + 500/2000ms retries. Silent HTTP text-only kept (no injectHint / SSL banner).
- **Asset:** `brand/logos/avatar-mark.png` shipped for Pages.

## Widget mobile fix (shipped this pass)
- **QA fail:** ElevenLabs convai widget overlaid stepper chips + enquire textarea at ~390px width.
- **Fix (CSS only):** `css/styles.css` — `--convai-clearance` + `body { padding-bottom }` with `env(safe-area-inset-bottom)`; extra clearance ≤430px. Widget kept (Max `agent_7301…` (retired from widget 2026-09-25)).
- Goal: stepper chips and enquire fields fully tappable on mobile.

## Apex / CNAME spot-check (2026-09-19 ~18:15 AEST)
- `http://matchmyagent.com.au/` → **200** (GitHub Pages; `CNAME` = `matchmyagent.com.au`).
- `http://www.matchmyagent.com.au/` → **301** → `http://matchmyagent.com.au/`.
- `https://damienmueller-cloud.github.io/matchmyagent/` → **301** → apex HTTP (Pages custom-domain redirect).
- Earlier intermittent **400** on apex not reproduced this check; likely DNS/CNAME race or bare-host probe without Pages ready. **Do not enforce HTTPS** from this pass (cert/HSTS out of scope).
- Soft-canonical remains `https://matchmyagent.com.au` in HTML; serving over HTTP OK for staging.

## Geography strategy (Damien messaging lock — applied)
- **PILOT** = Newcastle / Hunter NSW (live matching focus now)
- **SCALE** = whole of Australia — soft CTA: register interest / enquire even outside Hunter
- Hero: “Starting in Newcastle & the Hunter · Built to expand across Australia”
- Stepper chip: “More regions coming — tell us where you are” → enquire interest path
- Enquire: Hunter pilot options + “Other Australia — register interest” waitlist
- About / how-it-works / FAQ / llms / footers: pilot + Australia-wide interest (not Newcastle-only forever)
- Guides/councils: Newcastle-first OK; shared chrome says Hunter pilot · Australia-ready

## Interactive redesign (draft shipped)
- Short ADHD-friendly home: 1-line headline, one primary CTA + soft secondary, chat hint bottom-right
- 3-step tap stepper (area → timeline → goal) → enquire prefill via `sessionStorage` + query params
- Guides/councils as compact cards / expand-collapse (less essay prose on home)
- FormSubmit enquire kept → `damienmueller@gmail.com`
- ElevenLabs widget kept — agent Max `agent_7301…` (retired from widget 2026-09-25)
- Mobile-first + LCP-aware (WEB_STANDARDS.md)
- **Mobile widget clearance CSS shipped** (see above)

## Brand kit (locked concept A)
| Item | Status |
|------|--------|
| Wordmark / mark | **Concept A** navy/coral house-match + wordmark (header `logo-img`) |
| Favicon / OG | A-derived house mark + cream OG |
| Colour tokens | Navy `#182868` / mid `#2a3f88` / alt `#101860`, coral `#f85850` / light `#ff8a7a`, cream `#f4f2eb`, ink `#1a1a19` |
| Fonts | Sora (headings) + Manrope (body) via Google Fonts |
| Concepts | `brand/logo-concepts/` A locked; B–F + C2/C3 archive |

## Done (site scaffold)
- MVP: home, how-it-works, enquire (FormSubmit), about, privacy, thank-you, 404
- Guides + councils preserved; site-wide nav + sticky call bar
- Canonicals / sitemap / robots / llms / FormSubmit `_next` → **matchmyagent.com.au**
- **ElevenLabs chat (live):** agent Max `agent_7301…` (retired from widget 2026-09-25) + mobile clearance CSS

## Gaps / TBD
| Gap | Owner / note |
|-----|----------------|
| **Final logo** | **Concept A locked** — C3 superseded; do not re-apply C2 |
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
- Logo locked to **concept A**; C3 superseded; do not re-apply C2 solid

## Sanity
`rg -i 'FirstPick|First Pick|firstpickagent|Premier|Rodney|Vlado|premierestateagents' … --glob '*.html' --glob '*.css' --glob '*.js'`  
Expect CLEAN on public pages (ignore “Port Stephens”; Manus matcher hostname OK).

## Ready for Grok re-QA
- ElevenLabs mobile overlap CSS clearance shipped (`--convai-clearance` / body padding-bottom; chips + enquire tappable).
- Logo **concept A locked** (navy/coral house-match) — C3 superseded; not C2 solid.
- Soft-canonical `https://matchmyagent.com.au`; apex HTTP 200 observed (do not enforce HTTPS).

## Widget clearance re-fix (2026-09-19)
- Stronger mobile `--convai-panel-clearance` on `#match-steps` / stepper / enquire
- Embed: `variant="compact"` `dismissible="true"`
- ElevenLabs widget compact + expandable mobile

## National waitlist copy (2026-09-19)
- Hunter = live pilot; other AU regions encouraged to register interest via stepper/enquire.

## HTTP text-chat fallback (2026-09-19)
- `js/secure-chat.js`: on insecure context set `override-text-only`, catch getUserMedia errors, show HTTPS hint.
- Voice auto-returns when site is HTTPS.
