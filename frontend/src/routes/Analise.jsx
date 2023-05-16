import api from '../axios/config'
import useFlashMessage from '../hooks/useFlashMessage'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    let msgType = 'error'
    let msgText = 'Verifique as pendências.'

    api.get('/analise').then((res) => {
      setProductstoUpdate(res.data.msgs)
      setMsgs(res.data.productsToUpdate)
      setNewUpdatedProducts(res.data.newUpdatedProducts)
      console.log(res.data.msgs)
      console.log(res.data.productsToUpdate)
      console.log(res.data.newUpdatedProducts)
    }).catch((err) => {
      msgType = 'error'
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
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Validar preços" />
      </form>

      <div className='messages'>
        <h1>Produtos para Atualizar</h1>
        {/* {msgs.length === 0 && <h2>Carregando...</h2>} */}
        {msgs.map((m) => (
          <div key={m.code}>
            <p>COD.: {m.code}</p>
            <p>Produto: {m.name}</p>
            <p>Pendência: {m.msg}</p>
            <p>Pendência: {m.msg}</p>
            <p>Pendência: {m.msg}</p>
            <hr />
          </div>
        ))}

      </div>
    </div>
  )
}

export default Analise