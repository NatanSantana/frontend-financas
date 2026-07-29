<template>
    <div class="login-wrapper">
        <div class="login-card">
            <h1>Cadastre-se</h1>
            <p class="subtitulo">Crie sua conta pra continuar</p>

            <form id="formLogin" @submit.prevent="fazerCadastro">
                <label for="inputNome">Nome</label>
                <input v-model="nome" type="text" placeholder="Nome" id="inputEmail">

                <label for="inputEmail">E-mail</label>
                <input v-model="email" type="email" placeholder="seu@email.com" id="inputEmail">

                <label for="inputSenha">Senha</label>
                <input v-model="senha" type="password" placeholder="••••••••" id="inputSenha">

                <label for="inputTelefone">Telefone</label>
                <input v-model="telefone" type="tel" placeholder="(71) 91234-5678" id="inputTelefone">

                <label for="inputRenda">Renda mensal</label>
                <input v-model="rendaMensal" type="text" placeholder="R$ 0,00" id="inputRenda">

                <p class="erro" v-if="mensagemErro">{{ mensagemErro }}</p>

                <button type="submit" @click="registrar">
                    {{ carregando ? 'Cadastrando...' : 'Cadastrar' }}
                </button>
            </form>

            <p class="link-cadastro">
                Já tem conta? <a href="/">Entrar</a>
            </p>
        </div>
    </div>
</template>

<style>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(160deg, #1a1a1a, #000000);
    margin: 0;
    padding: 2rem;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

.login-card {
    background-color: #2a0a12;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    color: whitesmoke;
    padding: 2.5rem;
    width: 100%;
    max-width: 380px;
    margin-top: -15vh;
}

.login-card h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 0.4rem 0;
    color: #ff6b81;
}

.subtitulo {
    margin: 0 0 1.75rem 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
}

#formLogin {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

#formLogin label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.6rem;
}

#formLogin input {
    height: 42px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: #3a0d16;
    color: whitesmoke;
    padding: 0 12px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

#formLogin input::placeholder {
    color: rgba(255, 255, 255, 0.4);
}

#formLogin input:focus {
    border-color: #ff6b81;
}

.erro {
    color: #ff6b81;
    font-size: 0.85rem;
    margin: 0.5rem 0 0 0;
}

#formLogin button {
    margin-top: 1.5rem;
    height: 44px;
    border: none;
    border-radius: 8px;
    background-color: #ff6b81;
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

#formLogin button:hover:not(:disabled) {
    background-color: #ff8595;
}

#formLogin button:active:not(:disabled) {
    transform: scale(0.98);
}

#formLogin button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.link-cadastro {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
}

.link-cadastro a {
    color: #ff6b81;
    text-decoration: none;
    font-weight: 600;
}

.link-cadastro a:hover {
    text-decoration: underline;
}
</style>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const nome = ref();
const email = ref();
const telefone = ref();
const senha = ref();
const rendaMensal = ref();

async function registrar() {
    const request = await fetch("https://controle-financeiro-9hd1.onrender.com/user/registrar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            senha: senha.value,
            rendaMensal: Number(rendaMensal.value)
        })
    })

    if(request.ok) {
        router.push('/')
    }
}

</script>