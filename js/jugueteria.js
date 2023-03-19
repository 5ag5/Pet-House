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
            ordenar:['ordenar por precio mas bajo','ordenar por precio mas alto' ]
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
           
            if(this.checked=='ordenar por precio mas bajo'){
                this.filtrados=this.juguetes.sort((x,y)=>x.precio-y.precio);
                console.log("mas bajo a +")
                console.log(this.filtrados)
            }else{
                
                this.filtrados=this.juguetes.sort((x,y)=>y.precio-x.precio);
                console.log("mas alto a -")
                console.log(this.filtrados)
            }   
        },
        /*encontrarProducto(){
            console.log()
        }*/
        
    }
})
app.mount('#app')