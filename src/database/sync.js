const connection = require('../config/connection');

require('../models/UsuarioModel_DB')
require('../models/ProdutoModel_DB')
require('../models/OpcaoModel')
require('../models/ImagemModel')
require('../models/ProdutoCategoriaModel')
require('../models/CategoriaModel')

connection.sync()






