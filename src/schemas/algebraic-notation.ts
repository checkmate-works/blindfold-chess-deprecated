import { z } from "zod";

const file = "[a-h]";
const rank = "[1-8]";
const piece = "[KQRBN]";
const promotion = "(=[QRBN])?";
const check = "[+#]?";
const castling = "O-O(-O)?";

// Pawn move: e4, e8=Q, e8=Q+, e8=Q#
const pawnMove = `${file}${rank}${promotion}${check}`;
// Pawn capture: exd5, exd8=Q, exd8=Q+, exd8=Q#
const pawnCapture = `${file}x${file}${rank}${promotion}${check}`;
// Piece move: Nf3, Nbd2, Rhe8, Nf3+, Nf3#
const pieceMove = `${piece}${file}?${rank}?${file}${rank}${check}`;
// Piece capture: Nxe5, Nfxe5, N1xe5, Nxe5+, Nxe5#
const pieceCapture = `${piece}${file}?${rank}?x${file}${rank}${check}`;

const algebraicNotationRegex = `^(${castling}|${pawnMove}|${pawnCapture}|${pieceMove}|${pieceCapture})$`;

export const AlgebraicNotationSchema = z
  .string()
  .regex(new RegExp(algebraicNotationRegex), "Invalid algebraic notation");
