# The King's Movement

## The Most Important Piece

The king is the most important piece in chess - the entire game revolves around its safety. While it's not the most powerful piece in terms of movement, understanding its capabilities is crucial for both attack and defense.

## Mathematical Rule

The king can only move **one square in any direction** - horizontally, vertically, or diagonally.

Mathematically, the king can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

**max(|file_1 - file_2|, |rank_1 - rank_2|) = 1**

This means **the maximum of the file difference and rank difference must be exactly 1**.

## Understanding the Formula

The formula captures all eight possible king moves:

- **Horizontal**: (±1, 0)
- **Vertical**: (0, ±1)  
- **Diagonal**: (±1, ±1)

## Practical Examples

### Example 1: e4 → e5 (Vertical)

1. **Starting position**: e4 = (5, 4)
2. **Target position**: e5 = (5, 5)
3. **Calculation**:
   - File difference: |5 - 5| = 0
   - Rank difference: |4 - 5| = 1
   - Maximum: max(0, 1) = 1
   - **Result**: ✓ Legal move

### Example 2: d3 → e4 (Diagonal)

1. **Starting position**: d3 = (4, 3)
2. **Target position**: e4 = (5, 4)
3. **Calculation**:
   - File difference: |4 - 5| = 1
   - Rank difference: |3 - 4| = 1
   - Maximum: max(1, 1) = 1
   - **Result**: ✓ Legal move

### Example 3: c2 → e4 (Invalid)

1. **Starting position**: c2 = (3, 2)
2. **Target position**: e4 = (5, 4)
3. **Calculation**:
   - File difference: |3 - 5| = 2
   - Rank difference: |2 - 4| = 2
   - Maximum: max(2, 2) = 2
   - **Result**: ✗ Illegal move (too far)

## Key Characteristics

- **Limited range**: Can only move one square at a time
- **Omnidirectional**: Can move in all 8 directions
- **Cannot be captured**: The game ends before the king is actually captured
- **Special move**: Can castle with a rook under specific conditions
- **Check restrictions**: Cannot move into check

## The King's Domain

From any position (except edges), the king controls 8 squares:

- 3 squares in the rank above
- 2 squares in the same rank (left and right)
- 3 squares in the rank below

## Blindfold Chess Tips

1. **Think in circles**: Visualize the king's control as a 3×3 square with the king at center
2. **Edge awareness**: Kings on edges control only 5 squares, in corners only 3
3. **Opposition**: In endgames, track the relationship between kings
4. **Safety first**: Always verify a king move doesn't walk into check
5. **Castling rights**: Remember if castling is still possible