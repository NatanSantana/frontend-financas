<template>
    <div class="dashboard">
        <div class="painel-lateral">
            <div id="container-mensal">
                <h1>Gasto Mensal</h1>
                <h2>R$ {{ parseFloat(valor).toFixed(2) }}</h2>
                <h1>Gasto Por Categoria:</h1>
                
                <p v-for="cg in gastoPorCategoria" :key="cg.categoria"> <span style="color: whitesmoke; font-weight: bold;" >{{ cg.categoria }}</span> - R${{ cg.total }}</p>
            </div>

        <div class="addCompra">
                <h1>Adicione compras</h1>
                <div id="formsCompra">
                    <input v-model="descricao" type="text" placeholder="Descrição" id="inputDescricao">
                    <input v-model="valorCompra" type="number" placeholder="Valor" id="inputValor">
                    <select id="selectCategoria" v-model="categoriaSelecionada">
                        <option>-</option>
                        <option v-for="cat in categorias" :key="cat.idCategoria" :value="cat.idCategoria">
                            {{ cat.nome }}
                        </option>
                    </select>
                    <button @click="registraCompra">Confirmar</button>

                    
                </div>
                
                

            <div class="criarCategorias">
                <h1>Crie uma Categoria</h1>
                <div id="formsCompra">
                    <input v-model="categoriaCriada" placeholder="Nome">
                    <button @click="criarCategoria">Confirmar</button>

                </div>
            </div>

            <div class="economia">
                    <h1>Guardar</h1>
                    <div id="formsEconomia">
                        <input v-model="dinheiroEconomia" type="number" placeholder="valor">
                        <button @click="guardarDinheiro">Guardar</button>
                        <button @click="diminuirDinheiro">Retirar</button>
                    </div>
                      
                </div>

        </div>


        </div>

        <div id="compras">
            <h1>Compras</h1>
            <div class="filtroMes">
                <input v-model="mesFiltro" type="month" id="mesAno">
                <button @click="mesSelecionado" id="buttonMes">Filtrar</button>
            </div>

            <div class="gastos" v-for="c in comprasPaginadas" :key="c.idGastos">
                <p>R$ {{ c.valor }} — {{ c.descricao }} <span class="data">{{ formatarData(c.dataCompra) }}  <button @click="excluir(c.idGastos)" id="excluir">X</button></span>  </p>
            </div>

            <div class="paginacao">
                <button @click="paginaAnterior" :disabled="paginaAtual === 1">Anterior</button>
                <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
                <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas">Próxima</button>
            </div>

            <div class="dinheiro">

            
                <div class="renda">
                    <div id="rendaMensal">
                        <h1>Renda Mensal</h1>
                     <p>R$ {{ rendaMensal }}</p>
                    </div>

                </div>

                <div class="renda">
                    <div id="rendaMensal"> 
                        <h1>Saldo</h1>
                        <p> R$ {{ parseFloat(rendaMensal - valor - totalValorGastoFixo).toFixed(2)}}</p>
                    </div>

                
                

                </div>
                <div class="renda">
                    <div id="rendaMensal">
                        <h1>Economia</h1>
                        <p>R$ {{ totalEconomia }}</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="deletarCategoria">

            <div id="formsDeletarCategoria">
                <h1>Delete Uma Categoria</h1>
                <select v-model="categoriaExcluir">
                    <option  v-for="cat in categorias" :key="cat.idCategoria" :value="cat.idCategoria"> {{ cat.nome }}</option>
                    
                </select>
                <button @click="excluirCategoria">Confirmar</button>
            </div>
            
        </div>

        <div class="adicionarGastoFixo">
            
            <div id="formsCompra">
                <h1>Adicionar Gasto Fixo</h1>
                    <input v-model="descricaoGastoFixo" type="text" placeholder="Descrição" id="inputDescricaoGastoFixo">
                    <input v-model="valorGastoFixo" type="number" placeholder="Valor" id="inputValorGastoFixo">
            
                    <button @click="registrarGastoFixo" id="buttonGastoFixo">Confirmar</button>
                </div>

        </div>

        <div class="botoes" >
            <button @click="logout">SAIR</button>
        </div>

        <div class="gastosFixos">
    <h1>Gastos Fixos -  <span style="color: #ff6b81; "> R$ {{  parseFloat(totalValorGastoFixo).toFixed(2) }}</span></h1>
    <p class="pGastosFixos" v-for="gf in gastosFixos" :key="gf.id">
        R$ {{ gf.valor }} — {{ gf.descricao }}
        <button @click="excluirGastoFixo(gf.id)" id="excluir">X</button>
    </p>
</div>


    </div>


</template>

<style>



#formsEconomia button {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    width: 20vh;
    margin-left: 0.7rem;
    padding-top: 0.8rem;
    padding-left: 4rem;
    font-size: 15px;
}

