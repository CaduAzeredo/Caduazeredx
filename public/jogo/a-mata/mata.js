// DEMPA · A Mata (fase final). Walking sim em Three.js, tudo procedural.
// Objetivo: achar os 7 sinais (TVs de tubo caídas). Os medos chegam perto quando você está perdido.
// Ser pego = puxão (volta para o começo da estrada, sinais ficam). Com os 7, o carro vem: fim no sono.
// v3: modos fácil/médio/difícil; um medo por sinal, que vigia o sinal aceso; 2 vezes e não se repete.
// v4: cena de captura. O medo pega, a sua câmera grava, a fita congela e rebobina até o começo da estrada.
// Os medos são MARCADORES até o Cadu desenhar.
import * as THREE from './lib/three.module.min.js';

const P = new URLSearchParams(location.search);
const GRAVAR = P.has('gravar');
// modos: o que muda é o feixe, a distância e a velocidade do medo, a mira da lanterna e quando ele começa a te enxergar
const MODOS = {
  facil:   { id: 'facil',   nome: 'fácil',   feixe: .7,  feixeAtras: true,  medoDesde: 2, caca: 6, area: 16, espera: [4, 7], d2: [13, 16], vPal: 1.3, vTer: .5,  cone: .24, mira: .25, gasto: .06, perdido: .6,  chiado: 9,  dica: true,  somePrimeira: .8, desiste: true },
  medio:   { id: 'medio',   nome: 'médio',   feixe: .6,  feixeAtras: false, medoDesde: 1, caca: 5, area: 20, espera: [3, 6], d2: [10, 13], vPal: 2.0, vTer: .8,  cone: .18, mira: .35, gasto: .1,  perdido: 1,   chiado: 13, dica: true,  somePrimeira: 1,  desiste: false },
  dificil: { id: 'dificil', nome: 'difícil', feixe: 0,   feixeAtras: false, medoDesde: 1, caca: 3, area: 24, espera: [2, 4], d2: [8, 11],  vPal: 2.8, vTer: 1.1, cone: .13, mira: .45, gasto: .13, perdido: 1.3, chiado: 18, dica: false, somePrimeira: 1.3, desiste: false },
};
let modo = MODOS[P.get('modo')] || MODOS.medio, escolheu = !!MODOS[P.get('modo')];
const tela = document.getElementById('tela');
const R = new THREE.WebGLRenderer({ canvas: tela, antialias: false, preserveDrawingBuffer: GRAVAR, powerPreference: 'high-performance' });
R.setPixelRatio(1);
R.outputColorSpace = THREE.LinearSRGBColorSpace;

const lin = (hex) => { const c = new THREE.Color(); c.setRGB(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255, THREE.SRGBColorSpace); return c; };
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------- mapa ----------
const LIM = { x: 58, z0: 24, z1: -166 };
const INICIO = { x: 0, z: 16 };
const CARRO_Z = -128;
const SALA_B = { x: -22, z: -42, r: 9 };     // sala bagunçada
const SALA_D = { x: 24, z: -80, r: 9 };      // discos quebrados
const SINAIS = [[-9, -12], [15, -27], [-19, -44], [-34, -72], [26, -82], [9, -104], [-15, -118]];
const reservado = [SALA_B, SALA_D, { x: INICIO.x, z: INICIO.z, r: 3 }, ...SINAIS.map(([x, z]) => ({ x, z, r: 2.2 }))];
const livre = (x, z) => !reservado.some(c => (x - c.x) ** 2 + (z - c.z) ** 2 < c.r * c.r);

// ---------- cena ----------
const cena = new THREE.Scene();
const NEVOA = lin(0x3a8f99);
cena.fog = new THREE.FogExp2(NEVOA, .04);
cena.background = NEVOA;
const cam = new THREE.PerspectiveCamera(66, 16 / 9, .05, 400);

const ceu = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { a: { value: lin(0x6cc2cf) }, b: { value: lin(0x1a4c54) } },
  vertexShader: `varying vec3 p; void main(){ p = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
  fragmentShader: `uniform vec3 a,b; varying vec3 p; void main(){ float y = clamp(p.y,0.,1.); vec3 c = mix(a,b,pow(y,.55)); c = mix(c, a*.55, smoothstep(0.,-.2,p.y)); gl_FragColor = vec4(c,1.); }`
}));
cena.add(ceu);

const chao = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: lin(0x0d1d1c), roughness: 1 }));
chao.rotation.x = -Math.PI / 2; cena.add(chao);
function texCanvas(w, h, desenha, rep = [1, 1]) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; desenha(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const estradaTex = texCanvas(256, 1024, (g) => {
  g.fillStyle = '#2a3634'; g.fillRect(0, 0, 256, 1024);
  for (let i = 0; i < 9000; i++) { const v = 30 + rnd() * 50; g.fillStyle = `rgb(${v},${v + 6},${v + 4})`; g.fillRect(rnd() * 256, rnd() * 1024, 1 + rnd() * 2, 1 + rnd() * 2); }
  g.fillStyle = 'rgba(120,150,150,.35)'; g.fillRect(64, 0, 22, 1024); g.fillRect(170, 0, 22, 1024);
}, [1, 30]);
const rastroTex = texCanvas(256, 1024, (g) => {
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 1024);
  for (let y = 0; y < 1024; y += 2) { const a = .55 + .45 * Math.sin(y * .006) * Math.sin(y * .0031); g.fillStyle = `rgba(95,175,185,${a})`; g.fillRect(66 + Math.sin(y * .02) * 3, y, 16, 2); g.fillRect(172 + Math.sin(y * .017) * 3, y, 16, 2); }
}, [1, 30]);
const estrada = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 400), new THREE.MeshStandardMaterial({ map: estradaTex, roughness: .32, metalness: .35, emissive: lin(0xffffff), emissiveMap: rastroTex, emissiveIntensity: .55 }));
estrada.rotation.x = -Math.PI / 2; estrada.position.set(0, .01, -150); cena.add(estrada);
cena.add(new THREE.HemisphereLight(lin(0x7fd0da), lin(0x0a1414), .8));

// ---------- árvores ----------
function juntar(geos) {
  let n = 0; const ps = geos.map(g => g.index ? g.toNonIndexed() : g);
  ps.forEach(g => n += g.attributes.position.count);
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let o = 0;
  ps.forEach(g => { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
  const b = new THREE.BufferGeometry(); b.setAttribute('position', new THREE.BufferAttribute(pos, 3)); b.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); return b;
}
function arvore() {
  const geos = []; const up = new THREE.Vector3(0, 1, 0);
  function galho(base, dir, comp, raio, nivel) {
    const g = new THREE.CylinderGeometry(raio * .62, raio, comp, nivel > 2 ? 5 : 3, 1, true);
    g.translate(0, comp / 2, 0); g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, dir)); g.translate(base.x, base.y, base.z); geos.push(g);
    if (nivel === 0 || raio < .012) return;
    const fim = base.clone().addScaledVector(dir, comp);
    const n = nivel > 2 ? 2 + Math.floor(rnd() * 2) : 2 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const d = dir.clone().add(new THREE.Vector3(rnd() - .5, rnd() * .55, rnd() - .5).multiplyScalar(1.5)).normalize();
      if (d.y < .15) d.y = .15;
      const ini = nivel > 3 && i > 0 ? base.clone().addScaledVector(dir, comp * (.45 + rnd() * .5)) : fim;
      galho(ini, d.normalize(), comp * (.55 + rnd() * .25), raio * .62, nivel - 1);
    }
  }
  const r0 = .14 + rnd() * .12;
  galho(new THREE.Vector3(), new THREE.Vector3((rnd() - .5) * .12, 1, (rnd() - .5) * .12).normalize(), 3.5 + rnd() * 3, r0, 5);
  return { geo: juntar(geos), r0 };
}
const casca = new THREE.MeshLambertMaterial({ color: lin(0x0a1312) });
const MOLDES = Array.from({ length: 7 }, arvore);
const troncos = new Map();   // colisão: grade de 4 m
const celula = (x, z) => Math.floor(x / 4) + ',' + Math.floor(z / 4);
const blocos = [];   // árvores em blocos de 30 m: só os blocos perto de você são desenhados (a neblina esconde o resto)
function plantar() {
  const B = new Map();
  for (let i = 0; i < 2600; i++) {
    const x = (rnd() - .5) * 180, z = 30 - rnd() * 230;
    if (Math.abs(x) < 4.2 + rnd() * 2.5 || !livre(x, z)) continue;
    const k = i % MOLDES.length, s = .8 + rnd() * .9;
    const bx = Math.floor(x / 30), bz = Math.floor(z / 30), bk = bx + ',' + bz;
    if (!B.has(bk)) B.set(bk, { cx: (bx + .5) * 30, cz: (bz + .5) * 30, L: MOLDES.map(() => []) });
    B.get(bk).L[k].push([x, z, rnd() * 6.28, s, .9 + rnd() * .5]);
    const key = celula(x, z); if (!troncos.has(key)) troncos.set(key, []); troncos.get(key).push({ x, z, r: MOLDES[k].r0 * s + .05 });
  }
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  B.forEach(b => {
    const ms = [];
    b.L.forEach((L, k) => {
      if (!L.length) return;
      const im = new THREE.InstancedMesh(MOLDES[k].geo, casca, L.length);
      L.forEach(([x, z, r, s, h], i) => { m.compose(new THREE.Vector3(x, 0, z), q.setFromEuler(e.set(0, r, 0)), new THREE.Vector3(s, s * h, s)); im.setMatrixAt(i, m); });
      im.computeBoundingSphere(); cena.add(im); ms.push(im);
    });
    blocos.push({ cx: b.cx, cz: b.cz, ms });
  });
  const moita = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.6, 0), new THREE.MeshLambertMaterial({ color: lin(0x0b1a17) }), 1500);
  for (let i = 0; i < 1500; i++) { let x = (rnd() - .5) * 150, z = 25 - rnd() * 200; if (Math.abs(x) < 2.6) x += Math.sign(x || 1) * 2.6; if (!livre(x, z)) { x = 70; } m.compose(new THREE.Vector3(x, .1, z), new THREE.Quaternion(), new THREE.Vector3(1 + rnd() * 1.5, .4 + rnd() * .8, 1 + rnd() * 1.5)); moita.setMatrixAt(i, m); }
  cena.add(moita);
}

// ---------- brilho (sprite aditivo) ----------
const brilhoTex = texCanvas(128, 128, (g) => {
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.12, 'rgba(230,250,255,.9)'); gr.addColorStop(.4, 'rgba(160,220,230,.18)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
});
function brilho(cor, tam, op = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: brilhoTex, color: cor, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, transparent: true, opacity: op }));
  s.scale.set(tam, tam, 1); return s;
}

// ---------- carro (sempre no fim da estrada, farol aceso) ----------
const carro = new THREE.Group(); carro.position.set(0, 0, CARRO_Z); cena.add(carro);
const lataria = new THREE.MeshBasicMaterial({ color: lin(0x050909) });
{ const b = new THREE.Mesh(new THREE.BoxGeometry(1.8, .7, 4.2), lataria); b.position.set(0, .65, -2.1); carro.add(b);
  const c = new THREE.Mesh(new THREE.BoxGeometry(1.5, .55, 2), lataria); c.position.set(0, 1.25, -2.4); carro.add(c); }
const farois = [];
for (const x of [-.55, .55]) {
  const b = brilho(lin(0xffffff), 2.6); b.position.set(x, .75, .25); carro.add(b);
  const s = new THREE.SpotLight(lin(0xdff6ff), 45, 70, .45, .6, 1.4); s.position.set(x, .75, 0); s.target.position.set(x * .3, 0, 25); carro.add(s, s.target); farois.push(s);
}
const halo = brilho(lin(0x9fe0e8), 10, .35); halo.position.set(0, .9, .5); carro.add(halo);

// ---------- TV de tubo (tela em shader: estática verde com número, ou cinza) ----------
const telaVS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`;
const telaFS = `uniform float t, liga, cinza; uniform sampler2D num; varying vec2 vUv;
  float h(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
  void main(){
    vec2 q = floor(vUv*vec2(96.,72.)); float n = h(q + floor(t*24.)*vec2(3.1,7.7));
    float rol = smoothstep(.0,.08,fract(vUv.y*1.5 - t*.35))*.25 + .75;
    vec3 est = mix(vec3(.15,.55,.3)*n, vec3(n*.75), cinza) * rol;
    float m = texture2D(num, vUv).r * (1.-cinza);
    vec3 c = mix(est, vec3(.36,1.,.58), m*.9);
    gl_FragColor = vec4(mix(vec3(.01,.015,.015), c, liga), 1.);
  }`;
