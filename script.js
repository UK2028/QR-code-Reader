let input = document.querySelector("#qr-upload");
let inputDiv = document.querySelector("#input-div");
let uploadDiv = document.querySelector("#upload-div");
let outputDiv = document.querySelector("#output-div");
let outputText = document.querySelector("#output-text");
let copyButton = document.querySelector("#copy-button");
let closeButton = document.querySelector("#close-button");
let output;
let html;

input.addEventListener("change",fetchInput);

function fetchInput() 
{
    // console.log(input.value);
    // console.log(input.files[0]["name"]);
    // console.log(input.files);
    html = inputDiv.innerHTML;
    let formData = new FormData();  // array of array of key and value can't use console.log but use for of loop
    formData.append("file",input.files[0]);
    fetchQRCode(formData,input.files[0]);
}

function fetchQRCode(formData,image)
{
    // for(let [k,v] of formData)
    // {
    //     console.log("key:",k);
    //     console.log("value:",v);
    // }
    // console.log(uploadDiv.innerHTML);
    // console.log(uploadDiv.innerText);
    // console.log("img:",URL.createObjectURL(image));
    uploadDiv.innerText = " Scanning QR Code ";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body:formData
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        console.log(data[0]["symbol"][0]["data"]);
        output = data[0]["symbol"][0]["data"];
        inputDiv.innerHTML = `<img src="${URL.createObjectURL(image)}">`;
        outputDiv.style.display = "block";
        outputText.innerText = output;
    });
};

copyButton.addEventListener("click", async () => {
    let p = await navigator.clipboard.writeText(output).then(()=> "Copied");
    console.log("p",p);
    console.log(copyButton.innerHTML);
    console.log(copyButton.innerText);
    let t = copyButton.innerHTML;
    copyButton.innerHTML = p;
    setTimeout(() => {
        copyButton.innerHTML = t;
    },1000);
});

closeButton.addEventListener("click",() => {
    outputDiv.style.display = "none";
    console.log(html);
    console.log(input.value);
    inputDiv.innerHTML = html;
    input = document.querySelector("#qr-upload");
    console.log(input.value);
    // input.value=null;
    // console.log(input.value);
    input.addEventListener("change",fetchInput);
});

