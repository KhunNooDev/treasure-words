import WordGridPuzzle from './WordGridPuzzle'

interface IWordGridPuzzle {
  word: string
}
export default function LearnPlay_word_grid_puzzle({word} : IWordGridPuzzle) {
  return (
    <main className='container mx-auto pt-16'>
      <WordGridPuzzle word={word || '123456789'} />
    </main>
  )
}
