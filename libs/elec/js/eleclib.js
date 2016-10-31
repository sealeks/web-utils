var eleclib = {    
    
};

eleclib.NAMESPACE_URL = 'http://dvnci/elib';

eleclib.CHART_WIDTH = 350;

eleclib.CHART_HEIGHT = 180;

eleclib.CHART_PADDING = 5;

eleclib.REGULATOR_WIDTH = 250;

eleclib.REGULATOR_S_HEIGHT = 320;

eleclib.REGULATOR_F_HEIGHT = 494;

eleclib.POPUP_R = 10;

eleclib.POPUP_BODY_STYLE = 'fill: #333; opacity: 0.1; ';

eleclib.POPUP_STATIC_STYLE = 'fill: #333; fill-opacity: 0.4; stroke: yellow; stroke-width: 1; stroke-opacity: 1.0 ';

eleclib.POPUP_MOVE_STYLE = 'fill: yellow; fill-opacity: 0.3; stroke: green; stroke-width: 1; stroke-opacity: 1.0'

eleclib.element = {};


eleclib.check_click = function(el , ev){
    if (el && el.correspondingUseElement && el.correspondingUseElement.parentNode){
        var needofsetrect = el.correspondingUseElement.parentNode.getBoundingClientRect();
        //console.log('bbox',needofsetrect);
    }
    var target =el.correspondingElement ? el.correspondingElement : el;
    if (target && target.getAttribute && target.getAttribute('cursor')=='pointer'){
        target.needofsetrect = needofsetrect;
        return target;}
    return null;
}

eleclib.create_shadow_slider =  function (el, x1, y1 , x2, y2 , direction , tag, live, wait){
    
    var parent=el.parentNode;
    
    if (el.movelement){
        parent.onmousemove=undefined;
        parent.onmouseout=undefined;
        parent.onmouseup=undefined;
        parent.removeChild(el.movelement);
    }
    
    var dupl = libutil.dom.duplicateElement(el, false, ['id','captured','onmousedown', 'onmouseup']);

    el.movelement = dupl;
    
    dupl.minx =x1;
    dupl.maxx =x2;
    dupl.miny =y1;
    dupl.maxy =x1;
    
    dupl.startx =event.x ;
    dupl.starty =event.y;
    
    dupl.startcx =parseInt(dupl.getAttribute('x'));
    dupl.startcy =parseInt(dupl.getAttribute('y'));
    
    dupl.reverse =(direction=='rl') || (direction=='bt');
    dupl.vertical =(direction=='tb') || (direction=='bt');
    
    dupl.lengthline = dupl.vertical ? (dupl.maxy - dupl.miny) : (dupl.maxx - dupl.minx);
    
    parent.appendChild(dupl);
    
    var selfremove = function(){
        parent.onmousemove=undefined;
        parent.onmouseout=undefined;
        parent.onmouseup=undefined;
        if (el.movelement){
            el.movelement.onmouseout=undefined;
            el.movelement.onmousemove=undefined;
            el.movelement.onmouseup=undefined;      
            parent.removeChild(el.movelement);
            el.movelement=undefined;
        }
    }
    
    dupl.onselectstart = function(ev){
           ev.stopPropagation();
           ev.preventDefault();
           return false;}
    
    dupl.onmousemove = function(ev){
        var newv = dupl.vertical ? ev.y - dupl.starty : ev.x - dupl.startx;
        if (newv){
            var newval = (dupl.vertical ? dupl.startcy  : dupl.startcx) + newv;
            dupl.setAttribute(dupl.vertical ? 'y' : 'x' ,newval);
            if (live){
                var cmdlength = dupl.vertical ? (dupl.reverse ? dupl.maxy - newval:  newval - dupl.miny) 
                : (dupl.reverse ? dupl.maxx - newval: newval - dupl.minx);
                command(cmdlength/dupl.lengthline);
            }
        }  
    }
    
    
    dupl.onmouseup=function(ev){
        var newv = dupl.vertical ? ev.y - dupl.starty : ev.x - dupl.startx;
        if (newv){            
            var newval = (dupl.vertical ? dupl.startcy  : dupl.startcx) + newv;
            var cmdlength = dupl.vertical ? (dupl.reverse ? dupl.maxy - newval:  newval - dupl.miny) 
            : (dupl.reverse ? dupl.maxx - newval: newval - dupl.minx);
            command(cmdlength/dupl.lengthline);
            setTimeout(function() {
                selfremove();
                el.onmouseup();
            }, (wait && parseInt(wait)) ? wait : 3000  );
        }
        else{
            selfremove();
            el.onmouseup();
        }
    }    
  
    
    
    var command = function(val){
        try{
            var cmd = tag + ' @@= ('+ tag +'.mineu + ((' + tag + '.maxeu - ' + tag + '.mineu) * ' + val.toString()+ '))';
            console.log('val:' + val +' min:' + $$(tag +'.mineu') +' max:' + $$(tag +'.maxeu'))
            $$(cmd);
        }
        catch(error){
            console.log('Command slider no set:' + error)
        }
    }
    
    parent.onselectstart = function(ev){
           ev.stopPropagation();
           ev.preventDefault();
           return false;}
    
    parent.onmousemove = function(ev){
        if (el.movelement) {
            el.movelement.onmousemove(ev);
            ev.stopPropagation();
        }
    }    

    
    parent.onmouseout = function(ev){

        if (!libutil.dom.checkIsParent (parent,ev.toElement,true)){
            selfremove();
            el.onmouseup(ev);
        }
    }
    
    parent.onmouseup = function(ev){
        if (el.movelement){
            el.movelement.onmouseup(ev);
        }
        else{
            el.onmouseup(ev);
        }
        

    }
       
}