const telas = [];
function numTex(txt) {
  return texCanvas(256, 192, (g) => { g.fillStyle = '#000'; g.fillRect(0, 0, 256, 192); g.fillStyle = '#fff'; g.font = 'bold 26px monospace'; g.textAlign = 'center'; g.fillText(txt, 128, 104); });
}
const vazioTex = numTex('');
function tv(x, z, rot, opt = {}) {
  const g = new THREE.Group(); g.position.set(x, opt.y || 0, z); g.rotation.set(opt.tomba || 0, rot, opt.inclina ?? .08);
  const caixa = new THREE.Mesh(new THREE.BoxGeometry(.62, .5, .5), new THREE.MeshStandardMaterial({ color: lin(opt.cor || 0x26242a), roughness: .7 })); caixa.position.y = .25; g.add(caixa);
  const mat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, liga: { value: 1 }, cinza: { value: opt.cinza ? 1 : 0 }, num: { value: opt.num ? numTex(opt.num) : vazioTex } }, vertexShader: telaVS, fragmentShader: telaFS });
  const t = new THREE.Mesh(new THREE.PlaneGeometry(.46, .34), mat); t.position.set(0, .26, .252); g.add(t);
  const gl = brilho(lin(opt.cinza ? 0xbfd4d4 : 0x3dff7e), 1.4, .45); gl.position.set(0, .28, .4); g.add(gl);
  cena.add(g); telas.push(mat);
  return { g, mat, gl };
}
const luzSinal = new THREE.PointLight(lin(0x3dff7e), 3, 7, 1.6); cena.add(luzSinal);
const sinais = SINAIS.map(([x, z], i) => {
  const o = tv(x, z, Math.atan2(-x, 3) + (rnd() - .5) * .6, { num: String(i + 1).padStart(10, '0') });
  return { ...o, x, z, i, achado: false };
});
let achados = 0;
const feixe = new THREE.Mesh(new THREE.CylinderGeometry(.3, .7, 34, 12, 1, true), new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, depthTest: false, fog: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  uniforms: { t: { value: 0 }, forca: { value: 1 } },
  vertexShader: `varying vec2 vUv; varying float vF; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.); vF = abs(dot(normalize(normalMatrix*normal), normalize(-mv.xyz))); gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `uniform float t, forca; varying vec2 vUv; varying float vF; void main(){ float a = (.12 + pow(1.-vUv.y, 1.4)*.6)*(.8+.2*sin(t*3.))*pow(vF, 1.5)*forca; gl_FragColor = vec4(vec3(.24,1.,.5)*a, a); }`
}));
feixe.renderOrder = 10; cena.add(feixe);
function acende(i) {
  sinais.forEach((s, k) => { const on = k === i; s.mat.uniforms.liga.value = on ? 1 : 0; s.gl.visible = on; });
  const s = sinais[i];
  if (s) { feixe.position.set(s.x, 17, s.z); feixe.visible = modo.feixe > 0; luzSinal.position.set(s.x, .5, s.z); luzSinal.intensity = 3; }
  else { feixe.visible = false; luzSinal.intensity = 0; }
}
function aplicaModo(m) {        // feixe: fácil = alto e visível por cima das árvores; médio = fraco, some atrás delas; difícil = nenhum
  modo = m; feixe.material.uniforms.forca.value = m.feixe; feixe.material.depthTest = !m.feixeAtras; feixe.material.needsUpdate = true;
  acende(achados);
}
acende(0);

// ---------- sala bagunçada: TVs em estática + cadeiras em 3D real, 2D e Blender antigo ----------
const madeiraTex = texCanvas(128, 128, (g) => {
  g.fillStyle = '#5a3a22'; g.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 2) { g.fillStyle = `rgba(${30 + rnd() * 30},${15 + rnd() * 15},5,${.25 + rnd() * .3})`; g.fillRect(0, y, 128, 1 + rnd() * 2); }
});
function cadeira3D() {
  const g = new THREE.Group(), m = new THREE.MeshStandardMaterial({ map: madeiraTex, roughness: .55 });
  const add = (w, h, d, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); };
  add(.46, .05, .44, 0, .46, 0); add(.46, .5, .04, 0, .74, -.2);
  for (const x of [-.2, .2]) for (const z of [-.19, .19]) add(.04, .46, .04, x, .23, z);
  add(.04, .04, .36, -.2, .12, 0); add(.04, .04, .36, .2, .12, 0);
  return g;
}
const cadeira2DTex = texCanvas(256, 384, (g) => {
  g.clearRect(0, 0, 256, 384); g.fillStyle = 'rgba(236,232,220,.96)';
  g.beginPath(); g.moveTo(40, 30); g.lineTo(212, 22); g.lineTo(216, 378); g.lineTo(36, 382); g.closePath(); g.fill();
  g.strokeStyle = '#111'; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round';
  const L = (a, b, c, d) => { g.beginPath(); g.moveTo(a + rnd() * 3, b); g.lineTo(c + rnd() * 3, d); g.stroke(); };
  L(80, 60, 78, 220); L(176, 58, 180, 222); L(80, 62, 176, 60); L(80, 110, 178, 112);
  L(62, 222, 196, 224); L(62, 222, 66, 360); L(196, 224, 192, 358); L(92, 232, 96, 330); L(170, 232, 166, 330);
});
function cadeira2D() {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(.62, .93), new THREE.MeshBasicMaterial({ map: cadeira2DTex, transparent: true, alphaTest: .4, side: THREE.DoubleSide }));
  m.position.y = .46; const g = new THREE.Group(); g.add(m); return g;
}
function cadeiraBlender() {   // cinza padrão, sombreado chapado, contorno laranja de "selecionado"
  const g = new THREE.Group(), m = new THREE.MeshLambertMaterial({ color: lin(0x8c8c8c), flatShading: true });
  const ln = new THREE.LineBasicMaterial({ color: lin(0xff8a1a) });
  const add = (w, h, d, x, y, z) => { const geo = new THREE.BoxGeometry(w, h, d); const b = new THREE.Mesh(geo, m); b.position.set(x, y, z); g.add(b); const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), ln); e.position.copy(b.position); g.add(e); };
  add(.5, .08, .5, 0, .46, 0); add(.5, .55, .08, 0, .78, -.21);
  for (const x of [-.21, .21]) for (const z of [-.21, .21]) add(.08, .46, .08, x, .23, z);
  return g;
}
function cuboPadrao() {
  const g = new THREE.Group(), geo = new THREE.BoxGeometry(.9, .9, .9);
  const b = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: lin(0x8c8c8c), flatShading: true })); b.position.y = .45; g.add(b);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: lin(0xffb84a) })); e.position.y = .45; g.add(e);
  return g;
}
const salaB = { pecas: [], vistoEm: 0 };
{
  const G = new THREE.Group(); G.position.set(SALA_B.x, 0, SALA_B.z); cena.add(G);
  const mov = new THREE.MeshStandardMaterial({ color: lin(0x3a3530), roughness: .9 });
  const caixa = (w, h, d) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mov); b.position.y = h / 2; g.add(b); return g; };
  const itens = [cadeira3D(), cadeira3D(), cadeira2D(), cadeira2D(), cadeiraBlender(), cadeiraBlender(), cuboPadrao(),
    caixa(1.6, .8, .8), caixa(.6, 1.6, .5), caixa(1.2, .5, 1.2), caixa(2, .1, 1), caixa(.5, .5, .5)];
  // TVs em estática cinza (não são sinais), uma tombada
  [[-2.5, 2, .4, {}], [2.8, -1.5, -.6, {}], [0, 3.2, 2.6, { tomba: -1.3, y: .25 }], [-3.4, -2.6, 1.2, { y: .8 }]].forEach(([x, z, r, o]) => {
    const t = tv(SALA_B.x + x, SALA_B.z + z, r, { cinza: true, ...o });
    salaB.pecas.push({ obj: t.g, mundo: true, base: [x, z] });
  });
  itens.forEach((o, i) => { G.add(o); salaB.pecas.push({ obj: o, mundo: false }); });
  salaB.pecas.forEach(p => sortearLugar(p, G));
  const lamp = new THREE.PointLight(lin(0xffd9a0), 7, 11, 1.5); lamp.position.set(.5, 1.6, 0); G.add(lamp);
  const ab = new THREE.Mesh(new THREE.ConeGeometry(.3, .35, 12, 1, true), new THREE.MeshBasicMaterial({ color: lin(0xffe2b0), side: THREE.DoubleSide })); ab.position.set(.5, 1.75, 0); G.add(ab);
  const haste = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, 1.6), mov); haste.position.set(.5, .8, 0); G.add(haste);
  salaB.G = G;
}
function sortearLugar(p, G) {
  const a = rnd() * 6.28, r = 1.2 + rnd() * 5.8, x = Math.cos(a) * r, z = Math.sin(a) * r;
  if (p.mundo) { p.obj.position.x = SALA_B.x + x; p.obj.position.z = SALA_B.z + z; p.obj.rotation.y = rnd() * 6.28; }
  else { p.obj.position.set(x, rnd() < .15 ? .3 : 0, z); p.obj.rotation.set(rnd() < .2 ? 1.4 : 0, rnd() * 6.28, rnd() < .15 ? .6 : 0); }
}

// ---------- discos quebrados: ganham cor quando você passa ----------
const discos = [];
const vitrola = new THREE.Group(); vitrola.position.set(SALA_D.x, 0, SALA_D.z); cena.add(vitrola);
{
  const CORES = [0xb38cff, 0x3dff7e, 0xff5fa2, 0x4fd8ff, 0xffd34f, 0xff7a3d];
  for (let i = 0; i < 46; i++) {
    const a = rnd() * 6.28, rr = .9 + rnd() * 5, quebrado = rnd() < .6;
    const m = new THREE.MeshStandardMaterial({ color: lin(0x08080a), roughness: .25, metalness: .4, emissive: lin(CORES[i % CORES.length]), emissiveIntensity: 0 });
    const d = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .012, 28, 1, false, 0, quebrado ? 2 + rnd() * 3 : 6.283), m);
    d.position.set(SALA_D.x + Math.cos(a) * rr, .02 + rnd() * .03, SALA_D.z + Math.sin(a) * rr); d.rotation.set((rnd() - .5) * .4, rnd() * 6, (rnd() - .5) * .4);
    cena.add(d); discos.push({ m, d, cor: 0 });
  }
  const caixa = new THREE.Mesh(new THREE.BoxGeometry(.9, .5, .7), new THREE.MeshStandardMaterial({ color: lin(0x4a2e1c), roughness: .6 })); caixa.position.y = .25; vitrola.add(caixa);
  const prato = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .02, 24), new THREE.MeshStandardMaterial({ color: lin(0x0a0a0c), roughness: .2 })); prato.position.y = .51; vitrola.add(prato); vitrola.prato = prato;
  const l = new THREE.PointLight(lin(0xb38cff), 12, 12, 1.4); l.position.set(0, 1.6, 1.2); vitrola.add(l);
}

// ---------- medos (marcadores) ----------
const preto = new THREE.MeshBasicMaterial({ color: lin(0x020404), transparent: true, opacity: 1 });
// rosto do palhaço (marcador até o desenho do Cadu): olhos fundos e um sorriso fino. Frente da esfera = u 0,25
const rostoTex = texCanvas(512, 256, (g) => {
  g.fillStyle = '#c9d1cf'; g.fillRect(0, 0, 512, 256);
  for (let k = 0; k < 260; k++) { g.fillStyle = `rgba(40,50,48,${Math.random() * .08})`; g.fillRect(Math.random() * 512, Math.random() * 256, 3 + Math.random() * 14, 2 + Math.random() * 10); }   // pele suja
  g.fillStyle = '#040606';
  for (const [x, r] of [[109, 1], [147, 1.15]]) {                 // olhos fundos, um maior que o outro, com a tinta escorrendo
    g.beginPath(); g.ellipse(x, 104, 10 * r, 18 * r, 0, 0, 7); g.fill();
    g.fillStyle = 'rgba(4,6,6,.75)'; for (const dx of [-4, 1, 5]) g.fillRect(x + dx, 118, 2.2, 18 + Math.abs(dx) * 4 + r * 10); g.fillStyle = '#040606';
  }
  g.strokeStyle = '#050707'; g.lineWidth = 3; g.lineCap = 'round';  // sorriso fino, largo demais
  g.beginPath(); g.moveTo(64, 140); g.quadraticCurveTo(128, 182, 194, 136); g.stroke();
  g.lineWidth = 1.5; for (let x = 80; x < 182; x += 9) { const y = 140 + 26 * (1 - ((x - 128) / 66) ** 2) * .62; g.beginPath(); g.moveTo(x, y - 4); g.lineTo(x, y + 4); g.stroke(); }
});
function palhaco() {
  const g = new THREE.Group();
  const corpo = new THREE.Mesh(new THREE.CylinderGeometry(.22, .34, 1.25, 8), preto); corpo.position.y = .62; g.add(corpo);
  const cab = new THREE.Mesh(new THREE.SphereGeometry(.2, 24, 16), new THREE.MeshLambertMaterial({ color: lin(0xb9c4c2), emissive: lin(0x1d2625), map: rostoTex, transparent: true })); cab.position.y = 1.47; g.add(cab);
  for (const s of [-1, 1]) { const t = new THREE.Mesh(new THREE.SphereGeometry(.1, 8, 6), preto); t.scale.set(.8, .75, 1.1); t.position.set(s * .2, 1.43, -.04); g.add(t); }
  const nariz = new THREE.Mesh(new THREE.SphereGeometry(.032, 8, 6), new THREE.MeshBasicMaterial({ color: lin(0x5a1010), transparent: true })); nariz.position.set(0, 1.465, .195); g.add(nariz);
  g.visible = false; cena.add(g); return g;
}
function terno(alt = 2.35) {
  const g = new THREE.Group();
  const add = (geo, x, y) => { const m = new THREE.Mesh(geo, preto); m.position.set(x, y, 0); g.add(m); };
  add(new THREE.BoxGeometry(.32, alt * .45, .18), 0, alt * .225); add(new THREE.BoxGeometry(.62, alt * .36, .24), 0, alt * .63);
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(.1, alt * .4, .12), s * .36, alt * .56);
  const cab = new THREE.Mesh(new THREE.SphereGeometry(.15, 12, 10), preto); cab.scale.y = 1.3; cab.position.y = alt * .87; g.add(cab);
  const reflexo = brilho(lin(0xeaf6f7), .8, 0); reflexo.position.set(0, alt * .87, .18); g.add(reflexo); g.userData.reflexo = reflexo;   // vaidade: o rosto é um espelho
  g.visible = false; cena.add(g); return g;
}
const medo = { palhaco: { g: palhaco() }, terno: { g: terno() } };
// encontro com um medo (um por sinal): fase 1 = aparece perto do sinal aceso (você vê e ele some), 2 = sumiu e vai voltar,
// 3 = voltou e vem vindo: acerte a lanterna antes que ele chegue. Depois disso o medo daquele sinal não se repete.
const enc = { quem: null, fase: 0, t: 0, espera: 0, visto: 0, mira: 0, cooldown: 0, feito: -1, d0: 10 };
let puxoes = 0;
// lanterna (L): ilumina e é a única coisa que elimina o medo na 2ª vez. Bateria acaba em ~10 s e recarrega desligada.
const lanterna = { on: false, bat: 1 };
const luzLanterna = new THREE.SpotLight(lin(0xfff1d6), 0, 45, .32, .5, 1.1);
cena.add(luzLanterna, luzLanterna.target);

// partículas
const NP = 2500, pp = new Float32Array(NP * 3);
for (let i = 0; i < NP; i++) { pp[i * 3] = (rnd() - .5) * 40; pp[i * 3 + 1] = rnd() * 8; pp[i * 3 + 2] = (rnd() - .5) * 40; }
const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
const poeira = new THREE.Points(pg, new THREE.PointsMaterial({ color: lin(0xa9d8dc), size: .05, map: brilhoTex, transparent: true, opacity: .6, depthWrite: false, blending: THREE.AdditiveBlending }));
cena.add(poeira);

plantar();

// ---------- filtro de tubo ----------
let rt;
const crt = new THREE.ShaderMaterial({
  uniforms: { tCena: { value: null }, t: { value: 0 }, flash: { value: 0 }, escuro: { value: 0 }, glitch: { value: 0 }, linhas: { value: 270 }, ui: { value: null }, uiOn: { value: 0 }, pausa: { value: 0 }, rebob: { value: 0 }, azul: { value: 0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy,0.,1.); }`,
  fragmentShader: `uniform sampler2D tCena, ui; uniform float t,flash,escuro,glitch,linhas,uiOn,pausa,rebob,azul; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    void main(){
      vec2 uv = vUv*2.-1.; uv *= 1.+.045*dot(uv,uv); vec2 u = uv*.5+.5;
      if(u.x<0.||u.x>1.||u.y<0.||u.y>1.){ gl_FragColor = vec4(0.,0.,0.,1.); return; }
      float row = floor(u.y*linhas);
      vec2 uq = u;                                                     // a interface da câmera não rasga junto
      u.x += glitch*(h(vec2(row, floor(t*24.)))-.5)*.04 + glitch*.012*sin(u.y*40.+t*30.);
      u.y += pausa*.003*sign(sin(t*41.));                              // pausa: o quadro treme
      float faixa = step(.9, h(vec2(floor(u.y*48.), floor(t*30.))));   // rebobinar: faixas rasgando
      u.x += rebob*(faixa*.09*(h(vec2(row, floor(t*60.)))-.5) + .018*sin(u.y*7.+t*55.));
      u.y += rebob*.006*sin(t*90.);
      float ca = .0013 + glitch*.007;
      vec3 c = vec3(texture2D(tCena,u+vec2(ca,0.)).r, texture2D(tCena,u).g, texture2D(tCena,u-vec2(ca,0.)).b);
      c = mix(c, vec3(dot(c,vec3(.3,.59,.11))), glitch*.7);
      float banda = 1. - smoothstep(.0, .025, abs(u.y - (.78 + .03*sin(t*2.7))));
      c = mix(c, vec3(h(gl_FragCoord.xy*.37 + floor(t*40.))), banda*pausa*.85);
      c = mix(c, vec3(dot(c,vec3(.3,.59,.11)))*vec3(.8,1.,.92), pausa*.55);
      c += rebob*(faixa*.28*h(vec2(floor(gl_FragCoord.x*.02), row)) + .04);
      c = mix(c, vec3(.92,.97,1.), flash);
      c = mix(c, vec3(.05,.12,.72), azul);
      vec4 U = texture2D(ui, uq); c = mix(c, U.rgb, U.a*uiOn);
      c *= 1.-escuro;
      c *= .88 + .12*sin(u.y*linhas*6.28318);
      c += (h(gl_FragCoord.xy + floor(t*30.)) - .5)*(.03 + glitch*.12);
      vec2 vg = vUv-.5; c *= 1. - dot(vg,vg)*1.1;
      vec2 e = abs(uv); c *= smoothstep(1., .965, max(e.x,e.y));
      gl_FragColor = vec4(c,1.);
      #include <colorspace_fragment>
    }`, depthTest: false, depthWrite: false
});
const crtCena = new THREE.Scene(); crtCena.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), crt));
const crtCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
function tamanho() {
  const w = GRAVAR ? parseInt(P.get('w') || 1280) : innerWidth, h = GRAVAR ? parseInt(P.get('h') || 720) : innerHeight;
  R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  const lh = 540, lw = Math.round(lh * w / h);
  if (rt) rt.dispose();
  rt = new THREE.WebGLRenderTarget(lw, lh, { samples: 4, type: THREE.HalfFloatType });
  crt.uniforms.tCena.value = rt.texture;
}
tamanho();

