const DAY_COLORS = {
    "0": "ffffff",
    "1": "000000",
    "2": "FF0000",
    "3": "FFA500",
    "4": "00FF00",
    "5": "1e90ff"
};

function onLoad(presentation) {
    Papa.parse("./days.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        transform: (value, header) => {
            if (header === "date") {
                return new moment(value, "MM/DD/YYYY");
            } else if (["create", "care", "talk", "move", "work", "read", "write"].includes(header)) {
                let toBool = {"0": false, "1": true, "null": null};
                return toBool[value];
            }
            return value;
        },
        complete: presentation === '2D' ? render2D : null,
    });
}

function groupDaysByMonth(data) {
    let months = [];
    let currentMonth = [];
    let monthNumber = data[0].date.month();
    data.map(day => {
        if (day.date.month() !== monthNumber) {
            months.push(currentMonth);
            currentMonth = [];
            monthNumber = day.date.month();
        }
        currentMonth.push(day);
    });
    months.push(currentMonth);
    return months;
}

function render2D(results) {
    var elem = document.getElementById("twocanvas");
    var two = new Two({fullscreen: true}).appendTo(elem);
    // draw full-height linear
    let fullHeightLabel = new Two.Text(
        'left-hand side moves from past to present downward',
        55,
        25);
    fullHeightLabel.alignment = 'left;'
    two.add(fullHeightLabel);
    let explanationLabel = new Two.Text(
        'black = basically nonfunctional day, red = bad day, orange = okay day, green = good day, blue = great day, white = missing data',
        55,
        50);
    explanationLabel.alignment = 'left';
    two.add(explanationLabel);
    let dayHeight = two.height / results.data.length;
    results.data.map((day, i) => {
        let rect = two.makeRectangle(
            25,
            (i*dayHeight)+(dayHeight/2),
            50,
            dayHeight);
        rect.fill = `#${DAY_COLORS[day.rating]}`;
        rect.noStroke();
    });
    // draw by month
    let monthSorted = groupDaysByMonth(results.data);
    monthSorted.map((month, monthNumber) => {
        let monthLabelText = month[0].date.format('MMM YYYY');
        let monthLabel = new Two.Text(monthLabelText, 55, 150 + (25 * monthNumber));
        monthLabel.alignment = 'left';
        two.add(monthLabel);
        month.map((day) => {
            let dayRect = two.makeRectangle(
                110 + (25 * day.date.date()),
                150 + (25 * monthNumber),
                25,
                25);
            dayRect.fill = `#${DAY_COLORS[day.rating]}`;
            dayRect.noStroke();
        })
    });
    two.update();
}