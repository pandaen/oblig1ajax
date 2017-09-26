class UIHandler {
    constructor() {this.table = null;}

    initTable () {
        this.table = document.createElement("table");

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

        var addMemberBtn = document.getElementById("addMemberBtn");
        document.getElementsByTagName("body")[0].insertBefore(this.table, addMemberBtn);

    }


    refreshTable(memberdata) {
        if (memberdata.constructor !== Array) {
            memberdata = [memberdata];
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
                ctrl.changeMemberClick(this.parentNode.parentNode.id);                              // point to incorrect method
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


    updatedMember(memberArray) {
        if (memberArray.constructor !== Array) {
            memberArray = [ memberArray ];
        }
        for (let i = 0; i < memberArray.length; i++) {
            let row = document.getElementById(memberArray[i].memberId);
            row.cells[0].firstChild.data = memberArray[i].firstname;
            row.cells[1].firstChild.data = memberArray[i].lastname;
            row.cells[2].firstChild.data = memberArray[i].address;
            row.cells[3].firstChild.data = memberArray[i].phone;
        }
    }

    getMemberFields() {
        let row = document.getElementById(memberId);
        let firstname = row.cells[0].firstChild.data;
        let lastname = row.cells[1].firstChild.data;
        let address = row.cells[2].firstChild.data;
        let phone = row.cells[3].firstChild.data;
        return {
            "firstname" : firstname,
            "lastname" : lastname,
            "address" : address,
            "phone" : phone
        }
    }



} // uiHandler