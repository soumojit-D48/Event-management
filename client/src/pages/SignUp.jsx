import React from 'react'

import SignUpForm from '../components/auth/registrationForm'
import AuthLayout from '../components/layoutComponents/AuthRoute'


const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm/>
    </AuthLayout>
  )
}

export default SignUp