import { openDatabaseAsync } from 'expo-sqlite';

const DATABASE_NAME = "exemploApp.db";

const SQL_CREATE_CATEGORIA = `CREATE TABLE IF NOT EXISTS categoria (
                              idcategoria INTEGER PRIMARY KEY AUTOINCREMENT,
                              nome TEXT NOT NULL,
                              descricao TEXT,
                              datahora TEXT NOT NULL);`;

const SQL_CREATE_EXTRATOS = `CREATE TABLE IF NOT EXISTS extrato (
                             idextrato INTEGER PRIMARY KEY AUTOINCREMENT,
                             descricao TEXT NOT NULL,
                             tipo TEXT NOT NULL CHECK(tipo IN ('Despesa', 'Receita')),
                             categoria INTEGER,
                             datahora TEXT NOT NULL,
                             valor REAL NOT NULL,
                             FOREIGN KEY(categoria) REFERENCES categoria(idcategoria));`;

let _db = null;

//Realiza a criação das tabelas e limpeza dos dados para testes (Remover antes de entregar o projeto)
export async function openDB() {
  if (!_db) {
    _db = await openDatabaseAsync(DATABASE_NAME);
    
    await _db.execAsync(SQL_CREATE_CATEGORIA);
    await _db.execAsync(SQL_CREATE_EXTRATOS);
    await _db.runAsync(`DELETE FROM categoria`);
    await _db.runAsync(`DELETE FROM extrato`);
  }
  return _db;
}

//INICIO - CRUD - categoria

//Consulta todos os dados
export const fetchCategorias = async (db) => {
  try {
    const categorias = await db.getAllAsync('SELECT * FROM categoria', []);
    return categorias;
  } catch (error) {
    console.log('Erro ao consultar categoria: ', error);
    return [];
  }
};

//Consulta com filtro
export const fetchCategoriasWithParams = async (db, params) => {
  try {
    const { idcategoria, nome } = params;
    let sql = 'SELECT * FROM categoria WHERE 1=1'; 

    const sqlParams = [];
    if (idcategoria) {
      sql += ' AND idcategoria = ?';
      sqlParams.push(idcategoria);
    }
    if (nome) {
      sql += ' AND nome = ?';
      sqlParams.push(nome);
    }

    const categorias = await db.getAllAsync(sql, sqlParams);
    return categorias;
  } catch (error) {
    console.log('Erro ao consultar categoria com parametro: ', error);
    return [];
  }
};

//inserir
export const insertCategoria = async (db, nome, descricao, datahora) => {
  try {
    await db.runAsync(`INSERT INTO categoria (nome, descricao, datahora) VALUES (?, ?, ?)`, [nome, descricao, datahora]);
    console.log('Categoria inserida com sucesso');
  } catch (error) {
    console.log('Erro ao inserir categoria: ', error);
  }
};

//atualizar
export const updateCategoria = async (db, idcategoria, nome, descricao) => {
  try {
    await db.runAsync(`UPDATE categoria SET nome = ?, descricao = ? WHERE idcategoria = ?`, [nome, descricao, idcategoria]);
    console.log('Categoria atualizada com sucesso');
  } catch (error) {
    console.log('Erro ao atualizar categoria: ', error);
  }
};

//deletar
export const deleteCategoria = async (db, idcategoria) => {
  try {
    await db.runAsync(`DELETE FROM categoria WHERE idcategoria = ?`, [idcategoria]);
    console.log('Categoria deletada com sucesso');
  } catch (error) {
    console.log('Erro ao deletar categoria: ', error);
  }
};
//FIM - CRUD - categoria

//INICIO - CRUD - extrato

//Consulta total saldo
export const selecionaSaldo = async (db) => {
    try {
      const result = await db.getAllAsync(`SELECT SUM(CASE WHEN tipo = 'Receita' THEN valor ELSE 0 END) - 
                                                 SUM(CASE WHEN tipo = 'Despesa' THEN valor ELSE 0 END) AS saldo 
                                            FROM extrato`, []);
      return result.length > 0 ? result[0].saldo || 0 : 0;
    } catch (error) {
      console.log('Erro ao consultar saldo: ', error);
      return [];
    }
  };

//Consulta todos os dados
export const fetchExtratos = async (db) => {
  try {
    const extratos = await db.getAllAsync('SELECT * FROM extrato', []);
    return extratos;
  } catch (error) {
    console.log('Erro ao consultar extrato: ', error);
    return [];
  }
};

//Consulta com filtro
export const fetchExtratosWithParams = async (db, params) => {
  try {
    const { idextrato, tipo, categoria } = params;
    let sql = 'SELECT * FROM extrato WHERE 1=1'; 

    const sqlParams = [];
    if (idextrato) {
      sql += ' AND idextrato = ?';
      sqlParams.push(idextrato);
    }
    if (tipo) {
      sql += ' AND tipo = ?';
      sqlParams.push(tipo);
    }
    if (categoria) {
      sql += ' AND categoria = ?';
      sqlParams.push(categoria);
    }

    const extratos = await db.getAllAsync(sql, sqlParams);
    return extratos;
  } catch (error) {
    console.log('Erro ao consultar extrato com parametro: ', error);
    return [];
  }
};

//inserir
export const insertExtrato = async (db, descricao, tipo, categoria, datahora, valor) => {
  try {
    await db.runAsync(`INSERT INTO extrato (descricao, tipo, categoria, datahora, valor) VALUES (?, ?, ?, ?, ?)`, [descricao, tipo, categoria, datahora, valor]);
    console.log('Extrato inserido com sucesso');
  } catch (error) {
    console.log('Erro ao inserir extrato: ', error);
  }
};

//atualizar
export const updateExtrato = async (db, idextrato, tipo, valor) => {
  try {
    await db.runAsync(`UPDATE extratos SET tipo = ?, valor = ? WHERE idextrato = ?`, [tipo, valor, idextrato]);
    console.log('Extrato atualizado com sucesso');
  } catch (error) {
    console.log('Erro ao atualizar extrato: ', error);
  }
};

//deletar
export const deleteExtrato = async (db, idextrato) => {
  try {
    await db.runAsync(`DELETE FROM extrato WHERE idextrato = ?`, [idextrato]);
    console.log('Extrato deletado com sucesso');
  } catch (error) {
    console.log('Erro ao deletar extrato: ', error);
  }
};
//FIM - CRUD - extrato
