import iconSharkProfile from './../../assets/images/icons/sharkProfile.png'
import iconCatProfile from './../../assets/images/icons/catProfile.png'
import iconEagleProfile from './../../assets/images/icons/eagleProfile.png'
import iconWolfProfile from './../../assets/images/icons/wolfProfile.png'

export const Positions = [
    "Gestor", 
    "Gerente", 
    "Estagiário", 
    "Supervisor", 
    "Diretor", 
    "Coordenador",
    "Consultor",
    "Executivo",
    "Suporte",
    "Auxiliar"
]

export const Levels = ["Junior", "Pleno" , "Senior"]

export const UF = [
    "MG", 
    "SP", 
    "RJ", 
    "RO", 
    "AC", 
    "AM", 
    "RR", 
    "PA", 
    "AP", 
    "TO", 
    "MA", 
    "PI", 
    "CE", 
    "RN", 
    "PB",
    "PE",
    "AL",
    "SE",
    "BA",
    "MG",
    "ES",
    "PR",
    "SC",
    "RS",
    "MS",
    "MT",
    "GO",
    "DF"
]

export const TypeContracts = [
    "PJ",
    "CLT",
    "Estágio"
]

export const BehavioralProfiles = {
    Lobo: {
        Description: "Analisa, quantifica, é lógico, é crítico, é realista, gosta de números, entende de dinheiro, sabe como as coisas funcionam. Gosta de trabalhar sozinho, realizar, analisar dados, lidar com aspectos financeiros, montar as coisas, fazer algo funcionar, resolver problemas difíceis. Como são pessoas muito objetivas, são perfeitas para atividades de execução, com escopo e prazos definidos. Para esse tipo de pessoa, a palavra de ordem é objetividade. A comunicação com esse tipo de profissional deve ser feita de forma direta, de forma rápida e sem muitos rodeios, com reuniões rápidas, objetivas e com pauta definida." ,
        StrongPoints: "Pensar em longo prazo e cumprir com regras e responsabilidade.",
        Weaknesses: " Dificuldade de se adaptar às mudanças pode impedir o progresso.",
        SrcImgIcon: iconWolfProfile
    },
    Gato: {
        Description: "De forma geral: é curioso, brinca, é sensível com os outros, gosta de ensinar, toca muito nas pessoas, gosta de apoiar, é expressivo, emocional, fala muito. Gosta de conseguir que os outros trabalhem bem juntos, de resolver questões de clientes, expressar ideias, desenvolver relacionamentos, fazer parte de uma equipe, convencer as pessoas, perceber o ambiente. Para esse tipo de profissional o que importa são as pessoas. Como ele, desperta empatia em todos com quem se relaciona, geralmente está presente nas áreas de contato direto com o cliente (em áreas comerciais, vendas e SAC) ou de recursos humanos da empresa. Todo líder precisa ter o seu lado relacional desenvolvido, pois isso é fundamental para exercer influência sobre seus liderados.",
        StrongPoints: "Trabalhar em equipe e comunicação aberta.",
        Weaknesses: "Esconder conflitos e manipular através dos sentimentos.",
        SrcImgIcon: iconWolfProfile
    },
    Aguia: {
        Description: "De forma geral: tem insights, imagina, especula, corre riscos, é impetuoso, quebra regras, gosta de surpresas, percebe oportunidades. Gosta de arriscar-se, inventar soluções, desenvolver uma visão, fazer projetos, causar mudanças, fazer experiências, vender ideias, ter muito espaço, lidar com o futuro, enxerga o fim desde o começo, é visual. Para ele a palavra de ordem é'“Inovação'. Esse profissional é quem está sempre trabalhando com os olhos no futuro. Está sempre procurando o que há de novo e o que se pode “reinventar”. Essas pessoas devem assumir atividades que buscam inovação e mudanças de paradigma.",
        StrongPoints: "Provocar mudanças radicais e antecipar o futuro.",
        Weaknesses: "Falta de atenção para o presente, impaciência e rebeldia.",
        SrcImgIcon: iconEagleProfile
    },
    Tubarao: {
        Description: "Em geral: toma providências, estabelece procedimentos, é confiável, organiza, é arrumado, pontual, planeja. Gosta de cumprir o cronograma, construir coisas, estar no controle, de ambiente organizado, fazer tarefas burocráticas, colocar ordem nas ações, planejar, estabilizar, administrar. Para ele a palavra é “segurança”. Tem uma habilidade diferenciada em definição, controle e execução de processos. Tem facilidade de lidar com muita informação e um senso de organização bem aguçado. Desmotiva-se com atividades repetitivas.",
        StrongPoints: "Fazer com que os processos ou projetos aconteçam e conseguir parar com a burocracia.",
        Weaknesses: "Relacionamento complicado e fazer do jeito mais fácil.",
        SrcImgIcon: iconSharkProfile
    }
}