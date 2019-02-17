<?php

namespace app\fixtures;

use yii\test\ActiveFixture;
use app\models\PizzaTopping;

class PizzaToppingFixture extends ActiveFixture
{
    public $modelClass = PizzaTopping::class;
    public $depends = [ToppingFixture::class, PizzaFixture::class];
}