// ---------- som ----------
const som = (() => {
  let ctx = null, mestre, filtro, ligado = true, ultimoPasso = 0, vento, motorG, chiadoG, respG, puxaoEl, puxaoG, apitoG, tocaDisco = null;
  const lista = ['som/playlist-1.mp3', 'som/playlist-2.mp3', 'som/playlist-3.mp3'];
  function ruido(s) { const b = ctx.createBuffer(1, ctx.sampleRate * s, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
  function liga() {
    if (ctx || GRAVAR) return;
    ctx = new AudioContext();
    filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 18000;
    mestre = ctx.createGain(); mestre.gain.value = .9; mestre.connect(filtro); filtro.connect(ctx.destination);
    // vento
    const n = ctx.createBufferSource(); n.buffer = ruido(4); n.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500;
    vento = ctx.createGain(); vento.gain.value = .06; n.connect(lp); lp.connect(vento); vento.connect(mestre); n.start();
    const lfo = ctx.createOscillator(); lfo.frequency.value = .07; const lg = ctx.createGain(); lg.gain.value = 260; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
    // motor parado ao longe
    motorG = ctx.createGain(); motorG.gain.value = 0;
    const ml = ctx.createBiquadFilter(); ml.type = 'lowpass'; ml.frequency.value = 160;
    [31, 62, 93].forEach((f, k) => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const g = ctx.createGain(); g.gain.value = [.5, .25, .1][k]; o.connect(g); g.connect(ml); o.start(); });
    ml.connect(motorG); motorG.connect(mestre);
    // chiado da TV mais perto
    const cn = ctx.createBufferSource(); cn.buffer = ruido(2); cn.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = .7;
    chiadoG = ctx.createGain(); chiadoG.gain.value = 0; cn.connect(bp); bp.connect(chiadoG); chiadoG.connect(mestre); cn.start();
    // respiração (sobe com o "perdido")
    const re = new Audio('som/respiracao.mp3'); re.loop = true; const rs = ctx.createMediaElementSource(re);
    respG = ctx.createGain(); respG.gain.value = 0; rs.connect(respG); respG.connect(mestre); re.play().catch(() => {});
    // puxão
    puxaoEl = new Audio('som/puxao.mp3'); const ps = ctx.createMediaElementSource(puxaoEl);
    puxaoG = ctx.createGain(); puxaoG.gain.value = 0; ps.connect(puxaoG); puxaoG.connect(mestre);
    // apito da surdez (fora do filtro)
    const ap = ctx.createOscillator(); ap.frequency.value = 5600; apitoG = ctx.createGain(); apitoG.gain.value = 0; ap.connect(apitoG); apitoG.connect(ctx.destination); ap.start();
    agendaGalho();
  }
  function agendaGalho() {
    if (!ctx) return;
    setTimeout(() => { galho(); agendaGalho(); }, 5000 + Math.random() * 9000);
  }
  function galho() {
    const t = ctx.currentTime, pan = ctx.createStereoPanner(); pan.pan.value = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(); s.buffer = ruido(.25);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900 + Math.random() * 1400; bp.Q.value = 6;
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.25, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + .22);
    s.connect(bp); bp.connect(g); g.connect(pan); pan.connect(mestre); s.start(t);
  }
  function passo(naEstrada) {
    if (!ctx) return; const t = ctx.currentTime; if (t - ultimoPasso < .2) return; ultimoPasso = t;
    const s = ctx.createBufferSource(); s.buffer = ruido(.14);
    const lp = ctx.createBiquadFilter(); lp.type = naEstrada ? 'lowpass' : 'bandpass'; lp.frequency.value = naEstrada ? 650 + Math.random() * 200 : 1800 + Math.random() * 1500; lp.Q.value = 1;
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(naEstrada ? .3 : .18, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + (naEstrada ? .1 : .13));
    s.connect(lp); lp.connect(g); g.connect(mestre); s.start(t);
  }
  function pega() {      // desligou uma TV: estalo de tubo + zumbido descendo
    if (!ctx) return; const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.frequency.setValueAtTime(15734 / 4, t); o.frequency.exponentialRampToValueAtTime(60, t + .5);
    const g = ctx.createGain(); g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.0001, t + .55); o.connect(g); g.connect(mestre); o.start(t); o.stop(t + .6);
    const c = ctx.createBufferSource(); c.buffer = ruido(.05); const gc = ctx.createGain(); gc.gain.setValueAtTime(.5, t); gc.gain.exponentialRampToValueAtTime(.0001, t + .05); c.connect(gc); gc.connect(mestre); c.start(t);
  }
  function puxao() { if (!ctx) return; const t = ctx.currentTime; puxaoEl.currentTime = 12; puxaoEl.play().catch(() => {}); puxaoG.gain.cancelScheduledValues(t); puxaoG.gain.setValueAtTime(.9, t); puxaoG.gain.linearRampToValueAtTime(0, t + 3.5); setTimeout(() => puxaoEl.pause(), 3600); }
  function nivel(m, c, r) { if (!ctx) return; motorG.gain.value = m; chiadoG.gain.value = c; respG.gain.value = r; }
  // playlist da vitrola: 3 faixas de ~18 s; na 3ª você fica surdo
  function vitrola(perto) {
    if (!ctx) return;
    if (perto && !tocaDisco) {
      tocaDisco = { i: 0, el: null, g: ctx.createGain(), surdo: false };
      tocaDisco.g.connect(mestre); proxima();
    } else if (!perto && tocaDisco) { tocaDisco.el?.pause(); tocaDisco.g.disconnect(); clearTimeout(tocaDisco.timer); tocaDisco = null; }
  }
  function proxima() {
    const T = tocaDisco; if (!T) return;
    T.el?.pause();
    if (T.i >= lista.length) { T.i = 0; }
    const el = new Audio(lista[T.i]); const s = ctx.createMediaElementSource(el); s.connect(T.g); el.play().catch(() => {}); T.el = el;
    if (T.i === 2) T.timer = setTimeout(surdez, 2500);
    else T.timer = setTimeout(() => { if (tocaDisco === T) { T.i++; proxima(); } }, 18000);
  }
  function surdez() {
    const t = ctx.currentTime;
    filtro.frequency.cancelScheduledValues(t); filtro.frequency.setValueAtTime(18000, t); filtro.frequency.exponentialRampToValueAtTime(180, t + .6);
    mestre.gain.setValueAtTime(.9, t); mestre.gain.linearRampToValueAtTime(.25, t + .6);
    apitoG.gain.setValueAtTime(0, t); apitoG.gain.linearRampToValueAtTime(.05, t + .5); apitoG.gain.setValueAtTime(.05, t + 8); apitoG.gain.linearRampToValueAtTime(0, t + 11);
    filtro.frequency.setValueAtTime(180, t + 9); filtro.frequency.exponentialRampToValueAtTime(18000, t + 12);
    mestre.gain.setValueAtTime(.25, t + 9); mestre.gain.linearRampToValueAtTime(ligado ? .9 : 0, t + 12);
    fx.surdo = 12;
  }
  function bip(f0, f1, dur, vol, tipo = 'sine') {
    if (!ctx) return; const t = ctx.currentTime, o = ctx.createOscillator(); o.type = tipo;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(mestre); o.start(t); o.stop(t + dur + .05);
  }
  function chiadoCurto(dur, vol, freq) {
    if (!ctx) return; const t = ctx.currentTime, s = ctx.createBufferSource(); s.buffer = ruido(dur);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = .8;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(mestre); s.start(t);
  }
  const clique = () => { chiadoCurto(.03, .4, 2500); bip(1800, 1700, .03, .05); };
  const some = () => { chiadoCurto(.5, .25, 1200); bip(400, 90, .5, .08, 'triangle'); };
  const volta = () => { bip(55, 50, 1.2, .5); bip(233, 230, 1.1, .06, 'sawtooth'); bip(330, 326, 1.1, .05, 'sawtooth'); chiadoCurto(.25, .35, 3000); };
  const queima = () => { chiadoCurto(.7, .5, 5000); bip(900, 3000, .35, .07); };
  function tom(f0, f1, dur, vol, tipo, em, out) {
    const t = ctx.currentTime + em, o = ctx.createOscillator(); o.type = tipo;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + .05);
  }
  function estalo(dur, vol, freq, em, out, q = .8) {
    const t = ctx.currentTime + em, s = ctx.createBufferSource(); s.buffer = ruido(dur);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(out); s.start(t);
  }
  // captura: silêncio, o golpe, a fita parando, rebobinando e o PLAY (o resto do som volta no PLAY)
  function captura(pal) {
    if (!ctx) return; const t = ctx.currentTime, out = ctx.createGain(); out.gain.value = ligado ? 1 : 0; out.connect(filtro);
    mestre.gain.cancelScheduledValues(t); mestre.gain.setValueAtTime(mestre.gain.value, t); mestre.gain.linearRampToValueAtTime(0, t + .08);
    estalo(.9, .9, 2600, .45, out, .4); tom(72, 26, 1.1, .9, 'sine', .45, out); tom(1300, 1950, .7, .1, 'square', .45, out);
    if (pal) for (let k = 0; k < 7; k++) { estalo(.08, .55, 1050 - k * 55, .52 + k * .12, out, 5); tom(310 - k * 16, 250 - k * 16, .09, .14, 'sawtooth', .52 + k * .12, out); }   // risada quebrada
    else { tom(41, 37, 1.3, .6, 'sawtooth', .45, out); tom(1567, 1561, 1.2, .08, 'sine', .45, out); tom(2093, 2089, 1, .05, 'sine', .45, out); }   // o espelho tine
    tom(420, 24, .55, .22, 'sawtooth', 1.3, out); tom(60, 60, .65, .07, 'sine', 1.85, out);                       // a fita para
    for (let k = 0; k < 7; k++) tom(900 + k * 260, 1400 + k * 320, .19, .05, 'sawtooth', 2 + k * .2, out);       // rebobina
    estalo(1.4, .1, 6000, 2, out, .5);
    mestre.gain.setValueAtTime(0, t + 3.4); mestre.gain.linearRampToValueAtTime(ligado ? .9 : 0, t + 4.4);
    setTimeout(() => puxao(), 3400);
  }
  function alterna() { if (!ctx) return; ligado = !ligado; mestre.gain.value = ligado ? .9 : 0; }
  return { liga, passo, pega, puxao, nivel, vitrola, alterna, clique, some, volta, queima, captura };
})();

