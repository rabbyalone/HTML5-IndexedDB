window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;



$(function () {

    init();
});


var db;
var currentRecord;
var results;

init = function () {
    $('#btnsave').on('click', save);

    var request = indexedDB.open('student', 1);

    request.onupgradeneeded = function (response) {
        var options = { keypath: 'id', autoIncrement: true };
        response.currentTarget.result.createObjectStore("contacts", options);
    };
    request.onsuccess = function (response) {
        db = request.result;
        display();
    };

    //window.indexedDB.deleteDatabase('Chapter166');
};

save = function () {
    var contact = currentRecord.contact;
    contact.id = $('#txtID').val();
    contact.name = $('#txtName').val();
    contact.roll = $('#rollNumber').val();
    contact.stdClass = $('#stdClass').val();
    contact.section = $('#stdSection option:selected').text();
    contact.gurdian = $('#gurdian').val();
    contact.relation = $('#stdRelation option:selected').text();
    contact.gender = $('input[name=radioName]:checked').val();

    var trans = db.transaction('contacts', 'readwrite');
    var contacts = trans.objectStore("contacts");
    var request = currentRecord.key != null
                   ? contacts.put(contact, currentRecord.key)
                   : contacts.add(contact);

    request.onsuccess = function (response) {
        display();
    };

};



function retrieveFromStorage() {
    var contactsJSON = localStorage.getItem('contacts');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
}

display = function () {
    $('#currentAction').html('Enter Information');
    currentRecord = { key: null, contact: {} };
    displayCurrentRecord();

    var trans = db.transaction('contacts', 'readonly');
    var request = trans.objectStore("contacts").openCursor();
    results = [];

    request.onsuccess = function (response) {
        var cursor = response.target.result;

        if (!cursor) {
            bindToGrid(results);
            return;
        }

        results.push({ key: cursor.key, contact: cursor.value });
        cursor.continue();
    };

}

function bindToGrid(results) {
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var key = results[i].key;
        var contact = results[i].contact;
        html += '<tr><td>' + contact.id + '</td>';
        html += '<td>' + contact.name + '</td>';
        html += '<td>' + contact.roll + '</td>';
        html += '<td>' + contact.stdClass + '</td>';
        html += '<td>' + contact.section + '</td>';
        html += '<td>' + contact.gurdian + '</td>';
        html += '<td>' + contact.relation + '</td>';
        html += '<td>' + contact.gender + '</td></tr>';

        
    }

    html = html || '<tr><td colspan="8">No records available</td></tr>';
    $('#contacts tbody').html(html);
    

}

function displayCurrentRecord() {
    var contact = currentRecord.contact;
    $('#txtID').val(contact.id);
    $('#txtName').val(contact.name);
    $('#rollNumber').val(contact.roll);
    $('#stdClass').val(contact.stdClass);
    $('#gurdian').val(contact.gurdian);
    $('#stdSection option:selected').text(contact.section);
    $('#stdRelation option:selected').text(contact.relation);
    $('input[name=radioName]:checked').val(contact.gender);
}







///Gurdian Section


