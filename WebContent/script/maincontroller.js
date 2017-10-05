class MainController {
    constructor() {
        this.logId = -1;
        this.timer = null;
        this.ui = new UIHandler();
    }

    // start the application
    init() {
        this.ui.initializeTable();
        this.checkUpdates(null);
     //   window.setTimeout(this.checkUpdates.bind(this), 4000);
    }


    checkUpdates(n) {
        let url = config.servicesPath + "/updates";
        let ajax = new AJAXConnection(url);
        if(n !=0) {
        ajax.onsuccess = this.manageUpdates.bind(this);
        ajax.get([this.logId]);
        }else {
        ajax.onsuccess = this.manageNewMemberUI.bind(this);
        ajax.get([this.logId]);
        }
    }




    manageUpdates(jsontext) {
        let statusElm = document.getElementById("answer")
        let response = JSON.parse(jsontext).updates
        if (!response.status) alert('error!');

        if (this.logId < response.logId) {
            this.logId = response.logId;

            if (response.deletedMembers) {
                let deletedMembers = response.deletedMembers;
                this.ui.deleteMember(deletedMembers).bind(this);
                statusElm.innerHTML = "Member was deleted";
            }

            if (response.updatedMembers) {
                let updatedMembers = response.updatedMembers;
                this.ui.updatedMember(updatedMembers);
                statusElm.innerHTML = "Table was updated";
            }

            if (response.newMembers) {
                let newMembers = response.newMembers;
                statusElm.innerHTML = "Got new member(s)";
                this.ui.refreshTable(newMembers);
            }

        }
        return true;
    }



    manageNewMemberUI(jsontext) {
        let n = 0;
        let statusElm = document.getElementById("answer")
        let response = JSON.parse(jsontext).updates
        if (!response.status) alert('error!');

        if (this.logId < response.logId) {
            this.logId = response.logId;

            if (response.newMembers) {
                let newMembers = response.newMembers;
                statusElm.innerHTML = "Got new member(s)";
                this.ui.refreshTable(newMembers,n);
            }

        }
        return true;
    }


    manageChanged(res) {
        res = JSON.parse(res).updatedMember
        let statusElm = document.getElementById("answer");
        if (!res.status) {
            alert("Internal server error!");
        } else {
            statusElm.innerHTML = "Member was changed successfully";
           this.checkUpdates()
        }
    }


    manageNewMember(res) {
        res = JSON.parse(res).updatedMember
        let statusElm = document.getElementById("answer");
        if (!res.status) {
            alert("Internal server error!");
        } else {
            statusElm.innerHTML = "The new member was added successfully";
            this.checkUpdates(0)
            this.ui.enableAddBtn();
        }
    }

// Show new member row , fires when user click addMember btn
        addMemberdialog(){
            this.ui.editMemberModus(0);
        }

        // fires when user click submit btn
    sendEditMember(memberID){
            console.log("send was clicked!");
            let url = config.servicesPath + "/member";
            let ajax = new AJAXConnection(url);
            ajax.onsuccess = this.manageChanged.bind(this);
            let memberData = this.ui.getnewMemberData(memberID);
            ajax.put([memberID], {'member': memberData})
            this.ui.canceladdMemberMode();
        }


        sendNewMember() {
            let url = config.servicesPath + "/member";
            let ajax = new AJAXConnection(url);
        //    ajax.onsuccess = this.manageUpdates.bind(this,[0]);                           // $£$£$££$||@@@
            ajax.onsuccess = this.manageNewMember.bind(this);
            let memberData = this.ui.getnewMemberData(0);
            ajax.post(null, {'member': memberData})
            this.ui.canceladdMemberMode.bind()
        }

        removeMemberClickBtn(memberId){
            let url = config.servicesPath + "/member";
            let ajax = new AJAXConnection(url);
            ajax.onsuccess = this.removeMemberCallback.bind(this);
            ajax.del([memberId]);
        }


        removeMemberCallback(msg)
        {
            let responseText = JSON.parse(msg);
            if (responseText.updatedMember.status) {
                this.checkUpdates()
            }
        }

        editMemberModus(editmode, memberID) {
            this.ui.editMemberModus(editmode, memberID);
        }

    canceladdMemberMode(MId,n) {
            this.ui.canceladdMemberMode(MId,n);
    }


    /*
     customPerodic(resp) {
     if (!this.dataReceived) return
     if (!this.dataReceived(resp)) return
     console.log("periodic runned!")
     this.timer = window.setTimeout(this.checkUpdates.bind(this), 4000);
     }
     */

    } // class