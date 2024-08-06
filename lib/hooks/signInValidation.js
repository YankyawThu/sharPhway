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
    validate(name, value)
  }

  const validate = (name = null, val = null, errorMsg = null) => {
    const newErrors = {}
    Object.entries(values).forEach(([key, value]) => {
      let type = name ?? key
      let newVal = val ?? value

      if(type == 'email' && newVal) {
        if(errorMsg) {
          setEmailInValid(true)
          newErrors[type] = `${errorMsg}`
        }
        else setEmailInValid(false)
      }
      else if(type == 'email'){
        newErrors[type] = `provide${type}`
        setEmailInValid(true)
      }
  
      if(type == 'password' && newVal) {
        if(errorMsg) {
          setPasswordInValid(true)
          newErrors[type] = `${errorMsg}`
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
    emailInValid,
    passwordInValid,
    handleChange,
    validate,
  }
}