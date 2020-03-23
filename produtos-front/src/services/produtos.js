import { http } from './config'

export default {

    salvar: (produto) => {
        return http.post('produtos', produto)
    },

    listar: () => {
        return http.get('produtos')
    },

    atualizar: (id, produto) => {
        return http.put('produtos/' + id, produto)
    },

    remover: (id) => {
        return http.delete('produtos/' + id)
    }

}