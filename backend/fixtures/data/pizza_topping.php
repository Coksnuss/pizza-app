<?php

$now = time();
$pizza = app\fixtures\PizzaFixture::$instance;
$topping = app\fixtures\ToppingFixture::$instance;

return array_map(function ($record) use ($now) {
    return array_merge($record, [
        'created_at' => $now,
        'updated_at' => $now,
    ]);
}, [
    [
        'pizza_id' => $pizza->getModel('margarita')->id,
        'topping_id' => $topping->getModel('emmentaler')->id,
    ],

    [
        'pizza_id' => $pizza->getModel('mozzarella')->id,
        'topping_id' => $topping->getModel('mozzarella')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('mozzarella')->id,
        'topping_id' => $topping->getModel('emmentaler')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('mozzarella')->id,
        'topping_id' => $topping->getModel('basil')->id,
    ],

    [
        'pizza_id' => $pizza->getModel('fungi')->id,
        'topping_id' => $topping->getModel('emmentaler')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('fungi')->id,
        'topping_id' => $topping->getModel('fungi')->id,
    ],

    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('mozzarella')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('sweet-pepper')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('fungi')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('tomato')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('olive')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('broccoli')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('vegetable')->id,
        'topping_id' => $topping->getModel('spinach')->id,
    ],

    [
        'pizza_id' => $pizza->getModel('gonza')->id,
        'topping_id' => $topping->getModel('spinach')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('gonza')->id,
        'topping_id' => $topping->getModel('gorgonzola')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('gonza')->id,
        'topping_id' => $topping->getModel('garlic')->id,
    ],

    [
        'pizza_id' => $pizza->getModel('quattro-fromaggi')->id,
        'topping_id' => $topping->getModel('ewes-cheese')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('quattro-fromaggi')->id,
        'topping_id' => $topping->getModel('mozzarella')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('quattro-fromaggi')->id,
        'topping_id' => $topping->getModel('gouda')->id,
    ],
    [
        'pizza_id' => $pizza->getModel('quattro-fromaggi')->id,
        'topping_id' => $topping->getModel('gorgonzola')->id,
    ],
]);
