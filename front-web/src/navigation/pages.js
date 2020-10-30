import Home from './../screens/home/home'
import Login from './../screens/login/login'
import NotFound from './../screens/notFound/notFound'
import CadastroVaga from './../screens/cadastroVaga/cadastroVaga'
import CadastroEmpresa from './../screens/cadastroEmpresa/cadastroEmpresa'
import CadastroAluno from './../screens/cadastroAluno/cadastroAluno'
import CandidatosAdm from './../screens/candidatosAdm/candidatosAdm'
import InicioCadastro from './../screens/inicioCadastro/inicioCadastro'

const Pages = [
    {
        name: "LoginAdm",
        path: "/login/:administrator",
        component: Login,
        role: "0"
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        role: "0"
    },
    {
        name: "Cadastro Vaga",
        path: "/cadastro-vaga",
        component: CadastroVaga,
        role: "0"
    },
    {
        name: "Cadastro Empresa",
        path: "/cadastro-empresa",
        component: CadastroEmpresa,
        role: "0"
    },
    {
        name: "Cadastro Aluno",
        path: "/cadastro-aluno",
        component: CadastroAluno,
        role: "0"
    },
    {
        name: "Candidatos administrador",
        path: "/candidatos-adm",
        component: CandidatosAdm,
        role: "0"
    },
    {
        name: "Inicio cadastro",
        path: "/inicio-cadastro/:user",
        component: InicioCadastro,
        role: "0"
    }
]

const HomePage = {
    name: "Home",
    path: "/",
    component: Home
}

const NotFoundPage = {
    name: "NotFound",
    component: NotFound
}

export { Pages, HomePage, NotFoundPage }