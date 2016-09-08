
var libutil = {};

libutil.util = {};

libutil.startup = {};

libutil.project = {};

libutil.window = {};

libutil.svg = {};

libutil.html = {};

libutil.dom = {};

libutil.popup = {};

libutil.www = {};

libutil.xslttransform = {};

libutil.document = {};

libutil.geometry = {};

libutil.global = {};

libutil.error = {};

libutil.regex = {};

libutil.validator = {};

libutil.script = {};

libutil.proggress = {};

libutil.LIB_NAMESPACE_URL =  'http://dvnci/lib';

libutil.SVG_NAMESPACE_URL =  'http://www.w3.org/2000/svg';

libutil.XHTML_NAMESPACE_URL =  'http://www.w3.org/1999/xhtml';

libutil.XLINK_NAMESPACE_URL =  'http://www.w3.org/1999/xlink';

libutil.XSLT_NAMESPACE_URL =  'http://www.w3.org/1999/XSL/Transform';

libutil.test = {};







function formopen(name){
    if ((!window.$$editable) || ($$editable())) return;
    var fl =  libutil.global.getFormList();
    if (fl){   
        for (var i=0; i<fl.length;++i){
            if (fl[i]['name']==name){
                if (!fl[i].window){
                    var win=window.open(fl[i]['path'],fl[i]['name'],fl[i]['param'].toString());
                    // win.document.domain=document.domain;
                    fl[i].window=win;
                }
                else{
                    fl[i].window.focus();  
                }
                return;
            }
        }
    }
}



function formclose(name){
    if ((!window.$$editable) || ($$editable())) return;
    var fl =  libutil.global.getFormList();
    if (fl){  
        for (var i=0; i<fl.length;++i){
            if (fl[i]['name']==name){
                if (fl[i].window){
                    fl[i].window.onunload=null;
                    fl[i].window.close();
                }
                fl[i].window=null;
                return;
            }
        }
    }
}



function set_win_designer(win, designer){   
    var fl =  libutil.global.getFormList();   
    if (fl){  
        for (var i=0; i<fl.length;++i){        
            if (fl[i]['name']==win.name){
                fl[i].designer_glb=designer;
                return;
            }
        }
    }
}



function formclose_win(){
    var fl =  libutil.global.getFormList();
    if (fl){      
        for (var i=0; i<fl.length;++i){
            if (fl[i].window==window){
                fl[i].window=null;                 
                return;
            }
        }
    }
}

function formclose_allwin(){
    try{
        var fl =  libutil.global.getFormList();
        if (fl){      
            for (var i=0; i<fl.length;++i){
                if (fl[i].window!=window){
                    fl[i].window.onunload=null;
                    libutil.dom.clearChildNode(fl[i].window.document.documentElement); 
                //fl[i].window=null;
                }
            }
        }
    }
    catch(err){
        alert(err);
    }
}

function exit(){
    if (window.$$global && window.$$global().___mainwindow){
        var win = window.$$global().___mainwindow;
        var unloadscript = !window.$$editable || !window.$$editable();
        if (unloadscript && win.___global___unload)
            win.___global___unload();
        win.onunload=function(){
            $$exit();
        }
        win.$$global().___mainwindow.close();
        win.$$global().___mainwindow=undefined;
    }
    else{
        $$exit();
        window.close();
    }
}




function init_project_controller(){
    libutil.global.getStartupDoc(document);
    try{
        var tmp=$$global();
        var projectPath=libutil.project.path_from_URL(document.URL);
        tmp.projectPath=projectPath;
        // var elp=libutil.global.getStartupDoc().getElementsByTagName('project')[0];
        //console.log(elp);
        //var projectPath=elp.getAttribute('path');
        //console.log(projectPath);
        $$global().loadwin = window.open(projectPath+ 'load.xml', 'initialisate' , 
            "caption=initialisate;left=0%;top=0%;width=100%;height=100%;decorated=no;allwaystop=yes");
        setTimeout(function(){
            libutil.project.init_form();
        }, 1000);
    }
    catch(error){
        console.error('init_project_controller error:',error);
        libutil.project.init_form();
    }
    
    if (window.$$editable && window.$$editable() && dsutl.toolwin) 
        dsutl.toolwin.getMainWindow();
    var tmp = window.$$global ? window.$$global() : null;
    if (tmp){
        tmp['___mainwindow'] = window;
    }

}

//





libutil.util.remove_element_arr = function(arr,ind){
    for (var i=ind; i<arr.length-1;++i)
        arr[i]=arr[i+1];
    if (ind<arr.length) 
        arr.length=arr.length-1;
}

libutil.util.insert_element_arr = function(arr, elem ,ind){
    if (arr.length==ind)
        arr.push(elem);
    arr.push(arr[arr.length-1])
    for (var i=arr.length-2; i> ind;--i){
        arr[i]==arr[i-1];
    }
    arr[ind] = elem;
}


