import React from 'react'

function App() {
    const [quote, setQuote] = React.useState('')

    const fetchQuote = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/quote')
        console.log(response)

    }

    return (
        <>
            <h1>
                Hello World
            </h1>
            <button onClick={fetchQuote}>
                Get Quote
            </button>
        </>
    )
}

export default App
