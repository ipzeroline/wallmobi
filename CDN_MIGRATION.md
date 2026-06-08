# CDN Migration

WallMobi supports Cloudinary for new admin uploads while keeping old local image URLs working.

Add these values to `.env.local`:

```bash
CLOUDINARY_CLOUD_NAME=ds7zph6nn
CLOUDINARY_API_KEY=886934456593984
CLOUDINARY_API_SECRET=replace_with_your_real_secret
CLOUDINARY_UPLOAD_FOLDER=wallmobi/wallpapers/uploads
```

Behavior:
- If Cloudinary env values are present, new Admin uploads are stored on Cloudinary and the database stores the Cloudinary `secure_url`.
- If Cloudinary env values are missing, uploads continue to use `public/wallpapers/uploads`.
- Existing local image URLs keep working.
- Migration never deletes local files.

Check existing local images before migrating:

```bash
npm run cdn:migrate:check
```

Upload local images to Cloudinary and update only successful rows:

```bash
npm run cdn:migrate:apply
```