libutil.util.trim = function(str){
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

libutil.util.replacedelim = function(str){
    return str.replace(/^\:/, "_");
}




//


libutil.global.getFormList = function (){
    if (window.$$global && !window.$$global().formlist)
        window.$$global().formlist=[];
    return window.$$global ? window.$$global().formlist : null;
}

libutil.global.getLibList = function (){
    if (window.$$global && !window.$$global().liblist)
        window.$$global().liblist=[];
    return window.$$global ? window.$$global().liblist : null;
}

libutil.global.getScriptList = function (){
    if (window.$$global && !window.$$global().scriptlist)
        window.$$global().scriptlist=[];
    return window.$$global ? window.$$global().scriptlist : null;
}

libutil.global.getStartupDoc = function (doc){
    if (window.$$global && doc)
        window.$$global().startupdocument=libutil.dom.readDoc(doc.URL);
    return window.$$global ? window.$$global().startupdocument : null;
}

libutil.global.getGlobalPropertyEditor = function (){
    return window.$$global ? window.$$global().globalpropertydialog : null;   
}

libutil.global.setGlobalPropertyEditor = function (val){
    if (window.$$global) 
        window.$$global().globalpropertydialog=val;   
}

//

libutil.startup.init = function(){
    var tmp  = window.$$global ? window.$$global() : null;
    if ((window.$$editable) && ($$editable())){
        document.red = new designer(document);
        libutil.project.add_design_style(document);
        libutil.startup.initdesigner(window.name, document.red);
        set_win_designer(window, document.red);
        if (tmp)
            tmp.currentred=document.red;
    }
    else{
        document.addEventListener('contextmenu' ,function () {
            event.stopPropagation();
            event.preventDefault();  
        });  
    }
    window.onunload=formclose_win;
}

libutil.startup.initdesigner = function(name, red){
    var fl =  libutil.global.getFormList();
    if (fl){  
        for (var i=0; i<fl.length;++i){
            if (fl[i]['name']==name){
                fl[i].red=red;
                return;
            }
        }
    }
}


//  project

libutil.project.path_from_URL = function(url){
    //alert(url);
    var pathpos=url.search(/start\.xml/);
    if (pathpos<0) return null;
    //alert(url.substring(0,pathpos));
    return url.substring(0,pathpos);   
}

libutil.project.init_form = function(){
    var doc = libutil.global.getStartupDoc();
    if (doc){
        try{
                                   
            //var tmp=$$global();
            //var projectPath=libutil.project.path_from_URL(document.URL);
            
            //tmp.projectPath=projectPath;
            
            var els=doc.getElementsByTagName('form');                                 
            var ellib=doc.getElementsByTagName('lib');
                                          
            if (els)
                for (var i=0; i<els.length;++i)   
                    libutil.project.addtoformlist(els[i]);
                          
            if (ellib)  {     
                for (var i=0; i<ellib.length;++i)
                    libutil.project.addtoliblist(ellib[i],i);
            }
                
            if ($$global().loadwin) setTimeout(function(){
                $$global().loadwin.close()
            }, 2500);                
                

            
                
            libutil.project.setXSLTScriptList();     

        }
        catch(error){ 
            alert('Startup error: '+ error)
        }
    }
}


libutil.project.buildparam = function(el){
    if (el){
        var param='';
        if (el.getAttribute('caption'))
            param=param+";caption="+el.getAttribute('caption');
        if (el.getAttribute('left'))
            param=param+";left="+el.getAttribute('left');
        if (el.getAttribute('top'))
            param=param+";top="+el.getAttribute('top');  
        if (el.getAttribute('width'))
            param=param+";width="+el.getAttribute('width');
        if (el.getAttribute('height'))
            param=param+";height="+el.getAttribute('height'); 
        if (el.getAttribute('decorated') && ((el.getAttribute('decorated')=='no') || (el.getAttribute('decorated')=='0')))
            param=param+";decorated=no";
        if (el.getAttribute('allwaystop') && ((el.getAttribute('allwaystop')=='yes') || (el.getAttribute('decorated')=='1')))
            param=param+";allwaystop=yes";
        if (el.getAttribute('resizable') && ((el.getAttribute('resizable')=='no') || (el.getAttribute('resizable')=='0')))
            param=param+";resizable=no";
        if (el.getAttribute('modal') && ((el.getAttribute('modal')=='yes') || (el.getAttribute('modal')=='1')))
            param=param+";modal=yes";    
        if (el.getAttribute('state'))
            param=param+";state="+el.getAttribute('state');

        return param;                
    }
    return '';
    
}

libutil.project.addtoformlist = function(els){
    var tmp=$$global();

    var file =  els.getAttribute('file');
    var path = tmp.projectPath && file ? tmp.projectPath.toString() + file.toString() : null;
    if (path){            
        var param = libutil.project.buildparam(els);
        var visible =((els.hasAttribute('visible')) && (els.getAttribute('visible')=='false')) ? false : true;
        if (visible) {
            var win=window.open(path, els.hasAttribute('name')  ? els.getAttribute('name') :  '', param);       
            win.document.domain=document.domain;
        } 
        var fl=libutil.global.getFormList();
        fl.push({
            'name' : els.getAttribute('name'),
            'file' : els.hasAttribute('file') ? els.getAttribute('file') : '',
            'path'  : path,
            'param'  : param,
            'window'  : win,
            'top'  : els.hasAttribute('top') ? els.getAttribute('top') : null,
            'left'  : els.hasAttribute('left') ? els.getAttribute('left') : null,
            'width'  : els.hasAttribute('width') ? els.getAttribute('width') : null,
            'height'  : els.hasAttribute('height') ? els.getAttribute('height') : null,
            'caption'  : els.hasAttribute('caption') ? els.getAttribute('caption') : '',
            'decorated'  : els.hasAttribute('decorated') ? els.getAttribute('decorated') : true,
            'resizable'  : els.hasAttribute('resizable') ? els.getAttribute('resizable') : null,
            'modal'  : els.hasAttribute('modal') ? els.getAttribute('modal') : null,
            'allwaystop'  : els.hasAttribute('allwaystop') ? els.getAttribute('allwaystop') : null,
            'visible'  : visible,
            'element' : els
        });
    }   
}


libutil.project.add_design_style  = function(doc){
    if (doc.documentElement){
        var dstyle = ".designer_selected { opacity: 0.8 !important; outline: 1px solid #E00 !important;} \n"+
        "*[isgoupelement]{ outline: 1px dashed green !important; } \n"+
        "*[ismaybeinvisible]{ outline: 1px dashed yellow !important; } \n"+
        "*[isinvisibleelement]{ outline: 1px solid green !important; } \n"+
        'g[cursor="pointer"]:hover { outline: 0px solid transparent  !important;} \n'+
        'g[cursor="pointer"].designer_selected { opacity: 0.8 !important;  outline: 1px solid red !important;} \n'+
        "*[isgoupelement].designer_selected { opacity: 0.8 !important;  outline: 1px solid red !important;}\n"+
        "*[isinvisibleelement].designer_selected { opacity: 0.8 !important;  outline: 1px solid red !important;}\n"+
        "*[filter] { filter: url('') !important;} \n"+ 
        ".highlight-selected{ fill: none !important; stroke-width: 1 !important; stroke: red !important;}\n"+ 
        ".design_captured {display: block !important;}\n"+ 
        "*[dv-visible] { display: block !important;} \n";;
    }
    libutil.html.create_style(doc.documentElement, dstyle);              
}




libutil.project.addtoliblist = function(els, i){   
    var ll=libutil.global.getLibList();
    if (els.hasAttribute('xsd')){
        ll.push({
            'name' : els.hasAttribute('name') ? els.getAttribute('name') : ('unnamed'+i),
            'caption' : els.hasAttribute('caption') ? els.getAttribute('caption') : ('Library'+i),
            'path' : els.getAttribute('xsd'),
            'components' : libutil.project.set_components(els.getAttribute('xsd'))
        })
    } 
}

libutil.project.set_components = function(path){
    var result = [];
    var doc = libutil.dom.readDoc(path);
    if (doc){
        var els = doc.getElementsByTagNameNS(libutil.LIB_NAMESPACE_URL,'creator');        
        for (var i=0; i<els.length;++i){
            result.push({ 
                'name' : els[i].hasAttribute('name') ? els[i].getAttribute('name') : ('unnamed'+i),
                'hint' : els[i].hasAttribute('hint') ? els[i].getAttribute('hint') : null,
                'hintup' : els[i].hasAttribute('hintup') ? els[i].getAttribute('hintup') : (els[i].hasAttribute('hint') ? els[i].getAttribute('hint') : null),
                'text' : els[i].textContent,
                'element' : els[i].firstElementChild
            });
        }
    }
    return result;   
}

libutil.project.get_components = function(tool, name){
    var ll=libutil.global.getLibList();
    if (ll){
        for (var i=0; i<ll.length;++i){
            if (ll[i].name==tool){
                var comps = ll[i].components;
                for (var j=0; j<comps.length;++j){
                    if (comps[j].hint==name){
                        return comps[j].element;
                    }
                }
            }
        }
    }
    return null;   
}



libutil.project.getFormInfo = function(name){
    var fl =  libutil.global.getFormList();
    if (fl){  
        for (var i=0; i<fl.length;++i){
            if (fl[i]['name']==name){
                return fl[i];
            }
        }
    }
    return null;        
}

libutil.project.getXSLTScriptElements = function(){
    var href="../web-utils/scriptinclude.xsl";
    var doc = libutil.dom.readDoc(href);
    var root = doc.getElementById('scriptlist');
    return root;   
}

libutil.project.getXSLTScriptList = function(){
    var list=libutil.project.getXSLTScriptElements();
    if (list==null){
        console.error('Not find XSL liblist');
        return null;
    }      
    var result=[];
    if (list){        
        for(var e=list.firstChild; e; e=e.nextSibling){
            if ((e.getAttribute) && (e.localName=='call-template') && (e.getAttribute('name')=='lib_script_include_file')){
                for(var ep=e.firstChild; ep; ep=ep.nextSibling){
                    if ((ep.getAttribute) && (ep.localName=='with-param') && (ep.getAttribute('name')=='file') && (ep.textContent!='')){
                        result.push({
                            'file' : ep.textContent
                        })
                    }
                }
            }
        }  
    }
    return result;
}

libutil.project.setXSLTScriptList = function(){
    var tmp=$$global();
    if (tmp)   
        tmp.scriptlist = libutil.project.getXSLTScriptList();   
}

libutil.project.insertXSLTScriptList = function(file){
    var list=libutil.project.getXSLTScriptElements();
    if (list){
        for(var i=0; i < list.length; ++i){
            if (list[i].file==file)
                return false;
        }
        list = libutil.project.getXSLTScriptElements();
        for(var e=list.firstChild; e; e=e.nextSibling){
            if ((e.getAttribute) && (e.localName=='call-template') && (e.getAttribute('name')=='lib_script_include_file')){
                for(var ep=e.firstChild; ep; ep=ep.nextSibling){
                    if ((ep.getAttribute) && (ep.localName=='with-param') && (ep.getAttribute('name')=='file')){
                        if (ep.textContent=='' || !ep.textContent){
                            var newel = e.cloneNode(true);
                            newel.childNodes[1].textContent=file;
                            e.parentNode.appendChild(newel);
                            libutil.dom.writeDoc(newel.ownerDocument);
                            libutil.project.setXSLTScriptList();
                            return true;                       
                        }
                    }
                }
            }    
        }
        console.error('Not set XSL liblist');
        return false;
    }
    return null;
}

libutil.project.removeXSLTScriptList = function(file){
    if (file=='') return true;
    var list=libutil.project.getXSLTScriptElements();
    if (list){
        list = libutil.project.getXSLTScriptElements();
        for(var e=list.firstChild; e; e=e.nextSibling){
            if ((e.getAttribute) && (e.localName=='call-template') && (e.getAttribute('name')=='lib_script_include_file')){
                for(var ep=e.firstChild; ep; ep=ep.nextSibling){
                    if ((ep.getAttribute) && (ep.localName=='with-param') && (ep.getAttribute('name')=='file') && (ep.textContent==file)){
                        var parent = e.parentNode;
                        parent.removeChild(e);
                        libutil.dom.writeDoc(parent.ownerDocument);
                        libutil.project.setXSLTScriptList();
                        return true;
                    }
                }
            }                
        }
        console.error('Not remove XSL liblist');
        return false;
    }
    return null;
}


//

libutil.test.element = function(el){
    console.log(el);
}

//






libutil.popup.getbound = function(el, W, H, yd, dir){
    /*
       dir 0 -top, 1 -right, 2 - bottom(default) , 3 left
     */
    
     
    if ((dir==undefined) || (dir==null)) throw "Bound popup error";
  
    var x0 = parseFloat(el.getAttribute('x'));
    var y0 = parseFloat(el.getAttribute('y'));
    var h0 = parseFloat(el.getAttribute('height'));
    var w0 = parseFloat(el.getAttribute('width'));    
    
    
    var hh= h0 + 2*yd;
    var wh= w0 + 2*yd;
    
    var xc = (dir==2 || dir==0) ? (x0 + (w0-W) / 2) : ( dir==3 ? x0-yd- W : x0 - yd);
    var yc = (dir==2 || dir==0) ? ( dir==2 ? y0 - yd : y0 - yd - H ) : (y0 + (h0-H) / 2);
    
    
    var hc = (dir==2 || dir==0) ? H + hh : H;
    var wc = (dir==2 || dir==0) ? W : W + wh;
    return {
        'x': xc, 
        'y': yc, 
        'width': wc , 
        'height': hc
    } 
}


libutil.popup.bpunds_intersect = function(popupbound, documenbound){
    var X0 =   popupbound.x < documenbound.x ? documenbound.x : popupbound.x;
    var Y0 =   popupbound.y < documenbound.y ? documenbound.y : popupbound.y;
    var X1 =   (popupbound.x + popupbound.width) < (documenbound.x + documenbound.width) ? 
    (popupbound.x + popupbound.width) : (documenbound.x + documenbound.width);
    var Y1 =   (popupbound.y + popupbound.height) < (documenbound.y + documenbound.height) ? 
    (popupbound.y + popupbound.height) : (documenbound.y + documenbound.height);

    return (popupbound.width>0 && popupbound.height>0) ? parseInt(((X1-X0)*(Y1-Y0)*1000)/(popupbound.height * popupbound.width)) : 0;
}


libutil.popup.finddirect = function(el, W, H, yd){
    var windowbound = {
        'x': 0, 
        'y': 0, 
        'width': window.innerWidth , 
        'height': window.innerHeight
    };
    var popupbound0 =  libutil.popup.getbound(el, W, H, yd,0);
    var popupbound1 =  libutil.popup.getbound(el, W, H, yd,1);
    var popupbound2 =  libutil.popup.getbound(el, W, H, yd,2);
    var popupbound3 =  libutil.popup.getbound(el, W, H, yd,3);
    var range = [libutil.popup.bpunds_intersect(popupbound2, windowbound),
    libutil.popup.bpunds_intersect(popupbound1, windowbound),
    libutil.popup.bpunds_intersect(popupbound3, windowbound),
    libutil.popup.bpunds_intersect(popupbound0, windowbound)];
    var max = 0;          
    for (var i=1;i<range.length;i++){
        if (range[max] < range[i]) max=i; 
    } 
    switch(max) {
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 0;     
    }
    return 2;
}

libutil.popup.createsvgs = function(el, W, H, yd, dir, bodystyle, popupstyle, r , shift){
    

    if ((dir==undefined) || (dir==null)) {
        dir = libutil.popup.finddirect(el, W, H, yd);
    }
    
    var bounds=libutil.popup.getbound(el, W, H, yd, dir);
    

    
    var h0 = parseFloat(el.getAttribute('height'));
    var w0 = parseFloat(el.getAttribute('width'));
    
    if (shift){
        bounds.x = bounds.x + shift.left;
        bounds.y = bounds.y + shift.top;
    }
    
    var hh= h0 + 2*yd;
    var wh= w0 + 2*yd;
    
    var xc = bounds.x;
    var yc = bounds.y;
    var hc = bounds.height;
    var wc = bounds.width;
    
    var docelem = document.documentElement;
    
    var svg =libutil.svg.create_element('svg', docelem, [{
        name : 'x', 
        value: xc
    },

    {
        name : 'y', 
        value: yc
    },

    {
        name : 'width', 
        value: wc
    },

    {
        name : 'height', 
        value: hc
    }]);
                                                     
                                                    
    
    svg.hoverrect = libutil.svg.create_element('rect', svg, [{
        name : 'x', 
        value:  0
    },

    {
        name : 'y', 
        value:  0
    },

    {
        name : 'width', 
        value: wc
    },

    {
        name : 'height', 
        value: hc
    },

    {
        name : 'rx', 
        value: r
    },

    {
        name : 'ry', 
        value: r
    },                                             

    {
        name : 'style', 
        value: popupstyle ? popupstyle : 'fill: white; opacity: 0.0;'
    }]);
    
    svg.popupbody = libutil.svg.create_element('svg', svg, [{
        name : 'x', 
        value: dir==1 ? wh : 0
    },

    {
        name : 'y', 
        value:  dir==2 ? hh : 0
    },

    {
        name : 'width', 
        value: W
    },

    {
        name : 'height', 
        value: H
    }]);
    
    var rct = libutil.svg.create_element('rect', svg.popupbody , [{
        name : 'x', 
        value:  0
    },

    {
        name : 'y', 
        value:  0
    },

    {
        name : 'width', 
        value: W
    },

    {
        name : 'height', 
        value: H
    },

    {
        name : 'rx', 
        value: r
    },

    {
        name : 'ry', 
        value: r
    },

    {
        name : 'style', 
        value: bodystyle ?  bodystyle : 'fill: white; opacity: 1.0;'
    }]);
                                                    
    svg.boundspopup = {
        x: xc , 
        y: yc, 
        width: wc, 
        height: hc
    };                                                
    
    svg.buttonposition = {
        x : dir==3 ? W : 0, 
        y :  dir==0 ? H : 0, 
        width: (dir==0 || dir==2) ? W  : wh ,   
        height: (dir==1 || dir==3) ? H : hh , 
        dir : dir
    };
    //console.log('svg.buttonposition', svg.buttonposition);

    
    return svg;
}

// xslttransform


libutil.xslttransform.rootDocument = function (){ 
    if (window.__rootDocument)
        return window.__rootDocument;
    window.__rootDocument = libutil.dom.readDoc(window.document.URL);
    return window.__rootDocument;
}


libutil.xslttransform.literootDocument = function (){ 
    if (window.__literootDocument){
        libutil.dom.clearChildNode(window.__literootDocument.documentElement);
        return window.__literootDocument;
    }
    window.__literootDocument = libutil.dom.readDoc(window.document.URL);
    libutil.dom.clearChildNode(window.__literootDocument.documentElement);
    return window.__literootDocument;
}




libutil.xslttransform.xsltDocument = function(){
    if (window.__xsltDocument)
        return window.__xsltDocument;    
    var root = libutil.xslttransform.rootDocument();
    if ((root) && (root.childNodes.length>1)){
        if (root.childNodes[0].target=='xml-stylesheet'){
            if (root.childNodes[0].data){
                var urlxslt=root.childNodes[0].data.toString();
                var finded=urlxslt.search('type="text/xsl"');
                if (finded==-1)
                    finded=urlxslt.search("href='");
                if (finded!=-1){
                    urlxslt=urlxslt.substring(6,urlxslt.length);
                    finded=urlxslt.search('"') ;
                    if (finded!=-1){
                        urlxslt=urlxslt.substring(0,finded);
                        window.__xsltDocument = libutil.dom.readDoc(urlxslt);
                    }
                }
            } 
        }
    }
    return window.__xsltDocument;
}

libutil.xslttransform.xsltProcessor = function(){
    if (window.__xsltProcessor) return window.__xsltProcessor;
    window.__xsltProcessor=new XSLTProcessor();
    var xsltdoc = libutil.xslttransform.xsltDocument();
    if (window.__xsltProcessor &&  xsltdoc)
        window.__xsltProcessor.importStylesheet(xsltdoc);
    else
        throw 'XSLT transform error';       
    return window.__xsltProcessor;
}


libutil.xslttransform.tranformDocument = function(doc){
    return libutil.xslttransform.xsltProcessor().transformToDocument(doc);
}

libutil.xslttransform.tranform_and_getById = function(doc, id){
    var transdoc = libutil.xslttransform.xsltProcessor().transformToDocument(doc);
    return transdoc.getElementById(id);
}


//  window

libutil.window.create = function(name , caption, top, left, width, height, tooltip, allwaystop, nodecorate){
    var tmp='caption=' + ( caption ? caption :  "") +
    ',left='+ (left ? left : '0') +
    ',top=' + (top ? top : '0') +
    ',width=' + (width ? width : '200px') +
    ',height=' + (height ? height : '200px') +
    ',tooltip=' + (tooltip ? 'yes' : '0') +
    ',resizable='+ (false ? 'yes' : 'no') +
    ',allwaystop='+ (allwaystop ? 'yes' : '0') +
    (nodecorate ? ',decorated=no' : '') +
    ';'
    return window.open('', name , tmp);
}


libutil.window.create_modal = function(url,  caption, value ,top, left, width, height, tooltip, allwaystop, nodecorate){
    var tmp='caption=' + ( caption ? caption :  "") +
    ',left='+ (left ? left : '0') +
    ',top=' + (top ? top : '0') +
    ',width=' + (width ? width : '200px') +
    ',height=' + (height ? height : '200px') +
    ',tooltip=' + (tooltip ? 'yes' : '0') +
    ',resizable='+ (false ? 'yes' : 'no') +
    ',allwaystop='+ (allwaystop ? 'yes' : '0') +
    (nodecorate ? ',decorated=no' : '') +
    ';'
    libutil.global.setGlobalPropertyEditor({
        value: value
    });
    window.showModalDialog(url, null , tmp);
    
    var ret = libutil.global.getGlobalPropertyEditor();
    if (!ret || ret==value) return null;
    console.log('return ' + ret)
    libutil.global.setGlobalPropertyEditor();
    return ret;
}


libutil.window.createhtml = function(name , caption, top, left, width, height, tooltip, allwaystop, nodecorate, modal, stylefile, style){
    var newwin=libutil.window.create(name , caption, top, left, width, height, tooltip, allwaystop, nodecorate, modal);
    newwin.document.open();
    newwin.document.write('<?xml version="1.0" encoding="UTF-8"?>');
    newwin.document.write('<html>');
    newwin.document.write('    <head>');
    newwin.document.write('     <script type="text/javascript" src="../web-utils/js/designer.js"></script>');
    newwin.document.write('     <script type="text/javascript" src="../web-utils/js/libutil.js"></script>');
    if (stylefile)
        newwin.document.write('     <link rel="stylesheet" type="text/css" href="'+stylefile+'">');
    if (style)
        newwin.document.write(style);
    newwin.document.write('    </head>');
    newwin.document.write('    <body>');
    newwin.document.write('    </body>')
    newwin.document.write('</html>');
    newwin.document.close();
    return newwin;
    
}





//

libutil.regex.check = function (value, expr){
    return expr.test(value);
}

libutil.regex.add_postfix_file = function (value, expr){
    return value.substring(0,value.length-4)+expr+value.substring(value.length-4);
}

//

//

libutil.geometry.boundrect = function (el){
    var box = el && el.getBBox ? el.getBBox() : null;
    var rect = box ? {
        x : box.x , 
        y : box.y , 
        w : box.width , 
        h : box.height
    } : null;
    if (rect) return rect;
    var boxs = el  && el.getClientRects ? el.getClientRects() : null;
    var box = boxs && boxs.length ? boxs[0] : null;
    return box ? {
        x : box.top , 
        y : box.left , 
        w : box.width , 
        h : box.height
    } : null;
}





//


libutil.html.create = function (name, parent){
    var newel = parent.ownerDocument.createElementNS(libutil.XHTML_NAMESPACE_URL, name);
    parent.appendChild(newel);
    return newel;
}

libutil.html.create_element = function (name, parent, attr){
    var newel = parent.ownerDocument.createElementNS(libutil.XHTML_NAMESPACE_URL, name);
    if (attr){
        for (var i=0; i < attr.length; ++i){
            if (attr[i].value) 
                newel.setAttribute(attr[i].name, attr[i].value); 
        }
    }
    if (parent)
        parent.appendChild(newel);
    return newel;
}


libutil.html.create_element_not_insert = function (name, parent, attr){
    var newel = parent.ownerDocument.createElementNS(libutil.XHTML_NAMESPACE_URL, name);
    if (attr){
        for (var i=0; i < attr.length; ++i){
            if (attr[i].value) 
                newel.setAttribute(attr[i].name, attr[i].value); 
        }
    }
    return newel;
}


libutil.html.create_tabel_header = function (tr, style, classnm, arr){
    for (var i=0; i < arr.length; ++i){
        var th = libutil.html.create_element('th', tr,  [{
            name : 'style', 
            value: style
        },

        {
            name : 'class', 
            value: classnm
        }]);
        th.innerHTML=arr[i];
    } 
}


libutil.html.create_link = function (parent , href){
    var newel = libutil.html.create('link', parent);
    if (!newel) return;
    newel.setAttribute('rel', 'stylesheet');
    newel.setAttribute('type',  'text/css');
    if (href) newel.setAttribute('href', href);
    return newel;
}


libutil.html.create_style = function (parent,  style){
    
    var newel = libutil.html.create('style', parent);
    if (!newel) return;
    newel.setAttribute('type', 'text/css' );
    if (style) newel.innerHTML=style;
    if (parent) parent.appendChild(newel);
    return newel;
}

libutil.html.create_button = function (parent, style, classnm, name, onclickfunc){
    var newel = libutil.html.create('button', parent);
    if (!newel) return;
    if (style) newel.setAttribute('style', style);
    if (classnm) newel.className=classnm;
    if (name) newel.innerHTML=name;
    if (onclickfunc) newel.onclick=onclickfunc;
    if (parent) parent.appendChild(newel);
    return newel;
}

libutil.html.create_input = function (parent, type, value){
    var newel = libutil.html.create('input', parent);
    if (!newel) return;
    if (type) newel.setAttribute('type', type );
    if (value) {
        newel.setAttribute('value', value );
        newel.innerHTML=value;
    }
    return newel;
}

libutil.html.create_select = function (parent, type, value, list, addit){
    var newel = libutil.html.create('select', parent);
    if (!newel) return;
    if (type)
        newel.setAttribute('type', type );
    if (value) 
        newel.setAttribute('value', value );

    var newop = libutil.html.create('option', newel);
    newop.setAttribute('selected','');
    newop.innerHTML=value;

    for(var i=0; i < list.length; i++){
        if (list[i]!=value){
            var newop = libutil.html.create('option', newel);
            newop.innerHTML=list[i];
        }
    }
    if (addit){
        var newop = libutil.html.create('option', newel);
        newop.setAttribute('value', '...' );
        newop.innerHTML='...';
    }
    return newel;
}

libutil.html.create_tool = function (doc, nametool, names, hints, funcs, size, header, headerstyle){
    if (names){
        var body=doc.getElementsByTagName('body')[0];
        var result = {};
        if (body) {
            if (header){
                var divhead = libutil.html.create_element('div' , body ,[{
                    name : 'style' , 
                    value : headerstyle
                }]); 
                divhead.innerHTML=header;
            }
            libutil.html.create_tool_style(doc, nametool, names,  size);
            var div = libutil.html.create_element('div' , body );
            div.setAttribute('class','toolbar');
            for (var i=0;i<names.length;++i){
                var btn = libutil.html.create_button( div,null,nametool+'-item toggleable '+names[i],'', (funcs && funcs.length > i) ? funcs[i] : null);               
                btn.namebtn=names[i];
                btn.nametool=nametool;
                if ( hints &&  hints.length>i)
                    btn.setAttribute('title', hints[i])
                var dv = libutil.html.create_element('div' , btn ,[{
                    name : 'class' , 
                    value : nametool+'-icon'
                }]);
                if (hints &&  hints.length>i)
                    dv.setAttribute('title', hints[i]);
                result[names[i]] = btn;
            } 
            return result;
        }
    }
    return undefined;
} 



libutil.html.create_tool_style = function (doc, nametool, names,  sz){
    var head = doc.getElementsByTagName('head')[0];
    if (head){
        var onfile = nametool + 'on';
        var offfile = nametool + 'off';
        var disablefile = nametool + 'dsbl';
        var size = sz ? sz + "px" : "30px";
        
        var style="."+nametool+"-label {\n"+             
        " color: rgba(18,50,114,1) !important;\n"+             
        " text-shadow: none;}\n"+
        " \n"+

        "."+nametool+"-item {\n"+
        " margin: 0;\n"+
        " padding: 0 0px;\n"+
        " background-color: transparent;\n"+
        " border-style: none;\n"+
        " border-color: transparent;}\n"+
        " \n"+


        "."+nametool+"-item.toggleable {\n"+
        " padding-top: 0px;}\n"+
        " \n"+

        "."+nametool+"-icon {\n"+
        " display: inline-block;\n"+
        " width: "+ size+";\n"+
        " height: "+ size+";\n"+
        " background-image: url(../web-utils/css/res/"+onfile+".png);}\n"+
        " \n"+
                  
        "."+nametool+"-item[disabled] ."+nametool+"-icon{\n"+
        " background-image: url(../web-utils/css/res/"+disablefile+".png);}\n"+
        " \n"+

        "."+nametool+"-item:hover[disabled] ."+nametool+"-icon{\n"+
        " background-image: url(../web-utils/css/res/"+disablefile+".png);}\n"+
        " \n"+

        "."+nametool+"-item[off] ."+nametool+"-icon{\n"+
        " background-image: url(../web-utils/css/res/"+offfile+".png);}\n"+
        " \n"+


        "."+nametool+"-item:active ."+nametool+"-icon {\n"+
        " background-position-y: "+ size+";}\n"+
        " \n"+

        "."+nametool+"-item:hover ."+nametool+"-icon {\n"+
        " background-position-y: "+ size+";\n"+
        " border-style: 1px;\n"+
        " border-color: red;}\n"+
        " \n"+


        "."+nametool+"-item.toggleable:active ."+nametool+"-label {\n"+
        " text-shadow: none;}\n"+
        " \n";

             
        for (var i=0;i<names.length;++i){
            var vsize = sz ? ("-" + sz*i + "px") : ("-" + 30*i + "px");
                
            style = style +"."+nametool+"-item."+names[i]+" ."+nametool+"-icon {\n"+
            " margin: 0;\n"+
            " padding: 0 0px;\n"+
            " background-position-x: "+vsize+";\n"+
            " border-style: none;\n"+
            " border-color: transparent;}\n"+
            " \n";
        }


    
        libutil.html.create_style(head, style);
    }
} 









///////////////////////////////////////////////



libutil.svg.create = function (name, parent){
    if (!parent) return;
    var newel = parent.ownerDocument.createElementNS(libutil.SVG_NAMESPACE_URL, name);
    if (parent) parent.appendChild(newel);
    return newel;
}

libutil.svg.create_element = function (name, parent, attr){
    var newel = parent.ownerDocument.createElementNS(libutil.SVG_NAMESPACE_URL, name);
    if (attr){
        for (var i=0; i < attr.length; ++i){
            if (attr[i].value) 
                newel.setAttribute(attr[i].name, attr[i].value); 
        }
    }
    if (parent) 
        parent.appendChild(newel);
    return newel;
}

libutil.svg.create_element_no_insert = function (name, parent, attr){
    var newel = parent.ownerDocument.createElementNS(libutil.SVG_NAMESPACE_URL, name);
    if (attr){
        for (var i=0; i < attr.length; ++i){
            if (attr[i].value) 
                newel.setAttribute(attr[i].name, attr[i].value); 
        }
    }
    return newel;
}

libutil.svg.create_text = function (parent, x, y,  style, classnm, text){
    
    var newel = libutil.svg.create('text', parent);
    if (!newel) return;
    if (x || x==0) newel.setAttribute('x', parseFloat(x));
    if (y || y==0) newel.setAttribute('y', parseFloat(y));  
    if (style) newel.setAttribute('style', style);
    if (classnm) newel.setAttribute('class', classnm);
    newel.textContent=text;
    return newel;
}



libutil.svg.create_button = function (parent, x, y, width, height, rx, ry,  rectstyle, rectclass,   text, textstyle, textclass){

    var headersvg=libutil.svg.create_element('svg', parent , [{
        name : 'x', 
        value: x
    },

    {
        name : 'y', 
        value: y
    },

    {
        name : 'width', 
        value: width
    },

    {
        name : 'height', 
        value: height
    }]);   

    libutil.svg.create_element('rect', headersvg, [{
        name : 'x', 
        value:  0
    },

    {
        name : 'y', 
        value:  0
    },

    {
        name : 'width', 
        value: width
    },

    {
        name : 'height', 
        value: height
    },

    {
        name : 'rx', 
        value: rx
    },

    {
        name : 'ry', 
        value: ry
    }, 

    {
        name : 'style', 
        value: rectstyle
    },

    {
        name : 'class', 
        value: rectclass
    }]);
                                    
                             
    libutil.svg.create_text(headersvg,
        width / 2, height / 2, 
        textstyle,
        'central_svgnatext ' +  textclass, text);

    
    return headersvg;                                    

    
}

libutil.svg.create_gradient = function (name ,parent, attr, colors){
    if (colors){
        var gradient=libutil.svg.create_element(name , parent , attr); 
        for (var i=0; i < colors.length; ++i){
            libutil.svg.create_element('stop', gradient , [{
                name : 'offset' , 
                value : colors[i].offset ? colors[i].offset : 0
            },

            {
                name : 'stop-color' , 
                value : colors[i].stopcolor ? colors[i].stopcolor : '#000'
            }])
        }
        return gradient;
    }
    return null;                                       
}


//


libutil.www.create_window = function(doc, id, x, y, width, height, style){
    
    if (!doc) return undefined;

    var result = undefined; 
      

    if (doc){
        var root = doc.documentElement;
        if (root) {
     
            var result = libutil.svg.create_element('foreignObject', doc.documentElement, [{
                name : 'id', 
                value:  id
            },

            {
                name : 'x', 
                value:  x ? x : 0
            },

            {
                name : 'y', 
                value:  y ? y : 0
            },

            {
                name : 'width', 
                value: width ? width : 300
            },

            {
                name : 'height', 
                value: height ? height : 300
            }]);         
            var html = libutil.html.create_element('html' , result);
            
            libutil.html.create_element('head', html,[{
                name : 'style', 
                value:  style
            }]);
            
            var body= libutil.html.create_element( 'body' ,html);
            
            var bodydiv= libutil.html.create_element('div' , body );
           
            
            result.bindelement=bodydiv;
               
            return result;

        }
    }
    return undefined;
}

libutil.www.correct_window_height = function (win, innerheight){
    if (win.innerHeight!=innerheight){
        var correctH =  win.outerHeight + (innerheight - win.innerHeight);
        win.resizeTo(win.outerWidth,correctH);
    }
}

libutil.www.create_tbwindow = function (name, caption, top, left, width, height, tooltip, allwaystop, nodecorate, modal, names, hints,  funcs, destroyfunc){
    var tmp=$$global();
    if (tmp && !tmp[name]){
        tmp[name]=libutil.window.createhtml('_'+name, caption, top, left, width, height, tooltip, allwaystop, nodecorate, modal, "../web-utils/css/maintoolstyle.css");
        tmp[name].onunload= destroyfunc ? destroyfunc : 
        function(){     
            try{
                var tmpo=$$global();
                if (tmpo && tmpo[name])
                    tmpo[name]=undefined;
            }
            catch(error){}
        };
        if (names)    
            libutil.www.create_tbwindow_tools(name, null, names, hints, funcs);
        return tmp[name];
    }   
}


libutil.www.create_tbwindow_tools = function (name, tools, names, hints, funcs, size, header, headerstyle){
    var tmp=$$global();
    if (name && names && funcs && tmp[name]){
        if (!tools) tools=name;
        if (!tmp[name].tools)
            tmp[name].tools={};
        tmp[name].tools[tools]=libutil.html.create_tool(tmp[name].document, tools, names, hints, funcs, size, header, headerstyle) ;
        tmp[tools+'_tools']=tmp[name].tools[tools];
    }    
}

libutil.www.set_tbwindow_btnstatus = function (name, tools, btnname , state){
    var tmp=$$global();
    if (tmp && tmp[name+'_tools']){
        if (!tools) tools=name;
        if (tmp[name+'_tools']){
            var rowtool = tmp[name+'_tools'];
            if (rowtool[btnname]){               
                var btn =  rowtool[btnname]; 
                if (btn.hasAttribute('off') && state!='off') 
                    btn.removeAttribute('off'); 
                if (btn.hasAttribute('on') && state!='on') 
                    btn.removeAttribute('on');
                if (btn.hasAttribute('disabled') && state!='disabled') 
                    btn.removeAttribute('disabled');    
                if (!btn.hasAttribute('off') && state=='off') 
                    btn.setAttribute('off', 'off'); 
                if (!btn.hasAttribute('on') && state=='on') 
                    btn.setAttribute('on', 'on');
                if (!btn.hasAttribute('disabled') && state=='disabled') 
                    btn.setAttribute('disabled', 'disabled');                              
            }       
        }    
    }
}


///////////////////////////////////////////////

libutil.alarmtable = function(el){
    try{
        this.alarmelement=libutil.dom.findElementByTagName(el,'table');
        if (this.alarmelement){
            var ts = this;
            this.handler = function(){
                ts.execute(event);
            }
            var rslt = window.addAlarmsListener(this.handler);
            this.init= rslt;
            if (!this.init){
                console.error('AlarmsListener didnt add');
                this.handler=undefined;
                return false;
            }
        }
    }
    catch(error){
        console.error('Alarms set error: ' + error );
    }
    return this.init;
}

libutil.alarmtable.prototype.detach = function() {
    if (this.handler)
        if (!window.removeAlarmsListener(this.handler))
            console.error('AlarmsListener didnt remove');
}

libutil.alarmtable.prototype.execute = function(evnt) {
    this.cleartable();   
    this.fillrowtab(evnt);
}

libutil.alarmtable.prototype.cleartable = function() {
    var el = this.alarmelement;
    if (el==null) return;
    var tbel = el.getElementsByTagName("tbody");
    if (tbel.length==0) return;    
    el = tbel[0];
    while (el.children.length>1)
        el.removeChild(el.lastChild);
}
        
          

  
libutil.alarmtable.prototype.fillrowtab = function(evnt){
    var el = this.alarmelement;
    if ((el==null) || (evnt==null)) return;
    var tbel = el.getElementsByTagName("tbody");
    if (tbel.length==0) return;    
    el = tbel[0];
    for (var i=0;i<evnt.length;++i){
        this.insertrow(el, evnt[i]);
    }
     
}


libutil.alarmtable.prototype.insertrow = function(el, arr) {

    if (el.children.length==0) return;
    var tr  = document.createElementNS(libutil.XHTML_NAMESPACE_URL,'tr');
    if (!arr.kvit){
        tr.setAttribute("class", (arr.level>2) ? "avaron" : ((arr.level>1) ? "alarmon" : "noticeon"));
    }
    else{
        tr.setAttribute("class", (arr.level>2) ? "avarkvit" : ((arr.level>1) ? "alarmkvit" : "noticekvit"));
    }

      
  
    var td = document.createElement('td');
    
    //var tm= new Date(0,0,0, arr.time.getHours() ,arr.time.getMinutes() 
    //    +arr.time.getTimezoneOffset(),arr.time.getSeconds());
    var ta = document.createTextNode(arr.time.toLocaleTimeString());
    var sp = document.createElementNS(libutil.XHTML_NAMESPACE_URL,'span');
    sp.setAttribute("class", "smallfont");
    sp.appendChild(ta);
    td.appendChild(sp);
    tr.appendChild(td);
    
    
    td = document.createElement('td');
    
    ta = document.createTextNode(arr.tag);
    sp = document.createElement('span');
    sp.setAttribute("class", "smallfont");
    sp.appendChild(ta);
    td.appendChild(sp);
    tr.appendChild(td);
    
    td = document.createElement('td');
    
    ta = document.createTextNode(arr.message);
    sp = document.createElement('span');
    sp.setAttribute("class", "smallfont");
    sp.appendChild(ta);
    td.appendChild(sp);
    tr.appendChild(td);    
 
    el.appendChild(tr);
}

///////////////////////////////////////////////



libutil.trendchart = function(option){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    

    var elid=undefined;
    var throbid=undefined;    
    var width=undefined;
    var height=undefined;
    var colors=undefined;
    var r=undefined;
    var tags=undefined; 
    var sqlreq = undefined;  
    var start = undefined;  
    var stop = undefined;  
    var hist = undefined;
    var callback=undefined;
    var linewidth = 1;
    var axiswidth = 0.5;
    var axisXcolor=undefined;
    var axisYcolor=undefined;    
    var shadow = false;
    var animation = false;
    var defaultseriestype = undefined;
    var title = undefined;
    var fontsize = undefined;
    
    this.ranges={};

    
    var backgroundcolor = {
        linearGradient: ['100%', '0%', '100%', '100%'],
        stops: [
        [0, '#DDD'],
        [0.5, '#FFF'],
        [1, '#AAA']]
    };
    
    var disablecolor = "#777";  
 
    
    if (option){
        if (option.constructor == Object){
            for(var key in option) {
                switch(key){
                    case 'background':{
                        if (option[key].constructor == Array){
                            backgroundcolor = {
                                linearGradient: ['100%', '0%', '100%', '100%'],
                                stops: option[key]
                            }
                        }
                        if (option[key].constructor == String){
                            backgroundcolor = option[key]
                        }
                        break;
                    }
                    case 'element':{
                        elid = option[key];    
                        break;     
                    }
                    case 'throbler':{
                        throbid = option[key];    
                        break;     
                    }                    
                    case 'animation':{
                        animation = option[key];    
                        break;     
                    }
                    case 'lineWidth':{
                        linewidth = parseInt(option[key]);    
                        break;     
                    }
                    case 'axisWidth':{
                        axiswidth = parseInt(option[key]);    
                        break;     
                    }   
                    case 'axisColor':{
                        axisYcolor = option[key];   
                        break;     
                    }
                    case 'axisXColor':{
                        axisXcolor = option[key];   
                        break;     
                    }                      
                    case 'shadow':{
                        shadow = option[key];    
                        break;     
                    }  
                    case 'seriestype':{
                        defaultseriestype = option[key];    
                        break;     
                    }  
                    case 'disableColor':{
                        disablecolor = option[key];    
                        break;     
                    } 
                    case 'title':{
                        title = option[key];    
                        break;     
                    } 
                    case 'width':{
                        width = option[key].valueOf();    
                        break;     
                    } 
                    case 'height':{
                        height  = option[key];    
                        break;     
                    }
                    case 'r':{
                        r  = option[key];    
                        break;     
                    } 
                    case 'start':{
                        start  = option[key];    
                        break;     
                    }
                    case 'stop':{
                        stop  = option[key];    
                        break;     
                    } 
                    case 'hist':{
                        hist  = option[key];    
                        break;     
                    }  
                    case 'connection':{
                        sqlreq  = option[key];    
                        break;     
                    }
                    case 'callback':{
                        callback  = option[key];    
                        break;     
                    }      
                    case 'complete':{
                        this.complete  = option[key];    
                        break;     
                    }                  
                    case 'colors':{
                        if (option[key].constructor == Array){     
                            colors  = option[key];
                        }    
                        break;     
                    }
                    case 'ranges':{
                        this.ranges  = option[key];   
                        break;     
                    }                 
                    case 'tags':{
                        if (option[key].constructor == Array){     
                            tags  = option[key];
                        }    
                        break;     
                    }                 
                }
            }        
        }
    }

    this.callback=callback;
    this.sort(tags,colors);
    if (start || stop)
        hist={
            start: start, 
            stop: stop
        };
             
    
    try{
        if ((window.$$editable) && ($$editable())) return;
        this.elid = elid;
        this.element = document.getElementById(elid);
        this.thtobblerbody = document.getElementById(throbid);
        if (this.element){
            this.element.trendchart=this;
            if (this.thtobblerbody)
                this.element.trobbler = new libutil.proggress.throbber(this.thtobblerbody);
            this.sqlreq = sqlreq;
            if (tags.length){
            
                if (!this.sqlreq){
                    if (!hist) hist=0;
                    this.period = hist * 1000;
                }
                else{
                    this.start=hist.start;
                    this.stop=hist.stop;
                }
        
                var ts = this;
        

                this.disablecolor = disablecolor ? disablecolor : "#AAA";
                this.backgroundcolor = backgroundcolor ? backgroundcolor : "#EEE";
                this.axisYcolor = axisYcolor!==undefined ? axisYcolor : undefined;
                this.axisXcolor = axisXcolor!==undefined ? axisXcolor : this.axisYcolor;
        
                this.width = width;
                this.height = height;
                this.linewidth = linewidth ? linewidth : 1;
                this.axiswidth = axiswidth ? axiswidth : 1;
        
                var minBound = height < width ? height : width;
        
                this.fontsize = fontsize ? fontsize : (minBound ? parseInt(minBound / 30) : undefined );
        
                if (this.fontsize < 8) this.fontsize=8;
                this.shadow = shadow ? true : false;
                this.borderRadius = (r || r==0) ? r : 5;

                this.defaultseriestype =  defaultseriestype ? defaultseriestype : 'line';
        
                this.animation = animation ? true : false;
                this.title=title ? title : null;
        
        
                this.last_datastate = [];
                this.serias_lastvalue = [];
        
        
                this.null_datastate = [];
                this.null_datachange = false;
                this.null_periods = [];
                this.null_lines = [];
                //this.null_lines_change = false;
        
                this.current_null_periods = null;
                this.current_null_periods_change = false;
       
                for (var i=0;i<tags.length;++i){
                    this.null_datastate[i]=null;
                    this.last_datastate[i]=null;
                    this.serias_lastvalue[i]=null;
                }
        
                this.handler = function(){
                    ts.execute(event);
                }
        
                if (!sqlreq)
                    var rslt = window.addTrendsListener( this.handler, tags, this.period + libutil.trendchart.WAITDELT );
                else{
                    this.connection = sqlreq;
                    var rslt = this.connection.select_trends(this.handler,tags ,hist.start , hist.stop );         
                }  
        
        
                this.init = rslt;
                if (!this.init){
                    console.error('TrendsListener didnt set');
                    this.handler=undefined;
                }
                else{
            
                    var removeroot = function(){
                        //console.log('Remove graph root');
                        ts.detach();             
                    }
                    this.element.addEventListener('DOMNodeRemovedFromDocument',removeroot, false);
                }
            }
        }
        else {
            console.error('Not find trend element');
        }
    }
    catch(error){
        console.error('Trends set error: ' + error );
    }
}

libutil.trendchart.WAITDELT = 6000;

libutil.trendchart.prototype.sort = function(tags,colors){
    if (!tags || !colors || tags.constructor != Array){
        this.tags = tags;     
        this.colors = colors;
        return;
    };
    var tmp = [];
    for (var i=0; i<tags.length;++i){
        tmp.push({
            tag: tags[i], 
            color: colors.length>i ? colors[i]: 'red'
        });
    }
    tmp.sort(function(x1,x2){
        return x1.tag<x2.tag ? -1 : (x1.tag>x2.tag) ? 1 : 0
    });
    this.tags=[];
    this.colors=[];
    for (var i=0; i<tmp.length;++i){
        this.tags.push(tmp[i].tag);
        this.colors.push(tmp[i].color);
    }
}

libutil.trendchart.prototype.detach = function() {
    if (this.handler && !this.sqlreq)
        if (!window.removeTrendsListener(this.handler))
            console.error('TrendsListener didnt remove');
    if (this.chart)
        this.chart.destroy();
    this.element.chart=undefined;
    this.element.trendchart=undefined;
}

libutil.trendchart.prototype.currentStart = function() {
    return this.sqlreq ? this.start.valueOf() : (new Date() - this.period).valueOf() ;
} 

libutil.trendchart.prototype.add_nullperiod =function (period){
    var start = period.start;
    var stop = period.stop;    
    for (var i=0;i<this.null_periods.length;++i){
        var state = (stop < this.null_periods[i].start) ? 0 :
        (((stop <= this.null_periods[i].stop) || (start <= this.null_periods[i].stop)) ? 1 : 2);
        //if (stop>this.null_periods[i].stop)        
        switch(state) {
            case 0:  {
                
                libutil.util.insert_element_arr(this.null_periods,period,i);
                this.null_datachange=true;
                //console.log('periods 0 : ' , this.null_periods, ' add ' , period);
                return;
            }
            case 1:  {
                
                this.null_periods[i].start = start < this.null_periods[i].start ? start : this.null_periods[i].start;
                this.null_periods[i].stop = stop > this.null_periods[i].stop ? stop : this.null_periods[i].stop;
                //console.log('periods 1 : '  , this.null_periods, ' change ' + i , this.null_periods[i]);
                this.null_datachange=true;
                return;
            }
        }                   
    }
    this.null_datachange=true; 
    this.null_periods.push(period);
   
}

libutil.trendchart.prototype.update_null_data =function (){

    if (this.current_null_periods_change){
        if (this.current_null_periods){
            this.chart.xAxis[0].removePlotBand('currentnulldata');  
            this.chart.xAxis[0].addPlotBand({
                from : this.current_null_periods.start , 
                to : Number.POSITIVE_INFINITY,
                color : this.disablecolor,
                id: 'currentnulldata'
            });
        }
        else{
            this.chart.xAxis[0].removePlotBand('currentnulldata');
        } 
        this.current_null_periods_change=false;      
    }
  
    if (this.null_datachange){
        //console.log('this.addBound() lines' , this.null_lines );
        this.addBound();  
        this.null_datachange =false;  
    }
}


libutil.trendchart.prototype.update_data =function (){
    var now = this.currentStart();
    var updated = false;

    for (var i=0; i<this.element.chart.series.length; ++i){
        if (this.element.chart.series[i].data.length) {
            //console.log( 'now:' + new Date(now) + ' data:' + new Date(this.element.chart.series[i].data[0].x));
            if (this.element.chart.series[i].data[0].x< now) {
                while((this.element.chart.series[i].data.length>1) && (this.element.chart.series[i].data[1].x<now))
                    this.element.chart.series[i].data[0].remove(false,false);
                if (this.element.chart.series[i].data[0].x< now){
                    var val = this.element.chart.series[i].data[0];
                    var valnext = (this.element.chart.series[i].data.length>1) ? this.element.chart.series[i].data[0] : null;
                    var yval = (val.y!==null) && (valnext.y!==null) ? ((valnext.y/* + val.y*/)/* / 2*/) : val.y;
                    val.x= now;
                    val.y= yval;
                    this.element.chart.series[i].data[0].update(val);
                }                               
                updated = true;             
            }
        }
    }
    var haschange = true;
    var periodhaschange = false;
    while (haschange){
        var haschange = false;
        if (this.null_periods.length && this.null_periods[0].stop<now){
            periodhaschange=true;
            libutil.util.remove_element_arr(this.null_periods,0);
            this.null_datachange = true;
            haschange = true;
            updated = true;
        }         
    }
    if (periodhaschange){
        haschange = false;
        if (this.null_lines.length && this.null_lines[0].time<now){
            libutil.util.remove_element_arr(this.null_lines,0);
            haschange = true;
        } 
    }
    return updated;
}



libutil.trendchart.prototype.checkdata =function (arr, val, i ,init, close){
    val[0]=val[0].valueOf();
    if (val[1]!=val[1] || val[1]===null || val[1]===undefined)
        val[1]=null;
    if (init){
        var now = this.currentStart();
        if (now<val[0]){
            if (val[1]===null){
                arr.push({
                    x : now, 
                    y : null
                });
                this.current_null_periods_change=true;
                this.null_datastate[i]=now;
                this.current_null_periods ={
                    'start' : now, 
                    'counter' : 1
                };  
                this.current_null_periods_change=true;
            }
            else
            {
                arr.push({
                    x : now, 
                    y : val[1]
                });            
            }
        }
        else{
            val[0]=now;    
        }
    }  
    
    if (!this.null_datastate[i] && (val[1]===null)){
        
        this.null_datastate[i]=/*this.last_datastate[i] ? this.last_datastate[i] :*/ val[0];
        
        this.null_lines.push({
            time : this.null_datastate[i] ,
            color : (this.colors && this.colors.length>i) ? this.colors[i] : 'black'
        });

        
        if (this.current_null_periods==null){
            this.current_null_periods_change=true;
            this.current_null_periods ={
                'start' : this.null_datastate[i], 
                'counter' : 1
            };     
        }
        else{
            if ((!arr) && (this.null_datastate[i] < this.current_null_periods.start)){
                
                this.current_null_periods.start =  this.null_datastate[i];
                console.log('add nullcouter this case' +this.current_null_periods.counter)
            }   
            this.current_null_periods.counter += 1;
        }
        
        this.current_null_periods_change=true;
        if (this.serias_lastvalue[i]!==null && arr){
            arr.push({
                x : val[0]-1, 
                y : this.serias_lastvalue[i]
            });
        } 
        console.log('new nullperiod: ' +new Date(this.null_datastate[i], val[1]))
         
    }
    else{
        if (this.null_datastate[i] && (val[1]!==null || close)){
            
            this.null_lines.push({
                time : val[0] , 
                color : (this.colors && this.colors.length>i) ? this.colors[i] : 'black'
            });

            
            this.add_nullperiod({
                start : this.null_datastate[i] , 
                stop : val[0]
            })
            //console.log('add nullperiod: ',new Date(this.null_datastate[i]),new Date(val[0]));
            this.null_datastate[i]=null;
            if ((this.current_null_periods!=null)){
                this.current_null_periods.counter-=1;
                //console.log('rem nullcouter: ' +this.current_null_periods.counter)
                if (!this.current_null_periods.counter){
                    
                    this.current_null_periods = null;
                }
            }
            this.current_null_periods_change=true;
        } 
    }
    if (val[1]!==null)
        this.serias_lastvalue[i]=val[1];
    this.last_datastate[i]=val[0];
    if (arr) 
        arr.push({
            x : val[0], 
            y : val[1]
        });
    else
        return {
            x : val[0], 
            y : val[1]
        };
}


libutil.trendchart.prototype.addBound =function (){
    this.chart.xAxis[0].removePlotBand();
    this.chart.xAxis[0].removePlotLine();
    //console.log('lines count:' , this.null_lines.length, 'bounds count:' , this.null_periods.length );
    for (var i = 0 ; i < this.null_periods.length; i++){
        this.chart.xAxis[0].addPlotBand({
            from : this.null_periods[i].start , 
            to : this.null_periods[i].stop,
            color : this.disablecolor
        });
    }
    
    for (var i = 0 ; i < this.null_lines.length; i++){
        this.chart.xAxis[0].addPlotLine({
            value : this.null_lines[i].time , 
            width : 1,
            color : /*this.null_lines[i].color*/'#EEE'
        });
    } 
//this.current_null_periods_change=false;
}





libutil.trendchart.prototype.startSeries = function(ev) {
    var series = [];
    for (var i=0;i<ev.length;++i){
        if (ev[i].data){
            var item = {
                id: this.elid+'___'+ev[i].name,
                name: ev[i].comment ? ev[i].comment : '_______', 
                yAxis: i,
                data : [],
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
        };
        if (this.start) 
            this.checkdata(item.data, [this.start, undefined] ,i, true);        
        for (var j = 0 ; j < ev[i].data.length; j++) { 
            var dt = ev[i].data[j];
            this.checkdata(item.data, dt,i,(j==0 && !this.start));
        }
        if (this.stop) 
            this.checkdata(item.data, [this.stop, undefined] ,i, false , true);
        series.push(item);
    }
    return series;
}




libutil.trendchart.prototype.addSeries = function(ev){
    var updated = false;
    for (var i=0;i<ev.length;++i)
        if (ev[i].data){
            for (var j = 0 ; j < ev[i].data.length ; j++) {
                var dt = ev[i].data[j];
                //if (((parseInt(dt[0].getMinutes() /1)) % (4)) ==i)
                //        dt[1]=null;
                dt = this.checkdata(null, dt,i)    
                this.element.chart.series[i].addPoint([dt.x , dt.y], false , false , false);
                updated = true;
            }
        }						

    var updated2 = this.update_data();
    var updated1 = this.update_null_data();
    if (updated || updated1 || updated2)
        this.element.chart.redraw();
        
}


libutil.trendchart.prototype.YAxis = function(){
    var rslt =[];
    for (var i=0;i<this.tags.length;++i){
        rslt.push({
            gridLineWidth : this.axiswidth,
            gridLineColor: this.axisYcolor,
            minPadding: 0.0,
            maxPadding: 0.0,
            min: this.ranges && this.ranges[this.tags[i]] ? this.ranges[this.tags[i]].min : null,
            max: this.ranges && this.ranges[this.tags[i]] ? this.ranges[this.tags[i]].max : null,            
            labels: {
                formatter: function() {
                    return this.value;
                },

                style:  {
                    color: this.colors ? this.colors[i] : undefined,
                    'font-size' : this.fontsize ? this.fontsize : undefined
                }
            },
            title: {
                text: null
            },    
            opposite: i ?  true : false
        });
    }
    return rslt;
}


libutil.trendchart.prototype.execute = function(ev) {
    if (this.callback)
        this.callback(ev);
    if (ev && (ev.length)){
        var ts =this;
        var elem=this.element;

        if ((elem!=null) && (ev.length)){
            
            if (elem.chart==null){
                
                if (this.element.trobbler)
                    this.element.trobbler.destroy();
                   
                this.chart = new Highcharts.Chart({
                    chart: {
                        width: this.width ? this.width : undefined,
                        height: this.height ? this.height : undefined,
                        renderTo: elem.id ,
                        defaultSeriesType: this.defaultseriestype,
                        backgroundColor: this.backgroundcolor,
                        animation: this.animation,
                        //type: 'spline'
                        zoomType: this.sqlreq ? 'xy' : undefined
                        

                    },
                    

                    title: {
                        text:  this.title,
                        style:{
                            'font-size' : '11px'
                        },
                        align: 'left',
                        x: 5,
                        verticalAlign: 'top',
                        y: 5
                    },
                    xAxis: {
                        type: 'datetime',
                        plotBands: [],
                        gridLineWidth : this.axiswidth,
                        gridLineColor: this.axisXcolor,
                        labels: {
                            style:  {
                                'font-size' : this.fontsize ? this.fontsize : undefined
                            }
                        }
                       
                    },
                    yAxis: this.YAxis(),
                    tooltip: {
                        borderRadius: this.borderRadius,
                        formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                            Highcharts.dateFormat('%H:%M:%S', this.x) +'<br/>'+ 
                            Highcharts.numberFormat(this.y, 2);
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },  

                    plotOptions: {
                        line: {
                            allowPointSelect: false,
                            lineWidth: this.linewidth,
                            states: {
                                hover: {
                                    enabled: false,
                                    radius: 3
                                }
                            },
                            shadow: this.shadow
                        }
                    },
                    names : this.tags,
                    colors : (this.colors),
                    series: this.startSeries(ev)
                }); 
                
                this.element.chart = this.chart;
                this.addBound();
                for (var k in this.chart.series)
                    this.chart.series[k].show()
                if (this.complete)
                    this.complete();
            }
            else {
                this.addSeries(ev);
                      
            }

        }
    }
}

libutil.trendchart.prototype.setcolor = function(id, color){
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        this.chart.get(this.elid+'___'+id).color=color;
    }
}

libutil.trendchart.prototype.removeseries = function(id){
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        this.chart.get(this.elid+'___'+id).remove();
    }
}

