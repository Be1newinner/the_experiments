export default async function query(req, res) {

    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('grant_type', 'client_credentials');
      encodedParams.set('client_id', process?.env?.CLIENT_ID); 
      encodedParams.set('client_secret', process?.env?.CLIENT_SECRET);
  
      const response = await fetch("https://api.instamojo.com/oauth2/token/", {
        method: "POST",
        body: encodedParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "https://www.creditklick.com", 
        },
      });
      
      if (!response.ok) {
        const errorMessage = await response.text(); 
        res.status(response.status).json({ error: errorMessage });
      } else {
        const responseData = await response.json(); 
        res.status(200).json(responseData);
      }
    } catch (error) {
      res
        .status(error.status || 8000)
        .json({ msg: "Request failed with: " + error.message });
    }
  }
  