#formsEconomia input {
    padding-top: 5rem;
    height: 42px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: var(--bg-input);
    color: var(--color-text);
    padding: 0 12px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;
    width: 100%;

}

.economia h1 {
    margin-left: 3.6rem;
    margin-top: -0.5rem;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.economia {
    padding: 1.7rem;
    background-color: var(--bg-accent);
    border: var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    color: var(--color-text);
    margin-top: 1rem;
}

:root {
    --bg-card: #2a0a12;
    --bg-card-alt: #460414;
    --bg-input: #3a0d16;
    --bg-accent: #490113;
    --color-text: whitesmoke;
    --color-highlight: #ff6b81;
    --color-highlight-hover: #ff8595;
    --border-subtle: 1px solid rgba(255, 255, 255, 0.08);
    --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.45);
    --radius-lg: 14px;
    --radius-md: 8px;
    --radius-sm: 6px;
}

* {
    box-sizing: border-box;
}

body {
    background: linear-gradient(160deg, #1a1a1a, #000000);
    min-height: 100vh;
    margin: 0;
    padding: 2rem;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

h1 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    letter-spacing: 0.3px;
}


.dashboard {
    display: grid;
    grid-template-columns: minmax(260px, 320px) 1fr 1fr;
    gap: 2rem;
    align-items: start;
    max-width: 1500px;
    margin: 0 auto;
}

.painel-lateral {
    grid-column: 1;
    grid-row: 1 / span 3;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}


#container-mensal,
.addCompra,
#compras,
.deletarCategoria,
.adicionarGastoFixo {
    background-color: var(--bg-card);
    border: var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    color: var(--color-text);
    padding: 1.5rem;
}


#container-mensal h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-highlight);
    margin: -0.5rem 0 1rem 0;
}

#container-mensal p {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-highlight);
    margin: 0;
}


#formsCompra {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

#formsCompra input,
#formsCompra select {
    height: 42px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: var(--bg-input);
    color: var(--color-text);
    padding: 0 12px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;
    width: 100%;
}

#formsCompra input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

#formsCompra input:focus,
#formsCompra select:focus {
    border-color: var(--color-highlight);
}

.addCompra button {
    margin-top: 0.5rem;
    height: 42px;
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--color-highlight);
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.addCompra button:hover {
    background-color: var(--color-highlight-hover);
}

.addCompra button:active {
    transform: scale(0.98);
}


.criarCategorias {
    background-color: var(--bg-card-alt);
    border: var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    color: var(--color-text);
    padding: 1.5rem;
    margin-top: 1.5rem;
}

.criarCategorias h1 {
    font-weight: 700;
    margin-left: 0.44rem;
}

.criarCategorias #formsCompra {
    width: 100%;
}


#compras {
    grid-column: 2 / span 2;
    grid-row: 1;
    min-width: 0;
}

.filtroMes {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

#mesAno {
    background-color: var(--bg-accent);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--color-text);
    height: 42px;
    padding: 0 12px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
}

#buttonMes {
    background-color: var(--bg-accent);
    height: 42px;
    padding: 0 1.2rem;
    color: var(--color-text);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: var(--shadow-card);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

#buttonMes:hover {
    background-color: var(--color-highlight);
    color: #1a1a1a;
}

.gastos {
    padding: 0.75rem 0;
    border-bottom: var(--border-subtle);
}

.gastos:last-of-type {
    border-bottom: none;
}

.gastos p {
    margin: 0;
    font-size: 1.05rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.gastos .data {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    white-space: nowrap;
}

.paginacao {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 1.25rem;
    color: var(--color-text);
    font-size: 0.9rem;
    flex-wrap: wrap;
}

.paginacao button {
    background-color: var(--bg-input);
    color: var(--color-text);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-sm);
    padding: 6px 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.paginacao button:hover:not(:disabled) {
    background-color: var(--color-highlight);
    color: #1a1a1a;
}

.paginacao button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}


.dinheiro {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 1.5rem;
}

.renda {
    flex: 1 1 160px;
    background-color: var(--bg-accent);
    box-shadow: var(--shadow-card);
    border: var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1rem 1.25rem;
}

.renda #rendaMensal h1 {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
}

.renda #rendaMensal p {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-highlight);
    margin: 0;
}


.deletarCategoria {
    grid-column: 2;
    grid-row: 2;
}

.deletarCategoria h1 {
    font-weight: 700;
}

#formsDeletarCategoria {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

#formsDeletarCategoria select {
    height: 42px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: var(--bg-input);
    color: var(--color-text);
    padding: 0 12px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;
    width: 100%;
}

#formsDeletarCategoria select:focus {
    border-color: var(--color-highlight);
}