libutil.trendchart.prototype.getExtremes = function(id){
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        return this.chart.get(this.elid+'___'+id).yAxis.getExtremes();
    }
}

libutil.trendchart.prototype.setExtremes = function(id, min, max){
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        this.chart.get(this.elid+'___'+id).yAxis.setExtremes(min,max);
    }
}

libutil.trendchart.prototype.setExtremesAuto = function(id){
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        var yax = this.chart.get(this.elid+'___'+id).yAxis;
        var ext =yax.getExtremes();
        if (ext)
            yax.setExtremes(ext.dataMin,ext.dataMax);          
    }
}

libutil.trendchart.prototype.setSelect = function(id){
    if (this.chart && this.selectedseries && this.chart.get(this.selectedseries+'___'+id)){
        this.chart.get(this.selectedseries+'___'+id).select(false);
    } 
    this.selectedseries=undefined;
    if (this.chart && this.chart.get(this.elid+'___'+id)){
        this.selectedseries=id;
        this.chart.get(this.elid+'___'+id).select(true);
    }
}

libutil.trendchart.prototype.setTitle = function(title){
    if (this.chart)
        this.chart.setTitle({ text: title });
    else
        this.title=title;
    
}

/////////////////////////////////////////////////

libutil.dom.clearChildNode = function (element){
    if (element){
        while (element.hasChildNodes()) 
            element.removeChild(element.lastChild);
    }
}



