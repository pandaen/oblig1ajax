class UIHandler {
	 constructor() {
this.table = null;
	        this._tableElement = document.createElement("table")
	        this._tableElement.style.display = "none"
	        const rowElement = this._tableElement.createTHead().insertRow(-1)
	        rowElement.appendChild(document.createElement("th")).textContent = "Firstname"
	        rowElement.appendChild(document.createElement("th")).textContent = "Lastname"
	        rowElement.appendChild(document.createElement("th")).textContent = "Address"
	        rowElement.appendChild(document.createElement("th")).textContent = "Phone"
	        for (let i=0; i<2; ++i) {
	            rowElement.appendChild(document.createElement("th"))
	        }
	        this._tbodyElement = document.createElement("tbody")
	        this._tableElement.appendChild(this._tbodyElement)
	    }
	
	
	 
	 
	 createTable() {
		 
		 this.table = document.createElement("table");
			var tableRekke = document.createElement("tr");

			var nyCelle0 = document.createElement("th");
			var nyCelle1 = document.createElement("th");
			var nyCelle2 = document.createElement("th");
			var nyCelle3 = document.createElement("th");

			tableRow.appendChild(nyCelle0);
			tableRow.appendChild(nyCelle1);
			tableRow.appendChild(nyCelle2);
			tableRow.appendChild(nyCelle3);

			var fornavn = document.createTextNode("Fornavn");
			var etternavn = document.createTextNode("Etternavn");
			var adresse = document.createTextNode("Adresse");
			var telefonnr = document.createTextNode("Telefon");

			nyCelle0.appendChild(fornavn);
			nyCelle1.appendChild(etternavn);
			nyCelle2.appendChild(adresse);
			nyCelle3.appendChild(telefonnr);

			this.tabell.appendChild(tableRow);

			var addbtn = document.getElementById("Add member");
			document.getElementsByTagName("body")[0].insertBefore(this.table, addbtn);
		 
		 
		 
	 }
	 
	 
	 
	 updateTabel(memberdata){
		 
		 
		 
		 if (memberdata.constructor !== Array) {
				memberdata = [ memberdata ];
			}
			for (var i = 0; i < memberdata.length; i++) {
				var tabellRekke = document.createElement("tr");
				tabellRekke.setAttribute("id", memberdata[i].memberId);
				var nyCelle0 = document.createElement("td");
				var nyCelle1 = document.createElement("td");
				var nyCelle2 = document.createElement("td");
				var nyCelle3 = document.createElement("td");
				var nyCelle4 = document.createElement("td");
				var nyCelle5 = document.createElement("td");
				var nyCelle6 = document.createElement("td");
				nyCelle6.setAttribute("style", "visibility:hidden;");

				tabellRekke.appendChild(nyCelle0);
				tabellRekke.appendChild(nyCelle1);
				tabellRekke.appendChild(nyCelle2);
				tabellRekke.appendChild(nyCelle3);
				tabellRekke.appendChild(nyCelle4);
				tabellRekke.appendChild(nyCelle5);
				tabellRekke.appendChild(nyCelle6);

				var fornavn = document.createTextNode(memberdata[i].firstname);
				var etternavn = document.createTextNode(memberdata[i].lastname);
				var adresse = document.createTextNode(memberdata[i].address);
				var telefonnr = document.createTextNode(memberdata[i].phone);
				var slettKnapp = document.createElement("input");
				slettKnapp.setAttribute("type", "button");
				slettKnapp.setAttribute("value", "slett");
				slettKnapp.addEventListener('click', function() {
					ctrler.deleteMemberClick(this.parentNode.parentNode.id);
				});

				var endreKnapp = document.createElement("input");
				endreKnapp.setAttribute("type", "button");
				endreKnapp.setAttribute("value", "endre");
				endreKnapp.addEventListener('click', function() {
					ctrler.changeMemberClick(this.parentNode.parentNode.id);
				});

				var medlemID = document.createTextNode(memberdata[i].memberId);

				nyCelle0.appendChild(fornavn);
				nyCelle1.appendChild(etternavn);
				nyCelle2.appendChild(adresse);
				nyCelle3.appendChild(telefonnr);
				nyCelle4.appendChild(slettKnapp);
				nyCelle5.appendChild(endreKnapp);
				nyCelle6.appendChild(medlemID);

				document.getElementsByTagName("table")[0].appendChild(tabellRekke);
		 
		 
		 
	 }
	 
	 }
	 
	deleteMember() {
		
	} 
	
	getMemberID() {
		
	}
	 
	 
	
} // uiHandler