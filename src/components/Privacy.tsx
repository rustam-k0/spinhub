export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Datenschutzerklärung</h2>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">1. Datenschutz auf einen Blick</h3>
          <p>
            Die Nutzung dieser App ist ohne Angabe personenbezogener Daten (wie Name oder E-Mail) möglich. Wir setzen keine Tracking-Cookies (wie Google Analytics) ein.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">2. Datenerfassung auf dieser Website (Server-Log-Dateien)</h3>
          <p>
            Der Provider der Seiten (Vercel) erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners (IP-Adresse)</li>
            <li>Uhrzeit der Serveranfrage</li>
          </ul>
          <p>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">3. Lokaler Speicher</h3>
          <p>
            Die App speichert deinen aktuellen Reservierungsstatus lokal in deinem Browser (Local Storage), um die Funktionalität der App zu gewährleisten. Diese Daten werden nicht an unsere Server übermittelt, um dich persönlich zu identifizieren.
          </p>
        </section>
      </div>
    </div>
  );
}