// ---------- estado ----------
const jog = { x: INICIO.x, z: INICIO.z, yaw: 0, pitch: -.02, passo: 0, olho: 1.62, correndo: 0, parado: 0 };
const fx = { glitch: 0, flash: 0, escuro: 0, puxao: 0, surdo: 0, fim: 0, pausa: 0, rebob: 0, azul: 0, ui: 0 };
let perdido = .05, semAchar = 0, tempo = 0, hudAte = 0, hudTexto = '', mostrarHud = !P.has('limpo');
const teclas = {};
const fim = { estado: 0, t: 0 };   // 0 jogando, 1 carro vindo, 2 deitado, 3 tela final
const v3 = new THREE.Vector3(), frente = new THREE.Vector3();

function emVista(x, y, z, ang = .72) {
  v3.set(x - cam.position.x, y - cam.position.y, z - cam.position.z); const d = v3.length(); v3.divideScalar(d || 1);
  cam.getWorldDirection(frente); return frente.dot(v3) > Math.cos(ang) ? d : -1;
}
function bateTronco(x, z) {
  const cx = Math.floor(x / 4), cz = Math.floor(z / 4);
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const L = troncos.get((cx + i) + ',' + (cz + j)); if (!L) continue; for (const t of L) { const d = Math.hypot(x - t.x, z - t.z); if (d < t.r + .3) return t; } }
  return null;
}
function cullBlocos() { for (const b of blocos) { const v = Math.hypot(jog.x - b.cx, jog.z - b.cz) < 84; for (const mm of b.ms) mm.visible = v; } }
function puxao() {
  if (fx.puxao > 0 || fim.estado) return;
  fx.puxao = 1.6; som.puxao(); hud('o sinal caiu.'); puxoes++;
}
function hud(txt, s = 4) { hudTexto = txt; hudAte = tempo + s; }

