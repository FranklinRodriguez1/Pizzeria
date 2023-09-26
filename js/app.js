//variables
const carrito = document.querySelector(".carrito");
const listaComidas = document.querySelector(".contenedor-objetos-menu");  
const articulosCarrito = []; /*aca iran todos los objetos comprados*/
const iconoCarrito = document.querySelector('.boton-carrito') /*es el boton del carrito */ 
let contenedorCarrito = document.querySelector(".carrito tbody")

//evenlisteners 
listaComidas.addEventListener('click', agregarPedido);  
iconoCarrito.addEventListener('click', mostrarMenu)


//funciones  
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
        precioNumber : Number(pedido.querySelector('.precio').textContent.slice(0, pedido.querySelector('.precio').textContent.length -1))
    } 
    console.log(infoPizza.precioNumber);
    const existe = articulosCarrito.find(pizza => pizza.id === infoPizza.id)
    if(existe){  
        articulosCarrito.map(pizza =>{
            if(pizza.id === infoPizza.id){
                pizza.cantidad++;  
                let nuevoPrecio = pizza.cantidad * pizza.precioNumber   
                pizza.precio = `${nuevoPrecio}$`
                return pizza
            }else{
                return pizza
            }
        })  
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
        `;
      contenedorCarrito.appendChild(row); //agrega elementos a la etiqueta tbody
    });
}
