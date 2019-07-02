import { apiBaseUrl, resetFormErrors, displayFormError } from './util.js';

const isLoading = ko.observable(true);
const pizzas = ko.observable([]);
const search = ko.observable('');
const filteredPizzas = ko.computed(() => pizzas().filter(pizza =>
    pizza.name.toLowerCase().includes(search().toLowerCase()) ||
    pizza.toppings.some(topping => topping.name.toLowerCase().includes(search().toLowerCase()))
));

const Cart = function (items) {
    this.items = ko.computed(function () {
      return items().filter(function (item) {
          return item.num() > 0;
      });
    });

    this.asTotalFormatted = ko.computed(function () {
      var total = 0.0;
      items().forEach(item => {
        total += item.price * (item.num() || 0);
      });

      return (total / 100).toFixed(2) + ' €';
    });
};
const createPizzaInstance = pizza => {
    const num = ko.observable(undefined);
    const toppingList = pizza.toppings.map(topping => topping.name);

    return {
      ...pizza,
      imageUrl: '/api/image/pizza?id=' + pizza.id,
      toppingsAsString: toppingList.length === 0 ? 'Ohne alles' :
        toppingList.length === 1 ? toppingList.join() :
        toppingList.slice(0, -1).join(', ') + ' und ' + toppingList.slice(-1),
      num,
      add: () => { num((+num() || 0) + 1); },
      remove: () => { num(((+num() || 1) - 1) || undefined); },
      asFormattedPrice: () => (pizza.price / 100).toFixed(2) + ' €',
      asFormattedSum: () => (num() * pizza.price / 100).toFixed(2) + ' €',
    };
  }
const sendForm = async form => {
  // Implementieren Sie diese Funktion analog zu der gleichnamigen Funktion in
  // dem guestbook.js Modul. Senden Sie die Formulardaten dafür mittels
  // application/x-www-form-urlencoded Header an den /api/order Endpunkt und
  // stellen Sie die Validierungsfehler im Formular entsprechend dar.
  // Im Erfolgsfall (200er Response) können Sie z.B. die unten stehende
  // Dummy-Meldung zeigen.
  UIkit.notification('Leider sind derzeit keine Online-Bestellungen möglich. '
      + 'Sie können Ihre Bestellung stattdessen telefonisch aufgeben:<br />'
      + '+49 172 476 6831', {
    timeout: 0,
    status: 'warning'
  });
};

(async () => {
  // Implementieren Sie diese Funktion analog zu der loadPage Funktion in dem
  // guestbook.js Modul. Sie benötigen an dieser Stelle keine Paginierung, die
  // API liefert ausreichend viele Elemente pro Seite zurück. Der Endpunkt um
  // die Liste der verkaufbaren Pizzen abzufragen ist /api/pizza.
  // Auch an dieser Stelle müssen die von der REST API zurückgegebenen Pizzen
  // nocheinmal für unsere Anwendung angepasst werden (z.B. um einen Click
  // handler für das entfernen von Pizzen aus dem Warenkorb hinzuzufügen).
  // Hierfür können Sie auf die Funktion createPizzaInstance zurückgreifen.
  // Diese erwartet als einziges Argument eine Pizza in dem Format wie sie
  // bereits durch die API zurückgeliefert wird und ergänzt diese durch weitere
  // Eigenschaften, so dass Sie in unserer Knockout Anwendung verwendet werden
  // kann.
  // Die Funktion ist dafür zuständig das Observable 'pizzas' mit einer Liste
  // von durch createPizzaInstance erstellten Pizzen zu füllen.
  // Nach der vollständigen Abarbeitung der Anfrage muss außerdem das isLoading
  // Observable auf false gesetzt werden.
  const response = await fetch(`${apiBaseUrl}/pizza`);
  const pizzasFromApi = await response.json();

  pizzas(pizzasFromApi.map(createPizzaInstance));
  isLoading(false);
})();

ko.applyBindings({
  isLoading,
  search,
  sendForm,
  pizzas: filteredPizzas,
  cart: new Cart(pizzas),
}, document.querySelector('body > .wrapper'));
