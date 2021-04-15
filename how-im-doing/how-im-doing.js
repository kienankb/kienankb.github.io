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

function groupDaysByMonth(data) {
    let months = [];
    let currentMonth = [];
    let monthNumber = data[0].date.getMonth();
    data.map(day => {
        if (day.date.getMonth() !== monthNumber) {
            months.push(currentMonth);
            currentMonth = [];
            monthNumber = day.date.getMonth();
        }
        currentMonth.push(day);
    });
    months.push(currentMonth);
    return months;
}

function render(results) {
    var elem = document.getElementById("twocanvas");
    var two = new Two({fullscreen: true}).appendTo(elem);
    // draw full-height linear
    let fullHeightLabel = new Two.Text('left-hand side moves from past to present downward', 250, 25);
    two.add(fullHeightLabel);
    let explanationLabel = new Two.Text(
        'black = basically nonfunctional day, red = bad day, orange = okay day, green = good day, blue = great day, white = missing data',
        450,
        50);
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
        let monthLabelText = moment(month[0].date).format('MMMM YYYY');
        let monthLabel = new Two.Text(monthLabelText, 105, 150 + (25 * monthNumber));
        two.add(monthLabel);
        month.map((day) => {
            let dayRect = two.makeRectangle(
                150 + (25 * day.date.getDate()),
                150 + (25 * monthNumber),
                25,
                25);
            dayRect.fill = `#${DAY_COLORS[day.rating]}`;
            dayRect.noStroke();
        })
    });
    two.update();
}