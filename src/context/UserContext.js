import {
    getProfile,
    insertProfile,
    updateProfile,
    uploadImage,
} from "../services/profile.js";

const { createContext, useState, useContext, useEffect } = require("react");
const { getUser } = require("../services/auth");

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser);
    const [profile, setProfile] = useState(undefined);
    const [profileAvatarInput, setProfileAvatarInput] = useState("");
    const [profileAvatarUrl, setProfileAvatarUrl] = useState("");

    useEffect(() => {
        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const data = await getProfile(user.id, profile);
                    setProfile(data);
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchUserProfile();
        }
    }, [user, profile]);

    useEffect(() => {
        const uploadAvatarImage = async () => {
            if (!profileAvatarInput) return;
            try {
                const imageFile = profileAvatarInput;

                // const imageUrl = URL.createObjectURL(imageFile);

                const randomFolder = Math.floor(Date.now() * Math.random());
                const imagePath = `profile-avatars/${randomFolder}/${imageFile.name}`;

                const url = await uploadImage(
                    "profile-avatars",
                    imagePath,
                    imageFile
                );

                console.log("afters storage bucket url creation", url);

                setProfileAvatarUrl(url);
            } catch (e) {
                console.error(e.message);
            }
        };
        uploadAvatarImage();
    }, [profileAvatarInput]);

    const handleProfileChange = async ({ username, bio, profile }) => {
        console.log("handle profile avatar change", profileAvatarUrl);

        if (!profile) {
            const fetchInsertProfile = async () => {
                try {
                    await insertProfile(user.id, profileAvatarUrl, {
                        username,
                        bio,
                    });
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchInsertProfile();
        }
        if (profile) {
            const fetchUpdateProfile = async () => {
                try {
                    const resp = await updateProfile(
                        user.id,
                        profileAvatarUrl,
                        {
                            username,
                            bio,
                        }
                    );
                    setProfile(resp);
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchUpdateProfile();
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                profile,
                setProfile,
                handleProfileChange,
                profileAvatarInput,
                setProfileAvatarInput,
                profileAvatarUrl,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const data = useContext(UserContext);

    if (!data) {
        throw new Error("useUser must be wrapped in a UserProvider");
    }
    return data;
};

export { UserProvider, useUser };
