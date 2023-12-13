'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { apiUtils } from '@/utils/apiUtils';
import { DropdownItem, WordData } from '@/types';
import { FormInput, IDropdown, IDropdownMulti, IFileImage, IText, ITextArea, ITextMulti } from '@/components/Form/Inputs';
import { dataUtils } from '@/utils/dataUtils';
import { useAxiosSWR } from '@/utils/useAxiosSWR';

const partOfSpeechOptions = [
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'pronoun', label: 'Pronoun' },
  { value: 'preposition', label: 'Preposition' },
  { value: 'conjunction', label: 'Conjunction' },
  { value: 'interjection', label: 'Interjection' },
];

export default function Words() {
  const { data:dropdownWords = [] } = useAxiosSWR<DropdownItem[]>('common/getDropdownWords');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // data
    // debugger;

    apiUtils.postData<WordData>('words', dataUtils.jsonToFormData(data))
    .then((data) => {
      debugger;
    });
  }

  return (
    <main className="container mx-auto py-16">
      <FormInput onSubmit={onSubmit}>
        <IFileImage id='image' />
        <IText id='word' label='Word' w={6} placeholder="Enter text" required />
        <IDropdown id='partsOfSpeech' label='Part of Speech' options={partOfSpeechOptions} w={4} required />
        <IText id='phonetics' label='Phonetics' w={6} placeholder="Enter text" required />
        <IText id="meaning" label="Meaning" w={6} placeholder="Enter text" required />
        <ITextArea id='example' label='Example' w={8} placeholder="Enter text" required />
        <ITextMulti id="categories" label="Categories" w={6} placeholder="Enter text" required />
        <IDropdownMulti id="synonyms" label="Synonyms" options={dropdownWords} />
        <IDropdownMulti id="antonyms" label="Antonyms" options={dropdownWords} />
        <IText id='level' label='Level' w={6} placeholder="Enter text" required />
      </FormInput>
    </main>
  );
}
