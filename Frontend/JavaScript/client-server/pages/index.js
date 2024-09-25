// let inputTextField = document.querySelector("#textInput")
// let display = document.querySelector("#display")
// let inputButton = document.querySelector("#inputButton")

// //inputButton.addEventListener("click", ()=>{ readDataFromUser(); })
// inputButton.addEventListener("click", ()=>{ getDataFromUser(); })

// // 1 Läs från textfil till display
// let writeDataFromFile =()=>
// {
//     fetch("./files/savefile.txt")
//     .then( (response) => 
//     {
//         console.log("response: ",response.text)
//         return response.text()
//     })
//     .then( (dataItem) =>
//     {
//         display.innerHTML = dataItem
//         inputTextField.value = dataItem
//         console.log("dataitem: ", dataItem)
//     })
//     .catch( (error) =>
//     {
//         console.log(error)
//     })
// }

// // 2 Skriv till textfil från input
// let getDataFromUser =()=>
// {
//     let aText = inputTextField.value
//     fetch("./", {
//         method: "post",
//         headers: {
//             "Content-Type": "text/plain"
//             },
//         body: aText
//     })
//     .then( (response) =>
//     {
//         return response.text()
//     })
//     .then( (dataItem) =>
//     {
//         display.innerText = "Done"
//         console.log(dataItem)
//     })
//     .catch( (error) => { console.log(error)})
// }

// // läser in vad som skrivs i inputfield
// let readDataFromUser = () =>
// {
//     let recievedData = inputTextField.value;
//     display.textContent=recievedData;
// }