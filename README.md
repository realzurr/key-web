# Kye para navegador

Abra `dist/index.html` diretamente no navegador. Não precisa instalar dependências ou executar um servidor. Internet é opcional: apenas a fonte tipográfica externa usa a rede.

Inclui os arquivos DEFAULT.KYE (15 fases), BORDER.KYE e TEMPLATE.KYE do diretório original. Importa outros arquivos pelo botão “Abrir arquivo”. Dados importados não são enviados a um servidor.

Setas, WASD, teclado numérico, mouse e controles de toque. P pausa; R reinicia. Conquistas são salvas no armazenamento local quando disponível.

Implementação independente em JavaScript e Canvas. Reproduz as famílias de peças do Kye 2.0, mas não é uma emulação nem uma reprodução exata da ordem de atualização, aleatoriedade ou temporização do Windows 3.1. A compatibilidade e a solução de todas as fases não foram verificadas de ponta a ponta.

Original: Kye 2.0, © 1992 Colin Garbutt. Fases originais preservadas, sem alteração dos arquivos de origem. Referência técnica: https://www.kye.me.uk/description.html e tabela de símbolos de https://github.com/benley/kye. Código web e desenhos vetoriais do tabuleiro criados para esta adaptação.

Verificação: `node test.cjs`.

Redesenho web: [realzurr](https://github.com/realzurr).
