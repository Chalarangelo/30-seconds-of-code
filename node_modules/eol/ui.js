/* global eol */
$('.js-converter__form').on('submit', function(e) {
  e.preventDefault()
  var $form = $(this)
  var $output = $form.find('.js-converter__output')
  var method = $form.find('.js-converter__method')[0].value
  var text = $form.find('.js-converter__input')[0].value
  $output.text(eol[method](text))
});
