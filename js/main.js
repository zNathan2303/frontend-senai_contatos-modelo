'use strict'

import { lerContatos, criarContato, deletarContato, atualizarContato, buscarContatoPorId } from "./contatos.js"

function criarCard(contato) {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    const imagem = document.createElement('img')
    const nome = document.createElement('h2')
    const numero = document.createElement('p')

    card.classList.add('card-contato')
    imagem.src = contato.foto || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    nome.textContent = contato.nome
    numero.textContent = contato.celular

    card.append(imagem, nome, numero)
    container.append(card)
}

async function criarContatos() {
    const contatos = await lerContatos()
    contatos.forEach(criarCard)
}

await criarContatos()

function mostrarFormulario() {
    document.getElementById('container').replaceChildren()
    document.querySelector('main').classList.add('form-show')
}

function ocultarFormulario() {
    document.querySelector('main').classList.remove('form-show')
    criarContatos()
}

document.getElementById('novo-contato').addEventListener('click', mostrarFormulario)
document.getElementById('cancelar').addEventListener('click', ocultarFormulario)

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

    document.getElementById('nome').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('preview-image').src = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
}

document.getElementById('salvar').addEventListener('click', async () => {
    await salvarContato()
    ocultarFormulario()
})

