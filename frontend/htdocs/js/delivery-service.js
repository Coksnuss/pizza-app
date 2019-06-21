const pizzalist = [
    { name: 'Pizzabrot', price: 4.00, imgUrl: '/api/image/pizza?id=1', toppings: 'Mit ohne alles' },
    { name: 'Margarita', price: 4.50, imgUrl: '/api/image/pizza?id=2', toppings: 'Mit Emmentaler' },
    { name: 'Mozzarella', price: 6.50, imgUrl: '/api/image/pizza?id=3', toppings: 'Mit Basilikum, Emmentaler und Mozzarella' },
    { name: 'Fungi', price: 5.30, imgUrl: '/api/image/pizza?id=4', toppings: 'Mit Emmentaler und Pilzen' },
    { name: 'Gemüse Spezial', price: 9.10, imgUrl: '/api/image/pizza?id=5', toppings: 'Mit Brokkoli, Pilzen, Mozzarella, Oliven, Spinat, Paprika und Tomaten' },
    { name: 'Gonza', price: 5.40, imgUrl: '/api/image/pizza?id=6', toppings: 'Mit Knoblauch, Gorgonzola und Spinat' },
    { name: 'Vierkäsezeiten', price: 7.50, imgUrl: '/api/image/pizza?id=7', toppings: 'Mit Schafskäse, Gorgonzola, Gouda und Mozzarella' },
];

ko.applyBindings({
    pizza: pizzalist,
});
