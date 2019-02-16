<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "pizza".
 *
 * Check the base class at app\models\base\Pizza in order to
 * see the column names and relations.
 */
class Pizza extends \app\models\base\Pizza
{
    const BASE_PRICE = 400;


    /**
     * {@inheritdoc}
     */
    public function fields()
    {
        return ['id', 'name', 'price', 'toppings'];
    }

    /**
     * {@inheritdoc}
     */
    public function extraFields()
    {
        return ['created_at', 'updated_at'];
    }

    private $_price;
    public function getPrice()
    {
        if (!isset($this->_price)) {
            $this->_price = 0;
            foreach ($this->toppings as $topping) {
                $this->_price += $topping->price;
            }
        }

        return static::BASE_PRICE + $this->_price;
    }
}
