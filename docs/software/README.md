# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `DBLabs` ;

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBLabs` DEFAULT CHARACTER SET utf8 ;
USE `DBLabs` ;

-- -----------------------------------------------------
-- Table `DBLabs`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Role` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`User` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Role_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `DBLabs`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Quiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Quiz` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Quiz` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Question` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `number` INT UNSIGNED NOT NULL,
  `description` VARCHAR(100) NULL,
  `Quiz_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Question_Quiz1_idx` (`Quiz_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`Quiz_id`)
    REFERENCES `DBLabs`.`Quiz` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Answer` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(100) NULL,
  `option` VARCHAR(45) NULL,
  `file` MEDIUMBLOB NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Answer_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Respondent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Respondent` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Respondent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Answer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Respondent_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Respondent_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Respondent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `DBLabs`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Respondent_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Option`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Option` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Option` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `number` INT UNSIGNED NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`SelectedOption`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`SelectedOption` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`SelectedOption` (
  `Answer_id` INT NOT NULL,
  `Option_id` INT NOT NULL,
  INDEX `fk_SelectedOption_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  INDEX `fk_SelectedOption_Option1_idx` (`Option_id` ASC) VISIBLE,
  CONSTRAINT `fk_SelectedOption_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SelectedOption_Option1`
    FOREIGN KEY (`Option_id`)
    REFERENCES `DBLabs`.`Option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DBLabs`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `DBLabs`;
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Respondent', 'A user that taking a survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Editor', 'The user who edits the survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Admin', 'The user is the owner of the survey');

COMMIT;
```

## RESTfull сервіс для управління даними

### Вхідний файл програми

```js
require('dotenv').config();
const express = require('express');
const { pool } = require('./database');
const { userRouter } = require('./routes/userRoutes');
const { quizRouter } = require('./routes/quizRoutes');
const { questionRouter } = require('./routes/questionRoutes');
const { roleRouter } = require('./routes/roleRoutes');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/users', userRouter);
app.use('/quizzes', quizRouter);
app.use('/questions', questionRouter);
app.use('/roles', roleRouter);

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
})

const closeServer = async () => {
  console.log('\nStarting the process of closing the app...');
  try {
    await pool.end();
    server.close(() => {
      console.log('App has been closed');
      process.exit();
    });
  } catch (err) {
    console.error('Error during closing the app: ' + err.message);
    process.exit(1);
  }
};

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
```
### Файл для встановлення доступу до бази даних

```js
require('dotenv').config();
const mySql = require('mysql2/promise');

const access = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const pool = mySql.createPool(access);

module.exports = { pool };
```

### Базовий клас з методами присутніми для управління даними всіх таблиць

```js
const { pool } = require('../database');

class Entity {
  constructor() {
    this.name = this.constructor.name;
  }

  static async getAll() {
    const sql = `
    SELECT *
    FROM ${this.name.toLowerCase()};
    `;

    try {
      const connection = await pool.getConnection();
      const [entityRecord] = await connection.execute(sql);
      connection.release();
      return entityRecord;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    const sql = `
    SELECT *
    FROM ${this.name.toLowerCase()}
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      const [entityRecord] = await connection.execute(sql);
      connection.release();
      return entityRecord;
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    const entityRecord = await this.getById(id);
    const sql = `
    DELETE FROM ${this.name.toLowerCase()}
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql);
      connection.release();
    } catch (err) {
      throw err;
    }

    return entityRecord;
  }
}

module.exports = Entity;
```
### CRUD для користувачів

#### Маршрути

```js
const express = require('express');
const {
  getAllUsers,
  getUsersByRole,
  getUserById,
  getUserByNickname,
  addUser,
  updateUserInfo,
  deleteUser,
} = require('../controllers/userController');
const userRouter = new express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', addUser);
userRouter.get('/nickname/:nickname', getUserByNickname);
userRouter.get('/role/:id', getUsersByRole);

