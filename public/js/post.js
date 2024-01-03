const pathArr = window.location.pathname.split("/");
const postId = pathArr[pathArr.length - 1];

const getPost = async () => {
  try {
    const post = await fetch(`/api/post/post-by-id/${postId}`, {
      method: "GET",
    });
    const comment = await fetch(`/api/comment/${postId}`, {
      method: "GET",
    });

    if (!post.ok || !comment.ok) {
      throw new Error("Failed to fetch data");
    }

    const postData = await post.json();
    const commentData = await comment.json();

    const currentUserId = sessionStorage.getItem("user_id");

    const user = await fetch(`/api/user/name/${currentUserId}`);
    if (!user.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await user.json();
    console.log(userData);
    console.log("hello");

    if (currentUserId === postData.created_by) {
      const deletePostButton = document.createElement("button");
      deletePostButton.textContent = "Delete Post";
      deletePostButton.onclick = deletePost;
      document.getElementById("deletePost").appendChild(deletePostButton);
    }

    document.getElementById("title").textContent = postData.title;

    const descriptionElement = document.getElementById("description");
    descriptionElement.innerHTML = `<p>${postData.content}<br><br>-${userData}`;

    let commentSection = "";
    for (let i = 0; i < commentData.length; i++) {
      const name = await fetch(`/api/user/name/${commentData[i].user_id}`, {
        method: "GET",
      });

      if (!name.ok) {
        throw new Error("Failed to fetch user name");
      }

      const userName = await name.json();
      commentSection += `<div><p>${commentData[i].content}<br><br>-${userName}</p></div>`;
    }

    document.getElementById("commentSection").innerHTML = commentSection;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const commentToPost = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: document.getElementById("commentContent").value,
        user_id: sessionStorage.getItem("user_id"),
        post_id: postId,
      }),
    });

    if (response.ok) {
      console.log("Comment successful");
    } else {
      console.error("Comment failed");
    }
  } catch (error) {
    console.error("Error during Comment:", error);
  }
};

const deletePost = async () => {
  try {
    const destroyPost = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });

    if (!destroyPost.ok) {
      throw new Error("Failed to delete post");
    }
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
};

getPost();
document.getElementById("submitForm").addEventListener("click", commentToPost);
