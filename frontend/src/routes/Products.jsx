import api from '../axios/config'
import { useState, useEffect } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])

  let msgType = 'success'

  useEffect(() => {
    api.get('/products').then((res) => {
      setProducts(res.data.products)
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })
  }, [])

  // console.log(products)

  return (
    <div>
      <h1>Produtos Cadastrados</h1>
      {products.length === 0 && <h2>Carregando...</h2>}

      {products.length > 0 &&
        products.map((product) => (
          <div key={product.code}>
            <span>{product.name}</span>
            <span>Preço de Custo: R$ {product.cost_price}</span>
            <span>Preço de Venda: R$ {product.sales_price}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Products