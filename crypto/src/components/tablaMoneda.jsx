import axios from 'axios'
import { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TablaMoneda = () => {

  const [data, setData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h"

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

  const ultimoElemento = data.slice(-1)[0];

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

  return (
    <>
      <div className='row'>
        <div className="alert alert-primary" role="alert">
          <strong>&Uacute;ltima Actualizaci&oacute;n:</strong>
          {ultimoElemento ? (
            <>
              &nbsp;{new Date(ultimoElemento.last_updated).toLocaleDateString()}&nbsp;
              {new Date(ultimoElemento.last_updated).toLocaleTimeString()}
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
              {data.map((character) => ( 
                <tr key={character.id}>
                  <td><img src={character.image} width="30" height="30" /></td>
                  <td>{character.name}</td>
                  <td><p className='textoMayus'>{character.symbol}</p></td>
                  <td>{character.current_price}</td>
                  <td>
                    <center><a className="btn btn-primary btn-sm" key={character.id} onClick={() => handleShow(character)} >Ver Detalles</a></center>
                    {show && (
                      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Mostrando Detalles de la Crypto: {selectedItemId ? (
                              <strong><span>{selectedItemId.name}</span></strong>
                            ) : (
                              <strong><span>Undefined</span></strong>
                            )}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <img src={selectedItemId.image} alt="" width={300} />
                                    </div>
                                    <div className='col-6'>
                                        <h5>
                                            <b>Nombre:</b>&nbsp;{selectedItemId.name}
                                        </h5>
                                        <h5>
                                            <b>Idioma:</b>&nbsp;{selectedItemId.symbol}
                                        </h5>
                                        <h5>
                                            <b>Nombre:</b>&nbsp;{selectedItemId.current_price}
                                        </h5>
                                        <h5>
                                            <b>Nombre:</b>&nbsp;{selectedItemId.last_updated}
                                        </h5>
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