libutil.dom.checkIsParent  = function(canparent,test,self){
    if (!test) return false;
    if (test==canparent) return (self) ? true : false;
    return libutil.dom.checkIsParent (canparent,test.parentNode,true);
}


libutil.dom.duplicateElement  = function(el, deep, excluteattr){
    var doc=el.ownerDocument ? el.ownerDocument : el.document;
    var namespace = el.namespaceURI;
    var localName = el.localName;
    //var parent=el.parentNode;
    var duplicate = doc.createElementNS(namespace, localName);
    
    var notexclude = function(nm){
        if (!excluteattr || !excluteattr.length) return true;
        for (var i=0;i<excluteattr.length;++i){
            if (excluteattr[i]==nm) return false;
        }
        return true;
    }
    
    for (var i=0;i<el.attributes.length;++i){
        if (notexclude(el.attributes[i].localName)){
            if (el.attributes[i].namespaceURI) 
                duplicate.setAttributeNS(el.attributes[i].namespaceURI , el.attributes[i].localName, el.attributes[i].value);
            else
                duplicate.setAttribute(el.attributes[i].localName, el.attributes[i].value);
        } 
    }
    
    if (deep || (deep==undefined)){
        for(var e=el.firstElementChild; e; e=e.nextElementSibling){
            duplicate.appendChild(e.cloneNode(true));
        }
    }
    
    return duplicate;
      
}


