"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

// Token motion: satu sumber untuk seluruh situs.
export const motionTokens = {
  press: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
  reveal: { duration: 0.56, ease: [0.16, 1, 0.3, 1] as const },
  stagger: 0.06,
};

const steps = ["Ambil data proyek", "Susun halaman", "Terbitkan ke produksi"];

export function MotionDemo() {
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Menjawab aksi: tekan */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-medium">Tekan</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Tombol mengecil sedikit saat ditekan, 150 ms.
          </p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            transition={motionTokens.press}
            className="mt-5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Simpan perubahan
          </motion.button>
        </div>

        {/* Menjawab aksi: buka */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-medium">Buka dan tutup</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Tinggi dan opasitas berubah bersamaan, 300 ms.
          </p>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="mt-5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            {open ? "Sembunyikan detail" : "Tampilkan detail"}
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: motionTokens.press.ease }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm text-muted-foreground">
                  Konteks proyek, peran Anda, dan dampak yang bisa diukur.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Satu momen terorkestrasi: dipakai sekali di hero */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-medium">Urutan masuk</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Dipakai sekali saat hero dimuat. 560 ms, jeda 60 ms.
          </p>
          <ul key={run} className="mt-5 space-y-2 text-sm">
            {steps.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...motionTokens.reveal, delay: i * motionTokens.stagger }}
                className="rounded-md bg-muted px-3 py-2"
              >
                {s}
              </motion.li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="mt-5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Putar ulang
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
