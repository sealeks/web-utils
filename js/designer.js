var dsutl = {};

dsutl.SELECT_MODE = null;

///
dsutl.componentinfo = function(){
    this.elements = {};
    this.types = {};
    this.libs = [];
    this.creators = {};
}


dsutl.trslt = {};

dsutl.toolwin = {};

dsutl.script = {};

dsutl.form = {};

dsutl.io = {};   
   
   
   

///

function designer(doc){ 
    
    this.instantdocument=doc;
    this.schema=new dsutl.componentinfo();
    this.schema.init('../web-utils/lib.xsl');
    this.getSourseDocument();
    this.getLightDocument();
    this.instantdocument.addEventListener('keyup' ,function (ev) {
        if (document.red)
            document.red.keybordDispatcherdUp(ev)
    });
    this.instantdocument.addEventListener('keydown', function (ev) {
        if (document.red)
            document.red.keybordDispatcherdDown(ev)
    });
    this.instantdocument.addEventListener('mousemove' ,function (ev) {
        if (document.red)
            document.red.mousemoveDocument(ev)
    });
    this.instantdocument.addEventListener('mousedown' ,function (ev) {
        if (document.red)
            document.red.mousedownDocument(ev)
    });
    this.instantdocument.addEventListener('mouseup' ,function (ev) {
        if (document.red)
            document.red.mouseupDocument(ev)
    });    
    this.instantdocument.addEventListener('contextmenu' ,function (ev) {
        if (document.red)
            document.red.getMainMenue(document.red.instantdocument.documentElement);
        event.stopPropagation();
        event.preventDefault();  
    });        
    
    this.attach(this.instantdocument.documentElement);
    
    this.needsave=false;
}


// привязка ко всем элементам
designer.prototype.attach = function(el){
    try{
        if (el==this.instantdocument.documentElement){
            el.oldoncick = el.oncick;
            el.onclick = function() {
                if (document.red){
                    if (!document.red.ctrlKey && !document.red.shiftKey)
                        document.red.clearSelections();
                    document.red.clickParented(document.red.instantdocument.documentElement);
                    dsutl.io.setCurrentDesigner(window);
                    document.red.show_property(document.documentElement);
                }
            };
        }
        else{
            if ((el.hasAttribute)  && (el.id!="") && (el.hasAttribute('isdesined'))) {
                var parentclass = el.parentNode.getAttribute('class');
                if (/*parentclass!='designer_selected'*/!parentclass 
                        || (parentclass && !parentclass.match('designer_selected'))) {
                el.oldoncick = el.oncick;
                el.onclick= function() {
                    if (el.hasAttribute('isgoupelement')){
                        if (document.red) document.red.clickCanParented(el, event);
                    }
                    else{
                        if (document.red) document.red.clickComponent(event);
                    }}
                };

                el.addEventListener('keyup', function() {
                    if (document.red) document.red.onmos();
                 });
                
                el.oldonmouseout = el.onmouseout;
                el.onmouseout = function() {
                    if (document.red) document.red.onmos();
                };
                el.oldonmouseup = el.onmouseup;
                el.onmouseup = function() {
                    if (document.red) document.red.onmos();
                };
                el.oldonmousedown = el.onmousedown;
                el.onmouseup = function() {
                    if (document.red) document.red.onmos();
                };                
                el.oldonmouseover = el.onmouseover;
                el.onmouseover = function() {
                    if (document.red) document.red.onmos();
                };
                el.oldonmousewheel = el.onmousewheel;
                el.onmousewheel = function() {
                    if (document.red) document.red.onmos();
                };
                
                el.onmousemove = undefined;
                el.onmousedown = undefined;
                el.onmouseup = undefined;
                el.oncontextmenu  = function () {
                     event.stopPropagation();
                     event.preventDefault();};

            }
        }        
    }
    catch(error){
        console.error('designer.prototype.attach error: ' + error);
    }
    for (var i=0;i<el.childNodes.length;i++){
        this.attach(el.childNodes[i]); 
    }
}


//  чтение документа источника
designer.prototype.getSourseDocument = function (){ 
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
        console.error('designer.prototype.getSourseDocument error: ' + error);
        this.sourseDocument = null;
    }
    return this.sourseDocument;
}



designer.prototype.getLightDocument = function (){ 
    try{
        this.lightDocument = libutil.dom.readDoc(this.instantdocument.URL);     
    }
    catch(error){
        console.error('designer.prototype.getLightDocument error: ' + error);
        this.lightDocument = null;
    }
    return this.lightDocument;   
}


