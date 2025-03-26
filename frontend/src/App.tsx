import React from 'react'
import './App.css'

function App() {
    const [quote, setQuote] = React.useState('')
    const [author, setAuthor] = React.useState('')

    const fetchQuote = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/quote')
        const data = await response.json()

        setQuote(data.text)
        setAuthor(data.author)
    }

    React.useEffect(() => {
        fetchQuote().then()
    }, [])

    return (
        <>
            <div className={"center"} onClick={fetchQuote}>
                <div className={"quote-box"}>
                    <p>{quote}</p>
                </div>
                <div>
                    <p>{author}</p>
                </div>
                <br></br>
            </div>
        </>
    )
}

export default App
