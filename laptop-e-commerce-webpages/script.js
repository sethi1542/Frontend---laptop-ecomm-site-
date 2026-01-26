// Sample product data
const products = [
  {
    id: 1,
    name: "Gaming Laptop Pro X1",
    category: "gaming",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.5,
    reviews: 128,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Sale",
    specs: {
      processor: "Intel Core i7-13700H",
      graphics: "NVIDIA GeForce RTX 4060 8GB",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" FHD 144Hz',
      weight: "2.3kg",
    },
  },
  {
    id: 2,
    name: "Business Elite Pro",
    category: "business",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.3,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Popular",
    specs: {
      processor: "Intel Core i5-13500H",
      graphics: "Intel Iris Xe",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: '14" FHD IPS',
      weight: "1.4kg",
    },
  },
  {
    id: 3,
    name: "UltraBook Air Max",
    category: "ultrabook",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    badge: "New",
    specs: {
      processor: "Intel Core i7-1360P",
      graphics: "Intel Iris Xe",
      ram: "16GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '13.3" 2K OLED',
      weight: "1.1kg",
    },
  },
  {
    id: 4,
    name: "Budget Starter Plus",
    category: "budget",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.1,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Best Value",
    specs: {
      processor: "AMD Ryzen 5 5500U",
      graphics: "AMD Radeon Graphics",
      ram: "8GB DDR4",
      storage: "256GB NVMe SSD",
      display: '15.6" FHD',
      weight: "1.8kg",
    },
  },
  {
    id: 5,
    name: "Gaming Beast RTX",
    category: "gaming",
    price: 1899.99,
    originalPrice: 2199.99,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Premium",
    specs: {
      processor: "Intel Core i9-13900H",
      graphics: "NVIDIA GeForce RTX 4070 8GB",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      display: '17.3" QHD 165Hz',
      weight: "2.8kg",
    },
  },
  {
    id: 6,
    name: "Creative Workstation",
    category: "business",
    price: 1599.99,
    originalPrice: 1799.99,
    rating: 4.6,
    reviews: 94,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Professional",
    specs: {
      processor: "Intel Core i7-13700H",
      graphics: "NVIDIA RTX A2000 4GB",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" 4K OLED',
      weight: "2.1kg",
    },
  },
]

// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || []

// DOM elements
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const cartCount = document.querySelector(".cart-count")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  // Load products based on current page
  if (document.getElementById("featured-products")) {
    loadFeaturedProducts()
  }

  if (document.getElementById("products-grid")) {
    loadAllProducts()
    setupFilters()
  }

  if (document.getElementById("related-products")) {
    loadRelatedProducts()
    setupProductDetails()
  }

  if (document.getElementById("checkout-form")) {
    setupCheckout()
  }

  // Setup navigation
  setupNavigation()

  // Setup category cards
  setupCategoryCards()
})

// Navigation functionality
function setupNavigation() {
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }
}

// Category cards functionality
function setupCategoryCards() {
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category
      window.location.href = `categories.html#${category}`
    })
  })
}

// Load featured products
function loadFeaturedProducts() {
  const container = document.getElementById("featured-products")
  if (!container) return

  const featuredProducts = products.slice(0, 4)
  container.innerHTML = featuredProducts.map((product) => createProductCard(product)).join("")
}

// Load all products
function loadAllProducts() {
  const container = document.getElementById("products-grid")
  if (!container) return

  container.innerHTML = products.map((product) => createProductCard(product)).join("")
}

// Load related products
function loadRelatedProducts() {
  const container = document.getElementById("related-products")
  if (!container) return

  const relatedProducts = products.slice(1, 5)
  container.innerHTML = relatedProducts.map((product) => createProductCard(product)).join("")
}

