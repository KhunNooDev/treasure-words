import React, { ChangeEvent, useRef, useState } from 'react';
import { SubmitHandler, FieldValues, useForm, useFormContext, FormProvider } from 'react-hook-form';
import { FaFileImage, FaTimesCircle } from 'react-icons/fa';
import Image from 'next/image';

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
  options: Array<{ value: string; label: string }>;
} 
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
      <form onSubmit={methods.handleSubmit(onSubmit)} className='mx-auto max-w-md'>
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


export function IFileImage({ id, label, required, disable }: InputProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate that the uploaded file is an image
      if (file.type.startsWith('image/')) {
        // Read the image file and set the preview
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // Reset the preview and show an error
        setImagePreview(null);
        event.target.value = ''; // Clear the input value
        alert('Please upload a valid image file.');
      }
    } else {
      // Reset the preview if no file is selected
      setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    // Remove the selected image
    setImagePreview(null);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
                  width={100} // Adjust the width according to your requirements
                  height={100} // Adjust the height according to your requirements
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
              </div>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={disable}
      />
    </div>
  );
  
}