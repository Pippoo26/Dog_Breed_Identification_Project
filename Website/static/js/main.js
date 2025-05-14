// Main JavaScript file for Dog Breed Identifier with Animations

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips if Bootstrap is loaded
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    if (typeof bootstrap !== "undefined") {
      tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
    }
  } catch (e) {
    console.log("Bootstrap tooltips not initialized")
  }

  // Animate section titles when they come into view
  const animateSectionTitles = () => {
    const titles = document.querySelectorAll(".section-title")

    titles.forEach((title) => {
      const titlePosition = title.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (titlePosition < windowHeight - 50) {
        title.classList.add("animate-line")
      }
    })
  }

  // Animate step cards when they come into view
  const animateStepCards = () => {
    const cards = document.querySelectorAll(".step-card")

    cards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (cardPosition < windowHeight - 50) {
        // Add delay based on index
        setTimeout(() => {
          card.classList.add("animate")
        }, 150 * index)
      }
    })
  }

  // Animate tech features when they come into view
  const animateTechFeatures = () => {
    const features = document.querySelectorAll(".tech-feature")

    features.forEach((feature, index) => {
      const featurePosition = feature.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (featurePosition < windowHeight - 50) {
        // Add delay based on index
        setTimeout(() => {
          feature.classList.add("animate")
        }, 150 * index)
      }
    })
  }

  // Animate tech badges when they come into view
  const animateTechBadges = () => {
    const badges = document.querySelectorAll(".tech-badge")

    badges.forEach((badge, index) => {
      const badgePosition = badge.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (badgePosition < windowHeight - 50) {
        // Add delay based on index
        setTimeout(() => {
          badge.classList.add("animate")
        }, 100 * index)
      }
    })
  }

  // Animate about image when it comes into view
  const animateAboutImage = () => {
    const image = document.querySelector(".about-image")
    if (!image) return

    const imagePosition = image.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (imagePosition < windowHeight - 50) {
      image.classList.add("animate")
    }
  }

  // Animate result page elements
  const animateResultElements = () => {
    // Animate result title line
    const resultTitle = document.querySelector(".result-card h1")
    if (resultTitle) {
      resultTitle.classList.add("animate-line")
    }

    // Animate confidence progress bar
    setTimeout(() => {
      const confidenceProgress = document.querySelector(".confidence-progress")
      if (confidenceProgress) {
        const width = confidenceProgress.style.width
        confidenceProgress.style.width = "0"
        setTimeout(() => {
          confidenceProgress.style.width = width
        }, 100)
      }
    }, 800)

    // Animate prediction progress bars
    setTimeout(() => {
      const predictionBars = document.querySelectorAll(".prediction-progress")
      predictionBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }, 1500)

    // Animate rating progress bars
    setTimeout(() => {
      const ratingBars = document.querySelectorAll(".rating-progress")
      ratingBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }, 2000)
  }

  // Run all animation functions
  const runAnimations = () => {
    animateSectionTitles()
    animateStepCards()
    animateTechFeatures()
    animateTechBadges()
    animateAboutImage()
  }

  // Run animations on load and scroll
  window.addEventListener("load", () => {
    runAnimations()
    animateResultElements()
  })
  window.addEventListener("scroll", runAnimations)

  // Handle file upload and preview
  const setupFileUpload = () => {
    const dropArea = document.getElementById("drop-area")
    const fileInput = document.getElementById("file-input")
    const fileName = document.getElementById("file-name")
    const imagePreview = document.getElementById("image-preview")
    const previewContainer = document.getElementById("preview-container")
    const predictBtn = document.getElementById("predict-btn")
    const removeImageBtn = document.getElementById("remove-image")

    if (!dropArea) return // Prevent default drag behaviors
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Highlight drop area when item is dragged over it
    ;["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false)
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight() {
      dropArea.classList.add("highlight")
    }

    function unhighlight() {
      dropArea.classList.remove("highlight")
    }

    // Handle dropped files
    dropArea.addEventListener("drop", handleDrop, false)

    function handleDrop(e) {
      const dt = e.dataTransfer
      const files = dt.files

      if (files.length) {
        fileInput.files = files
        updateFileInfo()
      }
    }

    // Handle file input change
    fileInput.addEventListener("change", updateFileInfo)

    function updateFileInfo() {
      if (fileInput.files.length) {
        const file = fileInput.files[0]
        fileName.textContent = file.name

        // Show image preview with animation
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.src = e.target.result
          previewContainer.classList.remove("d-none")
          dropArea.classList.add("has-file")
        }
        reader.readAsDataURL(file)

        // Enable predict button
        predictBtn.disabled = false
      } else {
        resetUpload()
      }
    }

    // Remove image
    if (removeImageBtn) {
      removeImageBtn.addEventListener("click", () => {
        fileInput.value = ""
        resetUpload()
      })
    }

    function resetUpload() {
      fileName.textContent = "No file selected"
      previewContainer.classList.add("d-none")
      dropArea.classList.remove("has-file")
      predictBtn.disabled = true
    }
  }

  // Set up smooth scrolling for anchor links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Handle navbar background change on scroll
  const setupNavbarScroll = () => {
    const navbar = document.querySelector(".navbar")
    if (!navbar) return

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled")
      } else {
        navbar.classList.remove("navbar-scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Run once on load
    handleScroll()
  }

  // Add loading animation to predict button when clicked
  const setupPredictButton = () => {
    const form = document.getElementById("upload-form")
    const predictBtn = document.getElementById("predict-btn")

    if (form && predictBtn) {
      form.addEventListener("submit", (e) => {
        e.preventDefault() // Prevent the default form submission

        // Show loading screen
        showLoadingScreen()

        // Submit the form after a delay to show the loading screen
        setTimeout(() => {
          form.submit()
        }, 500)
      })
    }
  }

  // Setup custom dog paw cursor
  const setupCustomCursor = () => {
    // Add custom cursor class to html element
    document.documentElement.classList.add("custom-cursor-paw")

    // Create cursor click effect
    document.addEventListener("click", (e) => {
      // Create click effect element
      const clickEffect = document.createElement("div")
      clickEffect.className = "cursor-click-effect"
      clickEffect.style.left = `${e.pageX}px`
      clickEffect.style.top = `${e.pageY}px`
      document.body.appendChild(clickEffect)

      // Remove the element after animation completes
      setTimeout(() => {
        clickEffect.remove()
      }, 500)
    })

    // Create cursor trail effect
    const trailElements = []
    const maxTrail = 5 // Maximum number of trail elements

    document.addEventListener("mousemove", (e) => {
      // Create new trail element
      const trail = document.createElement("div")
      trail.className = "cursor-trail"
      trail.style.left = `${e.pageX}px`
      trail.style.top = `${e.pageY}px`
      document.body.appendChild(trail)

      // Add to array and remove oldest if exceeding max
      trailElements.push(trail)
      if (trailElements.length > maxTrail) {
        const oldestTrail = trailElements.shift()
        oldestTrail.style.opacity = "0"
        setTimeout(() => {
          oldestTrail.remove()
        }, 200)
      }

      // Remove trail element after delay
      setTimeout(() => {
        trail.style.opacity = "0"
        setTimeout(() => {
          trail.remove()
          // Also remove from array if still there
          const index = trailElements.indexOf(trail)
          if (index > -1) {
            trailElements.splice(index, 1)
          }
        }, 200)
      }, 500)
    })
  }

  // Create and manage loading screen
  const createLoadingScreen = () => {
    const loadingScreen = document.createElement("div")
    loadingScreen.className = "loading-screen"

    // Dog facts for loading screen
    const dogFacts = [
      "Dogs have three eyelids, including one to keep their eyes moist and protected.",
      "A dog's nose print is unique, much like a human's fingerprint.",
      "Dogs can smell about 1,000-10,000 times better than humans.",
      "A Greyhound could beat a Cheetah in a long-distance race.",
      "Dogs can hear sounds up to four times farther away than humans.",
      "The tallest dog ever recorded was a Great Dane named Zeus who stood 44 inches tall.",
      "Dogs have about 1,700 taste buds, humans have approximately 9,000.",
      "The Basenji is the only dog breed that doesn't bark.",
      "Dogs dream just like humans do, and they likely dream about everyday activities.",
      "A dog's sense of smell is so precise that it can detect certain types of cancer.",
    ]

    // Get random dog fact
    const randomFact = dogFacts[Math.floor(Math.random() * dogFacts.length)]

    loadingScreen.innerHTML = `
      <div class="loading-dog-container">
        <div class="loading-circle"></div>
        <div class="loading-paw-prints">
          <div class="paw-print paw-print-1"></div>
          <div class="paw-print paw-print-2"></div>
          <div class="paw-print paw-print-3"></div>
          <div class="paw-print paw-print-4"></div>
          <div class="paw-print paw-print-5"></div>
          <div class="paw-print paw-print-6"></div>
          <div class="paw-print paw-print-7"></div>
          <div class="paw-print paw-print-8"></div>
        </div>
      </div>
      <div class="loading-text">Analyzing your dog...</div>
      <div class="loading-subtext">Our AI is working its magic</div>
      <div class="loading-progress">
        <div class="loading-progress-bar"></div>
      </div>
      <div class="loading-facts">Did you know? ${randomFact}</div>
    `

    document.body.appendChild(loadingScreen)
    return loadingScreen
  }

  // Show loading screen with progress animation
  const showLoadingScreen = () => {
    const loadingScreen = document.querySelector(".loading-screen") || createLoadingScreen()
    loadingScreen.classList.add("show")

    // Animate progress bar
    const progressBar = loadingScreen.querySelector(".loading-progress-bar")
    let progress = 0

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15

      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
      }

      progressBar.style.width = `${progress}%`
    }, 500)
  }

  // Initialize all UI components
  setupFileUpload()
  setupSmoothScroll()
  setupNavbarScroll()
  setupPredictButton()
  setupCustomCursor()

  // Initialize Bootstrap tooltips globally
  try {
    window.bootstrap = require("bootstrap") // Import Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  } catch (e) {
    console.log("Bootstrap tooltips not initialized")
  }
})
