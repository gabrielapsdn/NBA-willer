# 🏀 NBA Astros Gallery

Uma aplicação web moderna, direta e modularizada desenvolvida com **React** e **Vite**, projetada para exibir os principais astros da temporada da NBA utilizando boas práticas de componentização e o hook `useEffect`.

---

## 📌 Situação-Problema

A equipe de análise da liga NBA disponibilizou os dados dos principais atletas da temporada em um arquivo de dados simulados (*dados mocados*).

A meta deste projeto frontend consiste em:
- Construir uma interface limpa, moderna e modularizada em **React**.
- Carregar a lista de astros ao iniciar a tela utilizando obrigatoriamente o hook **`useEffect`**.
- Dividir a interface em dois componentes reutilizáveis principais: **`Header`** e **`Card`**, localizados exclusivamente no diretório `src/components/`.
- Seguir o esboço/wireframe de layout em grade responsiva (3 colunas no desktop).

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)**: Biblioteca JavaScript para interfaces reativas baseadas em componentes.
- **[Vite](https://vite.dev/)**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
- **JavaScript (ES6+)**: Funções de seta, desestruturação, manipulação de arrays (`map`) e módulos (`import`/`export`).
- **CSS3 Moderno**: Grid responsivo, variáveis CSS (Design Tokens), Glassmorphism e microinterações de hover.
- **Google Fonts**: Tipografias *Outfit* e *Plus Jakarta Sans*.

---

## 📁 Estrutura de Pastas e Arquivos

```plaintext
willer-atividade-nba/
├── public/
│   └── images/               # Fotos oficiais dos 6 atletas em alta resolução
│       ├── lebron.png
│       ├── curry.png
│       ├── giannis.png
│       ├── doncic.png
│       ├── jokic.png
│       └── tatum.png
├── src/
│   ├── components/           # Componentes obrigatórios da aplicação
│   │   ├── Header.jsx        # Cabeçalho com o título principal
│   │   └── Card.jsx          # Card individual do jogador (imagem + nome)
│   ├── data/
│   │   └── jogadores.js      # Arquivo com os dados simulados (dados mocados)
│   ├── App.css               # Estilos específicos do layout, grid e componentes
│   ├── App.jsx               # Componente raiz: gerencia estado e useEffect
│   ├── index.css             # Estilos globais e tokens de cores
│   └── main.jsx              # Ponto de entrada do React no DOM
├── index.html                # Documento HTML base com meta tags e fontes
├── package.json              # Dependências e scripts do projeto
├── vite.config.js            # Configurações do Vite
└── README.md                 # Documentação detalhada do projeto
```

---

## 🧩 Componentes e Requisitos Atendidos

### 1. `Header.jsx` (`src/components/Header.jsx`)
- Componente responsável pelo cabeçalho da página.
- Exibe o título principal exatamente como solicitado: **`🏀 NBA Astros Gallery`**.
- Possui badge de destaque da temporada e subtítulo informativo.

### 2. `Card.jsx` (`src/components/Card.jsx`)
- Componente responsável por renderizar o card de um único jogador.
- Exibe a foto do atleta através da tag `<img />`.
- Exibe o nome do atleta através da tag de cabeçalho `<h3>`.
- Inclui efeitos de elevação (*hover* suave) e iluminação dinâmica nas bordas.

### 3. `jogadores.js` (`src/data/jogadores.js`)
Arquivo de dados simulados contendo o array com os 6 astros:
```javascript
export const jogadoresIniciais = [
  { id: 1, nome: "LeBron James", foto: "/images/lebron.png" },
  { id: 2, nome: "Stephen Curry", foto: "/images/curry.png" },
  { id: 3, nome: "Giannis Antetokounmpo", foto: "/images/giannis.png" },
  { id: 4, nome: "Luka Dončić", foto: "/images/doncic.png" },
  { id: 5, nome: "Nikola Jokić", foto: "/images/jokic.png" },
  { id: 6, nome: "Jayson Tatum", foto: "/images/tatum.png" }
];
```

### 4. Integração no `App.jsx`
- O estado inicial da lista é inicializado vazio com `useState([])`.
- O hook **`useEffect`** é acionado assim que o componente é montado na tela (com dependências vazias `[]`), populando o estado com a constante `jogadoresIniciais`.
- A lista de jogadores é iterada utilizando a função `.map()`, fornecendo chaves únicas (`key={jogador.id}`) para cada componente `<Card />`.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
Ter o **[Node.js](https://nodejs.org/)** (versão 18 ou superior) instalado no computador.

### Passo a Passo

1. **Abra o terminal** na pasta do projeto:
   ```bash
   cd "willer-atividade nba"
   ```

2. **Instale as dependências** (caso ainda não estejam instaladas):
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador**:
   Abra a URL indicada no terminal:
   ```text
   http://localhost:5173/
   ```

---

## 📦 Como Gerar o Build de Produção

Para validar a integridade dos arquivos ou empacotar a aplicação para publicação:

```bash
npm run build
```

Os arquivos otimizados e minificados serão gerados na pasta `dist/`.

---

## 🏀 Atletas em Destaque

| # | Atleta | Imagem Local |
|---|--------|--------------|
| 1 | **LeBron James** | `/images/lebron.png` |
| 2 | **Stephen Curry** | `/images/curry.png` |
| 3 | **Giannis Antetokounmpo** | `/images/giannis.png` |
| 4 | **Luka Dončić** | `/images/doncic.png` |
| 5 | **Nikola Jokić** | `/images/jokic.png` |
| 6 | **Jayson Tatum** | `/images/tatum.png` |

---

Desenvolvido para a atividade prática de desenvolvimento Frontend com React.
