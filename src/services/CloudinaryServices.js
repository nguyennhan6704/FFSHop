export const uploadToCloudinary = async (imageUri, userName) => {

    const CLOUD_NAME = "dxbtuad7u"

    const UPLOAD_PRESET = "Avatar_Upload"

    try {
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            type: "image/jpg",
            name: `${userName}.jpg`
        })

        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        )

        const data = await response.json();

        return data.secure_url;
    }
    catch (error) {
    }
}