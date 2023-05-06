
let videos = null;
async function traerDatos(){
    await fetch('datos.json')
        .then(x =>x.json())
        .then(x =>{
            console.log(x)
            videos = x
        })
}
const containerVideosRight = document.getElementById("containerVideosRight")

async function maquetarDatos(){
    await traerDatos()
     console.log(videos);
    rellenarDatos(videos)
}
function rellenarDatos(list){
list.forEach(e => {
        containerVideosRight.innerHTML += 
        '<div class="videos__ver" id="'+e.id+'" >'+
        '<div>'+
            '<img src="'+e.portada+'" alt="'+e.id+'">'+
        '</div>'+
        '<div>'+
            '<div>'+
                '<h4>'+e.titulo+'</h4>'+
            '</div>'+
            '<div>'+
                e.canal+
            '</div>'+
        '</div>'+
    '</div>'
    });
}
maquetarDatos()
//seleccionar video
containerVideosRight.addEventListener("click",function(x){
    console.log(x.target.id);
    console.log(x.target.alt);
    let idVideo;
    if(x.target.id.length > 0){
        idVideo = x.target.id
    }else if(x.target.alt.length > 0){
        idVideo = x.target.alt

    }
    let videoPrincipal = videos.filter(video =>video.id == idVideo)
    console.log(videoPrincipal[0]);
    escogerVideoPrincipal(videoPrincipal[0])
})

function escogerVideoPrincipal(video){
containerVideoPrincipal.innerHTML = 
'<div class="container__video--main">'+
'    <video src="'+video.src+'" controls></video>'+
'</div>'+
'<div class="container__video--info">'+
'    <div>'+
'        <h2>'+video.titulo+'</h2>'+
'    </div>'+
'    <div class="container__btns--video">'+
'        <div class="container__profile--channel">'+
'            <div>'+
'                <img src="imgs/usuario.png" alt="">'+
'            </div>'+
'            <div>'+
'                <h4>'+video.canal+'</h4>'+
'                <small>2M de subscriptores</small>'+
'            </div>'+
'            <div>'+
'                <input class="btnSubscribirme"type="button" value="Subscribirme">'+
'            </div>'+
'        </div>'+
'        <div class="container__btns--interaction">'+
'            <div class="btns__likes">   '+
'                <div>'+
'                    <button class="btn__like">'+
'                        <img src="imgs/like.svg" alt="">'+
'                        <small>'+
                            video.megusta    +
'                        </small>'+
'                    </button>'+
'                </div>'+
'                <div>'+
'                    <button class="btn__dislike">'+
'                        <img src="imgs/like.svg" alt="">'+
'                        '+
'                    </button>'+
'                </div>'+
'            </div>'+
'            <div class="container__btnCompartir">'+
'                '+
'                <button class="btnCompartir">'+
'                    <div>'+
'                        <img  src="imgs/compartir.svg" alt="">'+
'                    </div>'+
'                    <div>'+
'                        <small>Compartir</small>'+
'                    </div>'+
'                </button>'+
'            </div>'+
'            <div>'+
'                <button class="btnTresPuntos">'+
'                    <img src="imgs/tresPuntos.svg" alt="">'+
'                </button>'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="container__vide--description">'+
'        <div>'+
'            <h4>'+video.visualizaciones+' visualizaciones &nbsp; '+video.fecha+'</h4> '+
'        </div>'+
'        <div>'+
'            <p> '+video.descripcion+'</p>'+
'        </div>'+
'    </div>'+
'    <div class="container__video--comentarios">'+
'        <div class="comentarios--header">'+
'            <div>'+
'                <p>'+video.comentarios.length+' comentarios</p>'+
'            </div>'+
'            <div>'+
'                <img src="imgs/filtrar.svg" alt=""> '+
'                Ordenar por'+
'            </div>'+
'        </div>'+
'        <div class="comentarios--crear">'+
'            <div>'+
'                <img src="imgs/usuario.png" alt="">'+
'            </div>'+
'            <div>'+
'                <input type="text" placeholder="Añade un comentario...">'+
'            </div>'+
'        </div>'+
'        <div class="container__comentarios">'
        video.comentarios.forEach(element => {
            let containerComentarios = document.querySelector(".container__comentarios")
            containerComentarios.innerHTML +=
'            <div class="comentario--detalle">'+
'                <div class="comentario--detalle--avatar">'+
'                    <img src="imgs/usuario.png" alt="">'+
'                </div>'+
'                <div>'+
'                    <div>'+
'                        <h4>'+element.nombre+'<span>&nbsp; hace 2 semanas</span></h4>'+
'                    </div>'+
'                    <div>'+
                           element.comentario +
'                    </div>'+
'                    <div class="comentario--likes">'+
'                        <img src="imgs/like.svg" alt=""> <p>'+element.megusta+'</p>'+
'                        <img class="dislike" src="imgs/like.svg" alt="">'+
'                        <span>Responder</span>'+
'                    </div>'+
'                </div>'+
'            </div>'
        });
        

'        </div>'+
'    </div>'+
'</div>'
}
const containerVideoPrincipal = document.getElementById("containerVideoPrincipal")

/* ENVIAR COMENTARIOS */
let btnComentar = document.getElementById("btnComentar")
let inputComentario = document.getElementById("inputComentario")
btnComentar.addEventListener("click",(x)=>{
    let data = {
        id:"1",
        contenidoComentario:{
            "nombre":"alonso",
            "comentario":inputComentario.value,
            "megusta":"0"
        }
    }
    fetch('http://localhost:3000/comentarios',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(x =>console.log(x))
    .catch(z =>{
        console.log("error al enviar");
    })
})

/*  */
