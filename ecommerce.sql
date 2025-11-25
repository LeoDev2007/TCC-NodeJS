create database ecommerce;

use ecommerce;

create table cliente(
	id int(4) PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50) not null,
    username varchar(50) not null,
    email varchar(100) not null,
    senha varchar(20) not null
);

create table endereco(
	id int(4) PRIMARY KEY AUTO_INCREMENT,
    cep varchar(9) not null,
    pais varchar(25) not null,
    estado varchar(25) not null,
    cidade varchar(50) not null,
    bairro varchar(50) not null,
    rua varchar(100) not null,
    numero int(9) not null,
    complemento varchar(50) DEFAULT null,
    id_cliente int(4) not null,
    FOREIGN key(id_cliente) 
    references cliente(id) 
    on update cascade 
    on DELETE cascade
);

create table telefone(
	id int(4) PRIMARY KEY AUTO_INCREMENT,
    fone varchar(14) not null,
    id_cliente int(4) not null,
    FOREIGN key (id_cliente)
    REFERENCES cliente(id)
    on UPDATE CASCADE
    on DELETE CASCADE
);

create table lote(
	id int(4) PRIMARY KEY AUTO_INCREMENT,
    dt_fabricacao date not null,
    dt_validade date not null,
    dt_entrega datetime not null,
    quantidade int(4) not null
);

create table categoria(
	id int(4) PRIMARY key AUTO_INCREMENT,
    nome varchar(50) not null,
    descricao varchar(200) not null
);

create table subcategoria(
	id int(4) primary key AUTO_INCREMENT,
    nome varchar(50)  not null,
    descricao varchar(200) not null,
    id_categoria int (4) not null,
    FOREIGN KEY(id_categoria)
    references categoria(id)
    on update CASCADE
    on delete CASCADE
);

create table produto(
	id int(4) primary key AUTO_INCREMENT,
    nome varchar(50) not null,
    id_lote int(4) not null,
    id_categoria int(4) not null,
    id_subcategoria int(4) not null,
    FOREIGN KEY(id_lote) REFERENCES lote(id) ON update CASCADE on delete CASCADE,
    FOREIGN key(id_categoria) references categoria(id) on update cascade on delete cascade,
    FOREIGN key(id_subcategoria) REFERENCES subcategoria(id) on update cascade on delete CASCADE
);