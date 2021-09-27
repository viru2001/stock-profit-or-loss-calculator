const initialPrice = document.querySelector("#initial-price");
const stockQuantity = document.querySelector("#stocks-quantity");
const currentPrice = document.querySelector("#current-price");
const checkBtn = document.querySelector(".btn-check");
const errorMsg = document.querySelector("#error-message");
const outputDiv = document.querySelector("#output");
const card = document.querySelector(".card");

const setErrorMsg = (msg)=>{
    errorMsg.innerText = msg;
}

const resetErrorMsg = ()=>{
    errorMsg.innerText = "";
}
const removeOutput = ()=>{
    outputDiv.innerHTML = "";
    card.style.backgroundColor = "#fff";
}
const fields = [initialPrice,stockQuantity,currentPrice];
fields.map( (field)=>{
    field.addEventListener("click",()=>{
        resetErrorMsg();
        removeOutput();
    });
});
const isInputValid = ()=>{
    if(initialPrice.value === "" || currentPrice.value === "" || stockQuantity.value === ""){
        setErrorMsg("Please enter all the values");
    }
    else if(Number(initialPrice.value) <= 0 || Number(currentPrice.value) <= 0 || Number(stockQuantity.value) <=0 ){
        setErrorMsg("Please enter valid values. Values should be greater than zero");
    }
    else{
        return true;
    }
    // resetErrorMsg();
}
const showOutput = (result , percentage,profitOrLoss)=>{
    if(profitOrLoss === "Profit"){
        outputDiv.innerHTML = "<img src='images/profit.svg'/><p>You gained "+ profitOrLoss +" of "+result +" and profit percentage is "+percentage+" \n:) </p>";
        card.style.backgroundColor = "rgb(50, 205, 50)";
    }
    else if (profitOrLoss === "Loss"){
        outputDiv.innerHTML = "<img src='images/loss.svg'/><p>You are in from "+ profitOrLoss +" of "+result +" and loss percentage is "+percentage+" \n:( </p>";
        card.style.backgroundColor = "rgb(239, 68, 68)";
    }
    else{
        outputDiv.innerHTML = "<img src='images/neutral.svg'/><p> No Profit No Loss </p>";
        card.style.backgroundColor = "rgb(251, 191, 36)";
    }
}
const calculate = ()=>{

    let initPrice = Number(initialPrice.value);
    let currPrice = Number(currentPrice.value);
    let quantity = Number(stockQuantity.value);

    let result,profitOrLoss, percentage;
    if(initPrice > currPrice){
         result = ((initPrice - currPrice) * quantity).toFixed(2);
         percentage = ((result / (initPrice*quantity)) * 100).toFixed(2);
         profitOrLoss = "Loss";
        
    }
    else if(initPrice < currPrice){ 
         result = ((currPrice - initPrice) * quantity).toFixed(2);
         percentage = ((result / (initPrice*quantity)) * 100).toFixed(2);
         profitOrLoss = "Profit";
    }
    else{
         result = 0;
         percentage = 0;
         profitOrLoss = "Neutral"
    }
    showOutput(result,percentage,profitOrLoss);

}
checkBtn.addEventListener('click', ()=>{

    if(isInputValid()){
        calculate();
    }

});