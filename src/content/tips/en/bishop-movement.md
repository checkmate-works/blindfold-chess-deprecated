# The Bishop's Movement

## Understanding Diagonal Movement

The bishop is one of the most powerful pieces in chess, capable of controlling long diagonals across the board. Understanding its movement pattern is crucial for blindfold chess.

## Mathematical Rule

A bishop can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

**|file_1 - file_2| = |rank_1 - rank_2|**

In other words, **the change in files must equal the change in ranks** for a legal bishop move.

## Practical Examples

### Example 1: a6 → f1

Let's verify if this is a legal move:

1. **Starting position**: a6 = (1, 6)
2. **Target position**: f1 = (6, 1)  
3. **Calculation**:
   - File difference: |1 - 6| = 5
   - Rank difference: |6 - 1| = 5
   - **Result**: ✓ Legal move (both differences equal 5)

### Example 2: c3 → e5

1. **Starting position**: c3 = (3, 3)
2. **Target position**: e5 = (5, 5)
3. **Calculation**:
   - File difference: |3 - 5| = 2
   - Rank difference: |3 - 5| = 2
   - **Result**: ✓ Legal move (both differences equal 2)

### Example 3: b2 → e4 (Invalid)

1. **Starting position**: b2 = (2, 2)
2. **Target position**: e4 = (5, 4)
3. **Calculation**:
   - File difference: |2 - 5| = 3
   - Rank difference: |2 - 4| = 2
   - **Result**: ✗ Illegal move (3 ≠ 2)

## Key Characteristics

- **Long range**: Can move any number of squares diagonally
- **Color bound**: Always stays on the same color squares
- **Cannot jump**: Path must be clear of other pieces
- **Maximum control**: From the center, controls up to 13 squares

## Blindfold Chess Tips

1. **Think in diagonals**: Visualize the bishop's control as diagonal lines
2. **Color awareness**: Remember which color squares your bishops control
3. **Long-range thinking**: Bishops excel in open positions
4. **Pair coordination**: The bishop pair can control both light and dark squares
5. **Calculate differences**: Use the mathematical rule to verify moves quickly