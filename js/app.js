//variables
const carrito = document.querySelector(".carrito");
const listaComidas = document.querySelector(".contenedor-objetos-menu");  
const articulosCarrito = []; /*aca iran todos los objetos comprados*/
const iconoCarrito = document.querySelector('.boton-carrito')
//evenlisteners 
listaComidas.addEventListener('click', agregarPedido);  
iconoCarrito.addEventListener('click',(e)=>{ 
    if(carrito.style.right < "65px"){
    e.preventDefault();  
    carrito.style.right = "65px"; /*para poner el carrito en un sitio visible*/
    carrito.style.transition = ".5s"/*para que tenga una transicion suave */
    iconoCarrito.classList.add("fa-bounce");  
    setTimeout(()=>{
        iconoCarrito.classList.remove("fa-bounce")
    },800) 
} else{
    carrito.style.right = "-1000px"; 
    iconoCarrito.classList.add("fa-bounce");  
    setTimeout(()=>{
        iconoCarrito.classList.remove("fa-bounce")
    },800)  
    carrito.style.transition = ".5s"
}
})
console.log(iconoCarrito.classList);
//funciones
function agregarPedido(e){
    e.preventDefault();  
    if(e.target.classList.contains("boton-comprar")){ 
        const pizzaSeleccionada = e.parentElement;   
        leerPedido(pizzaSeleccionada)
    } 
} 

function leerPedido (pedido){ 
    //se crea un objeto con todos los datos de la pizza que se esta comprando 
    let infoCurso ={
        nombre:pedido.querySelector(('.nombre-pizza')),
        precio: pedido.querySelector('.precio'), 
        cantidad : 1, 
        imagen : pedido.querySelector('.photo-pizza'),
        id:pedido.querySelector(".comprar-button").getAttribute("data-id")
    } 
} 
