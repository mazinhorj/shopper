import './Home.css'
import '../components/form/Form.css'
import Input from '../components/form/Input'
import api from '../axios/config'
import useFlashMessage from '../hooks/useFlashMessage'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [csv_file, setCsv_file] = useState({})
  const { setFlashMessage } = useFlashMessage()

  const navigate = useNavigate()

  function onFileChange(e) {
    setCsv_file(e.target.files[0])
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let msgType = 'success'
    let msgText = ''
    
    const formData = new FormData()
    
    formData.append("csv_file", csv_file)
    
    console.log(formData)
    console.log(csv_file)

    const data = await api.post('/send', formData, {
    }
    ).then((response) => {
      msgText = "Arquivo enviado com sucesso"
      return response.data.message
    }).catch((error) => {
      console.log(error)
      msgText = "Escolha um arquivo válido."
      msgType = 'error'
      return error.response.data
    })

    
    setFlashMessage(msgText, msgType)
    
    if (msgType !== 'error') {
      navigate('/analise')
    }


  }

  return (
    <div id="homeDiv">
      <h1>Aplicação Shopper</h1>
      <h2>Atualização de Preços</h2>
      <div>
        <form onSubmit={handleSubmit} className='form_container'>
          <Input
            type="file"
            text="Arquivo de atualização: "
            name="name"
            placeholder="Escolha o arquivo"
            handleOnChange={onFileChange}
          />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  )
}

export default Home