'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { apiUtils } from '@/utils/apiUtils';

// Define the WordData type
interface WordData {
  word: string;
  partsOfSpeech: string;
  meaning: string[];
  example: string;
  synonyms: string[];
  antonyms: string[];
  image: string;
  categories: string[];
  level: string;
  phonetics: string;
}

// Define the Words component
export default function Words() {
  // State to manage the form data
  const [formData, setFormData] = useState<WordData>({
    word: '',
    partsOfSpeech: '',
    meaning: [],
    example: '',
    synonyms: [],
    antonyms: [],
    image: '',
    categories: [],
    level: '',
    phonetics: '',
  });

  // Handler for input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for submitting the form
  const insertData = () => {
    apiUtils.postData('words', {
      wordData: formData,
    }).then((data) => {
      debugger;
    });
  };

  return (
    <main className="container mx-auto pt-16">
      {/* <form>
        <div className="mb-4">
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">
            Word:
          </label>
          <input
            type="text"
            id="word"
            name="word"
            value={formData.word}
            onChange={handleInputChange}
            className="mt-1 p-2 border w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="partsOfSpeech" className="block text-sm font-medium text-gray-700">
            Parts of Speech:
          </label>
          <input
            type="text"
            id="partsOfSpeech"
            name="partsOfSpeech"
            value={formData.partsOfSpeech}
            onChange={handleInputChange}
            className="mt-1 p-2 border w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">
            Meaning:
          </label>
          <input
            type="text"
            id="meaning"
            name="meaning"
            value={formData.meaning.join(', ')}
            onChange={handleInputChange}
            className="mt-1 p-2 border w-full"
          />
        </div>
        <button type="button" onClick={insertData} className="p-2 bg-blue-500 text-white">
          Insert Data
        </button>
      </form> */}
      <WordsTable/>
    </main>
  );
}

// Define the Words component
export function WordsTable() {
  // State to manage the fetched data
  const [dataList, setDataList] = useState<WordData[]>([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    apiUtils.getData<WordData[]>('words')
      .then((data) => {
        debugger;
        setDataList(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  // Render the table with fetched data
  const renderTable = () => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th>Word</th>
            <th>Parts of Speech</th>
            {/* Add headers for other properties in wordData */}
          </tr>
        </thead>
        <tbody>
          {dataList.map((word) => (
            <tr key={word.word}>
              <td>{word.word}</td>
              <td>{word.partsOfSpeech}</td>
              {/* Add cells for other properties in wordData */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <main className="container mx-auto pt-16">
      {dataList.length > 0  && renderTable()}
    </main>
  );
}
