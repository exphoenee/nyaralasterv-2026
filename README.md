# Nyaralásterv 2026 🏖️

Családi nyaralástervező oldal, Pécs kiindulással — **2 felnőtt + 1 (15 éves)**, gluténmentes, nyár 2026.

## 🌐 Élő oldal

**➡️ https://exphoenee.github.io/nyaralasterv-2026/**

> A `main` branchre pusholva a GitHub Actions workflow automatikusan frissíti ezt az URL-t.

## Úticélok (6 részletes terv)

| # | Úticél | Mód | Hossz | Becsült költség (3 fő) | Keret (3 400 €) |
|---|--------|-----|-------|------------------------|-----------------|
| 1 | ✈️ **London** | repülő | 6 nap | ~2 450 € | ✅ belefér |
| 2 | 🏛️ **Bécs** | autó | 6 nap | ~1 800 € | ✅ bőven belefér |
| 3 | ⛰️ **Osztrák Alpok + Bécs** | autó | 9 nap | ~2 830 € | ✅ belefér |
| 4 | 🏰 **München + Bajor-Alpok** | autó | 7 nap | ~2 700 € | ✅ feszes |
| 5 | 🌋 **Izland** | repülő | 8 nap | ~6 000 € | ❌ kereten felül |
| 6 | 🍁 **Kanada** | repülő | 11 nap | ~9 000 € | ❌ bakancslistás |

## Funkciók

- **Napi program** kattintható helyszínekkel (hivatalos oldal / térkép) + esős-napos backup.
- **🎨 Alternatív művészeti napok** (London, Bécs, München) — festészet & szobrászat múzeumok.
- **✈️ Légitársaságok** fejezet a repülős terveknél (direkt + átszállásos, foglalási linkekkel) + repjegy-metakeresők.
- **🛏️ 8–11 szállás / terv** — 2 hálószobás, saját fürdős apartmanok (Booking/Airbnb/Vrbo + márkák).
- **🔗 Linkelt „Előre foglalni"** teendők (jegyfoglalási URL-ekkel).
- **💱 Többdevizás költségek** (EUR + helyi pénznem + HUF) **élő árfolyammal** — napi cache a `localStorage`-ban (open.er-api.com), offline fallbackkal.
- **🌙/☀️ Dark/light téma** (böngésző default + localStorage), váltó a címsorban.
- **📷 Élő webkamera / út- és időjárás** linkek az időjárásfüggő helyszíneknél.
- Kattintható áttekintő táblázat, localStorage-ban mentett aktív fül.

## Fájlstruktúra

```
index.html   # váz + head (favicon, styles.css, FOUC-téma script) + body + app.js
styles.css   # stílusok (token-alapú, dark/light)
app.js       # fülek, localStorage, téma, élő árfolyam
.nojekyll
.github/workflows/deploy.yml
```

Részletes projektleírás és fejlesztői szabályok: lásd [`CLAUDE.md`](CLAUDE.md).

## Deploy (CI/CD)

A `.github/workflows/deploy.yml` minden `main`-re pusholáskor (vagy kézi indításra) kideployol **GitHub Pages**-re.

```bash
gh workflow run deploy.yml --repo exphoenee/nyaralasterv-2026
```

> **Láthatóság:** a GitHub Pages privát repóból csak GitHub Pro/Team/Enterprise csomaggal megy, ezért a repo publikus.

## Helyi megtekintés

```bash
python -m http.server 8000   # majd: http://localhost:8000
```

---

*Készült: 2026. október · Az árak élő keresésből származó becslések, foglaláskor változhatnak. Az árfolyamokat az oldal élőben frissíti.*
