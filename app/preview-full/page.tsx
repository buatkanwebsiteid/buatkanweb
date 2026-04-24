"use client";

import { useEffect, useState } from "react";
import type { TemplateData } from "@/types";
import TemplateSatu from "@/components/templates/TemplateSatu";
import { Loader2 } from "lucide-react";

export default function PreviewFullPage() {
  const [data, setData] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("zp_preview_data");
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-zinc-200 text-xl font-semibold mb-2">
          Tidak ada data preview
        </h1>
        <p className="text-zinc-500 text-sm max-w-md">
          Silakan generate website terlebih dahulu dari dashboard, lalu klik
          tombol &quot;Buka Full View&quot;.
        </p>
      </div>
    );
  }

  return <TemplateSatu {...data} />;
}
