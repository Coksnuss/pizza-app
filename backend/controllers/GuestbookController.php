<?php

namespace app\controllers;

use Yii;
use yii\web\ForbiddenHttpException;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;
use app\models\Guestbook;

class GuestbookController extends ActiveController
{
    public $modelClass = Guestbook::class;


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
    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [static::class, 'prepareDataProvider'];

        return $actions;
    }

    /**
     * {@inheritdoc}
     */
    public function checkAccess($action, $model = null, $params = [])
    {
        if (in_array($action, ['index', 'create']) || !Yii::$app->user->getIsGuest()) {
            return;
        }

        throw new ForbiddenHttpException();
    }

    /**
     * Mimics default implementation but applies default order and page size
     */
    public static function prepareDataProvider($action, $filter)
    {
        $requestParams = Yii::$app->getRequest()->getBodyParams();
        if (empty($requestParams)) {
            $requestParams = Yii::$app->getRequest()->getQueryParams();
        }

        /* @var $modelClass \yii\db\BaseActiveRecord */
        $modelClass = $action->modelClass;

        $query = $modelClass::find();
        if (!empty($filter)) {
            $query->andWhere($filter);
        }

        return Yii::createObject([
            'class' => ActiveDataProvider::className(),
            'query' => $query,
            'pagination' => [
                'defaultPageSize' => 3,
                'params' => $requestParams,
            ],
            'sort' => [
                'defaultOrder' => ['authored_at' => SORT_DESC],
                'params' => $requestParams,
            ],
        ]);
    }
}
