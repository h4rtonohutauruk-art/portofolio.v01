import type { Metadata } from "next";
import { MotionDemo } from "./motion-demo";

export const metadata: Metadata = { title: "Sistem desain" };

type Token = { name: string; hex: string; cls: string };

const light: Token[] = [
  { name: "paper", hex: "#F5F7F3", cls: "bg-paper" },
  { name: "surface", hex: "#FBFCFA", cls: "bg-surface" },
  { name: "line", hex: "#D9DFD8", cls: "bg-line" },
  { name: "ink", hex: "#14181A", cls: "bg-ink" },
  { name: "ink-muted", hex: "#4F5B57", cls: "bg-ink-muted" },
  { name: "brand", hex: "#1F6B4F", cls: "bg-brand" },
  { name: "brand-soft", hex: "#DCEAE2", cls: "bg-brand-soft" },
  { name: "signal", hex: "#2E9E6B", cls: "bg-signal" },
];

// Kelas sama, nilai berbeda: wrapper .dark mengganti variabel.
const dark: Token[] = [
  { hex: "#0E1311" },
  { hex: "#151C19" },
  { hex: "#26302B" },
  { hex: "#E8EEEA" },
  { hex: "#9AA8A1" },
  { hex: "#5FD1A0" },
  { hex: "#1B3A2E" },
  { hex: "#2E9E6B" },
].map((d, i) => ({ ...light[i], hex: d.hex }));

function Swatch({ name, hex, cls }: Token) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-md border border-border ${cls}`} />
      <div className="text-sm font-medium text-foreground">{name}</div>
      <div className="font-mono text-xs text-muted-foreground">{hex}</div>
    </div>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="font-serif text-title">{title}</h2>
      {note && (
        <p className="mt-2 max-w-[60ch] text-muted-foreground">{note}</p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <header className="max-w-3xl">
        <h1 className="font-serif text-display">Sistem desain portofolio</h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
          Satu sumber untuk warna, tipografi, bentuk, dan gerak. Semua komponen
          membaca token di globals.css, jadi mengubah satu nilai mengubah
          seluruh situs.
        </p>
      </header>

      <Section
        title="Warna"
        note="Satu aksen hijau. Teks sekunder dan aksen di atas paper lolos kontras 4,5:1."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {light.map((t) => (
            <Swatch key={t.name} {...t} />
          ))}
        </div>
        <div className="dark mt-10 rounded-lg border border-border bg-background p-6">
          <h3 className="mb-5 font-medium text-foreground">Mode gelap</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {dark.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Tipografi"
        note="Instrument Serif untuk judul, Geist untuk isi, Geist Mono hanya untuk kode, angka, dan nilai token."
      >
        <div className="space-y-8">
          <div>
            <p className="font-serif text-display">Antarmuka yang rapi</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              text-display, font-serif, 44 sampai 76 px
            </p>
          </div>
          <div>
            <p className="font-serif text-title">
              Judul bagian dan nama proyek
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              text-title, font-serif, 30 px
            </p>
          </div>
          <div>
            <p className="max-w-[60ch] text-lg leading-relaxed">
              Teks isi memakai Geist dengan tinggi baris 1,6 dan panjang baris
              di bawah 80 karakter agar nyaman dibaca.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              text-lg, font-sans
            </p>
          </div>
          <p className="font-mono text-sm">getProject(&quot;slug&quot;)</p>
        </div>
      </Section>

      <Section
        title="Bentuk"
        note="Tiga radius dengan peran berbeda, bukan satu nilai untuk semua."
      >
        <div className="flex flex-wrap items-end gap-6">
          {[
            ["rounded-sm", "Tag dan chip", "h-12 w-20"],
            ["rounded-md", "Tombol dan input", "h-16 w-28"],
            ["rounded-lg", "Panel dan kartu", "h-24 w-40"],
          ].map(([cls, label, size]) => (
            <div key={cls} className="space-y-2">
              <div className={`${cls} ${size} border border-border bg-card`} />
              <p className="text-sm">{label}</p>
              <p className="font-mono text-xs text-muted-foreground">{cls}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Kontrol dasar"
        note="Fokus keyboard selalu terlihat. Bidang sentuh minimal 44 px."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button className="min-h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Mulai percakapan
          </button>
          <button className="min-h-11 rounded-md border border-foreground px-5 text-sm font-medium transition-colors hover:bg-accent">
            Lihat karya
          </button>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Surel</span>
            <input
              type="email"
              placeholder="nama@contoh.com"
              className="min-h-11 w-64 rounded-md border border-input bg-card px-3 text-sm placeholder:text-muted-foreground"
            />
          </label>
          <span className="inline-flex items-center gap-2 text-sm">
            <span
              className="size-2 rounded-full bg-signal"
              aria-hidden="true"
            />
            Tersedia untuk proyek baru
          </span>
        </div>
      </Section>

      <Section
        title="Gerak"
        note="Gerak menjawab aksi pengguna. Satu urutan masuk di hero, bukan animasi di setiap bagian. Pengguna dengan reduced motion hanya melihat perubahan opasitas."
      >
        <MotionDemo />
        <dl className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-border pb-2">
            <dt>ease-out-expo</dt>
            <dd className="font-mono text-muted-foreground">
              cubic-bezier(.16, 1, .3, 1)
            </dd>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <dt>ease-in-out-soft</dt>
            <dd className="font-mono text-muted-foreground">
              cubic-bezier(.65, 0, .35, 1)
            </dd>
          </div>
        </dl>
      </Section>
    </main>
  );
}
