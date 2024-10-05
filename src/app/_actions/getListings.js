export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/listing');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err.message);
  }
};
fetchData()