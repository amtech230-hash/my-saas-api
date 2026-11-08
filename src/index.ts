export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Endpoint 1: Ambil daftar seluruh sekolah (GET /schools)
    if (url.pathname === '/schools' && request.method === 'GET') {
      try {
        const { results } = await env.DB.prepare('SELECT * FROM schools').all();
        return Response.json({ success: true, data: results });
      } catch (err: any) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
      }
    }

    // Endpoint 2: Tambah sekolah baru (POST /schools)
    if (url.pathname === '/schools' && request.method === 'POST') {
      try {
        const body: any = await request.json();
        const { name, subdomain } = body;

        const info = await env.DB.prepare(
          'INSERT INTO schools (name, subdomain) VALUES (?, ?)'
        )
          .bind(name, subdomain)
          .run();

        return Response.json({ success: true, info }, { status: 201 });
      } catch (err: any) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
      }
    }

    return new Response('API Superadmin Cockpit Active!', { status: 200 });
  },
};