jQuery(document).ready(function($) {
  var url = 'https://arkix-test.herokuapp.com/books/';
  var booksData = {};
  var editForm = $('#book-form').clone()
      .removeClass('create').addClass('update');
  editForm.find('button').html('Update');
  /**
   * Get the books
   */
  function getBooks() {
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function(data) {
        $('.table tbody').empty();
        var books = data.books;
        for (var i = 0; i < books.length; i++) {
          booksData[books[i]._id] = {
            title: books[i].title,
            pages: books[i].pages,
            author: books[i].author
          };
          var row = $('<tr></tr>');
          row.append('<td>' + books[i].title + '</td>');
          row.append('<td>' + books[i].pages + '</td>');
          row.append('<td>' + books[i].author + '</td>');
          row.append('<td><button class="btn btn-success edit" data-book="' +
            books[i]._id + '">Edit</button></td>');
          row.append('<td><button class="btn btn-danger delete" data-book="' +
            books[i]._id + '">Delete</button></td>');
          $('.table tbody').append(row);
        }
      },
      error: function() {
        alert('System Error');
      }
    });
  }

  // Create button event
  $('#book-form.create button').click(function(e) {
    e.preventDefault();
    var title = $('form.create #title').val();
    var pages = $('form.create #pages').val();
    var author = $('form.create #author').val();

    $.ajax({
      url: url,
      type: 'post',
      data: {
        title: title,
        pages: pages,
        author: author
      },
      success: function() {
        $('form.create').trigger('reset');
        alert('Book created!');
        getBooks();
      },
      error: function() {
        alert('System Error');
      }
    });
  });

  // Edit button event
  $('.table').on('click', '.edit', function(e) {
    e.preventDefault();
    var bookId = $(this).attr('data-book');
    editForm.find('#title').val(booksData[bookId].title);
    editForm.find('#pages').val(booksData[bookId].pages);
    editForm.find('#author').val(booksData[bookId].author);
    editForm.find('button').attr('data-book', bookId);
    $.fancybox.open({
      src: editForm,
      type: 'inline'
    });
  });

  // Update button event
  $(document).on('click', '.update button', function(e) {
    e.preventDefault();
    var bookForm = $('form.update');
    var id = bookForm.find('button').attr('data-book');
    var title = bookForm.find('#title').val();
    var pages = bookForm.find('#pages').val();
    var author = bookForm.find('#author').val();
    var data = {
      title: title,
      pages: pages,
      author: author
    };
    $.ajax({
      url: url + id,
      type: 'patch',
      data: data,
      dataType: 'json',
      success: function(data) {
        if (data.message && data.message === 'Book was updated') {
          alert(data.message);
          getBooks();
          $.fancybox.close();
        }
      },
      error: function() {
        alert('System error');
      }
    });
  });

  // Detele button event
  $('.table').on('click', '.delete', function(e) {
    e.preventDefault();
    var question = confirm('Are you sure?');
    if (question) {
      var id = $(this).attr('data-book');
      $.ajax({
        url: url + id,
        type: 'delete',
        success: function(data) {
          if (data.message && data.message === 'Book was deleted') {
            getBooks();
            alert(data.message);
          }
        },
        error: function() {
          alert('System error');
        }
      });
    }
  });

  getBooks();
});
