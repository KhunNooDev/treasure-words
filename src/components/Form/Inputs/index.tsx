import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, FieldValues, useForm, useFormContext, FormProvider, useWatch, RegisterOptions } from 'react-hook-form';
import { FaFileImage, FaTimesCircle } from 'react-icons/fa';
import Image from '@/components/Image';
import { DropdownItem } from '@/types';

interface FormInputProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onReset?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  resetLabel?: string;
  cancelLabel?: string;
}

interface InputProps {
  id: string;
  label: string;
  w?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  placeholder?: string;
  required?: boolean;
  disable?: boolean;
}

interface DropdownProps extends InputProps {
  options: DropdownItem[]
} 
interface IFileImageProps extends Omit<InputProps, 'label'> {}

export function FormInput({ 
  children, onSubmit, onReset, onCancel,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  cancelLabel = 'Cancel', 
}: FormInputProps) {
  const methods = useForm()

  const handleReset = () => {
    methods.reset();
    if (onReset) {
      onReset();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className='mx-auto max-w-md'>
        {children}
        <div className="flex justify-center space-x-2 mt-4">
          <button type='submit' className='btn btn-primary'>
            {submitLabel}
          </button>
          <button type='button' onClick={handleReset} className='btn btn-secondary'>
            {resetLabel}
          </button>
          <button type='button' onClick={handleCancel} className='btn btn-error'>
            {cancelLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export function IText({ id, label, w, placeholder, required, disable }: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorClass = errors[id] ? 'border-red-500 focus:border-red-500' : 'border';
  const widthPercentage = w ? `${(w / 12) * 100}%` : '100%';
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
          {required && <span className='text-red-500'> * </span>}
        </span>
      </label>
      <input
        {...register(id, { required })}
        type="text"
        placeholder={placeholder}
        className={`input input-bordered w-full ${errorClass}`}
        style={{ width: widthPercentage }}
        disabled={disable}
      />
      {errors[id] && (
        <label className="label">
          <span className="label-text-alt text-red-500">
            {errors[id]?.message?.toString() || `${label} is required`}
          </span>
        </label>
      )}
    </div>
  );
}

export function ITextArea({ id, label, w, placeholder, required, disable }: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorClass = errors[id] ? 'border-red-500 focus:border-red-500' : 'border';
  const widthPercentage = w ? `${(w / 12) * 100}%` : '100%';

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
          {required && <span className='text-red-500'> * </span>}
        </span>
      </label>
      <textarea
        {...register(id, { required })}
        placeholder={placeholder}
        className={`textarea textarea-bordered w-full ${errorClass}`}
        style={{ width: widthPercentage }}
        disabled={disable}
      ></textarea>
      {errors[id] && (
        <label className="label">
          <span className="label-text-alt text-red-500">
            {errors[id]?.message?.toString() || `${label} is required`}
          </span>
        </label>
      )}
    </div>
  );
}

export function IDropdown({ id, label, options, w, required, disable }: DropdownProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorClass = errors[id] ? 'border-red-500 focus:border-red-500' : 'border';
  const widthPercentage = w ? `${(w / 12) * 100}%` : '100%';

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {label}
          {required && <span className='text-red-500'> * </span>}
        </span>
      </div>
      <select
        {...register(id, { required })}
        className={`select select-bordered w-full ${errorClass}`}
        style={{ width: widthPercentage }}
        disabled={disable}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[id] && (
        <div className="label">
          <span className="label-text-alt text-red-500">
            {errors[id]?.message?.toString() || `${label} is required`}
          </span>
        </div>
      )}
    </label>
  );
}

