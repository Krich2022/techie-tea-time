const showPost = (e) => {
  window.location.href = `/post/${e}`;
};
const getAllPosts = async () => {
  const event = await fetch("/api/posts/user-posts", {
    method: "GET",
  });
  const postData = await post.json();
  console.log(postData);

  for (i = 0; i < postData.length; i++) {
    const postObj = postData[i];
    const postHtml = `<div
          class="bg-gray-200 p-4 rounded cursor-pointer"
          onclick="showPost(${postObj.id})"
        >
          <h2>${postObj.title}</h2>
          <p id="desc">${postObj.content}</p>
        </div>`;
    document.getElementById("postContainer").innerHTML += postHtml;
  }
};

getAllEvent();
