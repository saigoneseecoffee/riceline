# Riceline — Online Menu & Order Page

**How the site works:** customers land on a **fast one-page menu** (`index.html`): 12 bowl cards, meal deals, add-ons & drinks, and an allergen chart you can open. Every dish name and **Order →** link opens that dish on the ordering page (`order.html`), ready for "Add to bag". The **Order online** buttons (top bar, under the title, and the floating button on phones) open the ordering page. On the ordering page, **Full menu ↗** goes back.

This folder is a static website for GitHub Pages. It needs no server, database or build step.
Everything runs in the visitor's browser.

> **Unzip first.** On Windows, right-click the zip and choose **Extract All**. On a Mac, double-click it. Then open `index.html` from the unzipped folder. If you open `index.html` while you're still inside the zip, the ordering page can't load its pictures and scripts.

## 1. Put it on GitHub Pages (about 5 minutes)

1. Go to github.com and click **New repository**. A name such as `riceline` works. Set it to **Public** and click **Create**.
2. On the new repo page, click **uploading an existing file**.
3. Drag **everything inside this folder** (not the folder itself) into the upload box. That includes the hidden `.nojekyll` file.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.
6. After 1–2 minutes the site is live at `https://<your-username>.github.io/riceline/`. The text menu is the homepage, and ordering is at `/riceline/order.html`.

To use your own domain (for example riceline.com), go to Settings → Pages → *Custom domain* and follow GitHub's steps.

## 2. Things you MUST change before going live

All of these are in **`config.js`**. Open it on GitHub, click the pencil (Edit), change the values, then click Commit.

| Setting | Now | What to do |
|---|---|---|
| `address`, `mapsQuery` | "Huntington Ave, Boston 02115" (placeholder) | Your real street address |
| `phone` | (617) xxx-xxxx (placeholder, not callable) | Your real phone |
| `email` | orders@example.com | Your real email |
| `hours` | Mon–Fri 10:30–21:00, Sat 11–21, Sun 11–20 | Your real hours (24-hour format) |
| `orderMode` | `"demo"` (orders are **not** sent anywhere) | See below |

### How orders get to you (`orderMode`)
- **`"demo"`**: the customer sees a confirmation screen, but nothing is sent. Use this only for testing.
- **`"link"`**: copies the order text and opens your online-ordering page. Put your Toast, Square or Clover link in `orderLink`. *Recommended. It takes real payment.*
- **`"sms"`**: opens the customer's text app with the order addressed to `smsNumber`.
- **`"email"`**: opens the customer's email app with the order addressed to `email`.

## 3. Change prices, names, descriptions

Open **`data/menu.js`** and search for the item name. Change `"price": 11.5` to the new price. For build-your-own, the price set by each protein is `"bowlPrice"`. Keep the quotes and commas as they are.

Things that were proposed (not from your menu photo) and should be checked:
- Add-ons: avocado $2.00, egg $1.50, extra rice $1.50, sauce cup $0.75, consommé $1.50, double chicken $3.50, double beef $5.95, **double tofu $2.50 (new)**
- Drinks: iced tea $2.75, can soda $2.50, water $1.75, Vietnamese iced coffee $4.95
- **Sesame Garlic Tofu Bowl $9.00**: a new plant-based bowl. It is built from the tofu that is already in the Google Sheet. It is not in the 10 signature rows there yet.

## 4. Food pictures

Every food picture is an **illustration drawn for Riceline** (SVG files in `assets/illus/`). Each bowl drawing is built from that bowl's real recipe: base, protein, veggie, toppings, sauce and finish. There are no stock photos, so no credits are needed.

**`index.html`** (the homepage) is the fast menu. Its prices are written into the page. If you change a price in `data/menu.js`, also change it in `index.html`, or ask Claude to rebuild it.

## 5. Switching to your own photos later

1. Take photos 4:3 (for example 1000×750 px) and save them as WebP in `assets/img/`, named `<name>-560.webp` (menu cards) and `<name>-1000.webp` (item detail). Use the same `<name>` as the files in `assets/illus/` (bulgogi, birria, tofu, coffee…).
2. In `config.js`, add the line `imageStyle: "photo",`.

## 6. Calories & allergens

- Calories, protein, carbs and fat are **calculated estimates**. They come from the recipes in the "Bowl Line Playbook" Google Sheet multiplied by USDA reference values, with cooking yields that are still estimates. Re-check them after your yield tests.
- Allergens come from each recipe's ingredients. **Check the actual labels you buy**, especially the tikka masala sauce (may contain tree nuts) and the jerk seasoning.
- The Massachusetts allergen notice and the federal calorie statement are in the footer and at checkout.

## 7. Testing tips

- Add `?now=2026-10-13T12:00` to the address to pretend it's Tuesday noon, or `?now=2026-10-13T23:30` to see the "closed" flow.
- Deep links: `order.html#item=bulgogi-bowl` opens a dish directly (good for Instagram), `#byo` opens Build Your Own, `#bag` opens the bag.
- The bag is saved in the visitor's browser, so it survives a refresh.

## Files

```
index.html            HOMEPAGE: fast menu in the print-menu style; every card opens that dish on order.html
order.html            ordering page
order-illustrated.html old link, now forwards to order.html
print-menu.html       one-page counter menu (Letter), poster style, with a QR code to order.html; open it and press Print
assets/fonts/         fonts for the print menu (SIL Open Font License)
assets/illus/         Riceline food illustrations (SVG), used on every page
config.js             store settings (address, hours, phone, ordering)
data/menu.js          all menu items, prices, nutrition, allergens
assets/css/styles.css look & feel (colors at the top)
assets/js/core.js     price / calorie / allergen math, store hours
assets/js/ui.js       menu, filters, item sheet, bag, checkout
assets/img/           og-image.jpg (link preview picture)
assets/icons/         logo / app icons
404.html, robots.txt, manifest.webmanifest, .nojekyll
```
