# The Bishop's Movement

## Understanding Diagonal Movement

The bishop is one of the most powerful pieces in chess, capable of controlling long diagonals across the board. Understanding its movement pattern is crucial for blindfold chess.

## Mathematical Rule

A bishop can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

$$|file_1 - file_2| = |rank_1 - rank_2|$$

In other words, **the change in files must equal the change in ranks** for a legal bishop move.

## Practical Examples

### Example 1: a6 → f1

Let's verify if this is a legal move:

1. **Starting position**: a6 = (1, 6)
2. **Target position**: f1 = (6, 1)
3. **Calculation**:
   - File difference: |1 - 6| = 5
   - Rank difference: |6 - 1| = 5
   - **Result**: ✓ Legal move (differences are equal)

### Example 2: c3 → g7

1. **Starting position**: c3 = (3, 3)
2. **Target position**: g7 = (7, 7)
3. **Calculation**:
   - File difference: |3 - 7| = 4
   - Rank difference: |3 - 7| = 4
   - **Result**: ✓ Legal move

### Example 3: d4 → f6 (Invalid)

1. **Starting position**: d4 = (4, 4)
2. **Target position**: f6 = (6, 6)
3. **Calculation**:
   - File difference: |4 - 6| = 2
   - Rank difference: |4 - 6| = 2
   - **Result**: ✓ Legal move (but only if path is clear!)

## Key Characteristics

- **Color-bound**: A bishop always stays on squares of the same color
- **Maximum range**: Can move up to 13 squares in one move (a1 → h8 or a8 → h1)
- **Cannot jump**: Must have a clear path to its destination
- **Diagonal control**: Can control two diagonals simultaneously from central squares

## Blindfold Chess Tips

1. **Visualize diagonals**: Practice seeing diagonals as lines of same-colored squares
2. **Count squares**: In blindfold chess, count the number of squares to verify legal moves
3. **Remember color**: Always track which color squares your bishops occupy
4. **Central bishops**: Bishops on e4/d4/e5/d5 control the maximum number of squares (13)

## Common Patterns

### Long Diagonal Control
- **a1-h8 diagonal**: Light-squared bishop's highway
- **h1-a8 diagonal**: Dark-squared bishop's highway

### Fianchetto Positions
- **g2/b2**: Common development squares for bishops
- **g7/b7**: Mirror positions for Black

### Bishop Pair Advantage
Having both bishops often provides a strategic advantage, as they complement each other by controlling squares of both colors.