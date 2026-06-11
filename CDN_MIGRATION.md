# CDN Storage

WallMobi stores new admin uploads on Cloudinary/CDN. Local wallpaper URLs still work for old bundled files and previously uploaded rows until they are migrated.

Add these values to `.env.local`:

```bash
CLOUDINARY_CLOUD_NAME=ds7zph6nn
CLOUDINARY_API_KEY=886934456593984
CLOUDINARY_API_SECRET=replace_with_your_real_secret
CLOUDINARY_UPLOAD_FOLDER=wallmobi/wallpapers/uploads
```

Behavior:
- New Admin uploads require Cloudinary env values and are stored on Cloudinary.
- The database stores the Cloudinary `secure_url`.
- If Cloudinary env values are missing, Admin uploads fail instead of writing to `public/wallpapers/uploads`.
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
