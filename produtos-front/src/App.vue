<template>
  <div id="app">
    <div class="container">
      <div id="titulo" class="row">
        <h1 class="center">Front-end Produtos</h1>
      </div>
      <div id="form" class="row">
        <h5>Formulário de produto</h5>

        <ul>
          <li v-for="(error, index) in errors" :key="index">
            Campo
            <b>{{error.field}}</b>
            : {{error.defaultMessage}}
          </li>
        </ul>

        <form @submit.prevent="salvar">
          <div class="row">
            <div class="col s12">
              <label for>Nome</label>
              <input type="text" v-model="produto.nome" />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <label for>Quantidade</label>
              <input type="number" v-model="produto.quantidade" />
            </div>
            <div class="col s6">
              <label for>Valor</label>
              <input type="text" v-model="produto.valor" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="submit" class="btn">Salvar</button>
            </div>
            <div class="col">
              <button @click="limpar" type="reset" class="btn">Limpar</button>
            </div>
          </div>
        </form>
      </div>
      <div id="lista" class="row">
        <h5>Lista de produtos</h5>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{produto.id}}</td>
              <td>{{produto.nome}}</td>
              <td>{{produto.quantidade}}</td>
              <td>{{produto.valor}}</td>
              <td>
                <a @click.prevent="selecionar(produto)" href>
                  <i class="small material-icons">edit</i>
                </a>
                <a @click.prevent="remover(produto)" href>
                  <i class="small material-icons">delete</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ProdutoService from "./services/produtos";

export default {
  name: "App",
  data() {
    return {
      produto: {
        id: "",
        nome: "",
        quantidade: "",
        valor: ""
      },
      produtos: [],
      errors: []
    };
  },
  components: {
    // HelloWorld
  },
  methods: {
    async salvar() {
      if (!this.produto.id) {
        await ProdutoService.salvar(this.produto)
          .then(resposta => {
            console.log(resposta);
            this.limpar();
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        await ProdutoService.atualizar(this.produto.id, this.produto)
          .then(resposta => {
            console.log(resposta);
            this.limpar();
            this.listar();
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },

    listar() {
      ProdutoService.listar().then(resposta => {
        this.produtos = resposta.data;
      });
    },

    async remover(produto) {
      console.log("Id do produto: " + produto.id);
      await ProdutoService.remover(produto.id)
        .then(resposta => {
          console.log(resposta);
          this.listar();
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    selecionar(produto) {
      this.produto = produto;
    },

    limpar() {
      this.produto = {};
      this.errors = [];
    }
  },
  mounted() {
    this.listar();
  }
};
</script>

<style scoped>
</style>
