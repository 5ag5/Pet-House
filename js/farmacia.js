const { createApp } = Vue

const app = createApp({
    data() {
        return {
            farmacia: [],
            precios: [],
            preciosOrdenados: [],
            filtrados: [],
            busqueda: '',
            checked: [],
            ordenar: ['ordenar por precio más bajo', 'ordenar por precio más alto'],
            cargando: true,
            details: [],
            comprarRemedios: JSON.parse( localStorage.getItem('comprarRemedios') ) || []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(datos => {
                this.farmacia = datos.filter(element => element.categoria == "farmacia")
                this.filtrados = datos.filter(element => element.categoria == "farmacia")
                this.precios = datos.map(categoria => categoria.precio)
                this.cargando = false
                
            })
            .catch(err => console.log(err))
    },
    methods: {
        filtro() {
            this.filtrados = this.farmacia.filter(remedio => remedio.producto.toLowerCase().includes(this.busqueda.toLowerCase()))

        },
        filtroCheck() {
  
              if (this.checked == 'ordenar por precio más bajo') {
                return this.farmacia.sort((x, y) => x.precio - y.precio);
            } else {
                return this.farmacia.sort((x, y) => y.precio - x.precio);
            }
        },
        filtroCruzado() {
            let radio = this.filtroCheck();
            let busqueda = radio.filter(remedio => remedio.producto.toLowerCase().includes(this.busqueda.toLowerCase()))
            this.filtrados = busqueda
        },
        seleccionarProductos(id){
            let remedio= this.filtrados.find(remedio=>remedio._id==id)
            if(remedio.disponibles>0){
             this.comprarRemedios.push(id)
             remedio.disponibles=remedio.disponibles-1;
             
            }
        }
    },
    computed:{
        productosCompra(){
            localStorage.setItem( 'comprarRemedios', JSON.stringify( this.comprarRemedios ) )
        }
    }
})

app.mount('#app')
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})