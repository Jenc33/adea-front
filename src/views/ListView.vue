<script>
import User from '../components/user/User.vue'
export default {
    name: 'userList',
    data() {
        return {
            usuarios:[],
            userToDelete : '',
            nombre:'',
            fechaAltaInicial:'',
            fechaAltaFinal:''
        }
    },
    props: {
        
    },
    methods: {
        getList(){
            let self = this
            self.$axios.get('/users/list' ).then(resp =>{
                self.usuarios = resp.data
                self.usuarios.forEach(element => {
                    element.fechaalta = element.fechaalta.split('T')[0]
                });
            }).catch(error=>{
                console.log(error)
                alert("Hubo un problema en el sistema")
            })
        },
        verUsuarios(filter){
            let self = this
            self.$axios.get('/users/list/status', { params: { status: filter } } ).then(resp =>{
                self.usuarios = resp.data
                self.usuarios.forEach(element => {
                    element.fechaalta = element.fechaalta.split('T')[0]
                });
            }).catch(error=>{
                console.log(error)
                alert("Hubo un problema en el sistema")
            })
        },
        getUsersByFilters(){
            let self = this
            self.$axios.get('/users/list/filters', { params: { filterName: self.nombre, 
                filter1 : self.fechaAltaInicial, filter2 : self.fechaAltaFinal } } ).then(resp =>{
                self.usuarios = resp.data
                self.usuarios.forEach(element => {
                    element.fechaalta = element.fechaalta.split('T')[0]
                });
            }).catch(error=>{
                console.log(error)
                alert("Hubo un problema en el sistema")
            })
        },
        verUser(user){
            let self = this
            self.$router.push(`/users/view/${user.login}`)
        },
        editarUser(user){
            let self = this
            self.$router.push(`/users/edit/${user.login}`)
        },
        selectUserToDelete(user){
            let self = this
            self.userToDelete = user.login
        },
        crearUser(){
            let self = this
            self.$router.push(`/users/create`)
        },
        eliminarUser(){
            let self = this
            self.$axios.get('/users/delete', { params: { request: self.userToDelete } } ).then(response =>{
                alert("Eliminación de usuario exitosa")
                self.getList()
            }).catch(error =>{
                if(error.status == 404){
                    alert("No se encontró el usuario a eliminar")
                }  else {
                    console.log(error)
                    alert("Hubo un problema en el sistema")
                }
            })
        }
    },
    mounted() {
        let self = this
        self.getList()
    },
}
</script>

<template>
    <main>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Aviso</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>¿Desea Eliminar el usuario?</h5>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="eliminarUser()">Si</button>
                </div>
              </div>
            </div>
          </div>
        <section>
            <button data-mdb-ripple-init type="button" @click="verUsuarios('A')" class="btn btn-success btn-block mb-4">Activos</button>&nbsp;&nbsp;
            <button data-mdb-ripple-init type="button" @click="verUsuarios('B')" class="btn btn-secondary btn-block mb-4">Inactivos</button>&nbsp;&nbsp;
            <button data-mdb-ripple-init type="button" @click="verUsuarios('R')" class="btn btn-warning btn-block mb-4">Revocados</button>&nbsp;&nbsp;
            <button data-mdb-ripple-init type="button" @click="getList()" class="btn btn-primary btn-block mb-4">Todos</button>

            <div class="row mb-4">
                <div class="col">
                    <div data-mdb-input-init class="form-outline">
                        <input type="text" id="Nombre" class="form-control" v-model="nombre" />
                        <label class="form-label" for="Nombre">Nombre</label>
                    </div>
                </div>
                <div class="col">
                    <div data-mdb-input-init class="form-outline">
                        <input type="date" id="fechaAltaI" class="form-control" v-model="fechaAltaInicial" />
                        <label class="form-label" for="fechaAltaI">Fecha Alta Inicial</label>
                    </div>
                </div>
                <div class="col">
                    <div data-mdb-input-init class="form-outline">
                        <input type="date" id="fechaAltaF" class="form-control" v-model="fechaAltaFinal" />
                        <label class="form-label" for="fechaAltaF">Fecha Alta Final</label>
                    </div>
                </div>
            </div>
            <button data-mdb-ripple-init type="button" @click="getUsersByFilters()" class="btn btn-primary btn-block mb-4">Buscar Por Filtros</button>

            <h2>Lista de Usuarios</h2>
        </section>
        <section class="intro">
            <div class="bg-image " style="background-color: #f5f7fa;">
              <div class="mask d-flex align-items-center h-100">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <div class="card shadow-2-strong">
                        <div class="card-body p-0">
                          <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 350px">
                            <table class="table table-dark mb-0">
                              <thead style="background-color: #393939;">
                                <tr class="text-uppercase text-success">
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Login</th>
                                  <th scope="col">Fecha Alta</th>
                                  <th scope="col">Estatus</th>
                                  <th scope="col">Acción</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(user, index) in usuarios" :key="index">
                                  <td>{{ user.nombre }} {{ user.apellidoPaterno }}</td>
                                  <td>{{ user.login }}</td>
                                  <td>{{ user.fechaalta }}</td>
                                  <td>{{ user.status }}</td>
                                  <td><button data-mdb-ripple-init type="button" @click="verUser(user)" class="btn btn-primary btn-block mb-4">Ver</button>&nbsp;&nbsp;
                                    <button data-mdb-ripple-init type="button" @click="editarUser(user)" class="btn btn-warning btn-block mb-4">Editar</button>&nbsp;
                                    <button data-mdb-ripple-init type="button" @click="selectUserToDelete(user)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger btn-block mb-4">Baja</button></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <button data-mdb-ripple-init type="button" @click="crearUser()" class="btn btn-success btn-block mb-4">Nuevo Usuario</button>&nbsp;
          </section>
          
    </main>
</template>
<style>
html,
body,
.intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card {
  border-radius: .5rem;
}

.table-scroll {
  border-radius: .5rem;
}

thead {
  top: 0;
  position: sticky;
}
</style>