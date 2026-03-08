export default function Impressum() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Impressum</h2>
        <p className="text-sm text-zinc-400">Angaben gemäß § 5 DDG</p>
      </div>

      <div className="space-y-4 text-sm text-zinc-300">
        <div>
          <p className="font-semibold text-zinc-100">Rustam Khavaiashkhov</p>
          <p>Wiesenmühlenstraße 7</p>
          <p>36037 Fulda</p>
          <p>Deutschland</p>
        </div>

        <div>
          <p>Telefon: +49 176 41937827</p>
          <p>
            E-Mail: <a href="mailto:baziev.rustam1@gmail.com" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
              baziev.rustam1@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <h3 className="font-semibold text-zinc-100">Verantwortlicher im Sinne von § 18 Abs. 2 MStV</h3>
        <p>Rustam Khavaiashkhov</p>
        <p>Wiesenmühlenstraße 7</p>
        <p>36037 Fulda</p>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <h3 className="font-semibold text-zinc-100">Besonderer Hinweis zur Nutzung</h3>
        <p className="leading-relaxed">
          Diese Web-Applikation dient ausschließlich der digitalen Reservierung und Statusanzeige der Waschmaschinen. Für die physische Wartung, Reparatur und den allgemeinen Zustand der Waschmaschinen ist ausschließlich die Hausverwaltung zuständig:
        </p>
        <p>
          E-Mail Hausverwaltung: <a href="mailto:Verwaltung7und9@gmx.de" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
            Verwaltung7und9@gmx.de
          </a>
        </p>
      </div>
    </div>
  );
}
