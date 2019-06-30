export const apiBaseUrl = '/api';

export const timestampToDateTime = timestamp => {
    const date = (new Date(timestamp)).toISOString();
    return [date.slice(0, 10), date.slice(11, 19)];
};

export const resetFormErrors = function (id) {
  $(`#${id} .uk-form-danger + .uk-text-danger`).remove();
  $(`#${id} .uk-form-danger`).removeClass('uk-form-danger');
};

export const displayFormError = function (id, name, message) {
  let selector = `#${id} [name={{name}}]`.replace('{{name}}', name),
      inputField = $(selector),
      errorP = inputField.siblings('.uk-text-danger');

  if (errorP.length === 0) {
    errorP = $('<p></p>').addClass('uk-margin-remove-top uk-text-danger').insertAfter(inputField);
  }

  inputField.addClass('uk-form-danger');
  errorP.text(message);
};
