class MainController {
    constructor() {
        this.logId = -1;
        this.ui = new UIHandler();
    }

    // start the application
    init() {
        this.ui.initializeTable();
        this.checkUpdates();
        window.setTimeout(this.checkUpdates.bind(this), 4000);
    }

    checkUpdates() {
        let url = config.servicesPath + "/updates";
        let ajax = new AJAXConnection(url);
        ajax.onsuccess = this.manageUpdates.bind(this);
        ajax.get([this.logId]);

    }

    manageUpdates(jsontext) {
        let statusElm = document.getElementById("answer")
        const response = JSON.parse(jsontext).updates
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


// Show new member row , fires when user click addMember btn
    addMemberdialog() {
        this.ui.editMemberModus(0);
    }

    // fires when user click submit btn
    sendMemberData(memberID) {
        let url = config.servicesPath + "/member";
        let ajax = new AJAXConnection(url);
        ajax.onsuccess = this.manageUpdates;
        let memberData = this.ui.getnewMemberData(memberID);                     // WHYS yells getMemberData() undefined ?
        ajax.post(null, {'member': memberData})
        this.ui.canceladdMemberMode.bind(table)
    }

    removeMemberClickBtn(memberId) {
        let url = config.servicesPath + "/member";
        let ajax = new AJAXConnection(url);
        ajax.onsuccess = this.removeMemberCallback.bind(this);
        ajax.del([memberId]);

    }


    removeMemberCallback(msg) {
        let responseText = JSON.parse(msg);
        if (responseText.updatedMember.status) {
            this.checkUpdates()
        }
    }

    editMemberModus(editmode, memberID) {
        this.ui.editMemberModus(editmode, memberID);
    }
} // class