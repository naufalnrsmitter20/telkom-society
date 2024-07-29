export const getData = async () => {
  try {
    const res = await fetch(`/api/data/`, {
      cache: "no-store",
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
