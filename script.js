let participantes = [
   {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 25, 18, 0o0),
      dataCheckIn: new Date(2024, 2, 25, 14, 45)
   },
   {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0o0)
   },
   {
      nome: "Ana Silva",
      email: "ana.silva@example.com",
      dataInscricao: new Date(2024, 2, 23, 10, 30),
      dataCheckIn: new Date(2024, 2, 27, 21, 45)
   },
   {
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@example.com",
      dataInscricao: new Date(2024, 2, 24, 14, 15),
      dataCheckIn: null
   },
   {
      nome: "Daniela Santos",
      email: "daniela.santos@example.com",
      dataInscricao: new Date(2024, 2, 25, 9, 0o0),
      dataCheckIn: new Date(2024, 3, 1, 20, 15)
   },
   {
      nome: "Eduardo Lima",
      email: "eduardo.lima@example.com",
      dataInscricao: new Date(2024, 2, 25, 11, 30),
      dataCheckIn: null
   },
   {
      nome: "Fernanda Alves",
      email: "fernanda.alves@example.com",
      dataInscricao: new Date(2024, 2, 25, 13, 45),
      dataCheckIn: new Date(2024, 2, 25, 18, 30)
   },
   {
      nome: "Gabriel Costa",
      email: "gabriel.costa@example.com",
      dataInscricao: new Date(2024, 2, 25, 15, 15),
      dataCheckIn: new Date(2024, 2, 24, 17, 0o0)
   },
   {
      nome: "Helena Rodrigues",
      email: "helena.rodrigues@example.com",
      dataInscricao: new Date(2024, 2, 25, 16, 30),
      dataCheckIn: null
   },
   {
      nome: "Isaac Ferreira",
      email: "isaac.ferreira@example.com",
      dataInscricao: new Date(2024, 2, 25, 17, 45),
      dataCheckIn: new Date(2024, 2, 25, 15, 30)
   },  
];

const criarNovoParticipante = (participante) => {
   const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
   let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
   
   //condicional
   if (participante.dataCheckIn == null) {
      dataCheckIn = `
         <button 
            data-email="${participante.email}"
            onclick = "fazerCheckIn(event)"
         >
            Confirmar check-in
         </button>
      `
   }

   return `
      <tr>
         <td>
            <strong>
               ${participante.nome}
            </strong>
            <br>
            <small>
               ${participante.email}
            </small>
         </td>
         <td>${dataInscricao}</td>
         <td>${dataCheckIn}</td>
      </tr>
   `
}

const atualizarLista = (participantes) => {
   let output = ""
   for (let participante of participantes) {
      output = output + criarNovoParticipante(participante)
   }
   
   document.querySelector('tbody').innerHTML = output

}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
   event.preventDefault()

   const dadosDoFomulario = new FormData(event.target)

   const participante = {
      nome: dadosDoFomulario.get("nome"),
      email: dadosDoFomulario.get("email"),
      dataInscricao: new Date(),
      dataCheckIn: null,
   }

   //verificar se o participante já existe
   const participanteExiste = participantes.find(
      (p) => p.email == participante.email
   )

   if(participanteExiste) {
      alert("Email já cadastrado!")
      return
   }

   //adiciona participante a lista
   participantes = [participante, ...participantes]

   atualizarLista(participantes)

   //limpar o formulario
   event.target.querySelector('[name=nome]').value=""
   event.target.querySelector('[name=email]').value=""
}

const fazerCheckIn = (event) => {
   //confirmar se realmente quer o check-in
   const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
   
   if(confirm(mensagemConfirmacao) == false) {
      return
   }

   //encontrar o praticipante dentro da lista
   const participante = participantes.find((p) => {
      return p.email ==  event.target.dataset.email
   })

   //atualizar o check-in do praticipante
   participante.dataCheckIn = new Date()

   //atualizar a lista de participantes
   atualizarLista(participantes)
}