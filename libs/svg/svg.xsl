<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns="http://www.w3.org/2000/svg"
xmlns:svg="http://www.w3.org/2000/svg"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:html="http://www.w3.org/TR/xhtml1"
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:exsl="http://xmlsoft.org/XSLT/namespace"
extension-element-prefixes="svg">
    
  

    <xsl:template name="svglib">
         
    </xsl:template>
    
      
    <xsl:template name="apply_svg_schema">    
        <!--xsl:attribute name="xsi:schemaLocation">
            <xsl:text>../web-utils/libs/svg/svg.xsd</xsl:text>
        </xsl:attribute-->  
    </xsl:template>
    
    
           
                   
                
                
    
    <xsl:template name="apply_svg_x">        
        <xsl:choose>
            <xsl:when test="(boolean(@x) and not(normalize-space(@x)='')) and (boolean(@x-binding) and not(normalize-space(@x-binding)='')) ">
                <xsl:attribute name="x">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@x"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@x"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x) and not(normalize-space(@x)=''))">
                <xsl:attribute name="x">
                    <xsl:value-of select="@x"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x-binding) and not(normalize-space(@x-binding)=''))">
                <xsl:attribute name="x">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
    
    <xsl:template name="apply_svg_y">        
        <xsl:choose>
            <xsl:when test="(boolean(@y) and not(normalize-space(@y)='')) and (boolean(@y-binding) and not(normalize-space(@y-binding)='')) ">
                <xsl:attribute name="y">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@y"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@y"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y) and not(normalize-space(@y)=''))">
                <xsl:attribute name="y">
                    <xsl:value-of select="@y"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y-binding) and not(normalize-space(@y-binding)=''))">
                <xsl:attribute name="y">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>        

    
    <xsl:template name="apply_svg_x1">        
        <xsl:choose>
            <xsl:when test="(boolean(@x1) and not(normalize-space(@x1)='')) and (boolean(@x1-binding) and not(normalize-space(@x1-binding)='')) ">
                <xsl:attribute name="x1">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x1-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x1-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@x1"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@x1"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x1) and not(normalize-space(@x1)=''))">
                <xsl:attribute name="x1">
                    <xsl:value-of select="@x1"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x1-binding) and not(normalize-space(@x1-binding)=''))">
                <xsl:attribute name="x1">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x1-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x1-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>    
   
    <xsl:template name="apply_svg_y1">        
        <xsl:choose>
            <xsl:when test="(boolean(@y1) and not(normalize-space(@y1)='')) and (boolean(@y1-binding) and not(normalize-space(@y1-binding)='')) ">
                <xsl:attribute name="y1">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y1-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y1-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@y1"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@y1"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y1) and not(normalize-space(@y1)=''))">
                <xsl:attribute name="y1">
                    <xsl:value-of select="@y1"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y1-binding) and not(normalize-space(@y1-binding)=''))">
                <xsl:attribute name="y1">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y1-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y1-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
   
   
    <xsl:template name="apply_svg_x2">        
        <xsl:choose>
            <xsl:when test="(boolean(@x2) and not(normalize-space(@x2)='')) and (boolean(@x2-binding) and not(normalize-space(@x2-binding)='')) ">
                <xsl:attribute name="x2">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x2-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x2-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@x2"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@x2"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x2) and not(normalize-space(@x2)=''))">
                <xsl:attribute name="x2">
                    <xsl:value-of select="@x2"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@x2-binding) and not(normalize-space(@x2-binding)=''))">
                <xsl:attribute name="x2">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@x2-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@x2-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>100 :default </xsl:text>
                    <xsl:text>100</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>    
   
    <xsl:template name="apply_svg_y2">        
        <xsl:choose>
            <xsl:when test="(boolean(@y2) and not(normalize-space(@y2)='')) and (boolean(@y2-binding) and not(normalize-space(@y2-binding)='')) ">
                <xsl:attribute name="y2">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y2-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y2-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@y2"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@y2"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y2) and not(normalize-space(@y2)=''))">
                <xsl:attribute name="y2">
                    <xsl:value-of select="@y2"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@y2-binding) and not(normalize-space(@y2-binding)=''))">
                <xsl:attribute name="y2">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@y2-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@y2-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>100 :default </xsl:text>
                    <xsl:text>100</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>    
   
    <xsl:template name="apply_svg_cx">        
        <xsl:choose>
            <xsl:when test="(boolean(@cx) and not(normalize-space(@cx)='')) and (boolean(@cx-binding) and not(normalize-space(@cx-binding)='')) ">
                <xsl:attribute name="cx">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@cx-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@cx-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@cx"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@cx"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@cx) and not(normalize-space(@cx)=''))">
                <xsl:attribute name="cx">
                    <xsl:value-of select="@cx"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@cx-binding) and not(normalize-space(@cx-binding)=''))">
                <xsl:attribute name="cx">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@cx-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@cx-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
    


    <xsl:template name="apply_svg_cy">        
        <xsl:choose>
            <xsl:when test="(boolean(@cy) and not(normalize-space(@cy)='')) and (boolean(@cy-binding) and not(normalize-space(@cy-binding)='')) ">
                <xsl:attribute name="cy">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@cy-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@cy-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@cy"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@cy"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@cy) and not(normalize-space(@cy)=''))">
                <xsl:attribute name="cy">
                    <xsl:value-of select="@cy"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@cy-binding) and not(normalize-space(@cy-binding)=''))">
                <xsl:attribute name="cy">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@cy-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@cy-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
       
   
    <xsl:template name="apply_svg_height">        
        <xsl:choose>
            <xsl:when test="(boolean(@height) and not(normalize-space(@height)='')) and (boolean(@height-binding) and not(normalize-space(@height-binding)='')) ">
                <xsl:attribute name="height">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@height-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@height-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@height"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@height"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@height) and not(normalize-space(@height)=''))">
                <xsl:attribute name="height">
                    <xsl:value-of select="@height"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@height-binding) and not(normalize-space(@height-binding)=''))">
                <xsl:attribute name="height">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@height-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@height-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>100 :default </xsl:text>
                    <xsl:text>100</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>
    
    <xsl:template name="apply_svg_width">        
        <xsl:choose>
            <xsl:when test="(boolean(@width) and not(normalize-space(@width)='')) and (boolean(@width-binding) and not(normalize-space(@width-binding)='')) ">
                <xsl:attribute name="width">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@width-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@width-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@width"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@width"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@width) and not(normalize-space(@width)=''))">
                <xsl:attribute name="width">
                    <xsl:value-of select="@width"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@width-binding) and not(normalize-space(@width-binding)=''))">
                <xsl:attribute name="width">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@width-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@width-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>100 :default </xsl:text>
                    <xsl:text>100</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>  

    
    
    <xsl:template name="apply_svg_r">        
        <xsl:choose>
            <xsl:when test="(boolean(@r) and not(normalize-space(@r)='')) and (boolean(@r-binding) and not(normalize-space(@r-binding)='')) ">
                <xsl:attribute name="r">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@r-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@r-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@r"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@r"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@r) and not(normalize-space(@r)=''))">
                <xsl:attribute name="r">
                    <xsl:value-of select="@r"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@r-binding) and not(normalize-space(@r-binding)=''))">
                <xsl:attribute name="r">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@r-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@r-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>50 :default </xsl:text>
                    <xsl:text>50</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
    
    <xsl:template name="apply_svg_href">        
        <xsl:choose>
            <xsl:when test="not(normalize-space(@xlink:href)='') and not(normalize-space(@href-binding)='') ">
                <xsl:attribute name="xlink:href">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@href-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@href-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@href"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@href"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(normalize-space(@xlink:href)='')">
                <xsl:attribute name="xlink:href">
                    <xsl:value-of select="@href"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="not(normalize-space(@href-binding)='')">
                <xsl:attribute name="xlink:href">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@href-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@href-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>'' :default </xsl:text>
                    <xsl:text></xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>     
    
    <xsl:template name="apply_svg_stroke">        
        <xsl:choose>
            <xsl:when test="(boolean(@stroke) and not(normalize-space(@stroke)='')) and (boolean(@stroke-binding) and not(normalize-space(@stroke-binding)='')) ">
                <xsl:attribute name="stroke">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-binding"/>
                    <xsl:text>) : '</xsl:text>
                    <xsl:value-of select="@stroke"/>
                    <xsl:text>' :default </xsl:text>
                    <xsl:value-of select="@stroke"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke) and not(normalize-space(@stroke)=''))">
                <xsl:attribute name="stroke">
                    <xsl:value-of select="@stroke"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke-binding) and not(normalize-space(@stroke-binding)=''))">
                <xsl:attribute name="stroke">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>'black' :default </xsl:text>
                    <xsl:text>'black'</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
 
 
    <xsl:template name="apply_svg_stroke_width">        
        <xsl:choose>
            <xsl:when test="(boolean(@stroke-width) and not(normalize-space(@stroke-width)='')) and (boolean(@stroke-width-binding) and not(normalize-space(@stroke-width-binding)='')) ">
                <xsl:attribute name="stroke-width">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-width-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-width-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@stroke-width"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@stroke-width"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke-width) and not(normalize-space(@stroke-width)=''))">
                <xsl:attribute name="stroke-width">
                    <xsl:value-of select="@stroke-width"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke-width-binding) and not(normalize-space(@stroke-width-binding)=''))">
                <xsl:attribute name="stroke-width">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-width-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-width-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>1 :default </xsl:text>
                    <xsl:text>1</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>
    
    
    <xsl:template name="apply_svg_class">        
        <xsl:choose>
            <xsl:when test="(boolean(@class) and not(normalize-space(@class)='')) and (boolean(@class-binding) and not(normalize-space(@class-binding)='')) ">
                <xsl:attribute name="class">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@class-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@class-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@class"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@class"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@class) and not(normalize-space(@class)=''))">
                <xsl:attribute name="class">
                    <xsl:value-of select="@class"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@class-binding) and not(normalize-space(@class-binding)=''))">
                <xsl:attribute name="class">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@class-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@class-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>1 :default </xsl:text>
                    <xsl:text>1</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>   
    
    
    <xsl:template name="apply_svg_stroke_opacity">   
        <xsl:choose>
            <xsl:when test="(boolean(@stroke-opacity) and not(normalize-space(@stroke-opacity)='')) and (boolean(@stroke-opacity-binding) and not(normalize-space(@stroke-opacity-binding)='')) ">
                <xsl:attribute name="stroke-opacity">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-opacity-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-opacity-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@stroke-opacity"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@stroke-opacity"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke-opacity) and not(normalize-space(@stroke-opacity)=''))">
                <xsl:attribute name="stroke-opacity">
                    <xsl:value-of select="@stroke-opacity"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@stroke-opacity-binding) and not(normalize-space(@stroke-opacity-binding)=''))">
                <xsl:attribute name="stroke-opacity">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@stroke-opacity-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@stroke-opacity-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>1 :default </xsl:text>
                    <xsl:text>1</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>
     
 
 
    <xsl:template name="apply_svg_fill">        
        <xsl:choose>
            <xsl:when test="(boolean(@fill) and not(normalize-space(@fill)='')) and (boolean(@fill-binding) and not(normalize-space(@fill-binding)='')) ">
                <xsl:attribute name="fill">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@fill-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@fill-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@fill"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@fill"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@fill) and not(normalize-space(@fill)=''))">
                <xsl:attribute name="fill">
                    <xsl:value-of select="@fill"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@fill-binding) and not(normalize-space(@fill-binding)=''))">
                <xsl:attribute name="fill">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@fill-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@fill-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>'black' :default </xsl:text>
                    <xsl:text>black</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
    

    
    
    <xsl:template name="apply_svg_opacity">   
        <xsl:choose>
            <xsl:when test="(boolean(@opacity) and not(normalize-space(@opacity)='')) and (boolean(@opacity-binding) and not(normalize-space(@opacity-binding)='')) ">
                <xsl:attribute name="opacity">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@opacity-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@opacity-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@opacity"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@opacity"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@opacity) and not(normalize-space(@opacity)=''))">
                <xsl:attribute name="opacity">
                    <xsl:value-of select="@opacity"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@opacity-binding) and not(normalize-space(@opacity-binding)=''))">
                <xsl:attribute name="opacity">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@opacity-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@opacity-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>1 :default </xsl:text>
                    <xsl:text>1</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>     
    
 
    <xsl:template name="apply_svg_rx">        
        <xsl:choose>
            <xsl:when test="(boolean(@rx) and not(normalize-space(@rx)='')) and (boolean(@rx-binding) and not(normalize-space(@rx-binding)='')) ">
                <xsl:attribute name="rx">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@rx-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@rx-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@rx"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@rx"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@rx) and not(normalize-space(@rx)=''))">
                <xsl:attribute name="rx">
                    <xsl:value-of select="@rx"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@rx-binding) and not(normalize-space(@rx-binding)=''))">
                <xsl:attribute name="rx">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@rx-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@rx-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template> 
    
    <xsl:template name="apply_svg_ry">        
        <xsl:choose>
            <xsl:when test="(boolean(@ry) and not(normalize-space(@ry)='')) and (boolean(@ry-binding) and not(normalize-space(@ry-binding)='')) ">
                <xsl:attribute name="ry">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@ry-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@ry-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:value-of select="@ry"/>
                    <xsl:text> :default </xsl:text>
                    <xsl:value-of select="@ry"/>
                    <xsl:text> } </xsl:text> 
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@ry) and not(normalize-space(@ry)=''))">
                <xsl:attribute name="ry">
                    <xsl:value-of select="@ry"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@ry-binding) and not(normalize-space(@ry-binding)=''))">
                <xsl:attribute name="ry">
                    <xsl:text> #{ ( </xsl:text>
                    <xsl:value-of select="@ry-binding"/>
                    <xsl:text> ).valid  ? (</xsl:text>
                    <xsl:value-of select="@ry-binding"/>
                    <xsl:text>) : </xsl:text>
                    <xsl:text>0 :default </xsl:text>
                    <xsl:text>0</xsl:text>
                    <xsl:text> } </xsl:text>
                </xsl:attribute>
            </xsl:when>                   
        </xsl:choose>     
    </xsl:template>  
    
    <xsl:template name="apply_svg_text">        
        <xsl:choose>
            <xsl:when test="(boolean(@text) and not(normalize-space(@text)='')) and (boolean(@text-binding) and not(normalize-space(@text-binding)='')) ">
                <xsl:text> #{ ( </xsl:text>
                <xsl:value-of select="@text-binding"/>
                <xsl:text> ).valid  ? (</xsl:text>
                <xsl:value-of select="@text-binding"/>
                <xsl:text>) : '</xsl:text>
                <xsl:value-of select="@text"/>
                <xsl:text>' :default </xsl:text>
                <xsl:value-of select="@text"/>
                <xsl:text> } </xsl:text>           
            </xsl:when>
            <xsl:when test="(boolean(@text) and not(normalize-space(@text)=''))">            
                <xsl:value-of select="@text"/>           
            </xsl:when>
            <xsl:when test="(boolean(@text-binding) and not(normalize-space(@text-binding)=''))">        
                <xsl:text> #{  </xsl:text>
                <xsl:value-of select="@text-binding"/>
                <xsl:text> :default </xsl:text>
                <xsl:text> </xsl:text>
                <xsl:text> } </xsl:text>          
            </xsl:when> 
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>                  
        </xsl:choose>     
    </xsl:template> 
    
    
    
    <xsl:template name="apply_svg_filter">
        <xsl:choose>
            <xsl:when test="(boolean(@filter) and (normalize-space(@filter)='filter1'))">
                <xsl:attribute name="filter"> 
                    <xsl:text>url(#filter_lib1)</xsl:text>
                </xsl:attribute>
            </xsl:when> 
            <xsl:when test="(boolean(@filter) and (normalize-space(@filter)='filter2'))">
                <xsl:attribute name="filter"> 
                    <xsl:text>url(#filter_lib2)</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="(boolean(@filter) and (normalize-space(@filter)='filter3'))">
                <xsl:attribute name="filter"> 
                    <xsl:text>url(#filter_lib3)</xsl:text>
                </xsl:attribute>
            </xsl:when>               
        </xsl:choose>
    </xsl:template>    
        
    
    <!--   
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    ||_______________________________________________________________________________________________________________________________________||    
 
      svg circle

    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||
    ||_______________________________________________________________________________________________________________________________________||    
    -->
    
    

    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->      
    
    <xsl:template name="apply_svg_circle_body">     
        <xsl:call-template name="apply_svg_cx"/>
        <xsl:call-template name="apply_svg_cy"/>
        <xsl:call-template name="apply_svg_r"/>
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/> 
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>  
    </xsl:template>            

    <xsl:template match="//svg:circle"> 
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <circle> 
                        <xsl:call-template name="apply_svg_circle_body"/>
                    </circle>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <circle> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_svg_circle_body"/>
                </circle>                
            </xsl:otherwise>
        </xsl:choose>     
    </xsl:template>
    
    
    
    
    

    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->      
    
    <xsl:template name="apply_svg_ellipse_body">     
        <xsl:call-template name="apply_svg_cx"/>
        <xsl:call-template name="apply_svg_cy"/>
        <xsl:call-template name="apply_svg_rx"/>
        <xsl:call-template name="apply_svg_ry"/>           
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/> 
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>  
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>
    </xsl:template>        
    
    <xsl:template match="//svg:ellipse"> 
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <ellipse> 
                        <xsl:call-template name="apply_svg_ellipse_body"/>
                    </ellipse>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <ellipse> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_svg_ellipse_body"/>
                </ellipse>                
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>  
    
    
    
    
    
    

    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->      
    
    <xsl:template name="apply_svg_rect_body">     
        <xsl:call-template name="apply_svg_x"/>
        <xsl:call-template name="apply_svg_y"/>
        <xsl:call-template name="apply_svg_width"/>
        <xsl:call-template name="apply_svg_height"/>
        <xsl:call-template name="apply_svg_rx"/>
        <xsl:call-template name="apply_svg_ry"/>           
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/> 
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>  
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>
    </xsl:template>
    
    <xsl:template match="//svg:rect" name="svg_rect">      
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <rect> 
                        <xsl:call-template name="apply_svg_rect_body"/>
                    </rect>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <rect> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_svg_rect_body"/>
                </rect>                
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
    
    
    
    

    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->          
    
    <xsl:template name="apply_svg_line_body">     
        <xsl:call-template name="apply_svg_x1"/>
        <xsl:call-template name="apply_svg_y1"/>
        <xsl:call-template name="apply_svg_x2"/>
        <xsl:call-template name="apply_svg_y2"/>          
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:attribute name="stroke-linecap">
            <xsl:value-of select="@stroke-linecap"/>
        </xsl:attribute>
        <xsl:attribute name="stroke-dashoffset">
            <xsl:value-of select="@stroke-dashoffset"/>
        </xsl:attribute>
        <xsl:attribute name="stroke-dasharray">
            <xsl:value-of select="@stroke-dasharray"/>
        </xsl:attribute>                
        <xsl:call-template name="apply_svg_filter"/>                 
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>  
    </xsl:template>
    
    <xsl:template match="//svg:line" name="svg_line">     
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/>
                    <line> 
                        <xsl:call-template name="apply_svg_line_body"/>
                    </line>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <line> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/>
                    <xsl:call-template name="apply_svg_line_body"/>
                </line>                
            </xsl:otherwise>
        </xsl:choose>         
    </xsl:template> 
    
    
    

    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->          
    
    <xsl:template name="apply_svg_polyline_body">     
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:attribute name="stroke-linecap">
            <xsl:value-of select="@stroke-linecap"/>
        </xsl:attribute>
        <xsl:attribute name="stroke-linejoin">
            <xsl:value-of select="@stroke-linejoin"/>
        </xsl:attribute>
        <xsl:attribute name="points">
            <xsl:value-of select="@points"/>
        </xsl:attribute> 
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>                 
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>   
    </xsl:template>
        
     
    <xsl:template match="//svg:polyline">   
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/>
                    <polyline> 
                        <xsl:call-template name="apply_svg_polyline_body"/>
                    </polyline>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <polyline> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/>
                    <xsl:call-template name="apply_svg_polyline_body"/>
                </polyline>                
            </xsl:otherwise>
        </xsl:choose>                    
    </xsl:template>
    
    
      
    

    
    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->      
    
    <xsl:template name="apply_svg_polygon_body">     
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:attribute name="points">
            <xsl:value-of select="@points"/>
        </xsl:attribute> 
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>   
    </xsl:template>
    
    <xsl:template match="//svg:polygon"> 
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/> 
                    <polygon> 
                        <xsl:call-template name="apply_svg_polygon_body"/>
                    </polygon>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <polygon> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_lib_translate"/> 
                    <xsl:call-template name="apply_svg_polygon_body"/>
                </polygon>                
            </xsl:otherwise>
        </xsl:choose>          
    </xsl:template> 
    
    
    

    
    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->    
        
    
    <xsl:template name="apply_svg_path_body">     
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:attribute name="stroke-linecap">
            <xsl:value-of select="@stroke-linecap"/>
        </xsl:attribute>
        <xsl:attribute name="stroke-linejoin">
            <xsl:value-of select="@stroke-linejoin"/>
        </xsl:attribute>
        <xsl:attribute name="d">
            <xsl:value-of select="@d"/>
        </xsl:attribute> 
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>   
    </xsl:template>    
    
    
    
    <xsl:template match="//svg:path">       
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <path> 
                        <xsl:call-template name="apply_svg_path_body"/>
                    </path>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <path> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_svg_path_body"/>
                </path>                
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>
    
    
    
    
    
    
    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->    
    
    
    <xsl:template name="apply_svg_text_body">     
        <xsl:call-template name="apply_svg_x"/>
        <xsl:call-template name="apply_svg_y"/>
            
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/>
        <xsl:call-template name="apply_svg_fill"/>
        <xsl:call-template name="apply_svg_opacity"/>       
                
        <xsl:call-template name="apply_svg_class"/>                        
            
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute>
        <!--xsl:call-template name="apply_text_rotate"/-->
        <xsl:call-template name="apply_svg_text"/>   
    </xsl:template>
    
    
    <xsl:template match="//svg:text" name="svg_text"> 
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <text>
                        <xsl:call-template name="apply_svg_text_body"/>
                    </text>
                </g>
            </xsl:when>
            <xsl:otherwise>
                <text>
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_svg_text_body"/>
                </text>                
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
    
    
    
    
    
    
    <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
    
    
    <xsl:template name="apply_svg_image_body">     
        <xsl:call-template name="apply_svg_x"/>
        <xsl:call-template name="apply_svg_y"/>
        <xsl:call-template name="apply_svg_width"/>
        <xsl:call-template name="apply_svg_height"/>
        <xsl:call-template name="apply_svg_href"/> 
        <xsl:call-template name="apply_svg_stroke"/>
        <xsl:call-template name="apply_svg_stroke_width"/>
        <xsl:call-template name="apply_svg_stroke_opacity"/> 
        <xsl:call-template name="apply_svg_opacity"/>  
        <xsl:call-template name="apply_svg_filter"/>
        <xsl:attribute name="style">
            <xsl:value-of select="@style"/>
        </xsl:attribute> 
    </xsl:template>    
    
    
    <xsl:template match="//svg:image">  
        <xsl:choose>
            <xsl:when test="(boolean(@visible-binding) and not(normalize-space(@visible-binding)='')) or (boolean(@rotate) and not(normalize-space(@rotate)=''))">
                <g>
                    <xsl:call-template name="apply_svg_g_visible_binding"/>
                    <xsl:call-template name="apply_cental_rotate"/> 
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_ismaybeinvisible"/>        
                    <image preserveAspectRatio="meet">
                        <xsl:call-template name="apply_svg_image_body"/>
                    </image>   
                </g>
            </xsl:when>
            <xsl:otherwise>
                <image preserveAspectRatio="meet">
                    <xsl:call-template name="apply_id"/>
                    <xsl:call-template name="apply_svg_schema"/>
                    <xsl:call-template name="apply_lib_mouseevent"/>
                    <xsl:call-template name="apply_ismaybeinvisible"/>
                    <xsl:call-template name="apply_svg_image_body"/>
                </image>                 
            </xsl:otherwise>
        </xsl:choose>        
    </xsl:template>     
    
</xsl:stylesheet>
