import api from '../axios/config'
import { useState, useEffect } from 'react'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([])

  let msgType = 'success'

  useEffect(() => {
    api.get('/products').then((res) => {
      setProducts(res.data.products)
      // console.log(products)
    }).catch((err) => {
      console.log(err)
      msgType = 'error'
      return err.res.data
    })
  }, [])


  return (
    <div>
      <h1>Produtos Cadastrados</h1>
      {products.length === 0 && <h2>Carregando...</h2>}

      {products.length > 0 &&
        products.map((product) => (
          <div key={product.code} className='cardProd'>
            <span>Código: {product.code}. </span>
            <span>{product.name}</span><br />
            <span>Preço de Custo: R$ {product.cost_price}</span><br />
            <span>Preço de Venda: R$ {product.sales_price}</span><br />
          </div>
        ))
      }
    </div>
  )
}

export default Products