// ===============================
// Vehicle Image Gallery
// ===============================

function changeImage(image) {
    const mainImage = document.getElementById("mainCarImage");

    if (mainImage) {
        mainImage.src = image;
    }
}