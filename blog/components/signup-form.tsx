'use client'
import { handleSignup, SignupStatus } from '@/actions/auth'
import React from 'react'
import { useFormState } from 'react-dom'

function SignupForm() {
  const initialState = { type: 'default' } as SignupStatus
  const [state, formAction] = useFormState(handleSignup, initialState)

  return (
    <form action={formAction}>
      <div className="flex gap-2">
        <div>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="请输入用户名"
            className="rounded-sm border-gray-100 text-sm shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-50 focus:ring-opacity-50"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="请设置密码"
            className="rounded-sm border-gray-100 text-sm shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-50 focus:ring-opacity-50"
          />
        </div>
        <button className="rounded-sm border-gray-200 bg-gray-50 px-4 text-sm font-bold hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-50 focus:ring-opacity-50 active:bg-gray-200">
          注册
        </button>
      </div>
    </form>
  )
}

export default SignupForm
