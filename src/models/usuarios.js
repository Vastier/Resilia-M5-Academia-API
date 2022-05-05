import UsuariosDAO from '../DAO/usuarios-dao.js'

class Usuarios{
	constructor(){
		this.dao = new UsuariosDAO()
	}

	
	listarTodosUsuarios = async () => {
		try {
			const resposta = await this.dao.listarTodosUsuarios()
			if (resposta.length > 0){
				return resposta
			} else throw "A Lista está vazia."
		} catch (error) {
			throw new Error(error)
		}
	}

	inserirUsuario = async (usuario) => {
		try {
			return await this.dao.registraUsuario(usuario)
		} catch (error) {
			throw (error)
		}
	}
	
	atualizaUsuario = async (id, usuarioAtualizado) => {
		try {
			const dadosAntigos = await this.dao._verificaId(id)
			if (dadosAntigos.length <= 0) {
				throw "Não foi encontrado usuário com este ID."
			}
			
			const respostaDAO = await this.dao.atualizaUsuario(id, usuarioAtualizado)
			
			const dadosAtualizados = await this.dao._verificaId(id)

			return {
				"resposta" : respostaDAO,
				"dadosAntigos" : dadosAntigos,
				"dadosAtualizados": dadosAtualizados
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	apagaUsuario = async (id) => {
		try {
			const usuarioApagado = await this.dao._verificaId(id)
			if (usuarioApagado.length <= 0) {
				throw "Não foi encontrado usuário com este ID."
			}
			
			const respostaDAO = await this.dao.apagaUsuario(id)
			
			return {
				"resposta" : respostaDAO,
				"usuarioApagado" : usuarioApagado,
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	inserirMedidas = async (medidas) => {
		try {
			return await this.dao.inserirMedidas(medidas)
		} catch (error) {
			throw (error)
		}
	}

	listaTodasMedidas = async () => {
		try {
			const resposta = await this.dao.listaTodasMedidas()
			if (resposta.length > 0){
				return resposta
			} else throw "A Lista está vazia."
		} catch (error) {
			throw new Error(error)
		}
	}

	_listaMedidasPorId = async (id) => {
		try {
			const resposta = await this.dao._listaMedidasPorId(id)
			if (resposta.length > 0){
				return resposta
			} else throw "ID sem medidas."
		} catch (error) {
			throw new Error(error)
		}
	}

	_usuarioPorId = async (id) => {
		try {
			const resposta = await this.dao._verificaId(id)
			return resposta
		} catch (error) {
			throw (error)
		}
	}
	
	_usuarioPorEmail = async (email) => {
		try {
			const resposta = await this.dao._verificaEmail(email)
			return resposta
		} catch (error) {
			throw (error)
		}
	}

}

export default Usuarios