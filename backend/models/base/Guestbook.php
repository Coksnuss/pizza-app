<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "guestbook".
 * Please do not add custom code to this file, as it is supposed to be overriden
 * by the gii model generator. Custom code belongs to app\models\Guestbook.
 *
 * @property int $id
 * @property string $name
 * @property int $rating
 * @property string $message
 * @property string $visited_date
 * @property int $authored_at
 * @property int $created_at
 * @property int $updated_at
 */
abstract class Guestbook extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'guestbook';
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
            [['name', 'rating', 'message', 'authored_at'], 'required'],
            [['rating', 'authored_at'], 'integer'],
            [['message'], 'string'],
            [['visited_date'], 'safe'],
            [['name'], 'string', 'max' => 255],
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
            'rating' => 'Rating',
            'message' => 'Message',
            'visited_date' => 'Visited Date',
            'authored_at' => 'Authored At',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @inheritdoc
     * @return \app\models\query\GuestbookQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\GuestbookQuery(get_called_class());
    }
}
