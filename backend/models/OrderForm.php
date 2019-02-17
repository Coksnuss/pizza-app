<?php

namespace app\models;

use yii\base\Model;

class OrderForm extends Model
{
    public $name;
    public $street;
    public $city;
    public $message;


    public function rules()
    {
        return [
            [['name', 'street', 'city'], 'required'],
            [['name', 'street', 'city', 'message'], 'trim'],
            [['name', 'street'], 'string', 'min' => 3],
            ['city', 'match', 'pattern' => '/^\d{5}.{4,}$/'],
        ];
    }
}
