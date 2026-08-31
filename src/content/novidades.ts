import type { NovidadeEntry, ProximoPasso } from "../types";

/**
 * Registro do que já foi construído e validado no Brain e na Rei.
 * Cada entrada é um fato verificável (com data de medição), não copy de venda —
 * a copy de venda vive em `products.ts`.
 */
export const novidades: NovidadeEntry[] = [
  {
    id: "painel-minimalista",
    data: "2026-08-30",
    categoria: "interface",
    titulo: "O chat virou a tela principal, não mais uma entre muitas opções",
    resumo:
      "Seletor de modo, seletor de escopo, prompts prontos e temporizador saíram do topo da tela e foram para uma gaveta fechada por padrão.",
    detalhe:
      "Antes, a tela empilhava um seletor de modo, um seletor de escopo, prompts prontos e temporizadores logo acima do chat — muita coisa para clicar antes de digitar qualquer coisa. A correção deixou o chat como superfície principal: dois indicadores sempre visíveis mostram o modo e o escopo atuais, e o resto recolhe numa gaveta fechada por padrão, a um clique de distância. A razão de ser: quase tudo que estava na gaveta já tem um comando de texto equivalente — a gaveta é o caminho de clique para quem prefere não digitar, não a única porta. As três seções da interface (conversa, memória, tarefas) também viraram três ícones compactos no topo, no lugar de uma barra de navegação cheia.",
  },
  {
    id: "perfis-modelo-custo",
    data: "2026-08-30",
    categoria: "modelo",
    titulo: "Cada tarefa passou a escolher o tamanho certo de modelo",
    resumo:
      "Três perfis — rápido, padrão, completo — substituem o padrão único que rodava toda tarefa no modo mais caro disponível.",
    detalhe:
      "Até essa correção, o agente escritor nunca escolhia o modelo por conta própria — caía sempre no padrão instalado, que se revelou o mais caro dos três disponíveis. Uma auditoria real, cruzando dezenas de itens de um projeto com o código correspondente, custou US$ 3,63 rodando nesse modo, sem que ninguém tivesse escolhido isso. A correção deu a cada tarefa um perfil explícito — rápido para leituras simples e triagem, padrão para o dia a dia, completo para auditoria densa que cruza muitos arquivos — resolvido sempre para um identificador de modelo específico, nunca um apelido genérico que muda de sentido sozinho quando um modelo novo é lançado. O mesmo prompt de auditoria, reexecutado no perfil rápido como teste da mudança, custou US$ 0,10 — a prova de que o controle funciona; a diferença de qualidade entre perfis é real, e é por isso que o perfil completo continua existindo para quando a densidade da tarefa pedir.",
    promptResumido:
      "confirmar tarefa no perfil rápido para uma listagem simples de pendências",
    custoUsd: 0.1,
  },
  {
    id: "leitura-do-brain",
    data: "2026-08-30",
    categoria: "arquitetura",
    titulo: "A Rei passou a poder ler a base de governança do ecossistema",
    resumo:
      "A capacidade de leitura, que existia inerte por padrão, foi ativada e provada num corpus real de 126 documentos, sem nenhum vazamento de projeto em quarentena.",
    detalhe:
      "A leitura nasceu inerte por padrão — só foi ligada depois de uma corrente de decisões que exigiam, em dois pontos, a mão do operador. Ativá-la cedo demais teria dois riscos concretos: rejeitar o corpus inteiro por não bater com o contrato de metadados, ou indexar um documento antigo como se fosse vigente. O leitor foi reescrito para tratar as duas ameaças em código, com teste, antes de a leitura ser autorizada — pastas de infraestrutura e material legado ficam fora da varredura por construção, e um projeto de cliente marcado como bloqueado não aparece na listagem. Uma vez ativa, a leitura foi provada num corpus real de 126 documentos, com a quarentena de cliente estanque — nenhum vazamento medido.",
  },
  {
    id: "tarefa-na-conversa",
    data: "2026-08-29",
    categoria: "interface",
    titulo:
      "Pedir, aprovar e acompanhar uma tarefa virou tudo a mesma conversa",
    resumo:
      "O card de aprovação, a narrativa da execução e o resultado final passaram a viver dentro do próprio chat, não numa aba separada.",
    detalhe:
      "Antes, pedir um trabalho acontecia no chat, aprovar era em outra aba, a espera era um botão parado escrito 'Executando...' por minutos sem nenhum sinal de vida, e o resultado nascia e morria numa aba de histórico à parte — o chat nunca ficava sabendo de nada. A correção trouxe o ciclo inteiro para dentro da conversa: a tarefa proposta aparece como um card com o pedido completo, sem truncar, e os botões de confirmar ou recusar ali mesmo — mostrar o pedido inteiro é a defesa deliberada contra confirmar no automático. Ao confirmar, o chat narra o arco da execução e um painel logo abaixo mostra passo a passo o que está sendo feito em tempo real, com o resultado final voltando para a própria conversa, não preso num histórico à parte. O ganho apareceu já na primeira execução real por esse caminho: um erro de endereçamento ficou visível no primeiro passo — antes dessa mudança, o mesmo tipo de engano só apareceu depois de custar US$ 1,34 e quase três minutos.",
    custoUsd: 1.34,
  },
  {
    id: "alarme-escrita-fora-do-escopo",
    data: "2026-08-29",
    categoria: "seguranca",
    titulo:
      "Um alarme passou a mostrar quando o agente escreve fora do combinado",
    resumo:
      "O painel agora compara o antes e o depois de uma execução nos diretórios sensíveis declarados, e avisa se algo mudou fora do esperado.",
    detalhe:
      "O problema apareceu numa das primeiras execuções reais: o agente escritor terminou dizendo que tinha registrado uma decisão, e o painel, na mesma tela, informou que nenhum arquivo tinha sido alterado. As duas coisas eram verdade ao mesmo tempo — ele tinha escrito num diretório de memória própria, fora da pasta que a tarefa apontava, e o cálculo de mudança só olhava dentro dali. A correção foi um alarme, não uma jaula: antes de executar, o sistema tira um retrato de um conjunto declarado de diretórios sensíveis; depois, tira outro e compara. Qualquer arquivo criado, alterado ou removido nesse intervalo entra no resultado da tarefa, com o caminho completo — e quando nada muda, o painel também afirma isso explicitamente, em vez de deixar o silêncio parecer prova. O limite é dito com todas as letras: o alarme avisa depois do fato, e só cobre os diretórios que está vigiando — quem de fato limita o alcance de uma execução é o escopo fechado da própria tarefa, não este mecanismo.",
  },
  {
    id: "indice-quarentena",
    data: "2026-08-29",
    categoria: "seguranca",
    titulo: "Um projeto de cliente pode ser listado sem nunca ser lido",
    resumo:
      "Uma exceção estreita permite à Rei saber que documentos existem num projeto sob quarentena, sem nunca poder ler o conteúdo deles.",
    detalhe:
      "Um projeto de cliente marcado como bloqueado saía por inteiro da leitura — o que também impedia a Rei de sequer saber que documentos existiam ali, forçando uma execução paga do agente escritor só para produzir uma lista que a própria base já mantinha indexada. A correção foi uma exceção estreita, verificada em teste: de um projeto em quarentena, só cinco campos de metadados podem ser listados — identificador, tipo, status, data e caminho —, nunca o corpo do documento. Vale a ressalva por escrito: o identificador de um item já revela do que ele trata, então esse índice mostra a agenda do projeto, não o conteúdo. Por isso ele nunca vira memória da Rei, nem aparece em qualquer material que saia da conversa local — as duas travas foram verificadas separadamente.",
  },
  {
    id: "orquestrador-ledger-ponta-a-ponta",
    data: "2026-08-29",
    categoria: "arquitetura",
    titulo:
      "Confirmar uma tarefa foi validado de ponta a ponta, com custo registrado",
    resumo:
      "Da confirmação humana até o arquivo em disco e a linha de custo no registro de uso, o ciclo completo rodou com o agente real e passou.",
    detalhe:
      "O mecanismo que separa 'pedir' de 'fazer' foi validado com uma execução real, não simulada: depois da confirmação humana, um arquivo foi de fato criado na base, e o registro de uso de IA gravou o custo (US$ 0,49), o tempo de execução (16 segundos) e o status da tarefa como confirmada. É a prova, em produção e não apenas em teste isolado, de que os invariantes seguram na prática: a Rei nunca detém credencial de escrita própria, nenhum caminho do código dela toca o repositório de governança, e todo efeito de escrita passa por confirmação humana explícita antes de acontecer.",
    custoUsd: 0.49,
  },
  {
    id: "ciclo-consolidacao-esquecimento-util",
    data: "2026-08-30",
    categoria: "arquitetura",
    titulo:
      "Ficou decidido como a memória do Brain deve melhorar com o tempo, não degradar",
    resumo:
      "Uma decisão de arquitetura fixou duas regras — promoção de memória sempre com aprovação humana explícita, e documento superado saindo da busca por padrão sem nunca ser apagado — mas a implementação em código ainda não existe.",
    detalhe:
      "A base de conhecimento cresce por acúmulo: quanto mais documentos ela guarda, maior o risco de uma busca devolver algo superado como se fosse vigente. A decisão registrada tem duas partes. A primeira é a consolidação: um fato só sobe de confiabilidade para memória validada com aprovação humana explícita, item a item, nunca em bloco — a mitigação deliberada contra aprovar tudo de uma vez só para esvaziar uma fila. A segunda é a poda de recuperação: documento marcado como superado some do resultado de busca por padrão, mas nada é apagado, ele volta a aparecer quando alguém pede explicitamente, e toda omissão é declarada — quantos documentos ficaram de fora, e por quê. Vale a ressalva com todas as letras: isso é uma decisão de política, já tomada e datada; o passe de consolidação rodando de fato em código é trabalho futuro separado, que ainda não foi escrito.",
  },
];

/**
 * Intenção declarada, não roadmap com data prometida.
 */
export const proximosPassos: ProximoPasso[] = [
  {
    id: "auditoria-seguranca-site",
    titulo: "Auditoria de segurança do site",
    descricao:
      "Antes de qualquer formulário entrar no ar, uma revisão de segurança do próprio site está prevista — ainda não agendada; é intenção registrada, não uma data prometida.",
  },
  {
    id: "provedor-ia-adicional-conversa",
    titulo: "Avaliação de um provedor de IA adicional para a conversa",
    descricao:
      "Hoje a conversa roda sobre um único provedor de inferência; adotar um segundo está planejado, mas ainda não implementado, e sem data definida.",
  },
  {
    id: "catalogo-permissoes-modulos",
    titulo: "Catálogo formal de permissões e módulos",
    descricao:
      "Um documento único listando o que cada módulo pode fazer sozinho e o que sempre exige confirmação humana segue pendente de produção — hoje essa informação está correta, mas espalhada, não consolidada.",
  },
];
