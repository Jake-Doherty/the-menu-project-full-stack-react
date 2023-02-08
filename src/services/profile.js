import { client, checkError } from "./client.js";

export async function getProfile(userId, profile) {
    if (profile) return profile;
    const response = await client
        .from("profiles")
        .select("*")
        .match({ id: userId })
        .maybeSingle();

    return checkError(response);
}

export async function insertProfile(userId, { username, bio, profileAvatar }) {
    const response = await client
        .from("profiles")
        .insert({
            display_name: username,
            bio: bio,
            avatar_image_url: profileAvatar,
        })
        .match({ id: userId })
        .maybeSingle();

    return checkError(response);
}

export async function updateProfile(userId, { username, bio, profileAvatar }) {
    const response = await client
        .from("profiles")
        .update({
            display_name: username,
            bio: bio,
            avatar_image_url: profileAvatar,
        })
        .match({ id: userId })
        .maybeSingle();

    return checkError(response);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: "3600",
        upsert: true,
    });

    if (response.error) {
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
