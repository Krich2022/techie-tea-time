const pathArr = window.location.pathname.split("/");
const postId = pathArr[pathArr.length - 1];
const getEvent = async () => {
  const post = await fetch(`/api/post/post-by-id/${postId}`, {
    method: "GET",
  });
  const comment = await fetch(`/api/comment/${postId}`, {
    method: "GET",
  });
  const postData = await post.json();
  const commentData = await comment.json();
  const currentUserId = sessionStorage.getItem("user_id");
  const user = await fetch(`/api/user/name/${currentUserId}`);
  console.log(user);

  if (currentUserId === postData.created_by) {
    document.getElementById(
      "deletePost"
    ).innerHTML = `<button onclick="deletePost()">Delete Post</button>`;
  }
  document.getElementById("title").textContent = postData.title;
  document.getElementById(
    "description"
  ).innerHTML = `<p>${postData.content}<br><br>`;
};

const commentToPost = async () => {
  try {
    const response = await fetch(`/api/rsvp/${postId}`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("RSVP successful");
    } else {
      console.error("RSVP failed");
    }
  } catch (error) {
    console.error("Error during RSVP:", error);
  }
};

const deletePost = async () => {
  const destroyPost = await fetch(`/api/post/${postId}`, {
    method: "delete",
  });
  console.log(destroyPost);
};

getPost();
