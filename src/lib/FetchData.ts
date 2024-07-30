export const getData = async () => {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`/api/data?t=${timestamp}`, {
      cache: "no-cache",
      method: "GET",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return data;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
