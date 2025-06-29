export const kingMovementEn = `# The King's Movement

## The Most Important Piece

The king is the most important piece in chess - the entire game revolves around its safety. While it's not the most powerful piece in terms of movement, understanding its capabilities is crucial for both attack and defense.

## Mathematical Rule

The king can only move **one square in any direction** - horizontally, vertically, or diagonally.

Mathematically, the king can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

$$\\max(|file_1 - file_2|, |rank_1 - rank_2|) = 1$$

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
5. **Castling rights**: Remember if castling is still possible`;

export const kingMovementJa = `# キングの動き

## 最も重要な駒

キングはチェスで最も重要な駒です - ゲーム全体がその安全性を中心に展開されます。移動能力という点では最も強力な駒ではありませんが、その能力を理解することは攻撃と防御の両方にとって極めて重要です。

## 数学的ルール

キングは **縦・横・斜めに1マス** ずつしか動けません。

数学的には、キングが **あるマス (file₁, rank₁)** から **別のマス (file₂, rank₂)** に移動できるのは、以下の条件を満たす場合のみです：

$$\\max(|file_1 - file_2|, |rank_1 - rank_2|) = 1$$

つまり、**ファイル（列）の変化量とランク（行）の変化量の最大値が1以下** であれば合法な移動です。

## 式の理解

この式は、キングの8つの可能な動きすべてを表現しています：
- **水平移動**：(±1, 0)
- **垂直移動**：(0, ±1)
- **斜め移動**：(±1, ±1)

## 実践的な例

### 例1：e4 → e5（垂直）

1. **開始位置**：e4 = (5, 4)
2. **目標位置**：e5 = (5, 5)
3. **計算**：
   - ファイルの差：|5 - 5| = 0
   - ランクの差：|4 - 5| = 1
   - 最大値：max(0, 1) = 1
   - **結果**：✓ 合法な移動

### 例2：d3 → e4（斜め）

1. **開始位置**：d3 = (4, 3)
2. **目標位置**：e4 = (5, 4)
3. **計算**：
   - ファイルの差：|4 - 5| = 1
   - ランクの差：|3 - 4| = 1
   - 最大値：max(1, 1) = 1
   - **結果**：✓ 合法な移動

### 例3：c2 → e4（無効）

1. **開始位置**：c2 = (3, 2)
2. **目標位置**：e4 = (5, 4)
3. **計算**：
   - ファイルの差：|3 - 5| = 2
   - ランクの差：|2 - 4| = 2
   - 最大値：max(2, 2) = 2
   - **結果**：✗ 不正な移動（遠すぎる）

## 主な特徴

- **限定的な射程**：一度に1マスしか移動できない
- **全方向移動**：8方向すべてに移動可能
- **取られない**：キングが実際に取られる前にゲームが終了
- **特殊な動き**：特定の条件下でルークとキャスリング可能
- **チェックの制限**：チェックされるマスには移動できない

## キングの支配域

任意の位置から（端を除く）、キングは8マスを支配します：
- 上のランクの3マス
- 同じランクの2マス（左右）
- 下のランクの3マス

## 目隠しチェスのコツ

1. **円で考える**：キングの支配を中心にキングがいる3×3の正方形として視覚化
2. **端の認識**：端のキングは5マスのみ、角では3マスのみを支配
3. **オポジション**：エンドゲームでは、キング同士の関係を追跡
4. **安全第一**：キングの移動が自らチェックに入らないか常に確認
5. **キャスリングの権利**：キャスリングがまだ可能かどうかを記憶`;