eleclib.get_popupbody  = function(el, width, height, remfunc , shift, namepopup){
    
    if (!namepopup) namepopup='popup';
    var namepopupold='old'+namepopup;
    
    if (el[namepopup]){
        return;
    }

    el[namepopup] = libutil.popup.createsvgs(el,width,height,0, null, eleclib.POPUP_BODY_STYLE , null, eleclib.POPUP_R, shift);
    
    if (el[namepopupold]){
        var x=parseInt(el[namepopup].getAttribute('x'));
        var y=parseInt(el[namepopup].getAttribute('y'));
        el[namepopup].parentNode.removeChild(el[namepopup]);
        el[namepopup]=el[namepopupold];
        el[namepopup].setAttribute('x', x);
        el[namepopup].setAttribute('y', y);
        el[namepopup].setAttribute('style', '');
        return undefined;
    }
    
    el[namepopup].setAttribute('cursor', 'pointer');
    

    
    if (el[namepopup].firstChild) {
        el[namepopup].firstChild.onclick= function(){
            el[namepopup].setAttribute('style', 'display: none;');
        };
    }
    
    el[namepopup].onmouseout = function(ev){
        
        if (!libutil.dom.checkIsParent (el[namepopup],ev.toElement,true)){
            if (remfunc)
                    remfunc();
            else
               el[namepopup].setAttribute('style', 'display: none;'); 
        }
        
       
    };  

    el[namepopup].onmousedown= function(){
        
        if (event.target==el[namepopup]){

         
            if (el[namepopup]){
                
                if (remfunc)
                    remfunc();
                else
                    el[namepopup].setAttribute('style', 'display: none;');               
            }
           
        }
    }; 
      
    return el[namepopup].popupbody;  
}



