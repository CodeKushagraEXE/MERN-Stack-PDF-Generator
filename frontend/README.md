## 🚀 Deploying to Netlify

You can easily deploy the frontend to Netlify:

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```
2. **Deploy on Netlify:**
   - Set the build command to: `npm run build`
   - Set the publish directory to: `dist`
   - (Optional) Add a `_redirects` file for SPA routing:
     - Create `public/_redirects` with the following content:
       ```
       /*    /index.html   200
       ```
   - Drag and drop the `frontend` folder into Netlify, or connect your GitHub repo and select the `frontend` directory as the site root.

Your React app will be live on Netlify! 