// ---------- controles ----------
const inicio = document.getElementById('inicio'), hudEl = document.getElementById('hud'), fimEl = document.getElementById('fim');
if (GRAVAR) { inicio.classList.add('esc'); hudEl.classList.add('esc'); }
const modosEl = document.getElementById('modos'), voltarEl = document.getElementById('voltar');
const entra = () => { som.liga(); try { tela.focus({ preventScroll: true }); } catch (e) {} try { tela.requestPointerLock?.()?.catch?.(() => {}); } catch (e) {} inicio.classList.add('esc'); };
function comeca(id) {
  aplicaModo(MODOS[id] || MODOS.medio); escolheu = true;
  modosEl.classList.add('esc'); voltarEl.classList.remove('esc'); voltarEl.textContent = `voltar · modo ${modo.nome}`;
  entra(); hud(`modo ${modo.nome}. ache os 7 sinais.`, 5);
}
modosEl.addEventListener('click', e => { const b = e.target.closest('button[data-modo]'); if (b) { e.stopPropagation(); comeca(b.dataset.modo); } });
voltarEl.addEventListener('click', e => { e.stopPropagation(); entra(); });
inicio.addEventListener('click', () => { if (escolheu) entra(); });
if (escolheu) aplicaModo(modo);
if (escolheu && !GRAVAR) { modosEl.classList.add('esc'); voltarEl.classList.remove('esc'); voltarEl.textContent = `entrar · modo ${modo.nome}`; }
document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement && fim.estado < 3) inicio.classList.remove('esc'); });
tela.addEventListener('click', () => { tela.focus({ preventScroll: true }); if (!document.pointerLockElement) { try { tela.requestPointerLock?.()?.catch?.(() => {}); } catch (e) {} } });
let arrasta = false;
tela.addEventListener('pointerdown', () => { arrasta = true; });
window.addEventListener('pointerup', () => { arrasta = false; });
window.addEventListener('pointermove', e => {
  if (fim.estado >= 2 || (cap.on && cap.t < 3.7)) return;   // na captura a câmera não é sua
  const travado = document.pointerLockElement === tela; if (!travado && !arrasta) return;
  if (Math.abs(e.movementX) > 200 || Math.abs(e.movementY) > 200) return;
  const k = travado ? .0022 : .005;
  jog.yaw -= e.movementX * k; jog.pitch = clamp(jog.pitch - e.movementY * k, -1.3, 1.3);
});
tela.addEventListener('keydown', e => {
  teclas[e.code] = true;
  if (e.code === 'KeyH') mostrarHud = !mostrarHud;
  if (e.code === 'KeyL' && !e.repeat) { if (lanterna.on || lanterna.bat > .1) { lanterna.on = !lanterna.on; som.clique(); } else hud('sem bateria.', 1.5); }
  if (e.code === 'KeyN') som.alterna();
});
tela.addEventListener('keyup', e => { teclas[e.code] = false; });
tela.addEventListener('blur', () => { for (const k in teclas) teclas[k] = false; });
window.addEventListener('resize', () => { if (!GRAVAR) tamanho(); });
document.getElementById('denovo').addEventListener('click', () => location.reload());
const resumoEl = document.getElementById('resumo');

