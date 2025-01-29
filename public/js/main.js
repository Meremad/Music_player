// Main JavaScript file

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('form[action="/login"]')
    if (loginForm) {
      loginForm.addEventListener("submit", handleFormSubmit)
    }
  
    const registerForm = document.querySelector('form[action="/register"]')
    if (registerForm) {
      registerForm.addEventListener("submit", handleFormSubmit)
    }
  })
  
  function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
  
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = data.redirect
        } else {
          showError(form, data.error)
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        showError(form, "An error occurred. Please try again.")
      })
  }
  
  function showError(form, message) {
    let errorDiv = form.querySelector(".error-message")
    if (!errorDiv) {
      errorDiv = document.createElement("div")
      errorDiv.className = "error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      form.insertBefore(errorDiv, form.firstChild)
    }
    errorDiv.textContent = message
  }
  
  