#formsDeletarCategoria button {
    margin-top: 0.5rem;
    height: 42px;
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--color-highlight);
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

#formsDeletarCategoria button:hover {
    background-color: var(--color-highlight-hover);
}

#formsDeletarCategoria button:active {
    transform: scale(0.98);
}

#excluir {
    background: transparent;
    border: none;
    color: rgb(235, 2, 2);
    cursor: pointer;
    font-weight: 700;
}


.adicionarGastoFixo {
    grid-column: 3;
    grid-row: 2;
}

.adicionarGastoFixo h1 {
    font-weight: 700;
}

.adicionarGastoFixo #buttonGastoFixo {
    background-color: var(--color-highlight);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    color: #000000;
    font-weight: 700;
    font-size: 15px;
    height: 42px;
    
}
.adicionarGastoFixo #buttonGastoFixo:hover {
    background-color: var(--color-highlight-hover);
    cursor: pointer;
}

.dashboard .botoes {
    grid-column: 2 / span 2;
    grid-row: 3;
    display: flex;
    justify-content: flex-end;
}

.dashboard .botoes button {
    background-color: var(--bg-card);
    border: var(--border-subtle);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-card);
    color: var(--color-text);
    font-weight: 700;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.dashboard .botoes button:hover {
    background-color: #3a0d16;
}


.gastosFixos {
    grid-column: 1 / -1;
    grid-row: 4;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-card-alt);
    box-shadow: var(--shadow-card);
    border: var(--border-subtle);
    border-radius: var(--radius-lg);
    min-height: 200px;
    margin-top: 0.5rem;
    padding: 1.5rem;
}

.gastosFixos h1 {
    color: var(--color-text);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.pGastosFixos {
    color: var(--color-text);
    margin: 0;
    padding: 0.5rem 0;
    border-bottom: var(--border-subtle);
    font-size: 1.05rem;
    font-weight: 600;
}

.pGastosFixos:last-of-type {
    border-bottom: none;
}


@media (max-width: 1024px) {
    body {
        padding: 1.5rem;
    }

    .dashboard {
        grid-template-columns: 1fr 1fr;
    }

    .painel-lateral {
        grid-column: 1 / -1;
        grid-row: 1;
    }

    #compras {
        grid-column: 1 / -1;
        grid-row: 2;
    }

    .deletarCategoria {
        grid-column: 1;
        grid-row: 3;
    }

    .adicionarGastoFixo {
        grid-column: 2;
        grid-row: 3;
    }

    .dashboard .botoes {
        grid-column: 1 / -1;
        grid-row: 4;
    }

    .gastosFixos {
        grid-column: 1 / -1;
        grid-row: 5;
    }
}


@media (max-width: 768px) {
    body {
        padding: 1rem;
    }

    .dashboard {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .painel-lateral,
    #compras,
    .deletarCategoria,
    .adicionarGastoFixo,
    .dashboard .botoes,
    .gastosFixos {
        grid-column: 1;
        grid-row: auto;
    }

    .filtroMes {
        flex-direction: column;
        align-items: stretch;
    }

    #mesAno,
    #buttonMes {
        width: 100%;
    }

    .dinheiro {
        flex-direction: column;
    }

    .renda {
        flex: 1 1 100%;
    }

    .gastosFixos {
        margin-top: 1rem;
    }

    .dashboard .botoes {
        justify-content: center;
    }

    .gastos p {
        flex-direction: column;
        gap: 0.35rem;
    }
}

@media (max-width: 400px) {
    h1 {
        font-size: 1.2rem;
    }

    #container-mensal h2 {
        font-size: 1.25rem;
    }
}
</style>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'


const storage = localStorage.getItem('token')

const dinheiroEconomia = ref()

const descricaoGastoFixo = ref()
const valorGastoFixo = ref()
const categoriaExcluir = ref()

const route = useRoute()
const idUser = route.params.id
const gastosFixos = ref([])
const rendaMensal = ref()
const mesFiltro = ref()
let totalValorGastoFixo = ref(0)

const gastoPorCategoria = ref([])
const categoriaCriada = ref()
const categoriaSelecionada = ref()
const categorias = ref([])
const valorCompra = ref()
const descricao = ref('')
let valor = ref(0);
const compras = ref([])

const paginaAtual = ref(1);
const itensPorPagina = 5;

const totalEconomia = ref()

function logout() {
    localStorage.removeItem("token")
    window.location.reload();
}

onMounted(async () => {
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/economias/total`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    });
    const data = await request.json()
    if (request.ok) {
        totalEconomia.value = data.valor
    } else {
        console.log(data)
    }
})


async function guardarDinheiro() {
    console.log(dinheiroEconomia.value)
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/economias/guardar`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${storage}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valor: Number(dinheiroEconomia.value),
            idUser: Number(idUser),
        })
    })
    if(request.ok) {
        console.log(await request.json())
        window.location.reload();
    }else {
        console.log(await request.json())
    }

}

