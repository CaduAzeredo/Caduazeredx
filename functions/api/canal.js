// Função do Cloudflare Pages: números públicos do canal, pela API de dados do YouTube.
// A chave fica só no painel do Cloudflare (variável YT_API_KEY), nunca no repositório
// nem no navegador. A resposta fica guardada por 6 horas para gastar pouca cota.
const CANAL = "@CaduAzeredo";
const SEIS_HORAS = 21600;

function json(corpo, status, cache) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cache ? `public, max-age=${SEIS_HORAS}` : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function onRequestGet({ request, env, waitUntil }) {
  if (!env.YT_API_KEY) return json({ ok: false, motivo: "sem-chave" }, 503, false);
  const chave = new Request(new URL("/api/canal", request.url).toString());
  const guardado = await caches.default.match(chave);
  if (guardado) return guardado;
  try {
    const u = new URL("https://www.googleapis.com/youtube/v3/channels");
    u.searchParams.set("part", "statistics");
    u.searchParams.set("forHandle", CANAL);
    u.searchParams.set("key", env.YT_API_KEY);
    const r = await fetch(u.toString());
    if (!r.ok) return json({ ok: false, motivo: "youtube-" + r.status }, 502, false);
    const d = await r.json();
    const e = d.items && d.items[0] && d.items[0].statistics;
    if (!e) return json({ ok: false, motivo: "canal-nao-encontrado" }, 502, false);
    const resposta = json(
      {
        ok: true,
        inscritos: e.hiddenSubscriberCount ? null : Number(e.subscriberCount),
        videos: Number(e.videoCount),
        views: Number(e.viewCount),
        atualizado: new Date().toISOString(),
      },
      200,
      true,
    );
    waitUntil(caches.default.put(chave, resposta.clone()));
    return resposta;
  } catch {
    return json({ ok: false, motivo: "falha" }, 502, false);
  }
}
