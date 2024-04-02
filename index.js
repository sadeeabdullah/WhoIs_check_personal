document.addEventListener('DOMContentLoaded',async function () {

    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    async function fetchDataRaw(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    }
    

    async function showLoader() {
        const loader = document.createElement('div');
        loader.classList.add('lds-ellipsis');
        loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        document.getElementById('loaderContainer').appendChild(loader);
    }

    async function hideLoader() {
        const loader = document.querySelector('.lds-ellipsis');
        if (loader) {
            loader.parentNode.removeChild(loader);
        }
    }


    

    async function handleClick() {
        // call show loader
    await showLoader();
        const infoContainer = document.getElementById("whois_result");
        const infoContainer2 = document.getElementById("whois");
        const infoContainer3 = document.getElementById("admin");
        const infoContainer4 = document.getElementById("technical_contact");
        const infoContainer5 = document.getElementById("raw_data");
        // Clear previous content
        infoContainer.innerHTML = '';

        // clear the error section
        const errorsec = document.getElementById("error")
        errorsec.innerHTML='';

        // for loader
        

        const domainInput = document.getElementById("searchQueryInput").value;
        console.log(domainInput);
        if (!domainInput) {
            alert("please write a proper domain name with extension");
            hideLoader();
            return;
        }

        try {
            const [contacts,  registrant,registrar, whoisData,rawText] = await Promise.all([
                fetchData(`https://dev.kwayisi.org/apis/whois/${domainInput}/contacts`),
                fetchData(`https://dev.kwayisi.org/apis/whois/${domainInput}/registrant`),
                fetchData(`https://dev.kwayisi.org/apis/whois/${domainInput}/registrar`),
                fetchData(`https://dev.kwayisi.org/apis/whois/${domainInput}`),
                fetchDataRaw(`https://dev.kwayisi.org/apis/whois/${domainInput}/rawtext`)
            ]);

            // hide loader

            await hideLoader()


              console.log(contacts[0])
              console.log(contacts[1])
           
            contacts.forEach(contact => {
                // Check if the element is not null
                if (contact !== null) {
                  // Access properties for each non-null contact object
                  console.log('ID:', contact.id);
                  console.log('Email:', contact.email);
                  // Other properties
                } else {
                  // Handle the case where the element is null
                  console.log('Contact is null');
                }
              });

            // Process data and update UI as needed


          
            //   creating data table to show data in a table
            const table1=document.createElement("table");

               // create table caption (title)
        const caption = document.createElement("caption");
        caption.classList.add("whois_top_txt")
        caption.textContent = "Domain Info";
        table1.appendChild(caption);

            //   create table body
            const tbody1= document.createElement("tbody");
            
            // create row for each piece of data
            const rowData1=[
            {label:"Domain Name : ",value:whoisData.name},
            {label:"Registrar : ",value:registrar.name},
            {label:"Service Provider : ",value:registrar.reseller},
            {label:"Registered On : ",value:whoisData.crdate},
            {label:"Expire Date  :",value:whoisData.exdate},
            {label:"Updated On  :",value:whoisData.update},
            {label:"Status  :",value:whoisData.status},
            {label:"Name Servers  :",value:whoisData.nservs},
            ]

            
            // fetching the row data to show on the table

            rowData1.forEach(data=>{
                const row = document.createElement("tr");
                

                // create cell for label
                const labelCell = document.createElement("td");
                labelCell.textContent = data.label;
                row.appendChild(labelCell)

                // create cell for value
                const valueCell =  document.createElement("td");
                valueCell.textContent = data.value;
                row.appendChild(valueCell);

                // append the row to the table body or tbody
                tbody1.appendChild(row)
                // append the tbody to the table
                table1.appendChild(tbody1);
    
                // appending the data table into the info container
    
    
                
                infoContainer.appendChild(table1);
            })



 


              // second table


             //   creating data table to show data in a table
             const table2=document.createElement("table");
 
                // create table caption (title)
         const caption2 = document.createElement("caption");
         caption2.classList.add("whois_top_txt")
         caption2.textContent = "Regirstrant Contact";
         table2.appendChild(caption2);
 
             //   create table body
             const tbody2 = document.createElement("tbody");
             
             // create row for each piece of data
             const rowData2=[
             {label:"Name : ",value:registrant.name },
             {label:"Organization : ",value:registrant.org },
             {label:"Street : ",value:registrant.address.street},
             {label:"City : ",value:registrant.address.city},
             {label:"State  :",value:registrant.address.region},
             {label:"Postal Code  :",value:registrant.address.zip},
             {label:"Country  :",value:registrant.address.country},
             {label:"Phones  :",value:registrant.phone.number},
             {label:"Email  :",value:registrant.email},
             ]
 
             
             // fetching the row data to show on the table
 
             rowData2.forEach(data=>{
                 const row = document.createElement("tr");
                 
 
                 // create cell for label
                 const labelCell = document.createElement("td");
                 labelCell.textContent = data.label;
                 row.appendChild(labelCell)
 
                 // create cell for value
                 const valueCell =  document.createElement("td");
                 valueCell.textContent = data.value;
                 row.appendChild(valueCell);
 
                 // append the row to the table body or tbody
                 tbody2.appendChild(row)
                 // append the tbody to the table
                 table2.appendChild(tbody2);
     
                 // appending the data table into the info container
     
     
                 
                 infoContainer2.appendChild(table2);
             })
 


                 // third table


             //   creating data table to show data in a table
             const table3=document.createElement("table");
 
                // create table caption (title)
         const caption3 = document.createElement("caption");
         caption3.classList.add("whois_top_txt")
         caption3.textContent = "Administrative Contact";
         table3.appendChild(caption3);
 
             //   create table body
             const tbody3 = document.createElement("tbody");
             
             // create row for each piece of data
             const rowData3=[
             {label:"Name : ",value:contacts[0].name},
             {label:"Organization : ",value:contacts[0].org},
             {label:"Street : ",value:contacts[0].address.street},
             {label:"City : ",value:contacts[0].address.city},
             {label:"State  :",value:contacts[0].address.region},
             {label:"Postal Code  :",value:contacts[0].address.zip},
             {label:"Country  :",value:contacts[0].address.country},
             {label:"Phones  :",value:contacts[0].phone.number},
             {label:"Email  :",value:contacts[0].email},
             ]
 
             
             // fetching the row data to show on the table
 
             rowData3.forEach(data=>{
                 const row = document.createElement("tr");
                 
 
                 // create cell for label
                 const labelCell = document.createElement("td");
                 labelCell.textContent = data.label;
                 row.appendChild(labelCell)
 
                 // create cell for value
                 const valueCell =  document.createElement("td");
                 valueCell.textContent = data.value;
                 row.appendChild(valueCell);
 
                 // append the row to the table body or tbody
                 tbody3.appendChild(row)
                 // append the tbody to the table
                 table3.appendChild(tbody3);
     
                 // appending the data table into the info container
     
     
                 
                 infoContainer3.appendChild(table3);
             })



                 // fourth table


             //   creating data table to show data in a table
             const table4=document.createElement("table");
 
                // create table caption (title)
         const caption4 = document.createElement("caption");
         caption4.classList.add("whois_top_txt")
         caption4.textContent = "Technical Contact";
         table4.appendChild(caption4);
 
             //   create table body
             const tbody4 = document.createElement("tbody");
             
             // create row for each piece of data
             const rowData4=[
             {label:"Name : ",value:contacts[1].name},
             {label:"Organization : ",value:contacts[1].org},
             {label:"Street : ",value:contacts[1].address.street},
             {label:"City : ",value:contacts[1].address.city},
             {label:"State  :",value:contacts[1].address.region},
             {label:"Postal Code  :",value:contacts[1].address.zip},
             {label:"Country  :",value:contacts[1].address.country},
             {label:"Phones  :",value:contacts[1].phone.number},
             {label:"Email  :",value:contacts[1].email},
             ]
 
             
             // fetching the row data to show on the table
 
             rowData4.forEach(data=>{
                 const row = document.createElement("tr");
                 
 
                 // create cell for label
                 const labelCell = document.createElement("td");
                 labelCell.textContent = data.label;
                 labelCell.classList.add("label_cell");
                 row.appendChild(labelCell)
 
                 // create cell for value
                 const valueCell =  document.createElement("td");
                 valueCell.textContent = data.value;
                 row.appendChild(valueCell);
 
                 // append the row to the table body or tbody
                 tbody4.appendChild(row)
                 // append the tbody to the table
                 table4.appendChild(tbody4);
     
                 // appending the data table into the info container
     
     
                 
                 infoContainer4.appendChild(table4);
             })

            


            //  raw text container
            


            const rawtext = document.createElement("pre")
            rawtext.classList.add("raw_txt");
            rawtext.textContent=rawText;

            const rawContainer= document.createElement("div")
            rawContainer.classList.add("raw_container")

            // adding a title for raw text

            const rawTitle = document.createElement("p");
            rawTitle.classList.add("raw_title")
            rawTitle.textContent="Raw Whois"

            // append the raw text into the raw container
            rawContainer.appendChild(rawTitle)
            rawContainer.appendChild(rawtext)

            // append the raw text to the info container5
            infoContainer5.appendChild(rawContainer)



        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);

            // hiding the loader
            await hideLoader();

            // Handle errors
            const msg = document.createElement("p");
            msg.classList.add("error");
            msg.textContent="This domain has available for sale"

            const errorMessage = document.createElement("div")
            errorMessage.appendChild(msg)

            // append the error message on the info container
            const errorSection = document.getElementById("error")
            errorSection.appendChild(msg)
        }
      
    }

    const myButton = document.getElementById("searchQuerySubmit");
    myButton.onclick = handleClick;

    // Event listener for Enter key press
    document.getElementById("searchQueryInput").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action if needed
            event.preventDefault();

            // Trigger the button click
            handleClick();
        }
    });

});
