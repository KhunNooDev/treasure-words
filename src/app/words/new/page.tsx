'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { apiUtils } from '@/utils/apiUtils';
import { WordData } from '@/types/word.type';
import { FormInput, IDropdown, IFileImage, IText, ITextArea, MultiAddInput } from '@/components/Form/Inputs';
import { dataUtils } from '@/utils/dataUtils';

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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data
    debugger;

    // apiUtils.postData('words', dataUtils.jsonToFormData(data))
    // .then((data) => {
    //   debugger;
    // });
  }

  return (
    <main className="container mx-auto py-16">
      <FormInput onSubmit={onSubmit}>
        <IFileImage id='image' required />
        <IText id='word' label='Word' w={6} required />
        <IDropdown id='partsOfSpeech' label='Part of Speech' options={partOfSpeechOptions} w={4} required />
        <IText id='meaning' label='Meaning' required />
        <MultiAddInput id="exampleInput" label="Example" w={6} placeholder="Enter text" required />
        <ITextArea id='example' label='Example' w={8} required />
      </FormInput>
    </main>
  );
}
