import React from 'react'
import './Input.css'

const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple }) => {
  return (
    <div className='form_control'>
      <label htmlFor={name}>{text}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          {...(multiple ? {multiple} : '')}
        />
      </label>
    </div>
  )
}

export default Input