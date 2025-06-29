import type { Tip } from "@/features/tips/types";
import { kingMovementEn, kingMovementJa } from "./king-movement";
import { knightMovementEn, knightMovementJa } from "./knight-movement";
import { rookMovementEn, rookMovementJa } from "./rook-movement";
import { squareColorsEn, squareColorsJa } from "./square-colors";

// Content is stored inline for now - can be moved to separate files with a build process later
const bishopMovementEn = `# The Bishop's Movement

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

## Key Characteristics

- **Color-bound**: A bishop always stays on squares of the same color
- **Maximum range**: Can move up to 13 squares in one move (a1 → h8 or a8 → h1)
- **Cannot jump**: Must have a clear path to its destination
- **Diagonal control**: Can control two diagonals simultaneously from central squares

## Blindfold Chess Tips

1. **Visualize diagonals**: Practice seeing diagonals as lines of same-colored squares
2. **Count squares**: In blindfold chess, count the number of squares to verify legal moves
3. **Remember color**: Always track which color squares your bishops occupy
4. **Central bishops**: Bishops on e4/d4/e5/d5 control the maximum number of squares (13)`;

const bishopMovementJa = `# ビショップの動き

## 斜め移動の理解

ビショップはチェスで最も強力な駒の一つで、盤上の長い斜線をコントロールすることができます。目隠しチェスでは、その動きのパターンを理解することが非常に重要です。

## 数学的ルール

ビショップが **あるマス (file₁, rank₁)** から **別のマス (file₂, rank₂)** に移動できるのは、以下の条件を満たす場合のみです：

$$|file_1 - file_2| = |rank_1 - rank_2|$$

つまり、**ファイル（列）の変化量とランク（行）の変化量が等しい場合**に、ビショップの合法的な移動となります。

## 実践的な例

### 例1：a6 → f1

この移動が合法かどうか確認してみましょう：

1. **開始位置**：a6 = (1, 6)
2. **目標位置**：f1 = (6, 1)
3. **計算**：
   - ファイルの差：|1 - 6| = 5
   - ランクの差：|6 - 1| = 5
   - **結果**：✓ 合法な移動（差が等しい）

### 例2：c3 → g7

1. **開始位置**：c3 = (3, 3)
2. **目標位置**：g7 = (7, 7)
3. **計算**：
   - ファイルの差：|3 - 7| = 4
   - ランクの差：|3 - 7| = 4
   - **結果**：✓ 合法な移動

## 主な特徴

- **色の制約**：ビショップは常に同じ色のマスに留まります
- **最大射程**：一度に最大13マス移動可能（a1 → h8 または a8 → h1）
- **飛び越え不可**：目的地までの経路が空いている必要があります
- **斜線のコントロール**：中央のマスから2つの斜線を同時にコントロール可能

## 目隠しチェスのコツ

1. **斜線を視覚化**：斜線を同じ色のマスの連なりとして見る練習をしましょう
2. **マスを数える**：目隠しチェスでは、マスの数を数えて合法な動きを確認します
3. **色を記憶**：ビショップがどの色のマスにいるか常に把握しましょう
4. **中央のビショップ**：e4/d4/e5/d5のビショップは最大数のマス（13マス）をコントロールします`;

const algebraicNotationEn = `# Algebraic Notation Basics

## Introduction

Algebraic notation is the standard method for recording chess moves. For blindfold chess, mastering this notation system is absolutely essential as it's your primary way to communicate moves without seeing the board.

## The Chessboard Grid

The chessboard is an 8×8 grid with a unique coordinate system:

- **Files (columns)**: Labeled **a** through **h** from left to right
- **Ranks (rows)**: Numbered **1** through **8** from White's side to Black's side

Each square has a unique identifier combining its file and rank (e.g., e4, d7, a1).

## Piece Abbreviations

| Piece | Symbol | Example |
|-------|---------|---------|
| King | **K** | Ke2 |
| Queen | **Q** | Qd8 |
| Rook | **R** | Ra1 |
| Bishop | **B** | Bf4 |
| Knight | **N** | Nf3 |
| Pawn | *(no symbol)* | e4 |

> **Note**: Knight uses 'N' to avoid confusion with King

## Basic Move Notation

### Simple Moves
- **e4**: Pawn moves to e4
- **Nf3**: Knight moves to f3
- **Be5**: Bishop moves to e5

### Captures
- **Bxe5**: Bishop captures on e5
- **exd5**: Pawn on e-file captures on d5
- **Qxf7+**: Queen captures on f7 with check

### Special Notations
- **O-O**: Kingside castling (short castling)
- **O-O-O**: Queenside castling (long castling)
- **e8=Q**: Pawn promotes to Queen
- **+**: Check
- **#**: Checkmate`;

