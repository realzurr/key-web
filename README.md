# Kye — Browser Edition

Uma recriação para navegador de **Kye 2.0**, o jogo de labirintos e quebra-cabeças de Colin Garbutt, lançado em 1992 para Windows.

Controle o pequeno herói verde, recolha todos os diamantes e encontre caminhos entre blocos, ímãs, monstros e armadilhas. Esta edição preserva os labirintos originais e apresenta um novo visual colorido, com criaturas distintas e peças desenhadas em Canvas.

**Redesenho web por [realzurr](https://github.com/realzurr).**

## Como jogar

1. Baixe ou clone este repositório.
2. Abra [`dist/index.html`](dist/index.html) em um navegador moderno, como Chrome, Edge ou Firefox.
3. Escolha uma coleção e uma fase e clique em **Começar a jogar**.

Não é necessário instalar dependências, compilar o projeto ou executar um servidor. O jogo funciona localmente; a conexão com a internet é usada apenas para carregar as fontes tipográficas externas. Sem conexão, o navegador utiliza fontes alternativas.

Se preferir servir os arquivos por HTTP e tiver Python instalado, execute na raiz do repositório:

```sh
python -m http.server 8000 --directory dist
```

Depois, acesse `http://localhost:8000`.

## Objetivo e regras

- Recolha todos os diamantes para concluir o labirinto.
- Empurre blocos para liberar caminhos ou bloquear criaturas.
- Use ímãs, peças móveis e mecanismos a seu favor.
- Evite os monstros: o contato com casas vizinhas, inclusive nas diagonais, tira uma vida.
- Cada fase começa com três vidas. Ao perder uma vida, Kye reaparece próximo ao ponto inicial; ao reiniciar a fase, todo o labirinto é restaurado.
- O mundo se move em tempo real. Pause quando precisar pensar.

O botão **Como jogar** apresenta detalhes das peças e dos mecanismos dentro do próprio jogo.

## Controles

| Ação | Controle |
| --- | --- |
| Mover | Setas ou `W`, `A`, `S`, `D` |
| Mover nas diagonais | Teclado numérico: `1`, `3`, `7`, `9`, ou combinação de duas direções |
| Guiar com o mouse | Clique e segure no tabuleiro |
| Jogar em telas de toque | Botões direcionais abaixo do tabuleiro |
| Pausar ou continuar | `P` ou botão **Pausar** |
| Reiniciar a fase | `R` ou botão **Recomeçar** |

## Recursos

- 15 fases da coleção original `DEFAULT.KYE`.
- Coleções extras `BORDER.KYE` e `TEMPLATE.KYE`, com uma fase cada.
- Importação de arquivos de labirintos pelo navegador.
- Cobras, aranhas e outras criaturas com desenhos e animações próprios.
- Ímãs com polos vermelhos e azuis, caixas de madeira, paredes de tijolos e diamantes facetados.
- Blocos móveis e consumíveis, setas deslizantes, sentinelas, portas de sentido único, temporizadores, lançadores e buracos negros.
- Contadores de diamantes, vidas, tempo e passos.
- Marcação das fases concluídas no armazenamento local do navegador, quando disponível.
- Layout adaptado para computadores e celulares.

## Importar labirintos

Clique em **Abrir arquivo .KYE / .KEY** e selecione uma coleção. O arquivo deve usar o formato textual compatível com Kye; a extensão, por si só, não garante compatibilidade.

O formato começa com a quantidade de fases. Cada fase contém:

1. Nome da fase.
2. Texto da pista.
3. Mensagem de conclusão.
4. Um tabuleiro de **20 linhas com 30 caracteres cada**, incluindo espaços.

Cada fase deve conter exatamente um personagem `K` e utilizar os símbolos reconhecidos pelo motor. O limite de importação é de 2 MB.

Os arquivos são lidos localmente e não são enviados a um servidor. As coleções importadas precisam ser abertas novamente depois de recarregar a página.

## Estrutura do projeto

```text
kye-web/
├── dist/
│   ├── index.html    # Página, menus e instruções
│   ├── style.css     # Estilo e layout responsivo
│   ├── app.js        # Controles, interface e ciclo de renderização
│   ├── engine.js     # Regras, leitura de fases e simulação
│   ├── art.js        # Desenho das peças e criaturas em Canvas
│   └── levels.js     # Coleções de labirintos incluídas
├── test.cjs          # Verificações do motor e dos labirintos
├── test-ui.cjs       # Verificações da interface com DOM simulado
├── .gitignore
└── README.md
```

O projeto utiliza **HTML, CSS e JavaScript**, sem frameworks ou dependências de execução. O desenho do tabuleiro usa a API Canvas 2D.

## Testes

Com Node.js instalado, execute os comandos na raiz do repositório:

```sh
node test.cjs
node test-ui.cjs
```

As verificações cobrem leitura das coleções, consistência das entidades, coleta de diamantes, vitória, empurrões, colisões, portas, vidas, setas e ímãs. Os testes da interface verificam início, teclado, conclusão da primeira fase, avanço, pausa, reinício e ajuda usando um DOM simulado. Eles não substituem a avaliação visual em um navegador.

## Compatibilidade com o original

Esta é uma implementação independente, não uma emulação do executável de Windows 16 bits. A ordem de atualização das peças, a aleatoriedade e a temporização podem diferir do Kye original. A solução de todas as fases ainda não foi verificada de ponta a ponta.

Os labirintos incluídos foram preservados a partir dos arquivos originais fornecidos para esta adaptação.

## Créditos e referências

- **Jogo original:** Kye 2.0, © 1992 Colin Garbutt.
- **Redesenho web:** [realzurr](https://github.com/realzurr).
- **Referência das peças:** [My Kye Page — Description](https://www.kye.me.uk/description.html).
- **Referência da tabela de símbolos:** [Python Kye](https://github.com/benley/kye).

Os créditos do jogo original e os do redesenho web também aparecem no rodapé da página.

## Licença

O código web, os desenhos originais em Canvas, os testes e esta documentação
utilizam a **GNU GPL versão 3**, com uma condição adicional de preservação de
atribuições permitida pela seção 7(b).

Ao redistribuir ou modificar esse material, preserve os créditos:

- **Jogo original:** Kye 2.0, © 1992 Colin Garbutt.
- **Redesenho web:** [realzurr](https://github.com/realzurr).

É permitido usar, estudar, modificar e redistribuir o software, inclusive
comercialmente, cumprindo os termos da GPLv3 e a condição de atribuição. O
software é fornecido sem garantia. Consulte o texto integral em [LICENSE](LICENSE)
e o escopo e a condição de atribuição em [ATTRIBUTION.md](ATTRIBUTION.md).

**Os labirintos originais em `dist/levels.js` estão excluídos dessa licença.**
A documentação original fornecida não estabelece uma licença livre para eles;
sua redistribuição depende dos direitos e termos aplicáveis aos autores
originais. A licença do código web não concede permissão para relicenciar o
jogo original, seus dados ou outros materiais de terceiros.
