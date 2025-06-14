export const generateMoveSuggestions = (input: string): string[] => {
  if (!input || input.length < 1) return [];

  // キャスリングの入力の場合
  if (input === "O") {
    return ["O-O", "O-O-O"];
  }
  if (input === "O-") {
    return ["O-O", "O-O-O"];
  }
  if (input === "O-O") {
    return ["O-O"];
  }
  if (input === "O-O-") {
    return ["O-O-O"];
  }

  // 駒の種類の入力の場合
  const pieceTypes = ["N", "B", "R", "Q", "K"];
  const firstChar = input[0];

  // 駒の種類のみの入力の場合は何も表示しない
  if (input.length === 1 && pieceTypes.includes(firstChar.toUpperCase())) {
    return [];
  }

  // キングのキャプチャの入力の場合
  if (firstChar === "K" && input.length >= 2) {
    if (input.length === 2 && input[1] === "x") {
      // Kx の場合は何も表示しない
      return [];
    }

    if (input.length === 3 && input[1] === "x") {
      const captureFile = input[2].toLowerCase();
      if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
        return [];

      // 指定されたファイルのすべてのランクを表示
      const moves = Array.from(
        { length: 8 },
        (_, i) => `Kx${captureFile}${i + 1}`,
      );
      return moves;
    }
  }

  // 駒の種類 + ファイルの入力の場合
  if (input.length === 2 && pieceTypes.includes(firstChar.toUpperCase())) {
    const file = input[1].toLowerCase();
    if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(file)) return [];

    // そのファイルの1から8までのランクを返す
    return Array.from({ length: 8 }, (_, i) => `${firstChar}${file}${i + 1}`);
  }

  // キャプチャの入力の場合（例：Bxb2）
  if (input.length >= 2 && pieceTypes.includes(firstChar.toUpperCase())) {
    // Bx の場合は、全てのファイルの1から8までのランクを返す
    if (input.length === 2 && input[1] === "x") {
      return Array.from({ length: 8 }, (_, i) =>
        Array.from(
          { length: 8 },
          (_, j) => `${firstChar}x${String.fromCharCode(97 + i)}${j + 1}`,
        ),
      ).flat();
    }

    // Bxa の場合は、そのファイルの1から8までのランクを返す
    if (input.length === 3 && input[1] === "x") {
      const captureFile = input[2].toLowerCase();
      if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
        return [];
      return Array.from(
        { length: 8 },
        (_, i) => `${firstChar}x${captureFile}${i + 1}`,
      );
    }
  }

  // ポーンの移動とキャプチャの入力の場合
  const fromFile = input[0].toLowerCase();
  if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(fromFile)) return [];

  // 入力が1文字の場合は、そのファイルの全ての移動先を返す
  if (input.length === 1) {
    return Array.from({ length: 8 }, (_, i) => `${fromFile}${i + 1}`);
  }

  // ポーンのキャプチャの入力の場合（例：gxh6）
  if (input.length === 2 && input[1] === "x") {
    const moves: string[] = [];
    const fileIndex = fromFile.charCodeAt(0) - 97;

    // 斜め方向のファイルのみを対象とする（左右1マス）
    const captureFiles = [
      String.fromCharCode(97 + fileIndex - 1), // 左斜め
      String.fromCharCode(97 + fileIndex + 1), // 右斜め
    ].filter((file) => file >= "a" && file <= "h");

    // 各斜め方向のファイルに対して、1から8までのランクを生成
    for (const file of captureFiles) {
      for (let rank = 1; rank <= 8; rank++) {
        moves.push(`${fromFile}x${file}${rank}`);
      }
    }
    return moves;
  }

  if (input.length === 3 && input[1] === "x") {
    const captureFile = input[2].toLowerCase();
    if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
      return [];

    // 斜め方向のファイルかどうかをチェック
    const fileIndex = fromFile.charCodeAt(0) - 97;
    const captureFileIndex = captureFile.charCodeAt(0) - 97;
    if (Math.abs(fileIndex - captureFileIndex) !== 1) return [];

    return Array.from(
      { length: 8 },
      (_, i) => `${fromFile}x${captureFile}${i + 1}`,
    );
  }

  const fromRank = parseInt(input[1]);
  if (isNaN(fromRank) || fromRank < 1 || fromRank > 8) return [];

  // 入力が2文字の場合は、そのマスからの全ての可能な移動先を返す
  if (input.length === 2) {
    const moves: string[] = [];
    // 同じファイルの移動
    for (let rank = 1; rank <= 8; rank++) {
      if (rank !== fromRank) {
        moves.push(`${fromFile}${rank}`);
      }
    }
    // 同じランクの移動
    for (let file = 0; file < 8; file++) {
      const fileChar = String.fromCharCode(97 + file);
      if (fileChar !== fromFile) {
        moves.push(`${fileChar}${fromRank}`);
      }
    }
    // 斜めの移動
    for (let i = 1; i <= 7; i++) {
      const files = [
        String.fromCharCode(fromFile.charCodeAt(0) + i),
        String.fromCharCode(fromFile.charCodeAt(0) - i),
      ];
      const ranks = [fromRank + i, fromRank - i];

      for (const file of files) {
        if (file >= "a" && file <= "h") {
          for (const rank of ranks) {
            if (rank >= 1 && rank <= 8) {
              moves.push(`${file}${rank}`);
            }
          }
        }
      }
    }
    return moves;
  }

  return [];
};
