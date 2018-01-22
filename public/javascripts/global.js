var authorListData = [];

$(document).ready(function() {

    populateTable();

});

$('#authorList table tbody').on('click', 'td a.linkshowauthor', showAuthorInfo);

$('#btnAddAuthor').on('click', addAuthor);

$('#authorList table tbody').on('click', 'td a.linkdeleteauthor', deleteAuthor);

function populateTable() {

    var tableContent = '';

    $.getJSON( '/users/authorslist', function( data ) {

        authorListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowauthor" rel="' + this.author + '">' + this.author + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteauthor" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#authorList table tbody').html(tableContent);
    });
};

// Show Author Info
function showAuthorInfo(event) {

    event.preventDefault();

    var thisAuthorName = $(this).attr('rel');

    var arrayPosition = authorListData.map(function(arrayItem) { return arrayItem.author; }).indexOf(thisAuthorName);

     
    var thisAuthorObject = authorListData[arrayPosition];

    $('#authorInfoName').text(thisAuthorObject.author);
    $('#authorInfoAction').text(thisAuthorObject.action);
    $('#authorInfoObject').text(thisAuthorObject.object);
 
 };

 // Add Author
function addAuthor(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addAuthor input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    
    if(errorCount === 0) {

        var newAuthor = {
            'author': $('#addAuthor fieldset input#inputAuthorName').val(),
            'action': $('#addAuthor fieldset input#inputAuthorAction').val(),
            'object': $('#addAuthor fieldset input#inputAuthorObject').val(),
        }

        $.ajax({
            type: 'POST',
            data: newAuthor,
            url: '/users/addauthor',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('#addAuthor fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};
function deleteAuthor(event) {

    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this author?');

    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/users/deleteauthor/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            populateTable();
        });
    }
    else {
        return false;
    }
}; 
