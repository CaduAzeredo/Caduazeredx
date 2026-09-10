import type { NovidadeEntry, ProximoPasso } from "../types";

/**
 * Registro do que já foi construído e validado no Brain e na Rei.
 * Cada entrada é um fato verificável (com data de medição), não copy de venda —
 * a copy de venda vive em `products.ts`.
 */
export const novidades: NovidadeEntry[] = [
  {
    id: "shizune-v041",
    data: "2026-09-10",
    categoria: "lancamento",
    titulo: "A v0.4.1 saiu, e declara os dois defeitos que ela não conserta",
    resumo:
      "Release de correção publicada em 2026-09-10, SHA 11cfbc2. Traz o que o quickstart nunca respondia — adoção em repositório que já existe, squash e rebase, time com mais de uma pessoa — e uma seção nova que nomeia dois defeitos conhecidos em vez de escondê-los.",
    detalhe:
      "A v0.4.1 responde perguntas que a documentação deixava abertas: como adotar o método num repositório que já tem código (e qual dos dois arranjos deixa o validador ler o histórico certo, medido nos dois caminhos de invocação); o que o squash merge faz com o trailer que o CI exige e o que o rebase faz com o SHA de uma decisão já assinada; e como um time compartilha a fronteira de autoria e a lista de confiança. O README ganhou três respostas que faltavam: se algo sai da sua máquina (não sai — e o comando que reproduz isso está impresso ao lado), o que custa sair (uma deleção: sobram Markdown e git) e o que acontece se o projeto parar. A parte incomum é a seção “conhecidos e não corrigidos”: a linha de fecho do verificador conta as etapas que responderam “não se aplica” como aprovadas, e a saída dos validadores é em português sem respeitar o idioma do sistema. Nenhum dos dois foi consertado nesta versão, e os dois estão escritos na entrada da release — publicar uma versão que carrega defeito conhecido em silêncio é exatamente o que este projeto existe para pegar. Medido no clone público em 11cfbc2: 66 arquivos, 6 check runs verdes em Node 20, Node 22 e Bun, e o verificador com 9 etapas das quais 7 executam e 2 respondem “não se aplica”.",
  },
  {
    id: "shizune-assinante-contra-chave",
    data: "2026-09-10",
    categoria: "seguranca",
    titulo:
      "O registro passou a conferir quem assinou contra a chave que assinou",
    resumo:
      "Até 2026-09-10 o validador perguntava se a assinatura era boa. Agora pergunta de qual chave ela é — e o nome escrito na linha da decisão tem de bater com o principal daquela chave. Decisão DEC-020, assinada em 9c53321.",
    detalhe:
      "Duas afirmações estavam sendo tratadas como uma: “uma chave confiável assinou” e “a pessoa nomeada na linha assinou”. Só a primeira era conferida — a coluna do assinante era texto livre, e uma linha dizendo um nome cujo commit foi assinado por outra chave da lista passava sem ruído. O validador passou a ler o principal da chave, além do código de verificação, e reprova em dois casos novos: decisão assinada pela chave de máquina — a que um agente usa para trabalho de rascunho, e que nunca pode assinar decisão — e assinante declarado que não corresponde ao principal. Assinante fora do mapa avisa e não reprova, para não quebrar quem usa nome livre. A correspondência é declarada pela instância num arquivo que o pacote público não leva: sem ele, nada disso roda, e um clone de terceiro não nasce vermelho por uma regra que ninguém ali decidiu. Antes de declarar o arquivo, os sete SHAs que assinam as quatorze decisões vigentes foram medidos um a um — todos com chave confiável e o mesmo principal —, porque ligar a exigência com uma linha divergente deixaria o CI vermelho contra uma linha que o próprio registro proíbe editar. O que isso prova é qual chave assinou. Não prova que um humano escreveu o conteúdo, e o texto do produto diz isso.",
  },
  {
    id: "shizune-adr-046-duas-chaves",
    data: "2026-09-10",
    categoria: "seguranca",
    titulo:
      "A decisão de duas chaves foi aceita — o executor assina rascunho, o humano assina decisão",
    resumo:
      "O ADR-046 saiu de proposto em 2026-09-10, com as cinco verificações dele satisfeitas. Nasceu de um defeito encontrado na própria casa: a chave do operador assinava sem que o operador estivesse presente.",
    detalhe:
      "Em 2026-09-04 uma verificação mostrou que a chave de assinatura não tinha senha e nenhum agente a guardava: qualquer processo da máquina — inclusive uma sessão automatizada — assinava em milissegundos, sem pedir nada. A camada “assinatura verificada por chave” provava que a máquina assinou, não que a pessoa estava presente. Dois commits daquele dia tinham sido assinados assim e um deles marcava uma decisão como vigente; os dois foram revertidos e não contaram como assinatura. A correção veio em três partes: senha na chave humana, digitada só no teclado da máquina e nunca por sessão remota, aplicada em 2026-09-06; uma chave separada e marcada como de máquina, que assina trabalho de rascunho e nunca decisão; e o validador conferindo qual das duas assinou. O ADR ficou como pré-requisito declarado da data de lançamento, e foi aceito quando as quatro primeiras verificações passaram — a quinta é o CI verde, que fechou no push do mesmo dia. A chave de máquina existe para ser acusada, não usada: nenhum commit por sessão automatizada saiu daquele repositório desde 4 de setembro.",
  },
  {
    id: "site-comando-que-nao-reproduzia",
    data: "2026-09-10",
    categoria: "arquitetura",
    titulo:
      "O comando impresso ao lado de um número da página nunca reproduziu aquele número",
    resumo:
      "A página do produto exibe cada número com o comando que o reproduz. Um deles não reproduzia: contava linhas em vez de decisões, e devolvia 82 onde a página dizia 16. Corrigido em 2026-09-10, e o número mudou junto.",
    detalhe:
      "A regra escrita no topo do arquivo de conteúdo dizia “todo número vem com o comando que o reproduz; número solto não entra”. O que faltava era a condição óbvia: que o comando de fato reproduza. O padrão trazia uma alternância com o lado esquerdo vazio, que casa toda linha não vazia do arquivo — contava linhas. Ninguém percebeu porque nada neste site executa o comando que a página exibe: o portão cobre contraste, movimento, tipos e build, e nenhuma dessas checagens roda o que está impresso ao lado do número. O conserto trocou o comando e o número na mesma edição, porque o número certo é 20 justamente porque o comando certo devolve 20 — quinze decisões assinadas e cinco em rascunho, que existem e não contam. Na mesma passada saíram os outros números que tinham ficado em 3 de setembro, e os que estavam cravados no código de duas páginas foram para o arquivo de conteúdo, que é onde podem ser corrigidos da próxima vez. Uma janela de terminal da home ainda mostrava cinco etapas e “os 5 verificadores passaram”, retrato de 31 de agosto; agora lista as nove com a marca real de cada uma. As duas causas estruturais — a ficha ainda digitada à mão e a ausência de qualquer checagem que execute o comando exibido — ficaram registradas como trabalho reconhecido e não feito.",
  },
  {
    id: "shizune-dev-no-ar",
    data: "2026-09-09",
    categoria: "arquitetura",
    titulo:
      "shizune.dev entrou no ar, e o diagnóstico que o mantinha fora estava errado",
    resumo:
      "O domínio do produto respondia no www e não no domínio raiz. O diagnóstico dizia falha de certificado; a causa nunca foi certificado. Resolvido em 2026-09-09, e o erro fica escrito.",
    detalhe:
      "Era o último achado aberto do autodiagnóstico, e ficou aberto desde a v0.3.1. A explicação registrada na época — falha de TLS no domínio raiz — estava errada: o domínio nunca tinha sido adicionado ao projeto na hospedagem, e a delegação apontava para nameservers que recusavam a zona. O que se via como erro de certificado era ausência de zona. A medição de 2026-09-09 foi feita contra resolvers públicos, fora da máquina do operador, para que a resposta não viesse de cache local. Duas coisas ficaram dessa frente. A primeira: corrigir o placar sem dizer o que se errou seria o defeito que o produto denuncia, então o erro de diagnóstico está escrito no lugar onde o achado era relatado. A segunda é regra de método — dois dias de diagnóstico leram o código de status da resposta e não o corpo: um domínio estacionado devolvia 200 com a página do provedor, e uma verificação que confere só o status aprova a página errada. Toda checagem de “está no ar” passou a conferir uma marca esperada no conteúdo.",
  },
  {
    id: "shizune-v031-rebrand",
    data: "2026-09-03",
    categoria: "lancamento",
    titulo: "O Brain Framework virou Shizune, e a v0.3.1 saiu diagnosticada",
    resumo:
      "O rebrand público: mesmo método, nome novo, repositório renomeado para CaduAzeredo/shizune. A v0.3.1 saiu no mesmo dia — depois de o próprio Shizune ser diagnosticado com o próprio Shizune.",
    detalhe:
      "Shizune (静音, som quieto) é o nome público do que antes se chamava Brain Framework — o nome passou pela bateria de disponibilidade em 2026-09-02, e o repositório antigo foi renomeado, não duplicado. A v0.3.1, publicada em 2026-09-03 no SHA 0ccfe4f, saiu de um ciclo que é a própria tese em prática: o instrumento de diagnóstico foi apontado contra o próprio pacote (SHA c248f75), encontrou cinco divergências — nenhuma de segurança, nenhum vazamento — e quatro foram fechadas e verificadas no clone publicado, com 6 check runs verdes em Node 20, Node 22 e Bun. Um achado continuou aberto: o apex shizune.dev não respondia enquanto o www respondia. Ele vai citado aqui porque esconder o aberto seria o defeito que a ferramenta denuncia. (Atualização de 2026-09-09: fechado — e o diagnóstico daquele dia estava errado. A causa nunca foi TLS: o domínio nunca tinha sido adicionado ao Vercel, e a delegação apontava para nameservers que recusavam a zona. Corrigido, e shizune.dev está no ar.)",
  },
  {
    id: "brain-v021-publico",
    data: "2026-08-31",
    categoria: "lancamento",
    titulo: "O Brain Framework foi publicado como repositório público",
    resumo:
      "O framework saiu do uso interno: repositório aberto sob Apache 2.0, sem dependências externas, com a versão v0.2.1 marcada em 31 de agosto de 2026.",
    detalhe:
      "Até hoje o Brain existia como repositório de governança privado, e a única prova de que ele funcionava era o resultado dos projetos que ele guiava — o que exige acreditar na descrição. A publicação torna o contrato verificável por quem não acredita: o validador que confere os metadados dos documentos roda sem instalar nada e reprova a verificação quando um segredo aparece solto no texto. Medido no dia da publicação: 60 arquivos no pacote, 1 commit no histórico público, e os 5 verificadores passando num clone limpo. Duas versões foram marcadas no mesmo dia — v0.2.0 e, em seguida, v0.2.1, que é a vigente; a segunda fechou sete achados de uma auditoria adversarial feita antes de anunciar. O que a publicação NÃO significa: adoção, uso por terceiros, ou qualquer sinal de tração. O repositório nasceu hoje e não há número de uso para relatar.",
  },
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
