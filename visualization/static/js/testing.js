//dropdown menu
function dropDownMenu() {
    var menu = d3.select("#selDataset");

    d3.json("input_data.json").then((data) => {
        var stateName = data.states;
        stateName.forEach((state) => {
            menu
            .append("option")
            .text(state)
            .property("value", state);                
        });

        //set default
        const defaultState = stateName[0];
        demoTable(defaultState);
        charting(defaultState);
    });
}

function optionChanged(stateName) {
    demoTable(stateName)
    charting(stateName);
}

function demoTable(stateName) {
    d3.json("input_data.json").then((data) => {
        var tabInfo = data.tabledata;
        console.log(tabInfo)
        var filtered = tabInfo.filter(x => x.id == stateName)[0];
        console.log('abc' , filtered)
        var filtered_1 = tabInfo.filter(x => x.id == stateName)[1];
        console.log(filtered_1)
        var filtered_2 = tabInfo.filter(x => x.id == stateName)[2];
        console.log(filtered_2)
        var tablegraphic = d3.select("#state-tabledata");
        tablegraphic.html("")
        

        Object.entries(filtered).forEach(([key, value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');

        });
        Object.entries(filtered_1).forEach(([key,value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');

        });
        Object.entries(filtered_2).forEach(([key,value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');

        });
    });
}






//initialize Dashboard
dropDownMenu();