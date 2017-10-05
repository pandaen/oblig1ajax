class UIHandler {
    constructor() {
        this.table = null;
    }

    initializeTable() {
        this.table = document.createElement("table");
        //  this.table.setAttribute('border', '0');

        let tableRow = document.createElement("tr");

        let newCell0 = document.createElement("th");
        let newCell1 = document.createElement("th");
        let newCell2 = document.createElement("th");
        let newCell3 = document.createElement("th");

        tableRow.appendChild(newCell0);
        tableRow.appendChild(newCell1);
        tableRow.appendChild(newCell2);
        tableRow.appendChild(newCell3);

        let firstName = document.createTextNode("Firstname");
        let lastName = document.createTextNode("Lastname");
        let address = document.createTextNode("Address");
        let phonenr = document.createTextNode("Phone");

        newCell0.appendChild(firstName);
        newCell1.appendChild(lastName);
        newCell2.appendChild(address);
        newCell3.appendChild(phonenr);

        this.table.appendChild(tableRow);

        let addMemberBtn = document.getElementById("addMemberBtn");
        document.getElementsByTagName("body")[0].insertBefore(this.table, addMemberBtn);
    }


    refreshTable(memberdata,n) {
        if (memberdata.constructor !== Array) {
            memberdata = [memberdata];
        }

        if(n ===0){

            this.table.deleteRow(this.table.rows.length-1);
        }

        for (let i = 0; i < memberdata.length; i++) {
            let tableRow = document.createElement("tr");
            tableRow.setAttribute("id", memberdata[i].memberId);
            let newCell0 = document.createElement("td");
            let newCell1 = document.createElement("td");
            let newCell2 = document.createElement("td");
            let newCell3 = document.createElement("td");
            let newCell4 = document.createElement("td");
            let newCell5 = document.createElement("td");
            let newCell6 = document.createElement("td");
            newCell6.setAttribute("style", "visibility:hidden;");

            tableRow.appendChild(newCell0);
            tableRow.appendChild(newCell1);
            tableRow.appendChild(newCell2);
            tableRow.appendChild(newCell3);
            tableRow.appendChild(newCell4);
            tableRow.appendChild(newCell5);
            tableRow.appendChild(newCell6);

            let firstName = document.createTextNode(memberdata[i].firstname);
            let lastName = document.createTextNode(memberdata[i].lastname);
            let address = document.createTextNode(memberdata[i].address);
            let phoneNr = document.createTextNode(memberdata[i].phone);
            let delBtn = document.createElement("input");
            delBtn.setAttribute("type", "button");
            delBtn.setAttribute("value", "Delete");
            delBtn.addEventListener('click', function () {
                ctrl.removeMemberClickBtn(this.parentNode.parentNode.id);
            });

            let editBtn = document.createElement("input");
            editBtn.setAttribute("type", "button");
            editBtn.setAttribute("value", "Edit");
            editBtn.addEventListener('click', function () {
                ctrl.editMemberModus(1, this.parentNode.parentNode.id);                              // calls through mainController, unnecessary but work!
            });

            let memberID = document.createTextNode(memberdata[i].memberId);

            newCell0.appendChild(firstName);
            newCell1.appendChild(lastName);
            newCell2.appendChild(address);
            newCell3.appendChild(phoneNr);
            newCell4.appendChild(delBtn);
            newCell5.appendChild(editBtn);
            newCell6.appendChild(memberID);

            document.getElementsByTagName("table")[0].appendChild(tableRow);
        }
    }


    deleteMember(memberIdArray) {
        if (memberIdArray.constructor !== Array) {
            memberIdArray = [memberIdArray];
        }

        for (let i = 0; i < memberIdArray.length; i++) {
            let row = document.getElementById(memberIdArray[i]);
            this.table.removeChild(row);
        }
    }


    updatedMember(member) {
        let inputRowNr = document.getElementById(member.memberId);
        const cells = inputRowNr.getElementsByTagName("td")
        cells[0].textContent = member.firstname
        cells[1].textContent = member.lastname
        cells[2].textContent = member.address
        cells[3].textContent = member.phone

        cells[4].innerHTML = '<button type="button" id="' + member.memberId + '"  onclick=" ctrl.removeMemberClickBtn(this.parentNode.parentNode.id) " >Delete</button>';
        cells[5].innerHTML = '<button type="button" id="' + member.memberId + '"  onclick=" ctrl.editMemberModus(1, this.parentNode.parentNode.id) " >Edit</button>';

        document.getElementById("addMemberBtn").disabled = false;
    } // updateMember


    editMemberModus(editmode, memberID) {
        document.getElementById("addMemberBtn").disabled = true;        // disable addMember Btn
        //row = (memberID);

// Edit existing member
        if (editmode != 0) {
            let row = document.getElementById(memberID);

            let firstname = row.cells[0].innerHTML;
            let lastname = row.cells[1].innerHTML;
            let address = row.cells[2].innerHTML;
            let phone = row.cells[3].innerHTML;

            let rowNr = row.rowIndex;
            this.table.deleteRow(rowNr);

            row = this.table.insertRow(rowNr);
            row.id = memberID;
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            cell1.innerHTML = '<input type="text" size="4" value="' + firstname + '"/>';
            cell2.innerHTML = '<input type="text" size="4" value="' + lastname + '"/>';
            cell3.innerHTML = '<input type="text" size="4" value="' + address + '"/>';
            cell4.innerHTML = '<input type="text" size="4" value="' + phone + '"/>';

            cell5.innerHTML = '<button type="button" id="' + memberID + '"  onclick=" ctrl.sendEditMember(' + memberID + ') " >Send</button>';
            cell6.innerHTML = '<button type="button" id="cancel"   onclick="ctrl.canceladdMemberMode(' + memberID + ')">Cancel</button>';
        } else {            //  Or add new member

            let row = this.table.insertRow(this.table.rows.length);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);

            cell1.innerHTML = '<input type="text"  size="5" />';
            cell2.innerHTML = '<input type="text" size="5" />';
            cell3.innerHTML = '<input type="text" size="5" />';
            cell4.innerHTML = '<input type="text" size="5" />';

            cell5.innerHTML = '<button type="button" id="' + memberID + '"  onclick=" ctrl.sendNewMember() " >Send</button>';
            cell6.innerHTML = '<button type="button" id="cancel"   onclick="ctrl.canceladdMemberMode('+ memberID +',0)">Cancel</button>';

        }

    }

    canceladdMemberMode(memberId, n) {

        if(n != 0){

        let row = document.getElementById(memberId);
        let rowNr = row.rowIndex;
        const cells = row.getElementsByTagName("td")
        cells[0].textContent = row.cells[0].getElementsByTagName('input')[0].value
        cells[1].textContent = row.cells[1].getElementsByTagName('input')[0].value
        cells[2].textContent = row.cells[2].getElementsByTagName('input')[0].value
        cells[3].textContent = row.cells[3].getElementsByTagName('input')[0].value

        cells[4].innerHTML = '<button type="button" id="' + memberId + '"  onclick=" ctrl.removeMemberClickBtn(this.parentNode.parentNode.id) " >Delete</button>';
        cells[5].innerHTML = '<button type="button" id="' + memberId + '"  onclick=" ctrl.editMemberModus(1, this.parentNode.parentNode.id) " >Edit</button>';

        document.getElementById("addMemberBtn").disabled = false
        }else {
            let row = this.table.rows.length-1;
            this.table.deleteRow(row);
            document.getElementById("addMemberBtn").disabled = false
        }
    }

    changeMemberCallback(memberID) {
        let row = document.getElementById(memberID);

        let firstname = row.cells[0].innerHTML;
        let lastname = row.cells[1].innerHTML;
        let address = row.cells[2].innerHTML;
        let phone = row.cells[3].innerHTML;

        let rowNr = row.rowIndex;
        this.table.deleteRow(rowNr);

        row = this.table.insertRow(rowNr);
        row.id = rowNr;

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        cell1.innerHTML = '<tr> "<td>" ' + firstname + '"</td>"  </tr>';
        cell2.innerHTML = '<tr> <td> ' + lastname + '</td>  </tr>';
        cell3.innerHTML = '<tr> <td> ' + address + '</td>  </tr>';
        cell4.innerHTML = '<tr> <td> ' + phone + '</td>  </tr>';

        cell5.innerHTML = '<button type="button" id="' + memberID + '"  onclick=" ctrl.removeMemberClickBtn(this.parentNode.parentNode.id) " >Delete</button>';
        cell6.innerHTML = '<button type="button" id="' + memberID + '"  onclick=" ctrl.editMemberModus(1, this.parentNode.parentNode.id) " >Edit</button>';

    } // changeMemberCallback


    enableAddBtn() {
        document.getElementById("addMemberBtn").disabled = false
    }


    // used by submitdata()
    getnewMemberData(memberId) {

        if(memberId !=0) {
            let row = document.getElementById(memberId);
            const member = {
                'firstname': row.cells[0].getElementsByTagName('input')[0].value,
                'lastname': row.cells[1].getElementsByTagName('input')[0].value,
                'address': row.cells[2].getElementsByTagName('input')[0].value,
                'phone': row.cells[3].getElementsByTagName('input')[0].value
            }
            return member;
        }else {  // get input values
            const member = {
                'firstname': this.table.rows[this.table.rows.length-1].cells[0].getElementsByTagName('input')[0].value,
                'lastname': this.table.rows[this.table.rows.length-1].cells[1].getElementsByTagName('input')[0].value,
                'address': this.table.rows[this.table.rows.length-1].cells[2].getElementsByTagName('input')[0].value,
                'phone': this.table.rows[this.table.rows.length-1].cells[3].getElementsByTagName('input')[0].value
            }
            return member;
        }

    }

} // uiHandler