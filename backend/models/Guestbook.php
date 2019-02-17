<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "guestbook".
 *
 * Check the base class at app\models\base\Guestbook in order to
 * see the column names and relations.
 */
class Guestbook extends \app\models\base\Guestbook
{
    const RATINGS = [
        1 => 'Sehr gut',
        2 => 'Gut',
        3 => 'Befriedigend',
        4 => 'Ausreichend',
        5 => 'Mangelhaft',
    ];


    /**
     * @{inheritdoc}
     */
    public function rules()
    {
        return array_merge([
            [['authored_at'], 'default', 'value' => function () { return time(); }],
            [['name', 'message'], 'trim'],
        ], parent::rules(), [
            ['name', 'string', 'min' => 3],
            ['rating', 'integer', 'min' => 1, 'max' => 5],
            ['message', 'string', 'min' => 10],
            [
                ['visited_date'], 'match',
                'pattern' => '/^\d{2}\.\d{2}\.\d{4}$/',
                'message' => '{attribute} muss im Format dd.mm.YYYY angegeben werden.',
            ],
            [
                ['visited_date'], 'date',
                'format' => 'php:d.m.Y',
                'min' => date('d.m.Y', strtotime('-3 months')),
                'max' => date('d.m.Y'),
                'tooSmall' => 'Ihr Besuch ist länger als drei Monate her.',
                'timestampAttribute' => 'visited_date',
                'timestampAttributeFormat' => 'php:d.m.Y',
                'timestampAttributeTimeZone' => Yii::$app->timeZone,
            ],
        ]);
    }

    /**
     * @{inheritdoc}
     */
    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_DEFAULT] = array_replace(
            $scenarios[self::SCENARIO_DEFAULT],
            [
                'authored_at' => '!authored_at',
            ]);

        return $scenarios;
    }

    /**
     * @{inheritdoc}
     */
    public function fields()
    {
        return [
            'id', 'name', 'rating',
            'ratingText' => [static::class, 'resolveRating'],
            'message', 'visited_date', 'authored_at',
        ];
    }

    protected static function resolveRating($model)
    {
        if (isset(self::RATINGS[$model->rating])) {
            return self::RATINGS[$model->rating];
        }

        return 'Unbekannt';
    }
}
