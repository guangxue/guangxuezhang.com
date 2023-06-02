export const remoteImagePath = "https://assets.guangxuezhang.com/images/main/";

export async function getPostMetadata() {
  const postData = { name: "getPostMetadata" };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const blog = await data.json();
    return await Promise.resolve(blog);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function getPostContentById(id: number) {
  const editData = { name: "getPostContentById", id };
  try {
    const resq = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    const res = await resq.json();
    const { content } = res;
    return await Promise.resolve(content);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function updatePostTitle(id: number, newTitle: string) {
  const updateDate = { name: "updatePostTitle", id, newTitle };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDate),
    });
    const updated = await data.json();
    return await Promise.resolve(updated);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function updatePostSlug(id: number, newSlug: string) {
  const updateDate = { name: "updatePostSlug", id, newSlug };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDate),
    });
    const updated = await data.json();
    return await Promise.resolve(updated);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function updatePostLogo(id: number, newLogo: string) {
  const updateDate = { name: "updatePostLogo", id, newLogo };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDate),
    });
    const updated = await data.json();
    return await Promise.resolve(updated);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function updatePostIntro(id: number, newIntro: string) {
  const updateData = { name: "updatePostIntro", id, newIntro };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const updated = await data.json();
    return await Promise.resolve(updated);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function updatePostContent(id: number, newContent: string) {
  const updateData = { name: "updatePostContent", id, newContent };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const updated = await data.json();
    return await Promise.resolve(updated);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function getImageDataUrls() {
  const imageData = { name: "getImageDataUrls" };
  try {
    const data = await fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    const dataUrls = await data.json();
    return await Promise.resolve(dataUrls);
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function uploadFile(filename: string, dataUrl: string) {
  const imageData = { filename, dataUrl };
  return fetch("/api/blog/uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageData),
  })
    .then((resOk) => {
      return Promise.resolve(resOk);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function getImageList() {
  const imageAction = { name: "getImageList" };
  return fetch("/api/blog/image/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageAction),
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
