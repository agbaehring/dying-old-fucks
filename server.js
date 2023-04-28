// Vi importerer de nødvendige pakker: express, cors, multer og body-parser
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')
const audio_data = require('./audio_data.json');

// Vi konfigurerer multer-upload-stien
//const upload = multer({ dest: './sounds' })

// Vi opretter en instans af express-appen
const app = express()

// Vi tilføjer CORS middleware til at håndtere kryds-domæne-anmodninger
app.use(
    cors({
      origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5500/index.html"],
      method: ["GET", "POST"],
      credentials: true,
    })
);

// Vi angiver, hvilken port serveren skal lytte på
const port = 5001

// Vi bruger body-parser middleware til at parse anmodningens krop
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Vi opretter en multer-diskStorage-konfiguration, som angiver hvor filen skal gemmes og hvordan filen skal navngives
const storage = multer.diskStorage({
    filename:function (req, file,cb){
        cb(null, file.originalname)
    },
    destination: function (req, file, cb ){
        cb(null, './sounds') // her gemmer jeg filen i en mappe der hedder sounds og som køre specifikt på mit device
    },
})

const upload = multer({ storage: storage })

// Vi opretter en route, der håndterer filupload og sender en succesmeddelelse, hvis uploadet er lykkedes
app.post('/upload_files', upload.any('file'), (req, res) => {
    res.send({ message: 'Successfully uploaded files' })
})

app.post('/die', (req, res) => {
    let audio_object = {}
    for (let i = 0; i < audio_data.length; i++)
    {
        if (req.body.almostDeadPerson == audio_data[i]["audio"]["elderlyPersonName"]) {
            audio_object = audio_data[i]["audio"]
            console.log("Name is " + req.body.almostDeadPerson);
        }
    } 
    //console.log(audio_object)
    res.send({ message: 'diwweeeeee' })
})
// makie das app.get (listen for elderly rasperry pi requests)
// then find da id of da dying person
// parse json
// find da matching id
// 
// alternative way (a way that works) (fuck youuu)
// res send html with sound 
// also res send js file that clicks play

// Vi lytter på den angivne port og logger en besked, når serveren er startet
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
