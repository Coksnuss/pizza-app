<?php

$now = time();

return array_map(function ($record) use ($now) {
    return array_merge($record, [
        'visited_date' => date('Y-m-d', $record['authored_at'] - mt_rand(1,5) * 3600 * 24),
        'created_at' => $now,
        'updated_at' => $now,
    ]);
}, [
        [
            'name' => 'Hans Mustermann',
            'rating' => 5,
            'message' => 'Alles toll! Essen war lecker!',
            'authored_at' => strtotime('2019-05-11 12:40:00'),
        ],
        [
            'name' => 'Riccardo De Fuente',
            'rating' => 4,
            'message' => 'Fast perfekt. Austern waren leider aus!',
            'authored_at' => strtotime('2019-05-09 21:45'),
        ],
        [
            'name' => 'Dirk Förster',
            'rating' => 3,
            'message' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            'authored_at' => strtotime('-120 weeks 2 days 5 hours', $now),
        ],
        [
            'name' => 'Manuela',
            'rating' => 1,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Michelle',
            'rating' => 2,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Gino',
            'rating' => 3,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Torsten',
            'rating' => 4,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Silke',
            'rating' => 5,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Christine',
            'rating' => 5,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Michael',
            'rating' => 5,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
        [
            'name' => 'Jósa',
            'rating' => 5,
            'message' => 'Ganz ok',
            'authored_at' => strtotime('-156 weeks 12 days 3 minutes 3 seconds', $now),
        ],
]);