libutil.dom.findElementById = function (el, id){
    for(var e=el.firstElementChild; e; e=e.nextElementSibling){
        if (e.getAttribute('id')==id) return e;
        var result = libutil.dom.findElementById(e, id);
        if (result) 
            return result;      
    }
}

libutil.dom.findElementByTagName = function (el, name){
    for(var e=el.firstElementChild; e; e=e.nextElementSibling){
        if (e.localName==name) return e;
        var result = libutil.dom.findElementByTagName(e, name);
        if (result) 
            return result;      
    }
}

libutil.dom.findChildByTagName = function (el, name){
    for(var e=el.firstElementChild; e; e=e.nextElementSibling){
        if (e.localName==name) return e;    
    }
    return null;
}

libutil.dom.removechild = function (parent, el){
    for(var e=parent.firstElementChild; e; e=e.nextElementSibling){
        if (e==el) {
            parent.removeChild(el);
            break;
        }
    }
}


libutil.dom.readDoc = function (url , text){ 
    try{
        var xmlHttp=new XMLHttpRequest();
        xmlHttp.open("GET",url,false);
        xmlHttp.send(null);
        return text ? xmlHttp.responseText : xmlHttp.responseXML;
    }
    catch(exception){
        alert(exception);
    }
    return null;
}


libutil.dom.writeDoc = function (doc, postfix){
    if (doc && window.$$writefile){
        var xmls = new XMLSerializer();  
        var data= xmls.serializeToString(doc); 
        $$writefile(postfix ?  libutil.regex.add_postfix_file(doc.baseURI,postfix) : doc.baseURI,data);
    }
}
      


