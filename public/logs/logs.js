getData();
async function getData() {
    const response = await fetch("/api");
    const data = await response.json();
    for (const item of data) {
        const root = document.createElement("div");
        root.id = "dataPacket";
        const mood = document.createElement("p");
        const geo = document.createElement("p");
        const date = document.createElement("p");
        const image = document.createElement("img");
        const dateString = new Date(item.timestamp).toLocaleString();
        mood.textContent = `Mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.long}°`;
        date.textContent = `Date: ${dateString}`;
        image.src = item.image64;
        image.alt = "A person making silly faces.";
        root.append(mood, geo, date, image);
        document.body.append(root);
    }
    console.log(data);
}
