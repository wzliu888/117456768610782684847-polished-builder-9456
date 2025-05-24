import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

// Chess piece types
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'
type Piece = { type: PieceType; color: PieceColor } | null

// Unicode chess pieces
const PIECE_SYMBOLS = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
}

// Initial chess board setup
const createInitialBoard = (): Piece[][] => {
  const board: Piece[][] = Array(8).fill(null).map(() => Array(8).fill(null))
  
  // Set up black pieces
  board[0] = [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ]
  board[1] = Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' }))
  
  // Set up white pieces
  board[6] = Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' }))
  board[7] = [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
  
  return board
}

function App() {
  const [board, setBoard] = useState<Piece[][]>(createInitialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare
      const selectedPiece = board[selectedRow][selectedCol]
      
      // Simple move validation: can only move your own pieces
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        // Make the move
        const newBoard = board.map(r => [...r])
        newBoard[row][col] = selectedPiece
        newBoard[selectedRow][selectedCol] = null
        
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
      }
      
      setSelectedSquare(null)
    } else {
      // Select a square if it has a piece of the current player
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col])
      }
    }
  }

  const resetGame = () => {
    setBoard(createInitialBoard())
    setSelectedSquare(null)
    setCurrentPlayer('white')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Simple Chess Game</h1>
        
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Current Player: <span className={`${currentPlayer === 'white' ? 'text-blue-600' : 'text-red-600'}`}>
              {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
            </span>
          </p>
          <button 
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>

        <div className="border-2 border-gray-800 inline-block">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0
                const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-12 h-12 flex items-center justify-center text-2xl cursor-pointer
                      ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                      ${isSelected ? 'ring-4 ring-blue-500' : ''}
                      hover:opacity-80 transition-opacity
                    `}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {piece && PIECE_SYMBOLS[piece.color][piece.type]}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Click a piece to select it, then click a destination square to move.</p>
          <p>This is a simple version - no chess rules validation yet!</p>
        </div>
      </div>
    </div>
  )
}
