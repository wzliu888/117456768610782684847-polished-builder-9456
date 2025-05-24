import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'

interface Piece {
  type: PieceType
  color: PieceColor
}

type Board = (Piece | null)[][]

const pieceSymbols: Record<PieceColor, Record<PieceType, string>> = {
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

function createInitialBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null))
  
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' }
    board[6][i] = { type: 'pawn', color: 'white' }
  }
  
  const backRankPieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: backRankPieces[i], color: 'black' }
    board[7][i] = { type: backRankPieces[i], color: 'white' }
  }
  
  return board
}

function App() {
  const [board, setBoard] = useState<Board>(createInitialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')
  const [gameStatus, setGameStatus] = useState<string>('White to move')

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare
      const selectedPiece = board[selectedRow][selectedCol]
      
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        const targetSquare = board[row][col]
        
        if (row !== selectedRow || col !== selectedCol) {
          if (!targetSquare || targetSquare.color !== selectedPiece.color) {
            const newBoard = board.map(r => [...r])
            newBoard[row][col] = selectedPiece
            newBoard[selectedRow][selectedCol] = null
            
            setBoard(newBoard)
            setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
            setGameStatus(`${currentPlayer === 'white' ? 'Black' : 'White'} to move`)
          }
        }
      }
      
      setSelectedSquare(null)
    } else {
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
    setGameStatus('White to move')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Simple Chess Game</h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-lg font-semibold text-gray-700">{gameStatus}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              New Game
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 bg-white">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0
                const isSelected = selectedSquare && 
                  selectedSquare[0] === rowIndex && 
                  selectedSquare[1] === colIndex
                
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-16 h-16 flex items-center justify-center text-4xl font-bold
                      transition-colors border-0 focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${
                        isLight 
                          ? isSelected 
                            ? 'bg-yellow-300' 
                            : 'bg-amber-100 hover:bg-amber-200'
                          : isSelected 
                            ? 'bg-yellow-400' 
                            : 'bg-amber-800 hover:bg-amber-700'
                      }
                      ${
                        piece && piece.color === currentPlayer && !isSelected
                          ? 'ring-2 ring-green-400'
                          : ''
                      }
                    `}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    title={piece ? `${piece.color} ${piece.type}` : 'Empty square'}
                  >
                    <span className={`${
                      piece 
                        ? piece.color === 'white' 
                          ? 'text-green-700' 
                          : 'text-red-700'
                        : ''
                    }`}>
                      {piece ? pieceSymbols[piece.color][piece.type] : ''}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">How to Play</h2>
          <div className="max-w-2xl mx-auto text-left space-y-2">
            <p>• Click on one of your pieces to select it (highlighted in green)</p>
            <p>• Click on any other square to move the piece there</p>
            <p>• Players alternate turns (White moves first)</p>
            <p>• This is a simplified version - all moves are allowed for easy gameplay</p>
            <p>• Capture opponent pieces by moving onto their squares</p>
          </div>
        </div>
      </div>
    </div>
  )
}
