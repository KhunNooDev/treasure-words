export interface WordData {
  id: string
  word: string;
  partsOfSpeech: string;
  meaning: string[];
  example: string;
  synonyms: string[];
  antonyms: string[];
  image: Buffer;
  dataUrl: string | null;
  categories: string[];
  level: string;
  phonetics: string;
}