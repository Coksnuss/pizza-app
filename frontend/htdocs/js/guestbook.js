import { adminPassword } from './admin.js';
import { apiBaseUrl, timestampToDateTime, resetFormErrors, displayFormError } from './util.js';

const isLoading = ko.observable(true);
const currentPage = ko.observable(1);
const pageCount = ko.observable(1);
const entries = ko.observable([]);

const loadPage = async (page) => {
  // In dieser Funktion sollen die Gästebucheinträge über die REST API geladen
  // werden. Dafür können Sie den REST Endpunkt /api/guestbook verwenden. Dieser
  // ist so konfiguriert, dass er die zuletzt hinzugefügten Einträge zuerst
  // zurückgibt. Weiterhin ist der Endpunkt auf eine Paginierung ausgelegt. Das
  // heißt, es werden standardmäßig nur drei Einträge gleichzeitig zurückgegeben.
  // Hierzu sendet die REST API in ihren Response Headern die folgenden
  // Informationen mit:
  //   X-Pagination-Total-Count:  Die gesamte Anzahl an Gästebucheinträgen
  //   X-Pagination-Page-Count:   Die Anzahl der Gästebuchseiten
  //   X-Pagination-Current-Page: Die ausgelieferte Seite
  //   X-Pagination-Per-Page:     Die Anzahl der Einträge pro Seite
  // Der Query Parameter 'page' kann genutzt werden um eine bestimmte Seite
  // abzurufen. Zum Beispiel: /api/guestbook?page=2. Standardmäßig wird die
  // erste Seite ausgeliefert.
  //
  // Die API unterstützt Content Negotiation für die MIME Typen application/json
  // und application/xml. Sofern nicht explizit anders angefragt, wird die
  // Antwort in JSON übermittelt. Dieser Endpunkt liefert eine Liste von
  // Gästebuch Einträgen, wobei jeder Eintrag das folgende Format hat:
  // {
  //   "id": 1,
  //   "name": "Hans Mustermann",
  //   "rating": 1,
  //   "ratingText": "Sehr gut",
  //   "message": "Alles toll! Essen war lecker!",
  //   "visited_date": "2019-05-08",
  //   "authored_at": 1557571200
  // }
  //
  // Diese Funktion soll die folgenden Aufgaben erfüllen:
  // 1) Während die HTTP Anfrage an die REST API läuft, soll das observable
  //    isLoading auf true gesetzt werden. Nach der vollständigen Abarbeitung
  //    der Anfrage soll der Wert auf false gesetzt werden. Der Zweck ist die
  //    Anzeige eines "Loading Spinners" im frontend um dem Anwender der Seite
  //    zu signalisieren, dass ein Ladevorgang in Gange ist.
  isLoading(true);
  // 2) Die Gästebucheinträge der angefragten Seite (page Parameter der Funktion)
  //    sollen mittels fetch abgefragt werden. Für die kommende Übung wird es
  //    nötig die API URL anzupassen. Nutzen Sie daher für die Konstruktion der
  //    anzufragenden URL die Variable apiBaseUrl (die momentan den Wert '/api'
  //    hat). Denken Sie auch in den nachfolgenden Aufgaben daran die Variable
  //    zu nutzen.
  try {
    const response = await fetch(`${apiBaseUrl}/guestbook?page=${page}`);
  // 3) Die beiden observables 'currentPage' und 'pageCount' sollen entsprechend
  //    dem Wert der X-Pagination-Current-Page und X-Pagination-Page-Count
  //    Header gesetzt werden. Achten Sie dabei darauf den Wert als Zahl, nicht
  //    als String zu setzen.
    currentPage(+response.headers.get('X-Pagination-Current-Page'));
    pageCount(+response.headers.get('X-Pagination-Page-Count'));
  // 4) Das observable 'entries' soll mit den Gästebucheinträgen für die
  //    angefragte Seite gefüllt werden. Parsen Sie dazu den Payload (HTTP body)
  //    der Antwort in ein Objekt, so dass Sie mit den von der API gelieferten
  //    Daten auch arbeiten können. Das entries observable soll eine Liste von
  //    Gästebucheinträgen im folgenden Format enthalten:
  //    {
  //       "id": 1,
  //       "name": "Hans Mustermann",
  //       "ratingAsString": "1 - Sehr gut",
  //       "message": "Alles toll! Essen war lecker!",
  //       "authored_at": "2019-05-11 10:40:00",
  //       "visited_date": "2019-05-08",
  //    }
  //    Beachten Sie, dass dieses Format in Teilen von dem Format der REST API
  //    abweicht. Der Wert von "ratingAsString" ist eine Kombination der Felder
  //    "rating" und "ratingText". Das Feld "authored_at" soll statt dem Unix
  //    timestamp ein lesbares Datum/Zeit Format enthalten. Sie können für die
  //    Transformierung auf die timestampToDateTime Funktion aus dem util.js
  //    Modul zurückgreifen.
    const entriesFromApi = await response.json();
    const enhancedEntries = entriesFromApi.map((entryFromApi) => ({
      ...entryFromApi,
      ratingAsString: `${entryFromApi.rating} - ${entryFromApi.ratingText}`,
      authored_at: timestampToDateTime(entryFromApi.authored_at * 1000).join(' '),
    }));
    entries(enhancedEntries);
  // 5) Die Fetch API nutzt den Rejected State des von fetch() zurückgegebenen
  //    Promises um zu signalisieren, dass die Anfrage nicht wie gewünscht
  //    ausgeführt werden konnte. Dieser Fall tritt zum Beispiel auf wenn keine
  //    Netzwerk- bzw. Internetverbindung besteht. Behandeln Sie den Fall eines
  //    rejected Promises und nutzen Sie die folgende Funktion um eine
  //    Fehlermeldung auszugeben:
  //      UIkit.notification('Fehlermeldung!', { status: 'danger' });
  } catch (err) {
    // A fetch() promise will reject with a TypeError when a network error is encountered
    // or CORS is misconfigured on the server side.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
    UIkit.notification(`Fehler! ${err.message}`, { status: 'danger' });
  } finally {
    isLoading(false); // Siehe Punkt 1)
  }
};
const deleteEntry = async entry => {
  if (!confirm('Soll dieser Eintrag wirklich gelöscht werden?')) return;

  // Diese Funktion wird aufgerufen wenn ein Gästebuch Eintrag gelöscht werden
  // soll. Dazu muss der Nutzer im Frontend zunächst ein Adminpasswort
  // hinterlegen (Login Link im Footer) und kann anschließend über den Löschen
  // Button im Gästebuch einzelne Einträge löschen.
  //
  // Diese Funktion soll die folgenden Anforderungen erfüllen
  // 1) Es soll eine eine DELETE Anfrage an den REST Endpunkt /api/guestbook/{id}
  //    geschickt werden. Der Platzhalter {id} muss durch die ID des zu löschenden
  //    Eintrages ersetzt werden. Diese ist Teil des an die Funktion übergebenen
  //    entry Objektes. Damit das Löschen von Gästebucheinträgen nicht durch
  //    beliebige Personen durchgeführt werden kann, erwartet die API eine
  //    sogenannte Bearer Token Authentifizierung. Senden Sie dazu den folgenden
  //    Header in der Anfrage mit:
  //    Authorization: Bearer {ADMINPASSWORD}
  //    Wobei {ADMINPASSWORD} als Platzhalter durch das eigentliche, vom Nutzer
  //    eingegebene Passwort ersetzt werden muss. Dieses ist in dem Observable
  //    adminPassword hinterlegt.
  // 2) Sollte das Löschen des Eintrages erfolgreich gewesen sein so antwortet
  //    die API mit dem HTTP Status Code 204 (No Content). Das response Objekt
  //    der Fetch API verfügt über eine praktische Eigenschaft mit dem Namen "ok"
  //    mittels derer geprüft werden kann, ob eine HTTP Antwort mit einem 200er
  //    Status Code beantwortet wurde (z.B. 200, 201 oder 204). Laden Sie in
  //    diesem Fall die aktuell dargestellte Gästebuchseite neu, so dass der eben
  //    gelöschte Beitrag nicht weiterhin angezeigt wird.
  // 3) Prinzipiell kann die API das Löschen eines Eintrages verweigern und mit
  //    einem Fehlercode Antworten. Es gibt u.a. die folgende Möglichkeiten für
  //    einen Fehler:
  //      403: Forbidden     - Keine Rechte zum Löschen! (Falsches Passwort?)
  //      404: Not Found     - Kein Eintrag mit der referenzierten ID vorhanden
  //      xxx: ???           - Andere Fehler (z.B. 500 Internal Server Error)
  //    Behandeln Sie diese Fehlerfälle indem Sie eine entsprechende
  //    Fehlermeldung anzeigen. Sie können dazu auf die "status" Eigenschaft des
  //    response Objektes der Fetch API zurückgreifen. Um eine Fehlermeldung
  //    anzuzeigen, rufen Sie die folgende Funktion auf:
  //      UIkit.notification('Fehlermeldung!', { status: 'danger' });
  // 4) Behandeln Sie den Fall, dass fetch() eine Exception wirft (d.h. dass das
  //    von fetch() zurückgegebene Promise in den Zustand rejected übergeht)
}
const sendForm = async form => {
  // Diese Funktion wird aufgerufen wenn der Nutzer den "Feedback abschicken"
  // Button des Gästebuchformulars anklickt. Der an die Funktion übergebene form
  // Parameter entspricht dem HTML Element des Formulars (so als wenn es über
  // document.getElementById() abgefragt worden wäre).
  //
  // Diese Funktion soll die folgenden Anforderungen erfüllen:
  // 1) Es soll ein POST Request an den REST Endpunkt /api/guestbook geschickt
  //    werden der die Daten des Formulars beinhaltet. Die Daten können als
  //    Payload (POST body) mittels des MIME Typ application/x-www-form-urlencoded
  //    übermittelt werden. Setzen Sie dazu den geeigneten Header. Um die
  //    Formulardaten in dieses Format zu konvertieren können Sie folgenden
  //    Funktionsaufruf nutzen:
  //      $(form).seralize()
  // 2) Im Erfolgsfall antwortet die REST API mit dem Statuscode 201 Created.
  //    Setzen Sie in diesem Fall das Formular programmatisch zurück, damit die
  //    Formularfelder nicht weiterhin ausgefüllt bleiben. Zeigen Sie außerdem
  //    eine Erfolgsmeldung indem Sie die folgende Funktion nutzen:
  //      UIkit.notification('Erfolgsmeldung!', { status: 'success' });
  //    Laden Sie im Erfolgsfall außerdem die erste Seite der Gästebucheinträge
  //    neu.
  //    Siehe auch: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
  // 3) Im Fehlerfall antwortet die REST API mit einem 422 Data Validation Failed
  //    Status Code. In diesem Fall enthält die Antwort eine Liste von
  //    Validierungsfehlern in dem folgenden Format:
  //    {
  //       "field": "rating",
  //       "message": "Rating darf nicht leer sein."
  //    }
  //    Der unter dem Schlüssel "field" gesetzte Wert referenziert dabei den
  //    Namen des entsprechenden Formularfeldes bei welchem der Fehler aufgetreten
  //    ist. Das Feld "message" gibt den entsprechenden Validierungsfehler an.
  //    Nutzen Sie die in der util.js definierten Funktionen resetFormErrors()
  //    und displayFormError(formId, field, message) um die von der API
  //    zurückgegebenen Fehler im Formular anzuzeigen. Setzen Sie außerdem beim
  //    erneuten Abschicken des Formulars alle Fehlermeldungen zurück, damit
  //    diese nicht fälschlicherweise weiterhin angezeigt werden.
  // 4) Fangen Sie auch ggf. andere Fehlercodes ab und zeigen Sie eine
  //    generische Fehlermeldung an.
  // 5) Behandeln Sie den Fall, dass fetch() eine Exception wirft (d.h. dass das
  //    von fetch() zurückgegebene Promise in den Zustand rejected übergeht)
};

loadPage(currentPage());

ko.applyBindings({
  isLoading,
  isAdmin: () => !!adminPassword(),
  deleteEntry,
  entries,
  loadPage,
  loadPrevPage: () => loadPage(currentPage() - 1),
  loadNextPage: () => loadPage(currentPage() + 1),
  currentPage,
  pageCount,
  sendForm,
}, document.querySelector('body > .wrapper'));
