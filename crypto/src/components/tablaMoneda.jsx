import axios from 'axios'
import { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TablaMoneda = () => {

  const [data, setData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h"

  // Fetch data para la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    }, [])

  // Obtener el último elemento para la fecha de actualización
  const ultimoElemento = data.slice(-1)[0];

  // Estado para el modal
  const [show, setShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleShow = (id) => {
      setSelectedItemId(id) // Guardamos el ID del item
      setShow(true)
  }

  const handleClose = () => {
      setShow(false)
      setSelectedItemId(null) // Limpiar al cerrar
  }

  // Ordenar los datos por valor descendente y tomar los primeros 20
  const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
  const top20 = sortedData.slice(0, 20);
  

  return (
    <>
      <div className='row'>
        <div className="alert alert-primary" role="alert">
          <strong>&Uacute;ltima Actualizaci&oacute;n:</strong>
          {ultimoElemento ? (
            <>
              &nbsp;{new Date(ultimoElemento.last_updated).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}&nbsp;
              {new Date(ultimoElemento.last_updated).toISOString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).split('T')[1].split('.')[0]}
            </>
          ) : (
            <> Cargando... </>
          )}
        </div>
      </div>
      <div className='row'>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">S&iacute;mbolo</th>
              <th scope="col">Precio Actual</th>
              <th scope="col">Detalles</th>
            </tr>
          </thead>
          <tbody>
              {top20.map((character) => ( 
                <tr key={character.id}>
                  <td><img src={character.image} width="30" height="30" /></td>
                  <td>{character.name}</td>
                  <td><p className='textoMayus'>{character.symbol}</p></td>
                  <td>{character.current_price}<span className='textoUSD'>$</span></td>
                  <td>
                    <center><a className="btn btn-primary btn-sm" key={character.id} onClick={() => handleShow(character)} >Ver Detalles</a></center>
                    {show && (
                      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Mostrando Detalles de la Crypto {selectedItemId ? (
                              <strong><span>{selectedItemId.name}</span></strong>
                            ) : (
                              <strong><span>Undefined</span></strong>
                            )}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-2'>
                                        <center><img src={selectedItemId.image} alt="" width="140" /></center>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-8'>
                                        <p className='textoSeparadorModal'>
                                            <b>Nombre:</b>&nbsp;{selectedItemId.name}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>S&iacute;mbolo:</b>&nbsp;<span className='textoMayus'>{selectedItemId.symbol}</span>
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Precio Actual:</b>&nbsp;{selectedItemId.current_price}<span className='textoUSDModal'>$</span>
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Capitalizaci&oacute;n de Mercado:</b>&nbsp;{selectedItemId.market_cap}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Clasificaci&oacute;n de Cap. de Mercado:</b>&nbsp;{selectedItemId.market_cap_rank}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Valoraci&oacute;n Completamente Diluida:</b>&nbsp;{selectedItemId.fully_diluted_valuation}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Volumen Total:</b>&nbsp;{selectedItemId.total_volume}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>M&iacute;nimo en 24H:</b>&nbsp;{selectedItemId.low_24h}<span className='textoUSDModal'>$</span>
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>M&aacute;ximo en 24H:</b>&nbsp;{selectedItemId.high_24h}<span className='textoUSDModal'>$</span>
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Diferencia de Precio en 24H:</b>&nbsp;{selectedItemId.price_change_24h}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Porcentaje de Cambio de Precio en 24H:</b>&nbsp;{selectedItemId.price_change_percentage_24h}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Cambio de Capitalizaci&oacute;n Burs&aacute;til en 24H:</b>&nbsp;{selectedItemId.market_cap_change_24h}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Porcentaje de Cambio de Capitalizaci&oacute;n Burs&aacute;til en 24H:</b>&nbsp;{selectedItemId.market_cap_change_percentage_24h}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Oferta Circulante:</b>&nbsp;{selectedItemId.circulating_supply}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Oferta Total:</b>&nbsp;{selectedItemId.total_supply}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Oferta M&aacute;xima:</b>&nbsp;{selectedItemId.max_supply}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>ATH:</b>&nbsp;{selectedItemId.ath}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Porcentaje de Cambio en ATH:</b>&nbsp;{selectedItemId.ath_change_percentage}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Fecha ATH:</b>&nbsp;{selectedItemId.ath_date ? (
                                                <>
                                                  {new Date(selectedItemId.ath_date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                  })}&nbsp;
                                                  {new Date(selectedItemId.ath_date).toISOString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                  }).split('T')[1].split('.')[0]}
                                                </>
                                              ) : (
                                                <> Cargando... </>
                                              )}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>ATL:</b>&nbsp;{selectedItemId.atl}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Porcentaje de Cambio en ATL:</b>&nbsp;{selectedItemId.atl_change_percentage}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Fecha ATL:</b>&nbsp;{selectedItemId.atl_date ? (
                                                <>
                                                  {new Date(selectedItemId.atl_date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                  })}&nbsp;
                                                  {new Date(selectedItemId.atl_date).toISOString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                  }).split('T')[1].split('.')[0]}
                                                </>
                                              ) : (
                                                <> Cargando... </>
                                              )}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>Porcentaje de Cambio pasado 1 hora:</b>&nbsp;{selectedItemId.price_change_percentage_1h_in_currency}
                                        </p>
                                        <p className='textoSeparadorModal'>
                                            <b>&Uacute;ltima Actualizaci&oacute;n:</b>&nbsp;{selectedItemId.last_updated ? (
                                                <>
                                                  {new Date(selectedItemId.last_updated).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                  })}&nbsp;
                                                  {new Date(selectedItemId.last_updated).toISOString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                  }).split('T')[1].split('.')[0]}
                                                </>
                                              ) : (
                                                <> Cargando... </>
                                              )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="danger" onClick={handleClose}>
                              Cerrar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                    
                  </td>
                </tr>
              ))}

          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>
    </>
  )
}

export default TablaMoneda