// ---------- mundo a cada quadro ----------
function anda(dt) {
  if (fx.puxao > 0 || fim.estado >= 2) return;
  let f = (teclas.KeyW || teclas.ArrowUp ? 1 : 0) - (teclas.KeyS || teclas.ArrowDown ? 1 : 0);
  let s = (teclas.KeyD || teclas.ArrowRight ? 1 : 0) - (teclas.KeyA || teclas.ArrowLeft ? 1 : 0);
  const corre = teclas.ShiftLeft || teclas.ShiftRight, m = Math.hypot(f, s);
  const v = (corre ? 4.0 : 1.9) * (fx.surdo > 0 ? .8 : 1) * dt;
  if (m > 0) {
    f /= m; s /= m; const sy = Math.sin(jog.yaw), cy = Math.cos(jog.yaw);
    let nx = jog.x + (-sy * f + cy * s) * v, nz = jog.z + (-cy * f - sy * s) * v;
    const t = bateTronco(nx, nz);
    if (t) { const a = Math.atan2(nz - t.z, nx - t.x); nx = t.x + Math.cos(a) * (t.r + .3); nz = t.z + Math.sin(a) * (t.r + .3); }
    jog.x = clamp(nx, -LIM.x, LIM.x); jog.z = clamp(nz, LIM.z1, LIM.z0);
    if (fim.estado === 0 && Math.hypot(jog.x - carro.position.x, jog.z - (carro.position.z - 2)) < 2.6) { jog.z = carro.position.z + .6; }
    const antes = Math.floor(jog.passo / Math.PI); jog.passo += v * 4.4; if (Math.floor(jog.passo / Math.PI) !== antes) som.passo(Math.abs(jog.x) < 2.2);
    jog.correndo = corre ? jog.correndo + dt : Math.max(0, jog.correndo - dt * 2); jog.parado = 0;
  } else { jog.parado += dt; jog.correndo = Math.max(0, jog.correndo - dt * 2); }
}

function atualizaPerdido(dt) {
  semAchar += dt;
  const olhaFarol = emVista(carro.position.x, 1, carro.position.z, .22) > 0;
  let d = .003 + (semAchar > 90 ? .006 : 0) + (jog.correndo > .5 ? .012 : 0);
  if (jog.parado > 1 && olhaFarol) d = -.09;
  else if (jog.parado > 2) d = -.015;
  perdido = clamp(perdido + d * (d > 0 ? modo.perdido : 1) * dt, 0, 1);
}

const olhandoBaixo = () => jog.pitch < -.45;    // câmera para baixo: o efeito não pega no medo
function mirando(g, alt) {
  if (!lanterna.on || olhandoBaixo()) return false;
  v3.set(g.position.x - cam.position.x, alt - cam.position.y, g.position.z - cam.position.z); const d = v3.length(); v3.divideScalar(d || 1);
  cam.getWorldDirection(frente); return frente.dot(v3) > Math.cos(modo.cone) && d < 30;
}
function poeMedo(M, ang, r) {     // ang 0 = à sua frente, PI = atrás
  const a = jog.yaw + ang;
  for (let k = 0; k < 10; k++) {
    const rr = r + k * .7, x = jog.x - Math.sin(a) * rr, z = jog.z - Math.cos(a) * rr;
    if (!bateTronco(x, z) && Math.abs(x) < LIM.x && z > LIM.z1 && z < LIM.z0) { M.g.position.set(x, 0, z); M.g.visible = true; return true; }
  }
  return false;
}
function queima(M) {             // lanterna acertou: some de vez por um tempo
  M.g.visible = false; enc.quem = null; enc.cooldown = 8; perdido = Math.max(0, perdido - .3);
  fx.flash = .45; som.queima(); hud('sumiu.', 2);
}
function atualizaLanterna(dt) {
  if (lanterna.on) { lanterna.bat -= dt * modo.gasto; if (lanterna.bat <= 0) { lanterna.bat = 0; lanterna.on = false; hud('a bateria acabou.', 2); } }
  else lanterna.bat = Math.min(1, lanterna.bat + dt * .07);
  const fraca = lanterna.bat < .2 ? (Math.sin(tempo * 40) > .3 ? 1 : .3) : 1;
  luzLanterna.intensity = lanterna.on ? 260 * (.6 + .4 * lanterna.bat) * fraca : 0;
  cam.getWorldDirection(frente);
  luzLanterna.position.set(cam.position.x + frente.z * .25, cam.position.y - .25, cam.position.z - frente.x * .25);
  luzLanterna.target.position.copy(cam.position).addScaledVector(frente, 12);
}
function poeNaArea(M, s) {       // o medo vigia o sinal aceso: fica atrás da TV, de lado, olhando você chegar
  const ax = s.x - jog.x, az = s.z - jog.z, L = Math.hypot(ax, az) || 1, ux = ax / L, uz = az / L;
  for (let k = 0; k < 14; k++) {
    const lado = (k % 2 ? 1 : -1) * (2.5 + k * .45), atras = 1.5 + (k % 3);
    const x = s.x + ux * atras - uz * lado, z = s.z + uz * atras + ux * lado;
    if (Math.hypot(x - jog.x, z - jog.z) > 7 && !bateTronco(x, z) && Math.abs(x) < LIM.x && z > LIM.z1 && z < LIM.z0) { M.g.position.set(x, 0, z); M.g.visible = true; return true; }
  }
  return false;
}
const faixa = ([a, b]) => a + rnd() * (b - a);
function encerra(M, cd = 8) { M.g.visible = false; enc.quem = null; enc.cooldown = cd; }
function atualizaMedos(dt) {
  if (fim.estado) { medo.palhaco.g.visible = medo.terno.g.visible = false; enc.quem = null; return; }
  enc.cooldown -= dt;
  const caca = achados >= modo.caca;      // dos últimos sinais em diante ele te enxerga: pela distância e pela sua câmera
  if (!enc.quem) {
    // um medo por sinal: nasce quando você chega perto do sinal aceso (ele está na área), ou se você se perde muito
    if (achados < modo.medoDesde || enc.feito === achados || enc.cooldown > 0 || fx.puxao > 0) return;
    const s = sinais[achados]; if (!s) return;
    const dS = Math.hypot(jog.x - s.x, jog.z - s.z), raio = modo.area + (caca ? 8 : 0);
    if (dS < raio || perdido > .7) {
      const M = jog.correndo > 1 ? medo.palhaco : ((achados + (seed & 1)) % 2 ? medo.terno : medo.palhaco);
      const ok = dS < raio ? poeNaArea(M, s) : poeMedo(M, (rnd() - .5) * .8, 15 + rnd() * 5);
      if (ok) { enc.quem = M; enc.fase = 1; enc.t = 0; enc.visto = 0; enc.feito = achados; }
    }
    return;
  }
  const M = enc.quem, dx = jog.x - M.g.position.x, dz = jog.z - M.g.position.z, d = Math.hypot(dx, dz) || 1;
  const alt = M === medo.terno ? 1.7 : 1.3, pal = M === medo.palhaco;
  M.g.rotation.y = Math.atan2(dx, dz); enc.t += dt;
  const visto = M.g.visible && !olhandoBaixo() && emVista(M.g.position.x, alt, M.g.position.z, .5) > 0;
  if (enc.fase === 1) {            // 1ª vez: você vê, ele some
    if (visto) enc.visto += dt;
    else if (pal && d > 6) { const v = modo.vPal * .45 * dt; M.g.position.x += dx / d * v; M.g.position.z += dz / d * v; }
    fx.glitch = Math.max(fx.glitch, clamp(enc.visto / modo.somePrimeira, 0, 1) * .5);
    if (enc.visto > modo.somePrimeira) {
      M.g.visible = false; enc.fase = 2; enc.t = 0; enc.espera = faixa(modo.espera); som.some(); hud('ele vai voltar.\nL = lanterna', 3);
    } else if (enc.t > 15) {      // você nem viu: no fácil ele desiste; no médio e no difícil ele te viu primeiro
      if (modo.desiste) { som.some(); encerra(M); }
      else { M.g.visible = false; enc.fase = 2; enc.t = 0; enc.espera = 1.5; som.some(); }
    }
  } else if (enc.fase === 2) {     // vai voltar: o palhaço por trás, o terno pela frente
    if (enc.t > enc.espera) {
      const ang = pal ? Math.PI + (rnd() - .5) * 1.4 : (rnd() - .5) * 1.6;
      if (poeMedo(M, ang, faixa(modo.d2))) {
        enc.fase = 3; enc.t = 0; enc.mira = 0; enc.d0 = Math.hypot(jog.x - M.g.position.x, jog.z - M.g.position.z); som.volta();
        if (modo.dica) hud(pal ? 'ele voltou. atrás de você.' : 'ele voltou. na sua frente.', 2.5);
      } else enc.espera += .5;
    }
  } else if (enc.fase === 3) {     // 2ª vez: ele vem vindo. Acerte a lanterna antes que ele chegue
    let v = pal ? modo.vPal : modo.vTer;
    if (!pal && jog.parado > .15) v *= .3;          // o terno imita o seu passo: você para, ele quase para
    if (caca) v *= visto ? .35 : 1.5;               // ele te enxerga: de costas ele corre, olhando ele trava
    if (d > 1.4) { M.g.position.x += dx / d * v * dt; M.g.position.z += dz / d * v * dt; }
    if (mirando(M.g, alt)) enc.mira += dt;
    fx.glitch = Math.max(fx.glitch, clamp(1 - (d - 1.5) / Math.max(2, enc.d0 - 1.5), 0, 1) * .8);
    if (enc.mira > modo.mira) queima(M);
    else if (d < 1.6 || enc.t > 30) capturaInicia(M);
  }
}

