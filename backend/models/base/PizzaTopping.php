<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "pizza_topping".
 * Please do not add custom code to this file, as it is supposed to be overriden
 * by the gii model generator. Custom code belongs to app\models\PizzaTopping.
 *
 * @property int $pizza_id
 * @property int $topping_id
 * @property int $created_at
 * @property int $updated_at
 *
 * @property \app\models\Topping $topping
 * @property \app\models\Pizza $pizza
 */
abstract class PizzaTopping extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pizza_topping';
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
            [['pizza_id', 'topping_id'], 'required'],
            [['pizza_id', 'topping_id'], 'integer'],
            [['pizza_id', 'topping_id'], 'unique', 'targetAttribute' => ['pizza_id', 'topping_id']],
            [['topping_id'], 'exist', 'skipOnError' => true, 'targetClass' => Topping::className(), 'targetAttribute' => ['topping_id' => 'id']],
            [['pizza_id'], 'exist', 'skipOnError' => true, 'targetClass' => Pizza::className(), 'targetAttribute' => ['pizza_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'pizza_id' => 'Pizza ID',
            'topping_id' => 'Topping ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTopping()
    {
        return $this->hasOne(\app\models\Topping::className(), ['id' => 'topping_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPizza()
    {
        return $this->hasOne(\app\models\Pizza::className(), ['id' => 'pizza_id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\query\PizzaToppingQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\PizzaToppingQuery(get_called_class());
    }
}
