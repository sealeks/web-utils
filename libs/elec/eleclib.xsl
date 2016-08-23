<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns="http://www.w3.org/2000/svg"
xmlns:elib="http://dvnci/elib"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:html="http://www.w3.org/TR/xhtml1"
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:exsl="http://xmlsoft.org/XSLT/namespace">
    


    <xsl:template name="eleclib">  
        <script type="text/javascript" xlink:href="../web-utils/libs/elec/js/eleclib.js"></script>   
        <!--script type="text/javascript" xlink:href="../web-utils/js_ext/jquery/jquery.min.js"></script-->
        <!--script type="text/javascript" xlink:href="../web-utils/js_ext/hightchart/highcharts.js"></script-->    
        <!--script type="text/javascript">this.addEventListener('onload', elecmover_initiate(this))</script-->             
    </xsl:template>
    
      
    <xsl:template name="apply_elib_schema">    
        <!--xsl:attribute name="xsi:schemaLocation">
            <xsl:text>../web-utils/libs/elec/maillib.xsd</xsl:text>
        </xsl:attribute-->  
    </xsl:template>
    
    
    
    <!--
    
    config popup
    
    -->
    
        <xsl:template name="apply_breakm_rect"> 
        <xsl:attribute name="x">
            <xsl:value-of select="@x + @width div 2"/>
        </xsl:attribute>
        <xsl:attribute name="y">
            <xsl:value-of select="@y"/>
        </xsl:attribute>
        <!--xsl:attribute name="height">
            <xsl:value-of select="@height"/>
        </xsl:attribute>
        <xsl:attribute name="width">
            <xsl:value-of select="@width"/>
        </xsl:attribute-->
    </xsl:template>

    <xsl:template name="elib_config_popup_row">
        <xsl:param name="token"/>
        <xsl:param name="hdr"/>
        <xsl:param name="frmt"/>
        <xsl:param name="depth"/> 
        
        <xsl:variable name="format">
            <xsl:choose> 
                <xsl:when test="not(normalize-space($frmt))=''">
                    <xsl:value-of select="$frmt"/>
                </xsl:when>  
                <xsl:otherwise>
                    <xsl:text>%3.2f</xsl:text>
                </xsl:otherwise>        
            </xsl:choose>            
        </xsl:variable> 
        
        <xsl:variable name="header">
            <xsl:choose> 
                <xsl:when test="normalize-space($hdr)=''">
                    <xsl:value-of select="$hdr"/>
                </xsl:when>  
                <xsl:otherwise>
                    <xsl:text>token</xsl:text>
                </xsl:otherwise>        
            </xsl:choose>            
        </xsl:variable>         
        
        <elib:sensor x="5"  height="22" width="156" stroke="#eee" stroke-width="1" r="4"  color1="#111"   alighn="left" fontcolor="yellow" fontstyle="font-size: 11">
            <xsl:attribute name="id">
                <xsl:value-of select="@id"/>
                <xsl:text>_popup_config_rowheader</xsl:text>
                <xsl:value-of select="$depth"/>
            </xsl:attribute>
            <xsl:attribute name="caption">
                <xsl:value-of select="$hdr"/>
            </xsl:attribute>
            <xsl:attribute name="y">
                <xsl:value-of select="30 + ($depth -1) * 24"/>
            </xsl:attribute>  
       </elib:sensor>
        <elib:sensor x="162"  height="22" width="82" stroke="#0e0" stroke-width="1" r="4"  color1="#001" caption="" alighn="right" fontcolor="#0e0" fontstyle="font-size: 11" sensorevent="valueedit">
            <xsl:attribute name="id">
                <xsl:value-of select="@id"/>
                <xsl:text>_popup_config_setter</xsl:text>
                <xsl:value-of select="$depth"/>
            </xsl:attribute>
            <xsl:attribute name="param">
                <xsl:value-of select="$token"/>
            </xsl:attribute> 
            <xsl:attribute name="format">
                <xsl:value-of select="$format"/>
            </xsl:attribute>             
            <xsl:attribute name="y">
                <xsl:value-of select="30 + ($depth -1) * 24"/>
            </xsl:attribute>              
        </elib:sensor>
    </xsl:template>  
    
    
    <xsl:template name="elib_config_popup_split" >
        <xsl:param name="str" select="."/>
        <xsl:param name="hdrs"/>
        <xsl:param name="frmts"/>
        <xsl:param name="worddiv" select="','"/>
        <xsl:param name="depth"/>
        
        <xsl:variable name="depthvar">
            <xsl:choose> 
                <xsl:when test="normalize-space($depth)=''">
                    <xsl:text>0</xsl:text>
                </xsl:when>  
                <xsl:otherwise>
                    <xsl:value-of select="$depth + 1"/>
                </xsl:otherwise>        
            </xsl:choose> 
        </xsl:variable>
        
        <xsl:choose> 
            <xsl:when test="contains($str,$worddiv)">
                <xsl:call-template name="elib_config_popup_row">
                    <xsl:with-param name="token" select="substring-before($str, $worddiv)"/>
                    <xsl:with-param name="frmt" select="substring-before($frmts, $worddiv)"/>
                    <xsl:with-param name="hdr" select="substring-before($hdrs, $worddiv)"/>
                    <xsl:with-param name="depth" select="$depthvar"/>
                </xsl:call-template>
                <xsl:call-template name="elib_config_popup_split"> 
                    <xsl:with-param name="str" select="substring-after($str, $worddiv)"/>
                    <xsl:with-param name="frmts" select="substring-after($frmts, $worddiv)"/>
                    <xsl:with-param name="hdrs" select="substring-after($hdrs, $worddiv)"/>                    
                    <xsl:with-param name="worddiv" select="$worddiv"/>
                    <xsl:with-param name="depth" select="$depthvar"/>
                </xsl:call-template>
            </xsl:when>
 
            <xsl:otherwise>
                <xsl:call-template name="elib_config_popup_row">
                    <xsl:with-param name="token" select="$str"/>
                    <xsl:with-param name="frmt" select="$frmts"/>
                    <xsl:with-param name="hdr" select="$hdrs"/>
                    <xsl:with-param name="depth" select="$depthvar"/>
                </xsl:call-template>
            </xsl:otherwise>
 
        </xsl:choose>
    </xsl:template>
      
    
    <xsl:template name="elib_config_popup">
        <xsl:param name="header"/>
        <xsl:choose>
            <xsl:when test="not(normalize-space(@config)='')"> 
            
                <xsl:variable name="headervar">
                    <xsl:choose>
                        <xsl:when test="not(normalize-space($header)='')">
                            <xsl:value-of select="$header"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>Настройки</xsl:text>
                        </xsl:otherwise>    
                    </xsl:choose>
                </xsl:variable>  
                
                <defs>
                    <script type="text/javascript">
                        
                        <xsl:text>if ((window.$$editable) &#38;&#38; (!$$editable())) { document.getElementById('</xsl:text>
                        <xsl:value-of select="@id"/>
                        <xsl:text>').addEventListener('contextmenu' ,function (ev) {
                        if (eleclib.check_click(this, event)) {  
                            eleclib.config_click(eleclib.check_click(this));
                            event.stopPropagation();
                            event.preventDefault();}});} </xsl:text>                    
                    </script>
                    <svg> 
                        <xsl:attribute name="id">
                            <xsl:value-of select="@id"/>
                            <xsl:text>_popup_config</xsl:text>
                        </xsl:attribute>                        
                
                        <xsl:variable name="popupbody">
                            <elib:sensor x="5" y="2" height="26" width="240" stroke="#ccc" stroke-width="1" r="4"  environment="midle_red"  alighn="center" fontcolor="#eee" fontstyle="font-size: 12">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@id"/>
                                    <xsl:text>_popup_config_header</xsl:text>
                                </xsl:attribute>  
                                <xsl:attribute name="caption">
                                    <xsl:choose>
                                        <xsl:when test="not(normalize-space(@config-header)='')">
                                            <xsl:value-of select="@config-header"/>
                                        </xsl:when> 
                                        <xsl:otherwise>
                                            <xsl:choose>
                                                <xsl:when test="not(normalize-space(@param)='')">
                                                     <xsl:value-of select="$headervar"/>
                                                     <xsl:text> </xsl:text>
                                                     <xsl:value-of select="@param"/>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:value-of select="$headervar"/>
                                                </xsl:otherwise>    
                                            </xsl:choose> 
                                        </xsl:otherwise>
                                    </xsl:choose>                                                                       
                                </xsl:attribute> 
                            </elib:sensor>
                            <xsl:call-template name="elib_config_popup_split">
                                <xsl:with-param name="str" select="@config"/>
                                <xsl:with-param name="hdrs" select="@config-headers"/>
                                <xsl:with-param name="frmts" select="@config-formats"/>
                                <xsl:with-param name="worddiv">,</xsl:with-param>
                                <xsl:with-param name="depth">0</xsl:with-param>
                            </xsl:call-template> 
                        </xsl:variable>
                        
                        <xsl:for-each select="exsl:node-set($popupbody)/*">
                            <xsl:choose>
                                <xsl:when test="local-name()='rect'">
                                    <xsl:call-template name="mlib_button"/>
                                </xsl:when> 
                                <xsl:when test="local-name()='sensor'">
                                    <xsl:call-template name="mlib_button"/>
                                </xsl:when>                         
                            </xsl:choose>
                        </xsl:for-each> 
                        
                    </svg> 
                </defs>
            </xsl:when>
        </xsl:choose>         
    </xsl:template>
    

     
    
    <!--   
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    ||_______________________________________________________________________________________________________________________________________||    
 
 
 
        Компонент отображающий клапан или задвижку
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    -->
    
     <!--
    
    Отображение внешнего вида
    
    -->
    
    <xsl:template name="apply_elib_switcher_shunt">    
        <polygon points="-17 117, 117 117 , 50 0"  stroke-width="1" class="elec_f_shunt" opacity="0.9"/>    
    </xsl:template>
    
    <xsl:template name="apply_elib_switcher_shunt_state">   
        <xsl:choose>                         
            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='') and boolean(@type) and not(normalize-space(@type)='') and (@type='disconnector' or @type='breakerp') ">      
                <g>
                    <xsl:attribute name="display">   
                        <xsl:text>#{ !(</xsl:text>
                    <xsl:value-of select="@pos"/> 
                    <xsl:text>sh</xsl:text>
                        <xsl:text>).valid ?  'none' : (! </xsl:text>
                    <xsl:value-of select="@pos"/> 
                    <xsl:text>sh</xsl:text>
                        <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                        <xsl:text> ) :default none } </xsl:text>                                        
                    </xsl:attribute>   
                    <xsl:call-template name="apply_elib_switcher_shunt"/>         
                </g> 
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="apply_elib_switcher_earth">    
        <polygon points="-17 117, 117 117 , 50 0" stroke-width="1" class="elec_f_earth" opacity="0.9"/>    
    </xsl:template>    
    
    <xsl:template name="apply_elib_switcher_earth_state">   
        <xsl:choose>                         
            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='') and boolean(@type) and not(normalize-space(@type)='') and (@type='breaker' or @type='breakerp')">                          
                <g>
                    <xsl:attribute name="display">   
                        <xsl:text>#{ !(</xsl:text>
                    <xsl:value-of select="@pos"/> 
                    <xsl:text>gr</xsl:text>
                        <xsl:text>).valid ?  'none' : (! </xsl:text>
                    <xsl:value-of select="@pos"/> 
                    <xsl:text>gr</xsl:text>
                        <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                        <xsl:text> ) :default none } </xsl:text>                                        
                    </xsl:attribute>   
                    <xsl:call-template name="apply_elib_switcher_earth"/>         
                </g> 
            </xsl:when>
        </xsl:choose>
    </xsl:template>    
    
    <xsl:template name="apply_elib_switcher_brk">    
        <polygon points="5 5, 95 5 , 50 90" stroke-width="1" class="elec_s_brk" opacity="0.8"/>    
    </xsl:template>     
    
    <xsl:template name="apply_elib_switcher_brk_state">   
        <xsl:choose>                         
            <xsl:when test="boolean(@brk) and not(normalize-space(@brk)='')">      
                <g>
                    <xsl:attribute name="display">   
                        <xsl:text>#{ !(</xsl:text>
                        <xsl:value-of select="@pos"/>
                        <xsl:text>).valid ?  'none' : (! </xsl:text>
                        <xsl:value-of select="@pos"/>
                        <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                        <xsl:text> ) :default none } </xsl:text>                                        
                    </xsl:attribute>   
                    <xsl:call-template name="apply_elib_switcher_brk"/>         
                </g> 
            </xsl:when>
        </xsl:choose>
    </xsl:template>        
    
    <xsl:template name="apply_elib_switcher_breakermtxt_state">  
        <xsl:choose>
            <xsl:when test="@type='breakm' and boolean(@header)">   
                <xsl:choose>
                    <xsl:when test="boolean(@captionstyle) and not(normalize-space(@captionstyle)='')">  
                        <text  text-anchor="middle">                        
                            <xsl:call-template name="apply_breakm_rect"/>
                            <xsl:attribute name="style"> 
                                <xsl:value-of select="@captionstyle"/>
                            </xsl:attribute>                            
                            <xsl:value-of select="@header"/>
                        </text>                                        
                    </xsl:when> 
                    <xsl:otherwise>
                        <text fill="yellow" stroke="none" text-anchor="middle">                        
                            <xsl:call-template name="apply_breakm_rect"/>
                            <xsl:value-of select="@header"/>
                        </text>                        
                    </xsl:otherwise>
                </xsl:choose>                 
            </xsl:when>        
        </xsl:choose>
    </xsl:template>  


    <xsl:template name="apply_elib_switchertype_breaker">    
        <path d="M 0,5 h 95 v 90 h -90 v -95" style="fill-rule:nonzero" fill="none" stroke-width="10"/>   
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype_breakerp">    
        <rect x="0" y="0" width="100" height="100"  rx="15"  ry="15" style="fill-rule:nonzero" fill="none" stroke-width="10"/>   
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_break">    
        <circle cx="50" cy="50" r="15" fill="none" stroke-width="10"/>      
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_breakm">    
          <polygon points="-17 117, 117 117 , 50 0"  stroke-width="1" class="elec_f_break" opacity="0.9"/>         
    </xsl:template>     
    
    <xsl:template name="apply_elib_switchertype_side">    
        <line x1="30"  y1="5" x2="70" y2="5" stroke-width="10"/>
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype_fside">    
        <line x1="5"  y1="5" x2="95" y2="5" stroke-width="10"/>
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_lside">    
        <path d="M 35,25 a 15,15 0 1 1 25,0" fill="none" stroke-width="10"/>
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_ctransformator">    
        <circle cx="40" cy="50" r="35" fill="none" stroke-width="10"/>
        <line x1="70"  y1="30" x2="100" y2="30" stroke-width="10"/>
        <line x1="70" y1="70" x2="100" y2="70" stroke-width="10"/>
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype_fuse">    
        <path d="M 30,5 h 40 v 90 h -40 v -95"  fill="none" stroke-width="10"/>
        <path d="M 50,0 v 100" fill="none" stroke-width="10"/>    
    </xsl:template>   
    
    <xsl:template name="apply_elib_switchertype_generator">    
        <circle cx="50" cy="50" r="45" fill="none" stroke-width="10"/>
        <path d="M 20,50 a 15,15 0 1 1 30,0 M 50,50 a 15,15 1 0 0 30,0" fill="none" stroke-width="5"/>
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype_grounding">    
        <line x1="50" y1="0"   x2="50" y2="65" stroke-width="10"/>
        <line x1="40" y1="95" x2="60" y2="95" stroke-width="10"/>
        <line x1="25" y1="80" x2="75" y2="80" stroke-width="10"/>
        <line x1="10" y1="65" x2="90" y2="65" stroke-width="10"/> 
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_arrester">    
        <path d="M 35,82 h 30" fill="none" stroke-width="6"/>
        <path d="M 35,70 h 30" fill="none" stroke-width="6"/>    
        <path d="M 50,10 v 20" fill="none" stroke-width="6"/>  
        <path d="M 50,70 v -20" fill="none" stroke-width="6"/>
        <polygon points="47 20, 53 20, 50 30" fill="none" stroke-width="5"/>
        <polygon points="47 60, 53 60, 50 50" fill="none" stroke-width="5"/>    
        <path d="M 30,5 h 40 v 90 h -40 v -95"  fill="none" stroke-width="10"/>     
    </xsl:template>    
    
   
    <xsl:template name="apply_elib_switchertype_coil">    
        <path d="M 5,50 a 15,15 0 1 1 30,0 M 35,50 a 15,15 0 1 1 30,0 M 65,50 a 15,15 0 1 1 30,0" fill="none" stroke-width="5"/>
    </xsl:template>
    
    
    <xsl:template name="apply_elib_switchertype_compensator">    
        <path d="M 30,5 h 40 v 90 h -40 v -95"  fill="none" stroke-width="10"/>
        <line x1="50" y1="20"   x2="50" y2="40" stroke-width="6"/>
        <line x1="40" y1="40" x2="60" y2="40" stroke-width="6"/>
        <line x1="40" y1="60" x2="60" y2="60" stroke-width="6"/>
        <line x1="50" y1="60" x2="50" y2="80" stroke-width="6"/>     
    </xsl:template> 
    
    
    <xsl:template name="apply_elib_switchertype_condenser">    
        <line x1="50" y1="20"   x2="50" y2="40" stroke-width="10"/>
        <line x1="20" y1="40" x2="80" y2="40" stroke-width="10"/>
        <line x1="20" y1="60" x2="80" y2="60" stroke-width="10"/>
        <line x1="50" y1="60" x2="50" y2="80" stroke-width="10"/> 
    </xsl:template>
    
    
    <xsl:template name="apply_elib_switchertype_kvpu">    
        <path d="M 30,5 h 40 v 90 h -40 v -95"  fill="none" stroke-width="10"/>
        <line x1="50" y1="65"   x2="50" y2="80" stroke-width="4"/>
        <line x1="50" y1="20"   x2="50" y2="60" stroke-width="4"/>
        <line x1="38" y1="65"   x2="62" y2="65" stroke-width="4"/>   
        <polygon points="46 50, 54 50, 50 56" fill="none" stroke-width="10"/>  
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype_reactor">    
        <path d="M50,95 v -45  h-45 a45,45 0 1,0 45,-45 " fill="none" stroke-width="10"/> 
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_suppressor">    
        <path d="M 30,5 h 40 v 90 h -40 v -95"  fill="none" stroke-width="10"/>
        <path d="M 86, 10 v 15 l -72, 50  v 15"  fill="none" stroke-width="6"/>    
    </xsl:template>    
    
    <xsl:template name="apply_elib_switchertype_synccondenser">    
        <circle cx="50" cy="50" r="45" fill="none" stroke-width="10"/>        
        <line x1="30"  y1="32" x2="70" y2="32" stroke-width="8"/>
        <line x1="30" y1="68" x2="70" y2="68" stroke-width="8"/> 
    </xsl:template>    
        
    <xsl:template name="apply_elib_switchertype_transformator1"> 
        <circle cx="50" cy="50" r="46" fill="none" stroke-width="8"/>           
    </xsl:template>            
        
    <xsl:template name="apply_elib_switchertype_transformator2">    
        <circle cx="50" cy="30" r="27" fill="none" stroke-width="6"/>
        <circle cx="50" cy="70" r="27" fill="none" stroke-width="6"/>        
    </xsl:template>      
    
    <xsl:template name="apply_elib_switchertype_transformator3">    
        <circle cx="50" cy="32" r="26" fill="none" stroke-width="5"/>
        <circle cx="29" cy="70" r="26" fill="none" stroke-width="5"/>
        <circle cx="71" cy="70" r="26" fill="none" stroke-width="5"/>         
    </xsl:template>            
        
    <xsl:template name="apply_elib_switchertype_transformator4">    
        <circle cx="50" cy="25" r="22" fill="none" stroke-width="5"/>
        <circle cx="50" cy="75" r="22" fill="none" stroke-width="5"/>
        <circle cy="50" cx="25" r="22" fill="none" stroke-width="5"/>
        <circle cy="50" cx="75" r="22" fill="none" stroke-width="5"/>           
    </xsl:template>         
    
    <xsl:template name="apply_elib_switchertype_disconnector">    
        <line x1="30"  y1="5" x2="70" y2="5" stroke-width="10"/>
        <line x1="30" y1="95" x2="70" y2="95" stroke-width="10"/>        
        <rect x="-5" y="-5" width="110" height="110" stroke-width="4" fill="none"/> 
    </xsl:template>         

    <xsl:template name="apply_elib_switchertype_key">
        <line x1="50" y1="100" x2="50" y2="90" stroke-width="10"/>       
        <line x1="40" y1="90" x2="60" y2="90" stroke-width="5"/>  
    </xsl:template>   
    
    <xsl:template name="apply_elib_switchertype_station"> 
        <rect x="0" y="0" width="100" height="100" fill="none" stroke-width="10"/>  
        <rect x="30" y="30" width="40" height="40" fill="none" stroke-width="40"/>    
            <!--xsl:attribute name="class">      
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@environment)='')"> 
                        <xsl:text>on</xsl:text>
                        <xsl:value-of select="@environment"/> 
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>onkU110</xsl:text>                        
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute> 
        </rect-->         
        <polygon points="50 18, 18 82, 82 82" fill="black" stroke="black" stroke-width="0"/>                    
    </xsl:template>     
    
    <xsl:template name="apply_elib_switchertype_stationp">        
        <circle cx="50" cy="50" r="50" fill="none" stroke-width="10"/>  
        <circle cx="50" cy="50" r="20" fill="none" stroke-width="40"/>  
            <!--xsl:attribute name="class">      
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@environment)='')"> 
                        <xsl:text>on</xsl:text>
                        <xsl:value-of select="@environment"/> 
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>onkU110</xsl:text>                        
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute> 
        </circle-->        
        <polygon points="50 22, 26 74, 74 74" fill="black" stroke="black" stroke-width="0"/>                 
    </xsl:template>     
      
    <xsl:template name="apply_elib_switchertype_defstate">
        <xsl:choose>                         
            <xsl:when test="normalize-space(@initstate)='on'">  
                <rect x="102" y="-18" width="18" height="18" stroke-width="0" class="elec_sf_on"/> 
            </xsl:when>
            <xsl:when test="normalize-space(@initstate)='off'">  
                <rect x="102" y="-18" width="18" height="18" stroke-width="0" class="elec_sf_off"/>                 
            </xsl:when>            
            <xsl:otherwise>             
            </xsl:otherwise>     
        </xsl:choose>          
    </xsl:template>
    
    <xsl:template name="apply_elib_switchertype"> 
        <xsl:choose>                         
            <xsl:when test="boolean(@type) and not(normalize-space(@type)='')">                             
                <xsl:choose>
                    <xsl:when test="@type='generator'"> 
                        <xsl:call-template name="apply_elib_switchertype_generator"/>
                    </xsl:when>
                    <xsl:when test="@type='station'"> 
                        <xsl:call-template name="apply_elib_switchertype_station"/>
                    </xsl:when>            
                    <xsl:when test="@type='stationp'"> 
                        <xsl:call-template name="apply_elib_switchertype_stationp"/>
                    </xsl:when>                             
                    <xsl:when test="@type='grounding'"> 
                        <xsl:call-template name="apply_elib_switchertype_grounding"/>
                    </xsl:when>                    
                    <xsl:when test="@type='arrester'"> 
                        <xsl:call-template name="apply_elib_switchertype_arrester"/>
                    </xsl:when>                  
                    <xsl:when test="@type='coil'"> 
                        <xsl:call-template name="apply_elib_switchertype_coil"/>
                    </xsl:when>
                    <xsl:when test="@type='compensator'">
                        <xsl:call-template name="apply_elib_switchertype_compensator"/> 
                    </xsl:when> 
                    <xsl:when test="@type='condenser'">
                        <xsl:call-template name="apply_elib_switchertype_condenser"/> 
                    </xsl:when>
                    <xsl:when test="@type='ctransformator'">
                        <xsl:call-template name="apply_elib_switchertype_ctransformator"/> 
                    </xsl:when>
                    <xsl:when test="@type='fuse'">
                        <xsl:call-template name="apply_elib_switchertype_fuse"/> 
                    </xsl:when>                   
                    <xsl:when test="@type='kvpu'">
                        <xsl:call-template name="apply_elib_switchertype_kvpu"/> 
                    </xsl:when>
                    <xsl:when test="@type='reactor'">
                        <xsl:call-template name="apply_elib_switchertype_reactor"/> 
                    </xsl:when>              
                    <xsl:when test="@type='suppressor'">
                        <xsl:call-template name="apply_elib_switchertype_suppressor"/> 
                    </xsl:when>                     
                    <xsl:when test="@type='synccondenser'">
                        <xsl:call-template name="apply_elib_switchertype_synccondenser"/> 
                    </xsl:when>        
                    <xsl:when test="@type='side'">
                        <xsl:call-template name="apply_elib_switchertype_side"/> 
                    </xsl:when> 
                    <xsl:when test="@type='lside'">
                        <xsl:call-template name="apply_elib_switchertype_lside"/> 
                    </xsl:when>                                         
                    <xsl:when test="@type='transformator1'">
                        <xsl:call-template name="apply_elib_switchertype_transformator1"/> 
                    </xsl:when>                    
                    <xsl:when test="@type='transformator2'">
                        <xsl:call-template name="apply_elib_switchertype_transformator2"/> 
                    </xsl:when>        
                    <xsl:when test="@type='transformator3'">
                        <xsl:call-template name="apply_elib_switchertype_transformator3"/> 
                    </xsl:when>                    
                    <xsl:when test="@type='transformator4'">
                        <xsl:call-template name="apply_elib_switchertype_transformator4"/> 
                    </xsl:when>     
                    <xsl:when test="@type='breakm'">
                        <xsl:call-template name="apply_elib_switchertype_breakm"/>  
                    </xsl:when>           
                    <xsl:when test="@type='breakg'">
                        <xsl:call-template name="apply_elib_switchertype_breakm"/>  
                    </xsl:when>                                                            
                    <xsl:when test="@type='break'">
                        <xsl:call-template name="apply_elib_switchertype_break"/>                         
                        <xsl:choose>             
                            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">                  
                                <g>
                                    <xsl:attribute name="display">   
                                        <xsl:text>#{ !(</xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text>).valid ?  'none' : ( </xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                                        <xsl:text> ) :default none } </xsl:text>                                        
                                    </xsl:attribute>   
                                    <line x1="10" y1="10" x2="90" y2="90" stroke-width="10" class="elec_s_brk"/> 
                                    <line x1="10" y1="90" x2="90" y2="10" stroke-width="10" class="elec_s_brk"/>                              
                                </g>         
                            </xsl:when>  
                        </xsl:choose>                                  
                    </xsl:when>                     
                    <xsl:when test="@type='disconnector'">
                        <xsl:call-template name="apply_elib_switchertype_disconnector"/>                         
                        <xsl:choose>             
                            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">
                                <g>
                                    <xsl:attribute name="class">
                                        <xsl:choose>     
                                            <xsl:when test="normalize-space(@initstate)='on'">  
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off_high' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:when>
                                            <xsl:when test="normalize-space(@initstate)='off'">        
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on_high' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>                                                    
                                            </xsl:when>            
                                            <xsl:otherwise>                                                                
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:otherwise>                
                                        </xsl:choose>            
                                    </xsl:attribute>                                    
                                    <line x1="50" y1="20" x2="50" y2="80" stroke-width="10"> 
                                        <xsl:attribute name="display">                                       
                                            <xsl:text>#{ !(</xsl:text>
                                            <xsl:value-of select="@pos"/>
                                            <xsl:text>).valid ?  'none' : ( </xsl:text>
                                            <xsl:value-of select="@pos"/>
                                            <xsl:text> ? 'inherit'  : 'none' </xsl:text>
                                            <xsl:text> ) :default none } </xsl:text>                                        
                                        </xsl:attribute>                                  
                                    </line>
                                    <line x1="20" y1="50" x2="80" y2="50" stroke-width="10">   
                                        <xsl:attribute name="display">
                                            <xsl:text>#{ !(</xsl:text>
                                            <xsl:value-of select="@pos"/>
                                            <xsl:text>).valid ?  'none' : ( </xsl:text>
                                            <xsl:value-of select="@pos"/>
                                            <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                                            <xsl:text> ) :default none } </xsl:text>                                       
                                        </xsl:attribute>                                             
                                    </line>      
                                </g>                                
                            </xsl:when>       
                            <xsl:otherwise>
                                <line x1="50" y1="20" x2="50" y2="80" stroke-width="10">   
                                </line>                              
                            </xsl:otherwise>     
                        </xsl:choose>                                  
                    </xsl:when>        
                    <xsl:when test="@type='key'">
                        <xsl:call-template name="apply_elib_switchertype_key"/>                         
                        <xsl:choose>             
                            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">
                                <line x1="50" y1="10" x2="50" y2="90" stroke-width="10"> 
                                    <xsl:attribute name="display">                                       
                                        <xsl:text>#{ !(</xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text>).valid ?  'none' : ( </xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text> ? 'inherit'  : 'none' </xsl:text>
                                        <xsl:text> ) :default none } </xsl:text>                                        
                                    </xsl:attribute>                                  
                                </line>
                                <line  x1="50" y1="90" x2="90" y2="15" stroke-width="10">   
                                    <xsl:attribute name="display">
                                        <xsl:text>#{ !(</xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text>).valid ?  'none' : ( </xsl:text>
                                        <xsl:value-of select="@pos"/>
                                        <xsl:text> ? 'none'  : 'inherit' </xsl:text>
                                        <xsl:text> ) :default none } </xsl:text>                                       
                                    </xsl:attribute>                                             
                                </line>                                      
                            </xsl:when>       
                            <xsl:otherwise>
                                <line x1="50" y1="20" x2="50" y2="80" stroke-width="10">   
                                </line>                              
                            </xsl:otherwise>     
                        </xsl:choose>                                  
                    </xsl:when>     
                    <xsl:when test="@type='breaker'">
                        <xsl:call-template name="apply_elib_switchertype_breaker"/>     
                        <xsl:choose>             
                            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">                             
                                <rect x="10" y="10" width="80" height="80" stroke-width="0">                                                 
                                    <xsl:attribute name="class">
                                        <xsl:choose>     
                                            <xsl:when test="normalize-space(@initstate)='on'">  
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off_high' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:when>
                                            <xsl:when test="normalize-space(@initstate)='off'">        
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on_high' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>                                                    
                                            </xsl:when>            
                                            <xsl:otherwise>                                                                
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:otherwise>                
                                        </xsl:choose>                                         
                                    </xsl:attribute>
                                </rect>
                            </xsl:when>            
                        </xsl:choose>                                   
                    </xsl:when>            
                    <xsl:when test="@type='breakerp'">
                        <xsl:call-template name="apply_elib_switchertype_breakerp"/>     
                        <xsl:choose>             
                            <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">                             
                                <rect x="10" y="10" width="80" height="80" rx="15" ry="15" stroke-width="0"> 
                                    <xsl:attribute name="class">
                                        <xsl:choose>     
                                            <xsl:when test="normalize-space(@initstate)='on'">  
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off_high' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:when>
                                            <xsl:when test="normalize-space(@initstate)='off'">        
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on_high' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>                                                    
                                            </xsl:when>            
                                            <xsl:otherwise>                                                                
                                                <xsl:text>#{ !(</xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text>).valid ?  'elec_sf_invalid' : ( </xsl:text>
                                                <xsl:value-of select="@pos"/>
                                                <xsl:text> ? 'elec_sf_on' : 'elec_sf_off' </xsl:text>
                                                <xsl:text> ) :default elec_sf_undef } </xsl:text>    
                                            </xsl:otherwise>                
                                        </xsl:choose>  
                                    </xsl:attribute>
                                </rect>
                            </xsl:when>            
                        </xsl:choose>                         
                    </xsl:when>                                                                                                                       
                    <xsl:otherwise>
                        <xsl:call-template name="apply_elib_switchertype_compensator"/>                                                             
                    </xsl:otherwise>                     
                </xsl:choose>
            </xsl:when> 
            <xsl:otherwise>
                <xsl:call-template name="apply_elib_switchertype_compensator"/>                   
            </xsl:otherwise>                           
        </xsl:choose>    
    </xsl:template>
    
    
    <xsl:template name="apply_elib_switchertyped"> 
        <xsl:choose>                         
            <xsl:when test="boolean(@type) and not(normalize-space(@type)='')">                             
                <xsl:choose>
                    <xsl:when test="@type='generator'"> 
                        <xsl:call-template name="apply_elib_switchertype_generator"/>
                    </xsl:when>            
                </xsl:choose>
            </xsl:when>                            
        </xsl:choose>       
    </xsl:template>
    
     <!--
    
    Отображение аттоибута cursor
    
    -->  


    
    <xsl:template name="apply_elib_switchertype_cursor">
        <xsl:choose>                        
            <xsl:when test="not(normalize-space(@pos)='') or @type='breakm' or @type='breakg'"> 
                <xsl:attribute name="cursor">
                    <xsl:text>pointer</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="cursor">
                    <xsl:text>none</xsl:text>
                </xsl:attribute>
            </xsl:otherwise>        
        </xsl:choose>    
    </xsl:template>
    
    
    <!--
    
    Описание логики состояния 
    
    -->  
    
    
    <xsl:template name="apply_elib_switchertype_state"> 
        <g class="none">
            <xsl:variable name="envir"> 
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@environment)='')"> 
                        <xsl:value-of select="@environment"/> 
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>kU110</xsl:text>                        
                    </xsl:otherwise>
                </xsl:choose>                
            </xsl:variable>
            <!--xsl:choose>                              
                <xsl:when test="not(@filter='')">
                    <xsl:attribute name="filter">
                        <xsl:text>url(#filter_lib2)</xsl:text>
                    </xsl:attribute>
                </xsl:when>
            </xsl:choose--> 
            <xsl:choose>                        
                <xsl:when test="boolean(@state) and not(normalize-space(@state)='')"> 
                    <xsl:attribute name="class">
                        <xsl:text>#{ !(</xsl:text>
                        <xsl:value-of select="@state"/>
                        <xsl:text>).valid  ? 'offkUunvalid'  : ((</xsl:text>
                        <xsl:value-of select="@state"/>
                        <xsl:text>)  ? 'on</xsl:text>
                        <xsl:value-of select="$envir"/>
                        <xsl:text>':  'offkUNone') :default offkUunvalid}</xsl:text> 
                    </xsl:attribute>
                </xsl:when>          
                <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')"> 
                    <xsl:attribute name="class">
                        <xsl:text>#{ !(</xsl:text>
                        <xsl:value-of select="@pos"/>
                        <xsl:text>).valid  ? 'offkUunvalid'  : ((</xsl:text>
                        <xsl:value-of select="@pos"/>
                        <xsl:text>)  ? 'on</xsl:text>
                        <xsl:value-of select="$envir"/>
                        <xsl:text>':  'offkUNone') :default offkUunvalid}</xsl:text> 
                    </xsl:attribute>
                </xsl:when>                           
                <xsl:otherwise> 
                    <xsl:attribute name="class">
                        <xsl:text>on</xsl:text>
                        <xsl:value-of select="$envir"/>  
                    </xsl:attribute>
                </xsl:otherwise> 
            </xsl:choose>              
            <xsl:call-template name="apply_elib_switchertype"/> 
        </g>
    </xsl:template> 

    

    
      <!--
    
    Установка функций управления
    
    -->
    
    
    <xsl:template name="apply_elib_switchertype_event"> 
        <xsl:choose>
            <xsl:when test="@type='breakm'">
                <xsl:attribute name="onload">
                    <xsl:text>elecmover_registrate(event.target)</xsl:text>                
                </xsl:attribute>      
                <xsl:attribute name="onclick">
                    <xsl:text>if (this.getAttribute('cursor')=='pointer') {</xsl:text> 
                    <xsl:text>eleclib.switcher_popup(this, '');};</xsl:text>
                </xsl:attribute>                                             
            </xsl:when>  
            <xsl:when test="@type='breakg'">     
                <xsl:attribute name="onmousedown">
                    <xsl:text>elecmover_generate(this, event)</xsl:text>
                </xsl:attribute>                                             
            </xsl:when>            
            <xsl:otherwise>
                <xsl:choose>             
                    <xsl:when test="boolean(@pos)">      
                        <xsl:attribute name="onclick">
                            <xsl:text>if (this.getAttribute('cursor')=='pointer') {</xsl:text> 
                            <xsl:text>eleclib.switcher_popup(this, '');};</xsl:text>
                        </xsl:attribute>                   
                    </xsl:when>               
                </xsl:choose>                        
            </xsl:otherwise> 
        </xsl:choose>                 
    </xsl:template>  
    

    
    
   <xsl:template name="apply_elib_switchertype_popup">
       <defs>
           
            <!--xsl:variable name="typecontrol">
                <xsl:choose>
                    <xsl:when test="boolean(@type) and not(normalize-space(@type)='')">
                        <xsl:text>pes</xsl:text>
                    </xsl:when>
                    <xsl:when test="not(normalize-space(@pos)='') and not(normalize-space(@earth)='')">
                        <xsl:text>pe</xsl:text>
                    </xsl:when> 
                    <xsl:when test="not(normalize-space(@pos)='')  and not(normalize-space(@shunt)='')">
                        <xsl:text>ps</xsl:text>
                    </xsl:when>
                    <xsl:when test="not(normalize-space(@pos)='')">
                        <xsl:text>p</xsl:text>
                    </xsl:when>                    
                </xsl:choose>
            </xsl:variable-->
            
           <xsl:variable name="earth">
               <xsl:choose>                         
                   <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">                             
                       <xsl:value-of select="@pos"/> 
                       <xsl:text>gr</xsl:text>
                   </xsl:when>
                   <xsl:otherwise>
                       <xsl:text></xsl:text>
                   </xsl:otherwise>                                       
               </xsl:choose>                
           </xsl:variable>                        
            
        <xsl:variable name="shunt">
            <xsl:choose>                         
                <xsl:when test="boolean(@pos) and not(normalize-space(@pos)='')">                             
                    <xsl:value-of select="@pos"/> 
                    <xsl:text>sh</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text></xsl:text>
                </xsl:otherwise>                                       
            </xsl:choose>                
        </xsl:variable>     
 
           <xsl:variable name="typecontrol">           
               <xsl:choose>                         
                   <xsl:when test="boolean(@type) and not(normalize-space(@type)='')">                             
                       <xsl:choose>
                           <xsl:when test="@type='station'">
                               <xsl:text>p</xsl:text>
                           </xsl:when>                           
                           <xsl:when test="@type='break'">
                               <xsl:text>p</xsl:text>
                           </xsl:when>
                           <xsl:when test="@type='disconnector'">
                               <xsl:text>ps</xsl:text>
                           </xsl:when>
                           <xsl:when test="@type='breaker'">
                               <xsl:text>pe</xsl:text>
                           </xsl:when>           
                           <xsl:when test="@type='breakerp'">
                               <xsl:text>pes</xsl:text>
                           </xsl:when>            
                           <xsl:otherwise>
                               <xsl:text>p</xsl:text>
                           </xsl:otherwise>                 
                       </xsl:choose>
                   </xsl:when>
                   <xsl:otherwise>
                       <xsl:text>pes</xsl:text>
                   </xsl:otherwise>                        
               </xsl:choose>
           </xsl:variable>                            
            
            <xsl:variable name="switcherkind"> 
                    <xsl:choose>
                        <xsl:when test="normalize-space(@type)='break'">
                            <xsl:text>break</xsl:text>
                        </xsl:when>             
                        <xsl:when test="normalize-space(@type)='disconnector'">
                            <xsl:text>key</xsl:text>
                        </xsl:when>                                              
                        <xsl:otherwise>
                            <xsl:text>breaker</xsl:text>
                        </xsl:otherwise>    
                    </xsl:choose>        
            </xsl:variable>
            
            <xsl:variable name="oncaption">
                    <xsl:choose>
                        <xsl:when test="$switcherkind='break'">
                            <xsl:text>Восстановить</xsl:text>
                        </xsl:when> 
                        <xsl:when test="$switcherkind='key'">
                            <xsl:text>Включить</xsl:text>
                        </xsl:when>                         
                        <xsl:otherwise>
                            <xsl:text>Включить</xsl:text>
                        </xsl:otherwise>    
                    </xsl:choose>                
            </xsl:variable>
            
            <xsl:variable name="offcaption">
                    <xsl:choose>
                        <xsl:when test="$switcherkind='break'">
                            <xsl:text>Разорвать</xsl:text>
                        </xsl:when>                         
                        <xsl:when test="$switcherkind='key'">
                            <xsl:text>Отключить</xsl:text>
                        </xsl:when> 
                        <xsl:otherwise>
                            <xsl:text>Отключить</xsl:text>
                        </xsl:otherwise>    
                    </xsl:choose>                
            </xsl:variable> 
            
            <xsl:variable name="stopcaption">
                    <xsl:choose>
                        <xsl:when test="($switcherkind='breaker')">
                            <xsl:text>Отключить</xsl:text>
                        </xsl:when> 
                        <xsl:otherwise>
                            <xsl:text>Отключить</xsl:text>
                        </xsl:otherwise>    
                    </xsl:choose>                
            </xsl:variable>

            
            <xsl:variable name="fontstyle">
                <xsl:text> font-size: 14 ; fill: white; </xsl:text>    
            </xsl:variable>             
            
            <xsl:variable name="fullvalid">
                <xsl:text></xsl:text>    
            </xsl:variable>                     
         
           <svg width="100%" height="100%"> 
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                    <xsl:text>_popup</xsl:text>
                </xsl:attribute>
                
                <xsl:attribute name="viewBox">
                    <xsl:text>0 0 200 180</xsl:text>                    
                </xsl:attribute>
                
                <xsl:variable name="popupbody">                
                    <xsl:choose>
                        <xsl:when test="normalize-space(@type)='breakm'">
                            <sensor x="5" y="10" width="190" height="30"  environment="dark_gray" caption="Комментарий" alighn="center" fontcolor="#eee" r="10" stroke="#eee" stroke-width="1">
                            </sensor>
                            <sensor x="5" y="50" width="190" height="60" sensorevent="captionedit" environment="dark_gray" caption="{@header}" alighn="center" fontcolor="#eee" r="10" stroke="#eee" stroke-width="1"  cmd="{@pos}">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@id"/>
                                    <xsl:text>_popup_edittext</xsl:text>
                                </xsl:attribute>                                                               
                            </sensor>
                            <button x="5" y="120" width="190" height="50"  fontstyle="font-size: 16; fill: #eee;" caption="Удалить" oncaption="Удалить" kind="red" r="5">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@id"/>
                                    <xsl:text>_popup_button</xsl:text>
                                </xsl:attribute> 
                                <xsl:attribute name="onclick">
                                    <xsl:text> elecmover.deleteElement(this, '</xsl:text>
                                    <xsl:value-of select="@id"/>
                                    <xsl:text>' , '</xsl:text>                                    
                                    <xsl:value-of select="@header"/>
                                    <xsl:text>' , '</xsl:text>                                    
                                    <xsl:value-of select="@pos"/>                                    
                                    <xsl:text>')</xsl:text>                                    
                                </xsl:attribute>                                                                
                            </button>                            
                        </xsl:when>                                                         
                        <xsl:otherwise>              
                            <sensor x="5" y="10" width="190" height="60" environment="dark_gray" caption="{@header}" alighn="center" fontcolor="#eee" r="10" stroke="#eee" stroke-width="1">
                            </sensor>
                            <xsl:choose>
                                <xsl:when test="$typecontrol='pes'">
                                    <button x="5" y="80" width="190" height="30"  param="{@pos}"  state="{@pos}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="{$oncaption}" oncaption="{$offcaption}" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_button</xsl:text>
                                        </xsl:attribute>     
                                    </button>  
                                    <button x="5" y="113" width="190" height="30"  param="{$earth}"  state="{$earth}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="Заземлить" oncaption="Снять заземление" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_buttonearth</xsl:text>
                                        </xsl:attribute>                           
                                    </button>
                                    <button x="5" y="144" width="190" height="30" param="{$shunt}"  state="{$shunt}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="Зашунтировать" oncaption="Снять шунт" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_buttonshunt</xsl:text>
                                        </xsl:attribute> 
                                    </button>                      
                                </xsl:when> 
                                <xsl:when test="$typecontrol='pe'">
                                    <button x="5" y="80" width="190" height="40"  param="{@pos}"  state="{@pos}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="{$oncaption}" oncaption="{$offcaption}" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_button</xsl:text>
                                        </xsl:attribute>     
                                    </button>  
                                    <button x="5" y="134" width="190" height="40"  param="{$earth}"  state="{$earth}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="Заземлить" oncaption="Снять заземление" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_buttonearth</xsl:text>
                                        </xsl:attribute>                           
                                    </button>                 
                                </xsl:when>         
                                <xsl:when test="$typecontrol='ps'">
                                    <button x="5" y="80" width="190" height="40"  param="{@pos}"  state="{@pos}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="{$oncaption}" oncaption="{$offcaption}" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_button</xsl:text>
                                        </xsl:attribute>     
                                    </button>  
                                    <button x="5" y="134" width="190" height="40" param="{$shunt}"  state="{$shunt}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="Зашунтировать" oncaption="Снять шунт" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_buttonshunt</xsl:text>
                                        </xsl:attribute> 
                                    </button>                      
                                </xsl:when>                                       
                                <xsl:when test="$typecontrol='p'">
                                    <button x="5" y="80" width="190" height="90" param="{@pos}"  state="{@pos}" type="tumbler" fontstyle="font-size: 16; fill: #eee;" caption="{$oncaption}" oncaption="{$offcaption}" kind="gr" disable="{$fullvalid}" r="5">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="@id"/>
                                            <xsl:text>_popup_button</xsl:text>
                                        </xsl:attribute>                                
                                    </button>
                                </xsl:when> 
                            </xsl:choose>
                        </xsl:otherwise>   
                    </xsl:choose>
                </xsl:variable>                    
                
                <xsl:for-each select="exsl:node-set($popupbody)/*">
                    <xsl:choose>
                        <xsl:when test="local-name()='button'">
                            <xsl:call-template name="mlib_button"/>
                        </xsl:when>
                        <xsl:when test="local-name()='rect'">
                            <xsl:call-template name="mlib_button"/>
                        </xsl:when> 
                        <xsl:when test="local-name()='sensor'">
                            <xsl:call-template name="mlib_sensor"/>
                        </xsl:when>                         
                    </xsl:choose>
                </xsl:for-each>    
                
           </svg>               
       </defs>                   
   </xsl:template>       
    
    
   <xsl:template name="apply_elibswich_cental_rotate">    
       <xsl:choose>
           <xsl:when test="not(normalize-space(@rotate)='')">
               <xsl:attribute name="transform">
                   <xsl:text>rotate(</xsl:text>
                   <xsl:value-of select="@rotate"/>
                   <xsl:text>,</xsl:text>
                   <xsl:value-of select="50"/>
                   <xsl:text>,</xsl:text>
                   <xsl:value-of select="50"/>
                   <xsl:text>)</xsl:text>
               </xsl:attribute>
           </xsl:when>
       </xsl:choose>
   </xsl:template>     
    
  
  
        <!--
    
    Основной обработчик
    
    -->
      
    
    <xsl:template match="//elib:switcher" >   
        <g>       
      
            <xsl:attribute name="desc">
                <xsl:if test="boolean(@on)">
                    <xsl:value-of select="@state"/>
                </xsl:if>
            </xsl:attribute>
                    
            <xsl:attribute name="header">
                <xsl:if test="boolean(@header)">
                    <xsl:value-of select="@header"/>
                </xsl:if>
            </xsl:attribute> 
            
            <!--xsl:attribute name="title">
                 <xsl:text>Tit</xsl:text>
                <xsl:if test="boolean(@header)">
                    <xsl:value-of select="@header"/>
                </xsl:if>
            </xsl:attribute-->             
            
            <xsl:call-template name="apply_id"/>
            
            <xsl:call-template name="apply_elib_schema"/>
                       
            <!--xsl:call-template name="apply_cental_rotate"/-->
            
            <xsl:call-template name="apply_rect"/>
            
            <!--xsl:call-template  name="apply_visible"/-->
            
            <xsl:call-template name="apply_svg_g_visible"/> 
                                                                               
            <xsl:call-template name="apply_elib_switchertype_cursor"/>
                       
            <xsl:call-template name="apply_elib_switchertype_event"/>
            
            <xsl:call-template name="apply_elib_switchertype_popup"/>

            <rect fill="white" stroke="white" opacity="0">
                <xsl:call-template name="apply_rect"/> 
            </rect>          
                      
            <svg viewBox="-20 -20 140 140" preserveAspectRatio="none"> 
                

                <xsl:call-template name="apply_rect"/>
                
                <g>
                        
                    <xsl:call-template name="apply_elibswich_cental_rotate"/>
                    
                    <xsl:call-template name="apply_elib_switchertype_state"/>
                    
                </g>
                
                <xsl:call-template name="apply_elib_switchertype_defstate"/>
                       
                <xsl:call-template name="apply_elib_switcher_earth_state"/>
                
                <xsl:call-template name="apply_elib_switcher_shunt_state"/>         
                
                <!--xsl:call-template name="apply_elib_switcher_brk"/-->       
                
            </svg>
            
            <xsl:call-template name="apply_elib_switcher_breakermtxt_state"/>

            
        </g> 
        
        
    </xsl:template>
    
    
    
    
     
    <!--   
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    ||_______________________________________________________________________________________________________________________________________||    
 
 
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    -->  
    
    
    <xsl:template name="apply_elib_path_main">
        <path fill="none">
   
            <xsl:attribute name="d">
                <xsl:choose>                              
                    <xsl:when test="not(@d='')">  
                        <xsl:value-of select="@d"/>
                    </xsl:when>   
                    <xsl:otherwise> </xsl:otherwise>
                </xsl:choose>    
            </xsl:attribute>
            
            
            <xsl:attribute name="stroke-width">
                <xsl:choose>
                    <xsl:when test="not(@stroke-width='')">  
                        <xsl:value-of select="@stroke-width"/>
                    </xsl:when>   
                    <xsl:otherwise>
                        <xsl:text>3</xsl:text>
                    </xsl:otherwise>
                </xsl:choose> 
            </xsl:attribute> 
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@state)='')">  
                        <xsl:choose>
                            <xsl:when test="not(normalize-space(@environment)='')">  
                                <xsl:text>#{ !(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>).valid  ? 'offkUunvalid'  : (!(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>)  ? 'offkUNone' :  'on</xsl:text>
                                <xsl:value-of select="@environment"/>
                                <xsl:text>') :default offkUunvalid}</xsl:text>                                 
                            </xsl:when>   
                            <xsl:otherwise>    
                                <xsl:text>#{ !(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>).valid  ? 'offkUunvalid'  : (!(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>)  ? 'offkUNone' :  'onkUlow' :default offkUunvalid}</xsl:text>                                       
                            </xsl:otherwise>
                        </xsl:choose>                          
                    </xsl:when>   
                    <xsl:otherwise>       
                        <xsl:choose>
                            <xsl:when test="not(normalize-space(@environment)='')">  
                                <xsl:text>on</xsl:text>      
                                <xsl:value-of select="@environment"/>                         
                            </xsl:when>   
                            <xsl:otherwise>    
                                <xsl:text>offkUNone</xsl:text>                                       
                            </xsl:otherwise>
                        </xsl:choose> 
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>                
            
                     
        </path>        
        
    </xsl:template>
    


    
    
    <xsl:template match="//elib:epath" >
        <g>    
            <xsl:call-template name="apply_id"/>            
            <xsl:call-template name="apply_elib_schema"/>
            <xsl:call-template name="apply_svg_g_visible"/> 
            <xsl:call-template name="apply_elib_path_main"/>
            
        </g> 

    </xsl:template>   
 
 
    <!--   
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
 
 
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    
    
    -->   
    
    <xsl:template name="apply_elib_line_main">
        <line fill="none">
   
            <xsl:call-template name="apply_svg_x1"/>
            <xsl:call-template name="apply_svg_y1"/>
            <xsl:call-template name="apply_svg_x2"/>
            <xsl:call-template name="apply_svg_y2"/>          
            
            
            <xsl:attribute name="stroke-width">
                <xsl:choose>
                    <xsl:when test="not(@stroke-width='')">  
                        <xsl:value-of select="@stroke-width"/>
                    </xsl:when>   
                    <xsl:otherwise>
                        <xsl:text>3</xsl:text>
                    </xsl:otherwise>
                </xsl:choose> 
            </xsl:attribute> 
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@state)='')">  
                        <xsl:choose>
                            <xsl:when test="not(normalize-space(@environment)='')">  
                                <xsl:text>#{ !(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>).valid  ? 'offkUunvalid'  : (!(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>)  ? 'offkUNone' :  'on</xsl:text>
                                <xsl:value-of select="@environment"/>
                                <xsl:text>') :default offkUunvalid}</xsl:text>                                 
                            </xsl:when>   
                            <xsl:otherwise>    
                                <xsl:text>#{ !(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>).valid  ? 'offkUunvalid'  : (!(</xsl:text>
                                <xsl:value-of select="@state"/>
                                <xsl:text>)  ? 'offkUNone' :  'onkUlow' :default offkUunvalid}</xsl:text>                                       
                            </xsl:otherwise>
                        </xsl:choose>                          
                    </xsl:when>   
                    <xsl:otherwise>       
                        <xsl:choose>
                            <xsl:when test="not(normalize-space(@environment)='')">  
                                <xsl:text>on</xsl:text>      
                                <xsl:value-of select="@environment"/>                         
                            </xsl:when>   
                            <xsl:otherwise>    
                                <xsl:text>offkUNone</xsl:text>                                       
                            </xsl:otherwise>
                        </xsl:choose> 
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>                
            
             <xsl:call-template name="apply_lib_translate"/>                     
        </line>        
        
    </xsl:template>
    


    
    
    <xsl:template match="//elib:eline" >
        <g>    
            <xsl:call-template name="apply_id"/>            
            <xsl:call-template name="apply_elib_schema"/>
            <xsl:call-template name="apply_svg_g_visible"/> 
            <xsl:call-template name="apply_elib_line_main"/>
            
        </g> 

    </xsl:template>       
    
    
    
     <!--   
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
 
 
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    -->   
    
    
    <xsl:template name="elib_translate"> 
        <xsl:choose>
            <xsl:when test="(not(normalize-space(@translate-x)='')) and  (not(normalize-space(@translate-y)=''))">
                <xsl:attribute name="transform">
                    <xsl:text>translate(</xsl:text>
                    <xsl:value-of select="@translate-x"/>
                    <xsl:text>,</xsl:text>
                    <xsl:value-of select="@translate-y"/>
                    <xsl:text>)</xsl:text>
                </xsl:attribute>    
                <g>
                    <xsl:call-template name="elib_rotate"/>
                </g>
            </xsl:when>
            <xsl:when test="not(normalize-space(@translate-x)='')">  
                <xsl:attribute name="transform">
                    <xsl:text>translate(</xsl:text>
                    <xsl:value-of select="@translate-x"/>
                    <xsl:text>, 0</xsl:text>
                    <xsl:text>)</xsl:text>
                </xsl:attribute>              
                <g>
                    <xsl:call-template name="elib_rotate"/>
                </g>
            </xsl:when>
            <xsl:when test="not(normalize-space(@translate-y)='')"> 
                <xsl:attribute name="transform">
                    <xsl:text>translate( 0</xsl:text>
                    <xsl:text>,</xsl:text>
                    <xsl:value-of select="@translate-y"/>
                    <xsl:text>)</xsl:text>
                </xsl:attribute>
                <g>
                    <xsl:call-template name="elib_rotate"/>
                </g>
            </xsl:when>            
            <xsl:otherwise>
                <xsl:call-template name="elib_rotate"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    

    <xsl:template name="elib_rotate"> 
        <xsl:choose>
            <xsl:when test=" (not(normalize-space(@rotate-angle)='')) or (not(normalize-space(@rotate-angle-binding)='')) ">
                <xsl:variable name="rotate-x"> 
                    <xsl:choose>
                        <xsl:when test="not(normalize-space(@rotate-x)='') ">
                            <xsl:value-of select="@rotate-x"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <xsl:variable name="rotate-y"> 
                    <xsl:choose>
                        <xsl:when test="not(normalize-space(@rotate-y)='') ">
                            <xsl:value-of select="@rotate-y"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable> 
                
                
                <xsl:choose>
                    <xsl:when test="not(normalize-space(@rotate-angle)='') and not(normalize-space(@rotate-angle-binding)='') ">            
                        <xsl:attribute name="transform">
                            <xsl:text>#{ (</xsl:text>
                            <xsl:value-of select="@rotate-angle-binding"/>
                            <xsl:text> ).valid ? </xsl:text>
                            <xsl:text>('rotate(' + format((</xsl:text>
                            <xsl:value-of select="@rotate-angle-binding"/>
                            <xsl:text>) , '%3.2f')</xsl:text>
                                                       
                            <xsl:text>+ ',</xsl:text>
                            <xsl:value-of select="$rotate-x"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-y"/>
                            <xsl:text>'</xsl:text>
                            
                            <xsl:text> + ')') : 'rotate(</xsl:text>
                            <xsl:value-of select="@rotate-angle"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-x"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-y"/>                            
                            <xsl:text>)' :default </xsl:text>
                            <xsl:text>rotate(</xsl:text>
                            <xsl:value-of select="@rotate-angle"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-x"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-y"/>
                            <xsl:text>)}</xsl:text>
                        </xsl:attribute>    
                        <g>
                            <xsl:call-template name="elib_scale"/>
                        </g>
                    </xsl:when>
                    <xsl:when test="not(normalize-space(@rotate-angle)='')">            
                        <xsl:attribute name="transform">
                            <xsl:text>rotate(</xsl:text>
                            <xsl:value-of select="@rotate-angle"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-x"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-y"/>
                            <xsl:text>)</xsl:text>
                        </xsl:attribute>    
                        <g>
                            <xsl:call-template name="elib_scale"/>
                        </g>
                    </xsl:when>
                    <xsl:when test="(not(normalize-space(@rotate-angle-binding)='')) ">            
                        <xsl:attribute name="transform">
                            <xsl:text>#{ (</xsl:text>
                            <xsl:value-of select="@rotate-angle-binding"/>
                            <xsl:text> ).valid ? </xsl:text>
                            <xsl:text>('rotate(' + format((</xsl:text>
                            <xsl:value-of select="@rotate-angle-binding"/>
                            <xsl:text>) , '%3.2f')</xsl:text>
                            
                            <xsl:text>+ ',</xsl:text>
                            <xsl:value-of select="$rotate-x"/>
                            <xsl:text>,</xsl:text>
                            <xsl:value-of select="$rotate-y"/>
                            <xsl:text>'</xsl:text>
                            
                            <xsl:text> + ')') : '</xsl:text>
                            <xsl:text>' :default }</xsl:text>
                        </xsl:attribute>    
                        <g>
                            <xsl:call-template name="elib_scale"/>
                        </g>
                    </xsl:when>            
                    <xsl:otherwise>
                        <xsl:call-template name="elib_scale"/>
                    </xsl:otherwise>
                </xsl:choose>                
             

            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="elib_scale"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
    
    
    <xsl:template name="elib_scale"> 
        <xsl:choose>
            <xsl:when test="not(normalize-space(@scale)='') and not(normalize-space(@scale-binding)='') ">            
                <xsl:attribute name="transform">
                    <xsl:text>#{ (</xsl:text>
                    <xsl:value-of select="@scale-binding"/>
                    <xsl:text> ).valid ? </xsl:text>
                    <xsl:text>('scale(' + format((</xsl:text>
                    <xsl:value-of select="@scale-binding"/>
                    <xsl:text>) , '%3.2f')</xsl:text>
                    <xsl:text> + ')') : 'scale(</xsl:text>
                    <xsl:value-of select="@scale"/>
                    <xsl:text>)' :default </xsl:text>
                    <xsl:text>scale(</xsl:text>
                    <xsl:value-of select="@scale"/>
                    <xsl:text>)}</xsl:text>
                </xsl:attribute>    
                <xsl:apply-templates/>
            </xsl:when>
            <xsl:when test="not(normalize-space(@scale)='')">            
                <xsl:attribute name="transform">
                    <xsl:text>scale(</xsl:text>
                    <xsl:value-of select="@scale"/>
                    <xsl:text>)</xsl:text>
                </xsl:attribute>    
                <xsl:apply-templates/>
            </xsl:when>
            <xsl:when test="not(normalize-space(@scale-binding)='') ">            
                <xsl:attribute name="transform">
                    <xsl:text>#{ (</xsl:text>
                    <xsl:value-of select="@scale-binding"/>
                    <xsl:text> ).valid ? </xsl:text>
                    <xsl:text>('scale(' + format((</xsl:text>
                    <xsl:value-of select="@scale-binding"/>
                    <xsl:text>) , '%3.2f')</xsl:text>
                    <xsl:text> + ')') : '</xsl:text>
                    <xsl:text>' :default }</xsl:text>
                </xsl:attribute>    
                <xsl:apply-templates/>
            </xsl:when>            
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>  
    
    
    <xsl:template match="//elib:group">
        <g>
            <xsl:call-template name="apply_id"/>            
            <xsl:call-template name="apply_elib_schema"/>
            <xsl:attribute name="isgoupelement">
                <xsl:text>true</xsl:text>
            </xsl:attribute>
            <svg>
                
                <xsl:call-template name="apply_rect"/>
                <xsl:call-template name="apply_lib_mouseevent"/> 
            
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>          
                    <rect stroke="white" fill="white" opacity="0.0">
                        <xsl:call-template name="apply_0_0_width_height"/> 
                    </rect>
                    <g> 
                        <xsl:call-template name="elib_translate"/>
                    </g>
                </g>
            </svg>
        </g>
    </xsl:template>    
      

</xsl:stylesheet>
