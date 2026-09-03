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

        if (!response.ok) {
            throw new Error(data.error?.message || "Upload ảnh thất bại.");
        }

        return data.secure_url;
    }
    catch (error) {
        console.log(error);
    }
}