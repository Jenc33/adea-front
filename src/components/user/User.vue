<script>
export default {
    name: 'user',
    data() {
        return {
            usuario:{
                nombre:'',
                apellidoPaterno:'',
                apellidoMaterno:'',
                area:'',
                login:'',
                password:'',
                cliente:'',
                email:'',
                fechaalta:'',
                status:''
            }
        }
    },
    props: {
        tipo: {
            type: Number,
            default: 0
        },
        user: {
            type: String,
            default: ''
        }
    },
    methods: {
        crearUsuario(){
            let self = this
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth();
            let day = d.getDate();
            let c = new Date(year + 1, month, day);
            self.usuario.area = 0 // No deduje que areas definir pero se puede mejorar :P
            self.usuario.cliente = 0
            self.usuario.fechaalta = new Date()
            self.usuario.fechaVigencia = c
            self.usuario.fechamodificacion = new Date()
            self.usuario.status = 'A'
            self.usuario.password = window.btoa(self.usuario.password)
            
            console.log(self.usuario)

            if(self.tipo == 1){
                self.$axios.post('/users/create', self.usuario).then(response =>{
                    alert("Creación de usuario exitosa")
                    self.$router.push('/users')
                }).catch(error =>{
                    if(error.status == 400){
                        alert("Los datos del Usuario no se guardaron por validación")
                    }  else {
                        console.log(error)
                        alert("Hubo un problema en el sistema")
                    }
                })
            } else if( self.tipo == 2){
                self.$axios.post('/users/update', self.usuario).then(response =>{
                    alert("Actualización de usuario exitosa")
                    self.back()
                }).catch(error =>{
                    if(error.status == 400){
                        alert("Los datos del Usuario no se guardaron por validación")
                    }  else {
                        console.log(error)
                        alert("Hubo un problema en el sistema")
                    }
                })
            }
        },
        back(){
            let self = this
            self.$router.go(-1)
        }

    },
    mounted() {
        let self = this
        if(self.tipo == 0 || self.tipo == 2){
            self.$axios.get('/users/search', { params: { request: self.user } } ).then(resp =>{
                self.usuario = resp.data
            }).catch(error=>{
                if(error.status == 404){
                    alert("Los datos del Usuario no se encontraron")
                }  else {
                    console.log(error)
                    alert("Hubo un problema en el sistema")
                }
            })
        }
    },
}
</script>
<template>
    <button data-mdb-ripple-init type="button" @click="back" class="btn btn-primary btn-block mb-4">Regresar</button>
    <div class="text-center">
        <form @submit.prevent="crearUsuario()">
            <br>
            <h1 v-if="tipo==1">Crear Usuario</h1>
            <h1 v-else-if="tipo==0">Ver Usuario</h1>
            <h1 v-else-if="tipo==2">Editar Usuario</h1>
            <br>
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
              <div class="col">
                <div data-mdb-input-init class="form-outline">
                  <input :disabled="tipo==0" type="text" id="Nombre" class="form-control" v-model="usuario.nombre" />
                  <label class="form-label" for="Nombre">Nombre</label>
                </div>
              </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div data-mdb-input-init class="form-outline">
                        <input :disabled="tipo==0" type="text" id="apellidoPaterno" class="form-control" v-model="usuario.apellidoPaterno"/>
                        <label class="form-label" for="apellidoPaterno">Apellido Paterno</label>
                    </div>
                </div>
                <div class="col">
                    <div data-mdb-input-init class="form-outline">
                        <input :disabled="tipo==0" type="text" id="apellidoMaterno" class="form-control" v-model="usuario.apellidoMaterno"/>
                        <label class="form-label" for="apellidoPaterno">Apellido Materno</label>
                    </div>
                </div>
            </div>
          
            <!-- Text input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <input :disabled="tipo==0" type="text" id="login" class="form-control" v-model="usuario.login" />
              <label class="form-label" for="login">Login</label>
            </div>
          
            <!-- Text input -->
            <div data-mdb-input-init class="form-outline mb-4" v-if="tipo==1">
              <input :disabled="tipo==0" type="password" id="pass" class="form-control" v-model="usuario.password" />
              <label class="form-label" for="pass">Password</label>
            </div>
          
            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <input :disabled="tipo==0" type="email" id="email" class="form-control" v-model="usuario.email"/>
              <label class="form-label" for="email">Email</label>
            </div>
          
            <!-- Submit button -->
            <button v-if="tipo==1" data-mdb-ripple-init type="submit" class="btn btn-success btn-block mb-4">Crear Cuenta</button>
            <button v-if="tipo==2" data-mdb-ripple-init type="submit" class="btn btn-success btn-block mb-4">Editar Cuenta</button>
          </form>
    </div>
    
</template>

<style lang="scss" scoped>

</style>