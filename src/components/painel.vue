<template>
    <div class="dashboard">
        <div class="painel-lateral">
            <div id="container-mensal">
                <h1>Gasto Mensal</h1>
                <h2>R$ {{ valor }}</h2>
            </div>

            <div class="addCompra">
                <h1>Adicione compras</h1>
                <div id="formsCompra">
                    <input v-model="descricao" type="text" placeholder="Descrição" id="inputDescricao">
                    <input v-model="valorCompra" type="number" placeholder="Valor" id="inputValor">
                    <select id="selectCategoria" v-model="categoriaSelecionada">
                        <option disabled value="">Categoria</option>
                        <option v-for="cat in categorias" :key="cat.idCategoria" :value="cat.idCategoria">
                            {{ cat.nome }}
                        </option>
                    </select>
                    <button @click="registraCompra">Confirmar</button>
                </div>
            </div>
        </div>

        <div id="compras">
            <h1>Compras</h1>

            <div class="gastos" v-for="c in comprasPaginadas" :key="c.idGastos">
                <p>R$ {{ c.valor }} — {{ c.descricao }} <span class="data">{{ formatarData(c.dataCompra) }}</span></p>
            </div>

            <div class="paginacao">
                <button @click="paginaAnterior" :disabled="paginaAtual === 1">Anterior</button>
                <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
                <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas">Próxima</button>
            </div>
        </div>
    </div>
</template>


<style> 
*{
    box-sizing: border-box;
}

body {
    background: linear-gradient(160deg, #1a1a1a, #000000);
    min-height: 100vh;
    margin: 0;
    padding: 2rem;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

.dashboard {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    max-width: 1100px;
    margin: 0 auto;
    flex-wrap: wrap;
}

.painel-lateral {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 320px;
}

/* Cards base */
#container-mensal,
.addCompra,
#compras {
    background-color: #2a0a12;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    color: whitesmoke;
    padding: 1.5rem;
}

h1 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    letter-spacing: 0.3px;
}

/* Gasto mensal */
#container-mensal h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
    color: #ff6b81;
}

/* Formulário de compras */
#formsCompra {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

#formsCompra input,
#formsCompra select {
    height: 42px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: #3a0d16;
    color: whitesmoke;
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
    border-color: #ff6b81;
}

.addCompra button {
    margin-top: 0.5rem;
    height: 42px;
    border: none;
    border-radius: 8px;
    background-color: #ff6b81;
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.addCompra button:hover {
    background-color: #ff8595;
}

.addCompra button:active {
    transform: scale(0.98);
}

/* Lista de compras */
#compras {
    flex: 1;
    min-width: 320px;
}

.gastos {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
    color: whitesmoke;
    font-size: 0.9rem;
}

.paginacao button {
    background-color: #3a0d16;
    color: whitesmoke;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.paginacao button:hover:not(:disabled) {
    background-color: #ff6b81;
    color: #1a1a1a;
}

.paginacao button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}


</style>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const idUser = route.params.id

const categoriaSelecionada = ref()
const categorias = ref([])
const valorCompra = ref()
const descricao = ref('')
let valor = ref(0);
const compras = ref([])

const paginaAtual = ref(1);
const itensPorPagina = 5;

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
    const request = await fetch("http://localhost:3000/gastos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valor: valorCompra.value,
            descricao: descricao.value,
            idUser: 2,
            idCategoria: categoriaSelecionada.value
        })
    })

    if (request.ok) {
        window.location.reload()
    }
}

onMounted(async () => {
    const response = await fetch(`http://localhost:3000/gastos/listar-categorias?idUser=${idUser}`)
    if (response.ok) {
        const json = await response.json();
        categorias.value = json;
    }
})

onMounted(async () => {
    const response = await fetch(`http://localhost:3000/relatorio/mensal?idUser=${idUser}`)
    if(response.ok) {
        const json = await response.json();
        console.log(json)
        for(let i of json) {
            valor.value += i.total
        }

    } else {
        console.log("Erro na requisição")
    }
})

onMounted(async () => {
    const response = await fetch(`http://localhost:3000/gastos?idUser=${idUser}`);
    if (response.ok) {
        const json = await response.json()
        console.log(json)
        compras.value = json;

    }
})


</script>