const FetchData = async (url) => {
    const response = await fetch(url,{
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU1N2RiOWVkOTFkNzQ0MWQ3YTllZDUiLCJlbWFpbCI6InN1cGVyYWRtaW5AYnJhbmVlZHVjYXRpb24uY29tIiwicGFzc3dvcmQiOiJCckBuZTEyMyIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImF2YXRhciI6Imh0dHBzOi8vcmVxcmVzLmluL2ltZy9mYWNlcy84LWltYWdlLmpwZyIsImlhdCI6MTY5Mjg1MzU1MCwiZXhwIjoxNjkyODU3MTUwfQ.Twt6TmmZCRJ42ReNPPG0dzANpTXaIFPKiiZYWS3TyI4'
        }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};
export default FetchData;