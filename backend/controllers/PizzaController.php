<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Pizza;

class PizzaController extends ActiveController
{
    public $modelClass = Pizza::class;


    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'cors' => \yii\filters\Cors::class,
        ]);
    }
}
