<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "topping".
 *
 * Check the base class at app\models\base\Topping in order to
 * see the column names and relations.
 */
class Topping extends \app\models\base\Topping
{
    /**
     * {@inheritdoc}
     */
    public function fields()
    {
        return ['id', 'name', 'price'];
    }

    /**
     * {@inheritdoc}
     */
    public function extraFields()
    {
        return ['created_at', 'updated_at'];
    }
}
