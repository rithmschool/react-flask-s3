# Minimal Example Sending Video Files to S3

### Setup

Backend:

```bash
# start server
cd backend
workon NAME_OF_YOUR_CAMS_VIRTUAL_ENV # this is important, since we need the AWS keys inside of this virtualenv
python app.py
```

Frontend:

```bash
cd frontend
npm i
npm start
```

The app works by having the server make a GET request to the S3 bucket to get a signature that the client can then use to upload a video directly to the bucket. This is kept secure since only the server knows the AWS access keys, and the signature the server sends back has an expiration time.

For more details on this flow, check out the [Heroku article](https://devcenter.heroku.com/articles/s3-upload-python) that inspired this example. The backend is basically taken from this article, with substantial simplifications since the server doesn't need to render any templates.