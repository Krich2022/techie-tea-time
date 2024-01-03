const showPost = (postId) => {
  window.location.href = `/post/${postId}`;
};

const getAllPosts = async () => {
  try {
    const postResponse = await fetch("/api/post", {
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
      const name = await fetch(`/api/user/name/${postObj.created_by}`, {
        method: "GET",
      });

      if (!name.ok) {
        throw new Error("Failed to fetch user name");
      }

      const userName = await name.json();

      const postHtml = `
        <div class="bg-gray-200 p-4 rounded cursor-pointer" onclick="showPost(${postObj.id})">
          <h2>${postObj.title}</h2>
          <p id="desc">${postObj.content}<br><br>-${userName}</p>
        </div>
      `;

      postContainer.innerHTML += postHtml;
    }
  } catch (error) {
    console.error("Error during fetching posts:", error);
  }
};

getAllPosts();
