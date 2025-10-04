# hci_redesign_project
These are files for the hci mid assignment

## Demo Video
📹 **[HCI_Redesign_Demo.mov](HCI_Redesign_Demo.mov)** — opens the screen-recorded demo implementing the design.  
If GitHub doesn’t preview `.mov`, click **Download** to view locally.

## Project Structure
### index.html
- **Purpose:** Markup for the Editor ↔ Preview prototype with four screens (tabs): Default, Hover (Add Detail), Hover (Replace Concise), Hover (Tighten).
- **Key UI hooks:**
  - **Tabs:** `<button class="tab" data-screen="sX">…</button>` map to `<section id="sX" class="screen">`.
  - **Action buttons:** `<button class="btn" data-goto="sX">…</button>` jump to the corresponding screen (handled in `app.js`).
  - **Hoverboxes (true tooltips):** `.action > .hoverbox` positioned above each button with an arrow; shown on hover/focus (desktop) and tap (mobile) via CSS/JS.
  - **Accessibility:** Uses `role="tablist"`, `role="tab"`, `aria-selected`, and `role="tooltip"` for hoverboxes; buttons reference tooltips via `aria-describedby`.
- **What to edit:**
  - Change the demo text in `.title`, swap the `<img src="…">` URLs, or add more actions by duplicating an `.action` block.
  - Add a new screen by copying a `<section id="sX" class="screen">` and a matching tab button with the same `data-screen`.

### styles.css
- **Purpose:** Theme tokens + layout + component styles.
- **Highlights:**
  - **Design tokens:** colors, radius, shadow under `:root`.
  - **Layout:** two-column grid (`.columns`) with responsive fallback to single column at ≤900px.
  - **Card & preview:** `.card`, `.truncate` for title overflow, `.badge` for “Strongly Recommended”.
  - **Hoverbox:** `.action:hover .hoverbox, .action:focus-within .hoverbox, .action.is-open .hoverbox` controls reveal; subtle slide/fade via `opacity` + `transform`.
  - **Ghost overlay:** `.ghost` appears only on hover for the “hover” screens.
- **What to edit:** tweak spacing, colors, or animation timings (see `.hoverbox` transitions, `.ghost` opacity).

### app.js
- **Purpose:** Wire up tab navigation and hoverbox behavior (including touch support).
- **Core functions:**
  - `gotoScreen(id)`: activates the `#id` screen and its matching tab; scrolls to top for clarity.
  - **Event delegation:** Any element with `data-goto="sX"` triggers `gotoScreen('sX')` (for action buttons and chips).
  - **Touch fallback:** On devices with no hover, tapping a button toggles the parent `.action.is-open`; tapping outside closes all open hoverboxes.
- **What to edit:** Add custom routing or analytics inside `gotoScreen`, or change touch behavior thresholds.

---

## Run Locally
Use VS Code **Live Server** (or any static server):
1. Open this folder in VS Code → install *Live Server* → open `index.html` → **Open with Live Server**.
2. Save files to auto-reload.


