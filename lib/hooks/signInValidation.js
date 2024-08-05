import { useState } from 'react'

export default function useSignInValidation(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [emailInValid, setEmailInValid] = useState(false)
  const [passwordInValid, setPasswordInValid] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
    if(name == 'email' && value) {
      setEmailInValid(false)
    }
    else if(name == 'email') {
      validate(name)
      setEmailInValid(true)
    }

    if(name == 'password' && value) {
      setPasswordInValid(false)
    }
    else if(name == 'password') {
      validate(name)
      setPasswordInValid(true)
    }
  }

  const validate = (name) => {
    const newErrors = {}
    newErrors[name] = `provide${name}`
    const temp = {...errors, ...newErrors}
    setErrors(temp)
  }

  const validateAll = () => {
    const newErrors = {}
    for (const key in values) {
      if (values[key] === '') {
        if(key == 'email') {
          setEmailInValid(true)
        }
        if(key == 'password') {
          setPasswordInValid(true)
        }
        newErrors[key] = `provide${key}`
      }
    }
    setErrors(newErrors)
  }

  return {
    values,
    errors,
    emailInValid,
    passwordInValid,
    handleChange,
    validateAll,
  }
}