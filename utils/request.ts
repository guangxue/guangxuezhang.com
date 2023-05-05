export function getPostMetadata() {
  const postData = { name: "getPostMetadata" };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((data) => {
      return data.json();
    })
    .then((blog) => {
      return Promise.resolve(blog);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function getPostContentById(id: number) {
  const editData = { name: "getPostContentById", id };
  return fetch("api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editData),
  })
    .then((resq) => {
      return resq.json();
    })
    .then((res) => {
      const { content } = res;
      return Promise.resolve(content);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updatePostTitle(id: number, newTitle: string) {
  const updateDate = { name: "updatePostTitle", id, newTitle };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDate),
  })
    .then((data) => {
      return data.json();
    })
    .then((updated) => {
      return Promise.resolve(updated);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updatePostSlug(id: number, newSlug: string) {
  const updateDate = { name: "updatePostSlug", id, newSlug };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDate),
  })
    .then((data) => {
      return data.json();
    })
    .then((updated) => {
      return Promise.resolve(updated);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updatePostLogo(id: number, newLogo: string) {
  const updateDate = { name: "updatePostLogo", id, newLogo };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDate),
  })
    .then((data) => {
      return data.json();
    })
    .then((updated) => {
      return Promise.resolve(updated);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updatePostIntro(id: number, newIntro: string) {
  const updateData = { name: "updatePostIntro", id, newIntro };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((data) => {
      return data.json();
    })
    .then((updated) => {
      return Promise.resolve(updated);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updatePostContent(id: number, newContent: string) {
  const updateData = { name: "updatePostContent", id, newContent };
  return fetch("/api/blog/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((data) => {
      return data.json();
    })
    .then((updated) => {
      return Promise.resolve(updated);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function uploadFile(name: string, file: string) {
  const imageData = { name, file };
  return fetch("/api/blog/uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageData),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function updateMetadata() {}