// Create product card HTML
function createProductCard(product) {
  const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 ? "☆" : "")
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.rating}/5) - ${product.reviews} reviews</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `
}

// Setup filters
function setupFilters() {
  const categoryFilter = document.getElementById("category-filter")
  const priceFilter = document.getElementById("price-filter")
  const sortFilter = document.getElementById("sort-filter")

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters)
  }
  if (priceFilter) {
    priceFilter.addEventListener("change", applyFilters)
  }
  if (sortFilter) {
    sortFilter.addEventListener("change", applyFilters)
  }

  // Check URL hash for category filter
  const hash = window.location.hash.substring(1)
  if (hash && categoryFilter) {
    categoryFilter.value = hash
    applyFilters()
  }
}

// Apply filters
function applyFilters() {
  const categoryFilter = document.getElementById("category-filter")
  const priceFilter = document.getElementById("price-filter")
  const sortFilter = document.getElementById("sort-filter")

  let filteredProducts = [...products]

  // Category filter
  if (categoryFilter && categoryFilter.value !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter.value)
  }

  // Price filter
  if (priceFilter && priceFilter.value !== "all") {
    const [min, max] = priceFilter.value.split("-").map(Number)
    filteredProducts = filteredProducts.filter((product) => {
      if (max) {
        return product.price >= min && product.price <= max
      } else {
        return product.price >= min
      }
    })
  }

  // Sort
  if (sortFilter) {
    switch (sortFilter.value) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
  }

  // Update display
  const container = document.getElementById("products-grid")
  if (container) {
    container.innerHTML = filteredProducts.map((product) => createProductCard(product)).join("")
  }
}

// View product details
function viewProduct(productId) {
  localStorage.setItem("selectedProduct", productId)
  window.location.href = "product.html"
}

// Setup product details page
function setupProductDetails() {
  const productId = localStorage.getItem("selectedProduct")
  if (!productId) return

  const product = products.find((p) => p.id == productId)
  if (!product) return

  // Update product details
  document.getElementById("product-title").textContent = product.name
  document.getElementById("product-price").textContent = `$${product.price}`
  document.getElementById("main-product-image").src = product.image

  // Setup thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail")
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      document.getElementById("main-product-image").src = thumb.src
      thumbnails.forEach((t) => t.classList.remove("active"))
      thumb.classList.add("active")
    })
  })

  // Setup configuration select
  const configSelect = document.getElementById("config-select")
  if (configSelect) {
    configSelect.addEventListener("change", (e) => {
      const prices = {
        base: product.price,
        upgraded: product.price + 200,
        premium: product.price + 500,
      }
      document.getElementById("product-price").textContent = `$${prices[e.target.value]}`
    })
  }
}

// Quantity controls
function changeQuantity(change) {
  const quantityInput = document.getElementById("quantity")
  if (!quantityInput) return

  const currentValue = Number.parseInt(quantityInput.value)
  const newValue = currentValue + change

  if (newValue >= 1 && newValue <= 10) {
    quantityInput.value = newValue
  }
}

// Add to cart functionality
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showSuccessMessage("Product added to cart!")
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  if (cartCount) {
    cartCount.textContent = totalItems
  }
}

// Buy now functionality
function buyNow() {
  const productId = localStorage.getItem("selectedProduct")
  const quantity = Number.parseInt(document.getElementById("quantity")?.value || 1)

  addToCart(Number.parseInt(productId), quantity)
  window.location.href = "checkout.html"
}

// Wishlist functionality
function toggleWishlist(productId) {
  // This would typically interact with a backend
  showSuccessMessage("Added to wishlist!")
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`

  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}

// Checkout functionality
let currentStep = 1

function setupCheckout() {
  // Load cart items
  loadCartItems()

  // Setup form validation
  setupFormValidation()

  // Setup payment method switching
  setupPaymentMethods()

  // Setup shipping cost calculation
  setupShippingCalculation()
}

function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  if (!cartItemsContainer || cart.length === 0) return

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Base Model</p>
                <div class="item-price">
                    <span class="quantity">Qty: ${item.quantity}</span>
                    <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  updateOrderTotals()
}

function updateOrderTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shippingCost = getShippingCost()
  const total = subtotal + tax + shippingCost

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("shipping-cost").textContent = shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`
  document.getElementById("total").textContent = `$${total.toFixed(2)}`
}

function getShippingCost() {
  const shippingMethod = document.querySelector('input[name="shipping"]:checked')
  if (!shippingMethod) return 0

  const costs = {
    standard: 0,
    express: 19.99,
    overnight: 39.99,
  }

  return costs[shippingMethod.value] || 0
}

function setupShippingCalculation() {
  const shippingOptions = document.querySelectorAll('input[name="shipping"]')
  shippingOptions.forEach((option) => {
    option.addEventListener("change", updateOrderTotals)
  })
}

function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  const cardDetails = document.getElementById("card-details")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", (e) => {
      if (e.target.value === "credit-card") {
        cardDetails.style.display = "block"
      } else {
        cardDetails.style.display = "none"
      }
    })
  })
}

function setupFormValidation() {
  // Card number formatting
  const cardNumberInput = document.getElementById("cardNumber")
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
      e.target.value = formattedValue
    })
  }

  // Expiry date formatting
  const expiryInput = document.getElementById("expiryDate")
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      e.target.value = value
    })
  }

  // CVV validation
  const cvvInput = document.getElementById("cvv")
  if (cvvInput) {
    cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "")
    })
  }
}

function nextStep() {
  if (validateCurrentStep()) {
    currentStep++
    updateCheckoutStep()
  }
}

function prevStep() {
  currentStep--
  updateCheckoutStep()
}

function updateCheckoutStep() {
  // Update progress indicators
  const steps = document.querySelectorAll(".step")
  steps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add("active")
    } else {
      step.classList.remove("active")
    }
  })

  // Show/hide form sections
  const sections = document.querySelectorAll(".form-section")
  sections.forEach((section, index) => {
    if (index === currentStep - 1) {
      section.classList.add("active")
    } else {
      section.classList.remove("active")
    }
  })

  // Update review section if on confirmation step
  if (currentStep === 3) {
    updateOrderReview()
  }
}

function validateCurrentStep() {
  const currentSection = document.querySelector(".form-section.active")
  const requiredFields = currentSection.querySelectorAll("input[required], select[required]")

  let isValid = true
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444"
      isValid = false
    } else {
      field.style.borderColor = "#e2e8f0"
    }
  })

  if (!isValid) {
    showErrorMessage("Please fill in all required fields.")
  }

  return isValid
}

function updateOrderReview() {
  const shippingReview = document.getElementById("shipping-review")
  const paymentReview = document.getElementById("payment-review")

  // Update shipping review
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  const zipCode = document.getElementById("zipCode").value

  shippingReview.innerHTML = `
        <p>${firstName} ${lastName}</p>
        <p>${address}</p>
        <p>${city}, ${state} ${zipCode}</p>
    `

  // Update payment review
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value
  const cardNumber = document.getElementById("cardNumber").value

  let paymentText = ""
  if (paymentMethod === "credit-card") {
    paymentText = `Credit Card ending in ${cardNumber.slice(-4)}`
  } else if (paymentMethod === "paypal") {
    paymentText = "PayPal"
  } else if (paymentMethod === "apple-pay") {
    paymentText = "Apple Pay"
  }

  paymentReview.innerHTML = `<p>${paymentText}</p>`
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 3000)
}

// Handle form submission
document.addEventListener("submit", (e) => {
  if (e.target.id === "checkout-form") {
    e.preventDefault()
    processOrder()
  }
})

function processOrder() {
  // Show loading state
  const submitBtn = document.querySelector(".place-order-btn")
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<div class="loading"></div> Processing...'
  submitBtn.disabled = true

  // Simulate order processing
  setTimeout(() => {
    // Clear cart
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()

    // Show success message
    alert("Order placed successfully! You will receive a confirmation email shortly.")

    // Redirect to home page
    window.location.href = "index.html"
  }, 2000)
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s"
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".category-card, .product-card, .feature")
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })
})
