const Joi = require("@hapi/joi");
const ErrorException = require("../common/ErrorException");

const validate = function() {
  const { error, value } = validate.apply(this, arguments);

  if (error) {
    // result.error = error.details.map(item => item.message);
    throw new ErrorException(
      error.details.map(item => item.message).join("\n")
    );
  }

  return value;
};

// 登陆验证
const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,12}$/)
    .required()
});

const emailSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  vertifyUrl: Joi.string()
    .uri()
    .required()
});

// 注册验证
const UserSchema = Joi.object().keys({
  username: Joi.string()
    .min(6)
    .max(12)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,12}$/)
    .required()
});

const createTodo = Joi.object().keys({
  text: Joi.string()
    .min(1)
    .max(20)
    .required(),
  completed: Joi.boolean().required(),
  todo_folder_id: Joi.number().required()
});

const editTodo = Joi.object().keys({
  text: Joi.string()
    .min(1)
    .max(20),
  completed: Joi.boolean()
});

const idSchema = Joi.object().keys({
  id: Joi.number().required()
});

const createTodoSchema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(10)
    .required()
});

const _module = {
  loginSchema,
  UserSchema,
  createTodo,
  editTodo,
  idSchema,
  createTodoSchema,
  emailSchema
};

Object.keys(_module).forEach(key => {
  const fn = _module[key].validate;
  _module[key].validate = function() {
    const { error, value } = fn.apply(this, arguments);

    if (error) {
      // result.error = error.details.map(item => item.message);
      throw new ErrorException({
        message: error.details.map(item => item.message).join("\n"),
        type: "VALIDATE_ERROR"
      });
    }

    return value;
  };
});

module.exports = _module;
