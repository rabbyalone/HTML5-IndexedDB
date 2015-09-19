window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;



$(function () {

    init();
    initialize();
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
        html += '<td>' + contact.gender + '</td>';

        html += '<td><a class="edit" href="javascript:void(0)" data-key=' + key + '>Edit</a></td>';
        html += '<td><a class="delete" href="javascript:void(0)" data-key=' + key + '>Delete</a></td></tr>';
    }

    html = html || '<tr><td colspan="8">No records available</td></tr>';
    $('#contacts tbody').html(html);
    $('#contacts a.edit').on('click', loadContact);
    $('#contacts a.delete').on('click', deleteRecord);


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

deleteRecord = function () {
    var key = parseInt($(this).attr('data-key'));
    var trans = db.transaction('contacts', 'readwrite');
    var store = trans.objectStore("contacts");
    var request = store.delete(key);

    request.onsuccess = function (response) {
        currentRecord = { key: key, contact: response.target.result }
        $("#contacts")

    };




};

loadContact = function () {
    var key = parseInt($(this).attr('data-key'));
    var trans = db.transaction('contacts', 'readonly');
    var store = trans.objectStore("contacts");
    var request = store.get(key);

    request.onsuccess = function (response) {

        $('#currentAction').html('Edit Information');
        currentRecord = { key: key, contact: response.target.result }
        displayCurrentRecord();
    };

};



///Gurdian Section


var dba;
var currentRec;
var res;

initialize = function () {
    $('#gSave').on('click', saveg);

    var request = indexedDB.open('gurdian1', 1);

    request.onupgradeneeded = function (response) {
        var options = { keypath: 'id', autoIncrement: true };
        response.currentTarget.result.createObjectStore("con", options);
    };
    request.onsuccess = function (response) {
        dba = request.result;
        displayg();
    };

    //window.indexedDB.deleteDatabase('Chapter166');
};

saveg = function () {
    var contact = currentRec.contact;
    contact.name = $('#gName').val();
    contact.address = $('#gAddress').val();
    contact.email = $('#gEmail').val();
    contact.mobile = $('#gMobile').val();
    contact.rel = $('#stdRel option:selected').text();
    contact.male = $('input[name=radioName]:checked').val();

    var trans = dba.transaction('con', 'readwrite');
    var contacts = trans.objectStore("con");
    var request = currentRec.key != null
                   ? contacts.put(contact, currentRec.key)
                   : contacts.add(contact);

    request.onsuccess = function (response) {
        displayg();
    };

};



function retrieveFromStorage() {
    var contactsJSON = localStorage.getItem('con');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
}

displayg = function () {
    $('#currentAction').html('Enter Information');
    currentRec = { key: null, contact: {} };
    displaycurrentRec();

    var trans = dba.transaction('con', 'readonly');
    var request = trans.objectStore("con").openCursor();
    res = [];

    request.onsuccess = function (response) {
        var cursor = response.target.result;

        if (!cursor) {
            bindToGridg(res);
            return;
        }

        res.push({ key: cursor.key, contact: cursor.value });
        cursor.continue();
    };

}

function bindToGridg(res) {
    var html = '';
    for (var i = 0; i < res.length; i++) {
        var key = res[i].key;
        var contact = res[i].contact;
        html += '<tr><td>' + contact.name + '</td>';
        html += '<td>' + contact.address + '</td>';
        html += '<td>' + contact.email + '</td>';
        html += '<td>' + contact.mobile + '</td>';
        html += '<td>' + contact.rel + '</td>';
        html += '<td>' + contact.male + '</td>';
       
        html += '<td><a class="edit" href="javascript:void(0)" data-key=' + key + '>Edit</a></td>';
        html += '<td><a class="delete" href="javascript:void(0)" data-key=' + key + '>Delete</a></td></tr>';
    }

    html = html || '<tr><td colspan="8">No records available</td></tr>';
    $('#con tbody').html(html);
    $('#con a.edit').on('click', loadContactg);
    $('#con a.delete').on('click', deleteRecordg);


}

function displaycurrentRec() {
    var contact = currentRec.contact;
    $('#gName').val(contact.name);
    $('#gAddress').val(contact.address);
    $('#gEmail').val(contact.roll);
    $('#gMobile').val(contact.stdClass);
    $('#stdRel option:selected').text(contact.rel);
    $('input[name=radioName]:checked').val(contact.male);
}

deleteRecordg = function () {
    var key = parseInt($(this).attr('data-key'));
    var trans = dba.transaction('con', 'readwrite');
    var store = trans.objectStore("con");
    var request = store.delete(key);

    request.onsuccess = function (response) {
        currentRec = { key: key, contact: response.target.result }
        

    };




};

loadContactg = function () {
    var key = parseInt($(this).attr('data-key'));
    var trans = dba.transaction('con', 'readonly');
    var store = trans.objectStore("con");
    var request = store.get(key);

    request.onsuccess = function (response) {

        $('#currentAction').html('Edit Information');
        currentRec = { key: key, contact: response.target.result }
        displaycurrentRec();
    };

};


