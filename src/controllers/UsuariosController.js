const Usuarios = require('../models/UsuarioModel_DB')
const bcrypt = require('bcrypt');

class UsuariosController {
    async listar(request, response) {

        try {
            const dados = await Usuarios.findAll()
            return response.json(dados)

        } catch (error) {
            console.error('Erro ao consultar usuários :', error);
            return response.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    // try/catch garante que qualquer erro (ex: conexão com o banco) não derrube seu servidor. Importante que o CRUD trate possíveis erros.
    async consultarPorId(request, response) {
        try {
            const id = request.params.id;

            const dados = await Usuarios.findByPk(id);

            if (dados) {
                return response.status(200).json(dados);
            } else {
                return response.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao consultar usuário por ID:', error);
            return response.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async criar(request, response) {

        try {
            const body = request.body;
            const { firstname, surname, email, password } = body;
            if (!firstname || !surname || typeof firstname !== 'string' || typeof surname !== 'string') {
                return response.status(400).json({ erro: "Campo 'nome' e 'sobrenome' são obrigatórios e devem ser uma string." });
            }

            if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
                return response.status(400).json({ erro: "Campos 'email' e 'senha' são obrigatórios e devem ser strings." });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await Usuarios.create({ firstname, surname, email, password: hashedPassword });

            return response.status(201).json({ message: "Usuário cadastrado com sucesso" })

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return response.status(400).json({ error: 'Email já cadastrado' });
            }
            console.error('Erro ao cadastrar usuário:', error);
            return response.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    async atualizar(request, response) {
        //aqui há operações assíncronas, retorna sempre promisse.
        try {
            const id = request.params.id;
            const { firstname, surname, email, password } = request.body;

            if (!firstname || !surname || typeof firstname !== 'string' || typeof surname !== 'string') {
                return response.status(400).json({ erro: "Campo 'nome' e 'sobrenome' são obrigatórios e devem ser uma string." });
            }

            if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
                return response.status(400).json({ erro: "Campos 'email' e 'senha' são obrigatórios e devem ser strings." });
            }

            const user = await Usuarios.findByPk(id);
            // uso do await pois o retorno é uma promisse, esperar a operação busca ser concluida para então poder continuar execução do código
            if (!user) {
                return response.status(404).json({ erro: 'Usuario não encontrado para atualização.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({ firstname, surname, email, password: hashedPassword });

            // uso do await para esperar a operação update ser concluida para então poder continuar execução do código

            return response.status(204).json({ message: "Usuário atualizado com sucesso" });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return response.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async deletar(request, response) {

        try {
            const id = request.params.id;
            const user = await Usuarios.findByPk(id);

            if (!user) {
                return response.status(404).json({ erro: 'Usuário não encontrado para exclusão.' });
            }
            await user.destroy()
            return response.status(204).end()

        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            return response.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

}

module.exports = new UsuariosController();