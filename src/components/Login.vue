<script>
export default {
    name: 'inicioSesion',
    data() {
        return {
            loginName:'',
            pass:''
        }
    },
    methods: {
        createUser(){
            let self = this
            this.$router.push('/users/create')
        },
        login(){
            let self = this
            let params = {
                "login" : self.loginName,
                "password" : window.btoa(self.pass)
            }
            self.$axios.post('/service/login', params).then(response =>{
                alert("Sesion exitosa")
                this.$router.push('/users')
            }).catch(error =>{
                if(error.status == 404){
                    alert("Usuario no encontrado")
                } else if(error.status == 403){
                    alert("Usuario no Vigente")
                } else if(error.status == 400){
                    alert("Contraseña Incorrecta")
                } else {
                    console.log(error)
                    alert("Hubo un problema en el sistema")
                }
            })
        }
    },
}
</script>

<template>
    <div class="text-center">
        <form>
            <h1>Inicia Sesión</h1>
            <br>
            <br>
            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" id="login" v-model="loginName" class="form-control" />
                <label class="form-label" for="login">Login</label>
            </div>
          
            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" id="pass" v-model="pass" class="form-control" />
                <label class="form-label" for="pass">Password</label>
            </div>
          
            <!-- Submit button -->
            <button @click="login" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Inicia Sesión</button>
          
            <!-- Register buttons -->
            <div class="text-center">
                <p>¿No te has registrado? <a style="cursor: pointer; color:blue" @click="createUser()">¡Hazlo aquí!</a></p>
            </div>
        </form>
    </div>
</template>