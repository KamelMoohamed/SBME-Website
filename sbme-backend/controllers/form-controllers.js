const Form = require("../models/form");
const Email = require("../models/email");
const HttpError = require("../models/http-error");

const createForm = async (req, res, next) => {
  const { name, email, title, description, image, questions } = req.body;

  let existingUser;
  try {
    existingUser = await Email.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Form isn't valid, please try again.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "User isn't in SBME, please choose differenct Account.",
      422
    );
    return next(error);
  }

  const createdForm = new Form({
    user: name,
    email,
    title,
    description,
    image,
    questions,
  });

  try {
    await createdForm.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ form: createdForm.toObject({ getters: true }) });
};

const getFormById = async (req, res, next) => {
  const formId = req.params.pid;

  let form;
  try {
    form = await Form.findById(formId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!form) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ form: form.toObject({ getters: true }) });
};

const updateFrom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, image, questions } = req.body;
  const formId = req.params.pid;

  let form;
  try {
    form = await Form.findById(formId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  form.title = title;
  form.description = description;
  form.image = image;
  form.questions = questions;

  try {
    await form.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update form.",
      500
    );
    return next(error);
  }

  res.status(200).json({ form: form.toObject({ getters: true }) });
};

const deleteForm = async (req, res, next) => {
  const formId = req.params.pid;

  let form;
  try {
    form = await Form.findById(formId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the Form.",
      500
    );
    return next(error);
  }

  try {
    await form.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the Form.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Form." });
};

exports.createForm = createForm;
exports.getFormById = getFormById;
exports.updateFrom = updateFrom;
exports.deleteForm = deleteForm;
