
psychrolib.SetUnitSystem (psychrolib.SI)

/////////////////////////////////////////////////////////////////////////
//////////////         CLIMA      //////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function getRandomNumberBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

let ruleta
ruleta = getRandomNumberBetween(1,27)

const ruleta_fija = ruleta
let dado

// --variables para llamar a los select por el id
let $provincia = document.getElementById('provincia') // categoría estaciones
let $departamento = document.getElementById('departamento') // categoría provincias o distritos

//let $valor_k = document.getElementById('valor_k')

let temp_min_ext

let primer_numero
let primer_codigo
let primer_distrito
let primera_estacion
let primera_tmnd

estacionData()
async function estacionData() {

  let e_lista_unica = []

  let e_numeros = []
  let e_codigos = []
  let e_distritos = []
  let e_estaciones = []
  let e_latitudes = []
  let e_longitudes = []
  let e_ggdds = []
  let e_zonas = []
  let e_tmnds = []

  const response = await fetch('0_estaciones_prueba.csv');
  const data = await response.text();

  let template = ''
  let template2 = ''

  const filas = data.split('\n').slice(1);

  filas.forEach(elemento => { //acá arranca el loop por el csv, cada fila es elemento

    const fila = elemento.split(',');

    const e_numero = fila[0];
    const e_codigo = fila[1];
    const e_distrito = fila[2];
    const e_estacion = fila[3];
    const e_latitud = fila[4];
    const e_longitud = fila[5];
    const e_ggdd = fila[6];
    const e_zona = fila[7];
    const e_tmnd = fila[8];

    e_numeros.push(e_numero)
    e_codigos.push(e_codigo)
    e_distritos.push(e_distrito)
    e_estaciones.push(e_estacion)
    e_latitudes.push(e_latitud)
    e_longitudes.push(e_longitud)
    e_ggdds.push(e_ggdd)
    e_zonas.push(e_zona)
    e_tmnds.push(e_tmnd)


  })

  // Acá puedo encontrar cualquier elemento de la lista con el índice de e_numero
  //console.log(e_estaciones[0])

  let codigos_unicos = []
  let distritos_unicos = []

  // acá tengo que aprovechar a meter el primer elemento

  for(let i=0;i<e_codigos.length;i++){
    if(e_codigos[i]==e_codigos[i-1]){
    }else{
      codigos_unicos.push(parseFloat(e_codigos[i]))
      distritos_unicos.push(e_distritos[i])
    }
  }


  obtener_localstorage()

  function obtener_localstorage(){

    if(localStorage.getItem("climatologia")){

      let ok_haydata = JSON.parse(localStorage.getItem("climatologia"))

      for(let i=0;i<e_numeros.length;i++){

        if(e_estaciones[i] == ok_haydata.ls_estacion){

          template = `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`

          template2 = `<option class="form-control" value="${e_codigos[i]}">${e_distritos[i]}</option>`

          primer_codigo = e_codigos[i]
          primer_distrito = e_distritos[i]
          primera_estacion = e_estaciones[i]
          primera_tmnd = e_tmnds[i]

          for(let i=0;i<e_codigos.length;i++){
            if(e_codigos[i]==primer_codigo && e_estaciones[i]!=primera_estacion){
              template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`
            }else{
            }
          }

          let conjunto_de_distritos = []
          let conjunto_de_codigos = []

          for(let i=0;i<e_distritos.length;i++){
            if(e_distritos[i]!=e_distritos[i+1]){
              conjunto_de_distritos.push(e_distritos[i])
              conjunto_de_codigos.push(e_codigos[i])
            }else{
            }
          }


          for(let i=0;i<conjunto_de_distritos.length;i++){

            if(conjunto_de_distritos[i]==primer_distrito){
            }else{
              template2 += `<option class="form-control" value="${conjunto_de_codigos[i]}">${conjunto_de_distritos[i]}</option>`
            }

          }


        }else{

        }

      }


      $provincia.innerHTML = template;
      $departamento.innerHTML = template2;


    }else{

      for(let i=0;i<distritos_unicos.length;i++){

        if(codigos_unicos[i]==ruleta_fija){
          // lo mando primero a la lista
          primer_distrito = distritos_unicos[i]
          template2 +=`<option class="form-control" value="${codigos_unicos[i]}">${distritos_unicos[i]}</option>`
        }else{
          //
        }
      }

      for(let i=0;i<distritos_unicos.length;i++){
        if(codigos_unicos[i]!=ruleta_fija){
          template2 +=`<option class="form-control" value="${codigos_unicos[i]}">${distritos_unicos[i]}</option>`
        }else{
          //
        }
      }

      let conjunto_codigos = []
      let conjunto_estaciones = []
      let conjunto_tmnd = []
      let conjunto_numeros = []

      for(let i=0;i<e_numeros.length;i++){
        if(e_codigos[i]==ruleta_fija){
          conjunto_codigos.push(e_codigos[i])
          conjunto_estaciones.push(e_estaciones[i])
          conjunto_tmnd.push(e_tmnds[i])
          conjunto_numeros.push(e_numeros[i])
          //template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`
        }else{
          // 
        }
      }

      let dado2
      dado2=getRandomNumberBetween(1,conjunto_estaciones.length)

      let primer_numero

      primer_codigo = conjunto_codigos[dado2-1]
      primera_estacion = conjunto_estaciones[dado2-1]
      primera_tmnd = conjunto_tmnd[dado2-1]
      primer_numero = conjunto_numeros[dado2-1]

      template = `<option class="form-control" value="${primer_numero}">${conjunto_estaciones[dado2-1]}</option>`

      for(let i=0;i<conjunto_estaciones.length;i++){
        //console.log("probando el for")
        if(conjunto_estaciones[i]!=conjunto_estaciones[dado2-1]){
          template += `<option class="form-control" value="${conjunto_numeros[i]}">${conjunto_estaciones[i]}</option>`
        }else{
          // 
        }
      }

      $provincia.innerHTML = template;
      $departamento.innerHTML = template2;

      guardar_localstorage()

      function guardar_localstorage(){

        let entrada = {
          ls_codigo: primer_codigo,
          ls_distrito: primer_distrito,
          ls_estacion: primera_estacion,
          ls_tmnd: parseFloat(primera_tmnd)
        }

        localStorage.setItem("climatologia", JSON.stringify(entrada));

      }

    }

  }

}

//ESCUCHADOR SELECTOR PROVINCIA
$departamento.addEventListener('change', () => {

  const numero_distrito_elegido = $departamento.value

  estacionData()

  async function estacionData() {

    let e_numeros = []
    let e_codigos = []
    let e_distritos = []
    let e_estaciones = []
    let e_latitudes = []
    let e_longitudes = []
    let e_ggdds = []
    let e_zonas = []
    let e_tmnds = []

    const response = await fetch('0_estaciones_prueba.csv');
    const data = await response.text();

    const filas = data.split('\n').slice(1);

    filas.forEach(elemento => { //acá arranca el loop por el csv, cada fila es elemento

      const fila = elemento.split(',');

      const e_numero = fila[0];
      const e_codigo = fila[1];
      const e_distrito = fila[2];
      const e_estacion = fila[3];
      const e_latitud = fila[4];
      const e_longitud = fila[5];
      const e_ggdd = fila[6];
      const e_zona = fila[7];
      const e_tmnd = fila[8];

      e_numeros.push(e_numero)
      e_codigos.push(e_codigo)
      e_distritos.push(e_distrito)
      e_estaciones.push(e_estacion)
      e_latitudes.push(e_latitud)
      e_longitudes.push(e_longitud)
      e_ggdds.push(e_ggdd)
      e_zonas.push(e_zona)
      e_tmnds.push(e_tmnd)


    })



    let cuenta_codigos_distritos = []
    let cuenta_nombres_distritos = []

    for(let i=0;i<e_codigos.length;i++){
      if(e_codigos[i]!=e_codigos[i+1]){
        cuenta_codigos_distritos.push(e_codigos[i])
        cuenta_nombres_distritos.push(e_distritos[i])
      }
    }

    for(let i=0;i<cuenta_codigos_distritos.length;i++){
      if(cuenta_codigos_distritos[i]==numero_distrito_elegido){
        primer_codigo=cuenta_codigos_distritos[i]
        primer_distrito=cuenta_nombres_distritos[i]
      }
    }

    let conjunto_estaciones = []

    for(let i=0;i<e_estaciones.length;i++){
      if(e_distritos[i]==primer_distrito){
        conjunto_estaciones.push(e_estaciones[i])
      }
    }

    let template

    let dado3
    dado3=getRandomNumberBetween(1,conjunto_estaciones.length)

    primera_estacion = conjunto_estaciones[dado3-1]

    for(let i=0;i<e_numeros.length;i++){

      if(e_estaciones[i]==primera_estacion){

        primer_numero=e_numeros[i]
        primer_codigo=e_codigos[i]
        primera_tmnd=e_tmnds[i]
      }
    }

    template = `<option class="form-control" value="${primer_numero}">${primera_estacion}</option>`

    for(let i=0;i<e_estaciones.length;i++){

      if(e_distritos[i]==primer_distrito){

        if(e_estaciones[i]!=primera_estacion){
          template += `<option class="form-control" value="${e_numeros[i]}">${e_estaciones[i]}</option>`
        }

      }
    }

    $provincia.innerHTML = template

    guardar_localstorage()

    function guardar_localstorage(){

      let entrada = {
        ls_codigo: primer_codigo,
        ls_distrito: primer_distrito,
        ls_estacion: primera_estacion,
        ls_tmnd: parseFloat(primera_tmnd)
      }

      localStorage.setItem("climatologia", JSON.stringify(entrada));

    }

    window.location.reload()
    //canvas_base()
    //obtener_localstorage()
    //leer_la_tabla()

  }

})


//ESCUCHADOR SELECTOR ESTACIÓN CLIMÁTICA
$provincia.addEventListener('change', () => {

  estacionData()

  async function estacionData() {

    let e_numeros = []
    let e_codigos = []
    let e_distritos = []
    let e_estaciones = []
    let e_latitudes = []
    let e_longitudes = []
    let e_ggdds = []
    let e_zonas = []
    let e_tmnds = []

    const response = await fetch('0_estaciones_prueba.csv');
    const data = await response.text();

    const filas = data.split('\n').slice(1);

    filas.forEach(elemento => { //acá arranca el loop por el csv, cada fila es elemento

      const fila = elemento.split(',');

      const e_numero = fila[0];
      const e_codigo = fila[1];
      const e_distrito = fila[2];
      const e_estacion = fila[3];
      const e_latitud = fila[4];
      const e_longitud = fila[5];
      const e_ggdd = fila[6];
      const e_zona = fila[7];
      const e_tmnd = fila[8];

      e_numeros.push(e_numero)
      e_codigos.push(e_codigo)
      e_distritos.push(e_distrito)
      e_estaciones.push(e_estacion)
      e_latitudes.push(e_latitud)
      e_longitudes.push(e_longitud)
      e_ggdds.push(e_ggdd)
      e_zonas.push(e_zona)
      e_tmnds.push(e_tmnd)


    })

    primer_codigo = e_codigos[$provincia.value-1]
    primer_distrito = e_distritos[$provincia.value-1]
    primera_estacion = e_estaciones[$provincia.value-1]
    primera_tmnd = e_tmnds[$provincia.value-1]

    guardar_localstorage()

    function guardar_localstorage(){

      let entrada = {
        ls_codigo: primer_codigo,
        ls_distrito: primer_distrito,
        ls_estacion: primera_estacion,
        ls_tmnd: parseFloat(primera_tmnd)
      }

      localStorage.setItem("climatologia", JSON.stringify(entrada));

    }


    window.location.reload()

  }

})

/////////////////////////////////////////////////////////////////////////
//////////////         TIPOLOGÍA      //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// conecta al DOM

let $elemento_dom = document.getElementById('elemento_dom')

// ESCUCHADOR PARA CAMBIO DE ELEMENTO (TIPOLOGÍA)
$elemento_dom.addEventListener('change', () => {

  algo2()

  function algo2(){
    console.log("click en vaciar")
  
    let db
    const request = indexedDB.open('listado',1)
  
    request.onsuccess = () => {
      db = request.result
      clearData()
    }
  
    function clearData() {
      const transaction = db.transaction(["capas"], "readwrite")
      transaction.oncomplete = (event) => {
        console.log("transacción completa")
      }
  
      transaction.onerror = (event) => {
        console.log("error en la transacción")
      }
  
      const objectStore = transaction.objectStore("capas")
  
      const objectStoreRequest = objectStore.clear()
  
      objectStoreRequest.onsuccess = (event) => {
        console.log("lista vaciada")
      }
    }
  
      window.location.reload()
  
  }


  if($elemento_dom.value == "valor_muro"){
    localStorage.setItem("Tipo","Muro")

    
  }

  if($elemento_dom.value == "valor_cubierta"){
    localStorage.setItem("Tipo","Cubierta")

    algo2()

    function algo2(){
      console.log("click en vaciar")
    
      let db
      const request = indexedDB.open('listado',1)
    
      request.onsuccess = () => {
        db = request.result
        clearData()
      }
    
      function clearData() {
        const transaction = db.transaction(["capas"], "readwrite")
        transaction.oncomplete = (event) => {
          console.log("transacción completa")
        }
    
        transaction.onerror = (event) => {
          console.log("error en la transacción")
        }
    
        const objectStore = transaction.objectStore("capas")
    
        const objectStoreRequest = objectStore.clear()
    
        objectStoreRequest.onsuccess = (event) => {
          console.log("lista vaciada")
        }
      }
    
        window.location.reload()
    
    }

    
  }

  if($elemento_dom.value == "valor_solado"){
    localStorage.setItem("Tipo","Solado")

    algo2()

    function algo2(){
      console.log("click en vaciar")
    
      let db
      const request = indexedDB.open('listado',1)
    
      request.onsuccess = () => {
        db = request.result
        clearData()
      }
    
      function clearData() {
        const transaction = db.transaction(["capas"], "readwrite")
        transaction.oncomplete = (event) => {
          console.log("transacción completa")
        }
    
        transaction.onerror = (event) => {
          console.log("error en la transacción")
        }
    
        const objectStore = transaction.objectStore("capas")
    
        const objectStoreRequest = objectStore.clear()
    
        objectStoreRequest.onsuccess = (event) => {
          console.log("lista vaciada")
        }
      }
    
        window.location.reload()
    
    }

    
  }

  location.reload()

})

// ALMACENA OPCIÓN DE TIPOLOGÍA
localStorage.setItem("Clave", "Valor")
localStorage.removeItem("Clave", "Valor")


if(localStorage.getItem("Tipo")==null){
  localStorage.setItem("Tipo","Muro")  
  let selector_tipo = `
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `
  $elemento_dom.innerHTML = selector_tipo

}else if(localStorage.getItem("Tipo")=="Muro"){
  let selector_tipo = `
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `
  $elemento_dom.innerHTML = selector_tipo

}else if(localStorage.getItem("Tipo")=="Cubierta"){

  let selector_tipo = `
  <option class="form-control" value="valor_cubierta">Cubierta</option>
  <option class="form-control" value="valor_muro">Muro</option>
  <option class="form-control" value="valor_solado">Solado</option>
  `
  $elemento_dom.innerHTML = selector_tipo    

}else if(localStorage.getItem("Tipo")=="Solado"){

  let selector_tipo = `
    <option class="form-control" value="valor_solado">Solado</option>        
    <option class="form-control" value="valor_cubierta">Cubierta</option>
    <option class="form-control" value="valor_muro">Muro</option>          
  `
  $elemento_dom.innerHTML = selector_tipo  
}  


/////////////////////////////////////////////////////////////////////////
//////////////         MATERIALES          //////////////////////////////////
/////////////////////////////////////////////////////////////////////////

let $categoria_dom = document.getElementById('categoria_dom') // conectando con el selector DOM
let $nombre_dom = document.getElementById('nombre_dom') // conectando con el selector DOM
let $espesor_dom = document.getElementById('espesor_dom') // conectado con el input numérico espesor

let $conductividad_dom = document.getElementById('conductividad_dom') // conectado al dom - NO VISIBLE
let $resistencia_ascendente_dom = document.getElementById('resistencia_ascendente_dom') //
let $resistencia_descendente_dom = document.getElementById('resistencia_descendente_dom') //

let $permeabilidad_vapor_dom = document.getElementById('permeabilidad_vapor_dom') //
let $resistencia_vapor_dom = document.getElementById('resistencia_vapor_dom') //

const canvas = document.getElementById('sandbox')
const ctx = canvas.getContext('2d')

ctx.save()

function canvas_base(){

  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = "white"
  ctx.fillRect(0,0, canvas.width, canvas.height)
 
}

let selector_nombre = ''

materialData1()

async function materialData1(){

  // tengo que declarar las variables con "let m_columna = []" por cada columna csv

  let m_ides = []
  let m_tipos = []
  let m_categorias = []
  let m_categorias_enes = []
  let m_nombres = []
  let m_densidades = []
  let m_conductividades = []
  let m_capacidades_termicas = []
  let m_espesores = []
  let m_resistencias_ascendentes = []
  let m_resistencias_descendentes = []
  let m_permeancias = []
  let m_permeabilidades = []
  let m_contenidos_energeticos = []
  let m_emisiones = []

  const response = await fetch('materiales.csv');
  const data = await response.text();

  let selector_categoria = ''


  const filas = data.split('\n').slice(1);

  filas.forEach(elemento => {

    const fila = elemento.split(',');

    const m_id = fila[0];
    const m_tipo = fila[1];
    const m_categoria = fila[2];
    const m_categoria_n = fila[3];
    const m_nombre = fila[4];
    const m_densidad = fila[5];
    const m_conductividad = fila[6];
    const m_capacidad_termica = fila[7];
    const m_espesor = fila[8];
    const m_resistencia_ascendente = fila[9];
    const m_resistencia_descendente = fila[10];
    const m_permeancia = fila[11];
    const m_permeabilidad = fila[12];
    const m_contenido_energetico = fila[13];
    const m_emision = fila[14];

    m_ides.push(m_id)
    m_tipos.push(m_tipo)
    m_categorias.push(m_categoria)
    m_categorias_enes.push(m_categoria_n)
    m_nombres.push(m_nombre)
    m_densidades.push(m_densidad)
    m_conductividades.push(m_conductividad)
    m_capacidades_termicas.push(m_capacidad_termica)
    m_espesores.push(m_espesor)
    m_resistencias_ascendentes.push(m_resistencia_ascendente)
    m_resistencias_descendentes.push(m_resistencia_descendente)
    m_permeancias.push(m_permeancia)
    m_permeabilidades.push(m_permeabilidad)
    m_contenidos_energeticos.push(m_contenido_energetico)
    m_emisiones.push(m_emision)


  })

  let m_catego_ok = []

  for(let i=0;i<m_categorias.length;i++){

    if($elemento_dom.value =="valor_muro"){
      if(m_tipos[i] != "horizontales"){
        if(m_categorias[i] != m_categorias[i-1]){
          selector_categoria += `<option class="form-control" value="${m_categorias[i]}">${m_categorias[i]}</option>`
          m_catego_ok.push(m_categorias_enes[i])
        }
      }

    }else if($elemento_dom.value =="valor_cubierta"){
      if(m_tipos[i] != "camaras"){
        if(m_categorias[i] != m_categorias[i-1]){
          selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`
          m_catego_ok.push(m_categorias_enes[i])
        }     
      }

    }else if($elemento_dom.value =="valor_solado"){
      if(m_tipos[i] != "heterogeneos" && m_categorias_enes[i] && m_tipos[i] != "camaras"){
        if(m_categorias[i] != m_categorias[i-1]){
          selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`
          m_catego_ok.push(m_categorias_enes[i])
        }
      } 
    }
  }

  $categoria_dom.innerHTML = selector_categoria

  // acá tengo que agregar el llenado del selector de nombre que es para el caso primer categoria
  for(let i=0;i<m_nombres.length;i++){

    if(m_categorias_enes[0] == m_categorias_enes[i]){
      selector_nombre += `<option class="form-control" value="${m_catego_ok[i]}">${m_nombres[i]}</option>`
    }  
  }
  $nombre_dom.innerHTML = selector_nombre  
  // hasta acá llenado selector de nombre para el caso primer categoria



  for(let i=0;i<m_nombres.length;i++){

    if(m_espesores[i]>0 && $nombre_dom.value == m_ides[i]){

      // buscar el input del espesor
      $espesor_dom.value = Number(m_espesores[i])
      document.getElementById("espesor_dom").disabled = true

    }else if(m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]){
      $espesor_dom.value = 0
      document.getElementById("espesor_dom").disabled = false
    }
  }

  
}



///////////////////
/////////////////
///////////////////

// ESCUCHADOR PARA CAMBIO DE CATEGORIA
$categoria_dom.addEventListener('change', () => {

  selector_nombre = ""

  materialData2()
  async function materialData2(){

    let m_ides = []
    let m_tipos = []
    let m_categorias = []
    let m_categorias_enes = []
    let m_nombres = []
    let m_densidades = []
    let m_conductividades = []
    let m_capacidades_termicas = []
    let m_espesores = []
    let m_resistencias_ascendentes = []
    let m_resistencias_descendentes = []
    let m_permeancias = []
    let m_permeabilidades = []
    let m_contenidos_energeticos = []
    let m_emisiones = []

    const response = await fetch('materiales.csv');
    const data = await response.text();
    const filas = data.split('\n').slice(1);

    filas.forEach(elemento => {
      const fila = elemento.split(',');

      const m_id = fila[0];
      const m_tipo = fila[1];
      const m_categoria = fila[2];
      const m_categoria_n = fila[3];
      const m_nombre = fila[4];
      const m_densidad = fila[5];
      const m_conductividad = fila[6];
      const m_capacidad_termica = fila[7];
      const m_espesor = fila[8];
      const m_resistencia_ascendente = fila[9];
      const m_resistencia_descendente = fila[10];
      const m_permeancia = fila[11];
      const m_permeabilidad = fila[12];
      const m_contenido_energetico = fila[13];
      const m_emision = fila[14];

      m_ides.push(m_id)
      m_tipos.push(m_tipo)
      m_categorias.push(m_categoria)
      m_categorias_enes.push(m_categoria_n)
      m_nombres.push(m_nombre)
      m_densidades.push(m_densidad)
      m_conductividades.push(m_conductividad)
      m_capacidades_termicas.push(m_capacidad_termica)
      m_espesores.push(m_espesor)
      m_resistencias_ascendentes.push(m_resistencia_ascendente)
      m_resistencias_descendentes.push(m_resistencia_descendente)
      m_permeancias.push(m_permeancia)
      m_permeabilidades.push(m_permeabilidad)
      m_contenidos_energeticos.push(m_contenido_energetico)
      m_emisiones.push(m_emision)

    })


    let selector_categoria = ""
    let m_catego_ok = []

    for(let i=0;i<m_categorias.length;i++){

      if($elemento_dom.value =="valor_muro"){
        
        if(m_tipos[i] != "horizontales"){

          if(m_categorias[i] != m_categorias[i-1]){

            selector_categoria += `<option class="form-control" value="${m_categorias[i]}">${m_categorias[i]}</option>`
            m_catego_ok.push(m_categorias_enes[i])

            console.log(m_categorias[i])
          }
        }
  
      }else if($elemento_dom.value =="valor_cubierta"){


        if(m_tipos[i] != "camaras"){
          if(m_categorias[i] != m_categorias[i-1]){
            selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`
            m_catego_ok.push(m_categorias_enes[i])
          }     
        }
  
      }else if($elemento_dom.value =="valor_solado"){


        if(m_tipos[i] != "heterogeneos" && m_categorias_enes[i]){
          if(m_categorias[i] != m_categorias[i-1]){
            selector_categoria += `<option class="form-control" value"${m_categorias[i]}">${m_categorias[i]}</option>`
            m_catego_ok.push(m_categorias_enes[i])
          }
        } 
      }
    }

    let selector_nombre = ""

    //acá tengo que agregar el llenado del selector de nombre 
    for(let i=0;i<m_nombres.length;i++){

      if($categoria_dom.value == m_categorias[i]){
      selector_nombre += `<option class="form-control" value="${m_ides[i]}">${m_nombres[i]}</option>`
      }
    }

    $nombre_dom.innerHTML = selector_nombre


    for(let i=0;i<m_nombres.length;i++){

      if(m_espesores[i]>0 && $nombre_dom.value == m_ides[i]){

        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i])
        document.getElementById("espesor_dom").disabled = true

      }else if(m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]){
        $espesor_dom.value = 0
        document.getElementById("espesor_dom").disabled = false
      }
    }   


    for(let i=0;i<m_nombres.length;i++){

      if(m_espesores[i]>0 && $nombre_dom.value == m_ides[i]){

        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i])
        document.getElementById("espesor_dom").disabled = true

      }else if(m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]){
        $espesor_dom.value = 0
        document.getElementById("espesor_dom").disabled = false
      }
    }

  
  }
})

//ESCUCHADOR PARA CAMBIO DE NOMBRE DE MATERIAL
$nombre_dom.addEventListener('change', () =>{

  materialData3()
  async function materialData3(){

    let m_ides = []
    let m_tipos = []
    let m_categorias = []
    let m_categorias_enes = []
    let m_nombres = []
    let m_densidades = []
    let m_conductividades = []
    let m_capacidades_termicas = []
    let m_espesores = []
    let m_resistencias_ascendentes = []
    let m_resistencias_descendentes = []
    let m_permeancias = []
    let m_permeabilidades = []
    let m_contenidos_energeticos = []
    let m_emisiones = []

    const response = await fetch('materiales.csv');
    const data = await response.text();

    const filas = data.split('\n').slice(1);

    filas.forEach(elemento => {
      const fila = elemento.split(',');

      const m_id = fila[0];
      const m_tipo = fila[1];
      const m_categoria = fila[2];
      const m_categoria_n = fila[3];
      const m_nombre = fila[4];
      const m_densidad = fila[5];
      const m_conductividad = fila[6];
      const m_capacidad_termica = fila[7];
      const m_espesor = fila[8];
      const m_resistencia_ascendente = fila[9];
      const m_resistencia_descendente = fila[10];
      const m_permeancia = fila[11];
      const m_permeabilidad = fila[12];
      const m_contenido_energetico = fila[13];
      const m_emision = fila[14];

      m_ides.push(m_id)
      m_tipos.push(m_tipo)
      m_categorias.push(m_categoria)
      m_categorias_enes.push(m_categoria_n)
      m_nombres.push(m_nombre)
      m_densidades.push(m_densidad)
      m_conductividades.push(m_conductividad)
      m_capacidades_termicas.push(m_capacidad_termica)
      m_espesores.push(m_espesor)
      m_resistencias_ascendentes.push(m_resistencia_ascendente)
      m_resistencias_descendentes.push(m_resistencia_descendente)
      m_permeancias.push(m_permeancia)
      m_permeabilidades.push(m_permeabilidad)
      m_contenidos_energeticos.push(m_contenido_energetico)
      m_emisiones.push(m_emision)

    })

    for(let i=0;i<m_nombres.length;i++){

      if(m_espesores[i]>0 && $nombre_dom.value == m_ides[i]){

        // buscar el input del espesor
        $espesor_dom.value = Number(m_espesores[i])
        document.getElementById("espesor_dom").disabled = true

      }else if(m_espesores[i] == 0 && $nombre_dom.value == m_ides[i]){
        $espesor_dom.value = 0
        document.getElementById("espesor_dom").disabled = false
      }
    }



  }

})


////////////////////////////////////////
///////////////   CAPAS ///////////////
////////////////////////////////////////

// Establecer variables de acuerdo a listado iram

// ID - Número (Invisible)

// Nombre - Texto @materiales
// Espesor - Número (m) @materiales
// Lambda - Número (W/m2.K) @materiales

// Resistencia horizontal u ascendente - Número (m2.K/W) @materiales
// Resistencia descendente - Número (m2.K/W) @materiales

// Resistencia de uso - Número (m2.K/W) @elección condicional

// transmitancia térmica - Número (W/m2.K) @cálculo simple

// Temperatura - Número (ºC) @cálculo simple

// VAPOR
// Permeancia al vapor de agua - Número (g/m2.h.kPa) @materiales
// Permeabilidad al vapor de agua - Número (g/m.h.kPa) @materiales

// Resistencia al paso del vapor de agua - Número (m2.h.kPa/g) @cálculo simple o uso

// Humedad relativa - Fracción (%) @cálculo
// Presión de vapor por capa - Número (kPa) @cálculo
// Temperatura de rocío - Número (ºC) | @tabla o calculadora psicrométrica

// Delta temperatura - Número (ºC) | @cálculo

///////////////////////////////////////////////////////////////////////////////////////////

let $valor_k = document.getElementById('valor_k')

let $temp_dis_ext_dom = document.getElementById('temp_dis_ext_dom') // conectado al dom - NO VISIBLE
let $res_sup_int_dom = document.getElementById('res_sup_int_dom') // conectado al dom - NO VISIBLE


obtener_localstorage()
function obtener_localstorage(){

  if(localStorage.getItem("climatologia")){
    let ok_haydata = JSON.parse(localStorage.getItem("climatologia"))

    ctx.font = "14px Calibri";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Temp. ext.: ${ok_haydata.ls_tmnd}º C`, canvas.width/2+canvas.width/3.1, (canvas.height/3)*2.4);

    $temp_dis_ext_dom.value = Number(ok_haydata.ls_tmnd)

  }else{

  }

}

// DESDE ACÁ COPIÉ Y PEGUÉ PSYCHROLIB /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// HASTA ACÁ COPIÉ Y PEGUÉ PSYCHROLIB /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Elimina todo el bloque de código de Psychrometrics() y reemplázalo con:
//import psychrolib from './psychrolib.js'; // Asegúrate de que la ruta sea correcta.



let presion_de_vapor_int

let humedad_relativa_interior
let tmnde = Number($temp_dis_ext_dom.value)

let formula_tabla = 0

if(tmnde<3 && tmnde>-15){

  formula_tabla = .0004*(tmnde^2)+.0187*tmnde+.6968

  if(formula_tabla<.51){
    humedad_relativa_interior = .51
  }else{
  humedad_relativa_interior = formula_tabla
  }

}else if(tmnde>3){
  humedad_relativa_interior = .75
}else{
  humedad_relativa_interior = .51
}


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


const indexedDB = window.indexedDB
const form = document.getElementById('form')
const latabla = document.getElementById('latabla')

leer_la_tabla()

function leer_la_tabla(){

  if(indexedDB && form){
    let db
    const request = indexedDB.open('listado',1)


    request.onsuccess = () => {

      db = request.result
      readData()

    }

    request.onupgradeneeded = () => {

      db = request.result

      const objectStore = db.createObjectStore('capas',{
        autoIncrement: true
      })
    }

    request.onerror = (error) => {
      console.log('Error con la indexedDB', error)
    }

    // Esta es la función que entra a leer la base de datos local.
    const readData = () =>{

      const transaction = db.transaction(['capas'],'readonly')
      const objectStore = transaction.objectStore('capas')
      const request = objectStore.openCursor()

      request.onsuccess = (e) => {
        const cursor = e.target.result
        if(cursor){
          cursor.continue()
        }else{
          //console.log("no hay más capas")
        }
      }
    }

    // Este escucha el botón submit que es el simbolo +
    // Acá está agregando data a localStorage con addData(data2)
    // TENGO QUE DECLARAR CADA TIPO DE BOTÓN Y ARMAR UN EVENTLISTENER PARA CADA BOTÓN.

    form.addEventListener('submit', (e) =>{
      e.preventDefault()
      let data2
      materialData4()

      async function materialData4(){

        data2=""

        let m_ides = []
        let m_tipos = []
        let m_categorias = []
        let m_categorias_enes = []
        let m_nombres = []
        let m_densidades = []
        let m_conductividades = []
        let m_capacidades_termicas = []
        let m_espesores = []
        let m_resistencias_ascendentes = []
        let m_resistencias_descendentes = []
        let m_permeancias = []
        let m_permeabilidades = []
        let m_contenidos_energeticos = []
        let m_emisiones = []

        const response = await fetch('materiales.csv');
        const data = await response.text();

        const filas = data.split('\n').slice(1);

        filas.forEach(elemento => {

          const fila = elemento.split(',');

          const m_id = fila[0];
          const m_tipo = fila[1];
          const m_categoria = fila[2];
          const m_categoria_n = fila[3];
          const m_nombre = fila[4];
          const m_densidad = fila[5];
          const m_conductividad = fila[6];
          const m_capacidad_termica = fila[7];
          const m_espesor = fila[8];
          const m_resistencia_ascendente = fila[9];
          const m_resistencia_descendente = fila[10];
          const m_permeancia = fila[11];
          const m_permeabilidad = fila[12];
          const m_contenido_energetico = fila[13];
          const m_emision = fila[14];


          m_ides.push(m_id)
          m_tipos.push(m_tipo)
          m_categorias.push(m_categoria)
          m_categorias_enes.push(m_categoria_n)
          m_nombres.push(m_nombre)
          m_densidades.push(m_densidad)
          m_conductividades.push(m_conductividad)
          m_capacidades_termicas.push(m_capacidad_termica)
          m_espesores.push(m_espesor)
          m_resistencias_ascendentes.push(m_resistencia_ascendente)
          m_resistencias_descendentes.push(m_resistencia_descendente)
          m_permeancias.push(m_permeancia)
          m_permeabilidades.push(m_permeabilidad)
          m_contenidos_energeticos.push(m_contenido_energetico)
          m_emisiones.push(m_emision)

        })

        // Esto se está ejecutando cuando apreto el botón "+"

        if(e.target.espesor_dom.value>0){

          if($elemento_dom.value == "valor_muro"){

            // elemento muro con espesor prestablecido

            if(m_resistencias_ascendentes[e.target.nombre_dom.value]
              == m_resistencias_descendentes[e.target.nombre_dom.value]
              && Number(m_resistencias_ascendentes[e.target.nombre_dom.value])>0){

              data2 = {
                capaNumero:Number(e.target.nombre_dom.value),
                capaNombre:m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor:Number((parseFloat(e.target.espesor_dom.value).toFixed(8))/1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_ascendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              }

            }else{

              // esta opción es para elementos de muros que no tienen prestablecido el espesor

              const espesor_de_calculo = Number(parseFloat(e.target.espesor_dom.value).toFixed(8))

              data2 = {
                capaNumero:Number(e.target.nombre_dom.value),
                capaNombre:m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor:espesor_de_calculo/1000,
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat((espesor_de_calculo/1000)/m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              }
            }

          }else if($elemento_dom.value == "valor_cubierta"){

            // caso 1: materiales con valor (>0) en res_asc o valores dif. de ascente != descendente
            if(Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) >0
              || Number(m_resistencias_ascendentes[e.target.nombre_dom.value])
              != Number(m_resistencias_descendentes[e.target.nombre_dom.value])){

              data2 = {
                capaNumero:Number(e.target.nombre_dom.value),
                capaNombre:m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor:Number(parseFloat(e.target.espesor_dom.value).toFixed(8)/1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_ascendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              }

              // caso 2: materiales con valor 0 en res_ascendente

            }else if(Number(m_resistencias_ascendentes[e.target.nombre_dom.value]) == 0){
              const espesor_de_calculo = Number(parseFloat(e.target.espesor_dom.value).toFixed(8))

              data2 = {
                capaNumero:Number(e.target.nombre_dom.value),
                capaNombre:m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor:Number(parseFloat(e.target.espesor_dom.value).toFixed(8)/1000),
                capaConductividad: Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat((e.target.espesor_dom.value/1000)/m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))
              }
            }

          }else if($elemento_dom.value == "valor_solado"){

            // caso 1 : materiales con valor (>0) en res_desce y q sean diferentes asce != desce
            // la resistencia toma el valor dado para DESCENDENTE
            if(Number(m_resistencias_descendentes[e.target.nombre_dom.value])>0
            && Number(m_resistencias_ascendentes[e.target.nombre_dom.value])
            != Number(m_resistencias_descendentes[e.target.nombre_dom.value])) {

              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8)/1000),
                capaConductividad : Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_descendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))

              }

              // caso 2: materiales con valor = 0 en resist. descendente
            }else if(Number(m_resistencias_descendentes[e.target.nombre_dom.value])==0){

              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8)/1000),
                capaConductividad : Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat((e.target.espesor_dom.value/1000)/m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))

              }

            }else{

              data2 = {
                capaNumero: Number(e.target.nombre_dom.value),
                capaNombre: m_nombres[e.target.nombre_dom.value],
                capaCategoria: m_categorias[e.target.nombre_dom.value],
                capaEspesor: Number(parseFloat(e.target.espesor_dom.value).toFixed(8)/1000),
                capaConductividad : Number(parseFloat(m_conductividades[e.target.nombre_dom.value]).toFixed(8)),
                capaResistencia: Number(parseFloat(m_resistencias_descendentes[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeancia: Number(parseFloat(m_permeancias[e.target.nombre_dom.value]).toFixed(8)),
                capaPermeabilidad: Number(parseFloat(m_permeabilidades[e.target.nombre_dom.value]).toFixed(8))

              }
            }
          }

          const addData = (data) =>{

            const transaction = db.transaction(['capas'],'readwrite')
            const objectStore = transaction.objectStore('capas')
            const request = objectStore.add(data)

          }

          addData(data2)
          window.location.reload()

        }else{
          console.log("esto debería ser un mensaje de error")
        }
      }
    })
  }
}

