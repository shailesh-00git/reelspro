class ApiClient {
  async fetch(endpoint, options = {}) {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response.json();
  }

  // GET all videos
  getVideos() {
    return this.fetch("/videos");
  }

  // GET single video
  getVideo(id) {
    return this.fetch(`/videos/${id}`);
  }

  // CREATE video
  createVideo(videoData) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }

  // get total videos uploaded by a user
  getUserVideoCount() {
    return this.fetch("/video/user");
  }
}

export const apiClient = new ApiClient();
