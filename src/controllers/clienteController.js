const Client = require('../models/clienteModel');

// Teste do servidor
exports.teste = (req, res) => {
    res.send('Servidor funcionando!');
};

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const clients = await Client.getAllClients();  // Espera a lista de clientes
        res.status(200).json(clients);  // Retorna a lista de clientes
    } catch (err) {
        console.error('Erro ao listar clientes:', err);
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
};

// Buscar cliente pelo ID
exports.getClienteById = async (req, res) => {
    const clientId = req.params.id;
    try {
        const client = await Client.getClienteById(clientId);  // Espera o cliente pelo ID
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(client);  // Retorna o cliente encontrado
    } catch (err) {
        console.error('Erro ao buscar cliente por ID:', err);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
};

// Adicionar cliente com endereço integrado
exports.adicionarClienteComEndereco = async (req, res) => {
    const { nome, username, email, senha, idade, telefone, cep, numero, logradouro, bairro, cidade, uf } = req.body;

    const novoCliente = {
        nome,
        username,
        email,
        senha,  // Será criptografado no model
        idade,
        telefone,
        cep,
        numero,
        logradouro,
        bairro,
        cidade,
        uf
    };

    try {
        const result = await Client.addClient(novoCliente);  // Adiciona o novo cliente
        res.status(201).json({ id: result.insertId, ...novoCliente });  // Retorna o novo cliente com o ID
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};

// Login
exports.login = async (req, res) => {
    const { loginInput, senha } = req.body;

    if (!loginInput || !senha) {
        return res.status(400).json({ error: 'Email/username e senha são obrigatórios' });
    }

    try {
        const cliente = await Client.login(loginInput);  // Tenta buscar o cliente
        if (!cliente) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await require('bcrypt').compare(senha, cliente.senha);  // Verifica a senha
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({ message: 'Login bem-sucedido', cliente });  // Retorna mensagem de sucesso
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
