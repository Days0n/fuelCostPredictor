let form = document.getElementById('form')
const gallonRequested = document.getElementById('gallons-requested');
const deliveryAddress = document.getElementById('delivery-address');
const date = document.getElementById('delivery-date');
const savePrevious = document.getElementById('save-el');

//object for saving all the information
const saveData = {
    galRequest : undefined,
    delAddress : undefined ,
    delDate : undefined
};


form.addEventListener('submit', (e) => {
	e.preventDefault();
    
    checkForCorrectInputs();
    console.log(saveData.delAddress);
    console.log(saveData.delDate);
    preValues()
});

function checkForCorrectInputs(){
   if(gallonRequested.value === '')
   {
        alert("Gallon Requested can not be empty");
        return false;
   }
   if(date.value === ''){
    alert("Delivery Date can not be empty");
    return false;
   } 
    saveData.galRequest  = gallonRequested.value;
    saveData.delAddress  = deliveryAddress.value;
    saveData.delDate = date.value ;
   console.log("ALL required field are used")  
}
function preValues()
{
    
    savePrevious.innerText += "\n" + 
    "Gallons requested :"+ saveData.galRequest + "\n" + 
    "Delivery address :" + saveData.delAddress + "\n" + 
    "Delivery Date :" + saveData.delDate + "\n\n";
}