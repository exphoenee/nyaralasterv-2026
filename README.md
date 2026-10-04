# Nyaralásterv 2026 🧭

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

Minden tervnél: **napról-napra program**, **költségbontás**, **előre foglalandó teendők**, **gluténmentes tippek** és egy **„🔗 Hasznos linkek”** blokk a hivatalos oldalakkal.

## Projekt felépítése

```
.
├── index.html                      # A teljes statikus oldal (egyetlen fájl)
├── .nojekyll                       # Kikapcsolja a Jekyll feldolgozást Pages-en
├── .github/workflows/deploy.yml    # CI/CD — automatikus deploy GitHub Pages-re
└── README.md
```

## Deploy (CI/CD)

Statikus oldal, egyetlen `index.html`. A `.github/workflows/deploy.yml` workflow
minden `main`-re pusholáskor (vagy kézi indításra) kideployolja **GitHub Pages**-re.

Kézi indítás:

```bash
gh workflow run deploy.yml --repo exphoenee/nyaralasterv-2026
```

> **Megjegyzés a láthatóságról:** a GitHub Pages privát repóból csak GitHub Pro/Team/Enterprise
> csomaggal engedélyezhető, és a publikált oldal URL-je ekkor is nyilvánosan elérhető. Ez a repo
> ezért **publikus**. Ha teljesen privát hosting kell, alternatíva pl. Cloudflare Pages + Access.

## Helyi megtekintés

Nyisd meg az `index.html`-t böngészőben, vagy indíts egy egyszerű szervert:

```bash
python -m http.server 8000
# majd: http://localhost:8000
```

---

*Készült: 2026. október · Az árak élő keresésből származó becslések, foglaláskor változhatnak.*
