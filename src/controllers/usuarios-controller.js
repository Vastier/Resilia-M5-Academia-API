import { celebrate, errors, Segments } from 'celebrate'
import { cadastroSchema } from '../models/schema/usuarios-schema.js';
import Usuarios from '../models/usuarios.js'
import bcrypt from 'bcrypt'

const usuariosController = (app, db) => {
	const usuariosModel = new Usuarios(db)

	const validarBodyCadastro = {[Segments.BODY]: cadastroSchema}

	const _cryptaSenha = async (senha) => {
		try {
			const get_salty = 11
			return bcrypt.hash(senha, get_salty)
		} catch (error) {
			throw new Error(error)
		}
	}
	
	app.get('/usuarios', async (req, res)=>{
		try {
			const listaUsuarios = await usuariosModel.listarTodosUsuarios()
			res.status(200).json({listaUsuarios})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"mensagem de erro": error.message,
			})
		}
	})
	
	app.post('/cadastrar', celebrate(validarBodyCadastro, { abortEarly: false }, {mode: 'full'}), async (req, res)=>{
		
		const user = req.body
		try {
			const emailExiste = await usuariosModel._usuarioPorEmail(user.email)
			if (emailExiste.length > 0) {
				throw 'Email já cadastrado.'
			}
			user.senha = await _cryptaSenha(user.senha)
			const registraUser = await usuariosModel.inserirUsuario(user)
			res.status(201).json({registraUser})
		} catch (error) {
			res.status(400).send({
				"erro": true,
				"Mensagem de erro": error,
			})
		}
	})

	app.put('/atualizar/:id', async (req, res)=>{
		const id = req.params.id
		const usuarioAtualizado = req.body
		try {
			usuarioAtualizado.senha = await _cryptaSenha(usuarioAtualizado.senha)
			const respostaAtualizaUsuario = await usuariosModel.atualizaUsuario(id, usuarioAtualizado)
			res.status(200).json({
				"erro": false, 
				"resposta": respostaAtualizaUsuario.resposta,
				"dadosAntigos" : respostaAtualizaUsuario.dadosAntigos,
				"dadosAtualizados": respostaAtualizaUsuario.dadosAtualizados
			})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"Mensagem de erro": error.message
			})
		}
	})

	app.delete('/apagar/:id', async (req, res)=>{
		const id = req.params.id
		try {
			const respostaApagaUsuario = await usuariosModel.apagaUsuario(id)
			res.status(200).json({
				"erro": false, 
				"resposta": respostaApagaUsuario.resposta,
				"usuarioApagado": respostaApagaUsuario.usuarioApagado[0],
			})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"Mensagem de erro": error.message
			})
		}
	})

	app.post('/medidas/cadastrar', async (req, res)=>{
		const user = req.body
		try {
			const registraMedidas = await usuariosModel.inserirMedidas(user)
			res.status(200).json({registraMedidas})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"mensagem de erro": error.message,
			})
		}
	})

	app.get('/medidas/listar', async (req, res)=>{
		try {
			const listaMedidas = await usuariosModel.listaTodasMedidas()
			res.status(200).json({listaMedidas})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"mensagem de erro": error.message,
			})
		}
	})


	app.get('/medidas/porid/:id', async (req, res)=>{
		const id = req.params.id
		try {
			const listaMedidas = await usuariosModel._listaMedidasPorId(id)
			res.status(200).json({listaMedidas})
		} catch (error) {
			res.status(400).json({
				"erro": true,
				"mensagem de erro": error.message,
			})
		}
	})

	app.use(errors({message: "Não foi possível validar seu pedido."}));
	
}

export default usuariosController