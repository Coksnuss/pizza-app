<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "topping".
 * Please do not add custom code to this file, as it is supposed to be overriden
 * by the gii model generator. Custom code belongs to app\models\Topping.
 *
 * @property int $id
 * @property string $name
 * @property int $price
 * @property int $created_at
 * @property int $updated_at
 *
 * @property \app\models\PizzaTopping[] $pizzaToppings
 * @property \app\models\Pizza[] $pizzas
 */
abstract class Topping extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'topping';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::class,
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'price'], 'required'],
            [['price'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'price' => 'Price',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPizzaToppings()
    {
        return $this->hasMany(\app\models\PizzaTopping::className(), ['topping_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPizzas()
    {
        return $this->hasMany(\app\models\Pizza::className(), ['id' => 'pizza_id'])->viaTable('pizza_topping', ['topping_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\query\ToppingQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\ToppingQuery(get_called_class());
    }
}
