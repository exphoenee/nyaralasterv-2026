# Nyaralásterv 2026 🧭

Családi nyaralástervező oldal (5 úticél), Pécs kiindulással — 2 felnőtt + 1 (15 éves), gluténmentes, nyár 2026.

Úticélok: **London · Bécs · Osztrák Alpok + Bécs · München + Bajor-Alpok · Izland**.

## Deploy

Statikus, egyetlen `index.html`. A `main` branchre pusholva a `.github/workflows/deploy.yml`
GitHub Actions workflow automatikusan kideployolja **GitHub Pages**-re.

> **Megjegyzés:** privát repóból a GitHub Pages csak GitHub Pro/Team/Enterprise csomaggal
> engedélyezhető, és a publikált oldal URL-je ekkor is nyilvánosan elérhető.

### Helyi megtekintés

Nyisd meg az `index.html`-t böngészőben, vagy indíts egy egyszerű szervert:

```bash
python -m http.server 8000
```
