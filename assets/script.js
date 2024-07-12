//bibliotecas e códigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

//objeto{}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-07 11:30"),
    finalizada: true
}
//array[]
let atividades = [
    atividade,
    {
        nome: 'Senai',
        data: new Date("2024-07-08 13:00"),
        finalizada: false
    },
    {
        nome: 'Academia',
        data: new Date("2024-07-08 17:00"),
        finalizada: false
    },
]

// atividades = []

//Arrrow function () => {}
const criarItemDeAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `

    if(atividade.finalizada) {
        input += 'checked'
    }
    input += '>'

    const formatar = formatador(atividade.data);

    return `<div class="card-bg">
            ${input}
            
        <div>
            <img class="inactive" src="../../icons/circle-dashed.svg" alt="">
            <img class="active" src="../../icons/circle-check.svg" alt="">
            <span>${atividade.nome}</span>
        </div>
        <time class="short">
         ${formatar.dia.semana.curto}. ${formatar.dia.numerico}<br> ${formatar.hora}
          </time>
        <time class="full">
            ${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico}
            de ${formatar.mes} 
            às ${formatar.hora}h </time>
        </div>`
}



const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    //verificar se a lista está vazia
    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }


    for (let atividade of atividades) {
        section.innerHTML += criarItemDeAtividade(atividade)
    }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosFormulario = new FormData(event.target)


    const nome = dadosFormulario.get('atividade')
    const dia = dadosFormulario.get('dia')
    const hora = dadosFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert ('Dia/Hora não disponível')  
     }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        '2024-07-08',
        '2024-07-09',
        '2024-07-11',
        '2024-07-12',
        '2024-07-13',
    ]

    let diasSelecao = ''

    for (let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `
      ${formatar.dia.numerico} de 
      ${formatar.mes}
      `
        diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
      `
    }

    document
        .querySelector('select[name="dia"]')
        .innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for (let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }


    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if (!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}