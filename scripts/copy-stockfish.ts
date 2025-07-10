import { copyFile } from "fs/promises";
import { join } from "path";

async function copyStockfishFiles() {
  const sourceDir = "node_modules/stockfish.js";
  const targetDir = "public";

  await copyFile(
    join(sourceDir, "stockfish.js"),
    join(targetDir, "stockfish.js"),
  );
  await copyFile(
    join(sourceDir, "stockfish.wasm"),
    join(targetDir, "stockfish.wasm"),
  );
}

copyStockfishFiles().catch(console.warn);
