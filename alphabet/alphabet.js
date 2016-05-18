var alphabet = ({

    __$: function (id) {
        return document.getElementById(id);
    },

    echo: function (msg) {
        if (console)
            console.log(msg)
    },

    setData: function (key, data) {
        this[key] = data;
    },

    getData: function (key) {
        return this[key];
    },

    buildWidget: function (target, showEmpty) {
        if (!target)
            return;

        if (!this.__$(target))
            return;

        var control = this.__$(target);

        control.innerHTML = "";

        var container = document.createElement("table");
        container.setAttribute("width", "100%");
        container.cellSpacing = 0;
        container.style.borderCollapse = "collapse";
        container.style.font = "18px'LucidaGrande',Helvetica,Arial,sans-serif";
        container.style.MozUserSelect = "none";

        control.appendChild(container);

        var mRow = document.createElement("tr");

        container.appendChild(mRow);

        var mCell1 = document.createElement("td");
        mCell1.style.width = "20%";
        mCell1.style.borderRight = "1px solid #999";

        mRow.appendChild(mCell1);

        var lDiv = document.createElement("div");
        lDiv.id = "__lDiv";
        lDiv.style.height = "100%";
        lDiv.style.width = "100%";
        lDiv.style.overflow = "auto";

        mCell1.appendChild(lDiv);

        var mCell2 = document.createElement("td");
        mCell2.style.verticalAlign = "top";

        mRow.appendChild(mCell2);

        var dDiv = document.createElement("div");
        dDiv.id = "__dDiv";
        dDiv.style.border = "none";
        dDiv.style.height = "100%";
        dDiv.style.overflow = "auto";

        mCell2.appendChild(dDiv);

        var iframe = document.createElement("iframe");
        iframe.id = "__iframe";
        iframe.style.width = "99.8%";
        iframe.style.height = "99.8%";
        iframe.style.border = "none";
        iframe.style.overflow = "auto";

        dDiv.appendChild(iframe);

        var table = document.createElement("table");
        table.style.width = "100%";

        lDiv.appendChild(table);

        var data = this['data'];

        var mainPage = "<ol style='font-size: 32px; font-weight: bold; list-style: none;'>";

        if (this['letters']) {

            for (var i = 0; i < this['letters'].length; i++) {

                var key = this['letters'][i];

                if (!data[key] && !showEmpty) {

                    continue;

                } else {

                    mainPage += "<li style='padding: 10px; text-decoration: underline; color: blue; cursor: pointer;' tag='" + key + "'" +
                        "onclick='window.parent.alphabet.remoteRootClick(false, this.getAttribute(\"tag\"))'>" + key +
                        " (" + data[key].length + ")" + "</li>";

                }

                var row = document.createElement("tr");

                table.appendChild(row);

                var th = document.createElement("th");
                th.style.verticalAlign = "top";
                th.rowSpan = "2";
                th.style.width = "45px";

                row.appendChild(th);

                var cell = document.createElement("div");
                cell.id = "letter" + key;
                cell.innerHTML = key;
                cell.style.borderBottom = "1px solid #eee";
                cell.style.borderRight = "1px solid #eee";
                cell.style.padding = "20px";
                cell.style.paddingLeft = "25px";
                cell.style.paddingRight = "25px";
                cell.style.boxShadow = "5px 2px 5px 0px rgba(0, 0, 0, 0.75)"
                cell.setAttribute("root", key);

                if (data[key]) {

                    cell.style.color = "blue";

                    cell.style.fontWeight = "bold";


                    cell.style.cursor = "pointer";

                    cell.onclick = function () {

                        var id = "parent" + this.innerHTML.trim();

                        if (alphabet.__$(id)) {

                            if (!alphabet['ignore'] && alphabet.__$(id).innerHTML.trim().length > 0) {

                                alphabet.__$(id).innerHTML = "";

                                if (alphabet.__$("__iframe")) {

                                    alphabet.__$("__iframe").setAttribute("src", alphabet['__mainPage']);

                                }

                            } else {

                                if (alphabet['currentLetter']) {

                                    var currentLetter = alphabet['currentLetter'];

                                    if (alphabet.__$("parent" + currentLetter)) {

                                        alphabet.__$("parent" + currentLetter).innerHTML = "";

                                    }

                                }

                                alphabet['currentLetter'] = this.innerHTML.trim();

                                var data = alphabet.getData("data");

                                var tbl = document.createElement("table");
                                tbl.style.width = "100%";

                                alphabet.__$(id).appendChild(tbl);

                                var letter = this.getAttribute("root");

                                var sectionPage = "<h1>" + letter + "</h1><hr style='border-color: rgba(128,128,128,0.5);' /><ul style='font-size: 28px; font-weight: normal; list-style: none;'>";

                                for (var k = 0; k < data[letter].length; k++) {

                                    var ftr = document.createElement("tr");

                                    tbl.appendChild(ftr);

                                    sectionPage += "<li style='padding: 10px; text-decoration: underline; color: blue; cursor: pointer;' tag='" + k + "'" +
                                        "onclick='window.parent.alphabet.remoteConceptClick(this.getAttribute(\"tag\"))'>" +
                                        data[letter][k]['label'] + " (" + data[letter][k]['topics'].length + ")" + "</li>";

                                    var ftd = document.createElement("td");
                                    ftd.id = "concept_" + letter + "_" + k;
                                    ftd.style.padding = "20px";
                                    ftd.style.cursor = "pointer";
                                    ftd.style.margin = "5px";
                                    ftd.style.borderBottom = "1px solid #eee";
                                    ftd.innerHTML = data[letter][k]['label'];
                                    ftd.style.boxShadow = "5px 2px 5px 0px rgba(0, 0, 0, 0.75)";
                                    ftd.setAttribute("pos", k);
                                    ftd.setAttribute("letter", letter);
                                    ftd.colSpan = 2;

                                    ftd.onclick = function () {

                                        var target = alphabet.__$("child" + this.getAttribute("letter") +
                                            this.getAttribute("pos"));

                                        if (!target)
                                            return;

                                        if (!alphabet['ignore'] && target.innerHTML.trim().length > 0) {

                                            target.innerHTML = "";

                                            target.style.borderLeft = "none";

                                            if (alphabet.__$("__iframe")) {

                                                alphabet.__$("__iframe").setAttribute("src", alphabet['__sectionPage']);

                                            }

                                        } else {

                                            if (alphabet['currentLetter'] && alphabet['currentPos']) {

                                                var currentLetter = alphabet['currentLetter'];

                                                var currentPos = alphabet['currentPos'];

                                                if (alphabet.__$("child" + currentLetter + currentPos)) {

                                                    alphabet.__$("child" + currentLetter + currentPos).innerHTML = "";

                                                }

                                            }

                                            alphabet['currentPos'] = this.getAttribute("pos");

                                            target.style.borderLeft = "2px dotted #999";

                                            var trgTbl = document.createElement("table");
                                            trgTbl.style.width = "100%";

                                            target.appendChild(trgTbl);

                                            var rawData = alphabet.getData("data");

                                            if (rawData) {

                                                var l = this.getAttribute("letter");
                                                var p = this.getAttribute("pos");

                                                var topics = rawData[l][p]['topics'];

                                                var conceptPage = "<h1>" + "<a href='javascript:window.parent.alphabet.remoteRootClick(false)'>" +
                                                    this.getAttribute("letter") + "</a>" + " > " + this.innerHTML.trim() +
                                                    "</h1><hr style='border-color: rgba(128,128,128,0.5);' /><ul style='font-size: 28px; font-weight: normal; list-style: none;'>";

                                                for (var t = 0; t < topics.length; t++) {

                                                    var trgRow = document.createElement("tr");

                                                    trgTbl.appendChild(trgRow);

                                                    conceptPage += "<li style='padding: 10px; text-decoration: underline; color: blue; cursor: pointer;' tag='" + t + "'" +
                                                        "onclick='window.parent.alphabet.remoteTopicClick(this.getAttribute(\"tag\"))'>" +
                                                        topics[t]['label'] + "</li>";

                                                    var trgTd = document.createElement("td");
                                                    trgTd.id = "topic_" + l + "_" + p + "_" + t;
                                                    trgTd.innerHTML = topics[t]['label'];
                                                    trgTd.style.padding = "20px";
                                                    trgTd.style.cursor = "pointer";
                                                    trgTd.style.margin = "5px";
                                                    trgTd.style.borderBottom = "1px solid #eee";
                                                    trgTd.style.boxShadow = "5px 2px 5px 0px rgba(0, 0, 0, 0.75)";
                                                    trgTd.setAttribute("pPos", p);
                                                    trgTd.setAttribute("tPos", t);
                                                    trgTd.setAttribute("concept", rawData[l][p]['label']);
                                                    trgTd.setAttribute("letter", l);

                                                    trgRow.appendChild(trgTd);

                                                    trgTd.onclick = function () {

                                                        var html = "<body><style>body{margin:20px;font:18px'LucidaGrande',Helvetica,Arial,sans-serif;-moz-user-select:none;" +
                                                            "overflow:auto;}.news{background-color:red;}.sports{background-color:blue;}.none{background-color:black;}</style>";

                                                        var topicContent = alphabet.getData('data')[this.getAttribute("letter")]
                                                            [this.getAttribute("pPos")]['topics'][this.getAttribute("tPos")]['content'];

                                                        html += "<h1>" + "<a href='javascript:window.parent.alphabet.remoteRootClick(true)'>" +
                                                            this.getAttribute("letter") + "</a>" + " > " +
                                                            "<a href='javascript:window.parent.alphabet.remoteConceptClick(undefined, true)'>" +
                                                            this.getAttribute("concept") + "</a>" + " > " + this.innerHTML.trim() +
                                                            "</h1><hr style='border-color: rgba(128,128,128,0.5);' />" +
                                                            topicContent + "</body>";

                                                        var page = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

                                                        if (alphabet.__$("__iframe")) {

                                                            alphabet.__$("__iframe").setAttribute("src", page);

                                                        }

                                                    }

                                                }

                                                conceptPage += "</ul>";

                                                var html = "<body><style>body{margin:20px;font:18px'LucidaGrande',Helvetica,Arial,sans-serif;-moz-user-select:none;" +
                                                    "overflow:auto;}.news{background-color:red;}.sports{background-color:blue;}.none{background-color:black;}</style>";

                                                html += conceptPage + "</body>";

                                                alphabet['__conceptPage'] = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

                                                if (alphabet.__$("__iframe")) {

                                                    alphabet.__$("__iframe").setAttribute("src", alphabet['__conceptPage']);

                                                }

                                            }

                                        }

                                    }

                                    ftr.appendChild(ftd);

                                    var str = document.createElement("tr");

                                    tbl.appendChild(str);

                                    var sftd = document.createElement("td");
                                    sftd.style.width = "40px";

                                    str.appendChild(sftd);

                                    var sstd = document.createElement("td");
                                    sstd.id = "child" + letter + k;

                                    str.appendChild(sstd);

                                }

                                sectionPage += "</ul>";

                                var html = "<body><style>body{margin:20px;font:18px'LucidaGrande',Helvetica,Arial,sans-serif;-moz-user-select:none;" +
                                    "overflow:auto;}.news{background-color:red;}.sports{background-color:blue;}.none{background-color:black;}</style>";

                                html += sectionPage + "</body>";

                                alphabet['__sectionPage'] = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

                                if (alphabet.__$("__iframe")) {

                                    alphabet.__$("__iframe").setAttribute("src", alphabet['__sectionPage']);

                                }

                            }

                        }

                    }

                } else {

                    cell.style.fontWeight = "normal";

                    cell.style.color = "#999";

                }

                th.appendChild(cell);

                var td = document.createElement("td");
                td.style.padding = "20px";
                td.style.borderBottom = "1px solid #eee";
                td.innerHTML = "&nbsp;";

                row.appendChild(td);

                var row2 = document.createElement("tr");

                table.appendChild(row2);

                var parent = document.createElement("td");
                parent.id = "parent" + key;
                parent.style.verticalAlign = "top";

                row2.appendChild(parent);

            }

        }

        mainPage += "</ol>";

        var html = "<body><style>body{margin:20px;font:18px'LucidaGrande',Helvetica,Arial,sans-serif;-moz-user-select:none;" +
            "overflow:auto;}.news{background-color:red;}.sports{background-color:blue;}.none{background-color:black;}</style>";

        html += mainPage + "</body>";

        this['__mainPage'] = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

        if (alphabet.__$("__iframe")) {

            alphabet.__$("__iframe").setAttribute("src", this['__mainPage']);

        }

    },

    remoteConceptClick: function (tag, ignore) {

        var id = "concept_" + this['currentLetter'] + "_" + (tag == undefined ? this['currentPos'] : tag);

        if (ignore) {

            this['ignore'] = ignore;

        } else {

            delete this['ignore'];

        }

        if (this.__$(id)) {

            this.__$(id).click();

            delete this['ignore'];

        }

    },

    remoteRootClick: function (ignore, tag) {

        var id = "letter" + (tag == undefined ? this['currentLetter'] : tag);

        if (ignore) {

            this['ignore'] = ignore;

        } else {

            delete this['ignore'];

        }

        if (this.__$(id)) {

            this.__$(id).click();

            delete this['ignore'];

        }

    },

    remoteTopicClick: function (tag) {

        var id = "topic_" + this['currentLetter'] + "_" + this['currentPos'] + "_" + tag;

        if (this.__$(id)) {

            this.__$(id).click();

        }

    },

    ajaxRequest: function (url, callback) {

        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function () {

            if (httpRequest.readyState == 4 && (httpRequest.status == 200 ||
                httpRequest.status == 304)) {

                var result = JSON.parse(httpRequest.responseText);

                callback(result);

            }

        };
        try {
            httpRequest.open("GET", url, true);
            httpRequest.send(null);
        } catch (e) {
        }

    },

    loadConcepts: function(path, callback){

        this.ajaxRequest(path, function(json){

            var concepts = {};

            var keys = Object.keys(json);

            for(var i = 0; i < keys.length; i++) {

                var char = keys[i].substring(0,1).toUpperCase();

                var key = keys[i];

                if(!concepts[char]) {

                    concepts[char] = [];

                }

                var entry = {
                    label: key,
                    concept: key,
                    topics: []
                };

                for(var j = 0; j < json[key].length; j++) {

                    var topic = {
                        label: json[key][j],
                        content: alphabet['articles'][json[key][j]]
                    }

                    entry.topics.push(topic);

                }

                concepts[char].push(entry);

            }

            alphabet['data'] = concepts;

            if(callback) {

                callback();

            }

        });

    },

    loadTopics: function(path, callback){

        this.ajaxRequest(path, function(json){

            alphabet['articles'] = json;

            if(callback) {

                callback();

            }

        });

    },

    init: function (target, offset, showEmpty, conceptsPath, articlesPath) {

        document.body.oncontextmenu = function() {
            return false;
        }

        alphabet['__conceptsPath__'] = (conceptsPath ? conceptsPath : "data/concepts.json");

        alphabet['__articlesPath__'] = (articlesPath ? articlesPath : "data/articles.json");

        alphabet['__target__'] = target;

        alphabet['__offset__'] = (offset != undefined ? offset : 100);

        alphabet['__showEmpty__'] = showEmpty;

        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

        this.setData('letters', letters);

        this.loadTopics(alphabet['__articlesPath__'], function(){

            alphabet.loadConcepts(alphabet['__conceptsPath__'], function(){

                alphabet.buildWidget(alphabet['__target__'], alphabet['__showEmpty__']);

                alphabet['__tmrInterval'] = setInterval(function () {

                    if (alphabet.__$("__dDiv")) {

                        alphabet.__$("__dDiv").style.height = (window.innerHeight - parseInt((alphabet['__offset__'] ?
                            alphabet['__offset__'] : 0))) + "px";

                    }

                    if (alphabet.__$("__lDiv")) {

                        alphabet.__$("__lDiv").style.height = (window.innerHeight - parseInt((alphabet['__offset__'] ?
                            alphabet['__offset__'] : 0))) + "px";

                    }

                }, 50);

            });

        });

    }

});