// ---------- captura ----------
// 0,00–0,45 silêncio: a câmera é puxada para ele · 0,45–1,30 pegou: ele cola na lente · 1,30–2,00 congela (PAUSE)
// 2,00–3,40 rebobina pela sua trilha até o começo da estrada · 3,40–4,60 tela azul e PLAY (você anda de novo aos 3,7 s)
const uiCv = document.createElement('canvas'); uiCv.width = 960; uiCv.height = 540;
const uiG = uiCv.getContext('2d'), uiTex = new THREE.CanvasTexture(uiCv); crt.uniforms.ui.value = uiTex;
const luzCam = new THREE.PointLight(lin(0xf2fbff), 0, 4, 2); cena.add(luzCam);
const cap = { on: false, t: 0, M: null, pal: false, rota: [], y0: 0, p0: 0, tc: 0, base: 0 };
const trilha = []; let trilhaT = 0;
function gravaTrilha(dt) { trilhaT += dt; if (trilhaT > .25) { trilhaT = 0; trilha.push({ x: jog.x, z: jog.z, yaw: jog.yaw }); if (trilha.length > 1200) trilha.splice(0, 200); } }
const tcTexto = (s) => { s = Math.max(0, s); return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(Math.floor(s) % 60).padStart(2, '0')}`; };
function desenhaUI(estado, tc) {
  const g = uiG, W = 960, H = 540, pisca = Math.floor(cap.t * 2.5) % 2 === 0;
  g.clearRect(0, 0, W, H); g.strokeStyle = g.fillStyle = 'rgba(236,246,246,.92)'; g.lineWidth = 3;
  for (const [x, y, sx, sy] of [[46, 40, 1, 1], [W - 46, 40, -1, 1], [46, H - 40, 1, -1], [W - 46, H - 40, -1, -1]]) { g.beginPath(); g.moveTo(x, y + sy * 34); g.lineTo(x, y); g.lineTo(x + sx * 34, y); g.stroke(); }
  g.font = '34px VT323, monospace'; g.textBaseline = 'middle';
  const X = 78, Y = 78;
  if (estado === 'rec') { if (pisca) { g.fillStyle = '#ff2a2a'; g.beginPath(); g.arc(X + 10, Y, 10, 0, 7); g.fill(); } g.fillStyle = 'rgba(236,246,246,.92)'; g.fillText('REC', X + 30, Y); }
  if (estado === 'pausa') { g.fillRect(X, Y - 11, 7, 22); g.fillRect(X + 13, Y - 11, 7, 22); g.fillText('PAUSE', X + 32, Y); }
  if (estado === 'rew') { if (pisca) for (const o of [0, 16]) { g.beginPath(); g.moveTo(X + o + 16, Y - 11); g.lineTo(X + o, Y); g.lineTo(X + o + 16, Y + 11); g.fill(); } g.fillText('REW', X + 44, Y); }
  if (estado === 'play') { g.beginPath(); g.moveTo(X, Y - 12); g.lineTo(X + 18, Y); g.lineTo(X, Y + 12); g.fill(); g.fillText('PLAY', X + 30, Y); }
  // bateria = a da lanterna
  const bx = W - 128, by = 66; g.strokeRect(bx, by, 46, 22); g.fillRect(bx + 46, by + 7, 5, 8); for (let k = 0; k < Math.ceil(lanterna.bat * 4); k++) g.fillRect(bx + 4 + k * 10.5, by + 4, 8, 14);
  g.fillText(tcTexto(tc), 78, H - 76); g.fillText('SP', W - 116, H - 76);
  uiTex.needsUpdate = true;
}
function capturaInicia(M) {
  if (cap.on || fim.estado) return;
  enc.quem = null; enc.cooldown = 8;
  Object.assign(cap, { on: true, t: 0, M, pal: M === medo.palhaco, y0: jog.yaw, p0: jog.pitch, tc: tempo - cap.base });
  const pts = [{ x: INICIO.x, z: INICIO.z, yaw: 0 }, ...trilha, { x: jog.x, z: jog.z, yaw: jog.yaw }], n = Math.min(28, pts.length);
  cap.rota = Array.from({ length: n }, (_, i) => pts[Math.round(i * (pts.length - 1) / Math.max(1, n - 1))]);
  teclas.KeyW = teclas.KeyA = teclas.KeyS = teclas.KeyD = false;
  som.captura(cap.pal);
}
const angPerto = (a, b) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a));
function atualizaCaptura(dt) {
  cap.t += dt; const t = cap.t, M = cap.M, g = M.g, alt = cap.pal ? 1.62 : 2.05, ref = g.userData.reflexo;
  let estado = 'rec', tc = cap.tc;
  if (t < 1.3) {                                   // puxada e golpe
    const ax = g.position.x - jog.x, az = g.position.z - jog.z, d = Math.hypot(ax, az) || 1;
    const alvoD = t < .45 ? Math.max(1.1, d - 16 * dt) : Math.max(cap.pal ? .62 : .9, d - 6 * dt);
    g.position.set(jog.x + ax / d * alvoD, cap.pal ? clamp(t / .45, 0, 1) * .15 : 0, jog.z + az / d * alvoD); g.visible = true;
    g.rotation.y = Math.atan2(jog.x - g.position.x, jog.z - g.position.z);
    const k = clamp(t / .45, 0, 1), e = 1 - Math.pow(1 - k, 3);
    const yawAlvo = angPerto(cap.y0, Math.atan2(-ax, -az)), pAlvo = Math.atan2(alt - jog.olho, alvoD);
    const treme = t > .45 ? .022 : .006;
    jog.yaw = cap.y0 + (yawAlvo - cap.y0) * e + Math.sin(t * 61) * treme; jog.pitch = cap.p0 + (pAlvo - cap.p0) * e + Math.sin(t * 47 + 1) * treme;
    const zoom = clamp((t - .45) / .35, 0, 1); cam.fov = 66 - zoom * zoom * (3 - 2 * zoom) * (cap.pal ? 24 : 8); cam.updateProjectionMatrix();   // a câmera dá zoom no rosto
    fx.glitch = t < .45 ? .12 : .22 + .3 * Math.abs(Math.sin(t * 19));
    fx.flash = t > .45 ? Math.max(0, .55 - (t - .45) * 4) : 0;
    luzCam.position.set(jog.x, jog.olho + .1, jog.z); luzCam.intensity = t > .45 ? 1.1 : 0;
    if (ref) ref.material.opacity = t > .45 ? .9 + .1 * Math.sin(t * 30) : 0;
    tc = cap.tc + t;
  } else if (t < 2) {                              // congela
    estado = 'pausa'; fx.pausa = 1; fx.glitch = .08; fx.flash = 0; tc = cap.tc + 1.3;
  } else if (t < 3.4) {                            // rebobina pela trilha
    estado = 'rew'; fx.pausa = 0; fx.rebob = 1; fx.glitch = .3; g.visible = false; luzCam.intensity = 0; if (ref) ref.material.opacity = 0;
    const k = (t - 2) / 1.4, e = k * k * (3 - 2 * k), R = cap.rota, n = R.length - 1;
    const sx = (1 - e) * n, i = Math.min(n - 1, Math.floor(sx)), f = sx - i, A = R[Math.max(0, i)], B = R[Math.min(n, i + 1)];
    jog.x = A.x + (B.x - A.x) * f; jog.z = A.z + (B.z - A.z) * f; jog.yaw = A.yaw + (angPerto(A.yaw, B.yaw) - A.yaw) * f; jog.pitch *= .9;
    cam.fov = 66 + Math.sin(e * Math.PI) * 18; cam.updateProjectionMatrix(); tc = (cap.tc + 1.3) * (1 - e);
  } else {                                         // tela azul e PLAY
    if (fx.rebob) {                                // chegou no começo: é aqui que o puxão acontece
      fx.rebob = 0; jog.x = INICIO.x; jog.z = INICIO.z; jog.yaw = 0; jog.pitch = -.02; perdido = .15; semAchar = 0;
      medo.palhaco.g.visible = medo.terno.g.visible = false; medo.palhaco.g.position.y = 0; trilha.length = 0; cap.base = tempo;
      cam.fov = 66; cam.updateProjectionMatrix(); puxoes++; hud('o sinal caiu.', 3.5);
    }
    estado = 'play'; tc = t - 3.4; fx.azul = t < 3.7 ? 1 : clamp(1 - (t - 3.7) / .6, 0, 1); fx.glitch = fx.azul * .3;
    if (t > 4.6) { cap.on = false; fx.azul = 0; fx.ui = 0; return; }
  }
  fx.ui = 1; desenhaUI(estado, tc);
}

function atualizaSinais() {      // em ordem: só o próximo sinal está ligado
  const s = sinais[achados]; if (!s) return 1e9;
  const d = Math.hypot(jog.x - s.x, jog.z - s.z);
  if (d < 1.6 && fim.estado === 0 && !cap.on) {
    s.achado = true; achados++; semAchar = 0; acende(achados);
    perdido = Math.max(0, perdido - .3); som.pega();
    hud(achados < 7 ? `sinal ${String(s.i + 1).padStart(10, '0')}\n${achados}/7` : '7/7. o carro está vindo.', 5);
    if (achados === 7) { fim.estado = 1; fim.t = 0; }
  }
  return d;
}

function atualizaSalas(dt) {
  // sala bagunçada: o que você não está olhando muda de lugar
  const dS = Math.hypot(jog.x - SALA_B.x, jog.z - SALA_B.z);
  if (dS < 22) for (const p of salaB.pecas) {
    const wp = p.mundo ? p.obj.position : v3.copy(p.obj.position).add(salaB.G.position);
    const x = wp.x, z = wp.z;
    if (emVista(x, .5, z, .9) < 0 && Math.hypot(jog.x - x, jog.z - z) > 2.5 && rnd() < dt * .35) sortearLugar(p, salaB.G);
  }
  // discos: ganham cor quando você passa perto, e vão apagando devagar
  for (const k of discos) {
    const d = Math.hypot(jog.x - k.d.position.x, jog.z - k.d.position.z);
    k.cor = d < 2.2 ? Math.min(1, k.cor + dt * 3) : Math.max(0, k.cor - dt * .12);
    k.m.emissiveIntensity = k.cor * 1.6;
  }
  vitrola.prato.rotation.y += dt * 3.5;
  const dV = Math.hypot(jog.x - SALA_D.x, jog.z - SALA_D.z);
  som.vitrola(dV < 11);
}

function atualizaFim(dt) {
  if (!fim.estado) return;
  fim.t += dt;
  if (fim.estado === 1) {   // o carro vem pela estrada até você
    const alvo = Math.min(jog.z - 9, carro.position.z + 7 * dt);
    carro.position.z = alvo; carro.position.x += (clamp(jog.x, -1.5, 1.5) - carro.position.x) * dt * .5;
    if (jog.z - carro.position.z < 9.5) { fim.estado = 2; fim.t = 0; fim.yaw = jog.yaw; fim.pitch = jog.pitch; }
  } else if (fim.estado === 2) {   // você deita na estrada, o farol chega perto, tela branca
    const k = Math.min(1, fim.t / 3);
    jog.olho = 1.62 - k * 1.27; jog.yaw = fim.yaw + (Math.atan2(-(carro.position.x - jog.x), -(carro.position.z - jog.z)) - fim.yaw) * Math.min(1, fim.t / 1.5);
    jog.pitch = fim.pitch + (.42 - fim.pitch) * k;
    if (fim.t > 2.5) carro.position.z += 1.4 * dt;
    fx.flash = clamp((fim.t - 4) / 2.2, 0, 1);
    if (fim.t > 6.5) { fim.estado = 3; resumoEl.textContent = `modo ${modo.nome} · ${puxoes === 1 ? '1 puxão' : puxoes + ' puxões'}`; fimEl.classList.remove('esc'); document.exitPointerLock?.(); }
  }
}

// ---------- quadro ----------
let antes = performance.now(), pularRender = false;
function desenha(dt) {
  tempo += dt;
  if (!GRAVAR) {
    if (cap.on) { atualizaCaptura(dt); if (cap.on && cap.t > 3.7) anda(dt); }
    else { anda(dt); atualizaPerdido(dt); atualizaMedos(dt); gravaTrilha(dt); }
    atualizaSalas(dt); atualizaFim(dt);
    if (fim.estado < 2 && !cap.on) fx.flash = Math.max(0, fx.flash - dt * 1.2);
  }
  const dSinal = atualizaSinais();
  // puxão: tela pisca e você volta para o começo da estrada
  if (fx.puxao > 0) {
    fx.puxao -= dt; fx.glitch = 1; fx.escuro = clamp(1 - Math.abs(fx.puxao - .8) / .8, 0, 1);
    if (fx.puxao < .8 && jog.z !== INICIO.z) { jog.x = INICIO.x; jog.z = INICIO.z; jog.yaw = 0; jog.pitch = -.02; perdido = .15; semAchar = 0; enc.quem = null; medo.palhaco.g.visible = medo.terno.g.visible = false; }
    if (fx.puxao <= 0) fx.escuro = 0;
  }
  if (fx.surdo > 0) fx.surdo -= dt;
  if (!cap.on) fx.pausa = fx.rebob = fx.azul = fx.ui = 0;
  // câmera
  const bob = Math.sin(jog.passo) * .035 * (fim.estado >= 2 ? 0 : 1);
  cam.position.set(jog.x, jog.olho + bob, jog.z);
  cam.rotation.set(0, 0, 0, 'YXZ'); cam.rotation.order = 'YXZ'; cam.rotation.y = jog.yaw; cam.rotation.x = jog.pitch;
  cullBlocos(); atualizaLanterna(GRAVAR ? 0 : dt); feixe.material.uniforms.t.value = tempo;
  poeira.position.set(Math.round(jog.x / 40) * 40, 0, Math.round(jog.z / 40) * 40);
  // neblina fecha com o "perdido" e com cada sinal
  cena.fog.density = .038 + perdido * .03 + achados * .0015;
  // telas
  for (const m of telas) m.uniforms.t.value = tempo;
  // som
  const dCarro = Math.hypot(jog.x - carro.position.x, jog.z - carro.position.z);
  som.nivel((fim.estado ? .35 : .12) / (1 + dCarro / 18), clamp((modo.chiado - dSinal) / modo.chiado, 0, 1) ** 2 * .1, clamp((perdido - .25) / .6, 0, 1) * .8);
  // glitch magnético ocasional + medos
  const gs = Math.floor(tempo / 2.7), gf = (tempo / 2.7) % 1, gh = Math.abs(Math.sin(gs * 91.7 + 3.1) * 4375.85) % 1;
  const ocas = gh > .82 && gf < .12 ? Math.sin(gf / .12 * Math.PI) * .5 : 0;
  crt.uniforms.glitch.value = Math.max(ocas, fx.glitch);
  fx.glitch = Math.max(0, fx.glitch - dt * 1.5);
  crt.uniforms.t.value = tempo; crt.uniforms.flash.value = fx.flash; crt.uniforms.escuro.value = fx.escuro;
  crt.uniforms.uiOn.value = fx.ui; crt.uniforms.pausa.value = fx.pausa; crt.uniforms.rebob.value = fx.rebob; crt.uniforms.azul.value = fx.azul;
  if (!pularRender) {
    R.setRenderTarget(rt); R.render(cena, cam);
    R.setRenderTarget(null); R.render(crtCena, crtCam);
  }
  // texto
  if (!GRAVAR) {
    const mostra = mostrarHud && tempo < hudAte && hudTexto;
    const bat = lanterna.on || lanterna.bat < .99 ? '\nlanterna ' + '#'.repeat(Math.ceil(lanterna.bat * 6)).padEnd(6, '.') : '';
    hudEl.textContent = mostrarHud ? (mostra ? hudTexto : (achados ? `${achados}/7` : '')) + bat : '';
  }
}
function laco() { const ag = performance.now(), dt = Math.min(.1, (ag - antes) / 1000); antes = ag; desenha(dt); requestAnimationFrame(laco); }

// ---------- modo foto (para os quadros e a capa) ----------
window.__foto = (o) => {
  Object.assign(jog, { x: o.x, z: o.z, yaw: o.yaw, pitch: o.pitch, olho: o.olho ?? 1.62, passo: 0 });
  if (o.carroZ !== undefined) carro.position.z = o.carroZ;
  if (o.palhaco) { medo.palhaco.g.position.set(...o.palhaco); medo.palhaco.g.visible = true; medo.palhaco.g.rotation.y = Math.atan2(o.x - o.palhaco[0], o.z - o.palhaco[2]); }
  if (o.terno) { medo.terno.g.position.set(...o.terno); medo.terno.g.visible = true; medo.terno.g.rotation.y = Math.atan2(o.x - o.terno[0], o.z - o.terno[2]); }
  if (o.discos) discos.forEach(k => { k.m.emissiveIntensity = Math.hypot(k.d.position.x - o.discos[0], k.d.position.z - o.discos[1]) < o.discos[2] ? 1.6 : 0; });
  lanterna.on = !!o.lanterna;
  fx.flash = o.flash || 0; perdido = o.perdido ?? .05; fx.glitch = 0;
  cam.fov = o.fov || 66; cam.updateProjectionMatrix();
  const tt = tempo; desenha(0); tempo = tt;
};
window.__cena = async (o) => {          // quadros da captura: monta a cena e avança até o tempo o.t
  await document.fonts.load('34px VT323').catch(() => {});
  cap.on = false; Object.assign(jog, { x: o.x, z: o.z, yaw: o.yaw, pitch: o.pitch ?? 0, olho: 1.62, passo: 0 });
  trilha.length = 0; for (let i = 1; i < 14; i++) { const k = i / 14; trilha.push({ x: INICIO.x + (o.x - INICIO.x) * k + Math.sin(k * 8) * 4, z: INICIO.z + (o.z - INICIO.z) * k, yaw: o.yaw + Math.sin(k * 5) * .6 }); }
  medo.palhaco.g.visible = medo.terno.g.visible = false;
  const M = o.tipo === 'terno' ? medo.terno : medo.palhaco; poeMedo(M, o.ang ?? 0, o.d ?? 5);
  tempo = o.tempo ?? 200; cap.base = 0; perdido = o.perdido ?? .3; lanterna.on = !!o.lanterna; lanterna.bat = o.bat ?? .7;
  fx.flash = fx.glitch = fx.pausa = fx.rebob = fx.azul = fx.ui = 0; cam.fov = 66; cam.updateProjectionMatrix();
  capturaInicia(M); const dt = 1 / 60; let tt = 0;
  while (tt + dt <= o.t + 1e-6) { atualizaCaptura(dt); tempo += dt; tt += dt; if (!cap.on) break; }
  const t0 = tempo; desenha(0); tempo = t0;
};
window.__estado = () => ({ jog: { ...jog }, perdido, achados, fim: fim.estado, modo: modo.id, puxoes });
window.__dbg = { cap, enc, lanterna, medo, jog, sinais, MODOS, aplicaModo, get modo() { return modo; }, get puxoes() { return puxoes; }, get achados() { return achados; }, avanca: (dt, n) => { pularRender = true; for (let i = 0; i < n; i++) desenha(dt); pularRender = false; } };
window.__pronto = true;
if (!GRAVAR) requestAnimationFrame(laco);
