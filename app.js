/**
* using tutorial by Raddy on youtube
*/

// Imports
const express = require('express')
const app = express()
const port = 3000

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) =>{
    res.render('index')
})

app.get('/about', (req, res) =>{
    res.render('about', {text: "what's this about?"})
})

app.get('/four', (req, res) =>{
    res.render('four', {})
})

app.get('/nat', (req, res) =>{
    res.render('nat', {})
})
// Listen on port 300
app.listen(port, () => console.info(`Listening on port ${port}`))