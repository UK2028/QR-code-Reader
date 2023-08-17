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
    html = inputDiv.innerHTML;
    let formData = new FormData();
    formData.append("file",input.files[0]);
    fetchQRCode(formData,input.files[0]);
}

function fetchQRCode(formData,image)
{
    uploadDiv.innerText = " Scanning QR Code ";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body:formData
    }).then(res=>res.json())
    .then(data=>{
        output = data[0]["symbol"][0]["data"];
        inputDiv.innerHTML = `<img src="${URL.createObjectURL(image)}">`;
        outputDiv.style.display = "block";
        outputText.innerText = output;
    });
};

copyButton.addEventListener("click", async () => {
    let p = await navigator.clipboard.writeText(output).then(()=> "Copied");
    let t = copyButton.innerHTML;
    copyButton.innerHTML = p;
    setTimeout(() => {
        copyButton.innerHTML = t;
    },1000);
});

closeButton.addEventListener("click",() => {
    outputDiv.style.display = "none";
    inputDiv.innerHTML = html;
    input = document.querySelector("#qr-upload");
    input.addEventListener("change",fetchInput);
});

