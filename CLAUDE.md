# CLAUDE.md — Nyaralásterv 2026

Projektleírás és szabályok a Claude (és bármely fejlesztő) számára.

## Mi ez

Statikus, egyoldalas családi nyaralástervező weboldal. Kiindulás: **Pécs**, utazók: **2 felnőtt + 1 (15 éves)**, **gluténmentes**, **nyár 2026**. 6 úticél-terv fülekre bontva.

- **Élő oldal:** https://exphoenee.github.io/nyaralasterv-2026/
- **Repo:** https://github.com/exphoenee/nyaralasterv-2026 (publikus — a GitHub Pages privát repóból csak fizetős csomaggal menne)
- **Nyelv:** magyar.

## Fájlstruktúra (a refaktor után)

```
index.html    # váz: <head> (favicon, styles.css link, FOUC-téma inline script) + body + <script src="app.js">
styles.css    # minden stílus (token-alapú, dark/light témával)
app.js        # minden JS: fülek, localStorage, téma-váltó, élő árfolyam
.nojekyll
.github/workflows/deploy.yml   # push main -> GitHub Pages
README.md
CLAUDE.md
```

### Forrás és build
A tartalom szerkesztési forrása egy **egyfájlos** HTML (a session scratchpad mappájában: `nyaralasterv-2026.html`), amely egyben a **claude.ai artifact** is (annak szigorú CSP-je miatt minden inline kell). Ebből PowerShell-lel generáljuk a három külön fájlt a repóba (CSS/JS kiemelése, favicon + linkek beszúrása). Ha külön fájlokat szerkesztesz közvetlenül, tartsd szinkronban az artifact-forrással.

### Deploy
Minden `main`-re pusholáskor a GitHub Actions kideployol. Kézzel: `gh workflow run deploy.yml --repo exphoenee/nyaralasterv-2026`. Git identity inline: `exphoenee` / bozzay.viktor@gmail.com.

## Projekt-szabályok (KÖTELEZŐ betartani)

1. **Kattintható helyszínek.** A napi programban minden látnivaló `<a class="anchor">` link — hivatalos oldal, ahol van; különben Google Maps keresőlink. Új lapon nyílik (`target="_blank" rel="noopener"`). URL-t nem találunk ki — kereséssel ellenőrizzük.
2. **Repülős tervek.** Repjegy-metakereső linkek (Skyscanner/Google Flights/Kayak) + külön **„✈️ Légitársaságok"** fejezet: minden szóba jövő társaság (🛫 direkt / 🔁 átszállásos) hivatalos foglalási linkkel.
3. **Szállás.** Tervenként 8–11 link, **2 hálószobás „entire place" apartman (saját fürdő, nem közös)**. Szűrt Booking/Airbnb/Vrbo + konkrét márkák/aggregátorok.
4. **„Előre foglalni" listák.** Minden elem a megfelelő **foglalási URL-re** linkel.
5. **Pénznemek a táblázatokban.** Minden költség: **EUR + helyi pénznem (£/ISK/CAD, euróövezetnél az euró) + HUF**. Az áttekintő táblázatban is forint.
6. **Élő árfolyam.** `app.js` fetchel az `open.er-api.com/v6/latest/EUR`-ról (HUF, GBP, ISK, CAD), **naponta cache-el** localStorage-ba (`nyaralasterv.fx` = `{date, rates}`). Ha az adott napra már van adat → **nincs újrafetch**. Offline/CSP esetén beépített **FALLBACK** árfolyam (HUF≈355 — a user kerete 1,2 M Ft ≈ 3400 €).
7. **Árfolyam megjelenítés — három helyen, mind a fetchelt adatból:** (a) fejléc-badge (`#fxStatus`) minden pénznem Ft-ban, (b) a táblázat-cellák (`apply()` újraszámol), (c) a táblázatok alatti jegyzetek (`.fx-note`, `notes()`).
8. **Téma.** Dark/light, böngésző default (`prefers-color-scheme`), user választás localStorage-ban (`nyaralasterv.theme`). A váltó a **címsorban** van. FOUC-ellen korai inline script a `<head>`-ben.
9. **Fülek.** Áttekintő táblázat sorai kattinthatók → az adott tabra váltanak. Aktív fül localStorage-ban (`nyaralasterv.activeTab`).
10. **Webkamera/élő-állapot** link a releváns időjárásfüggő helyszíneknél (Zugspitze, Dachstein, Neuschwanstein, Niagara, izlandi út/időjárás).
11. **Művészeti alternatív napok** (külön „🎨 Alternatív napok" fejezetben) ahol releváns.
12. **Favicon:** 🏖️ (strand emoji, SVG data-URI).

## ⚠️ ÚJ PÉNZNEM szabály (ha új úticél új pénznemet hoz)

Ha egy új terv új pénznemet (pl. USD, CHF, JPY) tesz fókuszba, az `app.js`-ben **mindet** frissíteni kell:
- **FALLBACK**: vedd fel a pénznem beépített tartalék-árfolyamát (1 EUR = X egység).
- **fetch/keep**: a `keep` objektumba vedd be a pénznemet (`open.er-api.com` visszaadja).
- **apply()**: a táblázat-oszlop felismerése a fejléc-kulcsszó alapján (pl. `t.indexOf('USD')>=0 → targets.push({cur:'USD'})`), és a `fmt()`-be a formázása.
- **ratesInFt()**: vedd fel a `1 X = Y Ft` sort a fejléc-badge-hez.
- **notes()**: a `data-curs` kezelésbe és a jegyzet-stringbe.
- A HTML-ben: a táblázat kapjon megfelelő oszlopot (class="num"), a `.fx-note` kapjon `data-curs="USD"`.
