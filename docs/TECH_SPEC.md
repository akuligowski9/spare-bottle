# Spare Bottle — Technical Specification

## Purpose
Spare Bottle is a calm, reference-first mobile application for exploring drink recipes and ingredient combinations.
It is designed to promote awareness through information, not guidance or persuasion.

This product is intentionally constrained to minimize liability and avoid behavioral influence.

---

## Goals
- Provide an informational catalog of drink recipes
- Allow users to track available ingredients ("My Bar")
- Rank recipes by makeability based on available ingredients
- Display objective alcohol-content labels
- Offer reduced-alcohol ("responsible-serve") recipe variations
- Maintain a calm, non-promotional user experience

---

## Non-Goals
This application does NOT:
- Provide medical, health, or legal advice
- Determine safe alcohol consumption
- Estimate BAC or impairment
- Track drinking behavior or sessions
- Personalize recommendations based on user characteristics
- Encourage or optimize alcohol consumption

---

## Core Features (MVP)

### Ingredient Inventory ("My Bar")
- User-managed list of ingredients
- Stored locally on device
- Used only to filter and rank recipes
- No quantities, timestamps, or consumption tracking

### Recipe Catalog
- Backend-served catalog (content-only)
- Ingredients, instructions, tags, and variants
- Cached locally for offline use

### Recipe Matching & Ranking
Recipes are ranked based on ingredient availability:
- ✓ Can Make Now (all required ingredients available)
- ◐ Missing 1 Ingredient
- ○ Missing 2–3 Ingredients

Matching logic is deterministic and runs locally on the device.

### Alcohol Content Labels
- Display objective alcohol-content information per recipe
- Uses generic “standard drink” definitions
- Informational only; no recommendations or thresholds

### Responsible-Serve Variants
- Optional recipe variations with reduced alcohol content
- Treated as alternative builds, not guidance
- No language implying safety or suitability

---

## Explicit Omissions (By Design)
The following features are intentionally excluded:
- User body metrics (age, weight, height, gender)
- Consumption tracking or history
- Session timers or counters
- BAC estimation
- Driving or legal threshold calculations
- Notifications or prompts related to alcohol use

---

## Data Handling & Privacy
- No user accounts required for MVP
- No personal data collected
- No analytics tied to individuals
- Inventory data stored locally only
- Backend serves static content only

---

## Technology Stack
- Expo (React Native)
- Tamagui design system
- Local storage (AsyncStorage / SQLite)
- Optional content-only backend (versioned catalog)

---

## Risk & Liability Posture
Spare Bottle is designed as an informational reference tool.
All responsibility for alcohol-related decisions rests with the user.

This specification intentionally prioritizes creator safety and defensibility.

