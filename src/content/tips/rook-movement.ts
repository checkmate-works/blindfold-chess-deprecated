export const rookMovementEn = `# The Rook's Movement

## Straight Line Power

The rook is one of the major pieces in chess, valued at approximately 5 pawns. Its straight-line movement makes it particularly powerful on open files and ranks.

## Mathematical Rule

A rook can move from square **(file₁, rank₁)** to square **(file₂, rank₂)** if and only if:

$$file_1 = file_2 \\quad \\text{or} \\quad rank_1 = rank_2$$

In other words:
- **Same file value → Vertical movement**
- **Same rank value → Horizontal movement**

This makes the rook's movement pattern the simplest to understand mathematically.

## Practical Examples

### Example 1: a1 → a8 (Vertical)

1. **Starting position**: a1 = (1, 1)
2. **Target position**: a8 = (1, 8)
3. **Verification**:
   - Files: 1 = 1 ✓
   - Movement: Vertical along the a-file
   - **Result**: ✓ Legal move

### Example 2: d4 → h4 (Horizontal)

1. **Starting position**: d4 = (4, 4)
2. **Target position**: h4 = (8, 4)
3. **Verification**:
   - Ranks: 4 = 4 ✓
   - Movement: Horizontal along the 4th rank
   - **Result**: ✓ Legal move

### Example 3: c2 → e4 (Invalid)

1. **Starting position**: c2 = (3, 2)
2. **Target position**: e4 = (5, 4)
3. **Verification**:
   - Files: 3 ≠ 5
   - Ranks: 2 ≠ 4
   - **Result**: ✗ Illegal move (diagonal movement)

## Key Characteristics

- **Long range**: Can move any number of squares along files or ranks
- **Linear movement**: Only horizontal and vertical, never diagonal
- **Cannot jump**: Path must be clear of other pieces
- **Maximum control**: From the center, controls 14 squares
- **Special move**: Can castle with the king

## Rook Positioning

### Open Files
Rooks are most powerful on open files (files with no pawns). This allows maximum vertical mobility.

### 7th Rank
A rook on the 7th rank (2nd rank for Black) is particularly strong, often trapping the enemy king and attacking pawns.

### Back Rank
Rooks often guard the back rank to prevent back-rank checkmates.

## Blindfold Chess Tips

1. **Think in crosses**: Visualize the rook's control as a cross (+) pattern
2. **Count squares**: In blindfold, count available squares in each direction
3. **File awareness**: Remember which files are open or half-open
4. **Coordination**: Two rooks on the same file/rank can be devastating
5. **Endgame power**: Rooks become more valuable as the board opens up

## Common Patterns

### Rook Lift
Moving a rook via its 3rd or 4th rank to bring it into active play.

### Doubling Rooks
Placing two rooks on the same file or rank for maximum pressure.

### Rook and Pawn Endgames
One of the most common and important endgame types to master.`;

export const rookMovementJa = `# ルークの動き

## 直線の力

ルークはチェスの主要な駒の一つで、約5ポーンの価値があります。その直線的な動きにより、オープンファイルやランクで特に強力になります。

## 数学的ルール

ルークが **あるマス (file₁, rank₁)** から **別のマス (file₂, rank₂)** に移動できるのは、以下の条件のどちらかを満たす場合のみです：

$$file_1 = file_2 \\quad \\text{または} \\quad rank_1 = rank_2$$

つまり：
- **ファイル（列）の値が同じ → 縦移動**
- **ランク（行）の値が同じ → 横移動**

これにより、ルークの動きのパターンは数学的に最も理解しやすいものとなっています。

## 実践的な例

### 例1：a1 → a8（垂直）

1. **開始位置**：a1 = (1, 1)
2. **目標位置**：a8 = (1, 8)
3. **検証**：
   - ファイル：1 = 1 ✓
   - 移動：aファイルに沿った垂直移動
   - **結果**：✓ 合法な移動

### 例2：d4 → h4（水平）

1. **開始位置**：d4 = (4, 4)
2. **目標位置**：h4 = (8, 4)
3. **検証**：
   - ランク：4 = 4 ✓
   - 移動：4段目に沿った水平移動
   - **結果**：✓ 合法な移動

### 例3：c2 → e4（無効）

1. **開始位置**：c2 = (3, 2)
2. **目標位置**：e4 = (5, 4)
3. **検証**：
   - ファイル：3 ≠ 5
   - ランク：2 ≠ 4
   - **結果**：✗ 不正な移動（斜め移動）

## 主な特徴

- **長射程**：ファイルやランクに沿って任意の数のマスを移動可能
- **直線移動**：水平と垂直のみ、斜めは不可
- **飛び越え不可**：経路に他の駒があってはならない
- **最大支配**：中央から14マスを支配
- **特殊な動き**：キングとキャスリング可能

## ルークの配置

### オープンファイル
ルークはオープンファイル（ポーンのないファイル）で最も強力です。これにより最大限の垂直移動が可能になります。

### 7段目
7段目のルーク（黒の場合は2段目）は特に強力で、しばしば敵キングを閉じ込め、ポーンを攻撃します。

### バックランク
ルークはバックランクメイトを防ぐため、しばしばバックランクを守ります。

## 目隠しチェスのコツ

1. **十字で考える**：ルークの支配を十字（+）パターンとして視覚化
2. **マスを数える**：目隠しでは、各方向の利用可能なマスを数える
3. **ファイルの認識**：どのファイルがオープンまたはハーフオープンか記憶
4. **連携**：同じファイル/ランク上の2つのルークは破壊的
5. **エンドゲームの力**：盤面が開けるにつれてルークの価値が上がる

## 一般的なパターン

### ルークリフト
ルークを3段目または4段目経由で移動させ、積極的なプレイに持ち込む。

### ルークの重ね
最大の圧力をかけるため、2つのルークを同じファイルまたはランクに配置。

### ルークとポーンのエンドゲーム
習得すべき最も一般的で重要なエンドゲームタイプの一つ。`;
