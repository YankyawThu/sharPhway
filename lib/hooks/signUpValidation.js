import { useState } from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function useSignUpValidation(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [nameInValid, setNameInValid] = useState(false)
  const [emailInValid, setEmailInValid] = useState(false)
  const [passwordInValid, setPasswordInValid] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
    if(name == 'name' && value) {
      setNameInValid(false)
    }
    else if(name == 'name') {
      validate(name)
      setNameInValid(true)
    }

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

  const validate = (name, exists = 0) => {
    const newErrors = {}
    if(exists) {
      setEmailInValid(true)
      newErrors[name] = `${name}Exists`
    } 
    else newErrors[name] = `provide${name}`
    const temp = {...errors, ...newErrors}
    setErrors(temp)
  }

  const validateAll = () => {
    const newErrors = {}
    for (const key in values) {
      if (values[key] === '') {
        if(key == 'name') {
          setNameInValid(true)
        }
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
    nameInValid,
    emailInValid,
    passwordInValid,
    handleChange,
    validateAll,
    validate
  }
}