class servicio{
    constructor(id,nombre,precio,img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const digital1 = new servicio(1, "Netflix" ,1000 , "img/netflix.png");
const digital2 = new servicio(2, "Prime Video", 300, "img/primeVideo.jfif" );
const digital3 = new servicio(3, "Hbo Go", 500, "img/hboGo.png" );
const digital4 = new servicio(4, "Psn Now", 2000, "img/psnNow.png" );
const digital5 = new servicio(5, "Youtube Premium", 250, "img/youtube.jfif" );



const servicios = [digital1, digital2, digital3, digital4, digital5];

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const containerServicios = document.getElementById("containerServicios");

const mostrarServicios = () => {
    servicios.forEach((servicio) => {
        const cardServ = document.createElement("div");
        cardServ.classList.add("contenedor");
        cardServ.innerHTML = `
            <div class="cardContainer">
                <img src="${servicio.img}" class="imagen" alt="${servicio.nombre}">
                <div class="card">
                <h5 class="title"> ${servicio.nombre} </h5>
                <p class="text"> ${servicio.precio} </p>
                <button class="btn" id="boton${servicio.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        containerServicios.appendChild(cardServ);

         
        const boton = document.getElementById(`boton${servicio.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(servicio.id)
        })
    })
}


const agregarAlCarrito = (id) => {
    const servicio = servicios.find((servicio) => servicio.id === id);
    const servicioEnCarrito = carrito.find((servicio) => servicio.id === id);
    if(servicioEnCarrito){
        servicioEnCarrito.cantidad++;
    }else {
        carrito.push(servicio);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    totalCalc();
}

mostrarServicios();

const carritoContainer = document.getElementById("carritoContainer");

const pintarCarrito = document.getElementById("pintarCarrito");

pintarCarrito.addEventListener("click", () => {
    mostrarCarrito();
});


const mostrarCarrito = () => {
    carritoContainer.innerHTML="";
    carrito.forEach((servicio) => {
        const cardServ = document.createElement("div");
        cardServ.classList.add("contenedor");
        cardServ.innerHTML = `
            <div class="card">
                <img src="${servicio.img}" class="imagen" alt="${servicio.nombre}">
                <div class="cardCart">
                <h5 class="title"> ${servicio.nombre} </h5>
                <p class="text"> ${servicio.precio} </p>
                <p class="text"> ${servicio.cantidad} </p>
                <button class="btn" id="eliminar${servicio.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        carritoContainer.appendChild(cardServ);

        const boton = document.getElementById(`eliminar${servicio.id}`);
        boton.addEventListener("click", () => {
            eliminarServCarrito(servicio.id);
        })
    })
    totalCalc();
}


const eliminarServCarrito = (id) => {
    const servicio = carrito.find((servicio) => servicio.id === id);
    const indice = carrito.indexOf(servicio);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const eliminarCarro = document.getElementById("eliminarCarro");

eliminarCarro.addEventListener("click", () => {
    vaciarTodoElCarrito();
})

const vaciarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const totalCalc = () => {
    let totalServicios = 0; 
    carrito.forEach((servicio) => {
        totalServicios = totalServicios + servicio.precio * servicio.cantidad;
    })
    total.innerHTML = `Total: $${totalServicios}`;
}