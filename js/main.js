'use strict'

import { lerContatos, criarContato, deletarContato, atualizarContato, buscarContatoPorId } from "./contatos.js"

await criarContatos()

function criarCard(contato) {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    const imagem = document.createElement('img')
    const nome = document.createElement('h2')
    const numero = document.createElement('p')

    card.classList.add('card-contato')
    card.dataset.id = contato.id
    imagem.src = contato.foto || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    nome.textContent = contato.nome
    numero.textContent = contato.celular

    card.addEventListener('click', async () => {
        const id = card.dataset.id
        localStorage.setItem('id', card.dataset.id)
        const contatoRetornado = await buscarContatoPorId(id)
        mostrarDadosDoContatoNoFormulario(contatoRetornado)
    })

    card.append(imagem, nome, numero)
    container.append(card)
}

async function criarContatos() {
    const contatos = await lerContatos()
    contatos.forEach(criarCard)
}

function mostrarFormulario() {
    document.getElementById('container').replaceChildren()
    document.querySelector('main').classList.add('form-show')
}

function ocultarFormulario() {
    document.querySelector('main').classList.remove('form-show')
    limparFormulario()
    criarContatos()
    habilitarCamposDoFormulario()
}

document.getElementById('novo-contato').addEventListener('click', mostrarFormulario)
document.getElementById('cancelar').addEventListener('click', ocultarFormulario)
document.getElementById('editar').addEventListener('click', () => {
    habilitarCamposDoFormulario()
    localStorage.setItem('editando', 'true')
})
document.getElementById('salvar').addEventListener('click', async () => {
    if (localStorage.getItem('editando') == 'true') {
        localStorage.removeItem('editando')
        await atualizarDadosContato(localStorage.getItem('id'))
        setTimeout(() => {
            ocultarFormulario()
        }, 500);
    } else {
        await salvarContato()
        ocultarFormulario()
    }
})
document.getElementById('deletar').addEventListener('click', async () => {
    await deletarContato(localStorage.getItem('id'))
    localStorage.removeItem('id')
    ocultarFormulario()
})

async function salvarContato() {
    const novoContato = {
        "nome": document.getElementById('nome').value,
        "celular": document.getElementById('celular').value,
        "foto": document.getElementById('preview-image').src,
        "email": document.getElementById('email').value,
        "endereco": document.getElementById('endereco').value,
        "cidade": document.getElementById('cidade').value
    }

    await criarContato(novoContato)
}

async function atualizarDadosContato(id) {
    const contato = {
        nome: document.getElementById('nome').value,
        celular: document.getElementById('celular').value,
        foto: document.getElementById('preview-image').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value
    }

    atualizarContato(id, contato)
}

function limparFormulario() {
    document.getElementById('nome').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('preview-image').src = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
}

function desabilitarCamposDoFormulario() {
    document.getElementById('nome').disabled = true
    document.getElementById('celular').disabled = true
    document.getElementById('preview-image').disabled = true
    document.getElementById('email').disabled = true
    document.getElementById('endereco').disabled = true
    document.getElementById('cidade').disabled = true
}

function habilitarCamposDoFormulario() {
    document.getElementById('nome').disabled = false
    document.getElementById('celular').disabled = false
    document.getElementById('preview-image').disabled = false
    document.getElementById('email').disabled = false
    document.getElementById('endereco').disabled = false
    document.getElementById('cidade').disabled = false
}

function mostrarDadosDoContatoNoFormulario(contato) {
    mostrarFormulario()
    desabilitarCamposDoFormulario()
    document.getElementById('nome').value = contato.nome
    document.getElementById('celular').value = contato.celular
    document.getElementById('preview-image').src = contato.foto
    document.getElementById('email').value = contato.email
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value = contato.cidade
}
