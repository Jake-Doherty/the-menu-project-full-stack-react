import { client, checkError } from "./client.js";

export async function getProfile(userId) {
    const response = await client
        .from("profiles")
        .select("*")
        .match({ id: userId })
        .maybeSingle();

    return checkError(response);
}

export async function insertProfile(userId, { username, bio }) {
    console.log("updateProfile args", userId, username, bio);

    const response = await client
        .from("profiles")
        .insert({ display_name: username, bio: bio })
        .match({ id: userId })
        .maybeSingle();

    console.log("updateProfile response", response);

    return checkError(response);
}

export async function updateProfile(userId, { username, bio }) {
    console.log("updateProfile args", userId, username, bio);

    const response = await client
        .from("profiles")
        .update({ display_name: username, bio: bio })
        .match({ id: userId })
        .maybeSingle();

    console.log("updateProfile response", response);

    return checkError(response);
}
