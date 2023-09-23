'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then(() => {
        router.push('/login')
      })
      .catch((error) => {
        // toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form className='mx-auto max-w-md' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label htmlFor='email' className='mb-1 block font-semibold'>
          Email <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          id='email'
          {...register('email', { required: true })}
          className={`w-full rounded border px-3 py-2 focus:outline-none ${
            errors.email ? 'border-red-500 focus:border-red-500' : 'border'
          }`}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='name' className='mb-1 block font-semibold'>
          Name <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='name'
          {...register('name', { required: true })}
          className={`w-full rounded border px-3 py-2 focus:outline-none ${
            errors.name ? 'border-red-500 focus:border-red-500' : 'border'
          }`}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='mb-1 block font-semibold'>
          Password <span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          id='password'
          {...register('password', { required: true })}
          className={`w-full rounded border px-3 py-2 focus:outline-none ${
            errors.password ? 'border-red-500 focus:border-red-500' : 'border'
          }`}
        />
      </div>
      {/* <div className='mb-4'>
        <label htmlFor='confirmPassword' className='mb-1 block font-semibold'>
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword', { required: true })}
          className={`w-full rounded border px-3 py-2 focus:outline-none ${
            errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border'
          }`}
        />
      </div> */}
      <button type='submit' className='mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white'>
        Register
      </button>
      <div className='mt-4 text-center'>
        Already have an account?{' '}
        <Link href='/login' className='text-blue-500'>
          Log In
        </Link>
      </div>
    </form>
  )
}
