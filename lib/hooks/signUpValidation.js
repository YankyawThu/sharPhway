import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { PASS_RULE } from '../config/const'

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
    validate(name, value)
  }

  const validate = (name = null, val = null, exist = 0) => {
    const newErrors = {}
    Object.entries(values).forEach(([key, value]) => {
      let type = name ?? key
      let newVal = val ?? value

      if(type == 'name' && newVal) {
        setNameInValid(false)
      }
      else if(type == 'name') {
        newErrors[type] = `provide${type}`
        setNameInValid(true)
      }
  
      if(type == 'email' && newVal) {
        if(exist) {
          setEmailInValid(true)
          newErrors[type] = `${type}Exists`
        }
        else setEmailInValid(false)
      }
      else if(type == 'email'){
        newErrors[type] = `provide${type}`
        setEmailInValid(true)
      }
  
      if(type == 'password' && newVal) {
        if(!PASS_RULE.test(newVal)) {
          newErrors[type] = `provide6chr${type}`
          setPasswordInValid(true)
        } 
        else setPasswordInValid(false)
      }
      else if(type == 'password') {
        newErrors[type] = `provide${type}`
        setPasswordInValid(true)
      }
    })

    setErrors({...errors, ...newErrors})
  }

  return {
    values,
    errors,
    nameInValid,
    emailInValid,
    passwordInValid,
    handleChange,
    validate,
  }
}