export function ITextMulti({ id, label, w, placeholder, required, disable }: InputProps) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [textList, setTextList] = useState<string[]>([]);
  const errorClass = errors[id] ? 'border-red-500 focus:border-red-500' : 'border';
  const widthPercentage = w ? `${(w / 12) * 100}%` : '100%';
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMultiRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    register(id, { required });
  }, [id, register, required]);

  useEffect(() => {
    setValue(id, textList);
  }, [textList]);

  const handleAddClick = () => {
    const value = inputMultiRef.current?.value
    if (value && value.trim() !== '') {
      setTextList((prevList) => [...prevList, value]);
      inputMultiRef.current!.value = ''; // Clear the input field after adding
    }
  };

  const handleRemoveClick = (index: number) => {
    setTextList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
          {required && <span className='text-red-500'> * </span>}
        </span>
      </label>
      <div className="flex gap-2">
        <input ref={inputRef} className="hidden" />
        <input
          ref={inputMultiRef}
          type="text"
          placeholder={placeholder}
          className={`input input-bordered w-full ${errorClass}`}
          style={{ width: widthPercentage }}
          disabled={disable}
        />
        <button type='button' onClick={handleAddClick}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
      <ul className="list-disc ml-4">
      {textList.map((text, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="mr-2">{text}</span>
            <button
              type="button"
              onClick={() => handleRemoveClick(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IDropdownMulti({ id, label, options, required, disable }: DropdownProps) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Array<{ value: string; label: string }>>([]);
  const errorClass = errors[id] ? 'border-red-500 focus:border-red-500' : 'border';
  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    register(id, { required });
  }, [id, register, required]);

  useEffect(() => {
    setValue(id, selectedValue);
  }, [id, setValue, selectedValue]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(option => option.value === e.target.value);

    if (selectedOption) {
      setSelectedValue(selectedOption.value);
      setSelectedLabel(selectedOption.label);
    }
  };

  const handleAddClick = () => {
    if (selectedValue.trim() !== '') {
      // Check if the selected value is not already in the list
      if (!selectedItems.some(item => item.value === selectedValue)) {
        // Add the selected value and label to the list
        setSelectedItems(prevItems => [...prevItems, { value: selectedValue, label: selectedLabel }]);
      }

      // Clear the selected value and label after adding
      setSelectedValue('');
      setSelectedLabel('');
    }
  };

  const handleRemoveClick = (index: number) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label}
          {required && <span className='text-red-500'> * </span>}
        </span>
      </label>
      <div className="flex gap-2">
        <select
          ref={inputRef}
          value={selectedValue}
          onChange={handleSelectChange}
          className={`select select-bordered w-full ${errorClass}`}
          disabled={disable}
        >
          <option value="" disabled hidden>{'Select an option'}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleAddClick} className="btn btn-primary">
          Add
        </button>
      </div>
      <ul className="list-disc ml-4 mt-2">
        {selectedItems.map((item, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="mr-2">{item.label}</span>
            <button
              type="button"
              onClick={() => handleRemoveClick(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IFileImage({ id, required, disable }: IFileImageProps) {
  const { register, setValue } = useFormContext();
  const fileInputValue = useWatch({ name: id });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    register(id, { required });
  }, [id, register, required, fileInputValue]);

  useEffect(() => {
    if(!fileInputValue){
      setImagePreview(null);
    }
  }, [fileInputValue])
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue(id, file);
    } else {
      setImagePreview(null);
      setValue(id, null); // Clear the file value in case of an invalid file
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    // Remove the selected image
    setImagePreview(null);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValue(id, null);
  };

  return (
    <div className="form-control w-full">
      <div className="cursor-pointer">
        <div className="avatar h-full flex items-center justify-center">
          <div className='relative w-24 rounded-md border'>
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <FaTimesCircle size={16} />
                </button>
              </>
            ) : (
              <div
                onClick={handleImageClick}
                className="flex items-center justify-center text-gray-500 h-full"
              >
                <FaFileImage size={20} />
                {required && <span className='text-red-500'> * </span>}
              </div>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={disable}
        // required={required}
      />
      {/* {required && !fileInputValue && (
        <p className="text-red-500">This field is required</p>
      )} */}
    </div>
  );
}