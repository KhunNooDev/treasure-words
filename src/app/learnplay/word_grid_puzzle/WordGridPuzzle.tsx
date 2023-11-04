'use client'
import React, { useEffect, useState } from 'react'

// Helper function to get a random integer within a specified range
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to shuffle an array using the Fisher-Yates algorithm
const shuffleArray = (array: number[][]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i)
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// Function to check if a given row and column are within the 3x3 grid
const isValidPosition = (row: number, col: number, sizes: number[]): boolean => {
  return row >= 0 && row < sizes[0] && col >= 0 && col < sizes[1]
}

function createGrid<T>(rows: number, cols: number, defaultValue: T): T[][] {
  const grid: T[][] = []

  for (let i = 0; i < rows; i++) {
    const row: T[] = []
    for (let j = 0; j < cols; j++) {
      row.push(defaultValue)
    }
    grid.push(row)
  }

  return grid
}

// Function to generate a random valid arrangement of letters
const getRandomValidArrangement = (word: string, sizes: number[]) => {
  const sizeRows = sizes[0]
  const sizeCols = sizes[1]
  // Initialize the 3x3 grid with dashes to represent empty positions
  const defaultValue = '-'
  const grid = createGrid<string>(sizeRows, sizeCols, defaultValue)

  // Split the word into an array of letters
  const wordLetters: string[] = word.split('')

  // Create a 3x3 grid to keep track of used positions
  const usedPositions = createGrid<boolean>(sizeRows, sizeCols, false)

  // Define possible directions for letter placement
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ]

  // Start with the first letter in the center of the grid
  let currentRow = 1
  let currentCol = 1
  let currentIndex = 0

  while (currentIndex < wordLetters.length) {
    const letter = wordLetters[currentIndex]

    // Determine valid directions for the current placement
    let _directions =
      currentIndex === 0
        ? [
            ...directions,
            [-1, -1], // Diagonal Up-Left
            [-1, 1], // Diagonal Up-Right
            [1, -1], // Diagonal Down-Left
            [1, 1], // Diagonal Down-Right
            [0, 0],
          ]
        : directions

    // Shuffle the valid directions randomly
    shuffleArray(_directions)
    let foundValidPosition = false

    // Try each direction to find a valid adjacent position
    for (const [dx, dy] of _directions) {
      const newRow = currentRow + dx
      const newCol = currentCol + dy
      console.log(newRow + '/' + newRow)

      // Check if the new position is valid and not already used
      if (
        isValidPosition(newRow, newCol, sizes) &&
        !usedPositions[newRow][newCol] &&
        grid[newRow][newCol] === defaultValue
      ) {
        console.log('  gen' + newRow + '/' + newRow)
        // Place the letter at the new position
        grid[newRow][newCol] = letter
        usedPositions[newRow][newCol] = true
        currentRow = newRow
        currentCol = newCol
        foundValidPosition = true
        currentIndex++
        break
      }
    }

    // If a valid position couldn't be found, restart the arrangement
    if (!foundValidPosition) {
      return null
    }
  }

  // Fill the remaining empty positions with random letters (A-Z, excluding word's letters)
  const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((letter) => !wordLetters.includes(letter))

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === defaultValue) {
        const randomIndex = getRandomInt(0, availableLetters.length - 1)
        grid[i][j] = availableLetters[randomIndex]
        availableLetters.splice(randomIndex, 1)
      }
    }
  }

  return grid
}

export default function WordGridPuzzle({ word }: { word: string }) {
  const sizes: number[] = word.length > 9 ? [4, 4] : [3, 3]
  const gridCols: number = sizes[1] || 3
  const [block, setBlock] = useState<string[][] | null>(null)
  const [selectedPositions, setSelectedPositions] = useState<number[][] | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const generateRandomBlock = (): void => {
    const grid = getRandomValidArrangement(word, sizes)
    if (grid) {
      setBlock(grid)
      setSelectedPositions(null)
      setIsCorrect(false)
    } else {
      generateRandomBlock()
    }
  }

  const handlePress = (row: number, col: number): void => {
    setSelectedPositions([[row, col]])
  }

  const handleMove = (row: number, col: number) => {
    if (selectedPositions) {
      // Check if the new position is already part of selected positions
      const alreadySelected = selectedPositions.some(([r, c]) => r === row && c === col)

      if (alreadySelected) {
        // Deselect letters in reverse order until the new position
        const newIndex = selectedPositions.findIndex(([r, c]) => r === row && c === col)
        const _selectedPositions = selectedPositions.slice(0, newIndex + 1)

        // Check if the selected positions form a valid word
        const selectedWord = block && _selectedPositions.map(([r, c]) => block[r][c]).join('')
        if (selectedWord === word) {
          setIsCorrect(true)
        } else {
          setIsCorrect(false)
        }

        setSelectedPositions(_selectedPositions)
      } else {
        // Check if the new position is adjacent to the last selected position
        const [lastRow, lastCol] = selectedPositions[selectedPositions.length - 1]
        if (
          Math.abs(row - lastRow) <= 1 && // Check row difference
          Math.abs(col - lastCol) <= 1 && // Check column difference
          !(row === lastRow && col === lastCol) // Check if it's the same position
        ) {
          // Add the new position to the selected positions
          const _selectedPositions = [...selectedPositions, [row, col]]

          // Check if the selected positions form a valid word
          const selectedWord = block && _selectedPositions.map(([r, c]) => block[r][c]).join('')
          if (selectedWord === word) {
            setIsCorrect(true)
          } else {
            setIsCorrect(false)
          }

          setSelectedPositions(_selectedPositions)
        }
      }
    }
  }

  const handleRelease = (): void => {
    setSelectedPositions(null)
    setIsCorrect(false)
  }

  return (
    <div>
      <button onClick={generateRandomBlock} className='mb-4 rounded-md bg-blue-500 px-4 py-2 text-white'>
        Generate Random
      </button>
      {block && (
        <div
          //56*3 + 8*4 for 3*3
          //56*4 + 8*5 for 4*4
          className={`mx-auto ${gridCols === 3 ? 'h-[200px] w-[200px]' : 'h-[264px] w-[264px]'} rounded-lg border p-2`}
          onMouseLeave={handleRelease}
          onMouseUp={handleRelease}
        >
          <div className={`grid ${gridCols === 3 ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
            {block.map((row, rowIndex) =>
              row.map((alphabet, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex h-14 w-14 select-none items-center justify-center rounded-md text-2xl font-bold ${
                    selectedPositions && selectedPositions.some(([row, col]) => row === rowIndex && col === colIndex)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 '
                  }`}
                  onMouseDown={() => handlePress(rowIndex, colIndex)}
                  onMouseEnter={() => handleMove(rowIndex, colIndex)}
                >
                  {alphabet}
                </div>
              )),
            )}
          </div>
          {isCorrect && <p className='text-green-500'>Correct!</p>}
        </div>
      )}
    </div>
  )
}
