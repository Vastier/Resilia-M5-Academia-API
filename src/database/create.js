import db from "./sqlite-db.js"

const CRIA_TABELA_USUARIOS = `
	CREATE TABLE IF NOT EXISTS "usuarios"(
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome" varchar(64),
	"cpf" varchar(64),
	"email" varchar(64),
	"senha" varchar(64)
	)`

const CRIA_TABELA_MEDIDAS = `
	CREATE TABLE IF NOT EXISTS "medidas"(
	id INTEGER PRIMARY KEY NOT NULL,
	timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
	user_id INTEGER,
	altura DECIMAL(3,2),
	peso DECIMAL(3,2),
	massaMuscular DECIMAL(3,2),
	ombrosE DECIMAL(3,2),
	ombrosD DECIMAL(3,2),
	taxaGordura DECIMAL(3,2),
	tricipalE DECIMAL(3,2),
	tricipalD DECIMAL(3,2),
	peitoral DECIMAL(3,2),
	cintura DECIMAL(3,2),
	quadril DECIMAL(3,2),
	bracoE DECIMAL(3,2),
	bracoD DECIMAL(3,2),
	pernaE DECIMAL(3,2),
	pernaD DECIMAL(3,2),
	panturrilhaE DECIMAL(3,2),
	panturrilhaD DECIMAL(3,2),
	abdomem DECIMAL(3,2),
	gluteo DECIMAL(3,2)
	)`

function criaTabelaUsuarios() {
	db.run(CRIA_TABELA_USUARIOS, (error)=> {
		if (error)
		console.log(`Ocorreu o seguinte erro ao tentar criar a tabela Usuarios: \n ${error.message}`);
	})
}

function criaTabelaMedidas() {
	db.run(CRIA_TABELA_MEDIDAS, (error)=> {
		if (error)
		console.log(`Ocorreu o seguinte erro ao tentar criar a tabela Medidas: \n ${error.message}`);
	})
}


db.serialize(()=> {
	criaTabelaUsuarios();
	criaTabelaMedidas();
})