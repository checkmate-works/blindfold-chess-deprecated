export const knightMovementEn = `# The Knight's Movement

## Understanding the L-Shape

The knight is unique among chess pieces with its distinctive L-shaped movement pattern. Unlike other pieces, the knight can "jump" over other pieces, making it particularly valuable in crowded positions.

## Mathematical Rule

A knight can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

$$(|file_1 - file_2|, |rank_1 - rank_2|) \\in \\{(1,2), (2,1)\\}$$

In other words, the knight must move either:
- **2 squares vertically + 1 square horizontally**, or
- **2 squares horizontally + 1 square vertically**

## Practical Examples

### Example 1: b1 → c3

Let's verify if this is a legal move:

1. **Starting position**: b1 = (2, 1)
2. **Target position**: c3 = (3, 3)
3. **Calculation**:
   - File difference: |2 - 3| = 1
   - Rank difference: |1 - 3| = 2
   - **Result**: ✓ (1,2) is a valid knight move

### Example 2: e4 → g5

1. **Starting position**: e4 = (5, 4)
2. **Target position**: g5 = (7, 5)
3. **Calculation**:
   - File difference: |5 - 7| = 2
   - Rank difference: |4 - 5| = 1
   - **Result**: ✓ (2,1) is a valid knight move

### Example 3: d2 → f4 (Invalid)

1. **Starting position**: d2 = (4, 2)
2. **Target position**: f4 = (6, 4)
3. **Calculation**:
   - File difference: |4 - 6| = 2
   - Rank difference: |2 - 4| = 2
   - **Result**: ✗ (2,2) is not a valid knight move

## Key Characteristics

- **Jumping ability**: The only piece that can jump over others
- **Color alternation**: Always lands on a square of opposite color
- **Fixed distance**: Always moves exactly 3 squares (counting the L-shape)
- **Maximum targets**: Can attack up to 8 squares from the center

## Knight Movement Pattern

From any position, a knight can potentially move to 8 different squares:
- 2 up, 1 left
- 2 up, 1 right
- 2 down, 1 left
- 2 down, 1 right
- 1 up, 2 left
- 1 up, 2 right
- 1 down, 2 left
- 1 down, 2 right

## Blindfold Chess Tips

1. **Visualize the L**: Think of the knight's move as an "L" shape
2. **Color switching**: Remember that knights always change square colors
3. **Count to three**: The total path is always 3 squares long
4. **Edge limitations**: Knights are weaker near edges (fewer possible moves)
5. **Fork patterns**: Practice recognizing common knight fork positions`;

export const knightMovementJa = `# ナイトの動き

## L字型の理解

ナイトは、独特のL字型の動きパターンを持つ、チェスの駒の中でも特別な存在です。他の駒とは異なり、ナイトは他の駒を「飛び越える」ことができるため、混雑した局面では特に価値があります。

## 数学的ルール

ナイトが **あるマス (file₁, rank₁)** から **別のマス (file₂, rank₂)** に移動できるのは、以下の条件を満たす場合のみです：

$$(|file_1 - file_2|, |rank_1 - rank_2|) \\in \\{(1,2), (2,1)\\}$$

つまり、ナイトは以下のいずれかの動きをしなければなりません：
- **縦に2マス＋横に1マス**、または
- **横に2マス＋縦に1マス**

## 実践的な例

### 例1：b1 → c3

この移動が合法かどうか確認してみましょう：

1. **開始位置**：b1 = (2, 1)
2. **目標位置**：c3 = (3, 3)
3. **計算**：
   - ファイルの差：|2 - 3| = 1
   - ランクの差：|1 - 3| = 2
   - **結果**：✓ (1,2) はナイトの動きなので移動可能

### 例2：e4 → g5

1. **開始位置**：e4 = (5, 4)
2. **目標位置**：g5 = (7, 5)
3. **計算**：
   - ファイルの差：|5 - 7| = 2
   - ランクの差：|4 - 5| = 1
   - **結果**：✓ (2,1) はナイトの動きなので移動可能

### 例3：d2 → f4（無効）

1. **開始位置**：d2 = (4, 2)
2. **目標位置**：f4 = (6, 4)
3. **計算**：
   - ファイルの差：|4 - 6| = 2
   - ランクの差：|2 - 4| = 2
   - **結果**：✗ (2,2) はナイトの動きではないので移動不可

## 主な特徴

- **飛び越え能力**：他の駒を飛び越えることができる唯一の駒
- **色の交互性**：常に反対色のマスに着地
- **固定距離**：常に正確に3マス移動（L字をカウント）
- **最大目標数**：中央からは最大8マスを攻撃可能

## ナイトの移動パターン

どの位置からでも、ナイトは潜在的に8つの異なるマスに移動できます：
- 上に2、左に1
- 上に2、右に1
- 下に2、左に1
- 下に2、右に1
- 上に1、左に2
- 上に1、右に2
- 下に1、左に2
- 下に1、右に2

## 目隠しチェスのコツ

1. **Lを視覚化**：ナイトの動きを「L」字として考える
2. **色の切り替え**：ナイトは常にマスの色を変えることを覚える
3. **3まで数える**：経路の合計は常に3マス
4. **端の制限**：ナイトは端の近くでは弱い（可能な動きが少ない）
5. **フォークパターン**：一般的なナイトフォークの位置を認識する練習`;
