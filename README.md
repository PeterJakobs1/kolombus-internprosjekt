Tittel: Sekvensdiagram for datainnhenting fra kollektivtransport-API

Deltakere:

- Bruker
- Webapplikasjon
- Kollektivtransport-API

Sekvens:

Bruker -> Webapplikasjon: Bruker ber om stasjonsliste
Webapplikasjon -> Kollektivtransport-API: Kaller fetchStations-funksjonen
Kollegatransport-API -> Webapplikasjon: Returnerer liste over stasjoner
Webapplikasjon -> Bruker: Viser listen over stasjoner

Bruker -> Webapplikasjon: Bruker velger en stasjon
Webapplikasjon -> Kollektivtransport-API: Kaller fetchPlatforms-funksjonen med valgt stasjon
Kollegatransport-API -> Webapplikasjon: Returnerer liste over plattformer
Webapplikasjon -> Bruker: Viser listen over plattformer

(Prosessen gjentar seg for valg av plattform, linjer, avganger og reisedetaljer)

Bruker -> Webapplikasjon: Bruker ber om reisedetaljer for en avgang
Webapplikasjon -> Kollektivtransport-API: Kaller fetchTripDetails-funksjonen med valgt avgangs-ID
Kollegatransport-API -> Webapplikasjon: Returnerer detaljert informasjon om reisen
Webapplikasjon -> Bruker: Viser detaljert informasjon om reisen
