# Projekt-szabályok — Nyaralásterv 2026

Minden módosításnál tartsd be. (Részletes projektleírás: `CLAUDE.md` a repo gyökerében.)

## Tartalom & nyelv
- Nyelv: **magyar**. Végig **gluténmentes** szempont.
- Kiindulás: Pécs · 2 felnőtt + 1 (15 éves) · nyár 2026 · keret 1,2 M Ft ≈ 3400 €.
- Konkrét, forrásolt ajánlások; árat/nyitvatartást/URL-t **nem találunk ki** — webkereséssel ellenőrizzük.

## Linkelés
- **Minden helyszín** a napi programban kattintható `<a class="anchor">` (hivatalos oldal, vagy Google Maps ha nincs). `target="_blank" rel="noopener"`.
- **„Előre foglalni"** listák elemei a megfelelő **foglalási URL-re** linkelnek.
- Repülős terveknél: repjegy-metakeresők + külön **„✈️ Légitársaságok"** fejezet (🛫 direkt / 🔁 átszállásos, hivatalos foglalási linkekkel).
- **📷 Webkamera / élő út-időjárás** link az időjárásfüggő helyszíneknél.

## Szállás
- Tervenként **8–11 link**, **2 hálószobás „entire place" apartman (saját fürdő, nem közös)**. Szűrt Booking/Airbnb/Vrbo + márkák/aggregátorok.

## Pénznem & árfolyam
- Költségek a táblázatokban: **EUR + helyi pénznem (£/ISK/CAD; euróövezetnél euró) + HUF**. Áttekintésben is HUF.
- **Élő árfolyam** (`app.js`, open.er-api.com), **napi localStorage cache** (`nyaralasterv.fx`); aznapra nincs újrafetch; offline/CSP fallback (HUF≈355).
- Megjelenés **három helyen a fetchelt adatból**: fejléc-badge, táblázat-cellák, táblázat alatti jegyzetek.
- Új pénznem esetén lásd: `new-currency.md`.

## UI/UX
- **Dark/light téma**: böngésző default + localStorage (`nyaralasterv.theme`); váltó a **címsorban**; FOUC-ellen korai inline script.
- **Fülek**: áttekintő táblázat sorai kattinthatók → tabváltás; aktív fül localStorage-ban (`nyaralasterv.activeTab`).
- **Művészeti alternatív napok** külön „🎨 Alternatív napok" fejezetben (festészet/szobrászat), ahol releváns.
- **Favicon:** 🏖️.

## Kódszervezés & deploy
- A repo **három fájl**: `index.html` + `styles.css` + `app.js`. A claude.ai artifacthoz egyfájlos (inline) verzió a forrás; abból generáljuk a split fájlokat.
- Deploy: push `main` → GitHub Actions → GitHub Pages. Repo publikus (Pages korlát).
