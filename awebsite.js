var numberID = 1000, a, i = 0, array = [];

function createItem() {
    item = {
        myid: numberID,
        myName: document.getElementById("name"),
        mySurname: document.getElementById("surname"),
        myTc: document.getElementById("tc"),
        myPhone: document.getElementById("number")
      
    }

    if (item.myName.value === '' && item.mySurname.value === '' && item.myPhone.value === '' && item.myTc.value === '') { alert("Enter All Options"); }

    else if (item.myName.value === '' || item.mySurname.value === '' || item.myPhone.value === '' || item.myTc.value === '') {

        if (item.myName.value === '') alert("Enter Your Name");
        else if (item.mySurname.value === '') alert("Enter Your Surname");
        else if (item.myTc.value === '') alert("Enter Your N.I.N");
        else if (item.myPhone.value === '') alert("Enter Your Phone");
    }

    else {
        var table = document.getElementById("table-list");
        var row = table.insertRow(table.rows.length);
        a = i; array.push(item);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = numberID;
        row.insertCell(2).innerHTML = array[i].myName.value;
        row.insertCell(3).innerHTML = array[i].mySurname.value;
        row.insertCell(4).innerHTML = array[i].myTc.value;
        row.insertCell(5).innerHTML = array[i].myPhone.value;
        row.insertCell(6).innerHTML = `<i class="fas fa-trash  delete crsr"onclick="deleteRow(this)" data-index=${a} ></i> 
        &nbsp&nbsp <i class="fas fa-edit update crsr" onclick="update(this)" data-index=${a}></i>`

        i++;
        document.getElementById("name").value = ""; document.getElementById("surname").value = "";
        document.getElementById("tc").value = ""; document.getElementById("number").value = "";
        numberID++;
    }
}

function update(event) {
    let row = event.getAttribute("data-index");
    document.getElementById("showId").value = document.getElementById("table-list").rows[row].cells[1].innerHTML;
    document.getElementById("namee").value = document.getElementById("table-list").rows[row].cells[2].innerHTML;
    document.getElementById("surnamee").value = document.getElementById("table-list").rows[row].cells[3].innerHTML;
    document.getElementById("tcc").value = document.getElementById("table-list").rows[row].cells[4].innerHTML;
    document.getElementById("numberr").value = document.getElementById("table-list").rows[row].cells[5].innerHTML;
}

function save() {
    let id = document.getElementById("showId").value;
    var table = document.getElementById("table-list");
    for (let r = 0; r < table.rows.length; r++) {
        if (id == table.rows[r].cells[1].innerHTML) {
            document.getElementById("table-list").rows[r].cells[2].innerHTML = document.getElementById("namee").value;
            document.getElementById("table-list").rows[r].cells[3].innerHTML = document.getElementById("surnamee").value;
            document.getElementById("table-list").rows[r].cells[4].innerHTML = document.getElementById("tcc").value;
            document.getElementById("table-list").rows[r].cells[5].innerHTML = document.getElementById("numberr").value;
        }
    }
    document.getElementById("namee").value = ""; document.getElementById("surnamee").value = "";
    document.getElementById("tcc").value = ""; document.getElementById("numberr").value = "";
}

function deleteThisItem() {
    let id = document.getElementById("noandid").value;
    var table = document.getElementById("table-list");
    var deleteButton = document.getElementsByClassName("delete");  //   classı delete olanları dizi şeklinde getirir.
    var updateButton = document.getElementsByClassName("update");

    for (let r = 0; r < table.rows.length; r++) {
        if (id == table.rows[r].cells[1].innerHTML) {
            var rows = deleteButton[r].getAttribute("data-index");
            table.deleteRow(r);
            array.splice(r, 1);
            i--;
            for (let r = 0; r < table.rows.length; r++) { table.rows[r].cells[0].innerHTML = r + 1; }

            for (let x = 0; x < deleteButton.length; x++) { //Veri silmelerini düzenleyen döngü


                var value = deleteButton[x].getAttribute("data-index");
                if (value > rows) {
                    deleteButton[x].setAttribute("data-index", value - 1);
                    updateButton[x].setAttribute("data-index", value - 1);

                }
            }
        }
    }
}

function ID() { numberID++; document.getElementById("idData").innerHTML = numberID; }

function deleteRowAll() {
    if (confirm("Are you sure you want to delete all users?")) { document.getElementById("table-list").innerHTML = " "; } i = 0;
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'exceldata.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}


function deleteRow(event) {
    let rows = event.getAttribute("data-index");
    var table = document.getElementById("table-list");
    table.deleteRow(rows);
    array.splice(rows, 1);
    i--;
    for (let r = 0; r < table.rows.length; r++) { table.rows[r].cells[0].innerHTML = r + 1; } //No ları sıra ile yazan döngü
    var deleteButton = document.getElementsByClassName("delete");  //   classı delete olanları dizi şeklinde getirir.
    var updateButton = document.getElementsByClassName("update");


    for (let x = 0; x < deleteButton.length; x++) { //Veri silmelerini düzenleyen döngü
        var value = deleteButton[x].getAttribute("data-index");
        if (value > rows) {
            deleteButton[x].setAttribute("data-index", value - 1);
            updateButton[x].setAttribute("data-index", value - 1);
        }
    }
}

