<template>
    
    <div id="container-mensal">
        <h1>Gasto Mensal</h1>
        <h2>R$ {{ valor }}</h2>
    </div>

    <div id="compras">
        <h1>Compras</h1>

        <div class="gastos" v-for="c in comprasPaginadas" :key="c.idGastos">
            <p>R$ {{ c.valor }} {{ c.descricao }} - {{ formatarData(c.dataCompra) }}</p>
        </div>

        <div class="paginacao">
            <button @click="paginaAnterior" :disabled="paginaAtual === 1">
                Anterior
            </button>

            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>

            <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas">
                Próxima
            </button>
        </div>
    </div>

</template>


<style>
    #compras {
        width: 50vh;
        height: 40vh;
        background-color: rgb(58, 0, 13);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        border-radius: 10px;
    }
    #compras h1 {
        padding-left: 9rem;
        font-size: 40px;
        color: whitesmoke;
    }

    .gastos {
        font-size: 23px;
        padding-left: 25px;
        color: whitesmoke;
    }

    .paginacao {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-left: 25px;
        margin-top: 16px;
        color: whitesmoke;
    }

    .paginacao button {
        background-color: rgb(90, 0, 20);
        color: whitesmoke;
        border: none;
        border-radius: 6px;
        padding: 6px 12px;
        cursor: pointer;
    }

    .paginacao button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    body {
        background: linear-gradient(160deg, #1e1e1e, #000000);
        height: 100vh;
    }


    #container-mensal {
        width: 33vh;
        height: 15vh;
        background-color: rgb(58, 0, 13);
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
    #container-mensal h1 {
        padding-top: 10px;
        font-size: 3vh;
        padding-left: 4rem;
        color: whitesmoke;
    }
    #container-mensal h2 {
        font-size: 35px;
        margin-left: 10vh;
        color: whitesmoke;
    }


</style>

<script setup>
import { onMounted, ref, computed } from 'vue';

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

onMounted(async () => {
    const response = await fetch("http://localhost:3000/relatorio/mensal?idUser=2")
    if(response.ok) {
        const json = await response.json();
        console.log(json)
        for(let i of json) {
            valor.value += i.total
        }

    } else {
        console.log("Deu erro mano")
    }
})

onMounted(async () => {
    const response = await fetch("http://localhost:3000/gastos?idUser=2");
    if (response.ok) {
        const json = await response.json()
        console.log(json)
        compras.value = json;

    }
})


</script>