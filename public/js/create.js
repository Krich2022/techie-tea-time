const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postSubmit = document.getElementById("postSubmit");

const createEvent = async (postTitle, postContent) => {
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      content: postContent,
      created_by: sessionStorage.getItem("user_id"),
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create event");
    console.log(response);
  }
};

postSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  createEvent(postTitle.value, postContent.value);
});