eleclib.get_staticpopupbody  = function(el, width, height, remfunc, shift, namepopup){
    
    if (!namepopup) namepopup='popup';
    
    if (!el[namepopup]){
    el[namepopup] = libutil.popup.createsvgs(el,width,height,4, null , eleclib.POPUP_BODY_STYLE , 
                                        eleclib.POPUP_STATIC_STYLE , eleclib.POPUP_R);

    var mainpopup = el[namepopup]; 
    var hoverrect = mainpopup.hoverrect;
    var btnparent = el[namepopup];
    var btnpos = el[namepopup].buttonposition;
    
    var size = btnpos.width < btnpos.height ? 
        btnpos.width : btnpos.height;
    var cx = btnpos.x + btnpos.width / 2;
    var cy = btnpos.y + btnpos.height / 2;
    var sizeR = size / 2;
    if (sizeR>16) sizeR= 16; 
    var x = cx - sizeR / 2;
    var y = cy - sizeR / 2;
    if (btnpos.dir===0 || btnpos.dir==2)
        x = btnpos.width - 2 * sizeR; 
    if (btnpos.dir==1 || btnpos.dir==3)
        y = btnpos.height - 2 * sizeR;   
    
    this.closebutton = libutil.svg.create_element( 'image', btnparent,   [{
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


    var rootbody = el[namepopup];
    
    var rootbodyreplace = function(x,y ,func){
        rootbody.style.display='none';
        setTimeout( function(){
            rootbody.setAttribute('x', x);
            rootbody.setAttribute('y', y);
            if (func ) func();
            rootbody.style.display='block';
            rootbody.needofsetrect = rootbody.getBoundingClientRect();
        },10);
    }
    
    
    el[namepopup].rootbodyreplace=rootbodyreplace;
    
    

        
    var cteateshadowboby = function(){
        
        el.hoverrectrootel = libutil.svg.create_element('svg', rootbody.parentNode  , [
            {name : 'x', 
                value:  rootbody.x.baseVal.value-400
            },

            {
                name : 'y', 
                value:  rootbody.y.baseVal.value-400
            },

            {
                name : 'width', 
                value: rootbody.width.baseVal.value+800
            },

            {
                name : 'height', 
                value: rootbody.height.baseVal.value+800
            }]);
        
    

        el.hoverrectshadow = libutil.svg.create_element('rect', el.hoverrectrootel  , [{
            name : 'x', 
            value:  400
        },

        {
            name : 'y', 
            value:  400
        },

        {
            name : 'width', 
            value: rootbody.width.baseVal.value
            },

            {
            name : 'height', 
            value: rootbody.height.baseVal.value
            },

            {
            name : 'rx', 
            value: eleclib.POPUP_R
            },

            {
            name : 'ry', 
            value: eleclib.POPUP_R
            }, 
            {
            name : 'cursor', 
            value: 'pointer'
            },             


            {
            name : 'style', 
            value : eleclib.POPUP_MOVE_STYLE
        }]);
    
           el.hoverrect = libutil.svg.create_element('rect', el.hoverrectrootel  , [{
                name : 'x', 
                value:  0
            },

            {
                name : 'y', 
                value:  0
            },

            {
                name : 'width', 
                value: rootbody.width.baseVal.value+800
            },

            {
                name : 'height', 
                value: rootbody.height.baseVal.value+800
            },
 
            {
                name : 'cursor', 
                value: 'pointer'
            },             


            {
                name : 'style', 
                value : 'opacity: 0; fill: white;'
            }]);
    
    
    
        el.hoverrect.onselectstart = function(ev){
           ev.stopPropagation();
           ev.preventDefault();
           return false;}
       
          
    
        el.hoverrect.onmousemove = function(ev){
            if (ev.target==el.hoverrect && el.hoverrect.captured){
                if ((el.hoverrect.captured.x!=ev.x) || (el.hoverrect.captured.y!=ev.y)) {
                    var shiftX = el.hoverrect.captured.x - ev.x;
                    var shiftY = el.hoverrect.captured.y - ev.y;
                    
                    el.hoverrectrootel.setAttribute('x', parseInt(el.hoverrectrootel.getAttribute('x'))-shiftX );
                    el.hoverrectrootel.setAttribute('y', parseInt(el.hoverrectrootel.getAttribute('y'))-shiftY );
                    el.hoverrect.changerect =true;
                    el.hoverrect.captured=ev;
                }
            }
        }
    
        el.hoverrect.onmouseup = function(ev){
            if (ev.target==el.hoverrect){
                el.hoverrect.captured = undefined;                
                if (!el.hoverrect.changerect){
                    el.hoverrectrootel.parentNode.removeChild(el.hoverrectrootel);
                    return;
                }     
                rootbodyreplace(parseInt(ev.x - el.hoverrect.capturedstart.x) +  parseInt(rootbody.getAttribute('x')),
                                parseInt(ev.y - el.hoverrect.capturedstart.y) +  parseInt(rootbody.getAttribute('y')),
                                         function(){el.hoverrectrootel.parentNode.removeChild(el.hoverrectrootel);} );
            }        
        }
    
        el.hoverrect.onmousedown = function(ev){
            el.hoverrect.captured = ev;
            el.hoverrect.capturedstart = ev;
            //console.log('shadow mousedown');
            ev.stopPropagation();            
        }
        
        el.hoverrect.onmouseout = function(ev){
            if (ev.target==el.hoverrect && el.hoverrect.captured){
                el.hoverrect.onmouseup(ev);
                ev.stopPropagation();
            }          
        }        
    
    }   

    this.closebutton.setAttributeNS(libutil.XLINK_NAMESPACE_URL, 'xlink:href', '../web-utils/css/res/close.svg' );

    this.closebutton.onclick = function(ev){       
            if (remfunc)
                remfunc();
            else
                el[namepopup].parentNode.removeChild(el[namepopup]);      
    
    }
    

    hoverrect.onselectstart = function(ev){
           ev.stopPropagation();
           ev.preventDefault();
           return false;}    

    
    hoverrect.onmousedown = function(ev){
        if (ev.target==hoverrect){ 
          cteateshadowboby();  
          el.hoverrect.onmousedown(ev);
        }            
    }
              
    el[namepopup].setAttribute('cursor', 'pointer');
    }
    else
    {
       el[namepopup].rootbodyreplace(el[namepopup].boundspopup.x , el[namepopup].boundspopup.y);
       return null;
    }    
   
    return el[namepopup].popupbody;  
}





eleclib.switcher_popup = function(el, rauto){
    if (el.popup){
        el.popup.setAttribute('style', '');
        return;
    }
    try{
        
        var body = eleclib.get_popupbody(el,150, (libutil.util.trim(rauto)=='') ? 150 : 188);
        
        document.getElementById(el.getAttribute('id') + '_popup');
           
        //var use = libutil.svg.create_element('use', body);
        var use = document.getElementById(el.getAttribute('id') + '_popup');         
        body.useelement=use;
        //use.setAttributeNS(libutil.XLINK_NAMESPACE_URL,'href','#'+el.getAttribute('id') + '_popup');    
        //body.appendChild(use/*.cloneNode(true)*/);
        if ((body.childNodes.length == 0) || 
                (body.childNodes[body.childNodes.length-1]!=use))
            body.appendChild(use/*.cloneNode(true)*/);
        else
            console.error('duplicate prouse element', use);
    }
    catch(error){
        throw console.error('eleclib.switcher_popup error: ' + error);
    }  


}




eleclib.config_click = function (el){
 
    if (el.configpopup){
        if (el.configpopup.getAttribute('style')!='') el.configpopup.setAttribute('style', '');
        else  el.configpopup.setAttribute('style', 'display: none;');
        return;
    }
    
    var elementId =  el.getAttribute('id');
    var defs = document.getElementById(elementId + '_popup_config');
    
    if (!defs) return;
    
    try{
        
        var width=250;
        
        var height = 30 + (defs.childNodes.length  - 1) * 12 + 4;
       
   
        var body = eleclib.get_staticpopupbody(el,width,height, 
                                         function() {if (el.configpopup) 
                                                      el.configpopup.setAttribute('style', 'display: none;');}, 
                                         el.needofsetrect, 'configpopup');
                                         
        body.setAttribute('id', elementId + '_popup_config_body');
        
                  

        //var use = libutil.svg.create_element('use', body);
        var use = document.getElementById(elementId + '_popup_config');
        body.useelement=use;
        //use.setAttributeNS("http://www.w3.org/1999/xlink",'href','#' + elementId + '_popup_config');
        if ((body.childNodes.length == 0) || 
                (body.childNodes[body.childNodes.length-1]!=use))
            body.appendChild(use/*.cloneNode(true)*/);
        else
            console.error('duplicate prouse element', use);
        
        
    }
    catch(error){
        throw error;
    }  

    
}

function elecmover_initiate(win) {
    if (win.document) {
        var doc = win.document;
        if (doc && !doc.red) {
            if (!doc.elecholder) {
                doc.elecholder = new elecmover(doc);
            }
        }
    }
}

function elecmover_registrate(el) {
    if (el) {
        var mover = elecmover_create(el);
    }
}

function elecmover_generate(el, ev) {
    if (el && ev.button==2) {
        var doc = el.ownerDocument;
        if (doc && !doc.red) {
            if (!doc.elecholder) {
                doc.elecholder = new elecmover(doc);
            }
            if (!el.elecholder && doc) {
                el.elecholder = doc.elecholder;
            }
        }
        if (el.elecholder) {
            var newel=el.elecholder.cloneElement(el);
            elecmover_registrate(newel);
            if (newel.onmousedown)
                newel.onmousedown(ev);
            ev.stopPropagation();
        }      
    }
}

function elecmover_create(el) {
    var doc = el.ownerDocument;
    if (doc && !doc.red) {
        if (!doc.elecholder) {
            doc.elecholder = new elecmover(doc);
        }
        if (!el.elecholder && doc) {
            el.elecholder = doc.elecholder;
            doc.elecholder.attach(el);
            doc.addEventListener('mousemove', function (ev) {
                if (el.elecholder.mousmoveevent && el.elecholder.moveel===el) {
                    var xsh = ev.pageX - el.elecholder.mousmoveevent.pageX;
                    var ysh = ev.pageY - el.elecholder.mousmoveevent.pageY;
                    //console.log(ev, xsh, ysh);
                    el.elecholder.shiftInstant(el, xsh, ysh);
                    ev.stopPropagation();
                }
            });
            el.addEventListener('mouseup', function (ev) {
                if (el.elecholder.moveel === el) {
                    el.elecholder.mousmoveevent = undefined;
                    el.elecholder.unselectElement();
                    el.elecholder.moveel = undefined;
                    ev.stopPropagation();
                }
            });
        }
        return doc.elecholder;
    }
}

elecmover.deleteElement = function (trgt, elid, head, tag) {
    var tel = trgt.correspondingElement ? trgt.correspondingElement : trgt;
    if (tel && tel.ownerDocument) {
        var el = tel.ownerDocument.getElementById(elid);
        if (el) { 
            var mel = el.elecholder;
            if (mel) {
                var source = mel.getSourseElement(el);
                if (source) {
                    if (tag!='' && head!='') {
                        $$(tag + " @ '" + 'Удаление: '+ head + "'");
                    }
                    if (el.popup)
                        el.popup.setAttribute('style', 'display: none;');
                    el.parentNode.removeChild(el);
                    source.parentNode.removeChild(source);
                    mel.save();
                }
            }
        }
    }
}

function elecmover(doc){ 
    
    this.instantdocument=doc;
    this.schema=new dsutl.componentinfo();
    this.schema.init('../web-utils/lib.xsl');
    this.getSourseDocument();
    this.getLightDocument();
    this.getTrasformDocument();
    
}


elecmover.prototype.attach = function (el) {
    el.elecholder=this;
    el.addEventListener('mousedown', function (ev) {
        if (ev.button == 2) {
            el.elecholder.moveel=el;
            el.elecholder.mousmoveevent = ev;
            el.elecholder.selectElement(el);
        }
    });
    el.addEventListener('mouseup', function (ev) {
        if (ev.button == 2) {
            el.elecholder.moveel=undefined;
            el.elecholder.mousmoveevent = undefined;
            el.elecholder.unselectElement();
        }
    });
    el.addEventListener('mousemove', function (ev) {
        if (ev.button == 2) {
            if (el.elecholder.mousmoveevent && el.elecholder.moveel===el) {
                var xsh = ev.pageX - el.elecholder.mousmoveevent.pageX;
                var ysh = ev.pageY - el.elecholder.mousmoveevent.pageY;
                el.elecholder.shiftInstant(el, xsh, ysh);
                ev.stopPropagation();
            }
        }
    });
    var txtelement = el.ownerDocument.getElementById(el.getAttribute('id') + '_popup_edittext');
    if (txtelement) {
        txtelement.edit_func = function (txt) {
            if (txt || txt != '') {
                var tshldr=el.elecholder;
                var source = tshldr.getSourseElement(el);
                if (source) {
                    var oldtxt = source.getAttribute('header');
                    if (oldtxt != txt) {
                        source.setAttribute('header', txt);
                        tshldr.replaceElement(source, el);
                    }
                }
            }
        }
    }
}

elecmover.prototype.shiftInstant = function (el, x, y) {
    if ((y === null) || (y === undefined))
        return y = 0;
    if ((x === null) || (x === undefined))
        return x = 0;
    /*if (x) {
        console.log('x', el.getAttribute('x'), x)
        el.setAttribute('x', parseFloat(el.getAttribute('x')) + x);
    }
    if (y) {
        console.log('y', el.getAttribute('y'), y)
        el.setAttribute('y', parseFloat(el.getAttribute('y')) + y);
    }*/
    el.setAttribute('transform', 'translate('+ x.toString()+','+y.toString() + ')');
    el.shiftX=x;
    el.shiftY=y;
}

elecmover.prototype.selectElement = function (el ) {
    if (el.elecholder.moveelement){
        el.elecholder.unselectElement();
        el.elecholder.moveelement=undefined;
    }
    el.elecholder.moveelement=el;
    var cls = el.getAttribute('class');
    el.setAttribute('class', cls ? (cls + ' elec_selected') : 'elec_selected');
    el.elecholder.selclass = true;
    el.elecholder.oldclass = cls;    
}

elecmover.prototype.unselectElement = function () {
    if (this.moveelement){
        this.moveelement.selclass = false;
        this.moveelement.setAttribute('class', this.moveelement.oldclass ?
                   this.moveelement.oldclass : '');
        var source = this.getSourseElement(this.moveelement);    
        if (source){
            var ch=false;
            if (this.moveelement.shiftX) {
                ch=true;
                source.setAttribute('x', parseFloat(source.getAttribute('x')) + this.moveelement.shiftX);
                //console.log('setsourseX', source, this.moveelement.shiftX);
                this.moveelement.shiftX=undefined;
            }
            if (this.moveelement.shiftY) {
                ch=true;                
                source.setAttribute('y', parseFloat(source.getAttribute('y')) + this.moveelement.shiftY);
                //console.log('setsourseY', source, this.moveelement.shiftY);
                this.moveelement.shiftY = undefined;
            }
            if (ch) {
                this.replaceElement(source, this.moveelement);
            }
        }
        this.moveelement=undefined;                  
    } 
}

elecmover.prototype.replaceElement = function (source, instant) {
    var tel = this.getTransformElement(source.getAttribute('id'));
    instant.parentNode.replaceChild(tel, instant);
    tel.elecholder = this;
    this.save();
    this.attach(tel);
}

//  чтение документа источника
elecmover.prototype.getSourseDocument = function (){ 
    if (this.sourseDocument)
        return this.sourseDocument;
    try{
        this.sourseDocument = libutil.dom.readDoc(this.instantdocument.URL);
        if ((this.sourseDocument) && (this.sourseDocument.childNodes.length>1)){
            if (this.sourseDocument.childNodes[0].target=='xml-stylesheet'){
                if (this.sourseDocument.childNodes[0].data)
                    this.readXsltDocument(this.sourseDocument.childNodes[0].data);
            }
        }
    }
    catch(error){
        console.error('elecmover.prototype.getSourseDocument error: ' + error);
        this.sourseDocument = null;
    }
    return this.sourseDocument;
}



elecmover.prototype.getLightDocument = function (){ 
    try{
        this.lightDocument = libutil.dom.readDoc(this.instantdocument.URL);     
    }
    catch(error){
        console.error('elecmover.prototype.getLightDocument error: ' + error);
        this.lightDocument = null;
    }
    return this.lightDocument;   
}


elecmover.prototype.getLightElement = function (el){
    if (this.xsltProcessor && this.soursexslt) {
        if (this.lightDocument){
            var root = this.lightDocument.lastChild;
            if (root){
                while (root.firstChild)
                    root.removeChild(root.firstChild);                
                root.appendChild(el);
            }   
        }
        this.lightDocument = this.xsltProcessor.transformToDocument(this.lightDocument);
        return this.lightDocument.getElementById(el.getAttribute('id'));
    }
    return undefined;
}

//  чтение XSLT
elecmover.prototype.readXsltDocument = function(data){
    var urlxslt=data;
    var urlxslt=urlxslt.toString();
    var finded=urlxslt.search('type="text/xsl"');
    if (finded==-1)
        finded=urlxslt.search("href='");
    if (finded!=-1){
        urlxslt=urlxslt.substring(6,urlxslt.length);
        finded=urlxslt.search('"') ;
        if (finded!=-1){
            urlxslt=urlxslt.substring(0,finded);
            this.soursexslt = libutil.dom.readDoc(urlxslt);
            this.xsltProcessor=new XSLTProcessor();  
            this.xsltProcessor.importStylesheet(this.soursexslt); 
            this.trasformsourse = this.xsltProcessor.transformToDocument(this.sourseDocument);
            return;
        }
    } 
    this.xslturl=undefined;
}


elecmover.prototype.getTrasformDocument = function(){
    if (this.xsltProcessor && this.soursexslt)
        return this.trasformsourse = this.xsltProcessor.transformToDocument(this.sourseDocument);
    return undefined;
}



elecmover.prototype.getSourseElement = function(el){
    return el && el.id && this.sourseDocument ? 
    this.sourseDocument.getElementById(el.id) : null;
}

elecmover.prototype.getInstantElement = function(el){
    return el && el.hasAttribute('id') && this.instantdocument ? 
    this.instantdocument.getElementById(el.getAttribute('id')) : null;
}


elecmover.prototype.getTransformElement = function(elid){
    if (!this.trasformsourse){
        this.getTrasformDocument();
    }   
    if (this.trasformsourse) {
        var el=this.sourseDocument.getElementById(elid);
        if (el){
            el=el.cloneNode(true);
            return this.getLightElement(el);
        }
    }
    return null;
}




elecmover.prototype.unicalIdGenerate = function(el, doc, newstr, templt) {
    var i=0;
    var tmpl = templt  ? templt : 'name';
    var expr = new RegExp('[a-z]{1,}', 'i');
    if (el && (el.getAttribute('id')))
        tmpl=expr.exec(el.getAttribute('id'));

    if (tmpl=='') tmpl = 'name';
   
    var fid=tmpl + i;
    while ((doc.getElementById(fid)) || (newstr && newstr[fid]))
        fid=tmpl+ (++i);   
    return fid;
}

elecmover.prototype.unicalIdsGenerate  = function(el, newstr){
   if (!newstr) newstr={};
   var id = el.getAttribute('id');
   if (id && this.sourseDocument.getElementById(id)){
      var coneid=this.unicalIdGenerate(el, this.sourseDocument, newstr);
      newstr[coneid]=1;
      el.setAttribute('id',  coneid);}
      for (var ch=el.firstElementChild; ch; ch=ch.nextElementSibling){
          this.unicalIdsGenerate(ch, newstr);}
}


elecmover.prototype.cloneElement = function (el) {
    if (el) {
        var source = this.getSourseElement(el);
        if (source) {
            var el_c = source.cloneNode(true);
            var prnt = source.parentNode;
            this.unicalIdsGenerate(el_c);
            el_c.setAttribute('type', 'breakm');
            prnt.appendChild(el_c);
            var tel = this.getTransformElement(el_c.getAttribute('id'));
            var prntel = el.parentNode;
            prntel.appendChild(tel);
            return tel;            
        }
    }
}

elecmover.prototype.save = function(){
    if (this.sourseDocument){
        libutil.dom.writeDoc(this.sourseDocument);
    }  
}


