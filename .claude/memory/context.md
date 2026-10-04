# Projekt kontextus — Nyaralásterv 2026

## Áttekintés
Családi nyaralástervező statikus weboldal. Pécs kiindulás, 2 felnőtt + 1 (15 éves), gluténmentes, nyár 2026. 6 úticél: London, Bécs, Osztrák Alpok+Bécs, München+Bajor-Alpok, Izland (kereten felül), Kanada (kereten felül).

## Hol van minden
- **Repo:** https://github.com/exphoenee/nyaralasterv-2026 (publikus; GitHub account `exphoenee`)
- **Élő oldal:** https://exphoenee.github.io/nyaralasterv-2026/
- **Repo fájlok:** `index.html`, `styles.css`, `app.js`, `.nojekyll`, `.github/workflows/deploy.yml`, `README.md`, `CLAUDE.md`
- **Artifact (egyfájlos forrás):** a session scratchpad `nyaralasterv-2026.html` — ez a claude.ai artifact és a split build forrása.
- **Szabályok:** `.claude/rules/project-rules.md`, `.claude/rules/new-currency.md`
- **Deploy:** push `main` → GitHub Actions (`deploy.yml`) → GitHub Pages. Git identity inline: `exphoenee` / bozzay.viktor@gmail.com.

## Főbb megvalósított funkciók
- Fülek + kattintható áttekintő táblázat; aktív fül és téma localStorage-ban.
- Dark/light téma (böngésző default + localStorage), váltó a címsorban.
- Minden napi helyszín kattintható link; „Előre foglalni" listák linkeltek.
- Repülős terveknél Légitársaságok-fejezet + repjegy-metakeresők; 8–11 szállás/terv (2 háló, saját fürdő).
- Művészeti alternatív napok (London/Bécs/München).
- Többdevizás költségek (EUR + helyi + HUF); **élő árfolyam** open.er-api.com-ról, napi cache `nyaralasterv.fx`, fallback HUF≈355. Megjelenés: fejléc-badge, cellák, jegyzetek — mind a fetchelt adatból.
- Webkamera/élő út-időjárás linkek; 🏖️ favicon.

## Fontos tudnivalók
- A claude.ai artifact CSP-je blokkolja a külső fetchet → ott fallback árfolyam; a GitHub Pages oldalon él a fetch.
- Forint-fallback a user keretéhez igazítva (1,2 M Ft ≈ 3400 €, ~355 Ft/€).
- Szlovénia kiesett (ott már jártak).
