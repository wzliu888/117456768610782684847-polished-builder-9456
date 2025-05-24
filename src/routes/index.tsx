import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: ChessGame,
})

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'
type Square = {
  piece?: { type: PieceType; color: PieceColor }
}

const pieceUnicode: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
}

const initialBoard = (): Square[][] => {
  const board: Square[][] = Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({})))
  
  // Place black pieces
  board[0] = [
    { piece: { type: 'rook', color: 'black' } },
    { piece: { type: 'knight', color: 'black' } },
    { piece: { type: 'bishop', color: 'black' } },
    { piece: { type: 'queen', color: 'black' } },
    { piece: { type: 'king', color: 'black' } },
    { piece: { type: 'bishop', color: 'black' } },
    { piece: { type: 'knight', color: 'black' } },
    { piece: { type: 'rook', color: 'black' } },
  ]
  for (let i = 0; i < 8; i++) {
    board[1][i] = { piece: { type: 'pawn', color: 'black' } }
  }
  
  // Place white pieces
  for (let i = 0; i < 8; i++) {
    board[6][i] = { piece: { type: 'pawn', color: 'white' } }
  }
  board[7] = [
    { piece: { type: 'rook', color: 'white' } },
    { piece: { type: 'knight', color: 'white' } },
    { piece: { type: 'bishop', color: 'white' } },
    { piece: { type: 'queen', color: 'white' } },
    { piece: { type: 'king', color: 'white' } },
    { piece: { type: 'bishop', color: 'white' } },
    { piece: { type: 'knight', color: 'white' } },
    { piece: { type: 'rook', color: 'white' } },
  ]
  
  return board
}

function ChessGame() {
  const [board, setBoard] = useState<Square[][]>(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare
      const selectedPiece = board[selectedRow][selectedCol].piece
      
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        const newBoard = board.map(r => r.map(s => ({ ...s })))
        newBoard[row][col].piece = selectedPiece
        newBoard[selectedRow][selectedCol].piece = undefined
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
      }
      setSelectedSquare(null)
    } else {
      const piece = board[row][col].piece
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col])
      }
    }
  }

  const isSelected = (row: number, col: number) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col
  }

  const getSquareColor = (row: number, col: number) => {
    const isDark = (row + col) % 2 === 1
    if (isSelected(row, col)) {
      return 'bg-yellow-400'
    }
    return isDark ? 'bg-amber-800' : 'bg-amber-100'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Simple Chess Game</h1>
      
      <div className="mb-4 text-lg font-semibold text-gray-700">
        Current Player: <span className={`capitalize ${currentPlayer === 'white' ? 'text-blue-600' : 'text-red-600'}`}>
          {currentPlayer}
        </span>
      </div>
      
      <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 bg-gray-800">
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 flex items-center justify-center cursor-pointer text-4xl select-none transition-colors hover:opacity-80 ${
                getSquareColor(rowIndex, colIndex)
              }`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {square.piece && pieceUnicode[square.piece.color][square.piece.type]}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p className="mb-2">Click a piece to select it, then click another square to move.</p>
        <p>This is a simple chess board - no game rules enforced!</p>
      </div>
    </div>
  )
}
