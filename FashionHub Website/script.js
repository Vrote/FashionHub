document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); 

            // Get product details from data attributes
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            const productImage = this.getAttribute("data-image");

            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push(product);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");
        });
    }); 
    
});

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".cart-btn1");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price").replace("$", ""); 
            let image = this.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({ name, price, image });

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });
    });
});

const API_URL = "http://localhost:5000/reviews";

async function fetchReviews() {
    let response = await fetch(API_URL);
    let reviews = await response.json();

    let reviewContainer = document.getElementById("reviews");
    let overallRatingContainer = document.getElementById("average-rating");

    if (reviews.length === 0) {
        reviewContainer.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
        overallRatingContainer.innerHTML = "N/A";
        return;
    }

    let ratings = reviews.map(review => review.rating);
    let sum = ratings.reduce((a, b) => a + b, 0);
    let average = (sum / ratings.length).toFixed(1);
    let overallStars = "⭐".repeat(Math.round(average));

    overallRatingContainer.innerHTML = `${overallStars} (${average})`;

    reviewContainer.innerHTML = reviews.map(review => `
        <div class="review-item">
            <h4>${review.name} <span>${"⭐".repeat(review.rating)}</span></h4>
            <p>${review.review}</p>
        </div>
    `).join("");
}

async function submitReview() {
    let name = document.getElementById("name").value;
    let rating = parseInt(document.getElementById("rating").value);
    let review = document.getElementById("review").value;

    if (!name || !review) {
        alert("Please enter your name and review.");
        return;
    }

    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, review }),
    });

    let result = await response.json();
    alert(result.message);
    document.getElementById("name").value = "";
    document.getElementById("rating").value = "5";
    document.getElementById("review").value = "";
    fetchReviews();
}

document.addEventListener("DOMContentLoaded", fetchReviews);