userRouter
  .route('/:id')
  .get(getUserById)
  .patch(updateUserInfo)
  .delete(deleteUser);

module.exports = { userRouter };
```

#### Контролер

```js
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const users = await User.getWithTheSameRole(roleId);
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getUserByNickname = async (req, res) => {
  try {
    const userNickname = req.params.nickname.toLowerCase();
    const user = await User.getByNickname(userNickname);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const addedUser = await User.create(userInfo);
    res.status(201).json({ addedUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const newUserInfo = req.body;
    const updatedUserInfo = await User.updateById(userId, newUserInfo);
    res.status(200).json({ updatedUserInfo });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.deleteById(userId);
    res.status(200).json({ deletedUser });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUsersByRole,
  getUserById,
  getUserByNickname,
  addUser,
  updateUserInfo,
  deleteUser,
};
```

#### Модуль
```js
const { pool } = require('../database');
const Entity = require('./Entity');

class User extends Entity {
  static async getWithTheSameRole(roleId) {
    const sql = `
    SELECT *
    FROM user
    INNER JOIN role
    ON user.Role_id = role.id
    WHERE role.id = ${roleId};
    `;

    try {
      const connection = await pool.getConnection();
      const [users] = await connection.execute(sql);
      connection.release();
      return users;
    } catch (err) {
      throw err;
    }
  }

  static async getByNickname(nickname) {
    const sql = `
    SELECT *
    FROM user
    WHERE nickname = '${nickname}';
    `;

    try {
      const connection = await pool.getConnection();
      const user = await connection.execute(sql);
      connection.release();
      return user[0];
    } catch (err) {
      throw err;
    }
  }

  static async create({ name, surname, nickname, password, email, picture = null, Role_id = 1 }) {
    const sql = `
    INSERT INTO user(
      password,
      name,
      surname,
      nickname,
      email,
      picture,
      Role_id
    )
    VALUES(
      '${password}',
      '${name}',
      '${surname}',
      '${nickname.toLowerCase()}',
      '${email}',
      '${picture}',
      '${Role_id}'
    )
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql);
      const addedUserId = creationReport[0].insertId;
      connection.release();
      return this.getById(addedUserId);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, { name, surname, nickname, password, email, picture = null }) {
    const sql = `
    UPDATE user
    SET
      password = '${password}',
      name = '${name}',
      surname = '${surname}',
      nickname = '${nickname.toLowerCase()}',
      email = '${email}',
      picture = '${picture}'
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql);
      connection.release();
      return this.getById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
```

### CRUD для опитування

#### Маршрути

```js
const express = require('express');
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  changeQuizMetadata,
  deleteQuiz
} = require('../controllers/quizController');
const quizRouter = new express.Router();

quizRouter.get('/', getAllQuizzes);
quizRouter.post('/', createQuiz);

quizRouter
  .route('/:id')
  .get(getQuizById)
  .patch(changeQuizMetadata)
  .delete(deleteQuiz);

module.exports = { quizRouter };
```

#### Контролер

```js
const Quiz = require('../models/Quiz');

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.getAll();
    res.status(200).json({ quizzes });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.getById(quizId);
    res.status(200).json({ quiz });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    const newQuiz = await Quiz.create(quizData);
    res.status(201).json({ newQuiz });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const changeQuizMetadata = async (req, res) => {
  try {
    const quizId = req.params.id;
    const newData = req.body;
    const changedData = await Quiz.updateById(quizId, newData);
    res.status(200).json({ changedData });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const deletedQuiz = await Quiz.deleteById(quizId);
    res.status(200).json({ deletedQuiz });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  changeQuizMetadata,
  deleteQuiz,
};
```

#### Модуль

```js
const { pool } = require('../database');
const Entity = require('./Entity');

class Quiz extends Entity {
  static async create({ name, description }) {
    const sql = `
    INSERT INTO quiz(
      name,
      description
    )
    VALUES(
      '${name}',
      '${description}'
    )
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql);
      const addedQuizId = creationReport[0].insertId;
      connection.release();
      return this.getById(addedQuizId);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, { name, description }) {
    const sql = `
    UPDATE quiz
    SET
      name = '${name}',
      description = '${description}'
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql);
      connection.release();
      return this.getById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Quiz;
```

### CRUD для запитання

#### Маршрути

```js
const express = require('express');
const {
  getAllQuestions,
  getQuestionById,
  getQuestionsByQuizId,
  addQuestion,
  editQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const questionRouter = new express.Router();

questionRouter.get('/', getAllQuestions);
questionRouter.get('/quiz/:id', getQuestionsByQuizId);
questionRouter.post('/', addQuestion);

questionRouter
  .route('/:id')
  .get(getQuestionById)
  .patch(editQuestion)
  .delete(deleteQuestion);

module.exports = { questionRouter };
```

#### Контролер

```js
const Question = require('../models/Question');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.getAll();
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.getById(questionId);
    res.status(200).json({ question });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getQuestionsByQuizId = async (req, res) => {
  try {
    const quizId = req.params.id;
    const questions = await Question.getAllInRequiredQuiz(quizId);
    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = await Question.create(questionData);
    res.status(201).json({ newQuestion });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const editQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const editedData = req.body;
    const editedQuestion = await Question.updateById(questionId, editedData);
    res.status(200).json({ editedQuestion });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await Question.deleteById(questionId);
    res.status(200).json({ deletedQuestion });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionsByQuizId,
  addQuestion,
  editQuestion,
  deleteQuestion,
};
```

#### Модуль

```js
const { pool } = require('../database');
const Entity = require('./Entity');

class Quiz extends Entity {
  static async create({ name, description }) {
    const sql = `
    INSERT INTO quiz(
      name,
      description
    )
    VALUES(
      '${name}',
      '${description}'
    )
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql);
      const addedQuizId = creationReport[0].insertId;
      connection.release();
      return this.getById(addedQuizId);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, { name, description }) {
    const sql = `
    UPDATE quiz
    SET
      name = '${name}',
      description = '${description}'
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql);
      connection.release();
      return this.getById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Quiz;
```

### CRUD для ролей

#### Маршрути

```js
const express = require('express');
const {
  getAllRoles,
  getRoleById,
  addRole,
  changeRoleInfo,
  deleteRole
} = require('../controllers/roleController');
const roleRouter = new express.Router();

roleRouter.get('/', getAllRoles);
roleRouter.post('/', addRole);

roleRouter
  .route('/:id')
  .get(getRoleById)
  .patch(changeRoleInfo)
  .delete(deleteRole);

module.exports = { roleRouter };
```

#### Контролер

```js
const Role = require('../models/Role');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.getAll();
    res.status(200).json({ roles });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.getById(roleId);
    res.status(200).json({ role });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const addRole = async (req, res) => {
  try {
    const roleData = req.body;
    const newRole = await Role.create(roleData);
    res.status(201).json({ newRole });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const changeRoleInfo = async (req, res) => {
  try {
    const roleId = req.params.id;
    const newData = req.body;
    const changedRole = await Role.updateById(roleId, newData);
    res.status(200).json({ changedRole });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.deleteById(roleId);
    res.status(200).json({ deletedRole });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  addRole,
  changeRoleInfo,
  deleteRole,
};
```

#### Модуль

```js
const { pool } = require('../database');
const Entity = require('./Entity');

class Role extends Entity {
  static async create({ name, description }) {
    const sql = `
    INSERT INTO role(
      name,
      description
    )
    VALUES(
      '${name}',
      '${description}'
    )
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql);
      const addedRoleId = creationReport[0].insertId;
      connection.release();
      return this.getById(addedRoleId);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, { name, description }) {
    const sql = `
    UPDATE role
    SET
      name = '${name}',
      description = '${description}'
    WHERE id = ${id};
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql);
      connection.release();
      return this.getById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Role;
```
