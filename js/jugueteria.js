const {createApp}=Vue

const app= createApp({
    data(){
        return{
            juguetes: [ ],
            precios:[ ],
            preciosOrdenados:[ ],
            filtrados:[ ],
            busqueda:'',
            checked:[ ],
            ordenar:['ordenar por precio más bajo','ordenar por precio más alto' ],
            cargando:true,
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(response=> response.json())
        .then(datos=>{
            this.juguetes=datos.filter(element=> element.categoria=="jugueteria")
            this.filtrados=datos.filter(element=> element.categoria=="jugueteria")
            this.precios=datos.map(categoria=>categoria.precio)
            console.log(this.juguetes)
            this.cargando=false  
            console.log(this.checked)
        })
        .catch(err => console.log( err ))
    },
    methods:{
        filtro(){
            console.log("funciona")
            this.filtrados=this.juguetes.filter(juguete=>juguete.producto.toLowerCase().includes(this.busqueda.toLowerCase()))
            console.log(this.filtrados)
        },
        filtroCheck(){
            console.log(this.checked)
           
            if(this.checked=='ordenar por precio más bajo'){
                return this.juguetes.sort((x,y)=>x.precio-y.precio);
            }else{
                return this.juguetes.sort((x,y)=>y.precio-x.precio);
            }   
        },
        filtroCruzado(){
            let radio=this.filtroCheck();
            let busqueda= radio.filter(juguete=>juguete.producto.toLowerCase().includes(this.busqueda.toLowerCase()))
            this.filtrados=busqueda
        }
    }
})
app.mount('#app')
let items = document.querySelectorAll('.carousel .carousel-item')

		items.forEach((el) => {
			const minPerSlide = 4
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})