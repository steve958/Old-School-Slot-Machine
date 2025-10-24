# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Old-School Slot Machine game built with React and TypeScript. It's a single-player slot machine simulator with a three-box system where users click to stop each reel independently. The game includes a scoring system, a "super meter" bonus feature, and a higher/lower betting mini-game.

## Development Commands

### Development
```bash
npm start
```
Runs the app in development mode at http://localhost:3000 with hot reloading.

### Testing
```bash
npm test
```
Launches Jest test runner in interactive watch mode.

### Production Build
```bash
npm build
```
Creates an optimized production build in the `build/` folder.

## Architecture Overview

### Core Game Flow
The game is orchestrated entirely through `App.tsx` using React state management with no external state libraries. The flow follows this sequence:

1. **Credit System**: User adds credit by clicking the credit field
2. **Betting Phase**: User selects stake amount and clicks START
3. **Reel Selection**: Three independent game boxes (Left, Middle, Right) display scrolling icons
4. **Player Action**: User clicks each box individually to stop the reels and lock in icons
5. **Scoring**: After all three boxes are stopped, the game calculates scores based on matching patterns
6. **Super Meter**: Accumulated points fill a super meter; when >= 100, triggers bonus game
7. **Bonus Game**: Higher/Lower card game where users double winnings or lose everything

### Key State Management Pattern
App.tsx manages all game state through React hooks and passes state down to child components via props. Key states include:
- Credit tracking (`credit`, `stake`)
- Three independent box states (`leftBoxMoves`, `middleBoxMoves`, `rightBoxMoves`)
- Score states for each box (`leftBoxScore`, `middleBoxScore`, `rightBoxScore`)
- Super meter accumulation (`superMeter`)
- Game phase flags (`startButtonClicked`, `betScreenActive`, `nextGame`)

### Game Logic (`src/logic/GameLogic.js`)
This is the pure JavaScript module containing all game mechanics (note: `.js` not `.ts`):

- **`possibleResults()`**: Generates random array of 3 icons with weighted probabilities (e.g., BAR is rarest at 1/36, Cherry/Orange/Lemon most common at 5/36 each)
- **`calcScore(first, second, third)`**: Evaluates winning patterns across 5 paylines:
  - 3 horizontal lines (top, middle, bottom)
  - 2 diagonal lines (top-left to bottom-right, bottom-left to top-right)
  - Special case: All 9 positions matching returns jackpot (300 or 400)
- **`blinkOrNot*()` functions**: Control visual feedback showing potential winning combinations as reels are stopped
- **`calcSuperMeter(supermeter, stake)`**: Converts super meter points to credit payouts with tiered multipliers (2x to 200x stake)
- **`lowerHigherRandomizer(previousInt)`**: Ensures consecutive numbers differ in bonus game

### Component Structure

**Main Components:**
- `App.tsx`: Root component, orchestrates entire game state and flow
- `BetScreen.tsx`: Higher/Lower bonus game modal (triggered when super meter >= 100)
- `NextMoveIndicator.tsx`: Displays next set of icons to be placed when user clicks a box
- `LeftGameBox.tsx`, `MiddleGameBox.tsx`, `RightGameBox.tsx`: The three independent slot machine reels
- `Score.tsx`: Displays credit, stake, and super meter
- `PointsPerLine.tsx`: Shows payout table for different icon combinations
- `PointsPrizes.tsx`: Shows prize tiers based on current stake

### Icon System
10 icon types with different values and probabilities (stored in `GameLogic.js` as objects with `{value, iconID}`):
- BAR (iconID: 10, value: 300) - rarest
- Bell (iconID: 9, value: 120)
- Star (iconID: 8, value: 60)
- Seven (iconID: 7, value: 60)
- Watermelon (iconID: 6, value: 60)
- Strawberry (iconID: 5, value: 40)
- Plum (iconID: 4, value: 40)
- Lemon (iconID: 3, value: 20)
- Orange (iconID: 2, value: 20)
- Cherry (iconID: 1, value: 20)

Icons are mapped to CSS classes via `findTheRightIcon()` function.

### Super Meter Multiplier Logic
The super meter applies multipliers based on how many boxes contribute scores:
- All 3 boxes score: 2x multiplier
- Exactly 2 boxes score: 1.5x multiplier
- Only 1 box scores: 1x multiplier

This is calculated in `App.tsx:51-61` before the super meter threshold check.

## TypeScript Notes

- Main application uses TypeScript with strict mode enabled
- Game logic module (`GameLogic.js`) remains in plain JavaScript
- Type safety is enforced in `.tsx` files but many component props use `any` types (technical debt)
- When adding new features, prefer proper TypeScript interfaces over `any`

## Testing Strategy

The project uses React Testing Library and Jest (configured via `react-scripts`). When writing tests:
- Test user interactions through the full game flow rather than isolated components
- Mock the randomness in `GameLogic.possibleResults()` and `lowerHigherRandomizer()` for deterministic tests
- Focus on state transitions and credit calculations
