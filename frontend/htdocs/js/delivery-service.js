const formatPrice = priceAsFloat => priceAsFloat
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    .toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
const pizzalist = [
    { name: 'Pizzabrot', price: 4.00, imgUrl: '/api/image/pizza?id=1', toppings: 'Mit ohne alles', quantity: ko.observable(0) },
    { name: 'Margarita', price: 4.50, imgUrl: '/api/image/pizza?id=2', toppings: 'Mit Emmentaler', quantity: ko.observable(0) },
    { name: 'Mozzarella', price: 6.50, imgUrl: '/api/image/pizza?id=3', toppings: 'Mit Basilikum, Emmentaler und Mozzarella', quantity: ko.observable(0) },
    { name: 'Fungi', price: 5.30, imgUrl: '/api/image/pizza?id=4', toppings: 'Mit Emmentaler und Pilzen', quantity: ko.observable(0) },
    { name: 'Gemüse Spezial', price: 9.10, imgUrl: '/api/image/pizza?id=5', toppings: 'Mit Brokkoli, Pilzen, Mozzarella, Oliven, Spinat, Paprika und Tomaten', quantity: ko.observable(0) },
    { name: 'Gonza', price: 5.40, imgUrl: '/api/image/pizza?id=6', toppings: 'Mit Knoblauch, Gorgonzola und Spinat', quantity: ko.observable(0) },
    { name: 'Vierkäsezeiten', price: 7.50, imgUrl: '/api/image/pizza?id=7', toppings: 'Mit Schafskäse, Gorgonzola, Gouda und Mozzarella', quantity: ko.observable(0) },
];
const add = pizza => {
    const currentQuantity = pizza.quantity();

    if (currentQuantity < 10) {
        pizza.quantity(currentQuantity + 1);
    }
}
const remove = pizza => {
    const currentQuantity = pizza.quantity();

    if (currentQuantity > 0) {
        pizza.quantity(currentQuantity - 1);
    }
}

ko.applyBindings({
    formatPrice: formatPrice,
    pizza: pizzalist,
    add: add,
    remove: remove,
});
