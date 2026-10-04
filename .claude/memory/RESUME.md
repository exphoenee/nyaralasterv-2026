# ▶️ FOLYTATÁS — hogyan vedd fel a fonalat bármikor

> Ez a session-emlékeztető. Olvasd el ezt ELŐSZÖR egy új session elején.

## 1 mondatban
Családi nyaralástervező statikus weboldal (6 úticél), magyar nyelven, élőben deployolva GitHub Pages-re. Minden funkció kész és működik.

## Hol a kód (tartós forrás = a repo)
- **Repo (ez a mappa):** `E:\Projects\2026-summer-hoiday` → `index.html` + `styles.css` + `app.js`
- **GitHub:** https://github.com/exphoenee/nyaralasterv-2026 (publikus, account `exphoenee`)
- **Élő oldal:** https://exphoenee.github.io/nyaralasterv-2026/
- **Szabályok:** `.claude/rules/project-rules.md` és `.claude/rules/new-currency.md`
- **Kontextus:** `.claude/memory/context.md`
- **Committolt doksi:** `CLAUDE.md` (repo gyökér)

## Hogyan dolgozz tovább
1. Olvasd el: `CLAUDE.md` + `.claude/rules/*`.
2. **Szerkesztés:** közvetlenül a `index.html` / `styles.css` / `app.js` fájlokban (ezek a tartós forrás).
   - A claude.ai **artifact** egyfájlos (CSP miatt inline). Ha artifactot is akarsz frissíteni, állítsd elő az egyfájlos verziót: a `styles.css`-t `<style>`-ba, az `app.js`-t `<script>`-be inline-olva az `index.html` body végére. (A session scratchpadben lévő egyfájlos verzió session-függő, új sessionben már nincs meg — a repóból kell újraépíteni.)
3. **Deploy:** commit + push `main`-re → a GitHub Actions automatikusan deployol.
   ```bash
   cd E:/Projects/2026-summer-hoiday
   git add -A && git -c user.name="exphoenee" -c user.email="bozzay.viktor@gmail.com" commit -m "..." && git push
   gh run list --repo exphoenee/nyaralasterv-2026 --limit 1   # ellenőrzés
   ```

## Állapot (2026-10-04)
KÉSZ: 6 terv, kattintható helyszínek, Légitársaságok-fejezet, 8–11 szállás/terv, linkelt „Előre foglalni", többdevizás költségek élő árfolyammal (napi localStorage cache), dark/light téma, kattintható áttekintés, webkamera-linkek, művészeti alternatív napok (London/Bécs/München), 🏖️ favicon, 3 fájlra refaktorálva.

## Lehetséges következő lépések (ha a user kéri)
- További úticélok (új pénznem esetén lásd `new-currency.md`).
- Pénznem-választó kapcsoló a táblázatok fölé.
- Napi program dátumokhoz kötése; PDF export; foglalási naptár.
