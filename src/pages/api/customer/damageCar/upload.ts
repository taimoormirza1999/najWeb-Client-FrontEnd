// pages/api/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('files'));

apiRoute.post(async (req, res) => {
  const files = req.files;

  // Convert uploaded files to Base64
  const base64Files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join('public/uploads', file.filename);
      const fileContent = fs.readFileSync(filePath, 'base64');
      return {
        fileName: file.originalname,
        base64: `data:${file.mimetype};base64,${fileContent}`,
      };
    })
  );

  // Simulate API call or process base64Files as needed
  console.log('Base64 Files:', base64Files);

  res.status(200).json({ message: 'Files uploaded successfully', files: base64Files });
});

export default apiRoute;
