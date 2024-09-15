// models/todo.js
'use strict';
const { Model, Op } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log('My Todo list \n');

      console.log('Overdue');
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');

      console.log('Due Today');
      const todayTasks = await Todo.dueToday();
      todayTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');

      console.log('Due Later');
      const laterTasks = await Todo.dueLater();
      laterTasks.forEach(task => console.log(task.displayableString()));
      console.log('\n');
    }

    static async overdue() {
      const today = moment().format('YYYY-MM-DD');
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
      });
    }
    static async dueToday() {
      const today = moment().format('YYYY-MM-DD');
      return await Todo.findAll({
        where: {
          dueDate: today,
        },
      });
    }

    static async dueLater() {
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
      const task = await Todo.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? '[x]' : '[ ]';
      let dateDisplay = this.dueDate === moment().format('YYYY-MM-DD') ? '' : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${dateDisplay}`.trim();
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
    }
  );

  return Todo;
};
