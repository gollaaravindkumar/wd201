// models/todo.js
'use strict';
const { Model, Op } = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log('My Todo list \n');

      console.log('Overdue');
      // FILL IN HERE
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');

      console.log('Due Today');
      // FILL IN HERE
      const todayTasks = await Todo.dueToday();
      todayTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');

      console.log('Due Later');
      // FILL IN HERE
      const laterTasks = await Todo.dueLater();
      laterTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = moment().format('YYYY-MM-DD');
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
          completed: false,
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY\
      const today = moment().format('YYYY-MM-DD');
      return await Todo.findAll({
        where: {
          dueDate: today,
          },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = moment().format('YYYY-MM-DD');
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const task = await Todo.findByPk(id);
      if(task) {
        task.completed = true;
        await task.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? '[x]' : '[ ]';
      let dateDisplay = this.dueDate === moment().format('YYYY-MM-DD') ? '' : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    },
  );
  return Todo;
};
