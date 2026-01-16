import React from 'react'
import coin from 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h'
import Header from '../components/Header'
import TM from '../components/tablaMoneda'

const Index = () => {

    let mon = coin

    return (
        <>
            <div className='container'>
                <Header />
                <TM 
                    m={mon} 
                />
            </div>
        </>
    )
}

export default Index