export const squareColorsEn = `# Determining Square Colors

## Quick Mental Calculation

In blindfold chess, knowing the color of any square instantly is a crucial skill. This simple mathematical trick will help you determine square colors without visualization.

## The Rule

You can easily determine a square's color by checking if the sum of its file and rank is even or odd:

- **(File number + Rank number) is EVEN** → **Dark square**
- **(File number + Rank number) is ODD** → **Light square**

## Step-by-Step Process

1. Convert the file letter to a number (a=1, b=2, c=3, ..., h=8)
2. Add it to the rank number
3. If the sum is even → **Dark square**
4. If the sum is odd → **Light square**

## Examples

### Example 1: b3

- File: b = 2
- Rank: 3
- Sum: 2 + 3 = **5 (odd) → Light square** ✓

### Example 2: c6

- File: c = 3
- Rank: 6  
- Sum: 3 + 6 = **9 (odd) → Light square** ✓

### Example 3: h8

- File: h = 8
- Rank: 8
- Sum: 8 + 8 = **16 (even) → Dark square** ✓

### Example 4: d4

- File: d = 4
- Rank: 4
- Sum: 4 + 4 = **8 (even) → Dark square** ✓

### Example 5: a1

- File: a = 1
- Rank: 1
- Sum: 1 + 1 = **2 (even) → Dark square** ✓

## Why This Works

The chessboard alternates colors in a predictable pattern. Since adjacent squares always have opposite colors, moving one square changes the sum's parity (even/odd), which changes the color.

## Practical Applications

### Bishop Movement
- Bishops always stay on the same color squares
- If you know a bishop is on a light square, all its possible destinations are also light squares

### Knight Movement  
- Knights always land on the opposite color from where they started
- This can help verify if a knight move is possible

### Pawn Promotion
- Knowing that the 8th rank alternates a1=dark, b1=light, etc. helps visualize promotion squares

## Quick Reference Table

| File | a | b | c | d | e | f | g | h |
|------|---|---|---|---|---|---|---|---|
| 8    | L | D | L | D | L | D | L | D |
| 7    | D | L | D | L | D | L | D | L |
| 6    | L | D | L | D | L | D | L | D |
| 5    | D | L | D | L | D | L | D | L |
| 4    | L | D | L | D | L | D | L | D |
| 3    | D | L | D | L | D | L | D | L |
| 2    | L | D | L | D | L | D | L | D |
| 1    | D | L | D | L | D | L | D | L |

*L = Light, D = Dark*

## Memory Tips

1. **Corner squares**: a1, a8, h1, h8 are all dark squares
2. **Center squares**: d4, d5, e4, e5 form a pattern of dark-light-light-dark
3. **Diagonals**: The long diagonal a1-h8 is all dark squares
4. **Starting position**: Kings start on opposite colors (e1=dark, e8=light)

With practice, this calculation becomes automatic, greatly enhancing your blindfold chess abilities!`;

export const squareColorsJa = `# マスの色の判定

## 素早い暗算方法

目隠しチェスでは、任意のマスの色を即座に知ることが重要なスキルです。この簡単な数学的トリックを使えば、視覚化なしでマスの色を判定できます。

## ルール

ファイル（列）とランク（行）の合計が偶数か奇数かで簡単に判別できます：

- **(ファイルの番号 + ランクの番号) が偶数** → **黒マス**
- **(ファイルの番号 + ランクの番号) が奇数** → **白マス**

## 手順

1. ファイル（列）の文字を数字に変換（a=1, b=2, c=3, ..., h=8）
2. ランク（行）の数字と足す
3. 合計が偶数なら **黒マス**
4. 合計が奇数なら **白マス**

## 例

### 例1：b3

- ファイル：b = 2
- ランク：3
- 合計：2 + 3 = **5（奇数）→ 白マス** ✓

### 例2：c6

- ファイル：c = 3
- ランク：6
- 合計：3 + 6 = **9（奇数）→ 白マス** ✓

### 例3：h8

- ファイル：h = 8
- ランク：8
- 合計：8 + 8 = **16（偶数）→ 黒マス** ✓

### 例4：d4

- ファイル：d = 4
- ランク：4
- 合計：4 + 4 = **8（偶数）→ 黒マス** ✓

### 例5：a1

- ファイル：a = 1
- ランク：1
- 合計：1 + 1 = **2（偶数）→ 黒マス** ✓

## なぜこれが機能するのか

チェスボードは予測可能なパターンで色が交互になっています。隣接するマスは常に反対の色なので、1マス移動すると合計の偶奇が変わり、色も変わります。

## 実践的な応用

### ビショップの移動
- ビショップは常に同じ色のマスに留まる
- ビショップが白マスにいるなら、その可能な目的地もすべて白マス

### ナイトの移動
- ナイトは常に開始位置と反対の色に着地する
- これによりナイトの移動が可能かどうかを確認できる

### ポーンの昇格
- 8段目がa1=黒、b1=白と交互になることを知っていれば、昇格マスを視覚化しやすい

## クイックリファレンス表

| ﾌｧｲﾙ | a | b | c | d | e | f | g | h |
|------|---|---|---|---|---|---|---|---|
| 8    | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 |
| 7    | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 |
| 6    | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 |
| 5    | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 |
| 4    | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 |
| 3    | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 |
| 2    | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 |
| 1    | 黒 | 白 | 黒 | 白 | 黒 | 白 | 黒 | 白 |

## 記憶のコツ

1. **角のマス**：a1、a8、h1、h8はすべて黒マス
2. **中央のマス**：d4、d5、e4、e5は黒-白-白-黒のパターン
3. **対角線**：長い対角線a1-h8はすべて黒マス
4. **開始位置**：キングは反対の色から開始（e1=黒、e8=白）

練習を重ねることで、この計算は自動的になり、目隠しチェスの能力が大幅に向上します！`;
