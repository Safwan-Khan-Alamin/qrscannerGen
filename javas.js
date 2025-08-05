let imgbox = document.getElementById("imgbox");
let qrimage = document.getElementById("qrimage");
let qrtext = document.getElementById("qrtext");

let finalImageBlob = null; // store final canvas image blob for clipboard

function generateQR() {
    const text = qrtext.value.trim();

    if (!text) {
        alert("Please enter some text or URL.");
        imgbox.classList.remove("show-img");
        return;
    }

    const qrLink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(text);
    const tempImg = new Image();
    tempImg.crossOrigin = "anonymous";
    tempImg.src = qrLink;

    tempImg.onload = function () {
        const canvas = document.createElement("canvas");
        const padding = 10;
        const textHeight = 20;
        const width = tempImg.width;
        const height = tempImg.height + textHeight + padding;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // Draw the QR image
        ctx.drawImage(tempImg, 0, 0);

        // Draw the name text below
        ctx.font = "bold 14px Poppins";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText("Safwan Khan Al-amin", width / 2, height - padding);

        // Update the image element with the combined result
        qrimage.src = canvas.toDataURL("image/png");
        imgbox.classList.add("show-img");

        // Store the blob for clipboard copy
        canvas.toBlob(blob => {
            finalImageBlob = blob;
        });
    };

    tempImg.onerror = function () {
        alert(" Failed to load QR image from the server.");
    };
}

function copyQRImage() {
    if (!finalImageBlob) {
        alert(" Generate a QR code first!");
        return;
    }

    const item = new ClipboardItem({ "image/png": finalImageBlob });
    navigator.clipboard.write([item]).then(() => {
        alert("QR code image with name copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy image.");
    });
}
