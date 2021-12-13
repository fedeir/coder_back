

const fs = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }
    
    async getAll(){
        let lista;

        await fs.promises.readFile(this.ruta, 'utf-8')
            .then(contenido => {
                
                lista= JSON.parse(contenido);
                
            })
            .catch(err =>{
                console.log("no se pudo realizar la Operacion.");
                lista=[];
            })
            return lista;
    }

    async save(objeto){
        let id;

       await this.getAll().then(datos =>{
            
            let lista=datos;
            console.log(lista);
            id=lista.length;
            objeto.id = id + 1;

            lista.push(objeto);
            console.log(lista);
            fs.writeFile(this.ruta, JSON.stringify(lista), error =>{
                if (error){
                    console.log("No se pudo realizar la operacion.");
                }
                
            })
        })
        
        //devolver id del objeto registrado
        return objeto.id;
    }

    async getById(num){
        let productById;
        
        await this.getAll().then(datos =>{
            let lista=datos;

            productById = lista.find(element => element.id === num);
            
            
        })
        .catch(err =>{
            productById=null;
        })
        
        return productById;
        
        
    }

    deleteById(num){

        this.getAll().then(datos => {
            let lista = datos;
            let indice = lista.findIndex(element => element.id === num);
            lista.splice(indice, 1);

            fs.writeFile(this.ruta, JSON.stringify(lista), error =>{
                if (error){
                    console.log("No se pudo realizar la operacion.");
                }
                
            })

        })
       
    }

    deleteAll(){
        fs.writeFileSync(this.ruta, "[]");
    }


    

}

exports.contenedor=Contenedor;


// let registros = new Contenedor(ruta);

// registros.getAll().then(reg=>console.log(reg));
// registros.getById(4).then(reg=>console.log(reg));

// registros.save({
//     title : "Producto de prueba 6",
//     price : 1255,
//     thumbnail : "..."
// }).then(dato=>console.log(dato))

//registros.deleteById(8);

//registros.deleteAll();
