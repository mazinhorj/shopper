import api from '../axios/config'
import useFlashMessage from '../hooks/useFlashMessage'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Analise.css'

const Analise = () => {

  const [productsToUpdate, setProductstoUpdate] = useState([])
  const [msgs, setMsgs] = useState([])
  const [newUpdatedProducts, setNewUpdatedProducts] = useState([])
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  let msgType = 'success'
  let msgText = ''

  useEffect(() => {
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let msgType = 'success'
    let msgText = ''

    api.get('/analise').then((res) => {
      setProductstoUpdate(res.data.productsToUpdate)
      setMsgs(res.data.msgs)
      setNewUpdatedProducts(res.data.newUpdatedProducts)
      console.log(res.data.msgs)
      console.log(res.data.productsToUpdate)
      console.log(res.data.newUpdatedProducts)
    }).catch((err) => {
      msgType = 'error'
      msgText = 'Verifique as pendências.'
      return err.response.data
    })

    setFlashMessage(msgText, msgType)
  }


  if (newUpdatedProducts !== undefined) {
    navigate('/home')
  }

  console.log(msgs)

  return (
    <div>
      {msgs.length === 0 && <>
        <form onSubmit={handleSubmit}>
        <input type="submit" value="Validar preços" />
      </form>
      </>}
      

      <div className='messages'>
        
        {msgs.length > 0 && <>
          <h2 id='final'>CORRIJA AS PENDÊNCIAS E REENVIE UM NOVO ARQUIVO</h2>
        </>}
        {msgs.map((m) => (
          <div key={m.code} className='cardErros'>
            
            <span>Código: {m.code}</span><br />
            <span>Produto: {m.name}</span><br />
            <span>Pendência: {m.msg}</span><br />
            <span>Preço: R$ {m.price}</span><br />
            <span>Novo Preço: R$ {m.new_price}</span><br />
            <span>Preço Máximo: R$ {m.max_price}</span><br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analise