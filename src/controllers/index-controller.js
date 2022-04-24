//Página de fallback na rota principal
const indexController = (app)=>{
	app.get('/', (req, res)=>{
		res.send(`
		<h1 align="center">Index is OkiDoki.</h1>
		`)
	})
}

export default indexController