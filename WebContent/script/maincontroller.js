class MainController {
	constructor() {
		let logId = '-1';
		this.table = document.getElementById("table1")
		// ui = new UIHandler();
		document.getElementById("addMember").forEach((element) => {element.addEventListener("click",this.addMember.bind(this),false)})
	}
	
	init() {
		
		
		
	}
	
	
	addMember(){
	    ui.addNewMemberInputField(table, submitNewMember);
	    }
	
}