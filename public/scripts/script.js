
  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#password");

  togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle("ri-eye-fill");
    this.classList.toggle("ri-eye-off-fill");
  });