const algebraicNotationJa = `# 代数記法の基礎

## はじめに

代数記法は、チェスの手を記録する標準的な方法です。目隠しチェスでは、盤面を見ずに手を伝える主要な方法となるため、この記法システムを習得することが絶対に不可欠です。

## チェスボードの座標

チェスボードは8×8のグリッドで、独自の座標システムを持っています：

- **ファイル（列）**：左から右へ **a** から **h** までのアルファベット
- **ランク（行）**：白側から黒側へ **1** から **8** までの数字

各マスは、ファイルとランクを組み合わせた固有の識別子を持ちます（例：e4、d7、a1）。

## 駒の略記

| 駒 | 記号 | 例 |
|-------|---------|---------|
| キング | **K** | Ke2 |
| クイーン | **Q** | Qd8 |
| ルーク | **R** | Ra1 |
| ビショップ | **B** | Bf4 |
| ナイト | **N** | Nf3 |
| ポーン | *（記号なし）* | e4 |

> **注意**：ナイトはキングとの混同を避けるため「N」を使用します

## 基本的な手の記法

### 単純な移動
- **e4**：ポーンがe4に移動
- **Nf3**：ナイトがf3に移動
- **Be5**：ビショップがe5に移動

### 駒を取る手
- **Bxe5**：ビショップがe5で駒を取る
- **exd5**：eファイルのポーンがd5で駒を取る
- **Qxf7+**：クイーンがf7で駒を取り、チェック

### 特殊な記法
- **O-O**：キングサイドキャスリング（ショートキャスリング）
- **O-O-O**：クイーンサイドキャスリング（ロングキャスリング）
- **e8=Q**：ポーンがクイーンに昇格
- **+**：チェック
- **#**：チェックメイト`;

export const tipsData: Tip[] = [
  {
    frontmatter: {
      title: "The Bishop's Movement",
      titleJa: "ビショップの動き",
      slug: "bishop-movement",
      category: "piece-movement",
      difficulty: "beginner",
      tags: ["bishop", "diagonal", "movement", "basics"],
      tagsJa: ["ビショップ", "斜め移動", "動き", "基礎"],
      publishedAt: "2024-01-15",
      updatedAt: "2024-01-20",
      excerpt:
        "Learn how bishops move diagonally across the board and master the mathematical rule behind their movement",
      excerptJa:
        "ビショップの斜め移動の仕組みと、その動きの背後にある数学的ルールを習得しましょう",
    },
    content: {
      en: bishopMovementEn,
      ja: bishopMovementJa,
    },
  },
  {
    frontmatter: {
      title: "Algebraic Notation Basics",
      titleJa: "代数記法の基礎",
      slug: "algebraic-notation-basics",
      category: "notation",
      difficulty: "beginner",
      tags: ["notation", "basics", "recording", "communication"],
      tagsJa: ["記法", "基礎", "記録", "コミュニケーション"],
      publishedAt: "2024-01-10",
      excerpt:
        "Master the standard method for recording chess moves - essential for blindfold chess",
      excerptJa:
        "チェスの手を記録する標準的な方法を習得 - 目隠しチェスに不可欠",
    },
    content: {
      en: algebraicNotationEn,
      ja: algebraicNotationJa,
    },
  },
  {
    frontmatter: {
      title: "The Knight's Movement",
      titleJa: "ナイトの動き",
      slug: "knight-movement",
      category: "piece-movement",
      difficulty: "beginner",
      tags: ["knight", "L-shape", "movement", "jumping"],
      tagsJa: ["ナイト", "L字型", "動き", "飛び越え"],
      publishedAt: "2024-01-25",
      excerpt:
        "Master the unique L-shaped movement of the knight and its jumping ability",
      excerptJa: "ナイトの独特なL字型の動きと飛び越え能力を習得しましょう",
    },
    content: {
      en: knightMovementEn,
      ja: knightMovementJa,
    },
  },
  {
    frontmatter: {
      title: "The King's Movement",
      titleJa: "キングの動き",
      slug: "king-movement",
      category: "piece-movement",
      difficulty: "beginner",
      tags: ["king", "safety", "movement", "castling"],
      tagsJa: ["キング", "安全", "動き", "キャスリング"],
      publishedAt: "2024-01-26",
      excerpt:
        "Understand the king's limited but crucial movement capabilities",
      excerptJa: "キングの限定的だが重要な移動能力を理解しましょう",
    },
    content: {
      en: kingMovementEn,
      ja: kingMovementJa,
    },
  },
  {
    frontmatter: {
      title: "The Rook's Movement",
      titleJa: "ルークの動き",
      slug: "rook-movement",
      category: "piece-movement",
      difficulty: "beginner",
      tags: ["rook", "files", "ranks", "movement"],
      tagsJa: ["ルーク", "ファイル", "ランク", "動き"],
      publishedAt: "2024-01-27",
      excerpt:
        "Learn how rooks dominate files and ranks with their straight-line movement",
      excerptJa:
        "ルークの直線的な動きでファイルとランクを支配する方法を学びましょう",
    },
    content: {
      en: rookMovementEn,
      ja: rookMovementJa,
    },
  },
  {
    frontmatter: {
      title: "Determining Square Colors",
      titleJa: "マスの色の判定",
      slug: "square-colors",
      category: "general",
      difficulty: "beginner",
      tags: ["squares", "colors", "calculation", "visualization"],
      tagsJa: ["マス", "色", "計算", "視覚化"],
      publishedAt: "2024-01-28",
      excerpt:
        "Learn a simple mathematical trick to instantly determine any square's color",
      excerptJa:
        "任意のマスの色を即座に判定する簡単な数学的トリックを学びましょう",
    },
    content: {
      en: squareColorsEn,
      ja: squareColorsJa,
    },
  },
];
