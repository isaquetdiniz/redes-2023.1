<h1 align="center">
 Redes 2023.1
</h1>
<h3 align="center">
  Projeto de aplicações TCP, UDP e DNS para a disciplina de redes de computadores 2023.1
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/isaquetdiniz/redes-2023.1">

  <a href="https://www.linkedin.com/in/isaquediniz/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Isaque%20Diniz-gree">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/isaquetdiniz/redes-2023.1">

  <img alt="GitHub" src="https://img.shields.io/github/license/isaquetdiniz/redes-2023.1">
</p>

<p align="center">
  <a href="#-about-the-project">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## 👨🏻‍💻 Sobre o projeto

<p>
  Projeto de aplicações TCP, UDP e DNS para a disciplina de redes de computadores 2023.1
</p>

<p>
  Teste
  ## Fluxo de inicialização
![image](https://github.com/isaquetdiniz/redes-2023.1/assets/67443852/a635b519-1ed0-4514-8958-4d5d293d568b)

## Fluxo de shutdown
![image](https://github.com/isaquetdiniz/redes-2023.1/assets/67443852/2a9fb053-146a-4af9-b710-6f5a5b4c7ce6)

## Fluxo de consulta
![image](https://github.com/isaquetdiniz/redes-2023.1/assets/67443852/8141d15b-0f11-45ac-b106-1e3cbb33abeb)
</p>

## 🚀 Technologies

Tecnologias utilizadas

- [Node.js 18.17.1LTS](https://nodejs.org/en)

## 💻 Configuração

### Requisitos

- [Node.js 18.17.1LTS](https://nodejs.org/en)

### Rodar
O ideal é utilizar um terminal para cada processo

O primeiro passo é rodar o servidor dns

```js
node dns/server.js
```

Agora inicie os servidores

TCP
```js
node tcp/server.js
```

UDP
```js
node udp/server.js
```

Por fim, os clientes

TCP
```js
node tcp/client.js
```

UDP
```js
node udp/client.js
```
---

Made with 💜 by Isaque Diniz 👋 [See my linkedin](https://www.linkedin.com/in/isaquetdiniz/)
