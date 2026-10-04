# Szabály: új pénznem kezelése

Ha egy **új úticél új pénznemet** hoz fókuszba (pl. USD, CHF, JPY, PLN), akkor az `app.js` árfolyam-moduljában **MINDENT** frissíteni kell, hogy az árfolyam élőben jöjjön és minden helyen megjelenjen:

1. **FALLBACK objektum** — vedd fel a beépített tartalék-árfolyamot (`1 EUR = X <pénznem>`), hogy offline/CSP esetén is működjön.
2. **fetch + `keep` objektum** — a `keep`-be vedd be az új pénznem kulcsát (az `open.er-api.com/v6/latest/EUR` visszaadja a legtöbbet).
3. **`apply()`** — a táblázat-oszlop felismerése a fejléc kulcsszava alapján (`t.indexOf('USD')>=0 → targets.push({i:i,cur:'USD'})`), és a `fmt(cur,v)` formázó ág.
4. **`ratesInFt()`** — vedd fel a `1 X = Y Ft` sort (ez a fejléc-badge-ben és onnan jön).
5. **`notes()`** — a `data-curs` feldolgozásba és a jegyzet-stringbe (`1 X = Y Ft`).

HTML oldalon:
- az adott terv költségtáblázata kapjon új `class="num"` oszlopot az új pénznemnek,
- a táblázat alatti `<p class="fx-note" data-curs="USD">` kapja meg az új kódot.

**Cél:** az árfolyam három helyen, mindig a fetchelt adatból jelenjen meg — (a) fejléc-badge (`#fxStatus`), (b) táblázat-cellák, (c) táblázat alatti jegyzetek. Napi cache a `localStorage`-ban (`nyaralasterv.fx`), aznapra nincs újrafetch.
