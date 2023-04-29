$(document).ready(function() {

  $('#list button[type="submit"]').click((event) => {
    event.preventDefault()
    $.post('./list', {}, (res) => {
      $('#output_list').html(res)
    })
  })

  $('#search button[type="submit"]').click((event) => {
    event.preventDefault()
    $.post('./search', {
      search_id: $('#search [name="search_id"]').val(),
    }, (res) => {
      $('#output_search').html(res)
    })
  })

  $('#add button[type="submit"]').click((event) => {
    event.preventDefault()
    $.post('./add', {
      add_id: $('#add [name="add_id"]').val(),
      add_name: $('#add [name="add_name"]').val(),
    }, (res) => {
      $('#output_add').html(res)
    })
  })

  $('#delete button[type="submit"]').click((event) => {
    event.preventDefault()
    $.post('./delete', {
      delete_id: $('#delete [name="delete_id"]').val(),
    }, (res) => {
      $('#output_delete').html(res)
    })
  })
});
