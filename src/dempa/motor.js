/* eslint-disable */
// Motor do site DEMPA: ícones, símbolo, animações, quiz, borrão e rotas.
// Portado da maquete aprovada em 4/11/2026. Ver AGENTS.md.
import IC from "./icones.json";
(function(){
  
  var COR={'#':'#E9E6D6','g':'#3DFF7E','d':'#1F7A4B','r':'#FF3A6E'};
  function px(nome,tinta){var r=IC[nome],s='';for(var y=0;y<16;y++)for(var x=0;x<16;x++){var c=r[y][x];if(c==='.')continue;var f=COR[c];if(tinta&&c==='g')f=tinta;s+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+f+'"/>';}return s}
  document.querySelectorAll('[data-ic]').forEach(function(e){e.setAttribute('viewBox','0 0 16 16');e.innerHTML=px(e.dataset.ic,e.dataset.t)});
  // símbolo
  function L(a,b,t){return a+(b-a)*t}function f(n){return Math.round(n*10)/10}
  function geo(t){var g=.222*(1-t),c0=[122.1,60],c1=[158.4,100],dx=c1[0]-c0[0],dy=c1[1]-c0[1],m=Math.hypot(dx,dy);dx/=m;dy/=m;var a0=[c0[0]-dx*16,c0[1]-dy*16],a1=[c1[0]+dx*16,c1[1]+dy*16];
    return {rx:L(44,32,t),ry:L(44,46,t),g:g,p0:[L(104,112,t),L(118,46,t)],p2:[L(164,134,t),118],v0:[L(a0[0],118,t),L(a0[1],118,t)],v1:[L(a1[0],150,t),L(a1[1],118,t)],vw:12*(1-t),k0:[L(c0[0],118,t),L(c0[1],118,t)],k1:[L(c1[0],150,t),L(c1[1],118,t)],kw:L(5,8,t)}}
  function simb(t,o){o=o||{};var ti=o.tinta||'#e9e6d6',bg=o.bg||'#060908',ne=o.neon||'#3dff7e',G=geo(t);
    var s='<g fill="none" stroke-width="14" stroke-linejoin="miter" stroke-miterlimit="10"><ellipse cx="62" cy="70" rx="'+f(G.rx)+'" ry="'+f(G.ry)+'" stroke="'+ti+'" pathLength="1" stroke-dasharray="'+(1-G.g).toFixed(4)+' '+G.g.toFixed(4)+'" transform="rotate('+f(G.g*180)+' 62 70)"/>';
    s+='<path d="M'+f(G.p0[0])+' '+f(G.p0[1])+'L134 22L'+f(G.p2[0])+' 118" stroke="'+ti+'"/>';
    if(G.vw>.3)s+='<path d="M'+f(G.v0[0])+' '+f(G.v0[1])+'L'+f(G.v1[0])+' '+f(G.v1[1])+'" stroke="'+bg+'" stroke-width="'+f(G.vw)+'"/>';
    return s+'<path d="M'+f(G.k0[0])+' '+f(G.k0[1])+'L'+f(G.k1[0])+' '+f(G.k1[1])+'" stroke="'+ne+'" stroke-width="'+f(G.kw)+'" '+(o.glow?'style="filter:drop-shadow(0 0 4px rgba(61,255,126,.8))"':'')+'/></g>'}
  document.querySelectorAll('[data-simb]').forEach(function(e){var d=e.dataset;e.innerHTML=simb(+d.simb,{tinta:d.tinta,bg:d.bg,neon:d.neon})});
  var hs=document.getElementById('heroSimb'),st=document.getElementById('heroSt'),tA=0,reduz=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function dh(t){if(!hs)return;hs.innerHTML=simb(t,{bg:'#000',glow:1});st.textContent=t<.5?'CA':'01';tA=t}
  function vai(a,cb){var de=tA,i=null;function p(ts){if(!i)i=ts;var q=Math.min(1,(ts-i)/600);q=Math.round(q*12)/12;dh(de+(a-de)*q);if(q<1)requestAnimationFrame(p);else cb&&cb()}requestAnimationFrame(p)}
  dh(0);if(!reduz){(function ciclo(){setTimeout(function(){vai(1,function(){setTimeout(function(){vai(0,ciclo)},1400)})},2800)})()}
  // canais oficiais
  var OF=[['Cadu Azeredo','olho','#3DFF7E','vídeos longos em português: eu falando e a tela do computador.','no ar em breve','of'],
          ['Cadu Dev','chip','#3DFF7E','código, ferramentas e automação com IA, mais no computador.','planejado','ps'],
          ['Cadu EN','lua','#FF3A6E','o canal em inglês.','planejado','ps']];
  document.getElementById('oficiais').innerHTML=OF.map(function(c){return '<article class="canal"><div class="ban"><svg class="px" viewBox="0 0 16 16" aria-hidden="true">'+px(c[1],c[2])+'</svg><b>'+c[0].toUpperCase()+'</b></div><div class="cb"><p>'+c[3]+'</p><div class="row"><span class="tag '+c[5]+'">'+c[4]+'</span><span class="tag of">oficial</span></div></div></article>'}).join('');
  // specs
  var SP=[['Short em 2D','imagem','roteiro, voz e cenas em 2D para Shorts de 60 s.','R$ 47',''],['Dossiê investigativo','roteiro','pesquisa com fontes, linha do tempo e roteiro longo.','R$ 67',''],['Checagem de roteiro','info','confere fatos, datas e nomes antes de gravar.','R$ 27',''],['Narração com tela','microfone','você fala por tópicos e ela monta o roteiro, os cortes e as legendas por cima da tela.','R$ 47','nova'],['Miniatura e título','tv','3 miniaturas no molde DEMPA (borda, glitch, texto curto) e 5 títulos para testar.','R$ 27','nova'],['Cortes em Shorts','play','pega um vídeo longo, acha os 5 melhores trechos e entrega cada um vertical e legendado.','R$ 37','nova']];
  // cadeia de cinema: 7 specs novas (19-youtube/10-base/specs, aprovadas em 5/11). Preços = sugestão, falta o ok do Cadu.
  var SC=[['Cadeia de cinema','roteiro','4 fases e 5 portões: você aprova no papel antes de gastar com voz e render.','R$ 27','nova'],['Ficha de estilo','imagem','o visual do canal em números: cores, fontes, movimento e o que não pode. Tira a cara de IA.','R$ 37','nova'],['Storyboard e cards','pasta','uma linha por cena e um quadro parado de cada uma, para aprovar antes de animar.','R$ 37','nova'],['Checagem de ritmo','ampulheta','lê o vídeo pronto e aponta cena parada demais ou imagem rápida demais.','R$ 27','nova'],['Mídia real primeiro','olho','a ordem certa para cada cena: sua mídia, acervo livre, desenho em código e só depois IA.','R$ 17','nova'],['A fala guia a tela','texto','cada número, nome e data que você fala vira imagem na hora exata da palavra.','R$ 27','nova'],['Ferramentas de IA para vídeo','chip','capa, revisor de quadros e ficha lida por outra conversa. Estou testando antes de soltar.','','em teste']];
  var PAC=[['PACOTE_SHORTS','Pacote Shorts','para quem quer postar todo dia',['Short em 2D','Cortes em Shorts','Miniatura e título'],111,77,''],['PACOTE_TUDO','Todas as 13 specs','o kit completo: as 6 de formato e as 7 de cinema',['as 13 specs','atualizações e specs novas','painel do comprador'],424,197,'top'],['PACOTE_CINEMA','Pacote Cadeia de cinema','para o vídeo sair com cara de filme, não de IA',['as 7 specs de cinema','ficha de estilo do seu canal','checagem de ritmo'],172,97,''],['PACOTE_LONGO','Pacote Vídeo longo','para vídeos de 8 a 15 minutos',['Dossiê investigativo','Narração com tela','Checagem de roteiro'],141,97,'']];
  var EXT=[['grafico','Guia: o seu nicho está aquecido?','como saber se o nicho ainda cresce antes de começar.','R$ 19'],['imagem','Kit visual DEMPA','intro de 3 s, bordas, glitch e as 4 cores para o seu canal.','R$ 17'],['disquete','Banco de temas','temas prontos, separados por nicho.','R$ 27']];
  // compra: nome da spec -> link de checkout da Kiwify. Vazio = botão "Avise-me". Só entra link que o Cadu já conferiu e ligou.
  var COMPRA={};
  function botao(nome){var u=COMPRA[nome];return typeof u==='string'&&/^https:\/\/pay\.kiwify\.com\.br\/[A-Za-z0-9]+$/.test(u)?'<a class="btn pri" href="'+u+'" rel="noopener" target="_blank">Comprar</a>':'<a class="btn" href="/specs#espera" data-ir="specs" data-rola="espera">Avise-me</a>'}
  function cards(L,b){L=L||SP;b=b||0;return L.map(function(s,i){var n=i+1+b;return '<article class="spec">'+(s[3]?'<span class="tag-l">lançamento</span>':'')+'<svg class="px" viewBox="0 0 16 16" aria-hidden="true">'+px(s[1])+'</svg><span class="term" style="color:var(--cinza)">SPEC_'+(n<10?'0':'')+n+(s[4]?' <span class="tag rd">'+s[4]+'</span>':'')+'</span><h3 style="font-size:16px">'+s[0]+'</h3><p class="nota" style="color:var(--osso)">'+s[2]+'</p><span class="pr">'+(s[3]?s[3]+' <span class="nota">avulso</span>':'<span class="nota">vem no pacote de cinema</span>')+'</span>'+botao(s[0])+'</article>'}).join('')}
  document.getElementById('specsHome').innerHTML=cards().split('</article>').slice(0,3).join('</article>')+'</article>';document.getElementById('specsPg').innerHTML=cards();document.getElementById('specsCine').innerHTML=cards(SC,SP.length);
  document.getElementById('pacotes').innerHTML=PAC.map(function(p){return '<article class="pacote '+p[6]+'"><span class="term" style="color:var(--fosforo)">'+p[0]+'.zip'+(p[6]?' · recomendado':'')+'</span><h3 style="font-size:16px">'+p[1]+'</h3><p class="nota" style="color:var(--osso)">'+p[2]+'</p><ul>'+p[3].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><span class="preco" style="margin-top:auto"><s>R$ '+p[4]+'</s>R$ '+p[5]+'</span><span class="eco">economiza R$ '+(p[4]-p[5])+'</span><a class="btn '+(p[6]?'pri respira':'')+'" href="#espera" data-rola="espera">Avise-me</a></article>'}).join('');
  document.getElementById('extras').innerHTML=EXT.map(function(e){return '<div class="extra"><svg class="px" viewBox="0 0 16 16" aria-hidden="true">'+px(e[0])+'</svg><div style="display:flex;flex-direction:column;gap:4px;min-width:0"><b>'+e[1]+'</b><span class="nota">'+e[2]+'</span><span class="pr">'+e[3]+'</span></div></div>'}).join('');
  // posts
  var PO=[['EP 01','Por que o meu código agora trabalha para os canais','#3dff7e','IA'],['EP 01','Os bastidores do primeiro vídeo: o que eu gravei e o que cortei','#3fd8ff','Internet'],['rede','Canal 03 revelado: por que eu criei e quanto ele fez no primeiro mês','#3fd8ff','Internet'],['spec','Como uma spec vira um Short em 2D, passo a passo','#3dff7e','IA'],['marca','O que é o estilo DEMPA e de onde ele veio','#ff3a6e','DEMPA'],['setup','Meu Linux com o tema de ícones e cursor novo','#ffb21e','Oficina']];
  document.getElementById('posts').innerHTML=PO.map(function(p){return '<div class="post"><span class="d">'+p[0]+'</span><b>'+p[1]+'</b><span class="tag" style="color:'+p[2]+'">'+p[3]+'</span></div>'}).join('');

  // ---------- specs: loops 9:16 ----------
  function loopShort(k,t){var W=270,H=480;k.fillStyle='#060908';k.fillRect(0,0,W,H);
    k.fillStyle='#0c2a1c';k.fillRect(0,0,W,300);
    for(var i=0;i<40;i++){var x=(i*67+Math.floor(t*6)*0)%W,y=(i*29)%260;k.fillStyle=(i+Math.floor(t*3))%7?'#1f7a4b':'#e9e6d6';k.fillRect(x,y,2,2)}
    k.fillStyle='#e9e6d6';k.beginPath();k.arc(200,70,22,0,7);k.fill();k.fillStyle='#0c2a1c';k.beginPath();k.arc(210,64,20,0,7);k.fill();
    function serra(off,base,alt,col,vel){k.fillStyle=col;k.beginPath();k.moveTo(0,H);var o=(t*vel)%120;for(var x=-120;x<=W+120;x+=60){k.lineTo(x-o,base);k.lineTo(x+30-o,base-alt)}k.lineTo(W,H);k.fill()}
    serra(0,300,70,'#13402a',10);serra(0,330,50,'#1f7a4b',22);
    k.fillStyle='#0a1a12';k.fillRect(0,330,W,150);
    var px=110,py=300,step=Math.floor(t*6)%2;k.fillStyle='#e9e6d6';k.fillRect(px,py,14,18);k.fillRect(px+2,py-12,10,10);k.fillStyle='#3dff7e';k.fillRect(px+8,py-9,2,2);k.fillStyle='#e9e6d6';k.fillRect(px+(step?0:8),py+18,5,8);k.fillRect(px+(step?8:0),py+18,5,6);
    var W4=['ELE ACHOU','UM MAPA','QUE NÃO','EXISTIA'],i=Math.floor(t/0.9)%W4.length,pop=(t%0.9)<.12?1.12:1;
    k.save();k.translate(W/2,400);k.scale(pop,pop);k.font='26px Silkscreen';k.textAlign='center';k.fillStyle='#3dff7e';k.fillText(W4[i],3,3);k.fillStyle='#e9e6d6';k.fillText(W4[i],0,0);k.restore();
    k.fillStyle='#3dff7e';k.fillRect(0,H-6,W*((t%3.6)/3.6),6)}
  function loopDossie(k,t){var W=270,H=480;k.fillStyle='#0b0f0d';k.fillRect(0,0,W,H);
    k.strokeStyle='#1a2621';k.lineWidth=1;for(var x=0;x<W;x+=18){k.beginPath();k.moveTo(x,0);k.lineTo(x,H);k.stroke()}
    var z=1+(t%6)/60;k.save();k.translate(W/2,200);k.scale(z,z);k.translate(-W/2,-200);
    var F=[[30,60,90,110],[150,40,90,110],[90,200,100,120]];
    F.forEach(function(f,i){k.fillStyle='#e9e6d6';k.fillRect(f[0],f[1],f[2],f[3]);k.fillStyle='#2a3a33';k.fillRect(f[0]+6,f[1]+6,f[2]-12,f[3]-30);k.fillStyle='#8f9a93';k.beginPath();k.arc(f[0]+f[2]/2,f[1]+38,14,0,7);k.fill();k.fillRect(f[0]+f[2]/2-20,f[1]+56,40,24);k.fillStyle='#060908';k.font='14px VT323';k.fillText('ARQ. 0'+(i+1),f[0]+8,f[1]+f[3]-8)});
    var c=[[75,115],[195,95],[140,260]],pr=Math.min(1,(t%6)/3);k.strokeStyle='#ff3a6e';k.lineWidth=3;k.beginPath();k.moveTo(c[0][0],c[0][1]);
    var seg=pr*2;for(var s=0;s<2;s++){if(seg<=s)break;var a=c[s],b=c[s+1],q=Math.min(1,seg-s);k.lineTo(a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q)}k.stroke();
    c.forEach(function(p){k.fillStyle='#ff3a6e';k.fillRect(p[0]-4,p[1]-4,8,8)});k.restore();
    var txt='1987 · a cidade sumiu do mapa em uma noite.',n=Math.floor(Math.min(1,(t%6)/4)*txt.length);
    k.fillStyle='#060908';k.fillRect(14,370,W-28,84);k.strokeStyle='#e9e6d6';k.lineWidth=2;k.strokeRect(14,370,W-28,84);
    k.fillStyle='#e9e6d6';k.font='22px VT323';var l1=txt.slice(0,Math.min(n,22)),l2=n>22?txt.slice(22,n):'';k.fillText(l1,26,400);k.fillText(l2,26,426);
    if(t%6>4.2){k.save();k.translate(190,330);k.rotate(-.2);k.strokeStyle='#ff3a6e';k.lineWidth=3;k.strokeRect(-62,-18,124,36);k.fillStyle='#ff3a6e';k.font='16px Silkscreen';k.textAlign='center';k.fillText('ARQUIVADO',0,6);k.restore()}}
  function loopChecagem(k,t){var W=270,H=480;k.fillStyle='#060908';k.fillRect(0,0,W,H);
    k.fillStyle='#e9e6d6';k.fillRect(0,0,W,30);k.fillStyle='#060908';k.font='14px Silkscreen';k.fillText('ROTEIRO.TXT',10,20);
    var L=[1,1,0,1,1,0,1,1,1,0],T=6,sy=60+((t%T)/T)*400,erros=0;
    L.forEach(function(ok,i){var y=60+i*38,w=150+((i*53)%80);var vis=sy>y+10;
      if(vis&&!ok){erros++;k.fillStyle='rgba(255,58,110,.18)';k.fillRect(20,y-6,W-40,24)}
      k.fillStyle=vis&&!ok?'#ff3a6e':'#8f9a93';k.fillRect(28,y,w,10);
      if(vis){k.font='20px Silkscreen';k.fillStyle=ok?'#3dff7e':'#ff3a6e';k.fillText(ok?'✓':'x',W-44,y+12);
        if(!ok&&sy>y+60){k.fillStyle='#3dff7e';k.fillRect(28,y+12,w-30,4)}}});
    k.fillStyle='#3dff7e';k.fillRect(10,sy,W-20,2);k.globalAlpha=.15;k.fillRect(10,sy-20,W-20,20);k.globalAlpha=1;
    k.fillStyle='#0c2a1c';k.fillRect(14,H-50,W-28,36);k.strokeStyle='#3dff7e';k.lineWidth=2;k.strokeRect(14,H-50,W-28,36);
    k.fillStyle='#e9e6d6';k.font='22px VT323';k.fillText(erros+' erro'+(erros===1?'':'s')+' achado'+(erros===1?'':'s')+' · corrigido',26,H-26)}
  function loopTela(k,t){var W=270,H=480;k.fillStyle='#060908';k.fillRect(0,0,W,H);
    // janela de tela gravada
    k.fillStyle='#e9e6d6';k.fillRect(10,40,W-20,190);k.fillStyle='#060908';k.fillRect(10,40,W-20,16);k.fillStyle='#3dff7e';k.fillRect(14,44,8,8);k.fillStyle='#ffb21e';k.fillRect(26,44,8,8);
    k.fillStyle='#0c2a1c';k.fillRect(14,60,W-28,166);
    for(var i=0;i<8;i++){var w=40+((i*37)%120),on=(t*2)%8>i;k.fillStyle=on?'#3dff7e':'#1f7a4b';k.fillRect(22+(i%3===0?0:12),70+i*18,w,8)}
    var cx=60+Math.sin(t*1.3)*60+60,cy=110+Math.cos(t*1.7)*40;k.fillStyle='#e9e6d6';k.beginPath();k.moveTo(cx,cy);k.lineTo(cx,cy+14);k.lineTo(cx+4,cy+10);k.lineTo(cx+10,cy+10);k.closePath();k.fill();
    // zoom no trecho
    if(t%5>2.5){k.strokeStyle='#ff3a6e';k.lineWidth=3;k.strokeRect(cx-30,cy-14,80,40)}
    // avatar no canto
    var ax=180,ay=262,fala=Math.floor(t*8)%2;k.fillStyle='#0c2a1c';k.fillRect(ax,ay,74,74);k.strokeStyle='#3dff7e';k.lineWidth=2;k.strokeRect(ax,ay,74,74);
    k.fillStyle='#e9e6d6';k.fillRect(ax+14,ay+12,46,36);k.fillStyle='#060908';k.fillRect(ax+18,ay+16,38,28);k.fillStyle='#3dff7e';k.font='16px Silkscreen';k.fillText('0',ax+22,ay+36);k.fillText('1',ax+42,ay+36);
    k.fillStyle='#3dff7e';k.fillRect(ax+30,ay+40,14,fala?4:2);k.fillStyle='#1f7a4b';k.fillRect(ax+18,ay+52,38,22);
    // onda de voz
    k.fillStyle='#3dff7e';for(var b=0;b<20;b++){var h=4+Math.abs(Math.sin(t*9+b*.7))*22;k.fillRect(14+b*8,300-h/2,4,h)}
    // legenda
    var L=['ISSO AQUI','É O QUE','NINGUÉM TE','MOSTRA'],j=Math.floor(t/1.1)%L.length;k.font='24px Silkscreen';k.textAlign='center';k.fillStyle='#060908';k.fillRect(14,370,W-28,46);k.fillStyle='#3dff7e';k.fillText(L[j],W/2+2,402);k.fillStyle='#e9e6d6';k.fillText(L[j],W/2,400);k.textAlign='left';
    k.fillStyle='#8f9a93';k.font='18px VT323';k.fillText('tópico 2 de 5 · sem roteiro',16,450)}
  function loopMini(k,t){var W=270,H=480;k.fillStyle='#060908';k.fillRect(0,0,W,H);
    var v=Math.floor(t/2)%3,CL=['#3dff7e','#3fd8ff','#ff3a6e'],TX=[['COMECEI','DO ZERO'],['PAREI DE','PROGRAMAR'],['O QUE EU','NÃO DISSE']];
    k.fillStyle='#8f9a93';k.font='18px VT323';k.fillText('miniatura '+(v+1)+' de 3',16,30);
    var x0=14,y0=44,w=W-28,h=w*9/16;k.fillStyle='#0c2a1c';k.fillRect(x0,y0,w,h);
    k.fillStyle='#2a3a33';k.beginPath();k.ellipse(x0+60,y0+62,26,32,0,0,7);k.fill();k.fillRect(x0+22,y0+96,76,h-96);
    // borda sticker
    k.strokeStyle='#e9e6d6';k.lineWidth=4;k.beginPath();k.ellipse(x0+60,y0+62,30,36,0,0,7);k.stroke();
    k.font='19px Silkscreen';k.fillStyle=CL[v];k.fillText(TX[v][0],x0+118,y0+60);k.fillText(TX[v][1],x0+118,y0+86);k.fillStyle='#e9e6d6';k.fillText(TX[v][0],x0+116,y0+58);k.fillText(TX[v][1],x0+116,y0+84);
    // glitch no lugar da tarja
    for(var g=0;g<6;g++){var gy=y0+100+g*5;k.fillStyle=['#3dff7e','#ff3a6e','#e9e6d6','#1f7a4b'][(g+Math.floor(t*8))%4];k.fillRect(x0+118+((g*13+Math.floor(t*8)*7)%20),gy,60+((g*29)%40),4)}
    k.strokeStyle=CL[v];k.lineWidth=2;k.strokeRect(x0,y0,w,h);
    // titulos
    var T=['Comecei do zero no YouTube','Parei de programar. Por quê?','O que eu não disse no vídeo 1','Meu primeiro mês com IA','Fiz um canal sem mostrar o rosto'];
    k.font='18px VT323';T.forEach(function(s,i){var y=y0+h+34+i*30,ac=i===Math.floor(t/1.2)%5;k.fillStyle=ac?'#0c2a1c':'#060908';k.fillRect(14,y-20,W-28,26);k.fillStyle=ac?'#3dff7e':'#8f9a93';k.fillText((ac?'> ':'  ')+s,20,y)});
    k.fillStyle='#ffb21e';k.font='18px VT323';k.fillText('5 títulos para testar',16,H-20)}
  function loopCortes(k,t){var W=270,H=480;k.fillStyle='#060908';k.fillRect(0,0,W,H);
    k.fillStyle='#8f9a93';k.font='18px VT323';k.fillText('video_longo.mp4 · 14:32',16,30);
    // onda
    for(var x=0;x<W-28;x+=3){var a=Math.abs(Math.sin(x*.09)*Math.cos(x*.023))*30+4;k.fillStyle='#1f7a4b';k.fillRect(14+x,90-a/2,2,a)}
    var C=[[20,50],[70,105],[120,150],[170,200],[210,240]],pr=(t%7)/7,head=14+pr*(W-28);
    C.forEach(function(c,i){if(head>14+c[1]){k.fillStyle='rgba(61,255,126,.25)';k.fillRect(14+c[0],56,c[1]-c[0],68);k.strokeStyle='#3dff7e';k.lineWidth=2;k.strokeRect(14+c[0],56,c[1]-c[0],68)}});
    k.fillStyle='#ff3a6e';k.fillRect(head,50,2,80);
    // shorts gerados
    var n=C.filter(function(c){return head>14+c[1]}).length;
    for(var i=0;i<5;i++){var cw=44,chh=78,cx=14+i*(cw+6),cy=170;k.strokeStyle=i<n?'#e9e6d6':'#2a3a33';k.lineWidth=2;k.strokeRect(cx,cy,cw,chh);
      if(i<n){k.fillStyle='#0c2a1c';k.fillRect(cx+2,cy+2,cw-4,chh-4);k.fillStyle='#2a3a33';k.beginPath();k.arc(cx+cw/2,cy+30,10,0,7);k.fill();k.fillStyle='#3dff7e';k.fillRect(cx+6,cy+chh-18,cw-12,6)}}
    k.fillStyle='#e9e6d6';k.font='22px Silkscreen';k.textAlign='center';k.fillText(n+' DE 5',W/2,300);k.textAlign='left';
    k.font='20px VT323';['> procurando os picos de fala','> cortando 30 a 58 s','> legenda e enquadramento vertical'].forEach(function(s,i){k.fillStyle=i<=Math.floor(pr*3)?'#3dff7e':'#2a3a33';k.fillText(s,16,350+i*26)});
    k.fillStyle='#3dff7e';k.fillRect(0,H-6,W*pr,6)}
  (function(){var F=["........########................", "......############..............", ".....####..##########...........", "....###.oo.#############........", "....###.oo.###.....########.....", "...#####..####.....##########...", "...##########################.#.", "..############################..", "..##########################....", "..##.#.#.#.#.#.#.#.#.#.#.#......", "..#.............................", "..##..#.#.#.#.#.#.#.#.#.#.......", "..######################........", "...###################..........", "................................", "................................"],o='';F.forEach(function(r,y){for(var x=0;x<r.length;x++){var c=r[x];if(c==='.')continue;o+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+(c==='o'?'#3dff7e':'#e9e6d6')+'"/>'}});var sh='';F.forEach(function(r,y){for(var x=0;x<r.length;x++)if(r[x]==='#')sh+='<rect x="'+(x+.5)+'" y="'+(y+.5)+'" width="1" height="1" fill="#ff3a6e" opacity=".35"/>'});document.getElementById('fossil').innerHTML=sh+o})();
  var LOOPS={short:loopShort,dossie:loopDossie,checa:loopChecagem,tela:loopTela,mini:loopMini,cortes:loopCortes};
  var lcs=[].slice.call(document.querySelectorAll('canvas.loopc'));
  function quadroLoops(ts){var t=(ts||0)/1000;lcs.forEach(function(c){if(!c.offsetWidth)return;var k=c.getContext('2d');LOOPS[c.dataset.loop](k,t);
    k.fillStyle='rgba(0,0,0,.18)';for(var y=0;y<480;y+=3)k.fillRect(0,y,270,1)})}
  var ultimo=0;function rodaLoops(ts){if(ts-ultimo>80){quadroLoops(ts);ultimo=ts}requestAnimationFrame(rodaLoops)}
  if(reduz)quadroLoops(1500);else requestAnimationFrame(rodaLoops);
  document.addEventListener('click',function(){setTimeout(function(){quadroLoops(1500)},30)});
  // ---------- specs: demo ----------
  var bD=document.getElementById('barrasD');bD.innerHTML=['roteiro','voz','cenas','legenda'].map(function(n){return '<div class="bd"><span>'+n+'</span><span class="tr"><i></i></span><span class="pc">0%</span></div>'}).join('');
  var LOG=['> lendo spec SHORT_2D v1.2','> roteiro: 9 cenas, 148 palavras','> voz: pt-br grave, 58 s','> cenas: 9 de 9','> legenda sincronizada'];
  var TEMA='a cidade que sumiu do mapa em uma noite',passo=0,ti=0,tocando=!reduz,ptr=document.getElementById('ptr'),tela=document.getElementById('telaD');
  function moveP(x,y){ptr.style.left=x+'%';ptr.style.top=y+'%'}
  function mostra(p){passo=p;ti=0;document.querySelectorAll('.cena').forEach(function(c){c.classList.toggle('on',+c.dataset.c===p)});
    document.querySelectorAll('#passosD button').forEach(function(b){b.classList.toggle('on',+b.dataset.p===p);if(+b.dataset.p===p)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
    document.getElementById('m0').classList.remove('sel');document.getElementById('digita').textContent='';
    bD.querySelectorAll('.bd').forEach(function(d){d.querySelector('i').style.width='0';d.querySelector('.pc').textContent='0%'});document.getElementById('logD').textContent='';
    if(p===0)moveP(80,85);if(p===1)moveP(90,40);if(p===2)moveP(92,90);if(p===3)moveP(70,70);
    if(!tocando)fim(p)}
  function fim(p){if(p===0)document.getElementById('m0').classList.add('sel');if(p===1)document.getElementById('digita').textContent=TEMA;
    if(p===2){bD.querySelectorAll('.bd').forEach(function(d){d.querySelector('i').style.width='100%';d.querySelector('.pc').textContent='100%'});document.getElementById('logD').innerHTML=LOG.join('<br>')}}
  function tick(){if(!tocando)return;ti++;
    if(passo===0){if(ti===4)moveP(18,45);if(ti===9)document.getElementById('m0').classList.add('sel');if(ti>16)mostra(1)}
    else if(passo===1){var n=Math.min(TEMA.length,Math.max(0,ti-3)*2);document.getElementById('digita').textContent=TEMA.slice(0,n);if(ti>TEMA.length/2+14)mostra(2)}
    else if(passo===2){bD.querySelectorAll('.bd').forEach(function(d,i){var v=Math.max(0,Math.min(100,(ti-i*5)*9));d.querySelector('i').style.width=v+'%';d.querySelector('.pc').textContent=Math.round(v)+'%'});
      document.getElementById('logD').innerHTML=LOG.slice(0,Math.min(LOG.length,Math.floor(ti/6)+1)).join('<br>');if(ti>36)mostra(3)}
    else if(passo===3){if(ti>30)mostra(0)}}
  setInterval(tick,140);
  document.getElementById('passosD').addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(b)mostra(+b.dataset.p)});
  var bp=document.getElementById('demoPlay');if(reduz){bp.setAttribute('aria-pressed','false');bp.textContent='Tocar'}
  bp.addEventListener('click',function(){tocando=!tocando;bp.setAttribute('aria-pressed',tocando);bp.textContent=tocando?'Pausar':'Tocar';if(!tocando)fim(passo)});
  mostra(0);
  // revelar ao rolar
  var rvs=document.querySelectorAll('.rv');
  if(reduz||!('IntersectionObserver' in window))rvs.forEach(function(e){e.classList.add('vis')});
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px -12% 0px'});rvs.forEach(function(e){io.observe(e)})}

  // ---------- robô quiz (sem IA: respostas prontas) ----------
  var OSSO='#e9e6d6',CRT='#060908',PLACA='#0c2a1c',TRILHA='#1f7a4b',CINZA='#8f9a93',SINAL='#ff3a6e',ESC='#1a2621';
  function escurece(h,k){var n=parseInt(h.slice(1),16),r=(n>>16)*k|0,g=(n>>8&255)*k|0,b=(n&255)*k|0;return 'rgb('+r+','+g+','+b+')'}
  function avatar(c,est,f,cor){var k=c.getContext('2d');k.clearRect(0,0,32,32);
    function R(x,y,w,h,col){k.fillStyle=col;k.fillRect(x,y,w,h)}
    var bob=(est==='parado'||est==='feliz')&&Math.floor(f/8)%2?1:0;
    // moletom
    var mol=escurece(cor,.38),molL=escurece(cor,.6);
    R(5,25,22,7,OSSO);R(4,27,24,5,OSSO);R(6,26,20,6,mol);R(5,28,22,4,mol);
    R(12,25,8,2,OSSO);R(13,26,6,1,molL);           // gola / capuz
    R(13,27,1,4,OSSO);R(18,27,1,4,OSSO);             // cordões
    R(13,31,1,1,cor);R(18,31,1,1,cor);
    R(14,23,4,3,CINZA);                              // pescoço / suporte
    var y0=bob;
    // fone: arco
    R(8,2+y0,16,1,OSSO);R(7,3+y0,1,2,OSSO);R(24,3+y0,1,2,OSSO);
    // monitor
    R(5,5+y0,22,18,OSSO);R(6,6+y0,20,16,ESC);
    R(7,7+y0,18,13,CRT);                             // tela
    R(19,21+y0,4,1,cor);R(8,21+y0,2,1,CINZA);        // led e botão
    // conchas do fone
    R(3,10+y0,3,7,OSSO);R(4,11+y0,1,5,TRILHA);R(26,10+y0,3,7,OSSO);R(27,11+y0,1,5,TRILHA);
    // brilho da tela
    k.fillStyle=cor;k.globalAlpha=.08;k.fillRect(7,7+y0,18,13);k.globalAlpha=1;
    // rosto
    var olhoY=10+y0;
    var pisca=est==='parado'&&(f%40===0||f%40===1);
    if(est==='feliz'){ // ^ ^
      R(10,olhoY+2,1,1,cor);R(11,olhoY+1,1,1,cor);R(12,olhoY+2,1,1,cor);
      R(19,olhoY+2,1,1,cor);R(20,olhoY+1,1,1,cor);R(21,olhoY+2,1,1,cor);
    }else if(pisca){R(10,olhoY+2,3,1,cor);R(19,olhoY+2,3,1,cor);}
    else{var dy=est==='pensando'?-1:0,dx=est==='pensando'?1:0;
      // olho 0
      R(10+dx,olhoY+dy,3,1,cor);R(10+dx,olhoY+3+dy,3,1,cor);R(10+dx,olhoY+1+dy,1,2,cor);R(12+dx,olhoY+1+dy,1,2,cor);
      // olho 1
      R(20+dx,olhoY+dy,1,4,cor);R(19+dx,olhoY+1+dy,1,1,cor);R(19+dx,olhoY+3+dy,3,1,cor);
    }
    var bocaY=16+y0;
    if(est==='falando'){var hs=[1,2,3,2,1,2];for(var i=0;i<6;i++){var h=1+((Math.sin(f*1.7+i*1.3)+1)*1.4|0);R(13+i,bocaY+1-Math.floor(h/2),1,h,cor)}}
    else if(est==='feliz'){R(13,bocaY,1,1,cor);R(14,bocaY+1,4,1,cor);R(18,bocaY,1,1,cor)}
    else if(est==='pensando'){R(14,bocaY+1,3,1,cor);
      var t=Math.floor(f/6)%2; // ampulheta flutuando
      k.save();k.translate(2,-1);R(24,1,5,1,OSSO);R(24,6,5,1,OSSO);R(25,2,3,1,t?cor:CRT);R(26,3,1,1,t?cor:OSSO);R(26,4,1,1,t?OSSO:cor);R(25,5,3,1,t?CRT:cor);R(25,2,1,1,OSSO);R(27,2,1,1,OSSO);R(25,5,1,1,OSSO);R(27,5,1,1,OSSO);k.restore()}
    else if(est==='erro'){R(13,bocaY+1,6,1,SINAL);}
    else R(13,bocaY+1,6,1,cor);
    // linhas de varredura
    k.fillStyle='rgba(0,0,0,.35)';for(var s=8+y0;s<20+y0;s+=2)k.fillRect(7,s,18,1);
    // microfone
    R(27,19,3,5,OSSO);R(28,20,1,3,CINZA);R(28,24,1,5,CINZA);R(26,29,5,1,OSSO);
    if(est==='falando'&&f%4<2)R(30,18,1,1,cor);
    if(est==='erro'){for(var n=0;n<4;n++){var yy=Math.random()*24|0,hh=1+(Math.random()*3|0),dd=(Math.random()*6|0)-3;k.drawImage(c,0,yy,32,hh,dd,yy,32,hh)}
      R(7+(Math.random()*14|0),7+y0+(Math.random()*12|0),4,1,SINAL);}
  }

  var rc=document.getElementById('roboC'),rf=0,rEst='parado';
  function rDesenha(){avatar(rc,rEst,rf,'#3dff7e')}
  (function(){var a=document.getElementById('avFeliz'),b=document.getElementById('avErro');if(a)avatar(a,'feliz',0,'#3dff7e');if(b)avatar(b,'erro',0,'#ff3a6e');
    var F2=document.getElementById('fossil2'),F1=document.getElementById('fossil');if(F2&&F1)F2.innerHTML=F1.innerHTML;
    document.querySelectorAll('[data-ok]').forEach(function(bt){bt.addEventListener('click',function(){document.querySelectorAll('[data-ok]').forEach(function(x){var on=x===bt;x.classList.toggle('pri',on);x.setAttribute('aria-pressed',on)});document.querySelectorAll('[data-okv]').forEach(function(o){o.hidden=o.dataset.okv!==bt.dataset.ok})})})})();
  rDesenha();if(!reduz)setInterval(function(){rf++;rDesenha()},120);
  var PERFIS={
    narrador:{n:'O narrador',t:'Você empresta a voz e não aparece. Pouco tempo por dia, vídeo curto.',nichos:['histórias reais em 60 s','curiosidades do Brasil','animais heróis'],f:'Shorts com voz sua e cenas em 2D',spec:'Short em 2D',p:'Sou iniciante no YouTube e vou narrar Shorts de 60 s sem aparecer. Tenho até 1 hora por dia. Me dê 10 ideias de vídeo no nicho [NICHO], cada uma com um gancho de 1 frase que prenda nos 3 primeiros segundos.'},
    investigador:{n:'O investigador',t:'Voz sua, mais tempo, vídeo que prende por minutos.',nichos:['mistérios do Brasil','casos antigos de jornal','lugares que sumiram'],f:'Vídeos de 8 a 15 min em formato dossiê',spec:'Dossiê investigativo',p:'Quero fazer um vídeo de 10 min em formato dossiê sobre [TEMA]. Monte uma linha do tempo com 6 momentos, diga a fonte de cada fato e escreva uma abertura que faça a pessoa ficar até o fim.'},
    fantasma:{n:'O fantasma',t:'Nem rosto nem voz: tudo por IA. O segredo é volume e ritmo.',nichos:['curiosidades rápidas','fatos de bichos','tecnologia que marcou época'],f:'Shorts 100% IA, 1 ou 2 por dia',spec:'Short em 2D + Checagem',p:'Vou criar um canal de Shorts feito todo com IA, sem rosto e sem voz minha. Sugira 3 nichos com pouca concorrência em português, e para cada um diga que tipo de voz de IA e de imagem combina.'},
    rosto:{n:'O rosto da marca',t:'Você aparece. Cresce mais devagar, mas vira marca e vende melhor.',nichos:['bastidores do que você faz','ensinar o que você sabe','desafios de 30 dias'],f:'Vídeo com você falando + cortes verticais',spec:'Checagem de roteiro',p:'Vou gravar vídeos falando para a câmera sobre [ASSUNTO]. Me ajude a transformar 5 tópicos soltos em um roteiro de 8 min com começo forte, 3 partes e um final que leve para o próximo vídeo.'}};
  var chat=document.getElementById('chat'),cc=document.getElementById('chatC'),rb=document.getElementById('roboB'),resp={};
  function bal(t,eu){var d=document.createElement('div');d.className='bal '+(eu?'eu':'ro');if(eu)d.textContent=t;else d.innerHTML=t;cc.appendChild(d);cc.scrollTop=cc.scrollHeight;return d}
  function ops(lista,cb){var d=document.createElement('div');d.className='ops';lista.forEach(function(o){var b=document.createElement('button');b.type='button';b.className='op';b.textContent=o[1];b.onclick=function(){d.remove();bal(o[1],1);cb(o[0])};d.appendChild(b)});cc.appendChild(d);cc.scrollTop=cc.scrollHeight;var f=d.querySelector('button');if(f)f.focus()}
  function fala(t,cb){rEst='falando';setTimeout(function(){bal(t);rEst='parado';cb&&cb()},reduz?0:450)}
  function inicio(){cc.innerHTML='';resp={};
    fala('Oi! Eu sou o Bob. Duas perguntas e eu te digo que tipo de canal combina com você.',function(){
      fala('1/2 · Você quer aparecer nos vídeos?',function(){ops([['sim','Quero aparecer'],['voz','Só a minha voz'],['nada','Nem rosto nem voz']],function(a){resp.a=a;
        fala('2/2 · Quanto tempo por dia você tem?',function(){ops([['pouco','Até 1 hora'],['muito','Mais de 1 hora']],function(b){resp.b=b;resultado()})})})})})}
  function resultado(){var k=resp.a==='sim'?'rosto':resp.a==='nada'?'fantasma':resp.b==='pouco'?'narrador':'investigador',P=PERFIS[k];rEst='feliz';
    setTimeout(function(){var d=bal('');d.className='perfil';d.innerHTML='<h4>'+P.n+'</h4><p style="margin:0;font-size:14px">'+P.t+'</p><b style="font-size:13px">3 nichos para testar</b><ul>'+P.nichos.map(function(n){return '<li>'+n+'</li>'}).join('')+'</ul><span style="font-size:14px"><b>Formato:</b> '+P.f+'</span><b style="font-size:13px">Cole isto na sua IA</b><div class="prompt">'+P.p+'</div><button type="button" class="op" id="copiar">Copiar o texto</button>';
      document.getElementById('copiar').onclick=function(){try{navigator.clipboard.writeText(P.p);this.textContent='Copiado!'}catch(e){}};
      rEst='parado';fala('Quer o resto de graça? O e-book tem o passo a passo do seu perfil.',function(){ops([['sim','Quero o e-book grátis'],['nao','Agora não']],function(r){if(r==='sim')cadastro(P);else fala('Tudo bem. Eu fico aqui no canto se mudar de ideia.',function(){ops([['rec','Refazer o quiz']],inicio)})})})},reduz?0:500)}
  function cadastro(P){fala('O e-book do seu perfil está sendo escrito. Me diz seu e-mail que eu te mando assim que ficar pronto.',function(){var f=document.createElement('form');f.className='cad';f.innerHTML='<label for="emq" style="position:absolute;left:-9999px">E-mail</label><input id="emq" type="email" required maxlength="254" placeholder="seu@email.com" autocomplete="email"><div class="hp" aria-hidden="true"><label>Não preencha<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div><label class="ck"><input type="checkbox" required> Aceito receber o e-book quando sair e os avisos de vídeo novo. Posso sair quando quiser.</label><button class="btn pri" type="submit">Me avise</button>';
    f.onsubmit=function(e){e.preventDefault();var em=f.querySelector('input[type=email]').value;f.remove();bal(em,1);rEst='pensando';
      enviaLead({email:em,interesse:'ebook',perfil:P.n,origem:'quiz'},f).then(function(ok){rEst=ok?'feliz':'erro';
        if(!ok){fala('Não consegui anotar agora. Escreva para <a href="mailto:caduazeredo@gmail.com">caduazeredo@gmail.com</a> que eu te coloco na lista.');return}
        fala('Anotado! O <b>"Primeiro canal: guia do '+P.n.replace(/^O /,'').toLowerCase()+'"</b> chega no seu e-mail assim que ficar pronto.',function(){
          fala('Enquanto isso, siga o canal para ver os vídeos: <a href="https://www.youtube.com/@CaduAzeredo?sub_confirmation=1" rel="noopener" target="_blank" class="btn" style="margin-top:6px">Seguir no YouTube</a>',function(){rEst='parado';ops([['specs','Ver as specs']],function(){abre(false);ir('specs',{push:true})})})})})};
    cc.appendChild(f);cc.scrollTop=cc.scrollHeight;f.querySelector('input').focus()})}
  function abre(o){chat.hidden=!o;rb.setAttribute('aria-expanded',o);document.getElementById('roboTip').style.display=o?'none':'';if(o&&!cc.children.length)inicio()}
  rb.addEventListener('click',function(){abre(chat.hidden)});document.getElementById('chatX').addEventListener('click',function(){abre(false);rb.focus()});
  chat.addEventListener('keydown',function(e){if(e.key==='Escape'){abre(false);rb.focus()}});
  cc.addEventListener('click',function(e){if(e.target.closest('[data-ir]'))abre(false)});
  // navegação por rotas de verdade
  var ROTAS={'/':'inicio','/canal':'canal','/dempa':'dempa','/specs':'specs','/comunidade':'comunidade','/dev':'dev','/circulo':'membro','/privacidade':'privacidade','/termos':'termos'};
  var CAMINHO={};Object.keys(ROTAS).forEach(function(k){CAMINHO[ROTAS[k]]=k});
  var TITULOS={inicio:'Cadu Azeredo · canais, specs e bastidores',specs:'Specs · Cadu Azeredo',canal:'Canal · Cadu Azeredo',dempa:'Pasta DEMPA · Cadu Azeredo',comunidade:'Comunidade e Círculo · Cadu Azeredo',dev:'Dev · Cadu Azeredo',membro:'Círculo por dentro · Cadu Azeredo',privacidade:'Privacidade · Cadu Azeredo',termos:'Termos de uso · Cadu Azeredo',erro404:'Página não encontrada · Cadu Azeredo'};
  function idDo(p){p=p.replace(/\/+$/,'')||'/';return ROTAS[p]||'erro404'}
  function rola(alvo){var el=document.getElementById(alvo);if(el)el.scrollIntoView({behavior:reduz?'auto':'smooth'})}
  function ir(id,o){o=o||{};document.querySelectorAll('.pg').forEach(function(p){p.classList.toggle('on',p.id===id)});
    var abaDe=id==='membro'?'comunidade':id;document.querySelectorAll('.aba').forEach(function(a){if(a.dataset.ir===abaDe)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    document.title=TITULOS[id]||TITULOS.inicio;var le=document.getElementById('espera');if(le){le.hidden=(id==='erro404'||id==='privacidade'||id==='termos');quer({comunidade:'circulo',dempa:'wallpapers'}[id]||'specs')}
    if(o.push&&CAMINHO[id]&&CAMINHO[id]!==location.pathname)history.pushState(null,'',CAMINHO[id]);
    if(!o.semRolar)window.scrollTo(0,0);setTimeout(borraLogo,30)}
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var b=e.target.closest('[data-ir]'),r=e.target.closest('[data-rola]');
    var q=e.target.closest('[data-quer]');
    if(b){e.preventDefault();ir(b.dataset.ir,{push:true,semRolar:!!(r&&r===b)});if(r===b)setTimeout(function(){rola(b.dataset.rola)},40);return}
    if(r){e.preventDefault();rola(r.dataset.rola)}
    if(q)quer(q.dataset.quer)});
  window.addEventListener('popstate',function(){ir(idDo(location.pathname),{semRolar:true})});
  ir(idDo(location.pathname),{semRolar:true});
  if(location.hash)setTimeout(function(){rola(location.hash.slice(1))},120);
  // listas de espera
  var ENDPOINT=import.meta.env.VITE_LEAD_FORM_ENDPOINT||'';
  /* origem por vídeo: ?v=ep01 no link da descrição. Vale para a visita inteira. */
  var VIDEO=(function(){var v=null;try{v=new URLSearchParams(location.search).get('v')}catch(e){}
    if(v&&/^[a-z0-9_-]{1,40}$/i.test(v)){v=v.toLowerCase();try{sessionStorage.setItem('cadu_v',v)}catch(e){}return v}
    try{return sessionStorage.getItem('cadu_v')||''}catch(e){return ''}})();
  function enviaLead(d,f){var hp=f&&f.querySelector('[name=_gotcha]');if(hp&&hp.value)return Promise.resolve(true);if(!ENDPOINT)return Promise.resolve(false);d.pagina=location.pathname;if(VIDEO)d.video=VIDEO;
    return fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)}).then(function(r){return r.ok}).catch(function(){return false})}
  // lista única: os interesses marcados viram etiqueta no envio
  var CHIPS=[].slice.call(document.querySelectorAll('.chip'));
  function quer(k){[].forEach.call(document.querySelectorAll('.chip'),function(c){c.setAttribute('aria-pressed',c.dataset.int===k?'true':'false')})}
  CHIPS.forEach(function(c){c.addEventListener('click',function(){c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true')})});
  document.querySelectorAll('form.lista').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var bt=f.querySelector('button[type=submit]');
    var ints=CHIPS.filter(function(c){return c.getAttribute('aria-pressed')==='true'}).map(function(c){return c.dataset.int});
    var v=f.querySelector('.lista-erro');if(v)v.remove();
    function erro(t){var p=document.createElement('p');p.setAttribute('role','status');p.className='lista-erro';p.textContent=t;f.appendChild(p);return p}
    if(!ints.length){erro('Marque pelo menos um interesse.');return}
    bt.disabled=true;
    enviaLead({email:f.querySelector('input[type=email]').value,interesse:ints.join(','),origem:'lista'},f).then(function(ok){
      if(ok){var p=document.createElement('p');p.setAttribute('role','status');p.className='lista-ok';p.textContent='> anotado. eu te aviso primeiro_';
        if(ints.indexOf('wallpapers')>-1){var a=document.createElement('a');a.className='btn pri';a.href='/dempa/wallpapers-dempa.zip';a.setAttribute('download','');a.textContent='Baixar os wallpapers (10 MB)';p.appendChild(document.createElement('br'));p.appendChild(a)}
        f.replaceWith(p)}
      else{bt.disabled=false;var p2=erro('Não consegui anotar agora. Escreva para ');var m=document.createElement('a');m.href='mailto:caduazeredo@gmail.com';m.textContent='caduazeredo@gmail.com';p2.appendChild(m)}})})});
  // pasta DEMPA
  var CAM={wp:'C:\\DEMPA\\wallpapers\\',leia:'C:\\DEMPA\\leia-me.txt',bast:'C:\\DEMPA\\.bastidores\\'};
  var ICS=[].slice.call(document.querySelectorAll('.ic'));
  ICS.forEach(function(b){b.addEventListener('click',function(){ICS.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    Object.keys(CAM).forEach(function(k){document.getElementById('p-'+k).hidden=(k!==b.dataset.p)});document.getElementById('pastaCam').textContent=CAM[b.dataset.p]})});
  // comercial: só carrega quando a pessoa toca
  var tvB=document.getElementById('tvPlay');
  if(tvB)tvB.addEventListener('click',function(){var vt=window.matchMedia&&matchMedia('(max-width:640px)').matches,vd=document.createElement('video');
    vd.controls=true;vd.autoplay=true;vd.playsInline=true;vd.preload='auto';vd.src='/dempa/video/comercial-'+(vt?'9x16':'16x9')+'.mp4';vd.poster='/dempa/video/capa-'+(vt?'9x16':'16x9')+'.jpg';
    if(vt)vd.className='vert';vd.setAttribute('aria-label','Comercial das specs');tvB.replaceWith(vd);vd.focus()});
  // canal: lê o arquivo público que o painel gera
  function urlYT(u){return typeof u==='string'&&/^https:\/\/(www\.youtube\.com|youtu\.be)\//.test(u)}
  function dataBR(d){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||'');return m?m[3]+'/'+m[2]:''}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  fetch('/dados/cadu.json').then(function(r){return r.ok?r.json():null}).then(function(d){if(!d||d.versao!==1)return;
    if(d.agora){var ag=document.getElementById('canalAgora');ag.textContent='> agora: '+String(d.agora).slice(0,140);ag.hidden=false}
    if(d.canal&&urlYT(d.canal.url))document.getElementById('canalLink').href=d.canal.url;
    var sr={};(d.series||[]).forEach(function(s){sr[s.k]=s.nome});
    var br=(d.em_breve||[]).slice(0,5);
    // card de vídeo no jeito do YouTube. O link aparece se o vídeo tem estreia (a página já é pública) ou se a data já passou.
    function cardV(v,gr){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v.data||''),h=/^(\d{2}):(\d{2})$/.exec(v.hora||''),qd=m?new Date(+m[1],+m[2]-1,+m[3],h?+h[1]:0,h?+h[2]:0):null,saiu=qd&&Date.now()>=qd.getTime();
      var abre=urlYT(v.url)&&(saiu||v.estreia===true),c=el(abre?'a':'article','yt-c'),tit=String(v.titulo||'?').slice(0,120),qdo=m?dataBR(v.data)+(h?' às '+(+h[1])+'h'+(+h[2]?h[2]:''):''):'';
      if(abre){c.href=v.url;c.target='_blank';c.rel='noopener';c.setAttribute('aria-label','Abrir no YouTube: '+tit)}
      var t=el('span','yt-t');
      if(/^dados\/capas\/[a-z0-9-]+\.jpg$/.test(v.capa||'')){var im=el('img');im.src='/'+v.capa;im.alt='';im.loading=gr?'eager':'lazy';im.width=960;im.height=540;t.appendChild(im)}else t.appendChild(el('span','yt-s','sem capa ainda_'));
      t.appendChild(el('span','yt-e'+(saiu?' ok':qd?'':' es'),saiu?'No ar':qd?(v.estreia===true?'Estreia · ':'')+dataBR(v.data)+(h?' · '+(+h[1])+'h'+(+h[2]?h[2]:''):''):'Em breve'));
      if(/^\d{1,2}:\d{2}$/.test(v.duracao||''))t.appendChild(el('span','yt-d',v.duracao));
      c.appendChild(t);
      var mt=el('span','yt-m'),av=el('img','yt-a');av.src='/dempa/cabeca/fechada.png';av.alt='';av.width=256;av.height=320;mt.appendChild(av);
      var x=el('span','yt-x');x.appendChild(el('b','',tit));x.appendChild(el('span','','Cadu Azeredo'));
      var dd=qd&&!saiu?Math.ceil((qd.getTime()-Date.now())/864e5):0,l=saiu?'Saiu em '+qdo:qd?(v.estreia===true?'Estreia em ':'Sai em ')+qdo+(dd?(dd<=1?' · falta 1 dia':' · faltam '+dd+' dias'):''):'Sai com o site';
      if(v.ep)l+=' · '+String(v.ep).slice(0,40);x.appendChild(el('span','',l));mt.appendChild(x);c.appendChild(mt);return c}
    if(br.length){var cb=document.getElementById('canalBreve');cb.textContent='';br.forEach(function(v){cb.appendChild(cardV(v))});
      var yd=document.getElementById('ytDest'),nv=cardV(br[0],true);nv.id='ytDest';if(yd)yd.replaceWith(nv);
      var yb=document.getElementById('ytDestBtn');if(yb&&nv.tagName==='A'){yb.href=nv.href;yb.lastChild.textContent=nv.querySelector('.yt-e.ok')?'Assistir no YouTube':'Ativar lembrete no YouTube'}
      var hb=document.getElementById('homeBreve');if(hb&&br.length>1){hb.textContent='';br.slice(1).forEach(function(v){hb.appendChild(cardV(v))});hb.hidden=false}}
    var na=(d.no_ar||[]).filter(function(v){return urlYT(v.url)}).slice(0,12);if(na.length){var cn=document.getElementById('canalNoAr');cn.textContent='';na.forEach(function(v){var a=el('a','vid');a.href=v.url;a.target='_blank';a.rel='noopener';
      if(/^dados\/capas\/[a-z0-9-]+\.jpg$/.test(v.capa||'')){var im=el('img');im.src='/'+v.capa;im.alt='';im.loading='lazy';a.appendChild(im)}
      a.appendChild(el('b','',String(v.titulo||'').slice(0,120)));a.appendChild(el('span','nota',[sr[v.serie],dataBR(v.data),v.duracao].filter(Boolean).join(' · ')));cn.appendChild(a)})}
  }).catch(function(){});
  // céu do início: muda com a hora do relógio. Clicar no relógio troca o céu à mão.
  var CEUS=[
    {k:'madrugada',de:0,img:1},
    {k:'amanhecer',de:5,c:[[233,230,214],[244,201,160],[226,150,150]],ch:[[233,230,214],[201,178,150]],as:[255,236,190],ay:.92,ax:.72,ar:20},
    {k:'dia',de:8,c:[[120,160,214],[176,204,230],[233,230,214]],ch:[[233,230,214],[120,150,200]],as:[255,246,214],ay:.3,ax:.76,ar:13},
    {k:'tarde',de:15,c:[[214,196,160],[233,214,176],[244,226,196]],ch:[[233,230,214],[176,140,110]],as:[255,240,200],ay:.6,ax:.78,ar:15},
    {k:'pôr do sol',de:17,c:[[40,16,52],[150,40,90],[255,140,60]],ch:[[255,58,110],[40,10,40]],as:[255,214,150],ay:.96,ax:.5,ar:26,es:1},
    {k:'noite',de:19,img:1}];
  var cv=document.getElementById('ceuCv'),cx=cv&&cv.getContext('2d'),ceuI=-1,ceuMan=false,ceuT=0,ceuEst=null;
  function ceuDaHora(h){var i=0;CEUS.forEach(function(c,n){if(h>=c.de)i=n});return i}
  function mist(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}
  var BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  function pinta(){var C=CEUS[ceuI];if(!cx||C.img)return;var W=cv.width,H=cv.height,hy=Math.round(H*.58),im=cx.createImageData(W,H),d=im.data,x,y,o,c;
    if(!ceuEst){ceuEst=[];for(var s=0;s<70;s++)ceuEst.push([Math.random()*W|0,Math.random()*hy*.8|0])}
    for(y=0;y<H;y++)for(x=0;x<W;x++){o=(y*W+x)*4;
      if(y<hy){var t=y/hy*2,q=(BAYER[(y&3)*4+(x&3)]/16-.5)*.18;t=Math.max(0,Math.min(1.999,t+q));var n=t|0;t=Math.round((t-n)*6)/6;c=mist(C.c[n],C.c[n+1]||C.c[n],t);
        var dx=x-W*C.ax,dy=y-hy*C.ay;if(dx*dx+dy*dy<C.ar*C.ar)c=C.as}
      else{var z=26/(y-hy+1),wx=(x-W/2)*z*.11,wz=z*7+ceuT,par=((Math.floor(wx)+Math.floor(wz))&1);c=C.ch[par];var nev=Math.min(1,z/9);c=mist(c,C.c[2],nev*nev)}
      d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255}
    if(C.es)ceuEst.forEach(function(e){o=(e[1]*W+e[0])*4;d[o]=d[o+1]=d[o+2]=235});
    cx.putImageData(im,0,0)}
  function poeCeu(i){ceuI=i;var C=CEUS[i],h=document.querySelector('.hero.ceu');if(!h)return;h.dataset.ceu=C.img?'foto':'cena';h.classList.toggle('claro',C.k==='amanhecer'||C.k==='dia'||C.k==='tarde');
    var l=document.getElementById('ceuLeg');if(l)l.textContent='céu: '+C.k;pinta()}
  var ceuUlt=0;function ceuAnda(ts){requestAnimationFrame(ceuAnda);if(ts-ceuUlt<90||document.hidden||!cv.offsetWidth||CEUS[ceuI].img)return;ceuUlt=ts;ceuT+=.035;pinta()}
  function rel(){var d=new Date(),r=document.getElementById('rel');r.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);if(!ceuMan){var i=ceuDaHora(d.getHours());if(i!==ceuI)poeCeu(i)}}rel();setInterval(rel,20000);
  document.getElementById('rel').addEventListener('click',function(){ceuMan=true;poeCeu((ceuI+1)%CEUS.length);ir('inicio',{push:true})});
  if(cx&&!reduz)requestAnimationFrame(ceuAnda);
  var aBob=document.getElementById('atalhoBob');if(aBob)aBob.addEventListener('click',function(){abre(true)});
  // área do membro (prévia): abas
  var MT=[].slice.call(document.querySelectorAll('[data-m]'));
  MT.forEach(function(b){b.addEventListener('click',function(){MT.forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false');x.classList.toggle('on',x===b)});
    [].forEach.call(document.querySelectorAll('.m-p'),function(q){q.hidden=q.id!=='m-'+b.dataset.m})})});
  // grupo aberto: o botão só vira link quando existir um convite de verdade
  var GRUPO='';
  if(/^https:\/\/(chat\.whatsapp\.com|discord\.gg)\//.test(GRUPO)){var gb=document.getElementById('grupoBtn'),ga=document.createElement('a');ga.className='btn pri';ga.href=GRUPO;ga.target='_blank';ga.rel='noopener';ga.textContent='Entrar no grupo';gb.replaceWith(ga)}
  // números do canal: vêm da função /api/canal (Cloudflare). Sem resposta, nada aparece.
  function nBR(n){return typeof n==='number'&&isFinite(n)?n.toLocaleString('pt-BR'):''}
  fetch('/api/canal').then(function(r){return r.ok?r.json():null}).then(function(d){if(!d||!d.ok)return;
    var a=nBR(d.inscritos),b=nBR(d.videos),c=nBR(d.views);if(!a&&!b)return;
    document.getElementById('plInsc').textContent=a||'—';document.getElementById('plVid').textContent=b;document.getElementById('plViews').textContent=c;
    var q=new Date(d.atualizado);document.getElementById('plQuando').textContent='números públicos do YouTube'+(isNaN(q)?'':', lidos em '+q.toLocaleDateString('pt-BR'));
    document.getElementById('canalPlacar').hidden=false}).catch(function(){});
  // borrão glitch
  function borraLogo(){if(typeof borra==='function')borra()}
  var P=['#060908','#1f7a4b','#3dff7e','#0c2a1c'];
  var CS=[].slice.call(document.querySelectorAll('.cens')).map(function(e){var c=document.createElement('canvas');c.setAttribute('aria-hidden','true');e.appendChild(c);if(!e.getAttribute('aria-label'))e.setAttribute('aria-label','oculto');return c});
  function borra(){CS.forEach(function(c){if(!c.offsetWidth)return;var B=4,w=Math.max(1,Math.round(c.offsetWidth/B)),h=Math.max(1,Math.round(c.offsetHeight/B));if(c.width!==w||c.height!==h){c.width=w;c.height=h}
    var k=c.getContext('2d');for(var y=0;y<h;y++){var off=Math.random()<.2?(Math.random()*3|0):0;for(var x=0;x<w;x++){var r=Math.random();k.fillStyle=P[r<.45?0:r<.75?1:r<.9?3:2];k.fillRect((x+off)%w,y,1,1)}}})}
  borra();if(!reduz)setInterval(borra,125);
  document.addEventListener('click',function(){setTimeout(borra,30)});
})();
