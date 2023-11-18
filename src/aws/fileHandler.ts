// Import AWS SDK
import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-region',
});

// Create an S3 instance
const s3 = new AWS.S3();

  const uploadFile = (file: File) => {
    const params = {
      Bucket: 'your-bucket-name',
      Key: `uploads/${file.name}`, // specify the S3 path for the file
      Body: file,
      ACL: 'public-read', // adjust the access control as needed
    };

    s3.upload(params, (err:Error, data:any) => {
      if (err) {
        console.error(err);
        alert('Error uploading file');
      } else {
        console.log('File uploaded successfully:', data.Location);
        alert('File uploaded successfully');
      }
    });
  };