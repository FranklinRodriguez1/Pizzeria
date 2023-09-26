//variables 
const carrito = document.querySelector(".carrito");
const listaComidas = document.querySelector(".contenedor-objetos-menu");  
const articulosCarrito = []; /*aca iran todos los objetos comprados*/
const iconoCarrito = document.querySelector('.boton-carrito'); /*es el boton del carrito */ 
let contenedorCarrito = document.querySelector(".carrito tbody");
let eliminarPizza = document.querySelector('.borrar-curso');   
let precioTotal = document.querySelector(".precio-total") 
let precios = [] 


//evenlisteners  

listaComidas.addEventListener('click', agregarPedido);  
iconoCarrito.addEventListener('click', mostrarMenu);  




//funciones   
function eliminar (e){ 
    e.target.preventDefault()
    if(e.target.contains("borrar-curso")){ 
        
    }
}
/* mostrar menu hace mostrar el carrito cuando le dan click*/
function mostrarMenu (e){  

    if(carrito.style.right < "65px"){
    e.preventDefault();  
    carrito.style.right = "65px"; /*para poner el carrito en un sitio visible*/
    carrito.style.transition = ".5s"/*para que tenga una transicion suave */
    iconoCarrito.classList.add("fa-bounce");  /*para agregar la animacion al boton*/
    setTimeout(()=>{
        iconoCarrito.classList.remove("fa-bounce")/*se quita la animacion luego de 800 milisegundos */
    },800) 
} else{
    carrito.style.right = "-1000px"; 
    iconoCarrito.classList.add("fa-bounce");  
    setTimeout(()=>{
        iconoCarrito.classList.remove("fa-bounce")
    },800)  
    carrito.style.transition = ".5s"
}
} 
/*fin de mostrar menu*/ 

function agregarPedido(e){
    e.preventDefault();  
    if(e.target.classList.contains("comprar-button")){  
        const pizzaSeleccionada = e.target.parentElement.parentElement;     
        leerPedido(pizzaSeleccionada)  
    }  
} 

function leerPedido (pedido){ 
     //se crea un objeto con todos los datos de la pizza que se esta comprando 
    const infoPizza ={
        nombre:pedido.querySelector('.nombre-pizza').textContent,
        precio: pedido.querySelector('.precio').textContent, 
        cantidad : 1, 
        imagen : pedido.querySelector('.photo-pizza').src,
        id:pedido.querySelector(".comprar-button").getAttribute("data-id"),
    }; 
    precios.push(Number(infoPizza.precio.slice(0, infoPizza.precio.length - 1)))

    const existe = articulosCarrito.find(pizza => pizza.id === infoPizza.id) // es una variable para validar si el articulo ingresado en el carrito tiene la misma id que alguno que ya se encuentre dentro del mismo
    let precioNumber = Number(infoPizza.precio.slice(0, infoPizza.precio.length -1 )) //es el nuevo precio del objeto o del carrito 
    if(existe){  
        articulosCarrito.map(pizza =>{
            if(pizza.id === infoPizza.id){
                pizza.cantidad++;  
                let nuevoPrecio = existe.cantidad * precioNumber    
                pizza.precio =  nuevoPrecio + "$" 
                return pizza
            }})  
    }else{
        articulosCarrito.push(infoPizza)  
    }
    carritoHTML() 
}   
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
}; 

function carritoHTML() { 
    limpiarHTML()
    articulosCarrito.forEach((pizza) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${pizza.imagen}" width="100px"></td>
            <td>${pizza.nombre}</td>
            <td>${pizza.precio}</td>
            <td>${pizza.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${pizza.id}"> X </a>
            </td>
        ` 
      contenedorCarrito.appendChild(row); //agrega elementos a la etiqueta tbody
    } ); 
    
}
