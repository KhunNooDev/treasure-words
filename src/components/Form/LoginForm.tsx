'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok && callback?.error === null) {
        router.push('/')
        // toast.success('Logged in')
      }
      if (callback?.error) {
        // toast.error(callback.error)
      }
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
      <div className='mb-4'>
        <Link href='/forgetpassword' className='block text-blue-500'>
          Forgot Password?
        </Link>
      </div>
      <button type='submit' className='mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white'>
        Log In
      </button>
      <div className='mt-4 text-center'>
        Don't have an account yet?{' '}
        <Link href='/register' className='text-blue-500'>
          Register
        </Link>
      </div>
    </form>
  )
}
