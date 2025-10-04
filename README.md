# Redesign Project — AI-Powered Subtitle Optimization
**Author:** Gyeongbin Ryoo

## Executive Summary
This project rethinks Medium’s subtitle workflow on mobile. <br/>
The core problem: **subtitles render inconsistently across the editor/preview and the published feed**, so writers can’t trust what they see while composing. The redesign delivers a **pixel-accurate live preview** and an **AI Suggest-and-Explain system** that generates and ranks better subtitle options—**Tighten, Concise, Detail**—so authors can resolve truncation and clarity issues *before* publishing. <br/>

## Demo Video
📹 **[HCI_Redesign_Demo.mov](HCI_Redesign_Demo.mov)** — opens the screen-recorded demo implementing the design.  
If GitHub doesn’t preview `.mov`, click **Download** to view locally.

## What I Did (End-to-End Contribution)
**Problem discovery & evidence**
- Documented a repeatable **usability flaw** with screenshots (Preview shows full subtitle; Published view truncates to “…Data S…”).
- Mapped issues to **Nielsen heuristics** (Visibility of System Status, Consistency & Standards, Error Prevention, Recognition over Recall).

**Research & framing**
- Drew **visualization critiques** (Few, Spielman) as analogies to show how inconsistent representations force users to compare “apples and oranges,” increasing cognitive load.
- Synthesized **cognitive & rhetorical** literature (e.g., Franconeri et al., 2021) to justify surfacing true constraints inline and reducing working-memory demands.

**Interaction design**
- Designed a **side-by-side, real-time live preview** that reflects the *actual* published constraints.
- Added a **subtitle pixel budget meter** (fit/overflow states, color-coded warnings).
- Created **explainable suggestion chips** with tooltips and **Apply / Dismiss** affordances.

**System design & implementation**
- Implemented a **mobile-first text-fit simulation** (targeting 240 px width × 2 lines) using Pillow to measure pixel width.
- Built **three candidate strategies**:
  - `gen_tighten_variants` — remove parentheticals/punctuation/tail words  
  - `gen_replace_concise_variants` — hard caps + stop-word drop  
  - `gen_add_detail_variants` — append context tags extracted via TF-IDF n-grams
- Engineered **multi-factor scoring** in `score_candidate`:
  - `0.5 * layout_fit + 0.3 * keyword_coverage + 0.2 * semantic_similarity`
- Added **strength badges** (`is_strong`) gated by fit margin ≥ 20 px, coverage ≥ 0.66, similarity ≥ 0.50.
- Shipped a **working web prototype** (`index.html`, `styles.css`, `app.js`) with tabs, hover tooltips, and keyboard/touch support.

**Validation**
- Ran a **prototype test** with a real subtitle; logged generated variants, margins, and fit states; verified the UI communicates the same constraints as the algorithm.

---

## Why This Matters
- **Fixes trust in WYSIWYG:** What you see while editing matches what ships in feed.
- **Prevents errors early:** Inline warnings and a pixel budget surface “will truncate” before publish.
- **Reduces cognitive load:** No more mode-switching or memorizing invisible rules; suggestions are explainable and one-click.

---

## Core Technical Notes
- **Fit model:** `fit_delta_px` measures wrapped text width and returns overflow (>0) or spare margin (<0); `fit_norm = min(1, margin/24)` when it fits.
- **Coverage & similarity:** `keyword_coverage` vs. `top_keywords(current_text)`; `tfidf_similarity` via scikit-learn.
- **Ranking:** `rank_candidates` sorts by **score → margin_px → shorter text**.
- **Badges & decision:** `decide_action_badges` builds `{strategy: top_is_strong}` and selects a global best by **strength → score → margin**.

---

## What’s in This Repo
- **/ (web demo)**  
  - `index.html` — Editor/Preview UI with four screens; buttons (`data-goto`) navigate tabs.  
  - `styles.css` — Theme tokens, layout, hover tooltips, badge styles, responsive grid.  
  - `app.js` — Tab routing, hover/touch behavior, accessible focus handling.  
- **HCI_Redesign_Demo.mov** — Screen-recorded walkthrough of the implemented design.
- **Python algorithm (source linked)** — End-to-end generation/scoring/badging implementation.  
  View Source: https://gist.github.com/growingpenguin/a914ebae4e8e649e1aa8a248367a110e

---
### Gyeongbin_Ryoo_Redesign_Project_Final.pdf

**What this is:** The final write-up for an individual HCI redesign project. It diagnoses a real usability flaw, motivates why it matters with evidence, and presents a minimal, working redesign.

**Scope & goals (per brief):**
- Identify a concrete usability problem and why it’s frustrating or broken.
- Implement a focused, working redesign (not just aesthetics), tied to user needs and evidence.
- Keep scope tight; you may recreate a simplified version of the original system.

**What’s inside:**
- **Problem statement & examples:** screenshots/figures of the original interface and the specific flaw.  
- **Evidence-based rationale:** usability principles and literature; community reports/threads; cognitive load considerations.  
- **Redesign proposal & mockups:** interaction changes and why they address the flaw.  
- **Working prototype link:** preferred public link to an interactive demo; fallback video if needed.

**How it connects to this repo:**  
This PDF summarizes the Medium-subtitle redesign delivered here—live, pixel-accurate preview + AI “Suggest & Explain” (Tighten, Concise, Detail)—and points to the runnable prototype and demo assets

## Try It
- Open this folder in VS Code and run **Live Server** on `index.html`  
  (Right-click → *Open with Live Server*) to explore the interactions.

**Figma demo:** https://www.figma.com/design/00fEInYY0d3geOVDO5EZn2/Medium?node-id=0-1&t=6dS9KJIX3XaZiv9c-1  
**GitHub repo (this project):** https://github.com/growingpenguin/hci_redesign_project.git








