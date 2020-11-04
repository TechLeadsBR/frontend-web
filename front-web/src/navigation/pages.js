import Home from './../screens/home/home'
import Login from './../screens/login/login'
import NotFound from './../screens/notFound/notFound'
import CadastroVaga from './../screens/cadastroVaga/cadastroVaga'
import CadastroEmpresa from './../screens/cadastroEmpresa/cadastroEmpresa'
import PerfilAluno from './../screens/perfilAluno/perfilAluno'
import CadastroAluno from './../screens/cadastroAluno/cadastroAluno'
import CandidatosAdm from './../screens/candidatosAdm/candidatosAdm'
import InicioCadastro from './../screens/inicioCadastro/inicioCadastro'
import PerfilEmpresa from './../screens/perfilEmpresa/perfilEmpresa'
import GerenciarVagas from './../screens/gerenciarVagas/gerenciarVagas'
import BuscarVagas from './../screens/buscarVagas/buscarVagas'
import EmpresasAdm from './../screens/empresasAdm/empresasAdm'

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
        role: "3"
    },
    {
        name: "Cadastro Empresa",
        path: "/cadastro-empresa",
        component: CadastroEmpresa,
        role: "0"
    },
    {
        name: "Perfil Aluno",
        path: "/perfil-aluno",
        component: PerfilAluno,
        role: "2"
    },
    {
        name: "Perfil Empresa",
        path: "/perfil-empresa",
        component: PerfilEmpresa,
        role: "3"
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
        role: "1"
    },
    {
        name: "Inicio cadastro",
        path: "/inicio-cadastro/:user",
        component: InicioCadastro,
        role: "0"
    },
    {
        name: "Gerenciar Vagas",
        path: "/gerenciar-vagas",
        component: GerenciarVagas,
        role: "3"
    },
    {
        name: "Buscar Vagas",
        path: "/buscar-vagas",
        component: BuscarVagas,
        role: "2"
    },
    {
        name: "Empresas Adm",
        path: "/empresas-adm",
        component: EmpresasAdm,
        role: "1"
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