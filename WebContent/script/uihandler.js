class UIHandler {
	 constructor() {

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
	
	
	
}