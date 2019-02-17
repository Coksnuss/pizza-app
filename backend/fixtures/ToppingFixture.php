<?php

namespace app\fixtures;

use yii\test\ActiveFixture;
use app\models\Topping;

class ToppingFixture extends ActiveFixture
{
    public static $instance;
    public $modelClass = Topping::class;


    public function beforeLoad()
    {
        parent::beforeLoad();
        static::$instance = $this;
    }
}
