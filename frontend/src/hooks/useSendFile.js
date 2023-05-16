import api from '../axios/config'

import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom' 

export default function sendFile() {
  async function sender(csv_file) {
    try {
      const data = await api.post('/send', csv_file).then((res) => {
        return res.data
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return {sender}
}