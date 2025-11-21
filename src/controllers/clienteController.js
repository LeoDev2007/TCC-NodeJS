const Client = require('../models/clienteModel');

// Teste do servidor
exports.teste = (req, res) => {
    res.send('Servidor funcionando!');
};

// Listar todos os clientes
exports.listarClientes = (req, res) => {
    Client.getAllClients((clients) => {
        res.status(200).json(clients);
    });
};

// Buscar cliente pelo ID
exports.getClienteById = (req, res) => {
    const clientId = req.params.id;
    Client.getClienteById(clientId, (client) => {
        res.status(200).json(client);
    });
};

// Adicionar cliente com endereço integrado
exports.adicionarClienteComEndereco = (req, res) => {
    const {
        nome,
        username,
        email,
        senha,
        idade,
        telefone,
        cep,
        numero,
        logradouro,
        bairro,
        cidade,
        uf
    } = req.body;

    const novoCliente = {
        nome,
        username,
        email,
        senha, // será criptografado no model
        idade,
        telefone,
        cep,
        numero,
        logradouro,
        bairro,
        cidade,
        uf
    };

    Client.addClient(novoCliente, (result) => {
        res.status(201).json({ id: result.insertId, ...novoCliente });
    });
};

// Login
exports.login = (req, res) => {
    const { loginInput, senha } = req.body;
    if (!loginInput || !senha) {
        return res.status(400).json({ error: 'Email/username e senha são obrigatórios' });
    }

    Client.login(loginInput, async (cliente) => {
        if (!cliente) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await require('bcrypt').compare(senha, cliente.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({ message: 'Login bem-sucedido', cliente });
    });
};