designer.prototype.getLightElement = function (el){
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
designer.prototype.readXsltDocument = function(data){
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


designer.prototype.getTrasformDocument = function(){
    if (this.xsltProcessor && this.soursexslt)
        if (!this.trasformsourse)
            return this.trasformsourse = this.xsltProcessor.transformToDocument(this.sourseDocument);
        else
            return this.trasformsourse
    return undefined;
}



designer.prototype.getSourseElement = function(el){
    return el && el.id && this.sourseDocument ? 
    this.sourseDocument.getElementById(el.id) : null;
}

designer.prototype.getInstantElement = function(el){
    return el && el.hasAttribute('id') && this.instantdocument ? 
    this.instantdocument.getElementById(el.getAttribute('id')) : null;
}


designer.prototype.getTransformElement = function(elid){
    if (this.trasformsourse)
        this.getTrasformDocument();
    if (this.trasformsourse) {
        var el=this.sourseDocument.getElementById(elid);
        if (el){
            el=el.cloneNode(true);
            return this.getLightElement(el);
        }
    }
    return null;
}


designer.prototype.getTarget = function (ev){
  
    var el = ev.target.correspondingUseElement ? ev.target.correspondingUseElement : ev.target;   
    var owndoc = el.ownerDocument;   
    while ((el!=owndoc) && (!(el.getAttribute('id') && el.hasAttribute('isdesined'))))
        el=el.parentNode;

    return ((el==owndoc)) || (!el.getAttribute('id')) ? undefined : el;
}



designer.prototype.unicalIdGenerate = function(el, doc, newstr, templt) {
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

designer.prototype.unicalIdsGenerate  = function(el, newstr){
   if (!newstr) newstr={};
   var id = el.getAttribute('id');
   if (id && this.sourseDocument.getElementById(id)){
      var coneid=this.unicalIdGenerate(el, this.sourseDocument, newstr);
      newstr[coneid]=1;
      el.setAttribute('id',  coneid);}
      for (var ch=el.firstElementChild; ch; ch=ch.nextElementSibling){
          this.unicalIdsGenerate(ch, newstr);}
}



designer.prototype.getAttributeList = function(el) {
    if (el){
        return this.schema.getAttributeList(this.getSourseElement(el));
    }
    else
    {
        var result = [];
        var attrs = [];
        if (this.selectedElemens && this.selectedElemens.length>0){
            for (var j=0; j< this.selectedElemens.length; ++j){
                var attr = this.getAttributeList(this.selectedElemens[j].getElement());
                if (!attr) 
                    return null;
                attrs.push(attr);
            }
        }
        else{
            var attr = this.getAttributeList(this.instantdocument.documentElement); 
            if (attr) attrs.push(attr);
        }
            
       
        if (!attrs.length) 
            return null; 
        attr = attrs[0];
        for(var key in attr.attributes){
            var correct=true;
            if (attrs.length>1){
                for (var j=1; j< attrs.length; ++j){ 
                    if ((!attrs[j].attributes[key]) || (key=='id')){
                        correct=false;
                        break;
                    }
                }
            }
            
            if (correct)
                result.push(attr.attributes[key]);     
        }
    }
        
    return result;
};



designer.prototype.getAttributeValue = function(name, el){
    if (el){
        //console.log('designer.prototype.getAttributeValue',name)
        return this.getSourseElement(el) ? this.getSourseElement(el).getAttribute(name) : undefined;
    }  
    if ((!this.selectedElemens ) || (this.selectedElemens.length==0)) 
    {
        return this.getAttributeValue(name,this.instantdocument.documentElement);      
    }
    else
    {
        var sel = this.getSourseElement(this.selectedElemens[0].getElement());
        if (sel){
            var value=sel.getAttribute(name);
            value= value !=null ? value : undefined;
            if (this.selectedElemens.length>1){
                for (var j=1; j< this.selectedElemens.length; ++j){
                    var val=this.getAttributeValue(name, this.selectedElemens[j].getElement());
                    val= val !=null ? val : undefined;
                    if (value!=val)
                        return undefined;
                } 
            }
            return value!=undefined ? value : '';
        }
    }
return undefined;
}




designer.prototype.setAttributeValue = function(name, val, el){
    if (el){
        //console.log('designer.prototype.setAttributeValue',name , val)
        if (name=='id'){
            if (this.sourseDocument.getElementById(val))
                return;
        }
        var sel = this.getSourseElement(el);
        if ((!sel) && (!val)) return;
        sel.setAttribute( name, val);
        return;
    }
    if ((!this.selectedElemens ) || (this.selectedElemens.length==0)){
        this.setAttributeValue(name,val, this.instantdocument.documentElement, true);
        this.updateRoot();
    }
    else{
    for (var j=0; j< this.selectedElemens.length; ++j){
        this.setAttributeValue(name,val, this.selectedElemens[j].getElement(), true);
    }} 
}


designer.prototype.setProperty = function(nm, val){
    this.setAttributeValue(nm['name'],val);
    this.updateElement();
    this.setNeedSave();
    dsutl.toolwin.setMainWindowToolStatus(1);
    this.show_property();      
}    




designer.prototype.setSourseElementRect = function(x, y, width, height , el){
    if (el){
        this.setElementRect(x, y, width, height , this.getSourseElement(el));
        this.setNeedSave();
        return;
    }
    if ((this.selectedElemens ) || (this.selectedElemens.length>0)){  
        for (var j=0; j< this.selectedElemens.length; ++j)
            this.setSourseElementRect(x, y, width, height, this.selectedElemens[j].getElement());
    }
  
}

designer.prototype.getElementRect = function (el) {
    var rslt = {};
    var xnmame = dsutl.trslt.getXname(el);
    var ynmame = dsutl.trslt.getYname(el);
    var xmin = null;
    var ymax = null;
    var xmax = null;
    var ymin = null;
    if (xnmame) {
        switch (xnmame) {
            case 'd':
            {
                xmin = el.getBBox().x;
                break;
            }
            case 'transform':
            {
                xmin = parseFloat(dsutl.trslt.getXTranslate(el));
                break;
            }
            default:
            {
                xmin = parseFloat(el.getAttribute(xnmame));
            }
        }
    }
    if (ynmame) {
        switch (ynmame) {
            case 'd':
            {
                xmin = el.getBBox().y;
                break;
            }
            case 'transform':
            {
                ymin = parseFloat(dsutl.trslt.getYTranslate(el));
                break;
            }
            default:
            {
                ymin = parseFloat(el.getAttribute(ynmame));
            }
        }
    }
    var ww = el.getAttribute(dsutl.trslt.getWname(el));
    var hh = el.getAttribute(dsutl.trslt.getHname(el));
    var xmax = xmin + parseFloat((ww || ww == 0) ? ww : (el.getBBox? el.getBBox().width : undefined));
    var ymax = ymin + parseFloat((hh || hh == 0) ? hh : (el.getBBox ? el.getBBox().height : undefined));
    rslt['xmin'] = xmin;
    rslt['ymin'] = ymin;
    rslt['xmax'] = xmax;
    rslt['ymax'] = ymax;
    return rslt;
}

designer.prototype.getElementRectByInstance = function (el) {    
    var rslt = {};
    rslt['xmin'] = el.getBBox? el.getBBox().x : undefined;
    rslt['ymin'] = el.getBBox? el.getBBox().y : undefined;
    rslt['xmax'] = el.getBBox? (el.getBBox().x + el.getBBox().width) : undefined;
    rslt['ymax'] = el.getBBox? (el.getBBox().y + el.getBBox().height) : undefined;
    if (!rslt.xmin && !rslt.xmax && !rslt.ymin && !rslt.ymax)
        if (el.firstElementChild)
            rslt=this.getElementRectByInstance(el.firstElementChild);
    return rslt;
}

designer.prototype.selectElementsByDocRect = function (x1, y1, x2, y2) {
    //console.log('capture select event : ( ' + x1 + ', ' + y1 + ') , (' + x2 + ', ' + y2 + ') ');
    if (this.sourseDocument && this.sourseDocument.documentElement) {
        var el = this.sourseDocument.documentElement;
        for (var ch = el.firstElementChild; ch; ch = ch.nextElementSibling) {
            if (ch.hasAttribute('id')) {
                var ich = this.getInstantElement(ch);
                if (ich) {
                    var rct = this.getElementRectByInstance(ich);
                    //console.log('sel id: ' + ich.getAttribute('id') + " ( " + rct.xmin + "  " + rct.ymin + " ) ( " + rct.xmax + "  " + rct.ymax + " )");
                    if (((rct.xmin == 0 || rct.xmin) && (x1 <= rct.xmin)) && ((rct.ymin == 0 || rct.ymin) && (y1 <= rct.ymin)) &&
                            ((rct.xmax == 0 || rct.xmax) && (x2 >= rct.xmax)) && ((rct.ymax == 0 || rct.ymax) && (y2 >= rct.ymax))) {                      
                        this.selectComponent(ich, true, false);
                    }
                }
            }
        }
    }
}


designer.prototype.setElementRect = function(x, y, width, height , el){
    if (el){
        if (!el) return;
        var xn = dsutl.trslt.getXname(el);
        var yn = dsutl.trslt.getYname(el);
        var hn = dsutl.trslt.getHname(el);
        var wn = dsutl.trslt.getWname(el);
        if (x && xn){
            switch(xn){
            case 'd': {dsutl.trslt.setDXval( el, x);break;}
            case 'transform': {dsutl.trslt.setXTranslate( el, x);break;}
            default: {el.setAttribute( xn , x);}}}
        if (y && yn){
            switch(yn){
            case 'd': {dsutl.trslt.setDYval( el, y);break;}
            case 'transform': {dsutl.trslt.setYTranslate( el, y);break;}
            default: {el.setAttribute( yn , y);}}}
        if (width && wn)
            el.setAttribute( wn , width);
        if (height  && hn )
            el.setAttribute( hn, height);       
        return;
    } 
}

designer.prototype.changeSElementRect = function (x1, y1, x2, y2, el) {
    var sel = this.getSourseElement(el);
    if (sel) {
        if (x1 || x1 == 0)
            this.setElementRect(x1, undefined, undefined, undefined, sel);
        else if (y1 || y1 == 0)
            this.setElementRect(undefined, y1, undefined, undefined, sel);
        else if (x2 || x2 == 0) {
            var w=parseFloat(sel.getAttribute(dsutl.trslt.getWname(sel)));
            if (w || w==0)
                this.setElementRect(x2 - w , undefined, undefined, undefined, sel);
        }
        else if (y2 || y2 == 0) {
            var h=parseFloat(sel.getAttribute(dsutl.trslt.getHname(sel)));
            if (h || h==0)
                this.setElementRect(undefined, y2-h, undefined, undefined, sel);
        }
    }
}

designer.prototype.changeSCElementRect = function (x, y, el) {
    var sel = this.getSourseElement(el);
    var rct = this.getElementRectByInstance(el);
    if (!rct)
        return;
    var w = parseFloat(rct.xmax -rct.xmin);
    var h = parseFloat(rct.ymax -rct.ymin);               
    if (sel) {
         if (x || x == 0) {
            if (w || w==0)
                this.setElementRect(x - w / 2 , undefined, undefined, undefined, sel);
        }
        else if (y || y == 0) {
            if (h || h==0)
                this.setElementRect(undefined, y - h / 2, undefined, undefined, sel);
        }
    }
}



designer.prototype.changeSourseElementRect = function(x, y, width , height, el){
    var sel = this.getSourseElement(el);
    if (sel){
        this.changeElementRect(x, y, width , height, sel);
    }
}


designer.prototype.changeElementRect = function (x, y, width, height, el) {
    if (el) {
        var xnmame = dsutl.trslt.getXname(el);
        var ynmame = dsutl.trslt.getYname(el);
        var wnmame = dsutl.trslt.getWname(el);
        var hnmame = dsutl.trslt.getHname(el);        
        var xval = null;
        var yval = null;
        if (x && xnmame) {
            switch (xnmame) {
                case 'd':
                {
                    xval = (parseFloat(dsutl.trslt.getDXval(el)) + x);
                    break;
                }
                case 'transform':
                {
                    xval = (parseFloat(dsutl.trslt.getXTranslate(el)) + x);
                    break;
                }
                default:
                {
                    xval = (parseFloat(el.getAttribute(xnmame)) + x);
                }
            }
        }
        if (y && ynmame) {
            switch (ynmame) {
                case 'd':
                {
                    yval = (parseFloat(dsutl.trslt.getDYval(el)) + y);
                    break;
                }
                case 'transform':
                {
                    yval = (parseFloat(dsutl.trslt.getYTranslate(el)) + y);
                    break;
                }
                default:
                {
                    yval = (parseFloat(el.getAttribute(ynmame)) + y);
                }
            }
        }
        if (wnmame == 'x2' && hnmame == 'y2') {
            this.setElementRect(xval, yval,
                    parseFloat(el.getAttribute('x2')) + x,
                    parseFloat(el.getAttribute('y2')) + y, el);
        }
        else
            this.setElementRect(xval, yval,
                    (width && wnmame ? parseFloat(el.getAttribute(wnmame)) + width : width),
                    (height && hnmame ? parseFloat(el.getAttribute(hnmame)) + height : height), el);
    }

}


designer.prototype.extremeRects = function () {
    var rslt = {};
    for (var i = 0; i < this.selectedElemens.length; ++i) {
        var el = this.selectedElemens[i].getElement();
        //var el = this.getSourseElement(pel);
        var elrect = this.getElementRectByInstance(el);
        if ((rslt['xmin'] == undefined || rslt['xmin'] > elrect['xmin']) && (elrect['xmin'] != undefined))
            rslt['xmin'] = elrect['xmin'];
        if ((rslt['ymin'] == undefined || rslt['ymin'] > elrect['ymin']) && (elrect['ymin'] != undefined))
            rslt['ymin'] = elrect['ymin'];
        if ((rslt['xmax'] == undefined || rslt['xmax'] < elrect['xmax']) && (elrect['xmax'] != undefined))
            rslt['xmax'] = elrect['xmax'];
        if ((rslt['ymax'] == undefined || rslt['ymax'] < elrect['ymax']) && (elrect['ymax'] != undefined))
            rslt['ymax'] = elrect['ymax'];
    }
    return rslt;
}


designer.prototype.updateElement = function(el){
    if (el) {
        //console.log('designer.prototype.updateElement: '+el);
        var select = this.isSelection(el);
        var tel = this.getTransformElement(el.getAttribute('id'));
        var old = el.parentNode.replaceChild(tel ,el);
        this.attach(tel);
        if (select)
            this.repaceSelection(old, tel);
        return tel;
    }
    else{
        for (var j=0; j< this.selectedElemens.length; ++j)
            this.updateElement(this.selectedElemens[j].getElement(), true);
    }
   
}

designer.prototype.updateRoot = function(){
        var el = this.instantdocument.documentElement;
        var tel = this.sourseDocument.documentElement;
        if (tel.getAttribute('style')!=el.getAttribute('style'))
            el.setAttribute('style',tel.getAttribute('style'));
        if (tel.getAttribute('x')!=el.getAttribute('x'))
            el.setAttribute('x',tel.getAttribute('x'));
        if (tel.getAttribute('y')!=el.getAttribute('y'))
            el.setAttribute('y',tel.getAttribute('y'));
        if (tel.getAttribute('width')!=el.getAttribute('width'))
            el.setAttribute('width',tel.getAttribute('width'));
        if (tel.getAttribute('height')!=el.getAttribute('height'))
            el.setAttribute('height',tel.getAttribute('height'));
        if (tel.getAttribute('veiwBox')!=el.getAttribute('veiwBox'))
            el.setAttribute('veiwBox',tel.getAttribute('veiwBox'));    
        this.setNeedSave();        
          
}




designer.prototype.save = function(){
    if (this.sourseDocument){
        libutil.dom.writeDoc(this.sourseDocument);
        //libutil.dom.writeDoc(this.xsltProcessor.transformToDocument(this.instantdocument),'_output');
        this.needsave=false;
    }  
}


designer.prototype.deleteElements = function(el){
    if (el){        
        if (this.sourseDocument){
            var source = this.getSourseElement(el);
            if (source){
                el.parentNode.removeChild(el);
                source.parentNode.removeChild(source);
            }
        }
    }
    else{
        for (var j=0; j< this.selectedElemens.length; ++j)
            this.deleteElements(this.selectedElemens[j].getElement());
        this.clearSelection();

    }   
}

designer.prototype.cloneElements = function(el){
    if (el){
        if (this.sourseDocument){
            var source = this.getSourseElement(el);
            if (source){
                var el_c=source.cloneNode(true);
                var prnt = source.parentNode;
                this.unicalIdsGenerate(el_c);
                prnt.appendChild(el_c);
                //this.getTrasformDocument();
                var tel = this.getTransformElement(el_c.getAttribute('id'));
                var prntel = el.parentNode;
                prntel.appendChild(tel);
                this.attach(tel);
                this.changeSourseElementRect(10,10, null, null, tel);
                this.repaceSelection(el, tel);
                this.updateElement(tel);
                
            }
        }
    }
    else{
        for (var j=0; j< this.selectedElemens.length; ++j)  
            this.cloneElements(this.selectedElemens[j].getElement(), true);
 
    }   
}



designer.prototype.toFrontElements = function(el){
    if (el){
        var elprnt = el.parentNode;
        if (this.sourseDocument){
            var sel = this.getSourseElement(el);
            if (sel){
                var prnt = sel.parentNode;
                if (prnt.lastElementChild==sel)
                    return;                
                var cel=sel.cloneNode(true);
                prnt.removeChild(sel);
                prnt.appendChild(cel);
                var rem = elprnt.removeChild(el);
                elprnt.appendChild(rem);
                this.repaceSelection(el, rem);
            }
        }
    }
    else{       
        for (var j=0; j< this.selectedElemens.length; ++j)
            this.toFrontElements(this.selectedElemens[j].getElement());
    }   
}



designer.prototype.toBackElements = function(el){
    if (el){
        var elprnt = el.parentNode;
        if (this.sourseDocument){
            var sel = this.getSourseElement(el);
            if (sel){
                var prnt = sel.parentNode;
                if (prnt.firstElementChild==sel)
                    return;                
                var cel=sel.cloneNode(true);
                prnt.removeChild(sel);
                prnt.insertBefore(cel, prnt.firstElementChild);
                var rem = elprnt.removeChild(el);
                elprnt.insertBefore(rem, elprnt.firstElementChild);
                this.repaceSelection(el, rem);
            }
        }
    }
    else{       
        for (var j=0; j< this.selectedElemens.length; ++j) 
            this.toBackElements(this.selectedElemens[j].getElement());
    }   
}



designer.prototype.pastToClipBoard = function(clear){
    var tmp=$$global();
    tmp.clipboard=[];

    for (var i=0;i < this.selectedElemens.length;++i)
        if (this.selectedElemens[i].getElement()){
            var el = this.getSourseElement(this.selectedElemens[i].getElement());
            if (el)
                tmp.clipboard.push(el.cloneNode(true));
        }
    
    if (clear){
        for (var i=0;i < this.selectedElemens.length;++i)
            if (this.selectedElemens[i]){
                var prnt = this.selectedElemens[i].getElement().parentNode;
                var el = this.getSourseElement(this.selectedElemens[i].getElement());
                if (el){
                    var prnts = el.parentNode;
                    prnt.removeChild(this.selectedElemens[i].getElement());
                    prnts.removeChild(el);}
            }
       if (clear)     
            this.clearSelections();     
    }
}
        
        
designer.prototype.clearToClipBoard = function(){
    var tmp=$$global();
    tmp.clipboard=null;
} 
        
designer.prototype.getClipBoard = function(){
    var tmp=$$global();
    return tmp.clipboard;
}   

designer.prototype.copyFromClipBoard = function(rect , mpoint , prn){
    //console.log(rect,mpoint, prn)
    var tmp=$$global();
    var x = mpoint.x ? mpoint.x : 0;
    var y = mpoint.y ? mpoint.y : 0;
    var bnds = dsutl.trslt.getBoundElements(tmp.clipboard);
    x = x && bnds.x ? x - bnds.x : 0;
    y = y && bnds.y ? y - bnds.y : 0; 
    //console.log('x:' + x + 'y:' + y);
    if (tmp.clipboard && tmp.clipboard.length>0){
    this.clearSelections();
    
    for (var i=0;i < tmp.clipboard.length;++i){
        if (tmp.clipboard[i]){
            var bndsel = dsutl.trslt.getBoundElements([tmp.clipboard[i]]);
            //console.log('num:' + i + ' basis:' + bndsel);
            var rsltbnd = dsutl.trslt.inParentBoundElements( rect , bndsel.x ? bndsel.x + x : x, bndsel.y ? bndsel.y + y : y );
            //console.log('num:' + i + ' result:' + rsltbnd);
            var sel = this.createLibComponent(rsltbnd.x, rsltbnd.y, tmp.clipboard[i], prn);
        }}
     prn = prn !=  this.instantdocument.documentElement ?  this.updateElement(prn) : prn;}
    this.show_property();

}


designer.prototype.createLibComponent = function(x, y , created, prnt){
    if (created){
        
        var coneid=this.unicalIdGenerate(created , this.sourseDocument , null, created.localName);
        var sprnt = prnt ? this.getSourseElement(prnt) : this.sourseDocument.documentElement;
        prnt = prnt ? prnt : this.instantdocument.documentElement;
        var el =sprnt.appendChild(created.cloneNode(true)); 
        el.setAttribute('id',  coneid);
        this.setElementRect(x,y, null, null, el);        
        //this.getTrasformDocument();        
        var tel = this.getTransformElement(coneid);
        prnt.appendChild(tel);
        this.attach(tel);
        this.setSelection(tel);
        this.updateElement(tel);
        this.setNeedSave();
        return tel;
    }
    return false;
}



    
// обработчики событий   
 
/* empty*/
designer.prototype.onmos = function (){
    event.preventDefault();
    event.stopPropagation();
} 

designer.prototype.onmosnopropogate = function (){
    event.preventDefault();
} 

designer.prototype.clickComponent = function(){
    if (this.afterremove){
        this.afterremove=undefined;
        event.stopPropagation();
        return;
    }  
    var el= this.getTarget(event);
    dsutl.io.setCurrentDesigner(window);
    this.selectComponent(el, event.shiftKey, event.ctrlKey);
    event.stopPropagation();
}

designer.prototype.clickCanParented = function(el, ev){
    var box = el.getBBox ? el.getBBox() : null;
    //console.log(box);
    if (!(((!this.isSelection(el))) || (!box) || (!this.isNeedInsert(el)))) {
        el = this.updateElement(el);
        if (this.newLibComponent((ev.pageX - box.x).toString(), (ev.pageY - box.y).toString(), el)) {
            el = this.updateElement(el);
            event.stopPropagation();
            return false;}}

    if (document.red) document.red.clickComponent(ev); 
    event.stopPropagation();
    return false;
}

designer.prototype.clickParented = function(prnt){
    if (event && event.pageX.toString() && event.pageY.toString())
        this.newLibComponent(event.pageX.toString(), event.pageY.toString(), prnt);
}

designer.prototype.newLibComponent = function(x, y , prnt){
    if (prnt){     
        var created = dsutl.toolwin.getSelectedComponent();
        if (created && x && y){
            this.clearSelections();
            this.createLibComponent(x, y, created, prnt);
            this.show_property();
            dsutl.toolwin.clearSelectedComponent();
            return true;
        }
    }
return false;
}



//  Выбор компонента на форме


designer.prototype.isSelection = function(el){
    if (el && this.selectedElemens) {
        for (var j=0; j< this.selectedElemens.length; ++j)
            if (this.selectedElemens[j].getElement()==el) return true;
    }
    return false;        
}


designer.prototype.isSelectionParent = function(el){
    if (el && this.selectedElemens) {
        for (var j=0; j< this.selectedElemens.length; ++j)
            if (this.selectedElemens[j].getElement().parentNode==el.parentNode) 
                return false;
    }
    return true;        
}

designer.prototype.selectionCount = function(){
    if (!this.selectedElemens) this.selectedElemens=[];
    return this.selectedElemens && this.selectedElemens.length > 0;        
}

designer.prototype.setSelection = function(el){
    if (this.selectedElemens==null)
        this.selectedElemens = [];
    this.selectedElemens.push( new dsutl.selectwraper(el));
}

// очистка выделения элемента
designer.prototype.clearSelection = function(el){
    if (this.selectedElemens!=null)
        for (var i=0;i < this.selectedElemens.length;++i)
            if (this.selectedElemens[i].getElement()==el){
                this.selectedElemens[i].deselect();
                this.selectedElemens.splice(i,1);
                break;
            }
}

designer.prototype.repaceSelection = function(old, newel){
    if (this.selectedElemens!=null)
        for (var i=0;i < this.selectedElemens.length;++i)
            if (this.selectedElemens[i].getElement()==old){
                this.selectedElemens[i].deselect();
                this.selectedElemens[i]=new dsutl.selectwraper(newel)
            }         
}


// очистка всех выделенных элементов
designer.prototype.clearSelections = function (){
    if (this.selectedElemens!=null){
        for (var i=0;i < this.selectedElemens.length;++i){
            this.selectedElemens[i].deselect();
        };
       this.selectedElemens=[]; 
    }
    if (event)
        event.stopPropagation();
}



/*выделение элемента*/
designer.prototype.selectComponent = function(el, shift, ctnrl){
    if (this.selectedElemens==null)
        this.selectedElemens = [];
    
    //console.log('designer.prototype.selectComponent');
      
    if (this.isSelectionParent(el))
        this.clearSelections();
    
    if (!shift){
        this.clearSelections();
        this.setSelection(el);
        
    }
    else{
        if (this.isSelection(el)){
            this.clearSelection(el);
        }
        else{
            this.setSelection(el);          
        }
    }
    this.show_property();
}

designer.prototype.isNeedInsert = function (el){
    return (dsutl.toolwin.getSelectedComponent() && el.hasAttribute('isgoupelement'));
}


/*обработчик событий клавиатуры*/
designer.prototype.keybordDispatcherdUp = function (){
    
    this.moveElements(event);
    
    this.shiftKey=event.shiftKey;
    this.ctrlKey=event.ctrlKey;    

    if ((event.keyCode==82) && (event.shiftKey)) {
        window.location.reload();
        event.stopPropagation();
        event.preventDefault();
        return;
    }

    this.show_property();
    event.stopPropagation();
    
}

/*обработчик событий клавиатуры*/
designer.prototype.keybordDispatcherdDown = function (){
    this.shiftKey=event.shiftKey;
    this.ctrlKey=event.ctrlKey;       
}

designer.prototype.moveElements = function (event) {

    if (!event.ctrlKey && !event.shiftKey && !event.altKey)
        return;
    if (event.keyIdentifier != 'Left' && event.keyIdentifier != 'Right' && event.keyIdentifier != 'Down' && event.keyIdentifier != 'Up')
        return;
    if (!this.selectedElemens)
        return;
    if (this.selectedElemens.length == 0)
        return;

    var incr = /*event.altKey ? 10 :*/ 1;

    var isresize = false;
    var extr_rect = undefined;

    if (this.selectedElemens.length > 1)
        extr_rect = this.extremeRects();


    for (var i = 0; i < this.selectedElemens.length; ++i) {

        var el = this.selectedElemens[i].getElement();
        if (event.shiftKey && !event.ctrlKey) {
            switch (event.keyIdentifier) {
                case 'Left':
                {
                    this.changeSourseElementRect(-incr, null, null, null, el);
                    this.selectedElemens[i].shiftRect(-incr, null);
                    isresize = true;
                    break;
                }
                case 'Right':
                {
                    this.changeSourseElementRect(incr, null, null, null, el);
                    this.selectedElemens[i].shiftRect(incr, null);
                    isresize = true;
                    break;
                }
                case 'Up':
                {
                    this.changeSourseElementRect(null, -incr, null, null, el);
                    this.selectedElemens[i].shiftRect(null, -incr);
                    isresize = true;
                    break;
                }
                case 'Down':
                {
                    this.changeSourseElementRect(null, +incr, null, null, el);
                    this.selectedElemens[i].shiftRect(null, incr);
                    isresize = true;
                    break;
                }
            }
        }
        else if (event.shiftKey && event.ctrlKey && !event.altKey) {
            if (extr_rect) {
                switch (event.keyIdentifier) {
                    case 'Left':
                    {
                        this.changeSElementRect(extr_rect.xmin, null, null, null, el);
                        isresize = true;
                        break;
                    }
                    case 'Right':
                    {
                        this.changeSElementRect(null, null, extr_rect.xmax, null, el);
                        isresize = true;
                        break;
                    }
                    case 'Up':
                    {
                        this.changeSElementRect(null, extr_rect.ymin, null, null, el);
                        isresize = true;
                        break;
                    }
                    case 'Down':
                    {
                        this.changeSElementRect(null, null, null, extr_rect.ymax, el);
                        isresize = true;
                        break;
                    }
                }
            }
        }
        else if (!event.shiftKey && event.ctrlKey && event.altKey) {
            switch (event.keyIdentifier) {
                /*case 'Left':{
                 this.changeSourseElementRect(null, null, - incr, null, el);
                 isresize=true;
                 break;
                 }
                 case 'Right':{
                 this.changeSourseElementRect(null, null, + incr, null, el);
                 isresize=true;
                 break;
                 }   
                 case 'Up':{
                 this.changeSourseElementRect(null,  null, null, - incr,  el);
                 isresize=true;
                 break;
                 }
                 case 'Down':{
                 this.changeSourseElementRect(null,  null, null, + incr,  el);
                 isresize=true;
                 break;
                 }*/
                case 'Left':
                case 'Right':
                {
                    if (extr_rect) {
                        this.changeSCElementRect((extr_rect.xmin + extr_rect.xmax) / 2, null, el);
                        isresize = true;
                    }
                    break;
                }
                case 'Up':
                case 'Down':
                {
                    if (extr_rect) {
                        this.changeSCElementRect(null, (extr_rect.ymin + extr_rect.ymax) / 2, el);
                        isresize = true;
                    }
                    break;
                }
            }
        }


    }

    if (isresize)
        this.updateElement();


}



designer.prototype.mousemoveDocument = function (){
    if ((this.dragstartevent && this.draggedstart)){
        if (this.mousmoveevent){
            var xsh=event.pageX-this.mousmoveevent.pageX;
            var ysh=event.pageY-this.mousmoveevent.pageY;
            if (this.selectedElemens) {
                for (var i=0;i < this.selectedElemens.length;++i){
                    this.selectedElemens[i].shiftRect(xsh, ysh);
                }}           
        }
    }
    this.mousmoveevent=event;
}



designer.prototype.mousedownDocument = function () {
    if (this.draggedstart) {
        if ((event.button == 0) && (this.isSelection(this.getTarget(event)))) {
            this.dragstartevent = event;
            event.stopPropagation();
            return;
        }
    }
    else if ((event.button == 0) /*&& (this.ctrlKey || this.shiftKey)*/ && (!this.selectedstart)) {
        this.selectedstart = event;
        event.stopPropagation();
        return;
    }
this.draggedstart=undefined;
this.selectedstart=undefined;
this.dragstartevent = undefined;
this.mousmoveevent=undefined;
}



designer.prototype.mouseupDocument = function (){
    if (event.button==0 && this.draggedstart){
        if (this.mousmoveevent){
            var xsh=event.pageX-this.mousmoveevent.pageX;
            var ysh=event.pageY-this.mousmoveevent.pageY;
            if (this.dragstartevent){ 
                //console.log('capture mouseupDocument');
                var sxsh=event.pageX-this.dragstartevent.pageX;
                var sysh=event.pageY-this.dragstartevent.pageY;
                if (this.selectedElemens && sxsh && sysh) {
                    for (var i=0;i < this.selectedElemens.length;++i){
                        var el = this.selectedElemens[i].getElement();
                        this.changeSourseElementRect( sxsh, sysh , null, null,  el);
                        this.selectedElemens[i].shiftRect(xsh, ysh);}                                     
                    this.setNeedSave();
                    //console.log('this.afterremove=true');
                    this.afterremove=true;
                    this.show_property(); 
                }
                                
                event.stopPropagation();
            }
        }
    }
    else if (event.button==0 && this.selectedstart){ 
        this.selectElementsByDocRect(this.selectedstart.pageX <  event.pageX ? this.selectedstart.pageX : event.pageX, 
                                                                 this.selectedstart.pageY < event.pageY ? this.selectedstart.pageY : event.pageY , 
                                                                 event.pageX > this.selectedstart.pageX ? event.pageX : this.selectedstart.pageX, 
                                                                 event.pageY > this.selectedstart.pageY ? event.pageY : this.selectedstart.pageY);
        event.stopPropagation();
    }
    this.draggedstart=undefined;
    this.selectedstart=undefined;    
    this.dragstartevent = undefined;
    this.mousmoveevent=undefined;

}




designer.prototype.mousedownComponent = function (){
    if ((event.button==0)){
        var trgt = this.getTarget(event)
        if ((this.isSelection(trgt)) && (!this.isNeedInsert(trgt))){
            this.draggedstart=true;
            return;
        }
    }
    event.stopPropagation();
    this.selectedstart=undefined;
    this.draggedstart=undefined; 
}


designer.prototype.getRootScript = function (){
   var doc = this.sourseDocument;
   if (dsutl.script.getScript(doc, 'rootscript',
                  function (val){
                      var ind=val.search(/\nif\s\(\(window\.\$\$editable\)\&\&\(\!window\.\$\$editable\(\)\)\)\{\n/);
                      if (ind!=-1) val=val.substring(51);
                      return (val.length>3) ? val.substring(0, val.length-4) : '';},
                      '\nif ((window.$$editable)&&(!window.$$editable())){\n',
                      '\n};\n'))
       this.setNeedSave();
       event.preventDefault();
       event.stopPropagation();
   
}




// Script

dsutl.script.getScript = function (doc,name, func, start ,stop){
   if (!doc) return null;
   var script = doc.getElementById(name) ? doc.getElementById(name).textContent : '';
   script = func(script);
   var retval = dsutl.script.scriptdialog('script', script);
   if (retval && (retval.value || retval.value=='') && (retval.value!=script)) { 
          dsutl.script.setScript(doc, name,retval.value, start, stop);
          return true;}
   return false;   
}

dsutl.script.setScript = function (doc, name, val , start ,stop){
   if (!doc) return;
   var rootscriptel = doc.getElementById(name);
   if (!rootscriptel){
       var scriptel = doc.createElement('script');
       scriptel.setAttribute('type', "text/javascript");
       scriptel.setAttribute('id', name);
       doc.documentElement.insertBefore(scriptel, doc.documentElement.firstElementChild);
       rootscriptel = doc.getElementById(name);
   }
   if (rootscriptel){
    var selfscript =doc.createCDATASection(start+
           val.toString()+''+
           stop);
   libutil.dom.clearChildNode(rootscriptel);    
   rootscriptel.appendChild(selfscript); 
}
   else{
       console.error(" Root Script didn't  save");
   }
}



// StartScript


dsutl.script.getStartScript = function (){
   var doc = libutil.global.getStartupDoc();
   if (dsutl.script.getScript(doc, 'startscript',
                  function (val){
                      var ind=val.search(/\nif\s\(\(window\.\$\$editable\)\&\&\(\!window\.\$\$editable\(\)\)\)\{\n/);
                      if (ind!=-1) val=val.substring(51);
                      return (val.length>3) ? val.substring(0, val.length-4) : '';},
                      '\nif ((window.$$editable)&&(!window.$$editable())){\n',
                      '\n};\n'))
       libutil.dom.writeDoc(doc);
       event.preventDefault();
       event.stopPropagation();
}


// StopScript


dsutl.script.getStopScript = function (){
   var doc = libutil.global.getStartupDoc();
   if (dsutl.script.getScript(doc, 'stopscript',
                  function (val){
                      var ind=val.search(/\nfunction ___global___unload\(\)\{\n/);
                      if (ind!=-1) val=val.substring(32);
                      return (val.length>3) ? val.substring(0, val.length-4) : '';},
                      '\nfunction ___global___unload(){\n',
                      '\n};\n'))
       libutil.dom.writeDoc(doc);
       event.preventDefault();
       event.stopPropagation();
}



// FileScript

dsutl.script.getFileScriptData = function (path){
if (path)
var doc = libutil.dom.readDoc(path,true);
return doc ? doc : null;    
}

dsutl.script.getFileScript = function (file){
    var prjpath=window.$$global ?  window.$$global().projectPath : null;
    if (prjpath && file){
        var path = prjpath.toString() + file;
        var data = dsutl.script.getFileScriptData(path);
        if (data || data==''){
            var retval = dsutl.script.scriptdialog('script :'+ file, data);
            if (retval && (retval.value || retval.value=='') && (retval.value!=data)) {
                if (retval.value=='') retval.value==' ';
                $$writefile(path,retval.value)
                return true;
            }                  
        }
    }
    console.error('File script change error')
    return false;
}

dsutl.script.newscript = function(file, exists){
    var prjpath=window.$$global ?  window.$$global().projectPath : null;
    if (file.length>4){
        var fileext=file.substring(file.length-3);
        if (fileext=='.js'){
            var txt = '/*    */';
            if (libutil.project.insertXSLTScriptList(file)){
               console.log(prjpath.toString()+file);
               if (!exists && prjpath) 
                   $$writefile(prjpath.toString()+file,txt); 
               return true;}
        }
    }
    alert('Script did not create');
    return false;
}

dsutl.script.remove = function(file){
    if (confirm('Удалить скрипт "'+file+'" из проекта?')){
    if (file.length>4){
        var fileext=file.substring(file.length-3);
        if (fileext=='.js'){
            if (libutil.project.removeXSLTScriptList(file)){
               return true;}
        }
    }}
    alert('Script did not delete');
    return false;
}


dsutl.script.add = function (exists){
    var openfile= prompt('Введите имя файла','');
    if (!openfile || openfile=='') return;          
    if (!libutil.regex.check(openfile,/[A-Za-z][A-Za-z0-9]*[\.js]?/)){
        alert('Имя файла '+openfile+' некорректно!');
        return;
    }    
    if (!libutil.regex.check(openfile,/[A-Za-z][A-Za-z0-9]*\.js/)){
        openfile = openfile+ '.js';
    }
    var openddoc = libutil.dom.readDoc(openfile, true);
    if (openddoc && !exists){
        alert('Документ '+openfile+' уже существует!!');
        return;
    }
    if (exists && !openddoc){
        alert('Документ '+openfile+' не существует!!');
        return;        
    }
    dsutl.script.newscript(openfile, exists);
}


dsutl.script.scriptdialog = function(name, value){
    return libutil.window.create_modal('../web-utils/html/javascriptdialog.html',name , value, '0%', '0%', '100%', '100%', '0', '0');       
}  


// контекстное меню


designer.prototype.getMainMenue = function(){
    if (!this.___maimenue){
        var items =[{name : 'Bring to Front',
                     id : 'bringtofront',
                     active : function(){return document.red.selectionCount() ? '' : 'disable';},
                     func : function(){
                                  document.red.toFrontElements();
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}},
                    {name : 'Send to Back',
                     id : 'sendtoback',
                     active : function(){return document.red.selectionCount() ? '' : 'disable'},
                     func : function(){
                                  document.red.toBackElements();
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}},  
                    {name : 'Delete',
                     id : 'delete',
                     active : function(){return document.red.selectionCount() ? '' : 'disable'},
                     func : function(){
                                  document.red.deleteElements();
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}}, 
 
                    {name : 'Clone',
                     id : 'clone',
                     active : function(){return document.red.selectionCount() ? '' : 'disable'},
                     func : function(){
                                  document.red.cloneElements();
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}}, 
        
                    {name : 'Copy',
                     id : 'copy',
                     active : function(){return document.red.selectionCount() ? '' : 'disable'},
                     func : function(){
                                  document.red.pastToClipBoard();
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}}, 

                    {name : 'Cut',
                     id : 'cut',
                     active : function(){return document.red.selectionCount() ? '' : 'disable'},
                     func : function(){
                                  document.red.pastToClipBoard(true);
                                  document.red.hideMainMenue();
                                  document.red.setNeedSave();
                                  event.stopPropagation();}},
     
                    {name : 'Past',
                     id : 'past',
                     active : function(){return document.red.getClipBoard() ? '' : 'disable'},
                     func : function(){
                                if (document.red.selectionCount()>1){
                                   document.red.hideMainMenue();                                 
                                   event.stopPropagation();
                                }
                                if (document.red.selectionCount()==0){
                                   var trgt = document.red.instantdocument.documentElement;
                                }
                                else {
                                    var trgt = document.red.selectedElemens[0].getElement();
                                }                               


                                 var tmp=$$global();
                                 if (tmp  && tmp.clipboard && tmp.clipboard.length>0){
                                 var prn= trgt ? (trgt.hasAttribute('isgoupelement') ? trgt : document.red.instantdocument.documentElement )
                                   : document.red.instantdocument.documentElement;
                                 prn = prn !=  document.red.instantdocument.documentElement ?  document.red.updateElement(prn) : prn;           
                                 //var rect = libutil.geometry.boundrect(prn);
                                 if (prn == document.red.instantdocument.documentElement){
                                      var boxs = prn  && prn.getClientRects ? prn.getClientRects() : null;
                                      var box = boxs && boxs.length ? boxs[0] : null;
                                      var rect = box ? {x : box.top , y : box.left , w : box.width , h : box.height} : null;}
                                 else{
                                      var box = libutil.geometry.boundrect(prn);
                                      var rect = box ? {x : box.x , y : box.y , w : box.width , h : box.height} : null;}
                                 if (rect && event){
                                      var mx = document.red.___maimenue.body.getBoundingClientRect().left - rect.x;
                                      var my = document.red.___maimenue.body.getBoundingClientRect().top - rect.y; 
                                      var mpoint = {x : mx , y : my};
                                      rect = {w : rect.w  , h : rect.h , x : 0 , y : 0};
                                      document.red.copyFromClipBoard(rect , mpoint , prn);}}
                                 document.red.setNeedSave();
                                 document.red.hideMainMenue();                                 
                                 event.stopPropagation();}},
                     {name : 'Script',
                      id : 'script',
                      active : function(){return '';},
                      func: function(){
                                 document.red.hideMainMenue();
                                 document.red.getRootScript();
                                 event.stopPropagation();}},
                     {name : 'StartScript',
                      id : 'startscript',
                      active : function(){return '';},
                      func : function(){
                                 document.red.hideMainMenue();
                                 dsutl.script.getStartScript();
                                 event.stopPropagation();}},
                     {name : 'StopScript',
                      id : 'stopscript',
                      active : function(){return '';},
                      func : function(){
                                 document.red.hideMainMenue();
                                 dsutl.script.getStopScript();
                                 event.stopPropagation();}}];        

        this.___maimenue = new dsutl.menue(items);}

    
        var el = event.target;
        var isRoot=(el==this.instantdocument.documentElement);

        if (!isRoot){
            el= this.getTarget(event);
            if (!el) return;
        }
        this.showMainMenue(event.pageX, event.pageY, el);

}


designer.prototype.showMainMenue = function(x, y,  trgt){
    if (this.___maimenue){
        this.___maimenue.hide();
        this.___maimenue.check();
        this.___maimenue.show(x, y,  trgt);}    
}

designer.prototype.hideMainMenue = function(){
    if (this.___maimenue)
        this.___maimenue.hide();    
}



// Инспектор объектов


designer.prototype.show_property = function(){
    
    
    var attriblist=this.getAttributeList();


    this.inspectorFrame=dsutl.toolwin.getObjectInspector();
    if (!this.inspectorFrame) return;
    this.inspectortbody=dsutl.toolwin.getObjectInspectorTbody();
    
    libutil.dom.clearChildNode(this.inspectortbody);   

    var trh= libutil.html.create_element('tr' ,this.inspectortbody);

            
    var th1= libutil.html.create_element('th', trh);
    th1.setAttribute('width','20%');
    th1.innerHTML='Attribute';
            
    var th2= libutil.html.create_element('th', trh);
    th2.setAttribute('width','80%');
    th2.innerHTML='Value';

                            
    for (var i=0; i<attriblist.length; ++i ){
        
        var tr= libutil.html.create_element('tr' , this.inspectortbody);
       
        var td1= libutil.html.create_element('td', tr);
        td1.innerHTML=attriblist[i]['name'];
        
        var typenm= attriblist[i]['typename'];
        td1.className= (typenm=='lib:expression') ? 'staticexpr' : 
            ((typenm=='lib:taglist') ? 'statictaglist' :
            ((typenm=='lib:tag') ? 'statictag' :
            ((typenm=='lib:event') ? 'staticevent' :'static' )));
   
        var td2= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0;'} ] );
        var val=this.getAttributeValue(attriblist[i]['name']);
        
        td2.innerHTML= val ? val : "";
        
        if (val==undefined)
            td2.className='diffvalue';
        
        td2.type=(!attriblist[i]['type']) ? 0 : (attriblist[i]['type']['type'] ? attriblist[i]['type']['type'] : 0) ;
        td2.regex=(!attriblist[i]['type']) ? null : (attriblist[i]['type']['regex'] ? attriblist[i]['type']['type'] : null) ;
        td2.list=(!attriblist[i]['type']) ? null : (attriblist[i]['type']['list'] ? attriblist[i]['type']['list'] : null) ;
        td2.validator = this.attribute_validator(val, attriblist[i], td2) ;
        
        if (td2.validator) {
            if (attriblist[i]['type']['validator'] == 'libutil.validator.expresssion')
                libutil.validator.expresssion(val, td2);
            if (attriblist[i]['type']['validator'] == 'libutil.validator.taglist')
                libutil.validator.taglist(val, td2);
            if (attriblist[i]['type']['validator'] == 'libutil.validator.tag')
                libutil.validator.tag(val, td2);
        }
                 
         
        td2.onclick=function(ev) {
            if (document.red) document.red.property_row_focus(ev);
        }
        td2.prop_dvn=attriblist[i];


    }
}

designer.prototype.attribute_validator = function(val, attr, el){
  if (!attr['type']) return null;
  if (attr['type']['validator']=='libutil.validator.expresssion')  
            return function(){libutil.validator.expresssion(val, el); };
  if (attr['type']['validator']=='libutil.validator.taglist')  
            return function(){libutil.validator.taglist(val, el); };   
  if (attr['type']['validator']=='libutil.validator.tag')  
            return function(){libutil.validator.tag(val, el); };          
  return null;          
}

designer.prototype.attribute_editor = function(el){
    if (!this.inspectorFrame){
        this.show_property(el);
    }
}

designer.prototype.replace_esc = function(value){
    var nxt =value.replace('&amp;','&');
    while (value!==nxt){
        value=nxt;
        nxt =value.replace('&amp;','&');
    }
    return value;
}

designer.prototype.property_row_focus = function(event){
    
    if (event.target.tagname="td"){
        var td= event.target;
        var value=event.target.innerHTML;
        value=this.replace_esc(value);
        
        var type = td['type'] ? td['type']  : 0;
        
        if (type<=2 && event.button>0){           
            var retval = dsutl.toolwin.propertydialog(td['name'], value);
            if (retval && retval.value) 
                this.setProperty(td.prop_dvn,retval.value);
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        
        switch (type){
            
            case 0:
            case 1:{
                libutil.dom.clearChildNode(td);
                var txtedit = libutil.html.create_input(td, 'text', value);
                if (td.validator){
                    txtedit.className= dsutl.toolwin.validate_to_class(td.validator(txtedit.value));
                    txtedit.validator=td.validator;
                    txtedit.oninput= function(){
                       txtedit.className= dsutl.toolwin.validate_to_class(txtedit.validator(txtedit.value)) 
                    }    
                    }
                break;
            }
            case 2:
            case 3:{
              
                var list=td['list'];
                libutil.dom.clearChildNode(td);        
                libutil.html.create_select(td,'text',value,list,type==3)       
                break;
            }
            default:{
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
   
        var edit=event.target.firstElementChild;
        edit.focus();
        edit.oldval=value;
        document.red.property_event(edit);

    
        if (type==3){           
            edit.onchange= function(event){
                var el=event.srcElement;
                if (el.value=='...'){
                    var code = '<input xmlns="http://www.w3.org/1999/xhtml" type="text" value=""></input>';
                    el.onblur=null;
                    var parent=el.parentNode;
                    parent.innerHTML=code;
                    var edit=parent.firstElementChild;
                    edit.focus();
                    edit.oldval=value;                    
                    if (document.red) 
                        document.red.property_event(edit);                         
                    event.preventDefault();
                    event.stopPropagation();
                }
            }        
        }
     
    }
    event.preventDefault();
    event.stopPropagation();   
}


designer.prototype.property_event = function(el){
    
    el.onblur= function() {
        var element =el;
        //console.log('designer.prototype.property_event blur', element)
        if (document.red) document.red.property_leave_focus(element);
    }
    el.addEventListener( 'keyup' ,function (ev) {
        var element =el;
        //console.log('designer.prototype.property_event key', element)
        if ((ev.keyIdentifier=="Enter"))
            document.red.property_leave_focus(element);
        else 
            ev.stopPropagation();
    });    
}


designer.prototype.property_leave_focus = function(el){
    //console.log('property_leave_focus', el)
    var oldval=el.oldval;
    var value =el.value;
    var td=el.parentNode;
    td.removeChild(el);
    td.innerHTML=value;
    if (oldval!=value){
        this.setProperty(td.prop_dvn,value);
    }
    event.stopPropagation();
    //event.stopPropagation();   
}


designer.prototype.setNeedSave = function(){
    this.needsave=true; 
    dsutl.toolwin.setMainWindowToolStatus(1);
}

/*

    Selector wraper

*/



dsutl.selectwraper = function(el){
    this.element = el;
    this.document= el.ownerDocument;
    this.designer= this.document.red;
    this.parent = el.parentNode;
    this.select();
}

dsutl.selectwraper.prototype.getElement = function(){
    return this.element;
}

dsutl.selectwraper.prototype.getDocument = function(){
    return this.document;
}

dsutl.selectwraper.prototype.getParent = function(){
    return this.parent;
}

dsutl.selectwraper.prototype.select = function(){
    
    if (dsutl.SELECT_MODE){ 
        this.selement = this.document.createElementNS(libutil.SVG_NAMESPACE_URL, 'g');    
        this.selement.appendChild(this.parent.replaceChild( this.selement , this.element));}
    else{
        this.selement = this.element;
        this.oldclass=this.selement.getAttribute('class');
    }
    
    //this.hlselement =
    //this.initHighLight();
    
    var cls =this.selement.getAttribute('class');
    this.selement.setAttribute('class', cls ? (cls+' designer_selected') : 'designer_selected');
    this.selement.designer=this.designer;

    this.selement.onmousemove = function() {
        if (this.designer) this.designer.mousemoveDocument();
    };
    this.selement.onmousedown = function() {
        if (this.designer) this.designer.mousedownComponent();
    };
    this.selement.onmouseup = function() {
        if (this.designer) this.designer.mouseupDocument();
    };
    this.selement.oncontextmenu = function() {
        if (this.designer) {
            if (this.designer.isSelection(this.designer.getTarget(event)))
                this.designer.getMainMenue(this.designer.getTarget(event));
            event.preventDefault();
            event.stopPropagation();
        }
    };
}



dsutl.selectwraper.prototype.deselect = function(){
    if (this.selement){
        if (!dsutl.SELECT_MODE)
            this.selement.setAttribute('class', this.oldclass ? this.oldclass : '');
        
     if (dsutl.SELECT_MODE){       
       this.selement.removeChild(this.element); 
       this.parent.replaceChild(this.element,this.selement);
       if (this.designer)
           this.designer.updateElement(this.element);}
       
       this.selement.onmousemove = undefined;
       this.selement.onmousedown = undefined;
       this.selement.onmouseup = undefined;
       this.selement.oncontextmenu  = function () {
                     event.stopPropagation();
                     event.preventDefault();};
       
    } 
}

dsutl.selectwraper.prototype.shiftRect = function(x, y){
        dsutl.trslt.setShiftXYTranslate(this.selement, x , y);
}



//  translateutol

dsutl.trslt.getXname =  function (el){
    if (el.hasAttribute('x')) return 'x';
    if (el.hasAttribute('cx')) return 'cx';
    if (el.hasAttribute('d')) return 'd';
    if (el.hasAttribute('x1')) return 'x1';
    if (el.hasAttribute('transform')) return 'transform';
    return null;
}

dsutl.trslt.getYname =  function (el){
    if (el.hasAttribute('y')) return 'y';
    if (el.hasAttribute('cy')) return 'cy';
    if (el.hasAttribute('d')) return 'd';
    if (el.hasAttribute('y1')) return 'y1';
    if (el.hasAttribute('transform')) return 'transform';
    return null;
}

dsutl.trslt.getWname =  function (el){
    if (el.hasAttribute('width')) return 'width';
    if (el.hasAttribute('x2')) return 'x2';    
    return null;
}

dsutl.trslt.getHname =  function (el){
    if (el.hasAttribute('height')) return 'height';
    if (el.hasAttribute('y2')) return 'y2';        
    return null;
}


dsutl.trslt.getTmpTranslate =  function (el){
    if (el.hasAttribute('transform')){
        var attr = el.getAttribute('transform');
        if (attr){
            var matchstr = attr.match(/\s*translate\s*\(\s*\-?[0-9\.]+\s*\,\s*\-?[0-9\.]+\s*\)\s*/);
            if (matchstr && matchstr.length==1){
                return attr;
            }
            else{
                return 'translate(0,0) '+attr; 
        }
    }}
    return null;
}




dsutl.trslt.getinfoXTranslate =  function (el){
    var traslateattr = dsutl.trslt.getTmpTranslate(el);
    if (traslateattr){
        try{
        var traslateattr_xmatch =traslateattr.match(/(?:\s*translate\s*\(\s*)/);
        if (traslateattr_xmatch && traslateattr_xmatch.length==1){
            var strt = traslateattr_xmatch[0];
            var rest = traslateattr.substring(strt.length);
            traslateattr_xmatch =rest.match(/(?:\-?[0-9\.]+)/);
            if (traslateattr_xmatch && traslateattr_xmatch.length==1){
                var midle = traslateattr_xmatch[0];
                var stp = rest.substring(midle.length);
                return{
                    'start' : strt,
                    'x' : midle,
                    'stop' : stp}
        }}}
        catch(error){
           console.error('dsutl.trslt.getinfoXTranslate: ' + error);
        }    
    }
    return null;
}

dsutl.trslt.getXTranslate =  function (el){
    var info = dsutl.trslt.getinfoXTranslate(el);
    //console.log(info);
    if (info){
        return parseFloat(info.x);
    }
    return null;
}

dsutl.trslt.setXTranslate =  function (el, x){
    var info = dsutl.trslt.getinfoXTranslate(el);
    if (info){
        el.setAttribute('transform', info.start + x  + info.stop);
    }
}

dsutl.trslt.setShiftXTranslate =  function (el , x){
    if ((x==null) || (x==undefined) || (x==0)) return;
    var info = dsutl.trslt.getinfoXTranslate(el);
    if (info){
        el.setAttribute('transform', info.start + (x + parseFloat(info.x)).toString() + info.stop);       
    }
    else{
        el.setAttribute('transform', 'translate('+x.toString() + ',0)');
    }
}

dsutl.trslt.getinfoYTranslate =  function (el){
    var traslateattr = dsutl.trslt.getTmpTranslate(el);
    if (traslateattr){
        try{
        var traslateattr_xmatch =traslateattr.match(/(?:\s*translate\s*\(\s*\-?[0-9\.]+\s*\,)/);
        if (traslateattr_xmatch && traslateattr_xmatch.length==1){
            var strt = traslateattr_xmatch[0];
            var rest = traslateattr.substring(strt.length);
            traslateattr_xmatch =rest.match(/(?:\-?[0-9\.]+)/);
            if (traslateattr_xmatch && traslateattr_xmatch.length==1){
                var midle = traslateattr_xmatch[0];
                var stp = rest.substring(midle.length);
                return{
                    start : strt,
                    y : midle,
                    stop : stp}
        }}}
        catch(error){
            console.error('dsutl.trslt.getinfoYTranslate: ' + error);
        }    
    }
    return null;
}

dsutl.trslt.getYTranslate =  function (el){
    var info = dsutl.trslt.getinfoYTranslate(el);
    if (info){
        return parseFloat(info.y);
    }
    return null;
}

dsutl.trslt.setYTranslate =  function (el, y){
    var info = dsutl.trslt.getinfoYTranslate(el);
    if (info){
        el.setAttribute('transform', info.start + y  + info.stop);
    }
}


dsutl.trslt.setShiftYTranslate =  function (el , y){
    if ((y==null) || (y==undefined) || (y==0)) return;
    var info = dsutl.trslt.getinfoYTranslate(el);
    if (info){
        el.setAttribute('transform', info.start + (y + parseFloat(info.y)).toString() + info.stop);       
    }
    else{
        el.setAttribute('transform', 'translate(0,'+y.toString() + ')');
    }
}

dsutl.trslt.setShiftXYTranslate =  function (el , x , y){
    if ((y==null) || (y==undefined)) return y = 0;
    if ((x==null) || (x==undefined)) return x = 0; 
    if (y || x){
    var infoX = dsutl.trslt.getinfoXTranslate(el);
    var infoY = dsutl.trslt.getinfoYTranslate(el);
    //console.log(infoX);
    //console.log(infoY);
    if (infoX && infoY){
        el.setAttribute('transform', infoX.start + (x + parseFloat(infoX.x)).toString()+','+ (y + parseFloat(infoY.y)).toString() + infoY.stop);       
    }
    else{       
        el.setAttribute('transform', 'translate('+ x.toString()+','+y.toString() + ')');
    }}
}




dsutl.trslt.getDXinfo =  function (el){

    if (el.hasAttribute('d')){
        var dpath = el.getAttribute('d');
        var fnd = dpath.match(/\s*M\s*/);
        if (fnd && (fnd.length>0))  {   
            var dpath_strt = fnd[0];
            var dpath_stp = dpath.substring(fnd[0].length, dpath.length );
            fnd = dpath_stp.match(/[\-0-9\.]+/);
            if (fnd && (fnd.length>0))  {
                var dpath_val = fnd[0];
                dpath_stp = dpath_stp.substring(fnd[0].length);
                //console.log('DX: ' + dpath_strt +' : ' + dpath_val + ' : '+ dpath_stp);
                        return {
                            start : dpath_strt,
                            x :     dpath_val,
                            stop :  dpath_stp                                 
                        };
                    }
                }
            }       
    return null;    
}

dsutl.trslt.getDXval =  function (el){
    if (el.hasAttribute('d')) {
        try{
        var dpathinfo = dsutl.trslt.getDXinfo(el);
        if (dpathinfo)
            return parseFloat(dpathinfo.x);}
        catch(error){}
    }
    return null;
}

dsutl.trslt.setDXval =  function (el , x){
    if (el.hasAttribute('d')) {
        var dpathinfo = dsutl.trslt.getDXinfo(el);
        if (dpathinfo)
            el.setAttribute('d', dpathinfo.start + (x).toString() + dpathinfo.stop);
    }
}


dsutl.trslt.getDYinfo =  function (el){
    if (el.hasAttribute('d')){
        var dpath = el.getAttribute('d');
        var fnd = dpath.match(/\s*M\s*[\-0-9\.]+\s*\,+\s*/);
        if (fnd && (fnd.length>0))  {   
            var dpath_strt = fnd[0];
            var dpath_stp = dpath.substring(fnd[0].length, dpath.length );
            fnd = dpath_stp.match(/[\-0-9\.]+/);
            if (fnd && (fnd.length>0))  {
                var dpath_val = fnd[0];
                dpath_stp = dpath_stp.substring(fnd[0].length);
                //console.log('DY: ' + dpath_strt +' : ' + dpath_val + ' : '+ dpath_stp);
                        return {
                            start : dpath_strt,
                            y : dpath_val,
                            stop :  dpath_stp                                 
                        };
                    }
                }
            }       
    return null;    
}

dsutl.trslt.getDYval =  function (el){
    if (el.hasAttribute('d')) {
        try{
        var dpathinfo = dsutl.trslt.getDYinfo(el);
        if (dpathinfo)
            return parseFloat(dpathinfo.y);}
        catch(error){}
    }
    return null;
}


dsutl.trslt.setDYval =  function (el , y){
    if (el.hasAttribute('d') && y) {
        var dpathinfo = dsutl.trslt.getDYinfo(el);
        if (dpathinfo)
            el.setAttribute('d', dpathinfo.start + (y).toString() + dpathinfo.stop);
    }
}


dsutl.trslt.getBoundsElements  =  function (elements , defaultwh){
    if (elements && (elements.length>0)){
        var bounds = [];
        defaultwh = defaultwh ? defaultwh : 40;
        for (var i=0;i < elements.length;++i){
            var x = null;
            var y = null;
            var w = null;
            var h = null;            
            var el = elements[i];
            var xn = dsutl.trslt.getXname(el);
            var yn = dsutl.trslt.getYname(el);
            var hn = dsutl.trslt.getHname(el);
            var wn = dsutl.trslt.getWname(el);
            if (xn){
                switch(xn){
                    case 'd': {
                        x = dsutl.trslt.getDXval( el);
                        break;
                    }
                    case 'transform': {
                        x = dsutl.trslt.getXTranslate( el);
                        break;
                    }
                    default: {
                        x = parseFloat(el.getAttribute(xn));
                        x = (x!=x) ? null : x;
                    }
                }
            }
            if (yn){
                switch(yn){
                    case 'd': {
                        y = dsutl.trslt.getDYval( el);
                        break;
                    }
                    case 'transform': {
                        y = dsutl.trslt.getYTranslate( el);
                        break;
                    }
                    default: {
                        y = parseFloat(el.getAttribute( yn));
                        y = (y!=y) ? null : y;
                    }
                }
            }
            if (wn){
                w = parseFloat(el.getAttribute( wn ));
                w = (w!=w) ? defaultwh : w;
                
            }           
            if (hn ){
                h = parseFloat(el.getAttribute( hn));
                h = (h!=h) ? defaultwh : h;
            }
            bounds.push({x: x ? x : 0 , 
                         y: y ? y : 0 ,
                         h: h!==null ? y + h : y + defaultwh ,
                         w: w!==null ? x + w : x + defaultwh});
        }
        //console.log(bounds);
        return bounds;
}
return null;  
}


dsutl.trslt.getBoundElements  =  function (elements , defaultwh){
var bounds = dsutl.trslt.getBoundsElements(elements, defaultwh);
if (bounds){
    var bound= null;
    var x = null;
    var y = null;
    var w = null;
    var h = null; 
        for (var i=0;i < bounds.length;++i){ 
            if (bounds[i].x!==null){
                if (x===null) 
                    x=bounds[i].x;
                else
                    x= bounds[i].x<x ?  bounds[i].x : x;
            }
            if (bounds[i].y!==null){
                if (y===null) 
                    y=bounds[i].y;
                else
                    y=bounds[i].y<y ? bounds[i].y :  y ;
            }           
            if (bounds[i].h!==null){
                if (h===null) 
                    h=bounds[i].h;
                else
                    h= bounds[i].h>h ?  bounds[i].h : h;
            }
            if (bounds[i].w!==null){
                if (w===null) 
                    w=bounds[i].w;
                else
                    w=bounds[i].w>w ? bounds[i].w :  w ;
            }           
        }        
        bound = {x: x , y: y, h: h, w: w};
        //console.log(bound);
        return bound;
}
    return null;    
}


dsutl.trslt.inParentBoundElements  =  function (parentrect,  x , y , w , h){
    if (w==null) w =40;
    if (h==null) h =40;
    if (x<0) x=0;
    if (y<0) y=0;             
    if (x>parentrect.w) x=parentrect.w - w;
    if (y>parentrect.h) y=parentrect.h - h;        
    return {x : x , y : y}
}


/*

    Component info from schema

*/


dsutl.componentinfo.prototype.init = function(libsulr){
    try{
        this.libsdoc=libutil.dom.readDoc(libsulr);
        if (this.libsdoc){
            this.libs.push('../web-utils/lib.xsd')
            var els=this.libsdoc.getElementsByTagName('include');
            for (var i=0; i<els.length;++i)
                if (els[i].getAttribute('xsi:schemaLocation')) 
                    this.libs.push(els[i].getAttribute('xsi:schemaLocation'));

       
            if (this.libs.length>0)
                for (var i=0; i<this.libs.length;++i)
                    this.initlibs(this.libs[i]);   
        }
    }
catch(error){
    alert('Error load library schemas :' + error);
}
}



dsutl.componentinfo.prototype.targetNSprefix = function(doc){
    if (doc){
        var docel=doc.documentElement;
        if (docel && docel.hasAttribute('targetNamespace')) { 
        var uri=docel.getAttribute('targetNamespace');
        if (docel.attributes){
        for (var i=0; i< docel.attributes.length; ++i){ 
            if ((docel.attributes[i].localName!='targetNamespace') 
                    && (docel.attributes[i].value==uri))
             return docel.attributes[i].localName;}}}}
    return null;}



dsutl.componentinfo.prototype.initlibs = function(libulr){
    var libdoc=libutil.dom.readDoc(libulr);
    var pref = this.targetNSprefix(libdoc);
    if (libdoc){ 
        this.read_types(libdoc,pref);
        this.read_elements(libdoc, pref);
        this.read_creators(libdoc);
    }
}





dsutl.componentinfo.prototype.getAttributeList = function (el){ 
    
    var node = el['nodeName'];
    if ((node) && (this.elements[node]!=undefined))
        return this.elements[node];

    this.attributes_for_nullschema(el);
    return this.elements[node];

    
}


dsutl.componentinfo.prototype.attributes_for_nullschema = function (el){ 

    var result =[];
    for (var i=0; i< el.attributes.length; ++i){
        result.push({
            name : el.attributes[i].name , 
            type : null, 
            use : null, 
            'default' : null
        })
                
        return result;
    }
}

dsutl.componentinfo.prototype.read_types =  function(doc, pref){
    if (doc){
        var docElement=doc.documentElement;
        var els=doc.getElementsByTagName('simpleType');
        for (var i=0; i<els.length;++i){
            if ((els[i].parentNode==docElement) && (els[i].getAttribute('name'))){
                var info=this.read_simple_type(els[i]);
                var nm = els[i].getAttribute('name');
                nm = pref ? (pref + ':' + nm) : nm; 
                if (info)
                    this.types[nm] = {
                        name : nm , 
                        type : info.type, 
                        base : info['base'], 
                        regex : info['regex'],  
                        list : info['list'],
                        validator: (els[i] && els[i].hasAttributeNS(libutil.LIB_NAMESPACE_URL,'validator') ? 
                            els[i].getAttributeNS(libutil.LIB_NAMESPACE_URL,'validator') : null)
                    };
                    
            }
            else
                this.types[nm] = {
                    name : nm , 
                    type : 0, 
                    base : null, 
                    regex : null,  
                    list : null
                } 
        }
    }
}

dsutl.componentinfo.prototype.read_simple_type =  function(el){
    if (el){
        var restrictel=el.firstElementChild;
        if ((restrictel) && (restrictel.localName=='restriction')){
            return this.read_restriction_type(restrictel,el);
        }
    }
    return {
        type: 0, 
        base: null, 
        regex: null, 
        list: null
    };
}

dsutl.componentinfo.prototype.read_restriction_type =  function(el, prnt){
    if ((!el) || (el.childElementCount==0))
        return {
            type: 0, 
            base: null, 
            regex: null, 
            list: null
        };
    var type=0;
    var base=el.getAttribute('base');
    var list=null;
    var regex=null;
        
    if (el.childElementCount==1){
        if ((el.firstElementChild.localName='pattern') && (el.firstElementChild.getAttribute('value'))){
            type=1;
            regex=el.firstElementChild.getAttribute('value');
        }           
    }
    else{
        if (el.firstElementChild.localName=='enumeration'){
            list = [];
            type=2;
            for (var ch=el.firstElementChild; ch; ch=ch.nextElementSibling){
                if (ch.localName=='enumeration'){
                    if (ch.getAttribute('value')!=null)
                        list.push(ch.getAttribute('value'));
                    else
                        type=3;
                }
            }
            if (list.length==0){
                list=null;
                type=0;
            }
        } 
    }
    return {
        type: type, 
        base: base, 
        regex: regex, 
        list: list
    };
}
            
            
     

dsutl.componentinfo.prototype.read_elements = function (doc, pref) {
    if (doc) {
        var els = doc.getElementsByTagName('element');
        for (var i = 0; i < els.length; ++i) {
            if (els[i] && (els[i].parentNode == doc.documentElement)) {
                var nm = els[i].getAttribute('name');
                if (pref == 'svg') {
                    if (nm) {
                        this.elements[nm] = {
                            name: els[i].getAttribute('name'),
                            type: els[i].getAttribute('type'),
                            attributes: null
                        };
                        this.read_attributes(els[i], this.elements[nm]);
                    }
                }
            }
        }
        for (var i = 0; i < els.length; ++i) {
            if (els[i] && (els[i].parentNode == doc.documentElement)) {
                var nm = els[i].getAttribute('name');
                nm = pref /*&& nm!='svg'*/ ? (pref + ':' + nm) : nm;
                if (nm) {
                    this.elements[nm] = {
                        name: els[i].getAttribute('name'),
                        type: els[i].getAttribute('type'),
                        attributes: null
                    };
                    this.read_attributes(els[i], this.elements[nm]);
                }
            }
        }
    }
}

dsutl.componentinfo.prototype.read_attributes = function(el,  info){
    var result = {};
    if (!el)
        return result;
    var typeel= libutil.dom.findChildByTagName(el,'complexType');
    if (!typeel) return;
        
    for (var ch=typeel.firstElementChild; ch; ch=ch.nextElementSibling)
        if ((ch.localName=='attribute') && (ch.getAttribute('name')))
            result[ch.getAttribute('name')] = {
                name : ch.getAttribute('name') , 
                type : this.get_attribute(ch.getAttribute('type')), 
                use : ch.getAttribute('use'), 
                'default' : ch.getAttribute('default'),
                typename : ch.getAttribute('type')
            };
                
    info.attributes=result;
}

dsutl.componentinfo.prototype.get_attribute = function(name){
    return ( name && this.types[name]) ? (this.types[name]) : null;
}


dsutl.componentinfo.prototype.read_creators =  function(doc){
   if (doc){
        var els=doc.getElementsByTagName('creator');
        for (var i=0; i<els.length;++i)
            if (els[i].nodeName=='lib:creator'){
                var nm = els[i].getAttribute('name');
                var el = els[i].firstElementChild;
                if ((nm) && (nm!='') && (el))
                    this.creators[nm] = {
                        name : nm , 
                        template : el
                    };
                    
            }        
    }
}







//  form

dsutl.form.open = function(name){
    var fl =  libutil.global.getFormList();
    if (fl){   
        for (var i=0; i<fl.length;++i){
            if (fl[i]['name']==name){
                if (!fl[i].window){
                    fl[i]['needreload']=undefined;
                    var win=window.open(fl[i]['path'],fl[i]['name'],fl[i]['param'].toString());
                    win.document.domain=document.domain;
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


dsutl.form.close = function (name){
    var fl =  libutil.global.getFormList();
   
    if (fl){  
        for (var i=0; i<fl.length;++i){
            try{
                if (fl[i]['name']==name){
                    if (fl[i].window){
                        fl[i].window.onunload=null;
                        fl[i].window.close();
                    }
                    fl[i].window=null;
                    return;
                }
            }
            catch(error){
                alert(error);
            }
        }
    }
}

dsutl.form.reset = function (name){
    var fl =  libutil.global.getFormList(); 
    if (fl){  
        for (var i=0; i<fl.length;++i){
            try{
                if (fl[i]['name']==name){
                    if (fl[i].window)
                        dsutl.form.close(name);
                    else
                        dsutl.form.open(name);              
                }
            }
            catch(error){
                alert(error);
            }
        }
    }
}

dsutl.form.status = function (name){
    var fl =  libutil.global.getFormList(); 
    if (fl){  
        for (var i=0; i<fl.length;++i)
            if (fl[i].name==name)
                return fl[i].window ? true : false;
    }
    return false;
}



dsutl.form.find = function (name){
    var fl =  libutil.global.getFormList();
    if (fl){  
        for (var i=0; i<fl.length;++i){
            if (fl[i].name==name){
                return fl[i].window;
            }
        }
    }
    return null;   
}

dsutl.form.exists = function (name){
    var fl =  libutil.global.getFormList();
    if (fl){  
        for (var i=0; i<fl.length;++i){
            if (fl[i].name==name){
                return true;
            }
        }
    }
    return false;   
}



dsutl.form.add = function (exists){

    var openfile= prompt('Введите имя файла','');
    if (!openfile || openfile=='') return;          
    if (!libutil.regex.check(openfile,/[A-Za-z][A-Za-z0-9]*[\.xml]?/) && (libutil.regex.check(openfile,/_output/))){
        alert('Имя файла '+openfile+' некорректно!');
        return;
    }    
    if (!libutil.regex.check(openfile,/[A-Za-z][A-Za-z0-9]*\.xml/) && !libutil.regex.check(openfile,/[A-Za-z][A-Za-z0-9]*\.html/)){
        openfile = openfile+ '.xml';
    }
    var openddoc = libutil.dom.readDoc(openfile);
    if (openddoc && !exists){
        alert('Документ '+openfile+' уже существует!!');
        return;
    }
    if (exists && !openddoc){
        alert('Документ '+openfile+' не существует!!');
        return;        
    }
    var match = openfile.match(/[A-Za-z][A-Za-z0-9]*/);
    if (match.length==0){
        alert('Ошибка при обработке '+openfile+' !');
        return;}
    var openform = match[0];
    if (dsutl.form.exists((openform))){
        alert(openform+' уже существует !');
        return;}
         
    dsutl.toolwin.addform(openfile,openform, exists); 
}
               


dsutl.toolwin.addform = function(file, name, exists){
    try{       
        if (!exists)
            dsutl.form.create(file);
        var doc = libutil.global.getStartupDoc();
        var elp=doc.getElementsByTagName('project')[0];           
        var els=doc.getElementsByTagName('form');
        var el=els.length>0 ? els[els.length-1] : null;
        var newel=elp.ownerDocument.createElement('form');
        newel.setAttribute('name',name);
        newel.setAttribute('file',file);
        newel.setAttribute('left','0%');
        newel.setAttribute('top','0%');
        newel.setAttribute('width','85%');
        newel.setAttribute('height','85%');
        newel.setAttribute('caption',name);
        newel.setAttribute('decorated','no');
        elp.insertBefore(newel,el ? el.nextSibling : null);
        libutil.project.addtoformlist(newel);
        dsutl.toolwin.fillFormInspector();
        var fdoc = libutil.global.getStartupDoc();
        if (fdoc && !fdoc.needsave) fdoc.needsave=true;
        dsutl.toolwin.setMainWindowToolStatus();
    }
    catch(error){
        alert(error);
    }
       
}

dsutl.form.create = function(file){
    var tmp=$$global();
    var prjpath=tmp.projectPath;
    var txt = '<?xml-stylesheet href="../web-utils/lib.xsl" type="text/xsl"?>\n'+
    '<svg:svg xmlns="http://www.w3.org/2000/svg"  xmlns:svg="http://www.w3.org/2000/svg" xmlns:mlib="http://dvnci/mlib" xmlns:xlink="http://www.w3.org/1999/xlink"'+ 
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="root" width="100%" height="100%" style="">\n'+
    '</svg:svg>\n';
    return $$writefile(prjpath.toString()+file,txt);      
}


dsutl.form.remove =function(name){
    if (confirm('Удалить форму "'+name+'" из проекта?')){
        try{
            var fl =  libutil.global.getFormList();
            if (fl){  
                for (var i=0; i<fl.length;++i){
                    if (fl[i]['name']==name){
                        dsutl.form.close(name);
                        libutil.util.remove_element_arr(fl,i);               
                        var fdoc = libutil.global.getStartupDoc();
                        var projel=fdoc.getElementsByTagName('project')[0];
                        var els=fdoc.getElementsByTagName('form');               
                        for (var j=0; j<els.length;++j){
                            if (els[j].getAttribute('name')==name){
                                els[j].parentNode.removeChild(els[j]);
                                dsutl.toolwin.fillFormInspector();
                                if (fdoc && !fdoc.needsave) fdoc.needsave=true;
                                dsutl.toolwin.setMainWindowToolStatus();
                                return;
                            }
                        }
                    }
                }
            }
        }
        catch(error){
            alert(error);
        }
    }
}



// io




dsutl.io.saveall = function(){ 
    var fl= libutil.global.getFormList();
    for (var i=0; i<fl.length; ++i ){
        if (fl[i].red){
            fl[i].red.save();
        }   
    }
    var fdoc = libutil.global.getStartupDoc();
    if (fdoc && fdoc.needsave) {
        libutil.dom.writeDoc(fdoc);
        fdoc = libutil.global.getStartupDoc(fdoc);
        fdoc.needsave=undefined;
    }    
    dsutl.toolwin.setMainWindowToolStatus();
}

dsutl.io.isNeenSave = function (){
    var fl= libutil.global.getFormList();
    for (var i=0; i<fl.length; ++i )
        if (fl[i].red && fl[i].red.needsave)
            return true;        
    var fdoc = libutil.global.getStartupDoc();
    return  (fdoc && fdoc.needsave);
}

dsutl.io.setCurrentDesigner = function (win){
    var tmp= $$global();
    if (!win){
        tmp.currentred = null;
        return;
    }
    var fl =  libutil.global.getFormList();
    if (fl){   
        for (var i=0; i<fl.length;++i){
            if (fl[i]['window']==win){
                tmp.currentred=fl[i]['designer_glb'];  
            }
        }
    }
}

dsutl.io.getCurrentDesigner = function (){
    return window.$$global ? window.$$global().currentred : null;
}

//  menue


dsutl.MAINMENU_BUTTON_HEIGHT = 22;
dsutl.MAINMENU_WIDTH = 150;
dsutl.MAINMENU_BUTTON_OFFCOLOR = '#555';
dsutl.MAINMENU_BUTTON_ONCOLOR = '#222';
dsutl.MAINMENU_BUTTON_DSBLCOLOR1 = '#333';
dsutl.MAINMENU_BUTTON_DSBLCOLOR2 = '#444';
dsutl.MAINMENU_COLOR = '#333';
dsutl.MAINMENU_TEXT_COLOR = 'white';
dsutl.MAINMENU_TEXT_ONCOLOR = '#3F3';
dsutl.MAINMENU_TEXT_DSBLCOLOR = '#AAA';
dsutl.MAINMENU_TEXT_SIZE = 11;
dsutl.MAINMENU_R = 5;

            
dsutl.menue = function (items){
   this.document = document;
   this.dosigner = document.red;
   this.documentElement = document.documentElement;
   if (this.documentElement){
        
        this.body = libutil.svg.create_element('svg', document.documentElement , [{name : 'x' , value : 0},
                                                      {name : 'y' , value : 0},
                                                      {name : 'width' , value : dsutl.MAINMENU_WIDTH},
                                                      {name : 'height' , value : items.length * dsutl.MAINMENU_BUTTON_HEIGHT}
                                                      /*{name : 'disable' , value : 'disable'}*/]); 
                                                  
                                                  
                                                   
        this.bodyrect = libutil.svg.create_element('rect', this.body , [{name : 'x' , value : 0},
                                                      {name : 'y' , value : 0},
                                                      {name : 'width' , value : dsutl.MAINMENU_WIDTH},
                                                      {name : 'height' , value : items.length * dsutl.MAINMENU_BUTTON_HEIGHT},
                                                      {name : 'rx' , value : dsutl.MAINMENU_R},
                                                      {name : 'ry' , value : dsutl.MAINMENU_R},                                                      
                                                      {name : 'style' , value : 'fill: '+ dsutl.MAINMENU_COLOR +'; opacity: 0.9; stroke-width: 0;'}]); 
                                                  
        this.setstyle(); 
        this.buttons =[];
        var buttons =[];
        for (var i=0; i<items.length; ++i ){                                          
              var btn = libutil.svg.create_button(this.body, 0, dsutl.MAINMENU_BUTTON_HEIGHT * i, dsutl.MAINMENU_WIDTH , 
                                        dsutl.MAINMENU_BUTTON_HEIGHT, dsutl.MAINMENU_R, dsutl.MAINMENU_R,  null , '__mainmenuclass',
                                        items[i].name , null , '__mainmenuclass') ;
              buttons.push(btn); 
              btn.func =items[i].func;
              btn.onclick = function(){
                 if (this.getAttribute('disable')!='disable'){
                     this.func();
                 }
             };
             btn.checkstatefunc =items[i].active;
             btn.checkstate = function (){this.setAttribute('disable', this.checkstatefunc ? this.checkstatefunc() : '') ;}
             this.buttons.push(btn);
            
     }
     
     var menue = this;
     var body = this.body;

     this.body.onmouseout = function(ev){        
        if (!libutil.dom.checkIsParent (body,ev.toElement,true)){
            menue.hide();}}
         
         
   }
    
}  

dsutl.menue.prototype.show = function(x, y){
    this.body.setAttribute('x', x);
    this.body.setAttribute('y', y);
    this.document.documentElement.appendChild(this.body);
}

dsutl.menue.prototype.check = function(){
    if (this.buttons){
        for (var i=0; i<this.buttons.length; ++i ){
            this.buttons[i].checkstate();
        }
    }
}

dsutl.menue.prototype.hide = function(){
    libutil.dom.removechild(this.documentElement, this.body);
}

dsutl.menue.prototype.getBody = function(){
    return this.body;
}

dsutl.menue.prototype.setstyle = function(){

    var defs = libutil.svg.create_element('defs', this.body);
    libutil.svg.create_gradient('linearGradient' , defs,[{name : 'id' , value : '___mainmenue___gradienton'},
                                            {name : 'x1' , value : '100%'},
                                            {name : 'y1' , value : '0%'},
                                            {name : 'x2' , value : '100%'},
                                            {name : 'y2' , value : '100%'}],
                                            [{offset : 0 , stopcolor : dsutl.MAINMENU_BUTTON_ONCOLOR} , 
                                             {offset : 0.5 , stopcolor : dsutl.MAINMENU_BUTTON_OFFCOLOR} ,
                                             {offset : 1.0 , stopcolor : dsutl.MAINMENU_BUTTON_ONCOLOR}]);
                                            
    libutil.svg.create_gradient('linearGradient' , defs,[{name : 'id' , value : '___mainmenue___gradientoff'},
                                            {name : 'x1' , value : '100%'},
                                            {name : 'y1' , value : '0%'},
                                            {name : 'x2' , value : '100%'},
                                            {name : 'y2' , value : '100%'}],
                                            [{offset : 0 , stopcolor : dsutl.MAINMENU_BUTTON_OFFCOLOR} , 
                                             {offset : 0.5 , stopcolor : dsutl.MAINMENU_BUTTON_ONCOLOR} , 
                                             {offset : 1.0 , stopcolor : dsutl.MAINMENU_BUTTON_OFFCOLOR}]);
                                            
    libutil.svg.create_gradient('linearGradient' , defs,[{name : 'id' , value : '___mainmenue___gradientdsbl'},
                                            {name : 'x1' , value : '100%'},
                                            {name : 'y1' , value : '0%'},
                                            {name : 'x2' , value : '100%'},
                                            {name : 'y2' , value : '100%'}],
                                            [{offset : 0 , stopcolor : dsutl.MAINMENU_BUTTON_DSBLCOLOR2} ,
                                             {offset : 0.5 , stopcolor : dsutl.MAINMENU_BUTTON_DSBLCOLOR1},
                                             {offset : 1.0 , stopcolor : dsutl.MAINMENU_BUTTON_DSBLCOLOR2}]);                                            
                                            
    var style="svg > svg > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradienton);\n"+
              "stroke: #333\n"+
              "stroke-width: 1;\n"+ 
              "}\n"+
              
              "svg  > svg > rect.__mainmenuclass{\n"+
              "cursor: pointer;\n"+
              "}\n"+

              "svg  > svg:hover > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradientoff);\n"+
              "stroke: #BBB;\n"+
              "stroke-width: 1;\n"+
              "}\n"+


              "svg  > svg:active > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradienton);\n"+
              "stroke: #BBB;\n"+
              "stroke-width: 1;\n"+
              "}\n"+


              "svg  > svg[disable='disable'] > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradientdsbl);\n"+
              "stroke: #333;\n"+
              "stroke-width: 1; \n"+
              "cursor: none;\n"+
              "}\n"+

              "svg  > svg[disable='disable']:hover > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradientdsbl);\n"+
              "stroke: #333;\n"+
              "stroke-width: 1;\n"+
              "cursor: none;\n"+
              "}\n"+


              "svg  > svg[disable='disable']:active > rect.__mainmenuclass{\n"+
              "fill: url(#___mainmenue___gradientdsbl);\n"+
              "stroke: #333;\n"+
              "stroke-width: 1;\n"+
              "cursor: none;\n"+
              "}\n"+
              
              "svg > svg >  text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_COLOR+";\n"+
              "}\n"+

              "svg > svg:hover >  text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_ONCOLOR+";\n"+
              "}\n"+


              "svg  > svg:active > text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_ONCOLOR+";\n"+
              "font-weight: bold;\n"+
              "}\n"+


              "svg > svg[disable='disable'] >  text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_DSBLCOLOR+";\n"+
              "font-weight: normal;\n"+
              "cursor: none;\n"+
              "}\n"+

              "svg > svg:hover[disable='disable']  >   text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_DSBLCOLOR+";\n"+
              "font-weight: normal;\n"+
              "cursor: none;\n"+
              "}\n"+


              "svg  > svg[disable='disable']:active > text.__mainmenuclass{\n"+
              "fill: "+dsutl.MAINMENU_TEXT_DSBLCOLOR+";\n"+
              "font-weight: normal;\n"+
              "cursor: none;\n"+
              "}\n"+


              "svg  > svg > text.__mainmenuclass{\n"+
              "font-size: "+dsutl.MAINMENU_TEXT_SIZE+"px;\n"+
              "cursor: pointer;\n"+
              "}";
          
    var styleel  = libutil.html.create_style(defs, style);


}
            
   
   
   
   
            
            
/*


    Main disigner interface


*/               
                
                
dsutl.toolwin.getMainWindow = function (){
    libutil.www.create_tbwindow('maintool', 'Редактор' ,'100' , '100', '600','64','yes','yes',null,null,
        ['save','objinsp', 'forminsp','libinsp', 'scriptinsp' ,'exit'],
        ['Сохранить','Редактор свойств', 'Редактор форм','Панель компонентов', 'Скрипты' ,'Выход'],
        [function() {
            dsutl.io.saveall();
        },
        function() {
            dsutl.toolwin.resetObjectInspector();
        },
        function() {
            dsutl.toolwin.resetFormInspector();
        },
        function() {
            dsutl.toolwin.resetLibInspector();
        }, 
        function() {
            dsutl.toolwin.resetScriptInspector();
        },           
        function() {
            dsutl.toolwin.destroyMainWindow();
        }],
        dsutl.toolwin.destroyMainWindow);
        
        
    var tmp=$$global();
 
    dsutl.toolwin.setMainWindowToolStatus();
    tmp.maintool.focus();
    
}







dsutl.toolwin.setMainWindowToolStatus = function (val){ 
    if ((val==1 || !val)) 
        libutil.www.set_tbwindow_btnstatus('maintool', null, 'save', dsutl.io.isNeenSave() ?  'on' :  'disabled');
    if ((val==2 || !val)) 
        libutil.www.set_tbwindow_btnstatus('maintool', null, 'objinsp', dsutl.toolwin.getObjectInspector() ?  'off' :  'on');
    if ((val==3 || !val)) 
        libutil.www.set_tbwindow_btnstatus('maintool', null, 'forminsp', dsutl.toolwin.getFormInspector() ?  'off' :  'on');
    if ((val==4 || !val)) 
        libutil.www.set_tbwindow_btnstatus('maintool', null, 'libinsp', dsutl.toolwin.getLibInspector() ?  'off' :  'on');
    if ((val==5 || !val)){
        libutil.www.set_tbwindow_btnstatus('maintool', null, 'scriptinsp', dsutl.toolwin.getScriptInspector() ?  'off' :  'on'); }   
}


dsutl.toolwin.destroyMainWindow = function(){
    var tmp=$$global();
    if (tmp && tmp.maintool)
        tmp.maintool=undefined;
    if (!dsutl.io.isNeenSave()){          
        $$exit();
        return;
    }
    if (confirm("Выйти без сохранения?")){
        $$exit();
        return;
    } 
    else{
        setTimeout(function() {
            dsutl.toolwin.getMainWindow();
        }, 10);
    }
}








///  Object inspector

dsutl.toolwin.getObjectInspector = function (force){
    var tmp=$$global();
    if (!force && !tmp.objectinspectorwin) return null;
    if (tmp && !tmp.objectinspectorwin){
        var objectinspectorwin=libutil.window.createhtml('_ObjectInspector','Свойства','100', '900', '500','650','yes','yes',null,null, "../web-utils/css/objectinspector.css");
        tmp.objectinspectorwin=objectinspectorwin;
        tmp.objectinspectordoc=objectinspectorwin.document;
        objectinspectorwin.onunload=dsutl.toolwin.destroyObjectInspector;
        var objdoc =objectinspectorwin.document;
        var body=objdoc.getElementsByTagName('body')[0];
        var div = libutil.html.create_element('div' ,libutil.html.create_element('div', body),[{name : 'class' , value : 'scrollWrapper'}]);
        var table = libutil.html.create_element('table' ,div,[{name : 'class' , value : 'scrollable'}]);
        var tbody = libutil.html.create_element('tbody', table);
        var tr = libutil.html.create_element('tr' ,tbody);
        var th1 =libutil.html.create_element('th', tr);
        th1.innerHTML='Имя';
        var th2 =libutil.html.create_element('th', tr);
        th2.innerHTML='Значение';
        tmp.objectinspectortbody=tbody;
        var current=dsutl.io.getCurrentDesigner();
        if (current)
            current.show_property();
              
    }   
    return (tmp && tmp.objectinspectorwin) ? tmp.objectinspectorwin : null;
}

dsutl.toolwin.resetObjectInspector = function(){
    var vis =  dsutl.toolwin.getObjectInspector();
    var tmp=$$global();
    if (vis && tmp.objectinspectorwin)
        tmp.objectinspectorwin.close();
    else
        dsutl.toolwin.getObjectInspector(true);
    dsutl.toolwin.setMainWindowToolStatus(2);
        
} 

dsutl.toolwin.getObjectInspectorDocument = function(){
    var tmp = $$global();
    if (tmp && tmp.objectinspectordoc) {
        return tmp.objectinspectordoc; 
    }
}

dsutl.toolwin.getObjectInspectorTbody = function(){
    var tmp = $$global();
    if (tmp && tmp.objectinspectortbody) {
        return tmp.objectinspectortbody;       
    }   
}  


dsutl.toolwin.showObjectInspector = function(){
    var tmp = dsutl.toolwin.getObjectInspector();
    if (tmp)
        tmp.focus();
}



dsutl.toolwin.closeObjectInspector = function(){
    var tmp = dsutl.toolwin.getObjectInspector();
    if (tmp.objectinspectorwin)
        tmp.objectinspectorwin.close();
}

dsutl.toolwin.destroyObjectInspector = function(){
    var tmp=$$global();
    if (tmp && tmp.objectinspectorwin)
        tmp.objectinspectorwin=undefined;
    if (tmp && tmp.objectinspectordoc)
        tmp.objectinspectordoc=undefined;
    if (tmp && tmp.objectinspectortbody)
        tmp.objectinspectortbody=undefined;
    dsutl.toolwin.setMainWindowToolStatus(2);
    
}


// Form inspector


dsutl.toolwin.getFormInspector = function (force){
    var tmp=$$global();
    if (!tmp.formtool && !force) return null;
    if (tmp && !tmp.formtool){

        libutil.www.create_tbwindow('formtool', 'Окна' ,'600','100', '600','200','yes','yes',null,null,
            ['add', 'new'],
            ['Добавить из файла','Новая форма'],
            [
            function() {
                dsutl.form.add(true);             
            },
            function() {
                dsutl.form.add();
            }]);
    
        var objdoc =tmp.formtool.document;
        tmp.formtool.onunload=dsutl.toolwin.destroyFormInspector;
        tmp.formtool.onmousewheel = function (){
            event.stopPropagation();
            event.preventDefault();
        }

        var body=objdoc.getElementsByTagName('body')[0];
        var head=objdoc.getElementsByTagName('head')[0];
        libutil.html.create_link(head, "../web-utils/css/forminspector.css");
        var div = libutil.html.create_element('div' ,libutil.html.create_element('div', body),[{name : 'class' , value : 'scrollWrapper'}]);
        var table = libutil.html.create_element('table' ,div,[{name : 'class' , value : 'scrollable'}]);
        var tbody = libutil.html.create_element('tbody', table);
        libutil.html.create_element('tr' , tbody);
        tmp.formtooltbody=tbody;
    }
 
    dsutl.toolwin.fillFormInspector();
    return (tmp && tmp.formtool) ? tmp.formtool : null;
}

dsutl.toolwin.resetFormInspector = function(){
    var vis =  dsutl.toolwin.getFormInspector();
    var tmp=$$global();
    if (vis && tmp.formtool)
        tmp.formtool.close();
    else
        dsutl.toolwin.getFormInspector(true);
    var tmp=$$global();
    tmp.formtool.focus();
    dsutl.toolwin.setMainWindowToolStatus(3);
        
} 

dsutl.toolwin.fillFormInspector = function (){
    var tmp=$$global();
    var tbody = tmp.formtooltbody;
    
    libutil.dom.clearChildNode(tbody);   

    var tr = libutil.html.create_element('tr' ,tbody);
    
    libutil.html.create_tabel_header(tr,null,null,
        ['Файл','id','caption','x','y','width','height','visible','alltop','resize','decorate','modal','0/X','-']);
   
    var fl= libutil.global.getFormList();
 
                            
    for (var i=0; i<fl.length; ++i ){
        var formname=fl[i]['name'];
        formname=formname.toString();
        var tr= libutil.html.create_element('tr' ,tbody);
       
        var td1= libutil.html.create_element('td', tr);
        td1.innerHTML=fl[i]['file'] ? fl[i]['file'] : "";
        
        td1.className='static';
   
        var td2 = libutil.html.create_element('td', tr);
        td2.innerHTML=fl[i]['name'] ? fl[i]['name'] : "";
        td2.className='static';
        dsutl.toolwin.fiCreateRow(tr,fl[i],'caption');
        dsutl.toolwin.fiCreateRow(tr,fl[i],'left', '50px');       
        dsutl.toolwin.fiCreateRow(tr,fl[i],'top', '50px');
        dsutl.toolwin.fiCreateRow(tr,fl[i],'width', '50px');       
        dsutl.toolwin.fiCreateRow(tr,fl[i],'height', '50px'); 
        dsutl.toolwin.fiCreateRow(tr,fl[i],'visible', '50px');
        dsutl.toolwin.fiCreateRow(tr,fl[i],'allwaystop', '50px');       
        dsutl.toolwin.fiCreateRow(tr,fl[i],'resizable', '50px');
        dsutl.toolwin.fiCreateRow(tr,fl[i],'decorated', '50px');
        dsutl.toolwin.fiCreateRow(tr,fl[i],'modal', '50px');        
        
        var td11= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0; '}]);
        var btno = libutil.html.create_button( td11,'height: 15px;',null,'');
        btno.setAttribute('onclick','dsutl.form.reset("'+formname+ '");');
 
        
        var td13= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0; '}]);
        var btnd = libutil.html.create_button( td13,'height: 15px;',null,'');
        btnd.setAttribute('onclick','dsutl.form.remove("'+formname+ '");');
    
    }
}

dsutl.toolwin.fiCreateRow = function(tr, tblrow, name, width, lst){
    var td= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0;' + width ? 'width: ' + width + ';' : ''}]);
    var tmp= tblrow[name] ? tblrow[name] : '';
    if (lst)
        td.lst=lst; 
    td.innerHTML= tmp;
    td.elem=tblrow;
    td.value=tmp;
    td.propname=name;
    td.onclick=function(ev) {
        dsutl.toolwin.fiPropertyRowFocus(ev);    
    }
    return td;
}



dsutl.toolwin.fiPropertyRowFocus = function(ev){
    try{
        var td = ev.target;
        libutil.dom.clearChildNode(td);
        if (td.lst)
            var edit=libutil.html.create_select(ev.target, 'text', td.value, td.lst);
        else
            var edit=libutil.html.create_input(ev.target, 'text', td.value);
       
    
        edit.focus();
        edit.oldval=td.value;  
 
        edit.onblur= function(ev) {
            dsutl.toolwin.fiPropertyLeaveFocus(ev);
        }

        edit.addEventListener( 'keyup' ,function (ev) {       
            if ((ev.keyIdentifier=="Enter"))
                dsutl.toolwin.fiPropertyLeaveFocus(ev);
            else 
                ev.stopPropagation();
        });  
        ev.preventDefault();
        ev.stopPropagation();
    }
    catch(error){
        alert(error);
    }
}

dsutl.toolwin.validate_to_class = function(val){
   if (val==true) return 'ok';
   if (val==false) return 'error';
   return 'nodef';
}

dsutl.toolwin.fiPropertyLeaveFocus = function(event){

    if (!event.target) return;
    var oldval=event.target.oldval;
    var value =event.target.value;
    var td=event.target.parentNode;
    td.removeChild(event.target);
    td.innerHTML=value;
    if ((oldval!=value) && (dsutl.toolwin.fiCheckFormParam(td.propname,value))){  
        
        
        if (td.elem && td.elem['element']){     
            
            td.elem['element'].setAttribute(td.propname,value);
            td.elem[td.propname]=value;
            dsutl.form.close(td.elem['name'], true);
            td.elem['param'] = libutil.project.buildparam(td.elem['element']);
            dsutl.form.open(td.elem['name']);

            
        }
        var fdoc = libutil.global.getStartupDoc();
        fdoc.needsave=true;
        dsutl.toolwin.setMainWindowToolStatus();

    }

          
    event.preventDefault();
    event.stopPropagation();   
}

 

dsutl.toolwin.fiCheckFormParam = function(name, val){
    switch (name){
        case 'caption':{
            return true;
        }             
        case 'width':
        case 'height':        
        case 'top':
        case 'left':{
            var ind = val.search('/%/i');
            if (ind==-1){
                var vl=parseInt(val);
                if (vl!=vl) return undefined;
            }
            else{
                var tmpval = val.substring(0,ind);
                if ((vl!=vl) || (vl<0) || (vl>100)) return undefined;
            }
            return true;
        }
        case 'name':{
            return !libutil.project.getFormInfo(val);
        }
        case 'visible':{
            return (val=='') || (val=='true') || (val=='false');
        } 
        case 'resizable':
        case 'resizable':
        case 'allwaystop':{
            return (val=='') || (val=='true');
        }
        case 'decorated':{
            return (val=='') || (val=='no');
        }  
    } 
    return false;
}



dsutl.toolwin.destroyFormInspector = function(){
    var tmp=$$global();
    if (tmp && tmp.formtool)
        tmp.formtool=undefined;
    if (tmp && tmp.formtooltbody)
        tmp.formtooltbody=undefined; 
    dsutl.toolwin.setMainWindowToolStatus(3);  
}

//

/* Script Inspector */

//

dsutl.toolwin.getScriptInspector = function (force){
    var tmp=$$global();
    if (!tmp.scripttool && !force) return null;
    if (tmp && !tmp.scripttool){

        libutil.www.create_tbwindow('scripttool', 'Скрипты' ,'600','100', '600','200','yes','yes',null,null,
            ['startcsript', 'stopscript', 'add', 'new'],
            ['Стартовый скрипт', 'Стоповый скрипт', 'Добавить из файла','Новый скрипт'],
            [
            function() {
                dsutl.script.getStartScript();
            },
            function() {
                dsutl.script.getStopScript();
            },                
            function() {
                dsutl.script.add(true);
                dsutl.toolwin.fillScriptInspector();
            },
            function() {
                dsutl.script.add();
                dsutl.toolwin.fillScriptInspector();
            }]);
    
        var objdoc =tmp.scripttool.document;
        tmp.scripttool.onunload=dsutl.toolwin.destroyScriptInspector;
        tmp.scripttool.onmousewheel = function (){
            event.stopPropagation();
            event.preventDefault();
        }

        var body=objdoc.getElementsByTagName('body')[0];
        var head=objdoc.getElementsByTagName('head')[0];
        libutil.html.create_link(head, "../web-utils/css/scriptinspector.css");
        var div = libutil.html.create_element('div' ,libutil.html.create_element('div', body),[{name : 'class' , value : 'scrollWrapper'}]);
        var table = libutil.html.create_element('table' ,div,[{name : 'class' , value : 'scrollable'}]);
        var tbody = libutil.html.create_element('tbody', table);
        libutil.html.create_element('tr' , tbody);
        tmp.scripttooltbody=tbody;
    }
 
    dsutl.toolwin.fillScriptInspector();
    return (tmp && tmp.scripttool) ? tmp.scripttool : null;
}


dsutl.toolwin.resetScriptInspector = function(){
    var vis =  dsutl.toolwin.getScriptInspector();
    var tmp=$$global();
    if (vis && tmp.scripttool)
        tmp.scripttool.close();
    else
        dsutl.toolwin.getScriptInspector(true);
    var tmp=$$global();
    tmp.scripttool.focus();
    dsutl.toolwin.setMainWindowToolStatus(5);

        
} 

dsutl.toolwin.fillScriptInspector = function (){
    var tmp=$$global();
    var tbody = tmp.scripttooltbody;
    
    libutil.dom.clearChildNode(tbody);   

    var tr = libutil.html.create_element('tr' ,tbody);
    
    libutil.html.create_tabel_header(tr,null,null,
        ['Файл','Редактировать','-']);
   
    var sl= libutil.global.getScriptList();
 
                            
    for (var i=0; i<sl.length; ++i ){
        var scriptname=sl[i]['file'].toString();

        var tr= libutil.html.create_element('tr' ,tbody);
       
        var td= libutil.html.create_element('td', tr);
        td.innerHTML=scriptname;       
        td.className='static';
        
        
        var td11= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0; '}]);
        var btno = libutil.html.create_button( td11,'height: 15px;',null,'');
        btno.setAttribute('onclick','dsutl.script.getFileScript("'+scriptname+ '");');
 
        
        var td13= libutil.html.create_element('td', tr, [ {name : 'style' , value : 'margin: 0 0 0 0; padding: 0 0 0 0; '}]);
        var btnd = libutil.html.create_button( td13,'height: 15px;',null,'');
        btnd.setAttribute('onclick','dsutl.script.remove("'+scriptname+ '");dsutl.toolwin.fillScriptInspector()');
    
    }
}




dsutl.toolwin.destroyScriptInspector = function(){
    var tmp=$$global();
    if (tmp && tmp.scripttool)
        tmp.scripttool=undefined;
    if (tmp && tmp.scripttooltbody)
        tmp.scripttooltbody=undefined; 
    dsutl.toolwin.setMainWindowToolStatus(5);  
}


//


dsutl.toolwin.getLibInspector = function (force){    
    var tmp=$$global();
    if (tmp && !tmp.libtool && !force) return null;
    if (!tmp.libtool){
        var libs =libutil.global.getLibList();
        
        var heigth = libs.length>0 ? 86 + 52 * (libs.length-1) : 46;
        
        libutil.www.create_tbwindow('libtool','Библиотека','300','100', '600',heigth,'yes','yes',null,null);
        tmp.libtool.onunload=dsutl.toolwin.destroyLibInspector;
    
        var libs =libutil.global.getLibList();
        for (var i=0; i<libs.length;++i){
            var lib =libs[i];
            var btnsname =[];
            var btnsfunc =[];
            var btnshint =[];
            var comps =lib.components;        
            for (var j=0; j<comps.length;++j){
                btnsname.push(comps[j].hint);
                btnsfunc.push(dsutl.toolwin.setSelectedToolEvent);
                btnshint.push(comps[j].hintup);
            }        
            libutil.www.create_tbwindow_tools('libtool', lib.name , 
                btnsname, 
                btnshint, 
                btnsfunc, 
                null, 
                lib.caption, 
                "background-color: #E7E7E7; margin: 0px; border-width: 1px 0px ; border-color: yellow; border-style: solid; text-align: center; color: #040347)"); 
        }
        
    //tmp.libtool.onload= function() {alert('test');}

    }
    return (tmp && tmp.libtool) ? tmp.libtool : null;

}  



dsutl.toolwin.resetLibInspector = function(){
    
    var tmp=$$global();
    if (tmp.libtool)
        tmp.libtool.close();
    else
        dsutl.toolwin.getLibInspector(true);
    var tmp=$$global();
    tmp.libtool.focus();
    dsutl.toolwin.setMainWindowToolStatus(4);     
} 

dsutl.toolwin.setSelectedToolEvent = function(event){
    if (event && event.target && event.target.parentNode){
        var trgt=event.target.parentNode;
        dsutl.toolwin.setSelectedComponent(trgt.nametool, trgt.namebtn);
    }
}

dsutl.toolwin.setSelectedComponent = function(tool, comp){
    //alert(tool + ' : ' + comp);
    var tmp= $$global(); 
    var set  = tool && comp;
    var result = null; 
    if (tmp){
        var select = tmp['selectedComponent'];       
        if (select && set && select.tool==tool && select.component==comp){
            tmp['selectedComponent'] =  null;
            libutil.www.set_tbwindow_btnstatus(tool, tool , comp , 'on' );
            return null;
        }
       
        if (select){ 
            
            libutil.www.set_tbwindow_btnstatus(select.tool, select.tool  , select.component  , 'on' );
            result = {
                'tool' : select.tool , 
                'component' : select.component
            };
            if (!set) return result;
            libutil.www.set_tbwindow_btnstatus(tool, result.tool , result.component , 'on' );
        }
        if (set){
            tmp['selectedComponent']={
                'tool' : tool , 
                'component' : comp
            };
            libutil.www.set_tbwindow_btnstatus(tool, tool  , comp  , 'off' );
        }
    }
    return result;
}


dsutl.toolwin.getSelectedComponent = function(){
    var tmp = dsutl.toolwin.setSelectedComponent();
    return (tmp && tmp.tool && tmp.component)? libutil.project.get_components(tmp.tool, tmp.component): null;
}

dsutl.toolwin.clearSelectedComponent = function(){
    var tmp= $$global();
    tmp['selectedComponent']=undefined;
}


dsutl.toolwin.destroyLibInspector = function(){
    var tmp=$$global();
    if (tmp && tmp.libtool)
        tmp.libtool=undefined;
    dsutl.toolwin.setMainWindowToolStatus(4);  
}





dsutl.toolwin.propertydialog = function(name, value){
    return libutil.window.create_modal('../web-utils/html/propertydialog.html',name , value, '20%', '20%', '60%', '60%', '1', 'yes');       
}



// Experemental func



designer.prototype.swapSourceElement = function (el1, el2) {
    if (el1 && el2) {
        var clonedElement1 = el1.cloneNode(true);
        var clonedElement2 = el2.cloneNode(true);
        el2.parentNode.replaceChild(clonedElement1, el2);
        el1.parentNode.replaceChild(clonedElement2, el1);
        return clonedElement2;
    }
}

designer.prototype.compareFnElement = function (nm) {
    if (nm == "text")
        return 1;
    if (nm == "eline")
        return 2;
    if (nm == "epath") 
        return 3;
    if (nm == "switcher") 
        return 4;      
    return 9;
}

designer.prototype.compareSourceElement = function ( el1, el2) {
    if (el1 && el2) {
        if (el1.localName && el2.localName && (this.compareFnElement(el2.localName)<this.compareFnElement(el1.localName)))
            return true;
        /*else if ((el2.localName<el1.localName) && el1.hasAttribute('id') 
                && el2.hasAttribute('id') && (el2.getAttribute('id')<el1.getAttribute('id')))
            return true;*/
    }
    return false;
}

designer.prototype.findMinSourceElement = function (from) {
    var rslt = from;
    for (var el = from ; el; el = el.nextElementSibling) {
     if (this.compareSourceElement (rslt, el))
         rslt=el;
    }
   return (from!=rslt) ? rslt : null;
}



designer.prototype.sortSourceElement = function () {
    if (this.sourseDocument && this.sourseDocument.documentElement) {
        var prnt = this.sourseDocument.documentElement;
        for (var el = prnt.firstElementChild; el; el = el.nextElementSibling) {
            var minEl = this.findMinSourceElement(el);
            if (minEl)
                el =this.swapSourceElement(el, minEl);
        }
    }
}


// rdc=this.$$global().currentred

designer.prototype.getTranslateShift = function (el) {
    if (el && el.transform && el.transform.baseVal
            && el.transform.baseVal.numberOfItems) {
        var xt = 0;
        var yt = 0;
        //console.log('sel id: ' + el.transform.baseVal.getItem(0).matrix.e + " " + el.transform.baseVal.getItem(0).matrix.f);
        xt = Math.floor(el.transform.baseVal.getItem(0).matrix.e);
        yt = Math.floor(el.transform.baseVal.getItem(0).matrix.f);
        return { x: xt, y: yt};
    }
    return undefined;
}

designer.prototype.tranformSourceExperiment= function () {
    if (this.sourseDocument && this.sourseDocument.documentElement) {
        var el = this.sourseDocument.documentElement;
        for (var ch = el.firstElementChild; ch; ch = ch.nextElementSibling) {
                if (ch.localName == "line") {
                    ch = designer.prototype.tranform_line_to_eline(ch);
                    if (!ch)
                        ch = el.firstElementChild;
                }
                else if (ch.localName == "text") {
                    ch = designer.prototype.tranform_text_to_text(ch)
                    if (!ch)
                        ch = el.firstElementChild;
                }
                else if (ch.localName == "polygon") {
                    ch = designer.prototype.tranform_polygon_to_switch(ch);
                    if (!ch)
                        ch = el.firstElementChild;                    
                }
                else if (ch.localName == "path" ) {
                    var nxt  = ch.nextElementSibling
                    el.removeChild(ch);
                    ch = nxt;
                }
                else if (ch.localName == "eline") {
                    //if (ch.hasAttribute('id') && !ch.hasAttribute('stroke-width'))
                        //ch.setAttribute('stroke-width', 2);
                    /*var x1 = ch.hasAttribute('x1') ? Math.floor(ch.getAttribute('x1')) : undefined;
                    var x2 = ch.hasAttribute('x2') ? Math.floor(ch.getAttribute('x2')) : undefined;
                    var y1 = ch.hasAttribute('y1') ? Math.floor(ch.getAttribute('y1')) : undefined;
                    var y2 = ch.hasAttribute('y2') ? Math.floor(ch.getAttribute('y2')) : undefined;
                    if (x1>x2){
                        ch.setAttribute('x2', x1);
                        ch.setAttribute('x1', x2);
                    }
                    if (y1>y2){
                        ch.setAttribute('y2', y1);
                        ch.setAttribute('y1', y2);
                    }                   
                }*/ 
            }
        }
    }
}

designer.prototype.tranformSourceExperimentId= function () {
    if (this.sourseDocument && this.sourseDocument.documentElement) {
        var el = this.sourseDocument.documentElement;
        for (var ch = el.firstElementChild; ch; ch = ch.nextElementSibling) {
            if (ch.hasAttribute('id')) {
                ch.setAttribute('id', ch.getAttribute('id')+'2dbl');               
            }
        }
    }
}

designer.prototype.tranform_line_to_eline = function (el) {
    if (el) {
        var parent = el.parentNode;
        var newel = parent.ownerDocument.createElement("elib:eline");
        var x1 = el.hasAttribute('x1') ? Math.floor(el.getAttribute('x1')) : undefined;
        var x2 = el.hasAttribute('x2') ? Math.floor(el.getAttribute('x2')) : undefined;
        var y1 = el.hasAttribute('y1') ? Math.floor(el.getAttribute('y1')) : undefined;
        var y2 = el.hasAttribute('y2') ? Math.floor(el.getAttribute('y2')) : undefined;
        if (x1 == x2 || y1 == y2) {
            if (el.hasAttribute('id'))
                newel.setAttribute('id', el.getAttribute('id'));
            if (el.hasAttribute('x1'))
                newel.setAttribute('x1', x1);
            if (el.hasAttribute('x2'))
                newel.setAttribute('x2', x2);
            if (el.hasAttribute('y1'))
                newel.setAttribute('y1', y1);
            if (el.hasAttribute('y2'))
                newel.setAttribute('y2', y2);
            newel.setAttribute('stroke-width', '2');
            if (el.hasAttribute('style')) {
                var stl=el.getAttribute('style');
                if (stl.match("stroke:#00ff00"))
                    newel.setAttribute('environment', 'kU6');
                else if (stl.match("stroke:#ff0000"))
                    newel.setAttribute('environment', 'kU10');
                else
                    newel.setAttribute('environment', 'kUKbl');
            }
            else
                newel.setAttribute('environment', 'kU6');      
            parent.replaceChild(newel, el);
            return newel;
        }
        else {
            parent.removeChild(el);
            return undefined;
        }
    }
    return el;
}


designer.prototype.tranform_text_to_text = function (el) {
    if (el) {
        var parent = el.parentNode;
        var newel = parent.ownerDocument.createElement("text");
        var x = el.hasAttribute('x') ? Math.floor(el.getAttribute('x')) : undefined;
        var y = el.hasAttribute('y') ? Math.floor(el.getAttribute('y')) : undefined;
        if (el.hasAttribute('id')) {
            if (el.hasAttribute('id'))
                newel.setAttribute('id', el.getAttribute('id'));
            if (el.hasAttribute('x'))
                newel.setAttribute('x', x);
            if (el.hasAttribute('y'))
                newel.setAttribute('y', y);
            if (el.textContent && el.textContent.match('ТП'))
                newel.setAttribute('class', 'elec_f_txt');
            else
                newel.setAttribute('class', 'elec_f_on');            
            newel.setAttribute('text', el.textContent);        
            parent.replaceChild(newel, el);
            return newel;
        }
    }
    return el;
} 


designer.prototype.tranform_polygon_to_switch = function (el) {
    if (el) {
        var parent = el.parentNode;
        var newel = parent.ownerDocument.createElement("elib:switcher");
        var pnts = el.hasAttribute('points') ? el.hasAttribute('points') : undefined;
        var points = el.points;
        if (pnts && points && points.numberOfItems) {
            var x1 = undefined;
            var x2 = undefined;
            var y1 = undefined;
            var y2 = undefined;
            for (var i = 0; i < points.numberOfItems; i++) {
                if ((x1 == undefined || x1 >= points.getItem(i).x) && (points.getItem(i).x != undefined))
                    x1 = points.getItem(i).x;
                if ((x2 == undefined || x2 <= points.getItem(i).x) && (points.getItem(i).x != undefined))
                    x2 = points.getItem(i).x;
                if ((y1 == undefined || y1 >= points.getItem(i).y) && (points.getItem(i).y != undefined))
                    y1 = points.getItem(i).y;
                if ((y2 == undefined || y2 <= points.getItem(i).y) && (points.getItem(i).y != undefined))
                    y2 = points.getItem(i).y;
            }
            
            var xt=0;
            var yt=0;      
            var shft = designer.prototype.getTranslateShift(el);
            if (shft) {
               xt= Math.floor(shft.x);
               yt= Math.floor(shft.y);
            }
            
            var xs = Math.floor(x1);
            var ys = Math.floor(y1);
            var w = Math.floor(((x2 - x1)*1.4));
            var h = Math.floor((y2 - y1)*1.4);            
            var x0 = Math.floor((x2 + x1)/2);
            var y0 = Math.floor((y2 + y1)/2); 
            var x=x0-Math.floor(w/2)+ xt;
            var y=y0-Math.floor(h/2) + yt;  
            
            /*if (w % 5) {
                w = w - w % 5;
                if (w < 30)
                    w = 25;
                if (w < 45)
                    w = 35;
            }*/
            if (w>23)
                w=35;
            else
                w=25;
            h=w;


            if (w && h) {
                if (el.hasAttribute('id'))
                    newel.setAttribute('id', el.getAttribute('id'));
                newel.setAttribute('x', x);
                newel.setAttribute('y', y);
                newel.setAttribute('width', w);
                newel.setAttribute('height', h);
                if (el.hasAttribute('class')) {
                    var stl = el.getAttribute('class');
                    if (stl.match("str1"))
                        newel.setAttribute('environment', 'kU6');
                    else if (stl.match("str2"))
                        newel.setAttribute('environment', 'kU10');
                    else
                        newel.setAttribute('environment', 'kUKbl');
                }
                else
                    newel.setAttribute('environment', 'kU6');      
                newel.setAttribute('type', "breaker");
                parent.replaceChild(newel, el);
                return newel;
            }
        }
    }
    return el;
} 


  
        
                        
