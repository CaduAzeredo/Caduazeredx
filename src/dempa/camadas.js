// Camadas do trabalho: relevo 3D em wireframe na home (canvas puro).
// Veio da peça aprovada em /camadas-dempa; aqui sem os controles da proposta.
(function(){
  var tela=document.getElementById("camTela"),brilho=document.getElementById("camBrilho"),palco=document.getElementById("camPalco"),pilha=document.getElementById("camPilha");
  if(!tela||!palco||!pilha)return;
  // De baixo (0) para cima (5)
  var CAMADAS=[
    {nome:"PESQUISA",fn:"O chão de tudo: referências, fatos conferidos e o acervo.",io:"entra: curiosidade, links, áudios · sai: pauta com fonte"},
    {nome:"ROTEIRO",fn:"Transforma a pauta em tópicos com tempo por cena, para narrar improvisando.",io:"entra: pauta · sai: blocos de leitura"},
    {nome:"ARTE",fn:"Dá cara ao que foi escrito: a cabeça, o Bob, o quadro de tubo, os cards e os wallpapers.",io:"entra: blocos · sai: peças prontas para montar"},
    {nome:"VÍDEO",fn:"Junta voz, arte e som. É o que vai para o YouTube: Shorts e vídeos longos.",io:"entra: peças + narração · sai: vídeo publicado"},
    {nome:"SITE",fn:"A vitrine fixa: mostra o canal, entrega a Pasta DEMPA e guarda a lista de espera.",io:"entra: vídeos e painel · sai: lista de espera"},
    {nome:"CÍRCULO",fn:"O topo: a comunidade fechada e as specs, para quem quer fazer junto.",io:"entra: lista de espera · sai: membros"}
  ];
  var PALETAS={dempa:["#0f8a5f","#19b877","#3dff7e","#a6ffd0","#d9d4bf","#ff5fcf"]};
  var estado={pal:"dempa",sel:-1,sep:0.40};
  var N=24,NB=6;
  var c=tela.getContext("2d"),cb=brilho.getContext("2d");
  var W=0,H=0,dpr=1,visto=false,rodando=false;
  var reduz=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var parado=reduz||(window.matchMedia&&window.matchMedia("(max-width:640px)").matches);

  function hex(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
  var tintas=[];
  function montaTintas(){
    tintas=PALETAS[estado.pal].map(function(h){
      var r=hex(h),b=[];
      for(var k=0;k<NB;k++){var t=k/(NB-1)*0.55;
        b.push(Math.round(r[0]+(255-r[0])*t)+","+Math.round(r[1]+(255-r[1])*t)+","+Math.round(r[2]+(255-r[2])*t));}
      return b;
    });
  }


  function montaLista(){
    pilha.textContent="";
    for(var k=CAMADAS.length-1;k>=0;k--){(function(k){
      var li=document.createElement("li"),b=document.createElement("button"),L=CAMADAS[k];
      b.type="button";b.style.setProperty("--cor",PALETAS.dempa[k]);
      b.setAttribute("aria-pressed",estado.sel===k?"true":"false");
      [["n","0"+(k+1)],["nome",L.nome],["fn",L.fn],["io",L.io]].forEach(function(p){var s=document.createElement("span");s.className=p[0];s.textContent=p[1];b.appendChild(s);});
      b.addEventListener("click",function(){estado.sel=(estado.sel===k?-1:k);montaLista();if(!rodando)desenha(0);});
      li.appendChild(b);pilha.appendChild(li);
    })(k);}
  }

  function mede(){
    // clientWidth ignora a animação de "ligar o tubo" da página, que encolhe o retângulo medido
    if(palco.clientWidth<10)return;
    dpr=Math.min(window.devicePixelRatio||1,2);
    W=palco.clientWidth;H=Math.max(10,palco.clientHeight);
    tela.width=brilho.width=Math.round(W*dpr);tela.height=brilho.height=Math.round(H*dpr);
    if(!rodando)desenha(0);
  }
  if(window.ResizeObserver)new ResizeObserver(mede).observe(palco);else window.addEventListener("resize",mede);

  function alt(k,x,z,t){
    var s=k*1.9+0.7;
    return 0.11*(Math.sin(x*2.6+s+t*0.35)*Math.cos(z*2.1+s*1.7-t*0.2)+0.55*Math.sin((x+z)*3.4+s*2.3-t*0.28)+0.3*Math.cos((x-z)*5.1+s));
  }

  var cy0=0,sy0=0,cp=0,sp=0,S=1,CX=0,CY=0,F=4.2;
  function proj(x,y,z,o){
    var x1=x*cy0-z*sy0,z1=x*sy0+z*cy0;
    var y2=y*cp+z1*sp,z2=-y*sp+z1*cp;
    var e=F/(F+z2);
    o[0]=CX+x1*S*e;o[1]=CY-y2*S*e;o[2]=z2;return o;
  }
  var M=N+1,SX=new Float32Array(M*M),SY=new Float32Array(M*M),DZ=new Float32Array(M*M),HB=new Uint8Array(M*M),tmp=[0,0,0];

  function desenha(t){
    var estreito=W<520;
    c.setTransform(dpr,0,0,dpr,0,0);
    c.clearRect(0,0,W,H);c.fillStyle="#020504";c.fillRect(0,0,W,H);
    var yaw=-0.62+0.22*Math.sin(t*0.16),pit=0.5;
    cy0=Math.cos(yaw);sy0=Math.sin(yaw);cp=Math.cos(pit);sp=Math.sin(pit);
    var nL=CAMADAS.length,sep=estado.sep,vao=sep*(nL-1);
    S=Math.min(H/(vao*0.95+2.1),(W-(estreito?96:170))/3.1);
    CX=W*(estreito?0.42:0.46);CY=H*0.5+S*0.12;
    var base=function(k){return (k-(nL-1)/2)*sep;};
    var fonte=Math.max(13,Math.min(22,S*0.16));
    var osso="217,212,191",rosa="255,95,207";
    var yb=base(0)-0.22,yt=base(nL-1)+0.3,B=1.18;

    // chão e cruzes de marcação
    c.lineWidth=1;c.strokeStyle="rgba("+rosa+",.55)";
    c.beginPath();
    var q=[[-B,-B],[B,-B],[B,B],[-B,B]];
    for(var i=0;i<5;i++){var p=q[i%4];proj(p[0],yb,p[1],tmp);if(i)c.lineTo(tmp[0],tmp[1]);else c.moveTo(tmp[0],tmp[1]);}
    c.stroke();
    c.strokeStyle="rgba("+osso+",.5)";c.beginPath();
    var cr=Math.max(3,S*0.035);
    for(var a=0;a<5;a++)for(var b2=0;b2<4;b2++){
      var u=-B+a*(2*B/4),v=yb+0.25+b2*((yt-yb)/4);
      proj(u,v,B,tmp);c.moveTo(tmp[0]-cr,tmp[1]);c.lineTo(tmp[0]+cr,tmp[1]);c.moveTo(tmp[0],tmp[1]-cr);c.lineTo(tmp[0],tmp[1]+cr);
      if(a>0){proj(-B,v,B-a*(2*B/4),tmp);c.moveTo(tmp[0]-cr,tmp[1]);c.lineTo(tmp[0]+cr,tmp[1]);c.moveTo(tmp[0],tmp[1]-cr);c.lineTo(tmp[0],tmp[1]+cr);}
    }
    c.stroke();
    // eixo vertical com um traço por camada
    c.strokeStyle="rgba("+rosa+",.85)";c.beginPath();
    proj(-B,yb,-B,tmp);var ax=tmp[0],ay=tmp[1];c.moveTo(ax,ay);proj(-B,yt,-B,tmp);c.lineTo(tmp[0],tmp[1]);
    for(var k=0;k<nL;k++){proj(-B,base(k),-B,tmp);c.moveTo(tmp[0]-7,tmp[1]);c.lineTo(tmp[0],tmp[1]);}
    c.stroke();

    // camadas, de baixo para cima
    for(k=0;k<nL;k++){
      var apag=(estado.sel>=0&&estado.sel!==k),fa=apag?0.03:0.17,la=apag?0.1:0.62,by=base(k),tint=tintas[k];
      for(i=0;i<M;i++)for(var j=0;j<M;j++){
        var x=-1+2*i/N,z=-1+2*j/N,h=alt(k,x,z,t),id=i*M+j;
        proj(x,by+h,z,tmp);SX[id]=tmp[0];SY[id]=tmp[1];DZ[id]=tmp[2];
        var hb=Math.floor((h/0.11+1.85)/3.7*NB);HB[id]=hb<0?0:hb>NB-1?NB-1:hb;
      }
      var mid=N>>1,iInv=DZ[N*M+mid]>DZ[mid],jInv=DZ[mid*M+N]>DZ[mid*M];
      c.lineWidth=apag?0.5:0.8;
      for(var ii=0;ii<N;ii++){i=iInv?N-1-ii:ii;
        for(var jj=0;jj<N;jj++){j=jInv?N-1-jj:jj;
          var p0=i*M+j,p1=p0+M,p2=p1+1,p3=p0+1,col=tint[HB[p0]];
          c.beginPath();c.moveTo(SX[p0],SY[p0]);c.lineTo(SX[p1],SY[p1]);c.lineTo(SX[p2],SY[p2]);c.lineTo(SX[p3],SY[p3]);c.closePath();
          c.fillStyle="rgba("+col+","+fa+")";c.fill();
          c.strokeStyle="rgba("+col+","+la+")";c.stroke();
        }
      }
      // rótulo: sai do canto mais à direita
      var cantos=[0,N*M,N*M+N,N],mx=cantos[0];
      for(var m=1;m<4;m++)if(SX[cantos[m]]>SX[mx])mx=cantos[m];
      var lx=SX[mx],ly=SY[mx],fim=lx+(estreito?10:26);
      c.strokeStyle="rgba("+tint[0]+","+(apag?.25:.9)+")";c.lineWidth=1;
      c.beginPath();c.moveTo(lx,ly);c.lineTo(fim,ly);c.stroke();
      c.font=fonte+"px VT323, monospace";c.textBaseline="middle";c.textAlign="left";
      c.fillStyle="rgba("+tint[2]+","+(apag?.3:1)+")";
      c.fillText("0"+(k+1)+" "+CAMADAS[k].nome,fim+5,ly);
    }

    // mini gráfico: corte da camada escolhida (ou da base)
    if(!estreito){
      var ks=estado.sel>=0?estado.sel:0,gw=Math.min(170,W*0.2),gh=gw*0.56,gx=14,gy=H-gh-14;
      c.fillStyle="rgba(2,5,4,.82)";c.fillRect(gx,gy,gw,gh);
      c.strokeStyle="rgba("+osso+",.22)";c.lineWidth=1;c.beginPath();
      for(i=1;i<8;i++){c.moveTo(gx+gw*i/8,gy);c.lineTo(gx+gw*i/8,gy+gh);}
      for(i=1;i<5;i++){c.moveTo(gx,gy+gh*i/5);c.lineTo(gx+gw,gy+gh*i/5);}
      c.stroke();
      c.strokeStyle="rgba(57,255,156,.7)";c.strokeRect(gx+.5,gy+.5,gw,gh);
      c.strokeStyle="rgb("+tintas[ks][1]+")";c.lineWidth=1.5;c.beginPath();
      for(i=0;i<=60;i++){var xx=-1+2*i/60,yy=alt(ks,xx,0,t)/0.11;
        var px=gx+gw*i/60,py=gy+gh*0.52-yy*gh*0.22;if(i)c.lineTo(px,py);else c.moveTo(px,py);}
      c.stroke();
      c.font="14px VT323, monospace";c.fillStyle="rgba("+osso+",.85)";c.textBaseline="top";
      c.fillText("CORTE 0"+(ks+1)+" "+CAMADAS[ks].nome,gx+6,gy+4);
    }
    cb.setTransform(1,0,0,1,0,0);cb.clearRect(0,0,brilho.width,brilho.height);cb.drawImage(tela,0,0);
  }


  montaTintas();montaLista();mede();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(!rodando&&W)desenha(0);});
  if(!parado&&"IntersectionObserver" in window){
    var laco=function(ms){if(!visto){rodando=false;return;}desenha(ms/1000);requestAnimationFrame(laco);};
    new IntersectionObserver(function(es){visto=es[0].isIntersecting;if(visto&&!rodando){rodando=true;requestAnimationFrame(laco);}}).observe(palco);
  }
})();