async function diminuirDinheiro() {
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/economias/diminuir?valorDiminuir=${Number(dinheiroEconomia.value)}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if(request.ok) {
        console.log(await request.json())
        window.location.reload();
    }else {
        console.log(await request.json())
    }
}

async function excluirGastoFixo(id) {
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/deletar-gastoFixo?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if (request.ok) {
        window.location.reload();
    } else {
        console.log("Erro ao deletar Gasto Fixo")
    }
}

async function registrarGastoFixo() {
    

    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/fixo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storage}`
        },
        body: JSON.stringify({
            valor: Number(valorGastoFixo.value),
            descricao: descricaoGastoFixo.value,
            idUser: Number(idUser)
        })
    })
    const data = await request.json();

    if(request.ok) {
        window.location.reload()
        
    } else {
        console.log(data)
    }
}

async function excluirCategoria() {
    
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/deletarCategoria?idCategoria=${categoriaExcluir.value}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if (request.ok) {
        console.log("Categoria Deletada")
        window.location.reload();
    } else {
        console.log("Erro ao deletar Categoria")
    }
    
}

async function excluir(idGastos) {
    
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/deletarGasto?idGastos=${idGastos}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if (request.ok) {
        window.location.reload();
    }
}

async function mesSelecionado() {
    if (!mesFiltro.value) {
        alert("Preencha todas as informações para filtrar")
        return
    }
    const request = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/listar-gastosMes?mes=${mesFiltro.value}`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    const data = await request.json();
    if (request.ok) {
        compras.value = data;
    }

}
async function criarCategoria() {
    
    const request = await fetch("https://controle-financeiro-9hd1.onrender.com/gastos/categoria", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storage}`
        },
        body: JSON.stringify({
            nome: categoriaCriada.value,
            idUser: Number(idUser)
        })
    });
    if (request.ok) {
        window.location.reload();
    } else {
        console.log("erro ao criar");
        console.log(await request.json())
    }

}

const totalPaginas = computed(() => {
    return Math.ceil(compras.value.length / itensPorPagina) || 1;
});

const comprasPaginadas = computed(() => {
    const inicio = (paginaAtual.value - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return compras.value.slice(inicio, fim);
});

function proximaPagina() {
    if (paginaAtual.value < totalPaginas.value) {
        paginaAtual.value++;
    }
}

function paginaAnterior() {
    if (paginaAtual.value > 1) {
        paginaAtual.value--;
    }
}

function formatarData(dataISO) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dataISO));
}

async function registraCompra() {
    if (!categoriaSelecionada.value) {
        alert("Crie ou seleciona uma categoria")
        return
    }
    
    const request = await fetch("https://controle-financeiro-9hd1.onrender.com/gastos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storage}`
        },
        body: JSON.stringify({
            valor: Number(valorCompra.value),
            descricao: descricao.value,
            idUser: Number(idUser),
            idCategoria: categoriaSelecionada.value
        })
    })

    if (request.ok) {
        window.location.reload()
    }
}

onMounted(async () => {
    const response = await fetch(`https://controle-financeiro-9hd1.onrender.com/user/rendaMensal?`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    const data = await response.json();
    if (response.ok) {
        rendaMensal.value = data.rendaMensal;
    } else {
        console.log(data);
    }

})

onMounted(async () => {
    const response = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/listar-gastosFixos`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    });
    const data = await response.json();
    if (response.ok) {
        gastosFixos.value = data;
        for (let i of data) {
            totalValorGastoFixo.value += Number(i.valor)
            console.log(Number(i.valor))
        }
        console.log(data)
        console.log("Total gasto fixo: " + totalValorGastoFixo.value)


    } else {
        console.log(data)
    }


})  

onMounted(async () => {
    const response = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/listar-categorias?`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if (response.ok) {
        const json = await response.json();
        categorias.value = json;
    }
})

onMounted(async () => {
    const response = await fetch(`https://controle-financeiro-9hd1.onrender.com/relatorio/mensal?`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    })
    if(response.ok) {
        const json = await response.json();
        
        gastoPorCategoria.value = json;
        for(let i of json) {
            i.total = Number(i.total)
            valor.value += i.total
        }

    } else {
        console.log("Erro na requisição")
    }
})

onMounted(async () => {
    const response = await fetch(`https://controle-financeiro-9hd1.onrender.com/gastos/listar-gastosMes?mes=${new Date().toISOString().substring(0,7)}`, {
        headers: {
            'Authorization': `Bearer ${storage}`
        }
    });
    if (response.ok) {
        const json = await response.json()
        console.log(json)
        compras.value = json;

    }

   
})


</script>
