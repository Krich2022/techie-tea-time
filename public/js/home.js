const showPost = (postId) => {
  window.location.href = `/post/${postId}`;
};

const getAllPosts = async () => {
  try {
    const postResponse = await fetch("/api/posts", {
      method: "GET",
    });

    if (!postResponse.ok) {
      console.error("Failed to fetch posts");
      return;
    }

    const postData = await postResponse.json();
    console.log(postData);

    const postContainer = document.getElementById("postContainer");

    for (let i = 0; i < postData.length; i++) {
      const postObj = postData[i];

      const postDiv = document.createElement("div");
      postDiv.classList.add("bg-gray-200", "p-4", "rounded", "cursor-pointer");
      postDiv.addEventListener("click", () => showPost(postObj.id));

      const titleElement = document.createElement("h2");
      titleElement.textContent = postObj.title;

      const contentElement = document.createElement("p");
      contentElement.id = "desc";
      contentElement.textContent = postObj.content;

      postDiv.appendChild(titleElement);
      postDiv.appendChild(contentElement);

      postContainer.appendChild(postDiv);
    }
  } catch (error) {
    console.error("Error during fetching posts:", error);
  }
};

getAllPosts();
