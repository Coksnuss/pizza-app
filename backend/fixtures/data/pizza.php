<?php

$now = time();

return array_map(function ($record) use ($now) {
    return array_merge($record, [
        'created_at' => $now,
        'updated_at' => $now,
    ]);
}, [
    'bread' => ['name' => 'Pizzabrot'],
    'margarita' => ['name' => 'Margarita'],
    'mozzarella' => ['name' => 'Mozzarella'],
    'fungi' => ['name' => 'Fungi'],
    'vegetable' => ['name' => 'Gemüse Spezial'],
    'gonza' => ['name' => 'Gonza'],
    'quattro-fromaggi' => ['name' => 'Vierkäsezeiten'],
]);
