<template>
    <div class="login-wrapper">
        <div class="login-card">
            <h1>Entrar</h1>
            <p class="subtitulo">Acesse sua conta pra continuar</p>

            <form id="formLogin" @submit.prevent="fazerLogin">
                <label for="inputEmail">E-mail</label>
                <input v-model="email" type="email" placeholder="seu@email.com" id="inputEmail">

                <label for="inputSenha">Senha</label>
                <input v-model="senha" type="password" placeholder="••••••••" id="inputSenha">

                <p class="erro" v-if="mensagemErro">{{ mensagemErro }}</p>

                <button type="submit" :disabled="carregando" @click="login(email, senha)">
                    {{ carregando ? 'Entrando...' : 'Entrar' }}
                </button>
            </form>

            <p class="link-cadastro">
                Não tem conta? <a href="#">Cadastre-se</a>
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
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()

async function login(email, senha) {
    console.log(email, senha)
    const request = await fetch("http://localhost:3000/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha

        })
    });
    


    if(request.ok) {
        const token = await request.json();
        const decoded = jwtDecode(token.token);
        localStorage.setItem('token', token.token)
        router.push(`/painel/${decoded.sub}`)

    } else {
        console.log("error")
    }
    
}


</script>