
//TODO maybe use some templating engine instead
export class Templates{

    static toolbar =
        '<div id="toolbar">' +
            '<button id="saveButton">Export to PNG</button>'+
            '<button id="saveButtonSvg">Export to SVG</button>'+
        '</div>';

    static main =
        '<div id="silver-decisions">'+
            Templates.toolbar+
            '<div id="tree-designer-container"></div>'+
        '</div>';

}



