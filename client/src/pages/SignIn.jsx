import SignInForm from '@/components/auth/SignInForm'
import AuthLayout from '@/components/layoutComponents/AuthRoute'
import React from 'react'

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm/>
    </AuthLayout>
  )
}

export default SignIn