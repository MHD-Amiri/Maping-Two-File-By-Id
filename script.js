const fs = require("fs");

fs.readFile('names.txt', "utf-8", function (err, nameData) {
    if (err) {
        console.log("Somwthing went wrong in reading the File");
        throw (err);
    } else fs.readFile('numbers.txt', "utf-8", function (err, phoneData) {
        if (err) {
            console.log("Somwthing went wrong in reading the File");
            throw (err);
        }
        let nameArray = nameData.split("\r\n");
        let phoneArray = phoneData.split("\r\n");
        let nameId = []
        for (i = 0; i < nameArray.length; i++) {
            nameId.push(nameArray[i].slice(0, 3))
        };

        let phoneId = []
        for (i = 0; i < phoneArray.length; i++) {
            phoneId.push(phoneArray[i].slice(0, 3))
        };

        let name = [];
        for (i = 0; i < nameArray.length; i++) {
            name.push(nameArray[i].slice(4))
        }

        let phone = [];
        for (i = 0; i < phoneArray.length; i++) {
            phone.push(phoneArray[i].slice(4))
        }

        function namePersonInfo(nameId, name) {
            this.id = nameId;
            this.name = name;
        }

        function phonePersonInfo(phoneId, phone) {
            this.id = phoneId;
            this.phone = phone;
        }

        function contactInfo(id, name, phone) {
            this.id = id;
            this.name = name;
            this.phone = phone
        }

        let nameObject = [];
        for (let i = 0; i < name.length; i++) {
            nameObject.push(new namePersonInfo(
                nameId[i],
                name[i],

            ))
        }

        let phoneObject = [];
        for (let i = 0; i < phone.length; i++) {
            phoneObject.push(new phonePersonInfo(
                phoneId[i],
                phone[i],

            ))
        }

        let contactObject = [];
        for (let i = 0; i < nameObject.length; i++) {
            arrPohnes = [];
            for (let j = 0; j < phoneObject.length; j++) {
                if (phoneObject[j].id === nameObject[i].id) {
                    arrPohnes.push(phoneObject[j].phone);
                }
            };
            contactObject.push(new contactInfo(
                nameId[i],
                name[i],
                arrPohnes,
            ))
        };

        let information = ''
        for (let k = 0; k < contactObject.length; k++) {
            if (contactObject[k].phone.length === 1) {
                information += `\n${contactObject[k].name}'s phone number is ${contactObject[k].phone}`;
            } else if (contactObject[k].phone.length >= 2) {
                information += `\n${contactObject[k].name}'s phone numbers are ${contactObject[k].phone}`;
            } else {
                information += `\n${contactObject[k].name} hasn't any number`;
            }
        }
        console.log(information);
        fs.writeFile('information.txt', information, function (err) {
            if (err) {
                console.log("Somwthing went wrong in writing the File");
                throw (err);
            }
        })
    });
});