// Throbber constructor
libutil.proggress.throbber = function(container) {
    this.parent = container;
    var size = container.width.baseVal.value < container.height.baseVal.value ? container.width.baseVal.value : container.height.baseVal.value;
    var cx = container.width.baseVal.value / 2;
    var cy = container.height.baseVal.value / 2;
    var sizeR = size * libutil.proggress.throbber.RELATIVE_SIZE ;
    var x = cx - sizeR / 2;
    var y = cy - sizeR / 2;
    this.trob = libutil.svg.create_element( 'image', this.parent,   [{
        name : 'x' , 
        value: x
    },

    {
        name : 'y' , 
        value: y
    },      

    {
        name : 'height' , 
        value: sizeR
    },

    {
        name : 'width' , 
        value: sizeR
    }]);
    this.trob.setAttributeNS(libutil.XLINK_NAMESPACE_URL, 'xlink:href', '../web-utils/css/res/throbber.svg' );
    return this;
};


libutil.proggress.throbber.RELATIVE_SIZE = 0.3;


libutil.proggress.throbber.prototype.destroy = function(){
    if (this.parent && this.trob)
        libutil.dom.removechild(this.parent, this.trob);//this.parent.removeChild(this.trob);
}


/* 

  valdator

*/





libutil.validator.expresssion = function(val, el) {
    if (!((val==undefined) || (val=='') || (val==null)))
    $$check(val, function(){ el.className = dsutl.toolwin.validate_to_class(event.error==0);});
    return undefined;
    
 }

libutil.validator.taglist = function(val, el) {
    if (!((val==undefined) || (val=='') || (val==null)))
    $$check('tags('+val+')', function(){ el.className = dsutl.toolwin.validate_to_class(event.error==0);});
    return undefined;    
}

libutil.validator.tag = function(val, el) {
    if (!((val==undefined) || (val=='') || (val==null))) 
    $$check('('+val+').binding', function(){ el.className = dsutl.toolwin.validate_to_class(event.error==0);});
    return undefined;  
}

libutil.validator.regex = function(val , regex) {
    if ((val==undefined) || (val=='') || (val==null))  return undefined;
    var error = val.test(regex);
    return (error==undefined) ? undefined : (error);   
}





libutil.set_Title = function (el) {
    if (el && el.firstElementChild) {
        for (var ch = el.firstElementChild; ch; ch = ch.nextElementSibling) {
            if (ch.hasAttribute('title') && ch.hasAttribute('id')) {
                if ($(ch).qtip)
                    $(ch).qtip();
            }
            libutil.set_Title(ch);
        }
    }
}

            
