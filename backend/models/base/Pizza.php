<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "pizza".
 * Please do not add custom code to this file, as it is supposed to be overriden
 * by the gii model generator. Custom code belongs to app\models\Pizza.
 *
 * @property int $id
 * @property string $name
 * @property int $created_at
 * @property int $updated_at
 *
 * @property \app\models\PizzaTopping[] $pizzaToppings
 * @property \app\models\Topping[] $toppings
 */
abstract class Pizza extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pizza';
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
            [['name'], 'required'],
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
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPizzaToppings()
    {
        return $this->hasMany(\app\models\PizzaTopping::className(), ['pizza_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getToppings()
    {
        return $this->hasMany(\app\models\Topping::className(), ['id' => 'topping_id'])->viaTable('pizza_topping', ['pizza_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\query\PizzaQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\PizzaQuery(get_called_class());
    }
}
