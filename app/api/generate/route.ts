import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaBisnis,
      tagline,
      kategoriJasa,
      lokasi,
      keunggulan,
      layananSpesifik,
      targetPelanggan,
      usia,
      statusKeluarga,
      pekerjaan,
      gayaHidup,
      nuansaDesain
    } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set.");
      return NextResponse.json({ error: "Server configuration error (API Key missing)." }, { status: 500 });
    }

    const systemPrompt = `Kamu adalah copywriter profesional untuk website bisnis UMKM Indonesia. Tugasmu menghasilkan konten website yang menarik, persuasif, dan sesuai dengan identitas bisnis yang diberikan. Selalu gunakan bahasa Indonesia yang natural dan sesuai target pelanggan. Kembalikan response dalam format JSON saja, tanpa penjelasan tambahan.`;

    const userPrompt = `Buatkan konten website untuk bisnis berikut:

Nama Bisnis: ${namaBisnis || '-'}
Tagline: ${tagline || '-'}
Kategori: ${kategoriJasa || '-'}
Lokasi: ${lokasi || '-'}
Keunggulan: ${keunggulan || '-'}
Layanan: ${(layananSpesifik || []).join(', ') || '-'}
Target Pelanggan: Usia ${usia || '-'}, Status Keluarga ${statusKeluarga || '-'}, Pekerjaan ${pekerjaan || '-'}, Gaya Hidup ${gayaHidup || '-'}
Nuansa Desain: ${nuansaDesain || '-'}

Generate konten dalam format JSON:
{
  "hero": {
    "headline": "...",
    "subheadline": "...",
    "ctaText": "..."
  },
  "about": {
    "judul": "...",
    "deskripsi": "...",
    "keunggulan": ["...", "...", "..."]
  },
  "layanan": [
    {
      "nama": "...",
      "deskripsi": "...",
      "harga": "..."
    }
  ],
  "targetPelanggan": {
    "deskripsi": "...",
    "painPoint": "...",
    "solusi": "..."
  },
  "testimonialPlaceholder": [
    {
      "nama": "...",
      "peran": "...",
      "teks": "..."
    }
  ],
  "footer": {
    "tagline": "...",
    "ctaText": "..."
  }
}`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic Error:", errText);
      return NextResponse.json({ error: "Gagal memanggil AI. Silakan coba lagi." }, { status: 502 });
    }

    const data = await anthropicRes.json();
    const textResponse = data.content?.[0]?.text || "{}";

    // Extract JSON in case Claude adds markdown code blocks
    let jsonString = textResponse;
    const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) || textResponse.match(/```\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse Claude JSON:", textResponse);
      return NextResponse.json({ error: "Format respons dari AI tidak valid." }, { status: 500 });
    }

    return NextResponse.json(parsedJson, { status: 200 });
  } catch (error) {
    console.error("Generate API Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 });
  }
}
