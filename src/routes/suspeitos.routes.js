import { Router } from "express"

const suspeitosRoutes = Router()

let artistasSuspeitos = [
    {
        id: Number(Math.floor(Math.random()* 99)+ 1),
        nome: "P. Diddy",
        idade: 54,
        descricaoFisica: ["Homem", "Negro", "Barbudo", "Alto"],
        atividadeSuspeita: "sim"
    },
    {
        id: Number(Math.floor(Math.random()* 99)+ 1),
        nome: "Justin Bieber",
        idade: 30,
        descricaoFisica: ["Homem", "Branco", "Tatuado", "Loiro"],
        atividadeSuspeita: "não"
    },
    {
        id: Number(Math.floor(Math.random()* 99)+ 1),
        nome: "Beyoncé",
        idade: 43,
        descricaoFisica: ["Mulher", "Negra", "Olhos Castanhos", "Loira"],
        atividadeSuspeita: "sim"
    }
]

//Rota para buscar todos os artistasSuspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).send(artistasSuspeitos)
})

//Rota para criar novo artistaSuspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, idade, descricaoFisica, atividadeSuspeita } = req.body

    //Validação de campos obrigatórios
    if(!nome || !idade) {
        return res.status(400).send({message: "Os campos nome e idade são obrigatórios"})
    }

    if(atividadeSuspeita != "sim" && atividadeSuspeita != "não") {
        return res.status(400).send({message: "Por favor digitar 'sim' ou 'não'"})
    }

    if(!Number.isInteger(idade)){
        return res.status(400).send({message: "Por favor digitar um número inteiro"})
    }


    const novoSuspeito = {
        id: Number(Math.floor(Math.random()* 99)+ 1),
        nome,
        idade,
        descricaoFisica,
        atividadeSuspeita
    }

    artistasSuspeitos.push(novoSuspeito)
    return res.status(201).send({message: "Artista Suspeito cadastrado com sucesso!", novoSuspeito})
})

// Rota para buscar um artistaSuspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    const artista = artistasSuspeitos.find((artist) => artist.id == id);

    // Verifica se o artistaSuspeito foi encontrado
    if (!artista) {
    return res.status(404).send({ message: `Artista Suspeito com id ${id} não foi encontrado` });
    }

    return res.status(200).send(artista);
})

// Rota para atualizar um artistaSuspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, idade, descricaoFisica, atividadeSuspeita} = req.body;

    const artista = artistasSuspeitos.find((artist) => artist.id == id);

    //Validação de campos obrigatórios
    if(!nome || !idade) {
        return res.status(400).send({message: "Os campos nome e idade são obrigatórios"})
    }

    if(atividadeSuspeita != "sim" && atividadeSuspeita != "não") {
        return res.status(400).send({message: "Por favor digitar 'sim' ou 'não'"})
    }

    if(!Number.isInteger(idade)){
        return res.status(400).send({message: "Por favor digitar um número inteiro"})
    }

    if (!artista) {
        return res.status(404).send({ message: `Artista Suspeito com id ${id} não foi encontrado` });
        }

    artista.nome = nome
    artista.idade = idade
    artista.descricaoFisica = descricaoFisica || []
    artista.atividadeSuspeita = atividadeSuspeita

    return res.status(200).send({message: "Artista Suspeito atualizado com sucesso!",artista,});
})

//Rota para deletar um artistaSuspeito
suspeitosRoutes.delete("/:id", (req,res) => {
    const { id } = req.params

    const artista = artistasSuspeitos.find((artist) => artist.id === Number(id))

    if (!artista) {
        return res.status(404).send({ message: "Artista Suspeito não encontrado" })
    }

artistasSuspeitos = artistasSuspeitos.filter((artist) => artist.id !== Number(id) )

return res.status(200).send({message: "Artista Suspeito deletado!",artista,})
})

export default suspeitosRoutes