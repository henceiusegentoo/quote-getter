import React from 'react'
import './App.css'
import {
    AppBar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

function App() {
    const [quote, setQuote] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [localization, setLocalization] = React.useState({})
    const [cryptoInfo, setCryptoInfo] = React.useState([])

    const fetchLocalization = async () => {
        const method = 'POST'
        const headers = {
            'Content-Type': 'application/json'
        }

        const body = {
            country_code: localStorage.getItem('countryCode') || 'en_US'
        }

        const response = await fetch("http://127.0.0.1:8080/api/localization", {
            method,
            headers,
            body: JSON.stringify(body)
        })

        const data = await response.json()

        setLocalization(data)
    }

    function getRealLocalization(field: string) {
        return localization[field] || field
    }

    const updateLocalization = (countryCode: string) => () => {
        localStorage.setItem('countryCode', countryCode)
        fetchLocalization().then()
    }

    const fetchQuote = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/quote')
        const data = await response.json()

        setQuote(data.text)
        setAuthor(data.author)
    }

    const fetchCryptoInfo = async () => {
        const url = "https://api.coincap.io/v2/assets"

        const response = await fetch(url)
        const data = await response.json()

        const cryptoInfo = data.data

        const sliceMax = 10

        const topCryptoInfo = cryptoInfo.slice(0, sliceMax).map((crypto: { id: string; marketCapUsd: string }) => {
            return {
                name: crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1),
                marketCap: parseFloat(crypto.marketCapUsd).toLocaleString('de-DE', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            }
        })

        setCryptoInfo(topCryptoInfo)
    }

    React.useEffect(() => {
        fetchQuote().then()
    }, [])

    React.useEffect(() => {
        fetchLocalization().then()
    }, [])

    React.useEffect(() => {
        fetchCryptoInfo().then()
    }, [])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>

            <Container
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box>
                    <AppBar position={"static"}>
                        <Toolbar variant={"dense"}>
                            <Typography variant={"h6"} color={"inherit"} component={"div"} sx={{flexGrow: 1}}>
                                {getRealLocalization("headline")}
                            </Typography>

                            <Button onClick={updateLocalization('de_DE')}>
                                Deutsch
                            </Button>

                            <Button onClick={updateLocalization('en_US')}>
                                English
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Box sx={{
                            bgcolor: 'action.disabledBackground',
                            p:2,
                            my:2,
                            cursor: 'pointer',
                            userSelect: 'none',
                            ":hover": {"bgcolor": "action.hover"},
                            boxShadow: 1,
                         }}
                         onClick={fetchQuote}
                    >
                        {/* Heading */}
                        <Typography sx={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
                            {getRealLocalization("quotedescriptor")}
                        </Typography>

                        {/* Quote */}
                        <Typography sx={{fontSize: 18, textAlign: 'center'}}>
                            {quote}
                        </Typography>

                        {/* Author */}
                        <Typography sx={{fontSize: 14, textAlign: 'center'}}>
                            {author}
                        </Typography>
                    </Box>

                    <Box sx={{
                            bgcolor: 'action.disabledBackground',
                            p:2,
                            boxShadow: 1,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                         }}
                    >

                        {/* Heading */}
                        <Typography sx={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
                            {getRealLocalization("cryptodescriptor")}
                        </Typography>

                        {/* Crypto Info */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx = {{fontWeight: 'bold'}}>
                                            {getRealLocalization("cryptoname")}
                                        </TableCell>
                                        <TableCell sx = {{fontWeight: 'bold'}}>
                                            {getRealLocalization("marketcap")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {cryptoInfo.map((crypto, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {crypto.name}
                                            </TableCell>
                                            <TableCell>
                                                ${crypto.marketCap}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}

export default App
