<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\OrderForm;

class OrderController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'cors' => \yii\filters\Cors::class,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    protected function verbs()
    {
        return [
            'create' => ['POST'],
        ];
    }

    public function actionCreate()
    {
        $model = new OrderForm();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        $model->validate();

        return $model;
    }
}
