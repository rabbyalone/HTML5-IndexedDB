window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;



$(function () {
 
    initialize();
});


var dba;
var currentRec;
var res;

initialize = function () {
 
    $('#gSave').on('click', function(){
        if ($('#gName').val() == "" ) {           
            alert("You're missing Name");
        }
        else if ($('#gAddress').val() == "") {
            alert("You're missing Adress to Enter");
        }
        else if ($('#gMobile').val() == "") {
            alert("You're missing Mobile Number");
        }
     
        else if ($('input[name=radioName]:checked').val() == "") {
            alert("You're missing your gender");
        }
        else {
            saveg();
        }
    
    });
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
        html += '<td>' + contact.male + '</td></tr>';
       
       
    }

    html = html || '<tr><td colspan="8">No records available</td></tr>';
    $('#con tbody').html(html);
    
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




