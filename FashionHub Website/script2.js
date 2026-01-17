
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".confirm-order").addEventListener("click", submitOrder);
});

function applyCoupon() {
    let coupon = document.getElementById("coupon").value.trim();
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = parseFloat(totalPriceElement.textContent);

    if (coupon && coupon === "FASHION10") {
        let discount = totalPrice * 0.10;
        totalPrice -= discount;
        alert("Coupon Applied! 10% Discount");
    }

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function submitOrder() {
    // Validate shipping fields
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();

    if (!name || !address || !city || !zip) {
        alert("Please fill in all shipping details!");
        return;
    }

    // Get Total Price from Order Summary
    const productName = document.getElementById('product-name').innerText.trim();
    const productPrice = document.getElementById('product-price').innerText.trim();
    const quantity = document.getElementById('quantity').innerText.trim();
    const size = document.getElementById('product-size').innerText.trim();
    const totalPrice = document.getElementById('total-price').innerText.trim();
    const productImage = document.getElementById('product-image').src;  // <-- get image

    // Save order details in localStorage
    const orderDetails = {
        name: name,
        address: address,
        city: city,
        zip: zip,
        productName: productName,
        productPrice: productPrice,
        quantity: quantity,
        size: size,
        totalPrice: totalPrice,
        productImage: productImage   // <-- save image
      };
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Generate dynamic QR with total amount
    generateQR(totalPrice);

    alert('✅ Order Confirmed! Please scan to pay.');

    setTimeout(() => {
        showQR();
    }, 200);
}

function generateQR(amount) {
    const upiId = "aishwaryatekade@ybl"; 
    const name = "Aishwarya Tekade";         

    // UPI Link format
    const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;

    // QR Code URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

    // Set QR image source
    document.getElementById('qrImage').src = qrUrl;
}

function showQR() {
    document.getElementById("qrPopup").style.display = "flex";
}

function hideQR() {
    document.getElementById("qrPopup").style.display = "none";
}

function paymentDone() {
    // Hide the QR popup
    document.getElementById("qrPopup").style.display = "none";

    // Redirect to order success page after a short delay
    setTimeout(() => {
      window.location.href = "orders.html";  
    }, 500);
}


   