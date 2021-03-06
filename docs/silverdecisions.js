var jsonUrl = getParameterByName('LOAD_SD_TREE_JSON');
var lng = getParameterByName('lang');
var readOnly = getParameterByName('readonly');
readOnly = readOnly ? readOnly.toLowerCase() === 'true' : false;

if(!lng || ['en', 'pl', 'it'].indexOf(lng.toLowerCase())<0){
    lng = 'en'
}

var config = {
    lng:lng,
    readOnly:!!readOnly,
    treeDesigner:{
    }
};

if(SilverDecisions.utils.detectIE()=='11'){ // IE 11
    if(platform.os.family.toLowerCase().indexOf('windows') !== -1){ // on Windows
        var osVersion = platform.os.version.toLowerCase();
        if(osVersion == '7' || osVersion.indexOf('windows server 2008') !== -1){
            SilverDecisions.utils.growl('Sorry, your platform is not fully supported (Internet Explorer 11 on Windows 7)', 'warning', 'right', 5000);
            config.treeDesigner.disableAnimations=true;
            config.treeDesigner.forceFullEdgeRedraw=true;
        }

    }
}

var app;
if(jsonUrl){
    getJSON(jsonUrl, function(err, data) {
        if (err != null) {
            alert('Error loading json from url.');
            data = null;
        }
        console.log(data);
        try{

            app = new SilverDecisions('app-container', config, data);
        }catch (e){
            console.log(e);
            app = new SilverDecisions('app-container', config);
        }
    });
}else{
    app = new SilverDecisions('app-container', config);
}

document.addEventListener('SilverDecisionsSaveEvent', function(data){
    console.log(data);
});

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
}

