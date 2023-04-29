$(document).ready(function() {
  $('#ajax-form button[type="submit"]').click((event) => {
    event.preventDefault()
    // Step 9 and step 10 code goes here

    $.get('./step5', {
      fname: $('#ajax-form [name="fname"]').val(),
      lname: $('#ajax-form [name="lname"]').val(),
    }, (data) => {
      $('#ajax-output').html(data)
    })

    // Step 11 code goes here
    setTimeout(() => {
      $('#ajax-output').html('loaded')
    }, 1000)
    $('#ajax-output').html('loading')
  })
});
