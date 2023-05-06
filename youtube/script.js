const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
app.get('/comentarios',(req,res)=>{
  res.send("comentarios aqui")
})



//-------------------------------
const fs = require("fs");
var data = fs.readFileSync("datos.json");
var myObject = JSON.parse(data);

function crearComentario(id,comentario){
   let listaVideos =  myObject.filter(x => x.id == id)
   
   listaVideos[0].comentarios.push(comentario)
    console.log(listaVideos);
  /*  var newData2 = JSON.stringify(listaVideos);er6n abmt 07
  //debes eliminar el que ya existe y meterle el nuevo y luego modificar el archivo datos.json

    fs.writeFile("datos.json", newData2, (err) => {
      
    let data = fs.readFileSync("datos.json");
    let  myObjectd = JSON.parse(data);

    }); */

}

app.post('/comentarios',function(req,res){
  let data = req.body
  let idVideo= data.id
  
  crearComentario(parseInt(idVideo),data.contenidoComentario)
})

app.listen('3000',(x)=>{
console.log("escuchando puerto aqui");
})

  

  
