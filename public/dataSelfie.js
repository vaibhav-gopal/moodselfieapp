function setup() {
    noCanvas();
    let video = createCapture(VIDEO);
    video.size(400, 400);
    video.id("videoCanvas");
    if ("geolocation" in navigator) {
        console.log("Geolocation available!");
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const button = document.getElementById("submit");
            document.getElementById("Latitude").textContent = lat;
            document.getElementById("Longitude").textContent = long;
            button.addEventListener("click", async () => {
                video.loadPixels();
                const image64 = video.canvas.toDataURL();
                const mood = document.getElementById("textInput").value;
                const data = {
                    lat,
                    long,
                    mood,
                    image64,
                };

                const options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
                const response = await fetch("/api", options);
                const json = await response.json();
                console.log(json);
            });
        });
    } else {
        console.log("Geolocation not available!");
    }
}