// la temperatura de diseño interior debería variar según el Nivel A/B/C
const temp_dis_int = 18

// imprimir la temperatura interior

ctx.font = "14px Calibri"
ctx.fillStyle = "black"
ctx.textAlign = "center"
ctx.fillText(`Temp. int.:${temp_dis_int}º C`, canvas.width/6, canvas.height/4.65)






if($elemento_dom.value == "valor_muro"){
  $res_sup_int_dom.value = .13
}else if($elemento_dom.value == "valor_cubierta"){
  $res_sup_int_dom.value = .1
}else{
  $res_sup_int_dom.value = .17
}



posleer_la_tabla()
function posleer_la_tabla(){

  if(indexedDB && form){
    let db
    const request = indexedDB.open('listado',1)

    request.onsuccess = () => {
      db = request.result
      readData()
    }
    request.onupgradeneeded = () => {
      db.request.result
      const objectStore = db.createObjectStore('capas',{
        autoIncrement: true
      })
    }

    request.onerror = (error) => {
      console.log('error en el autoIncrement:', error)
    }

    const readData = () =>{

      const transaction = db.transaction(['capas'],'readonly')
      const objectStore = transaction.objectStore('capas')
      const request = objectStore.openCursor()

      const fragment = document.createDocumentFragment()

      const capaTitulo = document.createElement('P')
      capaTitulo.textContent = "Capa"
      fragment.appendChild(capaTitulo)

      const capaTitulo2 = document.createElement('P')
      capaTitulo2.textContent = "e (m)"
      fragment.appendChild(capaTitulo2)

      const capaTitulo3 = document.createElement('P')
      capaTitulo3.textContent = "Lambda (W/m.K)"
      fragment.appendChild(capaTitulo3)

      const capaTitulo4 = document.createElement('P')
      capaTitulo4.textContent = "R (m^2.K/W)"
      fragment.appendChild(capaTitulo4)

      const capaTitulo5 = document.createElement('P')
      capaTitulo5.textContent = "Temperatura"
      fragment.appendChild(capaTitulo5)

      const capaTitulo6 = document.createElement('P')
      capaTitulo6.textContent = "Aire interior"
      fragment.appendChild(capaTitulo6)

      const capaTitulo7 = document.createElement('P')
      capaTitulo7.textContent = ""
      fragment.appendChild(capaTitulo7)

      const capaTitulo8 = document.createElement('P')
      capaTitulo8.textContent = ""
      fragment.appendChild(capaTitulo8)

      const capaTitulo9 = document.createElement('P')
      capaTitulo9.textContent = $res_sup_int_dom.value
      fragment.appendChild(capaTitulo9)

      const capaTitulo10 = document.createElement('P')
      capaTitulo10.textContent = `${temp_dis_int} ºC`
      fragment.appendChild(capaTitulo10)

      // Hasta acá la primera línea de la tabla




      let ai = 1
      // declaro algunos conjuntos de datos que necesito:
      let c_capas_numeros = []
      let c_capas_nombres = []
      let c_capas_categorias = []
      let c_capas_espesores = []
      let c_capas_conductividades = []
      let c_capas_resistencias = []
      let c_capas_temp_por_capa = []
      let c_capas_gradientes_termicos = []
      let c_capas_resistencia_total = 0

      let c_capas_permeancias_vapor = []
      let c_capas_permeabilidades_vapor = []

      // a cada grupo le tengo que agregar valores de capa = Aire interior

      c_capas_numeros.push(1)
      c_capas_nombres.push("Aire interior")
      c_capas_categorias.push("No imprime")
      c_capas_espesores.push(0)
      c_capas_conductividades.push(0)
      c_capas_resistencias.push(Number($res_sup_int_dom.value))
      //c_capas_permeancias_vapor.push(0)
      //c_capas_permeabilidades_vapor.push(0)

      let c_capas_presiones_de_vapor = []

      // Esta vendría a ser la presión de vapor interior. inicial.
      c_capas_presiones_de_vapor.push(psychrolib.GetVapPresFromRelHum(temp_dis_int,humedad_relativa_interior))

      let c_capas_gradientes_termicos_acumulados = []

      // ahora debería empezar el loop

      request.onsuccess = (e) => {

        const cursor = e.target.result

        if(cursor){

          // Acá va el "loop" que crea cada capa de fragmento para la tabla
          const capaNombre = document.createElement('P')
          capaNombre.textContent = cursor.value.capaNombre
          fragment.appendChild(capaNombre)

          const capaEspesor = document.createElement('P')
          capaEspesor.textContent = cursor.value.capaEspesor
          fragment.appendChild(capaEspesor)

          const capaConductividad = document.createElement('P')
          capaConductividad.textContent = Number(parseFloat(cursor.value.capaConductividad).toFixed(2))
          fragment.appendChild(capaConductividad)

          const capaResistencia = document.createElement('P')
          capaResistencia.textContent = Number(parseFloat(cursor.value.capaResistencia).toFixed(2))
          fragment.appendChild(capaResistencia)

          // En este punto tendría que conocer las temperaturas por capa...
          // No sé que es lo que conviene.



          c_capas_numeros.push(ai+=1)
          c_capas_nombres.push(cursor.value.capaNombre)
          c_capas_categorias.push(cursor.value.capaCategoria)
          c_capas_espesores.push(Number(cursor.value.capaEspesor))
          c_capas_conductividades.push(cursor.value.capaConductividad)
          c_capas_resistencias.push(Number(cursor.value.capaResistencia))
          c_capas_permeancias_vapor.push(Number(cursor.value.capaPermeancia))
          c_capas_permeabilidades_vapor.push(Number(cursor.value.capaPermeabilidad))

          // continue() hace loop hasta terminar el listado de la base de datos local
          cursor.continue()
        }else{
          // acá terminó las vueltas por la basde de datos local
          // agrego la capa de aire exterior

          const capaTitulo11 = document.createElement('P')
          capaTitulo11.textContent = "Aire exterior"
          fragment.appendChild(capaTitulo11)

          const capaTitulo12 = document.createElement('P')
          capaTitulo12.textContent = ""
          fragment.appendChild(capaTitulo12)

          const capaTitulo13 = document.createElement('P')
          capaTitulo13.textContent = ""
          fragment.appendChild(capaTitulo13)

          const capaTitulo14 = document.createElement('P')
          capaTitulo14.textContent = ""
          fragment.appendChild(capaTitulo14)

          const capaTitulo15 = document.createElement('P')
          capaTitulo15.textContent = Number($temp_dis_ext_dom.value)
          fragment.appendChild(capaTitulo15)

          // inyectar tabla:
          //latabla.appendChild(fragment)


          c_capas_numeros.push(ai+1)
          c_capas_nombres.push("Aire exterior")
          c_capas_categorias.push("No imprime")
          c_capas_espesores.push(0)
          c_capas_conductividades.push(0)
          c_capas_resistencias.push(.04)


          const delta_temp_int_ext = Number(temp_dis_int-$temp_dis_ext_dom.value)

          //console.log("delta")
          //console.log(delta_temp_int_ext)

          // Aca dejo el condicional de que haya al menos una capa para poder calcular

          if(ai>1){

            // Condicional en caso que hay un valor K

            for(let i=0;i<c_capas_numeros.length;i++){
              c_capas_resistencia_total += Number(c_capas_resistencias[i])
            }
            //console.log(`el K es ${1/c_capas_resistencia_total}`)

            for(let i=0;i<c_capas_resistencias.length;i++){
              c_capas_gradientes_termicos.push(Number(c_capas_resistencias[i]/c_capas_resistencia_total))
            }

            // este gradiente térmico tiene que multiplicar el delta int/ext y sumarlo al valor temp_ext

            let gradiente_termico_acumulado = 0

            for(let i=0;i<c_capas_numeros.length;i++){
              gradiente_termico_acumulado += c_capas_gradientes_termicos[i]
              c_capas_gradientes_termicos_acumulados.push(gradiente_termico_acumulado)
            }

            let rulo_temperatura = temp_dis_int
            c_capas_temp_por_capa.push(rulo_temperatura)

            for(let i=0;i<c_capas_numeros.length;i++){
              rulo_temperatura = temp_dis_int-(c_capas_gradientes_termicos_acumulados[i]*delta_temp_int_ext)
              c_capas_temp_por_capa.push(rulo_temperatura)
            }

            // ACÁ SIGUE EN CASO DE QUE HAYA POR LO MENOS UN ELEMENTO:

            const margen_sup = canvas.height/12
            const margen_inf = canvas.height/12

            const margen_izquierdo = canvas.width/12
            const margen_derecho = canvas.width/12

            // las capas se tienen que generar en un loop sobre un array desde 0 hasta [i]

            let c_capas_colores = []
            let c_capas_color_por_capa

            // para algo servían las categorías...
            // hay que traerlas para aplicar el color de la capa.

            for(let i=0;i<c_capas_numeros.length;i++){

              if(c_capas_categorias[i] == "No imprime"){
                c_capas_color_por_capa = "#FFFFFF"
              }else if(c_capas_categorias[i] == "Cerámicos"){
                c_capas_color_por_capa = "#a18165"
              }else if(c_capas_categorias[i] == "Metales"){
                c_capas_color_por_capa = "#D4D2D5"
              }else if(c_capas_categorias[i] == "Maderas"){
                c_capas_color_por_capa = "#A97954"
              }else if(c_capas_categorias [i] == "Tableros"){
                c_capas_color_por_capa = "#AF7029"
              }else if(c_capas_categorias[i] == "Placas y planchas"){
                c_capas_color_por_capa = "#6ca676"
              }else if(c_capas_categorias[i] == "Hormigones"){
                c_capas_color_por_capa = "#898F8F"
              }else if(c_capas_categorias[i] == "Hormigones especiales"){
                c_capas_color_por_capa = "#CCC29D"
              }else if(c_capas_categorias[i] == "Morteros y revoques"){
                c_capas_color_por_capa = "#DBDAD4"
              }else if(c_capas_categorias[i] == "Aislantes"){
                c_capas_color_por_capa = "#EFF16B"
              }else if(c_capas_categorias[i] == "Vidrios y otros"){
                c_capas_color_por_capa = "#9fc0cf"
              }else if(c_capas_categorias[i] == "Barreras de vapor"){
                c_capas_color_por_capa = "black"
              }else if(c_capas_categorias[i] == "Pinturas"){
                c_capas_color_por_capa = "dark grey"
              }else if(c_capas_categorias[i] == "Cámaras horizontales de aire"){
                c_capas_color_por_capa = "#dfe7e8"
              }else if(c_capas_categorias[i] == "Bloques de hormigón"){
                c_capas_color_por_capa = "#6e7578"
              }else if(c_capas_categorias[i] == "Cámaras verticales de aire"){
                c_capas_color_por_capa = "#dfe7e8"
              }


              c_capas_colores.push(c_capas_color_por_capa)


            }

            let c_capas_espesores_equivalentes = []


            // duplico espesores a espesores equivalentes
            for(let i=0;i<c_capas_numeros.length;i++){
              c_capas_espesores_equivalentes.push(c_capas_espesores[i])
            }

            c_capas_espesores_equivalentes.shift()
            c_capas_espesores_equivalentes.pop()

            c_capas_espesores_equivalentes.unshift(.03)
            c_capas_espesores_equivalentes.push(.03)

            let c_capas_espesores_equivalentes_total = 0

            for(let i=0;i<c_capas_numeros.length;i++){

              c_capas_espesores_equivalentes_total += Number(c_capas_espesores_equivalentes[i])
            }

            let c_capas_espesores_equivalentes2 = []

            for(let i=0;i<c_capas_numeros.length;i++){
              c_capas_espesores_equivalentes2.push(Number(c_capas_espesores_equivalentes[i]/c_capas_espesores_equivalentes_total))
            }

            let anchos_equivalentes_parciales = []
            let ancho_equivalente_parcial = canvas.width/3

            anchos_equivalentes_parciales.push(ancho_equivalente_parcial)

            ctx.globalAlpha = .4

            for(let i=0;i<c_capas_numeros.length;i++){

              // ASIGNA COLOR DE CAPA
              ctx.fillStyle = c_capas_colores[i]

              // LLENA RECTANGULOS DE CAPAS
              ctx.fillRect(ancho_equivalente_parcial,margen_sup,c_capas_espesores_equivalentes2[i]*(canvas.width/3),canvas.height-margen_inf*1.5)

              ancho_equivalente_parcial += c_capas_espesores_equivalentes2[i]*canvas.width/3
              anchos_equivalentes_parciales.push(ancho_equivalente_parcial)

            }

            ctx.beginPath()
            ctx.moveTo(anchos_equivalentes_parciales[1],(canvas.height-margen_inf*1.5)+margen_sup)
            ctx.lineTo(anchos_equivalentes_parciales[1],margen_sup)
            ctx.stroke()



            for(let i=1;i<anchos_equivalentes_parciales.length-2;i++){

              ctx.beginPath()
              ctx.strokeStyle = '#000000'
              ctx.moveTo(anchos_equivalentes_parciales[i],margen_sup)
              ctx.lineTo(anchos_equivalentes_parciales[i+1],margen_sup)
              ctx.stroke()

              ctx.beginPath()
              ctx.moveTo(anchos_equivalentes_parciales[i+1],margen_sup)
              ctx.lineTo(anchos_equivalentes_parciales[i+1],(canvas.height-margen_inf*1.5)+margen_sup)
              ctx.stroke()

              ctx.beginPath()
              ctx.moveTo(anchos_equivalentes_parciales[i+1],(canvas.height-margen_inf*1.5)+margen_sup)
              ctx.lineTo(anchos_equivalentes_parciales[i],(canvas.height-margen_inf*1.5)+margen_sup)
              ctx.stroke()

            }



            ctx.strokeStyle = '#000000'

            altura_efectiva = (canvas.height/12)*7


            let coordenadas_x = []
            let coordenadas_y = []

            coordenadas_x.push(margen_izquierdo)
            coordenadas_y.push(margen_sup*3)
            coordenadas_y.push(margen_sup*3)

            for(let i=0;i<anchos_equivalentes_parciales.length;i++){
              coordenadas_x.push(anchos_equivalentes_parciales[i])
            }

            for(let i=0;i<c_capas_gradientes_termicos_acumulados.length;i++){
              coordenadas_y.push((c_capas_gradientes_termicos_acumulados[i]*altura_efectiva)+margen_sup*3)
            }

            coordenadas_y.push(margen_sup*3+altura_efectiva)
            coordenadas_x.push(canvas.width-margen_derecho)


            ctx.globalAlpha = .2
            let offline

            for(let i=1;i<anchos_equivalentes_parciales.length-2;i++){

              if(c_capas_categorias[i]=="Hormigones" || c_capas_categorias[i] == "Cerámicos" || c_capas_categorias[i] == "Bloques de hormigón y forjados" || c_capas_categorias[i] == "Hormigones especiales")
              ctx.rect(anchos_equivalentes_parciales[i],margen_sup,anchos_equivalentes_parciales[i+1]-anchos_equivalentes_parciales[i],canvas.height-margen_inf*1.5)


            }


            ctx.clip()

            offline = 0
            // hatch a 45º
            for (let i=0;i<500;i++){
              ctx.beginPath()
              ctx.strokeStyle = "grey"
              ctx.moveTo(0,offline+10)
              ctx.lineTo(offline+10,0)
              ctx.stroke()
              offline += 10
            }


            ctx.restore()
            ctx.globalAlpha = 1
            // LOOP DIBUJA TEMPERATURAS
            ctx.lineWidth = 1

            for(let i=0;i<coordenadas_x.length;i++){
              ctx.beginPath()
              ctx.strokeStyle = '#FF2D00'
              ctx.moveTo(coordenadas_x[i],coordenadas_y[i])
              ctx.lineTo(coordenadas_x[i+1],coordenadas_y[i+1])
              ctx.stroke()
            }

            ctx.strokeStyle = '#000000'

            let presion_de_vapor_ext

            presion_de_vapor_int = psychrolib.GetVapPresFromRelHum(temp_dis_int,humedad_relativa_interior)
            presion_de_vapor_ext = psychrolib.GetVapPresFromRelHum(Number($temp_dis_ext_dom.value),.9)

            let delta_presion_vapor_int_ext = presion_de_vapor_int-presion_de_vapor_ext

            //console.log(`la presión de vapor interior: ${presion_de_vapor_int}`)
            //console.log(`la presión de vapor exterior: ${presion_de_vapor_ext}`)

            //console.log("el delta de presion de vapor:")
            //console.log(delta_presion_vapor_int_ext)

            let conjunto_resistencias_vapor = []



            for(let i=0;i<c_capas_permeancias_vapor.length;i++){
              if(c_capas_permeancias_vapor[i] == 0){
                conjunto_resistencias_vapor.push(c_capas_espesores[i+1]/c_capas_permeabilidades_vapor[i])
              }else{
                conjunto_resistencias_vapor.push(1/c_capas_permeancias_vapor[i])
              }
            }

            //console.log("resultado conjunto resistencias vapor")
            //console.log(conjunto_resistencias_vapor)

            // ya se supone que tengo todo. con la resistencia total, puedo sacar cada proporcional.

            let resistencia_vapor_total = 0

            for(let i=0;i<conjunto_resistencias_vapor.length;i++){
              resistencia_vapor_total += conjunto_resistencias_vapor[i]
            }

            //console.log("la resistencia total:")
            //console.log(resistencia_vapor_total)


            let gradiente_por_capa_vapor = []

            for(let i=0;i<conjunto_resistencias_vapor.length;i++){
              gradiente_por_capa_vapor.push(conjunto_resistencias_vapor[i]/resistencia_vapor_total)
            }


            let presiones_vapor_por_capa = presion_de_vapor_int

            let conjunto_presiones_vapor = []

            conjunto_presiones_vapor.push(presion_de_vapor_int)
            conjunto_presiones_vapor.push(presion_de_vapor_int)

            for(let i=0;i<gradiente_por_capa_vapor.length;i++){
              presiones_vapor_por_capa += -(gradiente_por_capa_vapor[i]*delta_presion_vapor_int_ext)
              conjunto_presiones_vapor.push(presiones_vapor_por_capa)
            }

            conjunto_presiones_vapor.push(presion_de_vapor_ext)

            //console.log("conjunto de presiones de vapor por capa")
            //console.log(conjunto_presiones_vapor)

            //console.log("conjunto de temperaturas por capa")
            //console.log(c_capas_temp_por_capa)

            let conjunto_temperaturas_rocio = []

            let conjunto_presiones_vapor_saturado = []

            for(let i=0;i<c_capas_temp_por_capa.length;i++){
              conjunto_presiones_vapor_saturado.push(psychrolib.GetSatVapPres(c_capas_temp_por_capa[i]))
            }

            let conjunto_humedad_relativa = []

            for(let i=0;i<c_capas_temp_por_capa.length;i++){

              conjunto_humedad_relativa.push(psychrolib.GetRelHumFromVapPres(c_capas_temp_por_capa[i],conjunto_presiones_vapor[i]))

            }

            //console.log("conjunto humedad relativa")
            //console.log(conjunto_humedad_relativa)

            let temp_rocio
            let temperaturas_de_rocio = []


            // recorrer humedades relativas
            for(let i=0;i<conjunto_humedad_relativa.length;i++){
              temp_rocio = psychrolib.GetTDewPointFromVapPres(c_capas_temp_por_capa[i],conjunto_presiones_vapor[i])
              temperaturas_de_rocio.push(temp_rocio)
            }

            let conjunto_valido = []


            for(let i=0;i<conjunto_presiones_vapor_saturado.length;i++){

              if(conjunto_humedad_relativa[i]>1){

                let busqueda_vapor = 100000
                let busqueda_temperatura = 50

                while(busqueda_vapor>conjunto_presiones_vapor[i]){
                  busqueda_temperatura += -.01
                  busqueda_vapor = psychrolib.GetSatVapPres(busqueda_temperatura)
                }

                conjunto_valido.push(busqueda_temperatura)



              }else{
                conjunto_valido.push(temperaturas_de_rocio[i])
              }

            }

            //console.log("temperaturas de rocio")
            //console.log(temperaturas_de_rocio)
            //console.log("conjunto valido temperaturas de rocío")
            //console.log(conjunto_valido)


            //let coordenadas_x2 = []
            let coordenadas_y2 = []

            let delta_grafico
            let grado_grafico

            delta_grafico = ((margen_sup*3)+altura_efectiva)-margen_sup*3
            grado_grafico = delta_grafico/delta_temp_int_ext

            coordenadas_y2.push((margen_sup*3)+grado_grafico*(temp_dis_int-conjunto_valido[0]))
            coordenadas_y2.push((margen_sup*3)+grado_grafico*(temp_dis_int-conjunto_valido[0]))

            for(let i=1;i<c_capas_temp_por_capa.length;i++){
              coordenadas_y2.push((margen_sup*3)+((temp_dis_int-conjunto_valido[i])*grado_grafico))

            }

            coordenadas_y2.push((margen_sup*3)+((temp_dis_int-conjunto_valido[conjunto_valido.length-1])*grado_grafico))


            // LOOP DIBUJA TEMPERATURAS DE ROCÍO

            for(let i=0;i<coordenadas_y2.length;i++){
              ctx.beginPath()
              ctx.strokeStyle = '#0027FF'
              ctx.setLineDash([8,6])
              ctx.moveTo(coordenadas_x[i],coordenadas_y2[i])
              ctx.lineTo(coordenadas_x[i+1],coordenadas_y2[i+1])
              ctx.stroke()
            }

            // Las lineas de trazo para las resistencias superficiales

            ctx.globalAlpha = .6
            ctx.beginPath()
            ctx.setLineDash([2,4])
            ctx.moveTo(coordenadas_x[1],margen_sup)
            ctx.lineTo(coordenadas_x[1],canvas.height-margen_inf*.5)
            ctx.strokeStyle = '#999999'
            ctx.stroke()

            ctx.beginPath()
            ctx.setLineDash([2,4])
            ctx.moveTo(coordenadas_x[1]+(canvas.width/3),margen_sup)
            ctx.lineTo(coordenadas_x[1]+(canvas.width/3),canvas.height-margen_inf*.5)
            ctx.stroke()

            // En caso de que haya elementos sigue por acá.

            ctx.globalAlpha = 1

            let humedad_relativa_interior_ok = parseFloat(humedad_relativa_interior*100).toFixed(2)

            ctx.font = "14px Calibri"
            ctx.fillStyle = "black"
            ctx.textAlign = "center"
            ctx.fillText(`Temp. rocío: ${parseFloat(conjunto_valido[1]).toFixed(2)}º C`,canvas.width/5.17,coordenadas_y2[1]-11)


            // LLENAR LA TABLA CON LAS CUENTAS

            const fragment = document.createDocumentFragment()

            // Títulos de columnas

            const cuentasCapa = document.createElement('B')
            cuentasCapa.textContent = "CAPA"
            fragment.appendChild(cuentasCapa)

            const cuentasEspesor = document.createElement('B')
            cuentasEspesor.textContent = "e"
            fragment.appendChild(cuentasEspesor)

            const cuentasConductividad = document.createElement('B')
            cuentasConductividad.textContent = "λ"
            fragment.appendChild(cuentasConductividad)

            const cuentasResistencia = document.createElement('B')
            cuentasResistencia.textContent = "R"
            fragment.appendChild(cuentasResistencia)

            const cuentasTemperatura = document.createElement('B')
            cuentasTemperatura.textContent = "T"
            fragment.appendChild(cuentasTemperatura)

            const cuentasPermeabilidad = document.createElement('B')
            cuentasPermeabilidad.textContent = "δ"
            fragment.appendChild(cuentasPermeabilidad)

            const cuentasResistenciavapor = document.createElement('B')
            cuentasResistenciavapor.textContent = "Rv"
            fragment.appendChild(cuentasResistenciavapor)

            const cuentasHumedadrelativa = document.createElement('B')
            cuentasHumedadrelativa.textContent = "HR"
            fragment.appendChild(cuentasHumedadrelativa)

            const cuentasPresiondevapor = document.createElement('B')
            cuentasPresiondevapor.textContent = "P"
            fragment.appendChild(cuentasPresiondevapor)

            const cuentasTemperaturaderocio = document.createElement('B')
            cuentasTemperaturaderocio.textContent = "Tr"
            fragment.appendChild(cuentasTemperaturaderocio)

            const cuentasDeltatemperaturas = document.createElement('B')
            cuentasDeltatemperaturas.textContent = "∆T"
            fragment.appendChild(cuentasDeltatemperaturas)

            // FIN DE PRIMERA LÍNEA

            const cuentasCapa2 = document.createElement('B')
            cuentasCapa2.textContent = "Nº"
            fragment.appendChild(cuentasCapa2)

            const cuentasEspesor2 = document.createElement('B')
            cuentasEspesor2.textContent = "(m)"
            fragment.appendChild(cuentasEspesor2)

            const cuentasConductividad2 = document.createElement('B')
            cuentasConductividad2.textContent = "(W/m².K)"
            fragment.appendChild(cuentasConductividad2)

            const cuentasResistencia2 = document.createElement('B')
            cuentasResistencia2.textContent = "(m².K/W)"
            fragment.appendChild(cuentasResistencia2)

            const cuentasTemperatura2 = document.createElement('B')
            cuentasTemperatura2.textContent = "(º C)"
            fragment.appendChild(cuentasTemperatura2)

            const cuentasPermeabilidad2 = document.createElement('B')
            cuentasPermeabilidad2.textContent = "(g/m.h.kPa)"
            fragment.appendChild(cuentasPermeabilidad2)

            const cuentasResistenciavapor2 = document.createElement('B')
            cuentasResistenciavapor2.textContent = "(m².h.kPa/g)"
            fragment.appendChild(cuentasResistenciavapor2)

            const cuentasHumedadrelativa2 = document.createElement('B')
            cuentasHumedadrelativa2.textContent = "(%)"
            fragment.appendChild(cuentasHumedadrelativa2)

            const cuentasPresiondevapor2 = document.createElement('B')
            cuentasPresiondevapor2.textContent = "(kPa)"
            fragment.appendChild(cuentasPresiondevapor2)

            const cuentasTemperaturaderocio2 = document.createElement('B')
            cuentasTemperaturaderocio2.textContent = "(º C)"
            fragment.appendChild(cuentasTemperaturaderocio2)

            const cuentasDeltatemperaturas2 = document.createElement('B')
            cuentasDeltatemperaturas2.textContent = "(º C)"
            fragment.appendChild(cuentasDeltatemperaturas2)

            // FIN DE SEGUNDA LÍNEA

            const cuentasCapa3 = document.createElement('B')
            cuentasCapa3.textContent = "Aire interior"
            fragment.appendChild(cuentasCapa3)

            const cuentasEspesor3 = document.createElement('B')
            cuentasEspesor3.textContent = "-"
            fragment.appendChild(cuentasEspesor3)

            const cuentasConductividad3 = document.createElement('B')
            cuentasConductividad3.textContent = "-"
            fragment.appendChild(cuentasConductividad3)

            const cuentasResistencia3 = document.createElement('B')
            cuentasResistencia3.textContent = "-"
            fragment.appendChild(cuentasResistencia3)

            const cuentasTemperatura3 = document.createElement('B')
            cuentasTemperatura3.textContent = temp_dis_int
            fragment.appendChild(cuentasTemperatura3)

            const cuentasPermeabilidad3 = document.createElement('B')
            cuentasPermeabilidad3.textContent = "-"
            fragment.appendChild(cuentasPermeabilidad3)

            const cuentasResistenciavapor3 = document.createElement('B')
            cuentasResistenciavapor3.textContent = "-"
            fragment.appendChild(cuentasResistenciavapor3)

            const cuentasHumedadrelativa3 = document.createElement('B')
            cuentasHumedadrelativa3.textContent = humedad_relativa_interior_ok
            fragment.appendChild(cuentasHumedadrelativa3)

            const cuentasPresiondevapor3 = document.createElement('B')
            cuentasPresiondevapor3.textContent = parseFloat(presion_de_vapor_int).toFixed(2)
            fragment.appendChild(cuentasPresiondevapor3)

            const cuentasTemperaturaderocio3 = document.createElement('B')
            cuentasTemperaturaderocio3.textContent = parseFloat(conjunto_valido[1]).toFixed(2)
            fragment.appendChild(cuentasTemperaturaderocio3)

            const cuentasDeltatemperaturas3 = document.createElement('B')
            cuentasDeltatemperaturas3.textContent = parseFloat(temp_dis_int-conjunto_valido[1]).toFixed(2)
            fragment.appendChild(cuentasDeltatemperaturas3)

            // FIN DE TERCERA LÍNEA

            const cuentasCapa4 = document.createElement('B')
            cuentasCapa4.textContent = "1- Resist. sup. int."
            fragment.appendChild(cuentasCapa4)

            const cuentasEspesor4 = document.createElement('B')
            cuentasEspesor4.textContent = "-"
            fragment.appendChild(cuentasEspesor4)

            const cuentasConductividad4 = document.createElement('B')
            cuentasConductividad4.textContent = "-"
            fragment.appendChild(cuentasConductividad4)

            const cuentasResistencia4 = document.createElement('B')
            cuentasResistencia4.textContent = parseFloat($res_sup_int_dom.value).toFixed(2)
            fragment.appendChild(cuentasResistencia4)

            const cuentasTemperatura4 = document.createElement('B')
            cuentasTemperatura4.textContent = parseFloat(c_capas_temp_por_capa[1]).toFixed(2)
            fragment.appendChild(cuentasTemperatura4)

            const cuentasPermeabilidad4 = document.createElement('B')
            cuentasPermeabilidad4.textContent = "-"
            fragment.appendChild(cuentasPermeabilidad4)

            const cuentasResistenciavapor4 = document.createElement('B')
            cuentasResistenciavapor4.textContent = "-"
            fragment.appendChild(cuentasResistenciavapor4)

            const cuentasHumedadrelativa4 = document.createElement('B')

            if(conjunto_humedad_relativa[1]>1){
              cuentasHumedadrelativa4.textContent = "100.00"
            }else{
              cuentasHumedadrelativa4.textContent = parseFloat(conjunto_humedad_relativa[1]*100).toFixed(2)
            }
            fragment.appendChild(cuentasHumedadrelativa4)

            const cuentasPresiondevapor4 = document.createElement('B')
            cuentasPresiondevapor4.textContent = parseFloat(conjunto_presiones_vapor[1]).toFixed(2)
            fragment.appendChild(cuentasPresiondevapor4)

            const cuentasTemperaturaderocio4 = document.createElement('B')
            cuentasTemperaturaderocio4.textContent = parseFloat(conjunto_valido[1]).toFixed(2)
            fragment.appendChild(cuentasTemperaturaderocio4)

            const cuentasDeltatemperaturas4 = document.createElement('B')
            cuentasDeltatemperaturas4.textContent = parseFloat(c_capas_temp_por_capa[1]-conjunto_valido[1]).toFixed(2)
            fragment.appendChild(cuentasDeltatemperaturas4)

            // FIN DE CUARTA LÍNEA



            // INICIO DE LOOP POR CAPAS SoLo DE MATERIALES
            let numero_ok = 2

            for(let i=1;i<c_capas_nombres.length-1;i++){

              const cuentasNombreloop = document.createElement('B')
              cuentasNombreloop.textContent = `${numero_ok}- ${c_capas_nombres[i]}`
              fragment.appendChild(cuentasNombreloop)

              const cuentasEspesorloop = document.createElement('B')
              cuentasEspesorloop.textContent = c_capas_espesores[i]
              fragment.appendChild(cuentasEspesorloop)

              const cuentasConductividadloop = document.createElement('B')
              cuentasConductividadloop.textContent = c_capas_conductividades[i]
              fragment.appendChild(cuentasConductividadloop)

              const cuentasResistencialoop = document.createElement('B')
              cuentasResistencialoop.textContent = parseFloat(c_capas_resistencias[i]).toFixed(2)
              fragment.appendChild(cuentasResistencialoop)

              const cuentasTemperaturaloop = document.createElement('B')
              cuentasTemperaturaloop.textContent = parseFloat(c_capas_temp_por_capa[i+1]).toFixed(2)
              fragment.appendChild(cuentasTemperaturaloop)

              const cuentasPermeabilidadloop = document.createElement('B')
              cuentasPermeabilidadloop.textContent = parseFloat(c_capas_permeabilidades_vapor[i-1]).toFixed(4)
              fragment.appendChild(cuentasPermeabilidadloop)

              const cuentasResistenciasvaporloop = document.createElement('B')
              cuentasResistenciasvaporloop.textContent = parseFloat(conjunto_resistencias_vapor[i-1]).toFixed(2)
              fragment.appendChild(cuentasResistenciasvaporloop)

              const cuentasHumedadrelativaloop = document.createElement('B')

              if(conjunto_humedad_relativa[i+1]>1){
                cuentasHumedadrelativaloop.textContent = "100.00"
              }else{
                cuentasHumedadrelativaloop.textContent = parseFloat(conjunto_humedad_relativa[i+1]*100).toFixed(2)
              }
              fragment.appendChild(cuentasHumedadrelativaloop)

              const cuentasPresionesvaporloop = document.createElement('B')
              cuentasPresionesvaporloop.textContent = parseFloat(conjunto_presiones_vapor[i+1]).toFixed(2)
              fragment.appendChild(cuentasPresionesvaporloop)

              const cuentasTemperaturasrocioloop = document.createElement('B')
              cuentasTemperaturasrocioloop.textContent = parseFloat(conjunto_valido[i+1]).toFixed(2)
              fragment.appendChild(cuentasTemperaturasrocioloop)

              const cuentasDeltatemperaturasloop = document.createElement('B')
              cuentasDeltatemperaturasloop.textContent = parseFloat(c_capas_temp_por_capa[i+1]-conjunto_valido[i+1]).toFixed(2)
              fragment.appendChild(cuentasDeltatemperaturasloop)

              numero_ok += 1


            }

            // ÚLTIMA CAPA

            const cuentasCapa5 = document.createElement('B')
            cuentasCapa5.textContent = `${numero_ok}- Resist. sup. ext.`
            fragment.appendChild(cuentasCapa5)

            const cuentasEspesor5 = document.createElement('B')
            cuentasEspesor5.textContent = "-"
            fragment.appendChild(cuentasEspesor5)

            const cuentasConductividad5 = document.createElement('B')
            cuentasConductividad5.textContent = "-"
            fragment.appendChild(cuentasConductividad5)

            const cuentasResistencia5 = document.createElement('B')
            cuentasResistencia5.textContent = 0.04
            fragment.appendChild(cuentasResistencia5)

            const cuentasTemperatura5 = document.createElement('B')
            cuentasTemperatura5.textContent = parseFloat(c_capas_temp_por_capa[c_capas_temp_por_capa.length-1]).toFixed(2)
            fragment.appendChild(cuentasTemperatura5)

            const cuentasPermeabilidad5 = document.createElement('B')
            cuentasPermeabilidad5.textContent = "-"
            fragment.appendChild(cuentasPermeabilidad5)

            const cuentasResistenciavapor5 = document.createElement('B')
            cuentasResistenciavapor5.textContent = "-"
            fragment.appendChild(cuentasResistenciavapor5)

            const cuentasHumedadrelativa5 = document.createElement('B')
            cuentasHumedadrelativa5.textContent = parseFloat(90.00).toFixed(2)
            fragment.appendChild(cuentasHumedadrelativa5)

            const cuentasPresiondevapor5 = document.createElement('B')
            cuentasPresiondevapor5.textContent = parseFloat(conjunto_presiones_vapor[conjunto_presiones_vapor.length-1]).toFixed(2)
            fragment.appendChild(cuentasPresiondevapor5)

            const cuentasTemperaturaderocio5 = document.createElement('B')
            cuentasTemperaturaderocio5.textContent = parseFloat(conjunto_valido[conjunto_valido.length-1]).toFixed(2)
            fragment.appendChild(cuentasTemperaturaderocio5)

            const cuentasDeltatemperaturas5 = document.createElement('B')
            cuentasDeltatemperaturas5.textContent = parseFloat(c_capas_temp_por_capa[c_capas_temp_por_capa.length-1]-conjunto_valido[conjunto_valido.length-1]).toFixed(2)
            fragment.appendChild(cuentasDeltatemperaturas5)

            // FIN DE ÚLTIMA CAPA

            latabla.appendChild(fragment)

            // Quiero ver como hacer para llamar el csv de los niveles y clasificar esto...

            let nivel_iram = ""

            valor_k_ok = 1/c_capas_resistencia_total




            //este switch está para el nivel iram
            switch($elemento_dom.value){

              case "valor_muro":
              console.log("en la función posleer la tablar y muro")

              // primero filtrar por temperatura exterior.

              if(valor_k_ok>1.85){
               nivel_iram = "N/A"
              }else if(1.85>valor_k_ok<1){
                nivel_iram = "C"
              }else if(1>valor_k_ok<.38){
                nivel_iram = "B"
              }else if(.38>valor_k_ok){
                nivel_iram = "A"
              }



              break
              case "valor_cubierta":
              console.log("en la función posleer la tabla, y cubierta")
              break
              case "valor_solado":
              console.log("en la función posleer la tabla y solado")

            }


            // Fin de las tres opciones muro/cubierta/solado





          }




          // en caso de que no haya elementos sigue por acá.



          if(c_capas_resistencias.length>=3){

            $valor_k.outerHTML = `<div id="valor_k2"><span id="ante_valor">Valor K:</span>
            ${parseFloat(1/c_capas_resistencia_total).toFixed(2)}
            <span id="unidades">  W/m².K</span></div>`

          }else{
           $valor_k.outerHTML = `<div id="valor_k2"><span id="ante_valor">-  Registro vacío  -</span></div>`
          }


        }
      }
    }
  }
}


// botón para vaciado de tabla

let $btnempty = document.getElementById('btnempty')



function algo(){
  console.log("click en vaciar")

  let db
  const request = indexedDB.open('listado',1)

  request.onsuccess = () => {
    db = request.result
    clearData()
  }

  function clearData() {
    const transaction = db.transaction(["capas"], "readwrite")
    transaction.oncomplete = (event) => {
      console.log("transacción completa")
    }

    transaction.onerror = (event) => {
      console.log("error en la transacción")
    }

    const objectStore = transaction.objectStore("capas")

    const objectStoreRequest = objectStore.clear()

    objectStoreRequest.onsuccess = (event) => {
      console.log("lista vaciada")
    }
  }

    window.location.reload()

}


$btnempty.addEventListener ('click', () => {
  algo()
})


console.log("admitancia")
console.log("espesor, conductividad, densidad y capacidad calorífica")

