<?php

$now = time();

return array_map(function ($record) use ($now) {
    return array_merge($record, [
        'created_at' => $now,
        'updated_at' => $now,
    ]);
}, [
    'basil' => [
        'name' => 'Basilikum',
        'price' => 50,
    ],
    'broccoli' => [
        'name' => 'Brokkoli',
        'price' => 80,
    ],
    'emmentaler' => [
        'name' => 'Emmentaler',
        'price' => 50,
    ],
    'ewes-cheese' => [
        'name' => 'Schafskäse',
        'price' => 80,
    ],
    'fungi' => [
        'name' => 'Pilzen',
        'price' => 80,
    ],
    'garlic' => [
        'name' => 'Knoblauch',
        'price' => 30,
    ],
    'gorgonzola' => [
        'name' => 'Gorgonzola',
        'price' => 60,
    ],
    'gouda' => [
        'name' => 'Gouda',
        'price' => 60,
    ],
    'mozzarella' => [
        'name' => 'Mozzarella',
        'price' => 150,
    ],
    'olive' => [
        'name' => 'Oliven',
        'price' => 50,
    ],
    'spinach' => [
        'name' => 'Spinat',
        'price' => 50,
    ],
    'sweet-pepper' => [
        'name' => 'Paprika',
        'price' => 50,
    ],
    'tomato' => [
        'name' => 'Tomaten',
        'price' => 50,
    ],
]);
