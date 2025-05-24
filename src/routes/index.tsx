import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: ChessGame,
})

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'

interface Piece {
  type: PieceType
  color: PieceColor
}

type Board = (Piece | null)[][]

const initialBoard: Board = [
  [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
  [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
  [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }],
]

const pieceSymbols: Record<PieceType, Record<PieceColor, string>> = {
  king: { white: '♔', black: '♚' },
  queen: { white: '♕', black: '♛' },
  rook: { white: '♖', black: '♜' },
  bishop: { white: '♗', black: '♝' },
  knight: { white: '♘', black: '♞' },
  pawn: { white: '♙', black: '♟' },
}

function ChessGame() {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')

  const isValidMove = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const piece = board[fromRow][fromCol]
    if (!piece || piece.color !== currentPlayer) return false
    
    const targetPiece = board[toRow][toCol]
    if (targetPiece && targetPiece.color === piece.color) return false

    const rowDiff = Math.abs(toRow - fromRow)
    const colDiff = Math.abs(toCol - fromCol)

    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1
        const startRow = piece.color === 'white' ? 6 : 1
        if (toCol === fromCol) {
          if (toRow === fromRow + direction && !targetPiece) return true
          if (fromRow === startRow && toRow === fromRow + 2 * direction && !targetPiece) return true
        } else if (colDiff === 1 && toRow === fromRow + direction && targetPiece) {
          return true
        }
        return false
      case 'rook':
        return (rowDiff === 0 || colDiff === 0)
      case 'bishop':
        return rowDiff === colDiff
      case 'queen':
        return rowDiff === colDiff || rowDiff === 0 || colDiff === 0
      case 'king':
        return rowDiff <= 1 && colDiff <= 1
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
      default:
        return false
    }
  }

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare
      if (fromRow === row && fromCol === col) {
        setSelectedSquare(null)
        return
      }

      if (isValidMove(fromRow, fromCol, row, col)) {
        const newBoard = board.map(r => [...r])
        newBoard[row][col] = newBoard[fromRow][fromCol]
        newBoard[fromRow][fromCol] = null
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
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
    setBoard(initialBoard)
    setSelectedSquare(null)
    setCurrentPlayer('white')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Simple Chess Game</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold">
            Current Turn: <span className={currentPlayer === 'white' ? 'text-blue-600' : 'text-red-600'}>
              {currentPlayer === 'white' ? 'White' : 'Black'}
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-8 gap-0 border-2 border-gray-800 mb-4">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0
              const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-16 h-16 flex items-center justify-center cursor-pointer text-4xl
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'ring-4 ring-blue-500' : ''}
                    hover:brightness-110 transition-all
                  `}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                >
                  {piece && pieceSymbols[piece.type][piece.color]}
                </div>
              )
            })
          )}
        </div>
        
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
      
      <div className="mt-6 max-w-md text-center text-gray-600">
        <p className="text-sm">
          Click on a piece to select it, then click on a valid square to move. 
          Basic chess piece movement rules apply.
        </p>
      </div>
    </div>
  )
}
