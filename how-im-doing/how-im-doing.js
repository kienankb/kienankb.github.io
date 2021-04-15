const DAY_COLORS = {
    "0": "ffffff",
    "1": "000000",
    "2": "FF0000",
    "3": "FFA500",
    "4": "00FF00",
    "5": "1e90ff"
};

Papa.parse("./days.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    transform: (value, header) => {
        if (header === "date") {
            return new Date(value);
        }
        return value;
    },
    complete: render,
});

function groupDaysByMonth(argument) {
    // body...
}

function render(results) {
    var elem = document.getElementById("twocanvas");
    var two = new Two({fullscreen: true}).appendTo(elem);
    let dayHeight = two.height / results.data.length;
    results.data.map((day, i) => {
        let rect = two.makeRectangle(0+(two.width/2), (i*dayHeight)+(dayHeight/2), two.width, dayHeight);
        rect.fill = `#${DAY_COLORS[day.day]}`;
        rect.noStroke();
    });
    two.update();
    console.debug(results.data);
    console.debug(results.data.length);
    console.debug(two.height, two.width);
}