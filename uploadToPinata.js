const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MWIwMThmNy1iZTMyLTRlMWMtYTBhNi1lOWY4NTlkOTRjZDkiLCJlbWFpbCI6ImJpc2FpbmFuMjAyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOGFlNzM4NzVhZGUzNjEzMjEzZjIiLCJzY29wZWRLZXlTZWNyZXQiOiIyMGE1MjZjNWRjMjkzZGY3ZWM5M2E3MmJiZjUwOTgxOGJiM2JiYmJkYWIwMDU2OGVjZDIwMzUyNjUwMzM3MDViIiwiaWF0IjoxNzA3ODYyNzM2fQ.Ls9c5alf9G_HOabWlKk-4uc-Ly_SQOFQw04pTOnvuN4"
const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "mydogs.jpeg";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('mydogs', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
