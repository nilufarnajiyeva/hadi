"use strict";

// class for creating a contact object
class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}


// class for AddressBook, which will consist of an array of contact objects (made from the contact class)
class AddressBook {
    constructor() {
        this.contacts = [];
        // empty array where contact objects will be pushed and stored
    }
    add(name, email, phone, relation) {
        // makes new Contact instance and adds to AddressBook's contacts
        let newContact = new Contact(name, email, phone, relation);
        // declare and initialize the variable newContact as a new instance of class Contact
        this.contacts.push(newContact);
        // pushes newContact to the empty contact array
    }
    display() {
        document.querySelector(".contact_container").innerHTML = "";
        // this is resetting the HTML, that way only the most recent submission is added (rather than repeating each previous submission with the new one).
        this.contacts.forEach((person, index) => {
            const contact = document.createElement("div");
            // creates a new div for the new contact 
            contact.classList.add("contact_card");
            contact.setAttribute("index", index);
                // this is setting an attribute of "index" to the index of the object.
            contact.innerHTML = `
                <p>Name: ${person.name}</p>
                <p>Email: ${person.email}</p>
                <p>Phone: ${person.phone}</p>
                <p>Relation: ${person.relation}</p>
                <i class="fas fa-trash delete_btn" index=${index}></i>
            `; 
                    // index attribute is added so that the index associated with the appropriate element of the array is the value placed in the index attribute of the trash icon.
            document.querySelector(".contact_container").append(contact);
        });
    }
    deleteAt(index) {
        this.contacts.splice(index, 1);
        // this is splicing (removing) the particular index - triggered by the clicking of the trashcan icon, which is in the deleteHandler function below
        this.display();
        // calls the display method, so that the remaining contact cards are still displayed after the deletion of the one clicked.
    }
}


const addressBook = new AddressBook(); 
    // making a new instance of the AddressBook class
addressBook.add("Nilufer Neciyeva","7bkmz5p@code.edu.az","50-986-16-87","Family");
addressBook.add("Zehra Mehdizade","zhra.mhdzd@gmail.com","50-453-97-13","Family");
addressBook.add("Tapdiqlı Zeynəb","zeyneb11@gmail.com","50-455-35-56","Family");
    // all of these are adding contacts to the address book
addressBook.display();
    // calls display method, so that the already-added contact cards are displayed on load of the window.


// to submit the contact
function handleSubmit(event) {
    event.preventDefault();
        // prevents page refresh on submission
    addressBook.add(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].value);
        // targets each input for value entered so the information can be passed into the contact object, which is ultimately pushed to the array and displayed on the DOM
    form.reset(); 
        // resets the form after submission so new info can be entered
    addressBook.display();
}

function deleteHandler(event) {
    console.dir(event)
    if (event.target.classList.contains("fa-trash")) {
        const index = event.target.getAttribute("index");
            // returns the value of the attribute "index"
        addressBook.deleteAt(index);
            // this is passing the index variable (which is selecting the value of the index attribute on the element being targeted by the event) - that way that index is the one being deleted
        addressBook.display();
    }
}

const form = document.querySelector("form");
const contactContainer = document.querySelector(".contact_container");

form.addEventListener("submit", handleSubmit);
contactContainer.addEventListener("click", deleteHandler);