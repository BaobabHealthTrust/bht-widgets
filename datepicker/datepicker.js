"use strict"

var datePicker = ({

    $: function (id) {

        return document.getElementById(id);

    },

    sheet: function () {
        // Create the <style> tag
        var style = document.createElement("style");

        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    },

    addCSSRule: function (sheet, selector, rules, index) {

        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }

    },

    leapYear: function (year) {

        var yr = parseInt(year);

        var result = ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);

        return result;

    },

    checkDate: function (pos) {

        var year =
            (parseInt((datePicker.$("text1-0").value.trim().length > 0 ? datePicker.$("text1-0").value : 0)) * 1000) +
            (parseInt((datePicker.$("text1-1").value.trim().length > 0 ? datePicker.$("text1-1").value : 0)) * 100) +
            (parseInt((datePicker.$("text1-2").value.trim().length > 0 ? datePicker.$("text1-2").value : 0)) * 10) +
            (parseInt((datePicker.$("text1-3").value.trim().length > 0 ? datePicker.$("text1-3").value : 0)));

        var currentDate = "";

        var target = ([5, 6].indexOf(pos) >= 0 ? 5 : ([8, 9].indexOf(pos) >= 0 ? (pos - 1) : pos));

        var ruleGroups = {
            "text1-1": {
                1: [2, 4, 11]
            },
            "text1-2": {
                2: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            },
            "text1-3": {
                3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            },
            "text1-5": {
                5: [2, 3, 4, 5, 6, 7],
                6: [2, 3, 4, 5, 6, 7]
            },
            "text1-7": {
                8: [2, 3, 4, 5]
            },
            "text1-8": {
                9: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            }
        };

        var months = {
            "January": 0,
            "February": 1,
            "March": 2,
            "April": 3,
            "May": 4,
            "June": 5,
            "July": 6,
            "August": 7,
            "September": 8,
            "October": 9,
            "November": 10,
            "December": 11
        };

        var month =
            (datePicker.$("text1-5").value.trim().length > 0 ? months[datePicker.$("text1-5").value.trim()] : -1);

        var date =
            (parseInt((datePicker.$("text1-7").value.trim().length > 0 ? datePicker.$("text1-7").value : 0)) * 10) +
            (parseInt((datePicker.$("text1-8").value.trim().length > 0 ? datePicker.$("text1-8").value : 0)));

        var texts = ["text1-1", "text1-2", "text1-3", "text1-5", "text1-7", "text1-8"];

        if (datePicker.$("text1-" + target).value.trim().length <= 0) {

            switch (target) {

                case 2:
                    texts = ["text1-3", "text1-5", "text1-7", "text1-8"];
                    break;

                case 3:
                    texts = ["text1-5", "text1-7", "text1-8"];
                    break;

                case 5:
                    texts = ["text1-7", "text1-8"];
                    break;

                case 7:
                    texts = ["text1-8"];
                    break;

                case 8:
                    texts = [];
                    break;

                default:
                    texts = ["text1-1", "text1-2", "text1-3", "text1-5", "text1-7", "text1-8"];
                    break;

            }

            for (var i = 0; i < texts.length; i++) {

                var key = texts[i];

                var cols = Object.keys(ruleGroups[key]);

                for (var c = 0; c < cols.length; c++) {

                    for (var r = 0; r < ruleGroups[key][cols[c]].length; r++) {

                        var row = ruleGroups[key][cols[c]][r];

                        if (datePicker.$("btn" + row + "-" + cols[c])) {

                            var klass = datePicker.$("btn" + row + "-" + cols[c]).className;

                            klass = klass.replace(/blue/, "gray");

                            datePicker.$("btn" + row + "-" + cols[c]).className = klass;

                        }

                    }

                }

            }

        } else if (datePicker.$("text1-" + target).value.trim().length > 0) {

            switch (target) {

                case 0:
                    texts = ["text1-1", "text1-2", "text1-3", "text1-5", "text1-7", "text1-8"];
                    break;

                case 1:
                    texts = ["text1-2", "text1-3", "text1-5", "text1-7", "text1-8"];
                    break;

                case 2:
                    texts = ["text1-3", "text1-5", "text1-7", "text1-8"];
                    break;

                case 3:
                    texts = ["text1-5", "text1-7", "text1-8"];
                    break;

                case 5:
                    texts = ["text1-7", "text1-8"];
                    break;

                case 7:
                    texts = ["text1-8"];
                    break;

                case 8:
                    texts = [];
                    break;

            }

            for (var i = 0; i < texts.length; i++) {

                var key = texts[i];

                if (datePicker.$(texts[i])) {

                    datePicker.$(texts[i]).value = "";

                }

                var cols = Object.keys(ruleGroups[key]);

                for (var c = 0; c < cols.length; c++) {

                    for (var r = 0; r < ruleGroups[key][cols[c]].length; r++) {

                        var row = ruleGroups[key][cols[c]][r];

                        if (datePicker.$("btn" + row + "-" + cols[c])) {

                            var klass = datePicker.$("btn" + row + "-" + cols[c]).className;

                            klass = klass.replace(/blue/, "gray");

                            datePicker.$("btn" + row + "-" + cols[c]).className = klass;

                        }

                    }

                }

            }

            switch (target) {

                case 0:
                    texts = ["text1-1"];
                    break;

                case 1:
                    texts = ["text1-2"];
                    break;

                case 2:
                    texts = ["text1-3"];
                    break;

                case 3:
                    texts = ["text1-5"];
                    break;

                case 5:
                    texts = ["text1-7"];
                    break;

                case 7:
                    texts = ["text1-8"];
                    break;

                case 8:
                    texts = [];
                    break;

            }

            if (target == 0 && year < 2000 && year > 0) {

                ruleGroups["text1-1"][1] = [11];

            } else if (target == 0 && year >= 2000) {

                ruleGroups["text1-1"][1] = [2];

            }

            if (date == 0 && target == 7) {

                ruleGroups["text1-8"][9].splice(ruleGroups["text1-8"][9].indexOf(2), 1);

            }

            var maxYr = (this.maxDate != undefined ? (!isNaN((new Date(this.maxDate)).getFullYear()) ?
                (new Date(this.maxDate)) : (new Date())) : (new Date())).getFullYear();

            var maxMonth = (this.maxDate != undefined ? (!isNaN((new Date(this.maxDate)).getMonth()) ?
                (new Date(this.maxDate)) : (new Date())) : (new Date())).getMonth();

            var maxDate = (this.maxDate != undefined ? (!isNaN((new Date(this.maxDate)).getDate()) ?
                (new Date(this.maxDate)) : (new Date())) : (new Date())).getDate();

            var monthMaxes = {
                0: 31,
                1: (datePicker.leapYear(year) ? 29 : 28),
                2: 31,
                3: 30,
                4: 31,
                5: 30,
                6: 31,
                7: 31,
                8: 30,
                9: 31,
                10: 30,
                11: 31
            };

            if (target == 1 && year >= 2000) {

                var max = Math.floor((maxYr % 100) / 10);

                var arr = [];

                for (var i = 0; i <= max; i++) {

                    arr.push(i + 2);

                }

                ruleGroups["text1-2"][2] = arr;

            } else if (target == 2 && year >= 2000) {

                if (Math.floor((year % 100) / 10) >= Math.floor((maxYr % 100) / 10)) {

                    var max = Math.floor((maxYr % 1000) % 10);

                    var arr = [];

                    for (var i = 0; i <= max; i++) {

                        arr.push(i + 2);

                    }

                    ruleGroups["text1-3"][3] = arr;

                }

            } else if (target == 3 && year == maxYr) {

                var max = maxMonth;

                var arr1 = [];
                var arr2 = [];

                var j = 0;
                for (var i = 0; i <= max; i++) {

                    if (i % 2 == 0) {

                        arr1.push(j + 2);

                    } else {

                        arr2.push(j + 2);

                        j++;

                    }

                }

                ruleGroups["text1-5"][5] = arr1;

                ruleGroups["text1-5"][6] = arr2;

            } else if (target == 5) {

                var max = (month == maxMonth && maxYr == year ? ((Math.floor(date / 10)) > (month * 10) ? ((Math.floor(maxDate / 10)) - 1) :
                    (Math.floor(maxDate / 10))) : (month == 1 ? 2 : 3));

                var arr = [];

                for (var i = 0; i <= max; i++) {

                    arr.push(i + 2);

                }

                ruleGroups["text1-7"][8] = arr;

            } else if (target == 7) {

                var max = 0;

                if ((Math.floor(date / 10) == Math.floor(maxDate / 10)) && (date % 10) > (maxDate % 10) &&
                    year == maxYr && month == maxMonth) {

                    max = (maxDate % 10);

                } else if ((Math.floor(date / 10) == Math.floor(maxDate / 10)) && (date % 10) <= (maxDate % 10) &&
                    year == maxYr && month == maxMonth) {

                    max = (maxDate % 10);

                } else if ((Math.floor(date / 10) < Math.floor(monthMaxes[month] / 10)) && (date % 10) < (monthMaxes[month] % 10) &&
                    year == maxYr && month == maxMonth) {

                    max = 11;

                } else if ((Math.floor(date / 10) == Math.floor(monthMaxes[month] / 10)) && date <= monthMaxes[month]) {

                    max = (monthMaxes[month] % 10);

                } else {

                    max = 11;

                }

                var arr = [];

                for (var i = 0; i <= max; i++) {

                    arr.push(i + 2);

                }

                if (date == 0) {

                    arr.splice(arr.indexOf(2), 1);

                }

                ruleGroups["text1-8"][9] = arr;

            }

            for (var i = 0; i < texts.length; i++) {

                var key = texts[i];

                var cols = Object.keys(ruleGroups[key]);

                for (var c = 0; c < cols.length; c++) {

                    for (var r = 0; r < ruleGroups[key][cols[c]].length; r++) {

                        var row = ruleGroups[key][cols[c]][r];

                        if (datePicker.$("btn" + row + "-" + cols[c])) {

                            var klass = datePicker.$("btn" + row + "-" + cols[c]).className;

                            klass = klass.replace(/gray/, "blue");

                            datePicker.$("btn" + row + "-" + cols[c]).className = "blue";

                        }

                    }

                }

            }

        }

    },

    loadDate: function (date) {

        var __date = new Date(date);

        if (isNaN(__date))
            return;

        var year = __date.getFullYear();

        var yr = String(year).split("");

        for (var i = 0; i < yr.length; i++) {

            var digit = parseInt(yr[i]);

            if (datePicker.$("btn" + (2 + digit) + "-" + i)) {

                datePicker.$("btn" + (2 + digit) + "-" + i).click();

            }

        }

        var cellMap = {
            0: {
                row: 2,
                col: 5
            },
            1: {
                row: 2,
                col: 6
            },
            2: {
                row: 3,
                col: 5
            },
            3: {
                row: 3,
                col: 6
            },
            4: {
                row: 4,
                col: 5
            },
            5: {
                row: 4,
                col: 6
            },
            6: {
                row: 5,
                col: 5
            },
            7: {
                row: 5,
                col: 6
            },
            8: {
                row: 6,
                col: 5
            },
            9: {
                row: 6,
                col: 6
            },
            10: {
                row: 7,
                col: 5
            },
            11: {
                row: 7,
                col: 6
            }
        }

        var month = __date.getMonth();

        var cell = cellMap[month];

        if (datePicker.$("btn" + cell.row + "-" + cell.col)) {

            datePicker.$("btn" + cell.row + "-" + cell.col).click();

        }

        var dat = __date.getDate();

        var row = (dat > 9 ? Math.floor(dat / 10) : 0) + 2;

        var cell = Math.floor(dat % 10) + 2;

        if (datePicker.$("btn" + row + "-8")) {

            datePicker.$("btn" + row + "-8").click();

        }

        if (datePicker.$("btn" + cell + "-9")) {

            datePicker.$("btn" + cell + "-9").click();

        }

    },

    buildControl: function () {

        var style = this.sheet();
        this.addCSSRule(style, ".headTab", "width: 100%");
        this.addCSSRule(style, ".headTab", "box-shadow: 5px 2px 5px 0px rgba(0,0,0,0.75)");
        this.addCSSRule(style, ".headTab", "overflow: hidden");
        this.addCSSRule(style, ".headTab", "height: 120px");
        this.addCSSRule(style, ".headTab", "border: 1px solid #004586");
        this.addCSSRule(style, ".blueText", "color: #3c60b1");

        this.addCSSRule(style, "button", "font-size: 22px !important");
        this.addCSSRule(style, "button", "padding: 15px;");
        this.addCSSRule(style, "button", "min-width: 120px");
        this.addCSSRule(style, "button", "cursor: pointer");
        this.addCSSRule(style, "button", "min-height: 55px");
        this.addCSSRule(style, "button", "border-radius: 5px !important");
        this.addCSSRule(style, "button", "margin: 3px");

        this.addCSSRule(style, "button:active", "background-color: #ffc579 !important");
        this.addCSSRule(style, "button:active", "background-image: -webkit-gradient(linear, left top, left bottom, from(#ffc579), to(#fb9d23)) !important");
        this.addCSSRule(style, "button:active", "background-image: -webkit-linear-gradient(top, #ffc579, #fb9d23) !important");
        this.addCSSRule(style, "button:active", "background-image: -moz-linear-gradient(top, #ffc579, #fb9d23) !important");
        this.addCSSRule(style, "button:active", "background-image: -ms-linear-gradient(top, #ffc579, #fb9d23) !important");
        this.addCSSRule(style, "button:active", "background-image: -o-linear-gradient(top, #ffc579, #fb9d23) !important");
        this.addCSSRule(style, "button:active", "background-image: linear-gradient(to bottom, #ffc579, #fb9d23)");
        this.addCSSRule(style, "button:active", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#ffc579, endColorstr=#fb9d23) !important");

        this.addCSSRule(style, ".blue", "border: 1px solid #7eb9d0");
        this.addCSSRule(style, ".blue", "-webkit-border-radius: 3px");
        this.addCSSRule(style, ".blue", "-moz-border-radius: 3px");
        this.addCSSRule(style, ".blue", "border-radius: 3px");
        this.addCSSRule(style, ".blue", "font-size: 28px");
        this.addCSSRule(style, ".blue", "font-family: arial, helvetica, sans-serif");
        this.addCSSRule(style, ".blue", "padding: 10px 10px 10px 10px");
        this.addCSSRule(style, ".blue", "text-decoration: none");
        this.addCSSRule(style, ".blue", "display: inline-block");
        this.addCSSRule(style, ".blue", "text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3)");
        this.addCSSRule(style, ".blue", "font-weight: bold");
        this.addCSSRule(style, ".blue", "color: #FFFFFF");
        this.addCSSRule(style, ".blue", "background-color: #a7cfdf");
        this.addCSSRule(style, ".blue", "background-image: -webkit-gradient(linear, left top, left bottom, from(#a7cfdf), to(#23538a))");
        this.addCSSRule(style, ".blue", "background-image: -webkit-linear-gradient(top, #a7cfdf, #23538a)");
        this.addCSSRule(style, ".blue", "background-image: -moz-linear-gradient(top, #a7cfdf, #23538a)");
        this.addCSSRule(style, ".blue", "background-image: -ms-linear-gradient(top, #a7cfdf, #23538a)");
        this.addCSSRule(style, ".blue", "background-image: -o-linear-gradient(top, #a7cfdf, #23538a)");
        this.addCSSRule(style, ".blue", "background-image: linear-gradient(to bottom, #a7cfdf, #23538a)");
        this.addCSSRule(style, ".blue", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#a7cfdf, endColorstr=#23538a)");

        this.addCSSRule(style, ".blue:hover", "border: 1px solid #5ca6c4");
        this.addCSSRule(style, ".blue:hover", "background-color: #82bbd1");
        this.addCSSRule(style, ".blue:hover", "background-image: -webkit-gradient(linear, left top, left bottom, from(#82bbd1), to(#193b61))");
        this.addCSSRule(style, ".blue:hover", "background-image: -webkit-linear-gradient(top, #82bbd1, #193b61)");
        this.addCSSRule(style, ".blue:hover", "background-image: -moz-linear-gradient(top, #82bbd1, #193b61)");
        this.addCSSRule(style, ".blue:hover", "background-image: -ms-linear-gradient(top, #82bbd1, #193b61)");
        this.addCSSRule(style, ".blue:hover", "background-image: -o-linear-gradient(top, #82bbd1, #193b61)");
        this.addCSSRule(style, ".blue:hover", "background-image: linear-gradient(to bottom, #82bbd1, #193b61)");
        this.addCSSRule(style, ".blue:hover", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#82bbd1, endColorstr=#193b61)");

        this.addCSSRule(style, ".green", "border: 1px solid #34740e");
        this.addCSSRule(style, ".green", "-webkit-border-radius: 3px");
        this.addCSSRule(style, ".green", "-moz-border-radius: 3px");
        this.addCSSRule(style, ".green", "border-radius: 3px");
        this.addCSSRule(style, ".green", "font-size: 28px");
        this.addCSSRule(style, ".green", "font-family: arial, helvetica, sans-serif");
        this.addCSSRule(style, ".green", "padding: 10px 10px 10px 10px");
        this.addCSSRule(style, ".green", "text-decoration: none");
        this.addCSSRule(style, ".green", "display: inline-block");
        this.addCSSRule(style, ".green", "text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3)");
        this.addCSSRule(style, ".green", "font-weight: bold");
        this.addCSSRule(style, ".green", "color: #FFFFFF");
        this.addCSSRule(style, ".green", "background-color: #4ba614");
        this.addCSSRule(style, ".green", "background-image: -webkit-gradient(linear, left top, left bottom, from(#4ba614), to(#008c00))");
        this.addCSSRule(style, ".green", "background-image: -webkit-linear-gradient(top, #4ba614, #008c00)");
        this.addCSSRule(style, ".green", "background-image: -moz-linear-gradient(top, #4ba614, #008c00)");
        this.addCSSRule(style, ".green", "background-image: -ms-linear-gradient(top, #4ba614, #008c00)");
        this.addCSSRule(style, ".green", "background-image: -o-linear-gradient(top, #4ba614, #008c00)");
        this.addCSSRule(style, ".green", "background-image: linear-gradient(to bottom, #4ba614, #008c00)");
        this.addCSSRule(style, ".green", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#4ba614, endColorstr=#008c00)");

        this.addCSSRule(style, ".green:hover", "border: 1px solid #224b09");
        this.addCSSRule(style, ".green:hover", "background-color: #36780f");
        this.addCSSRule(style, ".green:hover", "background-image: -webkit-gradient(linear, left top, left bottom, from(#36780f), to(#005900))");
        this.addCSSRule(style, ".green:hover", "background-image: -webkit-linear-gradient(top, #36780f, #005900)");
        this.addCSSRule(style, ".green:hover", "background-image: -moz-linear-gradient(top, #36780f, #005900)");
        this.addCSSRule(style, ".green:hover", "background-image: -ms-linear-gradient(top, #36780f, #005900)");
        this.addCSSRule(style, ".green:hover", "background-image: -o-linear-gradient(top, #36780f, #005900)");
        this.addCSSRule(style, ".green:hover", "background-image: linear-gradient(to bottom, #36780f, #005900)");
        this.addCSSRule(style, ".green:hover", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#36780f, endColorstr=#005900)");

        this.addCSSRule(style, ".red", "border: 1px solid #72021c");
        this.addCSSRule(style, ".red", "-webkit-border-radius: 3px");
        this.addCSSRule(style, ".red", "-moz-border-radius: 3px");
        this.addCSSRule(style, ".red", "border-radius: 3px");
        this.addCSSRule(style, ".red", "font-size: 28px");
        this.addCSSRule(style, ".red", "font-family: arial, helvetica, sans-serif");
        this.addCSSRule(style, ".red", "padding: 10px 10px 10px 10px");
        this.addCSSRule(style, ".red", "text-decoration: none");
        this.addCSSRule(style, ".red", "display: inline-block");
        this.addCSSRule(style, ".red", "text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3)");
        this.addCSSRule(style, ".red", "font-weight: bold");
        this.addCSSRule(style, ".red", "color: #FFFFFF");
        this.addCSSRule(style, ".red", "background-color: #a90329");
        this.addCSSRule(style, ".red", "background-image: -webkit-gradient(linear, left top, left bottom, from(#a90329), to(#6d0019))");
        this.addCSSRule(style, ".red", "background-image: -webkit-linear-gradient(top, #a90329, #6d0019)");
        this.addCSSRule(style, ".red", "background-image: -moz-linear-gradient(top, #a90329, #6d0019)");
        this.addCSSRule(style, ".red", "background-image: -ms-linear-gradient(top, #a90329, #6d0019)");
        this.addCSSRule(style, ".red", "background-image: -o-linear-gradient(top, #a90329, #6d0019)");
        this.addCSSRule(style, ".red", "background-image: linear-gradient(to bottom, #a90329, #6d0019)");
        this.addCSSRule(style, ".red", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#a90329, endColorstr=#6d0019)");

        this.addCSSRule(style, ".red:hover", "border: 1px solid #450111");
        this.addCSSRule(style, ".red:hover", "background-color: #77021d");
        this.addCSSRule(style, ".red:hover", "background-image: -webkit-gradient(linear, left top, left bottom, from(#77021d), to(#3a000d))");
        this.addCSSRule(style, ".red:hover", "background-image: -webkit-linear-gradient(top, #77021d, #3a000d)");
        this.addCSSRule(style, ".red:hover", "background-image: -moz-linear-gradient(top, #77021d, #3a000d)");
        this.addCSSRule(style, ".red:hover", "background-image: -ms-linear-gradient(top, #77021d, #3a000d)");
        this.addCSSRule(style, ".red:hover", "background-image: -o-linear-gradient(top, #77021d, #3a000d)");
        this.addCSSRule(style, ".red:hover", "background-image: linear-gradient(to bottom, #77021d, #3a000d)");
        this.addCSSRule(style, ".red:hover", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#77021d, endColorstr=#3a000d)");

        this.addCSSRule(style, ".gray", "border: 1px solid #ccc");
        this.addCSSRule(style, ".gray", "-webkit-border-radius: 3px");
        this.addCSSRule(style, ".gray", "-moz-border-radius: 3px");
        this.addCSSRule(style, ".gray", "border-radius: 3px");
        this.addCSSRule(style, ".gray", "font-size: 28px");
        this.addCSSRule(style, ".gray", "font-family: arial, helvetica, sans-serif");
        this.addCSSRule(style, ".gray", "padding: 10px 10px 10px 10px");
        this.addCSSRule(style, ".gray", "text-decoration: none");
        this.addCSSRule(style, ".gray", "display: inline-block");
        this.addCSSRule(style, ".gray", "text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3)");
        this.addCSSRule(style, ".gray", "font-weight: bold");
        this.addCSSRule(style, ".gray", "color: #FFFFFF");
        this.addCSSRule(style, ".gray", "background-color: #ccc");
        this.addCSSRule(style, ".gray", "background-image: -webkit-gradient(linear, left top, left bottom, from(#ccc), to(#999))");
        this.addCSSRule(style, ".gray", "background-image: -webkit-linear-gradient(top, #ccc, #999)");
        this.addCSSRule(style, ".gray", "background-image: -moz-linear-gradient(top, #ccc, #999)");
        this.addCSSRule(style, ".gray", "background-image: -ms-linear-gradient(top, #ccc, #999)");
        this.addCSSRule(style, ".gray", "background-image: -o-linear-gradient(top, #ccc, #999)");
        this.addCSSRule(style, ".gray", "background-image: linear-gradient(to bottom, #ccc, #999)");
        this.addCSSRule(style, ".gray", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#ccc, endColorstr=#999)");

        this.addCSSRule(style, ".gray:hover", "border: 1px solid #ccc");
        this.addCSSRule(style, ".gray:hover", "background-color: #ddd");
        this.addCSSRule(style, ".gray:hover", "background-image: -webkit-gradient(linear, left top, left bottom, from(#333), to(#ccc))");
        this.addCSSRule(style, ".gray:hover", "background-image: -webkit-linear-gradient(top, #333, #ccc)");
        this.addCSSRule(style, ".gray:hover", "background-image: -moz-linear-gradient(top, #333, #ccc)");
        this.addCSSRule(style, ".gray:hover", "background-image: -ms-linear-gradient(top, #333, #ccc)");
        this.addCSSRule(style, ".gray:hover", "background-image: -o-linear-gradient(top, #333, #ccc)");
        this.addCSSRule(style, ".gray:hover", "background-image: linear-gradient(to bottom, #333, #ccc)");
        this.addCSSRule(style, ".gray:hover", "filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#333, endColorstr=#ccc)");

        var div = document.createElement("div");
        div.id = "date.picker.div";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.border = "2px inset #ccc";
        div.style.borderRadius = "20px";
        div.style.backgroundColor = "#eee";
        div.style.MozUserSelect = "none";

        if (this.target) {

            this.target.appendChild(div);

        }

        var table = document.createElement("table");
        // table.width = "95%";
        table.border = 0;
        table.style.borderCollapse = "collapse";
        table.style.margin = "auto";
        table.style.marginTop = "20px";
        table.cellPadding = 0;

        div.appendChild(table);

        var grid = [
            [
                ["Year", 4, "font-weight: bold;"],
                ["&nbsp;", 1],
                ["Month", 2, "font-weight: bold;"],
                ["&nbsp;", 1],
                ["Date", 2, "font-weight: bold;"]
            ],
            [
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1],
                ["&nbsp;", 2, "width: 315px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1],
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true],
                ["&nbsp;", 1, "width: 50px; height: 30px; text-align: center; font-size: 24px", undefined, undefined, true]
            ],
            [
                ["0", 1, undefined, 'gray button', true],
                ["0", 1, undefined, 'blue button', true],
                ["0", 1, undefined, 'blue button', true],
                ["0", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["January", 1, undefined, 'blue button', true],
                ["February", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["0", 1, undefined, 'blue button', true],
                ["0", 1, undefined, 'blue button', true]
            ],
            [
                ["1", 1, undefined, 'blue button', true],
                ["1", 1, undefined, 'gray button', true],
                ["1", 1, undefined, 'blue button', true],
                ["1", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["March", 1, undefined, 'blue button', true],
                ["April", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["1", 1, undefined, 'blue button', true],
                ["1", 1, undefined, 'blue button', true]
            ],
            [
                ["2", 1, undefined, 'blue button', true],
                ["2", 1, undefined, 'blue button', true],
                ["2", 1, undefined, 'blue button', true],
                ["2", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["May", 1, undefined, 'blue button', true],
                ["June", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["2", 1, undefined, 'blue button', true],
                ["2", 1, undefined, 'blue button', true]
            ],
            [
                ["3", 1, undefined, 'gray button', true],
                ["3", 1, undefined, 'gray button', true],
                ["3", 1, undefined, 'blue button', true],
                ["3", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["July", 1, undefined, 'blue button', true],
                ["August", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["3", 1, undefined, 'blue button', true],
                ["3", 1, undefined, 'blue button', true]
            ],
            [
                ["4", 1, undefined, 'gray button', true],
                ["4", 1, undefined, 'gray button', true],
                ["4", 1, undefined, 'blue button', true],
                ["4", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["September", 1, undefined, 'blue button', true],
                ["October", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["4", 1, undefined, 'gray button', true],
                ["4", 1, undefined, 'blue button', true]
            ],
            [
                ["5", 1, undefined, 'gray button', true],
                ["5", 1, undefined, 'gray button', true],
                ["5", 1, undefined, 'blue button', true],
                ["5", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["November", 1, undefined, 'blue button', true],
                ["December", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["5", 1, undefined, 'gray button', true],
                ["5", 1, undefined, 'blue button', true]
            ],
            [
                ["6", 1, undefined, 'gray button', true],
                ["6", 1, undefined, 'gray button', true],
                ["6", 1, undefined, 'blue button', true],
                ["6", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1],
                ["6", 1, undefined, 'gray button', true],
                ["6", 1, undefined, 'blue button', true]
            ],
            [
                ["7", 1, undefined, 'gray button', true],
                ["7", 1, undefined, 'gray button', true],
                ["7", 1, undefined, 'blue button', true],
                ["7", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1],
                ["7", 1, undefined, 'gray button', true],
                ["7", 1, undefined, 'blue button', true]
            ],
            [
                ["8", 1, undefined, 'gray button', true],
                ["8", 1, undefined, 'gray button', true],
                ["8", 1, undefined, 'blue button', true],
                ["8", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1],
                ["8", 1, undefined, 'gray button', true],
                ["8", 1, undefined, 'blue button', true]
            ],
            [
                ["9", 1, undefined, 'gray button', true],
                ["9", 1, undefined, 'blue button', true],
                ["9", 1, undefined, 'blue button', true],
                ["9", 1, undefined, 'blue button', true],
                ["&nbsp;", 1],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1, undefined, 'gray button', true],
                ["&nbsp;", 1],
                ["9", 1, undefined, 'gray button', true],
                ["9", 1, undefined, 'blue button', true]
            ]
        ]

        for (var i = 0; i < grid.length; i++) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            for (var j = 0; j < grid[i].length; j++) {

                var td = document.createElement("td");
                td.id = i + "-" + j;
                td.colSpan = grid[i][j][1];

                if (grid[i][j][4] != undefined) {

                    var btn = document.createElement("button");
                    btn.className = grid[i][j][3];
                    btn.id = "btn" + i + "-" + j;
                    btn.innerHTML = grid[i][j][0];

                    if (grid[i][j][0].trim().length > 1) {

                        btn.style.minWidth = "160px";
                        btn.style.minHeight = "50px";

                    } else {

                        btn.style.minWidth = "60px";
                        btn.style.minHeight = "50px";

                    }

                    btn.onclick = function () {

                        if (this.className.split(" ").indexOf("gray") >= 0)
                            return;

                        var col = parseInt(this.id.match(/(\d)$/)[1]);

                        switch (col) {

                            case 0:
                            case 1:
                            case 2:
                            case 3:

                                if (datePicker.$("text1-" + col)) {

                                    datePicker.$("text1-" + col).value = parseInt(this.innerHTML);

                                }

                                break;
                            case 5:
                            case 6:

                                if (datePicker.$("text1-5")) {

                                    datePicker.$("text1-5").value = this.innerHTML.trim();

                                }

                                break;
                            case 8:
                            case 9:

                                if (datePicker.$("text1-" + (col - 1))) {

                                    datePicker.$("text1-" + (col - 1)).value = parseInt(this.innerHTML);

                                }

                                break;

                        }

                        var pos = parseInt(this.id.match(/(\d)$/)[1]);

                        datePicker.checkDate(pos);

                    }

                    td.appendChild(btn);

                } else if (grid[i][j][5] != undefined) {

                    var text = document.createElement("input");
                    text.id = "text" + i + "-" + j;
                    text.value = "";
                    text.type = "text";
                    text.setAttribute("readonly", true);

                    if (grid[i][j][2] != undefined) {

                        text.setAttribute("style", grid[i][j][2]);

                    }

                    td.appendChild(text);

                } else if (grid[i][j][3] != undefined) {

                    td.innerHTML = grid[i][j][0];
                    td.setAttribute("class", grid[i][j][3]);

                } else if (grid[i][j][2] != undefined) {

                    td.innerHTML = grid[i][j][0];
                    td.setAttribute("style", grid[i][j][2] + "; text-align: center; min-height: 50px; min-width: 50px;");

                } else {

                    td.innerHTML = grid[i][j][0];
                    td.style.textAlign = "center";
                    td.style.minHeight = "60px";
                    td.style.minWidth = "50px";

                }

                tr.appendChild(td);

            }

        }

        this.checkDate(0);

    },

    init: function (target, maxDate, minDate) {

        this.target = target;

        this.maxDate = maxDate;

        this.minDate = minDate;

        this.buildControl();

        setInterval(function () {

            if (datePicker.$("date.picker.div")) {


            }

        }, 10);

    }

})