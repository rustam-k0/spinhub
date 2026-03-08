export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Datenschutzerklärung</h2>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">1. Verantwortlicher</h3>
          <p>
            Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>
            Rustam Khavaiashkhov<br />
            Wiesenmühlenstraße 7<br />
            36037 Fulda<br />
            Deutschland<br />
            Telefon: +49 176 41937827<br />
            E-Mail: baziev.rustam1@gmail.com
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">2. Datenschutz auf einen Blick</h3>
          <p>
            Die Nutzung dieser App ist ohne Angabe personenbezogener Daten (wie Name oder E-Mail) möglich. Wir setzen keine Tracking-Cookies (wie Google Analytics) und keine sonstigen Tracking-Tools ein.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">3. Hosting und Server-Log-Dateien (Vercel)</h3>
          <p>
            Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (im Folgenden: Vercel). Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen in sogenannten Server-Log-Dateien. Diese Daten werden von Ihrem Browser automatisch an den Server übermittelt:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL (die zuvor besuchte Seite)</li>
            <li>Hostname des zugreifenden Rechners (IP-Adresse)</li>
            <li>Uhrzeit der Serveranfrage</li>
          </ul>
          <p>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung unserer Website – hierzu müssen die Server-Log-Files erfasst werden.
          </p>
          <p>
            Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit Vercel geschlossen, der sicherstellt, dass Vercel die Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">4. Lokaler Speicher (Local Storage)</h3>
          <p>
            Unsere Applikation nutzt den sogenannten "Local Storage" (lokaler Speicher) Ihres Browsers, um Ihren aktuellen Reservierungsstatus (welche Maschine Sie reserviert haben und die verbleibende Zeit) zu speichern. Dies ist notwendig, damit die Applikation ordnungsgemäß funktioniert und Ihr Status nach einem Neuladen der Seite erhalten bleibt.
          </p>
          <p>
            Die Speicherung erfolgt ausschließlich lokal auf Ihrem Endgerät. Diese Daten werden <strong>nicht</strong> an unsere Server oder an Dritte übermittelt.
          </p>
          <p>
            Die Speicherung dieser technisch notwendigen Daten erfolgt auf Grundlage von <strong>§ 25 Abs. 2 TDDDG</strong> (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz), da sie für die Bereitstellung des von Ihnen ausdrücklich gewünschten Telemediendienstes (Waschmaschinen-Reservierung) unbedingt erforderlich sind.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-100 text-base">5. Ihre Rechte (Betroffenenrechte)</h3>
          <p>
            Ihnen stehen nach der Datenschutz-Grundverordnung (DSGVO) umfassende Rechte hinsichtlich der Verarbeitung Ihrer personenbezogenen Daten zu:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li><strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie haben das Recht, jederzeit Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu erhalten.</li>
            <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die unverzügliche Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
            <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.</li>
            <li><strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</li>
            <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu fordern.</li>
            <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer personenbezogenen Daten jederzeit widersprechen, sofern diese auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO erfolgt.</li>
            <li><strong>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO):</strong> Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
