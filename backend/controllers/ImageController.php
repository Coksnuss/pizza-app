<?php

namespace app\controllers;

use Yii;
use yii\helpers\Inflector;
use yii\helpers\FileHelper;
use app\models\Pizza;

class ImageController extends \yii\web\Controller
{
    public $defaultAction = 'pizza';


    public function actionPizza($id)
    {
        $pizza = Pizza::findOne($id);

        if (!isset($pizza)) {
            throw new \yii\web\NotFoundHttpException();
        }

        $imageName = Inflector::slug($pizza->name);
        $imagePath = Yii::getAlias(sprintf('@app/assets/images/%s.png', $imageName));

        if (!is_file($imagePath)) {
            $imagePath = Yii::getAlias('@app/assets/images/placeholder.png');
        }

        return Yii::$app->response->sendFile($imagePath, null, [
            'mimeType' => FileHelper::getMimeType($imagePath),
            'inline' => true,
        ]);
    }
}
