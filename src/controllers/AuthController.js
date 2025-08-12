const bcrypt = require('bcrypt');
const Usuarios = require('../models/UsuarioModel_DB');

class AuthController {
    async login(email, password) {
        // Busca o usuário apenas pelo login (username ou email)
        const usuario = await Usuarios.findOne({
            where: { email: email }
        });

        if (!usuario) {
            return null; // usuário não encontrado
        }

        // Compara a senha fornecida com o hash do banco
        const senhaValida = await bcrypt.compare(password, usuario.password);

        if (!senhaValida) {
            return null; // senha incorreta
        }

        // Aqui você pode retornar o usuário ou gerar o token JWT
        return {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.firstname
            };
    }
}

module.exports = AuthController