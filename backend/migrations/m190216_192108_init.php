<?php

use yii\db\Migration;

/**
 * Class m190216_192108_init
 */
class m190216_192108_init extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'email' => $this->string()->notNull()->unique(),
            'password_hash' => $this->string()->notNull(),
            'api_key' => $this->char(32)->notNull()->unique(),
            'created_at' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->integer()->unsigned()->notNull(),
        ]);

        $this->createTable('{{%pizza}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull()->unique(),
            'created_at' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->integer()->unsigned()->notNull(),
        ]);

        $this->createTable('{{%topping}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull()->unique(),
            'price' => $this->smallInteger()->unsigned()->notNull(),
            'created_at' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->integer()->unsigned()->notNull(),
        ]);

        $this->createTable('{{%pizza_topping}}', [
            'pizza_id' => $this->integer()->notNull(),
            'topping_id' => $this->integer()->notNull(),
            'created_at' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->integer()->unsigned()->notNull(),
            'PRIMARY KEY ([[pizza_id]], [[topping_id]])',
            'FOREIGN KEY([[pizza_id]]) REFERENCES {{%pizza}}([[id]])',
            'FOREIGN KEY([[topping_id]]) REFERENCES {{%topping}}([[id]])',
        ]);

        $this->createTable('{{%guestbook}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'rating' => $this->tinyInteger()->unsigned()->notNull(),
            'message' => $this->text()->notNull(),
            'visited_date' => $this->date(),
            'authored_at' => $this->integer()->unsigned()->notNull(),
            'created_at' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->integer()->unsigned()->notNull(),
        ]);

        $now = time();
        $this->insert('{{%user}}', [
            'username' => 'admin',
            'email' => 'admin@example.com',
            'api_key' => '7Vx0axSE9OlDHlqjxth2c0ZT9XV69sYG',
            'password_hash' => Yii::$app->security->generatePasswordHash('admin'),
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%guestbook}}');
        $this->dropTable('{{%pizza_topping}}');
        $this->dropTable('{{%topping}}');
        $this->dropTable('{{%pizza}}');
        $this->dropTable('{{%user}}');
    }
}
