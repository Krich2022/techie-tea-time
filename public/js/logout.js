const logout = async () => {
  const response = await fetch("/api/user/logout/", {
    method: "POST",
    headers: { "Content-Type": "applicaton/json" },
  });

  if (response.ok) {
    sessionStorage.removeItem("user_id");
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);
