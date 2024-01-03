const dashboard = document.getElementById("dashboard");
const home = document.getElementById("home");
const login = document.getElementById("login");

dashboard.addEventListener("click", () => {
  document.location.replace("/dashboard");
});

if (login) {
  login.addEventListener("click", () => {
    document.location.replace("/");
  });
}
home.addEventListener("click", () => {
  document.location.replace("/home");
});
