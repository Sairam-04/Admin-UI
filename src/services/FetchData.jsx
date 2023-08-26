import Authorization from "../authorization";
const FetchData = async (url) => {
    const response = await fetch(url,{
        headers:{
            'Content-Type': 'application/json',
            'authorization': Authorization
        }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};
export default FetchData;