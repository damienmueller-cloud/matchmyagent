# MatchMyAgent GoDaddy staging — notes

Updated: 2026-09-19 ~18:20 AEST (Australia/Brisbane)  
Folder: `/workspace/matchmyagent-godaddy/`  
**Locked brand name: MatchMyAgent**  
**Soft-canonical / intended domain: `https://matchmyagent.com.au`**

## Logo hold (Damien 2026-09-19)
- **Logo A is NOT locked.** Damien reviewing 5 options with business partner (`brand/logo-concepts/` A–E).
- Header = **text lockup** “MatchMyAgent” + tagline “Hunter pilot · Australia-ready”.
- Do **not** apply A-house-match (or any concept) as final header/favicon/OG until Damien confirms.
- Concepts stay under `brand/logo-concepts/` for review only.

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

## Brand kit (interim — text lockup)
| Item | Status |
|------|--------|
| Wordmark | Header text lockup **“MatchMyAgent”** (Sora) + “Hunter pilot · Australia-ready” |
| Mark / favicon | Interim simple mark — **not** logo A until locked |
| Colour tokens | Interim navy `#071b2b`, teal `#1fb8a5` / `#70e1d2`, cream `#f4f2eb`, coral `#ff6b4a` |
| Fonts | Sora (headings) + Manrope (body) via Google Fonts |
| Concepts | `brand/logo-concepts/` A–E for partner review |

## Done (site scaffold)
- MVP: home, how-it-works, enquire (FormSubmit), about, privacy, thank-you, 404
- Guides + councils preserved; site-wide nav + sticky call bar
- Canonicals / sitemap / robots / llms / FormSubmit `_next` → **matchmyagent.com.au**
- **ElevenLabs chat (live):** agent `agent_7301m2wa5jx7f218s1knqk6ykewg`

## Gaps / TBD
| Gap | Owner / note |
|-----|----------------|
| **Final logo** | Damien + partner — pick among A–E; do not ship until locked |
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
- Do not lock logo A (or any concept) into header/favicon until Damien says so

## Sanity
`rg -i 'FirstPick|First Pick|firstpickagent|Premier|Rodney|Vlado|premierestateagents' … --glob '*.html' --glob '*.css' --glob '*.js'`  
Expect CLEAN on public pages (ignore “Port Stephens”; Manus matcher hostname OK).

## Ready for Grok re-QA
- Interactive less-text draft on home + enquire prefill.
- Logo A hold respected (text lockup).
- Soft-canonical `https://matchmyagent.com.au`.
