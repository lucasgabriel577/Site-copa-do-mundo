# Copa do Mundo 2026

Site informativo sobre a Copa do Mundo de 2026, com foco na competição, nos países-sede, na história do torneio e no troféu.

## Sobre o projeto

O projeto usa uma direção visual editorial em preto e branco, mantendo as imagens das seleções e da taça em suas cores originais. A página inicial apresenta:

- uma abertura com fotografia de estádio e bola;
- seção explicativa sobre a Copa do Mundo;
- capítulo interativo sobre a taça;
- dados da edição de 2026: 48 seleções, 104 partidas e 16 cidades-sede;
- vídeo da vinheta oficial;
- navegação entre início, história, seleções e contato.

As animações principais usam Framer Motion e respondem à rolagem da página. A taça muda de escala, posição e rotação, enquanto os blocos de conteúdo entram em sequência. O site também respeita a preferência do sistema por movimento reduzido.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- React 19
- Framer Motion
- esbuild
- Bootstrap 5
- Font Awesome

## Estrutura

```text
.
├── index.html
├── historia.html
├── participantes.html
├── contatos.html
├── style.css
├── script.js
├── build.mjs
├── src/
│   ├── home.jsx
│   └── main.jsx
├── assets/
│   ├── home.js
│   └── THIRD_PARTY_LICENSES.txt
└── img/
```

## Como executar

1. Instale o Node.js 18 ou superior.
2. Instale as dependências:

```bash
npm install
```

3. Compile a página inicial com React e Framer Motion:

```bash
npm run build
```

4. Abra `index.html` em um servidor local. Por exemplo, com o servidor estático do VS Code ou com qualquer servidor HTTP local.

O comando de build atualiza o HTML renderizado e gera o bundle em `assets/home.js`.

## Páginas

- `index.html`: apresentação da Copa, troféu, formato de 2026 e vídeo.
- `historia.html`: linha histórica, artilheiros e curiosidades.
- `participantes.html`: seleções e títulos conquistados.
- `contatos.html`: canais de contato e formulário.

## Imagens e fontes

`img/stadium-mono.png` é a imagem de abertura criada para o projeto. A taça usa `img/R.png`, a imagem histórica usa `img/Taça-Jules-Rimet.jpg` e o escudo do Brasil usa o arquivo disponível em `img/`.

As informações sobre o formato de 2026 e o troféu possuem links para páginas da FIFA dentro do site. As bandeiras das seleções usam imagens do FlagCDN.

## Créditos

Projeto feito por Lucas.
