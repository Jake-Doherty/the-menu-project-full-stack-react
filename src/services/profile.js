import { client, checkError } from './client.js';

export async function getProfile(userId, profile) {
  if (profile) return profile;
  const response = await client
    .from('profiles')
    .select('*')
    .match({ user_id: userId })
    .maybeSingle();

  return checkError(response);
}

export async function insertProfile(userId, { username, bio, profileAvatar, darkMode }) {
  const response = await client
    .from('profiles')
    .insert({
      display_name: username,
      bio: bio,
      avatar_image_url: profileAvatar,
      dark_mode: darkMode,
    })
    .match({ user_id: userId })
    .maybeSingle();

  return checkError(response);
}

export async function updateProfile(userId, { username, bio, profileAvatar, darkMode }) {
  let response = await client.from('profiles').select('*');

  if (username) {
    response = await client
      .from('profiles')
      .update({ display_name: username })
      .match({ user_id: userId })
      .maybeSingle();
  }

  if (bio) {
    response = await client
      .from('profiles')
      .update({ bio: bio })
      .match({ user_id: userId })
      .maybeSingle();
  }

  if (profileAvatar) {
    response = await client
      .from('profiles')
      .update({ avatar_image_url: profileAvatar })
      .match({ user_id: userId })
      .maybeSingle();
  }

  response = await client
    .from('profiles')
    .update({ dark_mode: darkMode })
    .match({ user_id: userId })
    .maybeSingle();

  return checkError(response);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
  const bucket = client.storage.from(bucketName);

  const response = await bucket.upload(imagePath, imageFile, {
    cacheControl: '3600',
    upsert: true,
  });

  if (response.error) {
    console.error(response.error);
    return null;
  }

  // Construct the URL to this image:
  const url = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

  return url;
}
