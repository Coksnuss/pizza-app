<?php

namespace app\fixtures;

use yii\test\ActiveFixture;
use app\models\Pizza;

class PizzaFixture extends ActiveFixture
{
    public static $instance;
    public $modelClass = Pizza::class;


    public function beforeLoad()
    {
        parent::beforeLoad();
        static::$instance = $this;
    }
}
