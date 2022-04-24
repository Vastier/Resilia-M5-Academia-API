
class UsuariosDAO {
	constructor(db){
		this.db = db
	}

	listarTodosUsuarios = () => {
		return new Promise((resolve, reject) => {
			this.db.all('SELECT * FROM USUARIOS', (error, rows) => {
				if(error){
					reject(error)
				}else{
					resolve(rows)
				}
			})
		});
	}

	registraUsuario = (usuario) => {
		return new Promise((resolve, reject) => { 
			this.db.run(
				'INSERT INTO USUARIOS (NOME, CPF, EMAIL, SENHA) VALUES (?, ?, ?, ?)',
				usuario.nome,
				usuario.cpf,
				usuario.email,
				usuario.senha,
				(error) => {
					if (error) {
						reject(error)
					} else {
						resolve(`Usuário de nome '${usuario.nome}' adicionado ao banco de dados com sucesso.`)
					}
				}
			)
		 })
	}

	atualizaUsuario = (id, usuarioAtualizado) => {
		return new Promise((resolve, reject) => { 
			this.db.run(
				'UPDATE USUARIOS SET NOME = ?, CPF = ?, EMAIL = ?, SENHA = ? WHERE ID = ?',
				usuarioAtualizado.nome,
				usuarioAtualizado.cpf,
				usuarioAtualizado.email,
				usuarioAtualizado.senha,
				id,
				(error) => {
					if (error) {
						reject(error)
					} else {
						resolve(`Dados do usuário '${usuarioAtualizado.nome}' atualizado com sucesso no banco de dados.`)
					}
				}
			)
		 })
	}
	
	apagaUsuario = (id) => {
		return new Promise((resolve, reject) => {
			this.db.run(
				'DELETE FROM USUARIOS WHERE ID = ?',
				id,
				(error) => {
					if(error){
						reject(error)
					}else{
						resolve(`Usuário de ID ${id} apagado com sucesso.`)
					}
			})
		})
	}
	
	inserirMedidas = (medidas) => {
		return new Promise((resolve, reject) => { 
			this.db.run(
				'INSERT INTO MEDIDAS (user_id, altura, peso, massaMuscular, ombros, taxaGordura, tricipal, peitoral, cintura, quadril, bracoE, bracoD, pernaE, pernaD, panturrilhaE, panturrilhaD, abdomem, gluteo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				medidas.user_id,
				medidas.altura, 
				medidas.peso, 
				medidas.massaMuscular, 
				medidas.ombros, 
				medidas.taxaGordura, 
				medidas.tricipal, 
				medidas.peitoral, 
				medidas.cintura, 
				medidas.quadril, 
				medidas.bracoE, 
				medidas.bracoD, 
				medidas.pernaE, 
				medidas.pernaD, 
				medidas.panturrilhaE, 
				medidas.panturrilhaD, 
				medidas.abdomem, 
				medidas.gluteo, 
				(error) => {
					if (error) {
						reject(error)
					} else {
						resolve(`Medidas adicionadas ao banco de dados com sucesso.`)
					}
				}
			)
		 })
	}

	listaTodasMedidas = () => {
		return new Promise((resolve, reject) => {
			this.db.all('SELECT * FROM MEDIDAS', (error, rows) => {
				if(error){
					reject(error)
				}else{
					resolve(rows)
				}
			})
		});
	}

	_verificaId = (id) => {
		return new Promise((resolve, reject) => {
			this.db.all(
				'SELECT * FROM USUARIOS WHERE ID = ?',
				id,
				(error, rows) => {
					if(error){
						reject(error)
					}else{
						resolve(rows)
					}
			})
		})
	}
	
	_verificaEmail = (email) => {
		return new Promise((resolve, reject) => {
			this.db.all(
				'SELECT * FROM USUARIOS WHERE EMAIL = ?',
				email,
				(error, rows) => {
					if(error){
						reject(error)
					}else{
						resolve(rows)
					}
			})
		})
	}
}

export default UsuariosDAO