class MainController {
    constructor() {
        this.logId = -1;
     //   this.table = document.getElementById("table");
        this.ui = new UIHandler();

        //	document.getElementById("addMember").forEach((element) => {element.addEventListener("click",this.addMember.bind(this),false)})
    }

    init() {
        this.ui.initTable();
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
        let statusElm=document.getElementById("answer")
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
                statusElm.innerHTML ="Table was updated";
            }

            if (response.newMembers) {
                let newMembers = response.newMembers;
                statusElm.innerHTML ="Got new members";
                this.ui.refreshTable(newMembers);
            }

        }
        return true;
    }



    openMemberdialog() {
       let openDilog = window.open("memberUpdate.html", "dialog");
    }


    removeMemberClickBtn(memberId) {
        let url =config.servicesPath + "/member";
        let ajax = new AJAXConnection(url);
        ajax.onsuccess = this.removeMemberCallback.bind(this);
        ajax.del([ memberId ]);

    }


removeMemberCallback(msg) {
        let responseText = JSON.parse(msg);
        if(responseText.updatedMember.status) { this.checkUpdates()}
}


} // class