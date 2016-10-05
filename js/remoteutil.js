/* 
 
 Interface of RemoteDVN
 Author: Serg Alexeev sealeks@mail.ru
 */

/*
 $$(expr [,handler])   ?!
 $$check(expr [,handler])  ?!
 $$error(expr [,handler])   ?!
 $$users(handler)  ?!
 $$registuser(handler, user, password )   ?!
 $$unregistuser(handler)   ?!
 $$adduser(handler, user, password, access)   ?!
 $$removeuser(handler, user, password)   ?!
 $$changeuserpassword(handler, user, oldpassword, newpassword)   ?!
 $$changeuseraccess(handler, user, access)   ?!
 $$exit()
 $$writefile()
 $$filelist([ext]) !!!!
 $$fileexists((file|dir))  !!!!
 $$kill()
 $$editable()
 $$runtime()
 $$global()
 element.onalarm = handler  - delete
 element.ontrend = handler - delete
 addExpressionListener(handler, expr)
 removeExpressionListener(handler)
 addAlarmsListener(handler[, agroup, group])
 removeAlarmsListener(handler)
 addTrendsListener(handler, taglist, period)
 removTrendsListener(handler)*/

var remoteutil = {};

remoteutil.regexBINDEXPR = /\s*#\{.*\}\s*/;

remoteutil.regexBEGINEXPR = /{.*\}\s*/;

remoteutil.regexDEFAULTEXPR = /\:default.*\}\s*/;

remoteutil.regexENDEXPR = /}\s*/;

getIntfIO = function () {
    return window && window.document ?
            window.document.intfIO : undefined;
}


//$$(expr [,handler])   
$$ = function (expr, handler) {
    var intf = getIntfIO();
    if (intf) {
        //console.log('global $$ expr=', expr);
        return intf.addExpressionListener(expr, handler);
    }
}

//$$check(expr [,handler])  
$$check = function (expr, handler) {
    var intf = getIntfIO();
    if (intf) {
        //console.log('global $$check expr=', expr);
        return intf.addExpressionListener(expr, handler, true);
    }
}

//$$error(expr [,handler])  
$$error = function (expr, handler) {
    var intf = getIntfIO();
    if (intf) {
        //console.log('global $$error expr=', expr);
        return intf.addExpressionListener(expr, handler, true);
    }
}

//$$users = function (handler)
$$users = function (handler) {
    var intf = getIntfIO();
    if (intf) {
        return intf.$$users(handler);
    }
}

$$registuser = function (handler, user, password) {
    var intf = getIntfIO();
    if (intf) {
        return intf.registrateUser(handler, user, password);
    }
}


$$unregistuser = function (handler) {
    var intf = getIntfIO();
    if (intf) {
        return intf.unregistrateUser(handler);
    }
}

$$adduser = function (handler, user, password, access) {
    var intf = getIntfIO();
    if (intf) {
        return intf.addUser(handler, user, password, access);
    }
}

$$removeuser = function (handler, user, password) {
    var intf = getIntfIO();
    if (intf) {
        return intf.removeUser(handler, user, password);
    }
}

$$changeuserpassword = function (handler, user, oldpassword, newpassword) {
    var intf = getIntfIO();
    if (intf) {
        return intf.changePassword(handler, user, oldpassword, newpassword);
    }
}

$$changeuseraccess = function (handler, user, access) {
    var intf = getIntfIO();
    if (intf) {
        return intf.changeAccess(handler, user, access);
    }
}

addTrendsListener = function (handler, taglist, period) {
    var intf = getIntfIO();
    if (intf) {
        return intf.addTrendsListener(handler, taglist, period);
    }
}

if (!window.addTrendsListener)
    window.addTrendsListener=addTrendsListener;

removeTrendsListener = function (handler) {
    var intf = getIntfIO();
    if (intf) {
        return intf.removeTrendsListener(handler);
    }
}

if (!window.removeTrendsListener)
    window.removeTrendsListener=removeTrendsListener;



$$exit = function () {
    var intf = getIntfIO();
    if (intf) {
        return intf.$$exit();
    }
}

if (!window.$$exit)
    window.$$exit=$$exit;



formopen= function (name) {
    var intf = getIntfIO();
    if (intf) {
        return intf.formopen(name);
    }
}

if (!window.formopen)
    window.formopen=formopen;



formclose= function (name) {
    var intf = getIntfIO();
    if (intf) {
        return intf.formclose(name);
    }
}

if (!window.formclose)
    window.formclose=formclose;

// loader

remoteutil.loader = {};

remoteutil.loader.attach = function (doc) {
    if (doc.documentElement) {
        if (!doc.intfIO) {
            remoteutil.setTrobler(true);
            remoteutil.loader.treat(doc.documentElement);
            doc.intfIO = new remoteutil.interfaceIO(doc.documentElement);
            remoteutil.loader.finder(doc.documentElement, doc.intfIO);

            if (window)
                window.addEventListener('message', function () {
                    try {
                        if (event && event.data == 'init' && !doc.intfIO.remoteEvent) {
                            doc.intfIO.remoteEvent = event;
                            //console.log('Window by attach', doc.intfIO.remoteEvent);
                        } else{
                            console.log('Window not  attach', event);
                        }                           
                    } catch (error) {
                    }
                } , false);
        }

        if (doc.intfIO) {
            doc.intfIO.calculate();
            doc.intfIO.initRequest();
        }
    }
};

remoteutil.loader.finder = function (el, intf) {
    for (var ch = el.firstElementChild; ch; ch = ch.nextElementSibling) {
        remoteutil.loader.treat(ch, intf);
        remoteutil.loader.finder(ch, intf);
    }
};

remoteutil.loader.treat = function (el, intf) {
    var tst;
    for (var i = 0; i < el.attributes.length; ++i) {
        tst = remoteutil.loader.match(el.attributes[i].value);
        if (tst) {
            remoteutil.loader.registrate(intf, tst, el, el.attributes[i].name);
        }
    }
    if (el.textContent && el.childElementCount === 0) {
        tst = remoteutil.loader.match(el.textContent);
        if (tst) {
            remoteutil.loader.registrate(intf, tst, el);
        }
    }
};

remoteutil.loader.match = function (val) {
    if (val && val.match(remoteutil.regexBINDEXPR)) {
        var tsts = val.search(remoteutil.regexBEGINEXPR);
        var tsti = val.search(remoteutil.regexDEFAULTEXPR);
        var tste = val.search(remoteutil.regexENDEXPR);
        var exprv = ((tsts >= 0 && tste > 0) ? ((tsti > 0) ? val.substring(tsts + 1, tsti - 1) :
                val.substring(tsts + 1, tste - 1)) : '');
        if (tsti < 0) {
            return {expr: exprv.trim(), dflt: ''};
        }
        var dfltv = (tste < 0) ? val.substring(tsti + 8) : val.substring(tsti + 8, tste);
        return {expr: exprv.trim(), dflt: dfltv.trim()};
    }
};

remoteutil.loader.registrate = function (intf, bind, el, attr) {
    if (attr) {
        intf.addExpressionListener(bind['expr'], function (val) {
            el.setAttribute(attr, val ? val.getValue() : bind['dflt']);
        });
        el.setAttribute(attr, bind['dflt']);
    }
    else {
        intf.addExpressionListener(bind['expr'], function (val) {
            el.textContent = (val ? val.getValue() : bind['dflt']);
        });
        el.textContent = bind['dflt'];
    }
}



// regexstr

remoteutil.regexstr = {};

remoteutil.regexstr.STRING_NOASCII = "[^\\x0-\\x7F]{1,}";// !! deleted
remoteutil.regexstr.CORRECT_ENTETYNAME = "[A-Za-z_\\$][A-Za-z_\\$0-9]*";  //"[A-Za-z_\\$][A-Za-z_\\$0-9]*+"
remoteutil.regexstr.CORRECT_ENTETYFULLNAME = remoteutil.regexstr.CORRECT_ENTETYNAME + "::" + remoteutil.regexstr.CORRECT_ENTETYNAME;
remoteutil.regexstr.CORRECT_ENTETYNAME_EXT = remoteutil.regexstr.CORRECT_ENTETYNAME + "|" + remoteutil.regexstr.CORRECT_ENTETYFULLNAME;
//remoteutil.regexstr.EXCL_CORRECT_ENTETYNAME = "^num$|^abs$|^real$|^bool$|^min$|^max$|^sin$|^cos$|^tan$|^sinh$|^cosh$|^tanh$|^pow$|^sqrt$|^sqr$|^nan$|^round$|^seil$|^format$|^asin$|^acos$|^atan$|^log10$|^log$|^now$|^exp$|^ln$|^rnd$|^e$|^pi$|^null$|^user$|^access$|^floor$|^trunc$|^ack$|^nack$|^alarm$|^tags$|^alarmlevel$";
remoteutil.regexstr.EXCL_CORRECT_ENTETYNAME = "^num$|^abs$|^real$|^bool$|^min$|^max$|^sin$|^cos$|^tan$|^sinh$|^cosh$|^tanh$|^pow$|^sqrt$|^sqr$|^nan$|^round$|^seil$|^format$|^asin$|^acos$|^atan$|^log10$|^log$|^now$|^exp$|^ln$|^rnd$|^e$|^pi$|^null$|^floor$|^trunc$|^ack$|^nack$|^alarm$|^tags$|^alarmlevel$";
remoteutil.regexstr.NUMBER_BIN = "0b[01]{1,63}u?l?u?|0b[01]{1,31}u?";// "0b[01]{1,63}+u?+l?+u?+|0b[01]{1,31}+u?+"
remoteutil.regexstr.NUMBER_OCT = "0[0-7]{0,21}u?l?u?|0[0-7]{1,10}u?";// "0[0-7]{0,21}+u?+l?+u?+|0[0-7]{1,10}+u?+"
remoteutil.regexstr.NUMBER_DEC = "[1-9][0-9]{0,19}l?u?1?|[1-9][0-9]{0,9}u?|[1-9][0-9]{0,9}f?|0f?";//"[1-9][0-9]{0,19}+l?+u?+1?+|[1-9][0-9]{0,9}+u?+|[1-9][0-9]{0,9}+f?+|0f?+"
remoteutil.regexstr.NUMBER_HEX = "0x[0-9a-f]{1,16}l?u?1?|0x[0-9a-f]{1,8}u?";//"0x[0-9a-f]{1,16}+l?+u?+1?+|0x[0-9a-f]{1,8}+u?+";
remoteutil.regexstr.NUMBER_FP = "[0-9]*\\.[0-9]+f?";//[0-9]*\\.[0-9]++f?+
remoteutil.regexstr.NUMBER_EXT = remoteutil.regexstr.NUMBER_FP + "|" + remoteutil.regexstr.NUMBER_BIN + "|" + remoteutil.regexstr.NUMBER_HEX + "|" +
        remoteutil.regexstr.NUMBER_OCT + "|" + remoteutil.regexstr.NUMBER_DEC;
remoteutil.regexstr.NUMBER = "[0-9]*[\\.]?[0-9]+";//"[0-9]*[\\.]?[0-9]++"
remoteutil.regexstr.STRING1 = "'.*?'";
remoteutil.regexstr.STRING2 = "\".*?\"";
remoteutil.regexstr.OPERATORS = "\\(|\\)|\\*|/|%|\\+\\+?|--?|<<<|>>>|<<|>>|@@=|@=|[<>!=]=?|&?&|\\^|\\|?\\||&?&|,|\\?|:|@@|@|#|=";//"\\(|\\)|\\*|/|%|\\+\\+?+|--?+|<<<|>>>|<<|>>|@@=|@=|[<>!=]=?+|&?+&|\\^|\\|?\\||&?&|,|\\?|:|@@|@|#|=";
remoteutil.regexstr.SELECTOR = "\\.bool|\\.real|\\.num|\\.alarmmsg|\\.alarmlevel|\\.nack|\\.alarm|\\.ack|\\.mineu|\\.maxeu|\\.time|\\.logtime|\\.error|\\.valid|\\.comment|\\.eu|\\.binding|\\.msc|\\.sec|\\.minute|\\.hour|\\.monthdays|\\.dayweek|\\.dayyear|\\.day|\\.month|\\.year|\\.epochminute|\\.epochhour|\\.epochday|\\.epochmsc|\\.epoch|\\.lastvalue";
remoteutil.regexstr.FUNCTION = "num(?=\\()|abs(?=\\()|real(?=\\()|bool(?=\\()|min(?=\\()|max(?=\\()|nack(?=\\()|alarmlevel(?=\\()|alarm(?=\\()|ack(?=\\()|tags(?=\\()|sinh(?=\\()|cosh(?=\\()|tanh(?=\\()|asin(?=\\()|acos(?=\\()|atan(?=\\()|sin(?=\\()|cos(?=\\()|tan(?=\\()|pow(?=\\()|sqrt(?=\\()|sqr(?=\\()|exp(?=\\()|log10(?=\\()|log(?=\\()|ln(?=\\()|rnd(?=\\()|now(?=\\()|e(?=\\()|pi(?=\\()|nan(?=\\()|floor(?=\\()|seil(?=\\()|round(?=\\()|format(?=\\()|incday(?=\\()|inchour(?=\\()|incminute(?=\\()|incsec(?=\\()|incmsc(?=\\()";
remoteutil.regexstr.TYPECAST = "\\(notype\\)|\\(num64\\)|\\(unum64\\)|\\(num32\\)|\\(unum32\\)|\\num16\\)|\\(unum16\\)|\\(num8\\)|\\(unum8\\)|\\(float\\)|\\(double\\)|\\(bool\\)|\\(vbool\\)|\\(time\\)|\\(text\\)";
remoteutil.regexstr.FULLEXPR = "(" + remoteutil.regexstr.FUNCTION + "|" +
        remoteutil.regexstr.TYPECAST + "|" +
        remoteutil.regexstr.STRING1 + "|" +
        remoteutil.regexstr.STRING2 + "|" +
        remoteutil.regexstr.SELECTOR + "|" +
        remoteutil.regexstr.CORRECT_ENTETYFULLNAME + "|" +
        remoteutil.regexstr.CORRECT_ENTETYNAME + "|" +
        remoteutil.regexstr.OPERATORS + "|" +
        remoteutil.regexstr.NUMBER_EXT + ")";


// type-id

remoteutil.regexstr.TYPE_NONE = 0x00;
remoteutil.regexstr.TYPE_SIMPL = 0x01;
remoteutil.regexstr.TYPE_TIME = 0x10;
remoteutil.regexstr.TYPE_TEXT = 0x20;
remoteutil.regexstr.TYPE_REPORT = 0x40;
remoteutil.regexstr.TYPE_EVENT = 0x80;

remoteutil.regexstr.TYPE_FULL = remoteutil.regexstr.TYPE_SIMPL | remoteutil.regexstr.TYPE_TIME | remoteutil.regexstr.TYPE_TEXT | remoteutil.regexstr.TYPE_REPORT | remoteutil.regexstr.TYPE_EVENT;

remoteutil.regexstr.TYPE_NO_ALARMED_MSK = remoteutil.regexstr.TYPE_TIME | remoteutil.regexstr.TYPE_TEXT | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.TYPE_SIMPLE_REQ = remoteutil.regexstr.TYPE_SIMPL | remoteutil.regexstr.TYPE_TIME | remoteutil.regexstr.TYPE_TEXT;


remoteutil.regexstr.TYPE_NODEF = 0x0;
remoteutil.regexstr.TYPE_DOUBLE = 0x1;
remoteutil.regexstr.TYPE_FLOAT = 0x2;
remoteutil.regexstr.TYPE_NUM64 = 0x3;
remoteutil.regexstr.TYPE_UNUM64 = 0x4;
remoteutil.regexstr.TYPE_NUM32 = 0x5;
remoteutil.regexstr.TYPE_UNUM32 = 0x6;
remoteutil.regexstr.TYPE_NUM16 = 0x7;
remoteutil.regexstr.TYPE_UNUM16 = 0x8;
remoteutil.regexstr.TYPE_NUM8 = 0x9;
remoteutil.regexstr.TYPE_UNUM8 = 0xA;
remoteutil.regexstr.TYPE_DISCRET = 0xB;
remoteutil.regexstr.TYPE_TM = 0x10;

remoteutil.regexstr.EVENT_TYPE_WITHTIME = 0x0 | remoteutil.regexstr.TYPE_EVENT;
remoteutil.regexstr.EVENT_TYPE_OSC = 0x1 | remoteutil.regexstr.TYPE_EVENT;

remoteutil.regexstr.REPORTTYPE_YEAR = 0x1 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_MIN = 0x2 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_HOUR = 0x3 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_DEC = 0x4 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_DAY = 0x5 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_MONTH = 0x6 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_10MIN = 0x7 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_30MIN = 0x8 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_QVART = 0x9 | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_CUSTOM = 0xA | remoteutil.regexstr.TYPE_REPORT;
remoteutil.regexstr.REPORTTYPE_NONE = 0x0 | remoteutil.regexstr.TYPE_REPORT;



// regex


remoteutil.regex = {};

remoteutil.regex.STRING_NOASCII = new RegExp(remoteutil.regexstr.STRING_NOASCII, 'g');
remoteutil.regex.CORRECT_ENTETYNAME = new RegExp(remoteutil.regexstr.CORRECT_ENTETYNAME, 'g');
remoteutil.regex.CORRECT_ENTETYFULLNAME = new RegExp(remoteutil.regexstr.CORRECT_ENTETYFULLNAME, 'g');
remoteutil.regex.CORRECT_ENTETYNAME_EXT = new RegExp(remoteutil.regexstr.CORRECT_ENTETYNAME_EXT, 'g');
remoteutil.regex.EXCL_CORRECT_ENTETYNAME = new RegExp(remoteutil.regexstr.EXCL_CORRECT_ENTETYNAME, 'g');
remoteutil.regex.NUMBER_BIN = new RegExp(remoteutil.regexstr.NUMBER_BIN, 'g');
remoteutil.regex.NUMBER_OCT = new RegExp(remoteutil.regexstr.NUMBER_OCT, 'g');
remoteutil.regex.NUMBER_DEC = new RegExp(remoteutil.regexstr.NUMBER_DEC, 'g');
remoteutil.regex.NUMBER_HEX = new RegExp(remoteutil.regexstr.NUMBER_HEX, 'g');
remoteutil.regex.NUMBER_FP = new RegExp(remoteutil.regexstr.NUMBER_FP, 'g');
remoteutil.regex.NUMBER_EXT = new RegExp(remoteutil.regexstr.NUMBER_EXT, 'g');
remoteutil.regex.NUMBER = new RegExp(remoteutil.regexstr.NUMBER, 'g');
remoteutil.regex.STRING1 = new RegExp(remoteutil.regexstr.STRING1, 'g');
remoteutil.regex.STRING2 = new RegExp(remoteutil.regexstr.STRING2, 'g');
remoteutil.regex.OPERATORS = new RegExp(remoteutil.regexstr.OPERATORS, 'g');
remoteutil.regex.SELECTOR = new RegExp(remoteutil.regexstr.SELECTOR, 'g');
remoteutil.regex.FUNCTION = new RegExp(remoteutil.regexstr.FUNCTION, 'g');
remoteutil.regex.TYPECAST = new RegExp(remoteutil.regexstr.TYPECAST, 'g');
remoteutil.regex.FULLEXPR = new RegExp(remoteutil.regexstr.FULLEXPR, 'g');

remoteutil.regex.equal = function (val, tmpl) {
    var tmp = val.match(tmpl);
    return (tmp && (tmp.length == 1) && (tmp[0] == val))
}


remoteutil.operation = {};

remoteutil.operation.notoperation = 0;
remoteutil.operation.expr = 1;
remoteutil.operation.constant = 2;
remoteutil.operation.oprt_leftgroup = 1000; // (  1
remoteutil.operation.oprt_rightgroup = 1002; // )  1
remoteutil.operation.select_mineu = 1006;
remoteutil.operation.select_maxeu = 1008;                                                   //( tagged) see nsdavinci prj/ GitHub         /include/kernel/expression.h
remoteutil.operation.select_ack = 1010;                                                         //( tagged)
remoteutil.operation.select_nack = 1012;                                                       //( tagged)
remoteutil.operation.select_alarm = 1014;                                                     //( tagged)
remoteutil.operation.select_mod = 1016;
remoteutil.operation.select_num = 1018;
remoteutil.operation.func_num = 1019;
remoteutil.operation.select_real = 1020;
remoteutil.operation.func_real = 1021;
remoteutil.operation.select_bool = 1022;
remoteutil.operation.func_bool = 1023;
remoteutil.operation.func_min = 1025;
remoteutil.operation.func_max = 1027;
remoteutil.operation.func_abs = 1029;
remoteutil.operation.func_sin = 1031;
remoteutil.operation.func_cos = 1033;
remoteutil.operation.func_pow = 1035;
remoteutil.operation.func_sqrt = 1037;
remoteutil.operation.func_sqr = 1039;
remoteutil.operation.func_exp = 1041;
remoteutil.operation.func_ln = 1043;
remoteutil.operation.func_rnd = 1047;
remoteutil.operation.func_floor = 1049;
remoteutil.operation.func_ceiling = 1051;
remoteutil.operation.func_round = 1053;
remoteutil.operation.const_e = 1055;
remoteutil.operation.const_pi = 1057;
remoteutil.operation.const_nan = 1059;
remoteutil.operation.const_now = 1061;
remoteutil.operation.const_null = 1063;
//remoteutil.operation.const_user = 1065;
//remoteutil.operation.const_access = 1067;
remoteutil.operation.oprt_selector = 1052; // .  1
remoteutil.operation.oprt_caseleftgroup = 1058; // [
remoteutil.operation.oprt_caserightgroup = 1060; // ]
remoteutil.operation.oprt_prefinc = 1062; /* ++*/
remoteutil.operation.oprt_prefdec = 1064; /* --*/
remoteutil.operation.select_time = 1066; /*  .time*/                                              //( tagged) 
remoteutil.operation.select_logtime = 1068; /*  .logtime*/                                   //( tagged) 
remoteutil.operation.select_error = 1070; /* .error*/                                              //( tagged)
remoteutil.operation.select_valid = 1072; /* .valid*/                                               //( tagged)
remoteutil.operation.select_epoch = 1074; /* .epoch*/
remoteutil.operation.select_msc = 1076; /* .msc*/
remoteutil.operation.select_sec = 1078; /* .sec*/
remoteutil.operation.select_minute = 1080; /* .minute*/
remoteutil.operation.select_hour = 1082; /* .hour*/
remoteutil.operation.select_day = 1084; /* .day*/
remoteutil.operation.select_month = 1086; /* .month*/
remoteutil.operation.select_year = 1088; /* .year*/
remoteutil.operation.select_dayweek = 1090; /* .dayweek*/
remoteutil.operation.select_dayyear = 1092; /* .dayyear*/
remoteutil.operation.select_epochmsc = 1094; /* .dayyear*/
remoteutil.operation.select_epochminute = 1096; /* .epochminute*/
remoteutil.operation.select_epochhour = 1098; /* .epochhour*/
remoteutil.operation.select_epochday = 1100; /* .epochday*/
remoteutil.operation.select_monthdays = 1102; /* .epochday*/
remoteutil.operation.select_lastvalue = 1104; /* .lastvalue*/                                 //( tagged)
remoteutil.operation.func_incmsc = 1105; /* incmsc(*/
remoteutil.operation.func_incsec = 1107; /* incsec(*/
remoteutil.operation.func_incminute = 1109; /* incminute(*/
remoteutil.operation.func_inchour = 1111; /* inchour(*/
remoteutil.operation.func_incday = 1113; /* incday(*/
remoteutil.operation.func_log10 = 1115; /* log10*/
remoteutil.operation.func_tan = 1117; /* tan*/
remoteutil.operation.func_acos = 1119; /* acos*/
remoteutil.operation.func_asin = 1121; /* asin*/
remoteutil.operation.func_atan = 1123; /* atan*/
remoteutil.operation.func_cosh = 1125; /* cosh*/
remoteutil.operation.func_sinh = 1127; /* sinh*/
remoteutil.operation.func_tanh = 1129; /* tanh*/
remoteutil.operation.func_format = 1131; /* format*/
remoteutil.operation.select_comment = 1110; /* .comment*/                                   //( tagged)
remoteutil.operation.select_binding = 1112; /* .binding*/                                          //( tagged) 
remoteutil.operation.select_eu = 1114; /* .eu*/                                                            //( tagged)  
remoteutil.operation.select_alarmmsg = 1116; /* .alarmmsg*/                               //( tagged)
remoteutil.operation.select_alarmlevel = 1118; /* .alarmlevel*/                               //( tagged) 
remoteutil.operation.func_ack = 1225; /* ack(*/                                                            //( multi tagged func)
remoteutil.operation.func_nack = 1227; /* nack(*/                                                       //( multi tagged func)
remoteutil.operation.func_alarm = 1229; /* alarm(*/                                                   //( multi tagged func)
remoteutil.operation.func_alarmlevel = 1231; /* alarmlevel(*/                                   //( tagged)
remoteutil.operation.func_tags = 1233; /* tags(*/
remoteutil.operation.oprt_opnot = 2001; // !  2
remoteutil.operation.oprt_opexnot = 2003; // ~  2
remoteutil.operation.oprt_add_unary = 2005; // +   2
remoteutil.operation.oprt_sub_unary = 2007; // -   2
remoteutil.operation.oprt_allvalid_unary = 2009; // -   &tag allways valid
remoteutil.operation.oper_cast_basetype = 2021; // (notype)
remoteutil.operation.oper_cast_num64 = 2023; // (num64)
remoteutil.operation.oper_cast_unum64 = 2025; // (unum64)
remoteutil.operation.oper_cast_num32 = 2027; // (num32)
remoteutil.operation.oper_cast_unum32 = 2029; // (unum32)
remoteutil.operation.oper_cast_num16 = 2031; // (num16)
remoteutil.operation.oper_cast_unum16 = 2033; // (unum16)
remoteutil.operation.oper_cast_num8 = 2035; // (num8)
remoteutil.operation.oper_cast_unum8 = 2037; // (unum8)
remoteutil.operation.oper_cast_float = 2039; // (float)
remoteutil.operation.oper_cast_double = 2041; // (double)
remoteutil.operation.oper_cast_bool = 2043; // (bool)
remoteutil.operation.oper_cast_time = 2045; // (time)
remoteutil.operation.oper_cast_text = 2049; // (text)
remoteutil.operation.oper_cast_vbool = 2051; // (vbool)
remoteutil.operation.oprt_mult = 3000; // *   3
remoteutil.operation.oprt_div = 3002; // /  3
remoteutil.operation.oprt_modulo = 3004; //  %  3
remoteutil.operation.oprt_add = 4000; // +   4
remoteutil.operation.oprt_sub = 4002; // -   4
remoteutil.operation.oprt_bitleft = 5000; // <<   5
remoteutil.operation.oprt_bitright = 5002; // >>   5
remoteutil.operation.oprt_cyclbitleft = 5004; // <<<   5
remoteutil.operation.oprt_cyclbitright = 5006; // >>>   5
remoteutil.operation.oprt_compless = 6000; // <    6
remoteutil.operation.oprt_complessoreq = 6002; // <= 6
remoteutil.operation.oprt_compmore = 6004; // >    6
remoteutil.operation.oprt_compmoreoreq = 6006; // >= 6
remoteutil.operation.oprt_compeq = 7000; // ==    7
remoteutil.operation.oprt_compnoteq = 7002; // != 7
remoteutil.operation.oprt_bitand = 8000; // & 8
remoteutil.operation.oprt_bitexor = 9000; // ^ 9
remoteutil.operation.oprt_bitor = 10000; // | 10
remoteutil.operation.oprt_logicand = 11000; // && 11
remoteutil.operation.oprt_logicor = 12000; // || 12
remoteutil.operation.oprt_condit = 13001; //  ?
remoteutil.operation.oprt_casedelim = 13058; /* :*/
remoteutil.operation.oprt_command = 14000; /* @*/
remoteutil.operation.oprt_kvit = 14051; /* #*/
remoteutil.operation.oprt_command1 = 14020; /* @@*/
remoteutil.operation.oprt_commandset = 14060; /* @= */
remoteutil.operation.oprt_commandset1 = 14080; /* @@ =*/
remoteutil.operation.oprt_assign = 14100; /* = */
remoteutil.operation.oprt_postinc = 15000; /* ++*/
remoteutil.operation.oprt_comma = 15002; //1004;remoteutil.operation. //;remoteutil.operation.
remoteutil.operation.oprt_postdec = 15020; /* --*/


remoteutil.oper = {};

remoteutil.oper['('] = remoteutil.operation.oprt_leftgroup;
remoteutil.oper[')'] = remoteutil.operation.oprt_rightgroup;
remoteutil.oper['.mineu'] = remoteutil.operation.select_mineu;
remoteutil.oper['.maxeu'] = remoteutil.operation.select_maxeu;
remoteutil.oper['.ack'] = remoteutil.operation.select_ack;
remoteutil.oper['.nack'] = remoteutil.operation.select_nack;
remoteutil.oper['.alarm'] = remoteutil.operation.select_alarm;
remoteutil.oper['mod'] = remoteutil.operation.select_mod;
remoteutil.oper['.num'] = remoteutil.operation.select_num;
remoteutil.oper['num'] = remoteutil.operation.func_num;
remoteutil.oper['.real'] = remoteutil.operation.select_real;
remoteutil.oper['real'] = remoteutil.operation.func_real;
remoteutil.oper['.bool'] = remoteutil.operation.select_bool;
remoteutil.oper['bool'] = remoteutil.operation.func_bool;
remoteutil.oper['min'] = remoteutil.operation.func_min;
remoteutil.oper['max'] = remoteutil.operation.func_max;
remoteutil.oper['abs'] = remoteutil.operation.func_abs;
remoteutil.oper['sin'] = remoteutil.operation.func_sin;
remoteutil.oper['cos'] = remoteutil.operation.func_cos;
remoteutil.oper['pow'] = remoteutil.operation.func_pow;
remoteutil.oper['sqrt'] = remoteutil.operation.func_sqrt;
remoteutil.oper['sqr'] = remoteutil.operation.func_sqr;
remoteutil.oper['exp'] = remoteutil.operation.func_exp;
remoteutil.oper['ln'] = remoteutil.operation.func_ln;
remoteutil.oper['rnd'] = remoteutil.operation.func_rnd;
remoteutil.oper['floor'] = remoteutil.operation.func_floor;
remoteutil.oper['ceiling'] = remoteutil.operation.func_ceiling;
remoteutil.oper['round'] = remoteutil.operation.func_round;
remoteutil.oper['e'] = remoteutil.operation.const_e;
remoteutil.oper['pi'] = remoteutil.operation.const_pi;
remoteutil.oper['nan'] = remoteutil.operation.const_nan;
remoteutil.oper['now'] = remoteutil.operation.const_now;
remoteutil.oper['null'] = remoteutil.operation.const_null;
//remoteutil.oper['user'] = remoteutil.operation.const_user;
//remoteutil.oper['access'] = remoteutil.operation.const_access;
remoteutil.oper['.'] = remoteutil.operation.oprt_selector;
remoteutil.oper['['] = remoteutil.operation.oprt_caseleftgroup;
remoteutil.oper[']'] = remoteutil.operation.oprt_caserightgroup;
remoteutil.oper['++'] = remoteutil.operation.oprt_prefinc;
remoteutil.oper['--'] = remoteutil.operation.oprt_prefdec;
remoteutil.oper['.time'] = remoteutil.operation.select_time;
remoteutil.oper['.logtime'] = remoteutil.operation.select_logtime;
remoteutil.oper['.error'] = remoteutil.operation.select_error;
remoteutil.oper['.valid'] = remoteutil.operation.select_valid;
remoteutil.oper['.epoch'] = remoteutil.operation.select_epoch;
remoteutil.oper['.msc'] = remoteutil.operation.select_msc;
remoteutil.oper['.sec'] = remoteutil.operation.select_sec;
remoteutil.oper['.minute'] = remoteutil.operation.select_minute;
remoteutil.oper['.hour'] = remoteutil.operation.select_hour;
remoteutil.oper['.day'] = remoteutil.operation.select_day;
remoteutil.oper['.month'] = remoteutil.operation.select_month;
remoteutil.oper['.year'] = remoteutil.operation.select_year;
remoteutil.oper['.dayweek'] = remoteutil.operation.select_dayweek;
remoteutil.oper['.dayyear'] = remoteutil.operation.select_dayyear;
remoteutil.oper['.epochmsc'] = remoteutil.operation.select_epochmsc;
remoteutil.oper['.epochminute'] = remoteutil.operation.select_epochminute;
remoteutil.oper['.epochhour'] = remoteutil.operation.select_epochhour;
remoteutil.oper['.epochday'] = remoteutil.operation.select_epochday;
remoteutil.oper['.monthdays'] = remoteutil.operation.select_monthdays;
remoteutil.oper['.lastvalue'] = remoteutil.operation.select_lastvalue;
remoteutil.oper['incmsc'] = remoteutil.operation.func_incmsc;
remoteutil.oper['incsec'] = remoteutil.operation.func_incsec;
remoteutil.oper['incminute'] = remoteutil.operation.func_incminute;
remoteutil.oper['inchour'] = remoteutil.operation.func_inchour;
remoteutil.oper['incday'] = remoteutil.operation.func_incday;
remoteutil.oper['log10'] = remoteutil.operation.func_log10;
remoteutil.oper['tan'] = remoteutil.operation.func_tan;
remoteutil.oper['acos'] = remoteutil.operation.func_acos;
remoteutil.oper['asin'] = remoteutil.operation.func_asin;
remoteutil.oper['atan'] = remoteutil.operation.func_atan;
remoteutil.oper['cosh'] = remoteutil.operation.func_cosh;
remoteutil.oper['sinh'] = remoteutil.operation.func_sinh;
remoteutil.oper['tanh'] = remoteutil.operation.func_tanh;
remoteutil.oper['format'] = remoteutil.operation.func_format;
remoteutil.oper['.comment'] = remoteutil.operation.select_comment;
remoteutil.oper['.binding'] = remoteutil.operation.select_binding;
remoteutil.oper['.eu'] = remoteutil.operation.select_eu;
remoteutil.oper['.alarmmsg'] = remoteutil.operation.select_alarmmsg;
remoteutil.oper['.alarmlevel'] = remoteutil.operation.select_alarmlevel;
remoteutil.oper['ack'] = remoteutil.operation.func_ack;
remoteutil.oper['nack'] = remoteutil.operation.func_nack;
remoteutil.oper['alarm'] = remoteutil.operation.func_alarm;
remoteutil.oper['alarmlevel'] = remoteutil.operation.func_alarmlevel;
remoteutil.oper['tags'] = remoteutil.operation.func_tags;
remoteutil.oper['!'] = remoteutil.operation.oprt_opnot;
remoteutil.oper['~'] = remoteutil.operation.oprt_opexnot;
remoteutil.oper['+'] = remoteutil.operation.oprt_add_unary;
remoteutil.oper['-'] = remoteutil.operation.oprt_sub_unary;
//remoteutil.oper['(']=remoteutil.operation.oprt_allvalid_unary;
remoteutil.oper['(notype)'] = remoteutil.operation.oper_cast_basetype;
remoteutil.oper['(num64)'] = remoteutil.operation.oper_cast_num64;
remoteutil.oper['(unum64)'] = remoteutil.operation.oper_cast_unum64;
remoteutil.oper['(num32)'] = remoteutil.operation.oper_cast_num32;
remoteutil.oper['(unum32)'] = remoteutil.operation.oper_cast_unum32;
remoteutil.oper['(num16)'] = remoteutil.operation.oper_cast_num16;
remoteutil.oper['(unum16)'] = remoteutil.operation.oper_cast_unum16;
remoteutil.oper['(num8)'] = remoteutil.operation.oper_cast_num8;
remoteutil.oper['(unum8)'] = remoteutil.operation.oper_cast_unum8;
remoteutil.oper['(float)'] = remoteutil.operation.oper_cast_float;
remoteutil.oper['(double)'] = remoteutil.operation.oper_cast_double;
remoteutil.oper['(bool)'] = remoteutil.operation.oper_cast_bool;
remoteutil.oper['(time)'] = remoteutil.operation.oper_cast_time;
remoteutil.oper['(text)'] = remoteutil.operation.oper_cast_text;
remoteutil.oper['(vbool)'] = remoteutil.operation.oper_cast_vbool;
remoteutil.oper['*'] = remoteutil.operation.oprt_mult;
remoteutil.oper['/'] = remoteutil.operation.oprt_div;
remoteutil.oper['%'] = remoteutil.operation.oprt_modulo;
remoteutil.oper['+'] = remoteutil.operation.oprt_add;
remoteutil.oper['-'] = remoteutil.operation.oprt_sub;
remoteutil.oper['<<'] = remoteutil.operation.oprt_bitleft;
remoteutil.oper['>>'] = remoteutil.operation.oprt_bitright;
remoteutil.oper['<<<'] = remoteutil.operation.oprt_cyclbitleft;
remoteutil.oper['>>>'] = remoteutil.operation.oprt_cyclbitright;
remoteutil.oper['<'] = remoteutil.operation.oprt_compless;
remoteutil.oper['<='] = remoteutil.operation.oprt_complessoreq;
remoteutil.oper['>'] = remoteutil.operation.oprt_compmore;
remoteutil.oper['>='] = remoteutil.operation.oprt_compmoreoreq;
remoteutil.oper['=='] = remoteutil.operation.oprt_compeq;
remoteutil.oper['!='] = remoteutil.operation.oprt_compnoteq;
remoteutil.oper['&'] = remoteutil.operation.oprt_bitand;
remoteutil.oper['^'] = remoteutil.operation.oprt_bitexor;
remoteutil.oper['|'] = remoteutil.operation.oprt_bitor;
remoteutil.oper['&&'] = remoteutil.operation.oprt_logicand;
remoteutil.oper['||'] = remoteutil.operation.oprt_logicor;
remoteutil.oper['?'] = remoteutil.operation.oprt_condit;
remoteutil.oper[':'] = remoteutil.operation.oprt_casedelim;
remoteutil.oper['@'] = remoteutil.operation.oprt_command;
remoteutil.oper['#'] = remoteutil.operation.oprt_kvit;
remoteutil.oper['@@'] = remoteutil.operation.oprt_command1;
remoteutil.oper['@='] = remoteutil.operation.oprt_commandset;
remoteutil.oper['@@='] = remoteutil.operation.oprt_commandset1;
remoteutil.oper['='] = remoteutil.operation.oprt_assign;
//remoteutil.oper['(']=remoteutil.operation.oprt_postinc = 15000; /* ++*/
remoteutil.oper[','] = remoteutil.operation.oprt_comma;
//remoteutil.oper['(']=remoteutil.operation.oprt_postdec = 15020;




//value

remoteutil.value = function (val, valid) {
    this.value = val;
    this.valid = (valid === undefined) ? (val !== undefined ? 100 : 0) : valid;
}

remoteutil.value.prototype.getValue = function () {
    return this.value;
}

remoteutil.value.prototype.getValid = function () {
    return this.valid ? this.valid : 0;
}

//+
remoteutil.value.add = function (ls, rs) {
    return new remoteutil.value(rs.getValue() + ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
}

//-
remoteutil.value.sub = function (ls, rs) {
    return new remoteutil.value(rs.getValue() - ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
}

//*
remoteutil.value.mult = function (ls, rs) {
    return new remoteutil.value(rs.getValue() * ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
}

// /
remoteutil.value.div = function (ls, rs) {
    return new remoteutil.value(rs.getValue() / ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
}

remoteutil.value.modulo = function (ls, rs) {
    return new remoteutil.value(rs.getValue() % ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
}

remoteutil.value.bitleft = function (ls, rs) {
    return new remoteutil.value(rs.getValue() << ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // <<   5

remoteutil.value.bitright = function (ls, rs) {
    return new remoteutil.value(rs.getValue() >> ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // >>   5

remoteutil.value.cyclbitleft = function (ls, rs) {
    return new remoteutil.value(rs.getValue() << ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // <<<   5

remoteutil.value.cyclbitright = function (ls, rs) {
    return new remoteutil.value(rs.getValue() >> ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // >>>   5

remoteutil.value.compless = function (ls, rs) {
    return new remoteutil.value(rs.getValue() < ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // <    6

remoteutil.value.complessoreq = function (ls, rs) {
    return new remoteutil.value(rs.getValue() <= ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // <= 6

remoteutil.value.compmore = function (ls, rs) {
    return new remoteutil.value(rs.getValue() > ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // >    6

remoteutil.value.compmoreoreq = function (ls, rs) {
    return new remoteutil.value(rs.getValue() >= ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // >= 6

remoteutil.value.compeq = function (ls, rs) {
    return new remoteutil.value(rs.getValue() == ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // ==    7

remoteutil.value.compnoteq = function (ls, rs) {
    return new remoteutil.value(rs.getValue() != ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // != 7

remoteutil.value.bitand = function (ls, rs) {
    return new remoteutil.value(rs.getValue() & ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // & 8

remoteutil.value.bitexor = function (ls, rs) {
    return new remoteutil.value(rs.getValue() ^ ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // ^ 9

remoteutil.value.bitor = function (ls, rs) {
    return new remoteutil.value(rs.getValue() | ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // | 10

remoteutil.value.logicand = function (ls, rs) {
    return new remoteutil.value(rs.getValue() && ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // && 11

remoteutil.value.logicor = function (ls, rs) {
    return new remoteutil.value(rs.getValue() || ls.getValue(), Math.min(ls.getValid(), rs.getValid()));
} // || 12

remoteutil.value.simplebeoper = {};

remoteutil.value.simplebeoper[remoteutil.operation.oprt_add] = remoteutil.value.add;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_sub] = remoteutil.value.sub;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_mult] = remoteutil.value.mult;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_div] = remoteutil.value.div;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_modulo] = remoteutil.value.modulo;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_bitleft] = remoteutil.value.bitleft;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_bitright] = remoteutil.value.bitright;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_cyclbitleft] = remoteutil.value.cyclbitleft;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_cyclbitright] = remoteutil.value.cyclbitright;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_compless] = remoteutil.value.compless;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_complessoreq] = remoteutil.value.complessoreq;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_compmore] = remoteutil.value.compmore;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_compmoreoreq] = remoteutil.value.compmoreoreq;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_compeq] = remoteutil.value.compeq;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_compnoteq] = remoteutil.value.compnoteq;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_bitand] = remoteutil.value.bitand;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_bitexor] = remoteutil.value.bitexor;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_bitor] = remoteutil.value.bitor;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_logicand] = remoteutil.value.logicand;
remoteutil.value.simplebeoper[remoteutil.operation.oprt_logicor] = remoteutil.value.logicor;


// !
remoteutil.value.opnot = function (ar) {
    return new remoteutil.value(ar.getValue() ? false : true, ar.getValid());
}

//~
remoteutil.value.opexnot = function (ar) {
    return new remoteutil.value(~ar.getValue(), ar.getValid());
}

// +
remoteutil.value.add_unary = function (ar) {
    return new remoteutil.value(+ar.getValue(), ar.getValid());
}

//-
remoteutil.value.sub_unary = function (ar) {
    return new remoteutil.value(-ar.getValue(), ar.getValid());
}

//&
remoteutil.value.allvalid_unary = function (ar) {
    return new remoteutil.value(ar.getValue(), 100);
}

//.valid
remoteutil.value.select_valid = function (ar) {
    return new remoteutil.value(ar.getValid(), 100);
}


remoteutil.value.min_max_range_cast = function (ar, min, max) {
    return  ((ar === undefined || ar === null) || (ar >= min && ar <= max)) ? ar : ((ar < min) ? min : max);
}

remoteutil.value.cast_basetype = function (ar) {
    return new remoteutil.value(parseFloat(ar.getValue()), ar.getValid());
}

remoteutil.value.cast_num64 = function (ar) {
    return new remoteutil.value(parseInt(ar.getValue()), ar.getValid());
}

remoteutil.value.cast_unum64 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            0, 0x7FFFFFFFFFFFFFFF), ar.getValid());
}

remoteutil.value.cast_num32 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            -0x80000000, 0x7FFFFFFF), ar.getValid());
}

remoteutil.value.cast_unum32 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            0, 0xFFFFFFFF), ar.getValid());
}

remoteutil.value.cast_num16 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            -0x8000, 0x7FFF), ar.getValid());
}

remoteutil.value.cast_unum16 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            0, 0xFFFF), ar.getValid());
}

remoteutil.value.cast_num8 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            -0x80, 0x7F), ar.getValid());
}

remoteutil.value.cast_unum8 = function (ar) {
    return new remoteutil.value(remoteutil.value.min_max_range_cast(parseInt(ar.getValue()),
            0, 0xFF), ar.getValid());
}

remoteutil.value.cast_float = function (ar) {
    return new remoteutil.value(parseFloat(ar.getValue()), ar.getValid());
}

remoteutil.value.cast_double = function (ar) {
    return new remoteutil.value(parseFloat(ar.getValue()), ar.getValid());
}

remoteutil.value.cast_bool = function (ar) {
    return new remoteutil.value(ar.getValue() ? true : false, ar.getValid());
}

remoteutil.value.cast_time = function (ar) {
    return new remoteutil.value(new Date(ar.getValue()), ar.getValid());
}

remoteutil.value.cast_text = function (ar) {
    return new remoteutil.value(ar.getValue().toString(), ar.getValid());
}

remoteutil.value.cast_vbool = function (ar) {
    return new remoteutil.value(ar.getValue() ? true : false, ar.getValid());
}

remoteutil.value.select_num = function (ar) {
    return new remoteutil.value(parseInt(ar.getValue()), ar.getValid());
}

remoteutil.value.func_num = function (ar) {
    return new remoteutil.value(parseInt(ar.getValue()), ar.getValid());
}

remoteutil.value.select_real = function (ar) {
    return new remoteutil.value(parseFloat(ar.getValue()), ar.getValid());
}

remoteutil.value.func_real = function (ar) {
    return new remoteutil.value(parseFloat(ar.getValue()), ar.getValid());
}

remoteutil.value.select_bool = function (ar) {
    return new remoteutil.value(ar.getValue() ? true : false, ar.getValid());
}

remoteutil.value.func_bool = function (ar) {
    return new remoteutil.value(ar.getValue() ? true : false, ar.getValid());
}



remoteutil.value.simpleunoper = {};


remoteutil.value.simpleunoper[remoteutil.operation.oprt_opnot] = remoteutil.value.opnot;
remoteutil.value.simpleunoper[remoteutil.operation.oprt_opexnot] = remoteutil.value.opexnot;
remoteutil.value.simpleunoper[remoteutil.operation.oprt_add_unary] = remoteutil.value.add_unary;
remoteutil.value.simpleunoper[remoteutil.operation.oprt_sub_unary] = remoteutil.value.sub_unary;
remoteutil.value.simpleunoper[remoteutil.operation.oprt_allvalid_unary] = remoteutil.value.allvalid_unary;
remoteutil.value.simpleunoper[remoteutil.operation.select_valid] = remoteutil.value.select_valid;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_basetype] = remoteutil.value.cast_basetype;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_num64] = remoteutil.value.cast_num64;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_unum64] = remoteutil.value.cast_unum64;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_num32] = remoteutil.value.cast_num32;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_unum32] = remoteutil.value.cast_unum32;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_num16] = remoteutil.value.cast_num16;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_unum16] = remoteutil.value.cast_unum16;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_num8] = remoteutil.value.cast_num8;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_unum8] = remoteutil.value.cast_unum8;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_float] = remoteutil.value.cast_float;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_double] = remoteutil.value.cast_double;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_bool] = remoteutil.value.cast_bool;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_time] = remoteutil.value.cast_time;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_text] = remoteutil.value.cast_text;
remoteutil.value.simpleunoper[remoteutil.operation.oper_cast_vbool] = remoteutil.value.cast_vbool;
remoteutil.value.simpleunoper[remoteutil.operation.select_num] = remoteutil.value.select_num;
remoteutil.value.simpleunoper[remoteutil.operation.func_num] = remoteutil.value.func_num;
remoteutil.value.simpleunoper[remoteutil.operation.select_real] = remoteutil.value.select_real;
remoteutil.value.simpleunoper[remoteutil.operation.func_real] = remoteutil.value.func_real;
remoteutil.value.simpleunoper[remoteutil.operation.select_bool] = remoteutil.value.select_bool;
remoteutil.value.simpleunoper[remoteutil.operation.func_bool] = remoteutil.value.func_bool;



remoteutil.value.func_min = function (arr) {
    var res = new remoteutil.value(arr[0].value, arr[0].valid);
    for (var i = 1; i < arr.length; i++) {
        if (res.value > arr[i].value) {
            res = arr[i];
        }
    }
    return res;
}

remoteutil.value.func_max = function (arr) {
    var res = new remoteutil.value(arr[0].value, arr[0].valid);
    for (var i = 1; i < arr.length; i++) {
        if (res.value < arr[i].value) {
            res = arr[i];
        }
    }
    return res;
}


remoteutil.value.simplegroupoper = {};

remoteutil.value.simplegroupoper[remoteutil.operation.func_min] = remoteutil.value.func_min;
remoteutil.value.simplegroupoper[remoteutil.operation.func_max] = remoteutil.value.func_max;



remoteutil.value.func_abs = function (ar) {
    return new remoteutil.value(Math.abs(ar.getValue()), ar.getValid());
}

remoteutil.value.func_sin = function (ar) {
    return new remoteutil.value(Math.sin(ar.getValue()), ar.getValid());
}

remoteutil.value.func_cos = function (ar) {
    return new remoteutil.value(Math.cos(ar.getValue()), ar.getValid());
}

//remoteutil.value.func_pow = 1035;

remoteutil.value.func_sqrt = function (ar) {
    return new remoteutil.value(Math.sqrt(ar.getValue()), ar.getValid());
}

remoteutil.value.func_sqr = function (ar) {
    return new remoteutil.value(Math.pow(ar.getValue(), 2), ar.getValid());
}

remoteutil.value.func_exp = function (ar) {
    return new remoteutil.value(Math.exp(ar.getValue()), ar.getValid());
}

remoteutil.value.func_ln = function (ar) {
    return new remoteutil.value(Math.log(ar.getValue()), ar.getValid());
}


//remoteutil.value.func_rnd = 1047;

remoteutil.value.func_floor = function (ar) {
    return new remoteutil.value(Math.floor(ar.getValue()), ar.getValid());
}

remoteutil.value.func_ceiling = function (ar) {
    return new remoteutil.value(Math.ceil(ar.getValue()), ar.getValid());
}

remoteutil.value.func_round = function (ar) {
    return new remoteutil.value(Math.round(ar.getValue()), ar.getValid());
}

remoteutil.value.func_log10 = function (ar) {
    return new remoteutil.value(Math.log(ar.getValue() / Math.log(10)), ar.getValid());
}

remoteutil.value.func_tan = function (ar) {
    return new remoteutil.value(Math.tan(ar.getValue()), ar.getValid());
}

remoteutil.value.func_acos = function (ar) {
    return new remoteutil.value(Math.acos(ar.getValue()), ar.getValid());
}

remoteutil.value.func_asin = function (ar) {
    return new remoteutil.value(Math.asin(ar.getValue()), ar.getValid());
}

remoteutil.value.func_atan = function (ar) {
    return new remoteutil.value(Math.atan(ar.getValue()), ar.getValid());
}

remoteutil.value.func_cosh = function (ar) {
    return new remoteutil(Math.asin(2), ar.getValid());
}

remoteutil.value.func_sinh = function (ar) {
    return new remoteutil(Math.asin(2), ar.getValid());
}

remoteutil.value.func_tanh = function (ar) {
    return new remoteutil(Math.asin(2), ar.getValid());
}

remoteutil.value.func_format = function (frmt, vl) {
    return new remoteutil.value(vl.getValue().toString(), vl.getValid());
}


remoteutil.value.mathfunc = {};



remoteutil.value.mathfunc[remoteutil.operation.func_abs] = remoteutil.value.func_abs;
remoteutil.value.mathfunc[remoteutil.operation.func_sin] = remoteutil.value.func_sin;
remoteutil.value.mathfunc[remoteutil.operation.func_cos] = remoteutil.value.func_cos;
//remoteutil.value.mathfunc[remoteutil.operation.func_pow]=remoteutil.value.select_num;
remoteutil.value.mathfunc[remoteutil.operation.func_sqrt] = remoteutil.value.func_sqrt;
remoteutil.value.mathfunc[remoteutil.operation.func_sqr] = remoteutil.value.func_sqr;
remoteutil.value.mathfunc[remoteutil.operation.func_exp] = remoteutil.value.func_exp;
remoteutil.value.mathfunc[remoteutil.operation.func_ln] = remoteutil.value.func_ln;
//remoteutil.value.mathfunc[remoteutil.operation.func_rnd]=remoteutil.value.select_num;
remoteutil.value.mathfunc[remoteutil.operation.func_floor] = remoteutil.value.func_floor;
remoteutil.value.mathfunc[remoteutil.operation.func_ceiling] = remoteutil.value.func_ceiling;
remoteutil.value.mathfunc[remoteutil.operation.func_round] = remoteutil.value.func_round;
remoteutil.value.mathfunc[remoteutil.operation.func_log10] = remoteutil.value.func_log10;
remoteutil.value.mathfunc[remoteutil.operation.func_tan] = remoteutil.value.func_tan;
remoteutil.value.mathfunc[remoteutil.operation.func_acos] = remoteutil.value.func_acos;
remoteutil.value.mathfunc[remoteutil.operation.func_asin] = remoteutil.value.func_asin;
remoteutil.value.mathfunc[remoteutil.operation.func_atan] = remoteutil.value.func_atan;
remoteutil.value.mathfunc[remoteutil.operation.func_cosh] = remoteutil.value.func_cosh;
remoteutil.value.mathfunc[remoteutil.operation.func_sinh] = remoteutil.value.func_sinh;
remoteutil.value.mathfunc[remoteutil.operation.func_tanh] = remoteutil.value.func_tanh;
remoteutil.value.mathfunc[remoteutil.operation.func_format] = remoteutil.value.func_format;

remoteutil.value.build = function (data) {
    if (data && data['type'] && data['value'] !== undefined) {
        switch (parseInt(data['type'])) {
            case remoteutil.regexstr.TYPE_NODEF:
            case remoteutil.regexstr.TYPE_DOUBLE:
            case remoteutil.regexstr.TYPE_FLOAT:
                return new remoteutil.value(parseFloat(data['value']), parseInt(data['valid']));
            case remoteutil.regexstr.TYPE_NUM64:
            case remoteutil.regexstr.TYPE_UNUM64:
            case remoteutil.regexstr.TYPE_NUM32:
            case remoteutil.regexstr.TYPE_UNUM32:
            case remoteutil.regexstr.TYPE_NUM16:
            case remoteutil.regexstr.TYPE_UNUM16:
            case remoteutil.regexstr.TYPE_NUM8:
            case remoteutil.regexstr.TYPE_UNUM8:
                return new remoteutil.value(parseInt(data['value']), parseInt(data['valid']));
            case remoteutil.regexstr.TYPE_DISCRET:
                return new remoteutil.value((data['value'] && data['value'] != '0') ? true : false, parseInt(data['valid']));
            case remoteutil.regexstr.TYPE_TEXT:
                return new remoteutil.value(data['value'], parseInt(data['valid']));
            default:
            {
            }
            //case remoteutil.regexstr.TYPE_TM:
        }
    }
    return new remoteutil.value(data['value']);
}

//token

remoteutil.token = function (atom, intf, rootexpr) {
    this.text = atom;
    this.oper = remoteutil.oper[atom];
    if (!this.oper) {
        if (remoteutil.regex.equal(this.text, remoteutil.regex.NUMBER_EXT)) {
            if (remoteutil.regex.equal(this.text, remoteutil.regex.NUMBER_BIN)) {
                this.value = new remoteutil.value((this.text.length > 2) ? parseInt(this.text.substring(2), 2) : undefined);
            }
            else if (remoteutil.regex.equal(this.text, remoteutil.regex.NUMBER_HEX)) {
                this.value = new remoteutil.value(parseInt(this.text, 16));
            }
            else if (remoteutil.regex.equal(this.text, remoteutil.regex.NUMBER_FP)) {
                this.value = new remoteutil.value(parseFloat(this.text));
            }
            else if (remoteutil.regex.equal(this.text, remoteutil.regex.NUMBER_OCT)) {
                this.value = new remoteutil.value((this.text.length) ? parseInt(this.text, 8) : undefined);
            } else
                this.value = new remoteutil.value(parseInt(this.text));
            this.oper = remoteutil.operation.constant;
        }
        else if (remoteutil.regex.equal(this.text, remoteutil.regex.STRING1)) {
            this.value = new remoteutil.value((this.text.length > 2) ? this.text.substring(1, this.text.length - 1) : '');
            this.oper = remoteutil.operation.constant;
        }
        else if (remoteutil.regex.equal(this.text, remoteutil.regex.STRING2)) {
            this.value = new remoteutil.value((this.text.length > 2) ? this.text.substring(1, this.text.length - 1) : '');
            this.oper = remoteutil.operation.constant;
        }
        else if (remoteutil.regex.equal(this.text, remoteutil.regex.CORRECT_ENTETYNAME_EXT)) {
            this.expr = this.text;
            this.oper = remoteutil.operation.expr;
            this.value = intf.addTag(this.expr, rootexpr);
            if (!rootexpr.referenced)
                rootexpr.referenced = true;
        }
        else
            this.oper = remoteutil.operation.notoperation;
        // need const or tag
    }
    else {
        switch (this.oper) {
            case remoteutil.operation.const_e:
            {
                this.oper = remoteutil.operation.constant;
                this.value = new remoteutil.value(Math.E);
                break;
            }
            case  remoteutil.operation.const_pi:
            {
                this.oper = remoteutil.operation.constant;
                this.value = new remoteutil.value(Math.PI);
                break;
            }
            case  remoteutil.operation.const_nan:
            {
                this.oper = remoteutil.operation.constant;
                this.value = new remoteutil.value(Number.NaN);
                break;
            }
            case  remoteutil.operation.const_now:
            {
                this.oper = remoteutil.operation.constant;
                this.value = new remoteutil.value(new Date());
                break;
            }
            case  remoteutil.operation.const_null:
            {
                this.oper = remoteutil.operation.constant;
                this.value = new remoteutil.value(null);
                break;
            }
        }
    }
};

remoteutil.token.prototype.getText = function () {
    return this.text;
}

remoteutil.token.prototype.getOper = function () {
    return this.oper;
}

remoteutil.token.prototype.getPriority = function () {
    return this.oper ? Math.floor(this.oper / 1000) : 0;
}

remoteutil.token.prototype.getRightSide = function () {
    return this.oper ? ((this.oper % 2) !== 0) : false;
}

remoteutil.token.prototype.getUnary = function () {
    return this.unary;
}

remoteutil.token.prototype.canUnary = function () {
    return ((this.oper === remoteutil.operation.oprt_add) ||
            (this.oper === remoteutil.operation.oprt_sub) ||
            (this.oper === remoteutil.operation.oprt_bitand));
}

remoteutil.token.prototype.canPostPref = function () {
    return ((this.oper === remoteutil.operation.oprt_prefinc) || (this.oper === remoteutil.operation.oprt_prefdec) ||
            (this.oper === remoteutil.operation.oprt_postinc) || (this.oper === remoteutil.operation.oprt_postdec));
}

remoteutil.token.prototype.setUnary = function () {
    if (this.oper === remoteutil.operation.oprt_add)
        this.oper = remoteutil.operation.oprt_add_unary;
    if (this.oper === remoteutil.operation.oprt_sub)
        this.oper = remoteutil.operation.oprt_sub_unary;
    if (this.oper === remoteutil.operation.oprt_bitand)
        this.oper = remoteutil.operation.oprt_allvalid_unary;
}

remoteutil.token.findUnary = function (oper) {
    return oper && ((oper.getOper() >= 2000) ||
            (oper.getOper() === remoteutil.operation.oprt_leftgroup) ||
            (oper.getOper() === remoteutil.operation.oprt_comma));
}

remoteutil.token.prototype.setPostfix = function () {
    if (this.oper === remoteutil.operation.oprt_prefinc)
        this.oper = remoteutil.operation.oprt_postinc;
    if (this.oper === remoteutil.operation.oprt_prefdec)
        this.oper = remoteutil.operation.oprt_postdec;
}

remoteutil.token.prototype.isGroup = function () {
    return ((this.oper === remoteutil.operation.oprt_leftgroup) ||
            (this.oper === remoteutil.operation.oprt_rightgroup) ||
            (this.oper === remoteutil.operation.oprt_caseleftgroup));
}

remoteutil.token.prototype.valid = function () {
    switch (this.oper) {
        case remoteutil.operation.expr:
        {
            return this.value ? this.value.getValid() : 0;
        }
        case remoteutil.operation.constant:
        {
            return this.value ? this.value.getValid() : 0;
        }
    }
    return 0;
}

//exprassion

remoteutil.expression = function (ex, intf, rootexpr) {
    this.expr = ex;
    if (this.expr)
        this.build(this.expr, intf, rootexpr);

};

remoteutil.expression.prototype.build = function (expr, intf, rootexpr) {
    var tmp = expr.match(remoteutil.regex.FULLEXPR);
    this.line = [];
    this.polline = [];
    if (tmp && tmp.length) {
        for (var i = 0; i < tmp.length; i++)
            this.line.push(new remoteutil.token(tmp[i], intf, rootexpr));
    }
    if (this.line.length) {
        this.calc_polnotation();
    }
    // if (!this.fatal && this.referenced)
}

remoteutil.expression.is_need_popstack = function (ls, rs) {
    return ((ls.getPriority() < rs.getPriority()) ||
            ((ls.getPriority() === rs.getPriority()) && (!rs.getRightSide())));
}

remoteutil.expression.prototype.calc_polnotation = function () {
    var operation_stack = [];
    var counter = 0;
    var last_oper = undefined;
    for (var i = 0; i < this.line.length; i++) {
        var oper = this.line[i].getOper();
        switch (oper) {
            case remoteutil.operation.notoperation:
            {
                this.fatal = true;
                this.polline = [];
                return;
            }
            case remoteutil.operation.expr:
            {
                if (last_oper && last_oper.getOper() === remoteutil.operation.expr) {
                    this.fatal = true;
                    this.polline = [];
                    return;
                }
                this.polline.push(this.line[i]);
                break;
            }
            case remoteutil.operation.constant:
            {
                this.polline.push(this.line[i]);
                break;
            }
            case remoteutil.operation.oprt_leftgroup:
            {
                operation_stack.push(this.line[i]);
                break;
            }
            case remoteutil.operation.oprt_comma:
            case remoteutil.operation.oprt_rightgroup:
            case remoteutil.operation.oprt_casedelim:
            {
                if (operation_stack.length) {
                    while (operation_stack.length &&
                            (operation_stack[operation_stack.length - 1].getOper() !== remoteutil.operation.oprt_leftgroup) &&
                            (operation_stack[operation_stack.length - 1].getOper() !== remoteutil.operation.oprt_caseleftgroup)) {
                        if (operation_stack[operation_stack.length - 1].getOper() === remoteutil.operation.oprt_condit) {
                            operation_stack.pop()
                            this.polline.push(new remoteutil.token("]"));
                        }
                        else
                            this.polline.push(operation_stack.pop());
                    }
                    if (operation_stack.length &&
                            ((operation_stack[operation_stack.length - 1].getOper() === remoteutil.operation.oprt_leftgroup) ||
                                    (operation_stack[operation_stack.length - 1].getOper() === remoteutil.operation.oprt_caseleftgroup))) {
                        if (oper !== remoteutil.operation.oprt_comma)
                            operation_stack.pop();
                    } else {
                        if (oper !== remoteutil.operation.oprt_comma) {
                            this.fatal = true;
                            this.polline = [];
                            return;
                        }
                    }
                } else {
                    this.fatal = true;
                    this.polline = [];
                    return;
                }
                if (oper === remoteutil.operation.oprt_casedelim)
                    this.polline.push(this.line[i]);
                break;
            }
            default:
            {
                if (operation_stack.length) {
                    if ((this.line[i].canUnary()) && (remoteutil.token.findUnary(last_oper)))
                        this.line[i].setUnary();
                    if (this.line[i].canPostPref())
                        if (!((!this.polline.length) ||
                                (counter && (last_oper && (last_oper.getOper() !== remoteutil.operation.oprt_rightgroup) && (last_oper.getOper() >= 1000)))))
                            this.line[i].setPostfix();
                    if (remoteutil.expression.is_need_popstack(operation_stack[operation_stack.length - 1], this.line[i]))
                        while ((operation_stack.length) &&
                                remoteutil.expression.is_need_popstack(operation_stack[operation_stack.length - 1], this.line[i]) &&
                                (operation_stack[operation_stack.length - 1].getOper() !== remoteutil.operation.oprt_leftgroup)) {
                            if (operation_stack[operation_stack.length - 1].getOper() === remoteutil.operation.oprt_condit) {
                                operation_stack.pop();
                                this.polline.push(new remoteutil.token("]"));
                            } else
                                this.polline.push(operation_stack.pop());
                        }
                } else {
                    if (!this.polline.length) {
                        this.line[i].setUnary();
                    }
                    if (this.line[i].canPostPref())
                        if (!((!this.polline.length) ||
                                (counter && (last_oper && (last_oper.getOper() !== remoteutil.operation.oprt_rightgroup) && (last_oper.getOper() >= 1000)))))
                            this.line[i].setPostfix();
                }
                operation_stack.push(this.line[i]);
                if (oper === remoteutil.operation.oprt_condit) {
                    this.polline.push(new remoteutil.token("["));
                    //casecounter++;
                    operation_stack.push(new remoteutil.token("["));
                }
            }
        }
        counter++;
        last_oper = this.line[i];
        //console.log(i, this.polline, operation_stack);
    }
    if (!this.polline.length && !operation_stack.length) {
        this.fatal = true;
        this.polline = [];
        return;
    }
    while (operation_stack.length) {
        var tp = operation_stack.pop();
        if (tp.isGroup()) {
            this.fatal = true;
            this.polline = [];
            return;
        }
        if (tp.getOper() === remoteutil.operation.oprt_condit)
            this.polline.push(new remoteutil.token("]"));
        else
            this.polline.push(tp);
    }
    //this.print();
}

remoteutil.expression.prototype.setError = function (val) {
    this.error = val ? 1 : val;
}

remoteutil.expression.prototype.calculate = function () {
    if (!this.fatal && this.polline) {
        var calc_stack = [];
        var end = this.polline.length;
        for (var i = 0; i < end; i++) {
            var oper = this.polline[i].getOper();
            if (oper === remoteutil.operation.oprt_caseleftgroup) {
                if (calc_stack.length && i < (--end)) {
                    var cs = calc_stack.pop().getValue();
                    var fnd = 0;
                    var lv = 0;
                    for (var j = i + 1; j < end; j++) {
                        switch (this.polline[j].getOper()) {
                            case remoteutil.operation.oprt_caseleftgroup:
                            {
                                lv++;
                                break;
                            }
                            case remoteutil.operation.oprt_caserightgroup:
                            {
                                lv--;
                                break;
                            }
                            case remoteutil.operation.oprt_casedelim:
                            {
                                if (lv === 0) {
                                    fnd = j;
                                    break;
                                }
                            }
                        }
                    }
                    if (fnd) {
                        if (cs) {
                            end = fnd;
                        }
                        else {
                            i = fnd;
                        }
                    }
                    else {
                        return this.setError();
                    }
                }
                else {
                    return this.setError();
                }
            }
            else {
                switch (oper) {
                    case remoteutil.operation.expr:
                    {
                        calc_stack.push(this.polline[i].value.value);
                        break;
                    }
                    case remoteutil.operation.constant:
                    {
                        calc_stack.push(this.polline[i].value);
                        break;
                    }
                    case remoteutil.operation.oprt_add:
                    case remoteutil.operation.oprt_sub:
                    case remoteutil.operation.oprt_mult:
                    case remoteutil.operation.oprt_div:
                    case remoteutil.operation.oprt_modulo:
                    case remoteutil.operation.oprt_sub:
                    case remoteutil.operation.oprt_bitleft:
                    case remoteutil.operation.oprt_bitright:
                    case remoteutil.operation.oprt_cyclbitleft:
                    case remoteutil.operation.oprt_cyclbitright:
                    case remoteutil.operation.oprt_compless:
                    case remoteutil.operation.oprt_complessoreq:
                    case remoteutil.operation.oprt_compmore:
                    case remoteutil.operation.oprt_compmoreoreq:
                    case remoteutil.operation.oprt_compeq:
                    case remoteutil.operation.oprt_compnoteq:
                    case remoteutil.operation.oprt_bitand:
                    case remoteutil.operation.oprt_bitexor:
                    case remoteutil.operation.oprt_bitor:
                    case remoteutil.operation.oprt_logicand:
                    case remoteutil.operation.oprt_logicor:
                    {
                        if (calc_stack.length > 1) {
                            calc_stack.push(remoteutil.value.simplebeoper[oper](calc_stack.pop(), calc_stack.pop()));
                        }
                        else {
                            return this.setError();
                        }
                        break;
                    }
                    case remoteutil.operation.oprt_opnot:
                    case remoteutil.operation.oprt_opexnot:
                    case remoteutil.operation.oprt_add_unary:
                    case remoteutil.operation.oprt_sub_unary:
                    case remoteutil.operation.oprt_allvalid_unary:
                    case remoteutil.operation.select_valid:
                    case remoteutil.operation.oper_cast_basetype:
                    case remoteutil.operation.oper_cast_num64:
                    case remoteutil.operation.oper_cast_unum64:
                    case remoteutil.operation.oper_cast_num32:
                    case remoteutil.operation.oper_cast_unum32:
                    case remoteutil.operation.oper_cast_num16:
                    case remoteutil.operation.oper_cast_unum16:
                    case remoteutil.operation.oper_cast_num8:
                    case remoteutil.operation.oper_cast_unum8:
                    case remoteutil.operation.oper_cast_float:
                    case remoteutil.operation.oper_cast_double:
                    case remoteutil.operation.oper_cast_bool:
                    case remoteutil.operation.oper_cast_time:
                    case remoteutil.operation.oper_cast_text:
                    case remoteutil.operation.oper_cast_vbool:
                    case remoteutil.operation.select_num:
                    case remoteutil.operation.func_num:
                    case remoteutil.operation.select_real:
                    case remoteutil.operation.func_real:
                    case remoteutil.operation.select_bool:
                    case remoteutil.operation.func_bool:
                    {
                        if (calc_stack.length) {
                            calc_stack.push(remoteutil.value.simpleunoper[oper](calc_stack.pop()));
                        }
                        else {
                            return this.setError();
                        }
                        break;
                    }
                    case remoteutil.operation.func_abs:
                    case remoteutil.operation.func_sin:
                    case remoteutil.operation.func_cos:
                    case remoteutil.operation.func_pow:
                    case remoteutil.operation.func_sqrt:
                    case remoteutil.operation.func_sqr:
                    case remoteutil.operation.func_exp:
                    case remoteutil.operation.func_ln:
                    case remoteutil.operation.func_rnd:
                    case remoteutil.operation.func_floor:
                    case remoteutil.operation.func_ceiling:
                    case remoteutil.operation.func_round:
                    case remoteutil.operation.func_log10:
                    case remoteutil.operation.func_tan:
                    case remoteutil.operation.func_acos:
                    case remoteutil.operation.func_asin:
                    case remoteutil.operation.func_atan:
                    case remoteutil.operation.func_cosh:
                    case remoteutil.operation.func_sinh:
                    case remoteutil.operation.func_tanh:
                    {
                        if (calc_stack.length) {
                            calc_stack.push(remoteutil.value.mathfunc[oper](calc_stack.pop()));
                        }
                        else {
                            return this.setError();
                        }
                        break;
                    }
                    case remoteutil.operation.func_format:{
                        if (calc_stack.length>1) {
                            calc_stack.push(remoteutil.value.func_format(calc_stack.pop(), calc_stack.pop()));
                        }
                        else {
                            return this.setError();
                        }
                        break;
                    }
                    case remoteutil.operation.func_min:
                    case remoteutil.operation.func_max:
                    {
                        if (calc_stack.length) {
                            var res = remoteutil.value.simplegroupoper[oper](calc_stack);
                            calc_stack = [];
                            calc_stack.push(res);
                        }
                    }
                    default:
                    {


                    }
                }
            }
        }
        if (calc_stack.length === 1) {
            this.value = calc_stack[0];
            return this.value;
        }
        else
            return this.setError();
    }
}

remoteutil.expression.prototype.print = function () {
    var out = 'expr : "' + this.expr + '" polstack : ';
    if (this.polline) {
        for (var i = 0; i < this.polline.length; i++) {
            var vl = this.polline[i].expr ? this.polline[i].expr : this.polline[i].text;
            out = out + (i ? (', ' + vl) : vl);
        }
    }
    console.log(out);
}





//interfaceIO



remoteutil.interfaceIO = function (doc) {
    this.document = doc;
    this.ot_expressions_id = 0;
    this.expressions = {};
    this.tags = {};
    this.proccessVarInit();
    this.live_transacts = {};
}

remoteutil.interfaceIO.NT_ROOT = 0x00; // корневая метка
remoteutil.interfaceIO.NT_ROOT_SERVERS_NOTAVAIL = 0x01; // корневая метка северов
remoteutil.interfaceIO.NT_ROOT_SERVERS_AVAIL = 0x02; // корневая метка северов
remoteutil.interfaceIO.NT_ROOT_SERVERS_NOTAVAIL_R = 0x11; // корневая метка северов
remoteutil.interfaceIO.NT_ROOT_SERVERS_AVAIL_R = 0x12; // корневая метка северов
remoteutil.interfaceIO.NT_ROOT_GROUPS = 0x05; // корневая метка опроса
remoteutil.interfaceIO.NT_ROOT_AGROUPS = 0x06; // корневая групп алармов
remoteutil.interfaceIO.NT_ROOT_USERS = 0x07; // корневая операторов
remoteutil.interfaceIO.NT_ROOT_ACCESSRULES = 0x09; // корневая правил доступа
remoteutil.interfaceIO.NT_GROUP = 0x400; //  метка группы опроса
remoteutil.interfaceIO.NT_AGROUP = 0x500; //  метка группы опроса
remoteutil.interfaceIO.NT_USER = 0x600; //  метка юзера
remoteutil.interfaceIO.NT_ACCESSRULE = 0x700; //  метка правил доступа
remoteutil.interfaceIO.NT_CLIENT = 0x800; //  метка клиентов
remoteutil.interfaceIO.NT_TAG = 0x100; //  метка тега базы
remoteutil.interfaceIO.NT_ATAG = 0x150; //  метка тега базы
remoteutil.interfaceIO.NT_ALARM = 0x160; //  метка алармов журнала активных тревог
remoteutil.interfaceIO.NT_JOURNAL = 0x170; //  метка строк журнала
remoteutil.interfaceIO.NT_COMMAND = 0x180; //  метка строк таблицы команд
remoteutil.interfaceIO.NT_REGISTRY = 0x190; //  метка строк таблицы регистрации приложений
remoteutil.interfaceIO.NT_LOG = 0x1A0; //  метка строк таблицы лога
remoteutil.interfaceIO.NT_ROOT_NODEF = 0x08;
remoteutil.interfaceIO.NT_ROOT_SERVICES = 0x1B0; //  корень сервисов
remoteutil.interfaceIO.NT_SERVICE = 0x1C0; //  сервис

remoteutil.interfaceIO.NT_UTILGROUP = 0x1000; //  корень отладки
remoteutil.interfaceIO.NT_UTIL_MAINTABLE = 0x1001; //  основная таблица
remoteutil.interfaceIO.NT_UTIL_GROUPTABLE = 0x1002; //  основная таблица
remoteutil.interfaceIO.NT_UTIL_DEBUG = 0x1003; //  Лог
remoteutil.interfaceIO.NT_UTIL_REGISTRY = 0x1004; //  основная таблица
remoteutil.interfaceIO.NT_UTIL_VALCH = 0x1005; //  основная таблица
remoteutil.interfaceIO.NT_UTIL_COMMAND = 0x1006; //  Лог
remoteutil.interfaceIO.NT_UTIL_JOURNAL = 0x1007; //  основная таблица
remoteutil.interfaceIO.NT_UTIL_ALARM = 0x1008;
remoteutil.interfaceIO.NT_UTIL_FINDER = 0x1009;
remoteutil.interfaceIO.NT_UTIL_ACCESSRULES = 0x100A; //  таблица правил доступа
remoteutil.interfaceIO.NT_UTIL_CLIENTS = 0x100B; //  таблица клиентов

remoteutil.interfaceIO.NT_MF_ROOT = 0x2000; // Root metaifo client <meta>
remoteutil.interfaceIO.NT_MF_HOME = 0x2001; // Home metaifo client <HomeList>
remoteutil.interfaceIO.NT_MF_REPLIST = 0x2002; // ReportList metaifo client <ReportList>
remoteutil.interfaceIO.NT_MF_TRENDLIST = 0x2003; // TrendList metaifo client <TrendList>
remoteutil.interfaceIO.NT_MF_MESSLIST = 0x2004; // MessageList metaifo client <MessageList>
remoteutil.interfaceIO.NT_MF_REPHEADER = 0x2005; // ReportList metaifo client <ReportHeader>
remoteutil.interfaceIO.NT_MF_TRENDHEADER = 0x2006; // TrendList metaifo client <TrendHeader>
remoteutil.interfaceIO.NT_MF_MESSHEADER = 0x2007; // MessageList metaifo client <MessageHeader>
remoteutil.interfaceIO.NT_MF_REPARR = 0x2008; // Report metaifo client <ReportArr>
remoteutil.interfaceIO.NT_MF_UNIT = 0x2009; // Report metaifo client <unit>
remoteutil.interfaceIO.NT_MF_TRENDARR = 0x2010; // Report metaifo client <TrendArr>
remoteutil.interfaceIO.NT_MF_TREND = 0x2011; // Report metaifo client <trend>
remoteutil.interfaceIO.NT_MF_MESSARR = 0x2012; // Report metaifo client <MessageArr>
remoteutil.interfaceIO.NT_MF_MESSAGE = 0x2013; // Report metaifo client <message>




remoteutil.interfaceIO.prototype.detouch = function () {
    var exps = this.expressions;
    this.expressions = {};
    this.tags = {};
    this.proccessVarInit();
    this.live_transacts = {};
    for (var expr in exps) {
        if (exps[expr].listeners) {
            for (var lstn in exps[expr].listeners) {
                exps[expr].listeners[lstn]();
                this.addExpressionListener(expr, exps[expr].listeners[lstn]);
            }
        }
    }
    this.calculate();
}


remoteutil.interfaceIO.prototype.addExpressionListener = function (expr, listener, onetime) {
    if (onetime || !listener) {
        this.addExecute(expr, listener);
        if (listener)
            return listener;
    }
    else {
        if (this.expressions[expr]) {
            this.expressions[expr].refcnt++;
            this.expressions[expr].listeners.push(listener);
        }
        else {
            this.expressions[expr] = {refcnt: 1, listeners: [listener]};
            this.expressions[expr].expr = new remoteutil.expression(expr, this, this.expressions[expr]);
        }
        if (listener && this.expressions[expr].value) {
            var rslt = this.expressions[expr].value;
            event = {value: rslt.value, valid: rslt.valid, error: 0};
            listener(rslt);
        }
        return listener;
    }
}

remoteutil.interfaceIO.prototype.removeExpressionListener = function (listener) {
    for (var expr in this.expressions) {
        if (this.expressions[expr].listeners) {
            for (var lstn in this.expressions[expr].listeners) {
                if (this.expressions[expr].listeners[lstn] === listener) {
                    var needdel;
                    //console.log('finding listeners', listener);
                    if (this.expressions[expr].refcnt) {
                        if (this.expressions[expr].refcnt > 1) {
                            this.expressions[expr].refcnt--;
                        }
                        else {
                            needdel = true;
                        }
                    }
                    delete this.expressions[expr].listeners[lstn];
                    if (needdel) {
                        delete this.expressions[expr];
                        console.log('need delete expression', listener);
                    }
                    return listener;
                }
            }
        }
    }
}

remoteutil.interfaceIO.prototype.addExecute = function (expr, handler) {
    var trs = expr;
    if (handler)
        trs.handler = handler;
    this.addTransact('executeexpressions', trs);
    return handler;
}

remoteutil.interfaceIO.prototype.$$exit = function () {
    if (this.remoteEvent) {
        this.remoteEvent.source.postMessage("$$exit", "*");
        //console.log("$$exit to -> ", this.remoteEvent.source)
    }
}

remoteutil.interfaceIO.prototype.formopen = function (name) {
    if (this.remoteEvent) {
        this.remoteEvent.source.postMessage("formopen:" + name, "*");
    }
}

remoteutil.interfaceIO.prototype.formclose = function (name) {
    if (this.remoteEvent) {
        this.remoteEvent.source.postMessage("formclose:" + name, "*");
    }
}

remoteutil.interfaceIO.prototype.$$users = function (handler){
    console.log("entities requst handler");
    this.addTransact('entities', {type: remoteutil.interfaceIO.NT_USER,   handler: handler });
}

remoteutil.interfaceIO.prototype.registrateUser = function (handler, user, password) {
    this.addTransact('registrate', {user: user, password: password, handler: handler});
}

remoteutil.interfaceIO.prototype.unregistrateUser = function (handler) {
    this.addTransact('unregistrate', {handler: handler});
}

remoteutil.interfaceIO.prototype.addUser = function (handler, user, password, access) {
    this.addTransact('adduser', {user: user, access: access, password: password, handler: handler});
}

remoteutil.interfaceIO.prototype.removeUser = function (handler, user, password) {
    this.addTransact('removeuser', {user: user, password: password, handler: handler});
}

remoteutil.interfaceIO.prototype.changePassword = function (handler, user, oldpassword, newpassword) {
    this.addTransact('changepassword', {user: user, oldpassword: oldpassword, newpassword: newpassword, handler: handler});
}

remoteutil.interfaceIO.prototype.changeAccess = function (handler, user, access) {
    this.addTransact('changeaccess', {user: user, access: access, handler: handler});
}

remoteutil.interfaceIO.prototype.enitiesInfo = function (handler, type, indx, filter) {
    var trs = {type: type, handler: handler};
    if (indx)
        trs.indx = indx;
    if (filter)
        trs.filter = filter;
    this.addTransact('entities', trs);
}

remoteutil.interfaceIO.prototype.addTrendsListener = function (handler, taglist, period) {
    var trs = {taglist: taglist, handler: handler};
    if (period)
        trs.period = period;
    this.addTransact('addtrend', trs);
    if (handler)
        return handler;
}

remoteutil.interfaceIO.prototype.removeTrendsListener = function (handler) {
    for (var id in this.live_transacts) {
        if (this.live_transacts[id].handler && this.live_transacts[id].handler === handler) {
            this.addTransact('removetrend', {id: id});
            return true;
        }
    }
    return false;
}

remoteutil.interfaceIO.prototype.addTag = function (tag, expr, handler) {
    if (this.tags[tag]) {
        this.tags[tag].refcnt++;
        this.tags[tag].expressions.push(expr);
    }
    else {
        var id = ++this.ot_expressions_id;
        this.tags[tag] = {tag: tag, refcnt: 1, expressions: [expr], value: new remoteutil.value(undefined)};
        this.addtags_req[id] = tag;
        if (handler)
            this.addtags_req[id].handler = handler;
    }
    return this.tags[tag];
}


remoteutil.interfaceIO.prototype.calculate = function (ndclc) {
    if (this.expressions) {
        for (var exp in this.expressions) {
            if (!this.expressions[exp].referenced && !ndclc) {
                var rslt = this.expressions[exp].expr.calculate();
                for (var i = 0; i < this.expressions[exp].listeners.length; ++i) {
                    event = rslt !== undefined ? {value: rslt.value, valid: rslt.valid, error: 0} : {error: 1};
                    this.expressions[exp].listeners[i](rslt);
                }
            }
            else if (this.expressions[exp].referenced && ndclc) {
                if (this.expressions[exp].hasUpdate) {
                    var rslt = this.expressions[exp].expr.calculate();
                    for (var i = 0; i < this.expressions[exp].listeners.length; ++i) {
                        event = rslt !== undefined ? {value: rslt.value, valid: rslt.valid, error: 0} : {error: 1};
                        this.expressions[exp].listeners[i](rslt);
                    }
                    this.expressions[exp].hasUpdate = undefined;
                }
            }
        }
    }
}


remoteutil.interfaceIO.prototype.send = function (data, callback, url, meth) {
    if ($ && $.ajax) {
        $.ajax({
            type: meth ? meth : "POST",
            url: url ? url : "../data/livedata.json",
            data: JSON.stringify(data),
            success: callback,
            error: this.parse_error,
            self: this
        });
    }
}

remoteutil.interfaceIO.prototype.parse_error = function (xhr, status, error) {
    var self = this.self ? this.self : this;    
    console.log("error response:", xhr, status, error);
    if (self.connected) {
        delete self.connected
        self.detouch();
        remoteutil.setTrobler(true);
    }
    self.initRequest();
}

remoteutil.interfaceIO.prototype.initRequest = function () {
    var self = this.self ? this.self : this;
    var initreq = {"init-request": 0};
    this.send(initreq,
            function (msg) {
                self.sessionid = msg["init-response"];
                if (self.sessionid) { 
                    self.connected = true;
                    self.updateConv();
                }
            });
}


remoteutil.interfaceIO.prototype.updateConv = function (msg) {
    var self = this.self ? this.self : this;
    if (msg) {
        self.proccessResponse(msg);
        remoteutil.setTrobler();
    }
    if (!self.proccessRequest()) {
        var updatereq = {session: self.sessionid, "update-request": []};
        self.send(updatereq, self.updateConv);
    }
}



remoteutil.interfaceIO.reqMethods = {
    1: {name: 'unregistrate', type: 'single'},
    2: {name: 'registrate', type: 'single'},
    3: {name: 'adduser', type: 'single'},
    4: {name: 'removeuser', type: 'single'},
    5: {name: 'changepassword', type: 'single'},
    6: {name: 'changeaccess', type: 'single'},
    7: {name: 'executeexpressions', type: 'single'}, 
    8: {name: 'entities', type: 'single'},    
    
    9: {name: 'addtags', type: 'add'},
    //10: {name: 'updatetags', type: 'update'},      
    11: {name: 'removetags', type: 'remove'},
    
    12: {name: 'addtrend', type: 'add'},
    //13: {name: 'updatetrend', type: 'update'},      
    14: {name: 'removetrend', type: 'remove'},

    15: {name: 'addalarms', type: 'add'},
    //16: {name: 'updatealarms', type: 'update'},      
    17: {name: 'removealarms', type: 'remove'},  
    
    18: {name: 'adddebug', type: 'add'},
    //19: {name: 'updatedebug', type: 'update'},      
    20: {name: 'removedebug', type: 'remove'},     
    
    21: {name: 'addjournal', type: 'add'},
    //22: {name: 'updatejournal', type: 'update'},      
    23: {name: 'removejournal', type: 'remove'},    

     //99: {name: 'remove', type: 'remove'}
}

remoteutil.interfaceIO.respMethods = {
    1: {name: 'unregistrate', type: 'single'},
    2: {name: 'registrate', type: 'single'},
    3: {name: 'adduser', type: 'single'},
    4: {name: 'removeuser', type: 'single'},
    5: {name: 'changepassword', type: 'single'},
    6: {name: 'changeaccess', type: 'single'},
    7: {name: 'executeexpressions', type: 'single'},
    8: {name: 'entities', type: 'single'},    
    
    //9: {name: 'addtags', type: 'add'},
    10: {name: 'updatetags', type: 'update'},    
    //11: {name: 'removetags', type: 'remove'},
    
    //12: {name: 'addtrend', type: 'add'},
    13: {name: 'updatetrend', type: 'update'},    
    //14: {name: 'removetrend', type: 'remove'},
    
    //15: {name: 'addalarms', type: 'add'},
    16: {name: 'updatealarms', type: 'update'},      
    //17: {name: 'removealarms', type: 'remove'},  
    
    //18: {name: 'adddebug', type: 'add'},
    19: {name: 'updatedebug', type: 'update'},      
    //20: {name: 'removedebug', type: 'remove'},     
    
    //21: {name: 'addjournal', type: 'add'},
    22: {name: 'updatejournal', type: 'update'},      
    //23: {name: 'removejournal', type: 'remove'},    

     99: {name: 'remove', type: 'remove'}
}

remoteutil.interfaceIO.prototype.addTransact = function (name, transact) {
    if (transact.id == undefined)
        transact.id = ++this.ot_expressions_id;
    this[name + '_req'][transact.id] = transact;
}

remoteutil.interfaceIO.prototype.proccessVarInit = function () {
    for (var key  in remoteutil.interfaceIO.reqMethods)
        this[remoteutil.interfaceIO.reqMethods[key].name + '_req'] = {};
}

remoteutil.interfaceIO.prototype.proccessRequest = function () {
    var self = this.self ? this.self : this;
    for (var key  in remoteutil.interfaceIO.reqMethods)
        if (self.proccessReq(remoteutil.interfaceIO.reqMethods[key].name,
                remoteutil.interfaceIO.reqMethods[key].type))
            return true;
    return false;
}

remoteutil.interfaceIO.prototype.proccessResponse = function (msg) {
    var self = this.self ? this.self : this;
    for (var key  in remoteutil.interfaceIO.respMethods) {
        var respname = remoteutil.interfaceIO.respMethods[key].name + '-response';
        if (msg[respname])
            self.proccessResp(remoteutil.interfaceIO.respMethods[key].name,
                    remoteutil.interfaceIO.respMethods[key].type,
                    msg[respname]);
    }
}

remoteutil.interfaceIO.prototype.proccessReq = function (name, type) {
    var reqname = name + '-request';
    var var_name = name + '_req';
    var self = this.self ? this.self : this;
    if (Object.keys(this[var_name]).length) {
        var regreq = {session: this.sessionid};
        regreq[reqname] = {};
        for (var id in this[var_name]) {
            switch (name) {
                case 'addtags':
                case 'executeexpressions':
                {
                    regreq[reqname][id] = this[var_name][id];
                    break;
                }
                default:
                {
                    regreq[reqname][id] = {};
                    for (var attr in this[var_name][id]) {
                        if (attr != 'listener' && attr != 'handler' && attr != 'id')
                            regreq[reqname][id][attr] = this[var_name][id][attr];
                    }
                }
            }
        }
        if (type != 'remove') {
            for (var id in this[var_name])
                this.live_transacts[id] = this[var_name][id];
        }
        this[var_name] = {};
        this.send(regreq,
                function (msg) {
                    self.updateConv();
                });
        return true;
    }
    return false;
}


remoteutil.interfaceIO.prototype.proccessResp = function (nm, type, msg) {
    switch (type) {
        case 'remove':
            this.rawRemReqId(nm, msg);
            break;
        default:
        {
            switch (nm) {
                case 'executeexpressions' :
                    this.updateExecs(msg);
                    break;
                case 'updatetags' :
                    this.updateTags(msg);
                    break;                    
                default:
                {
                    this.rawExecs(nm, type, msg);
                }
            }
        }
    }
}

remoteutil.interfaceIO.prototype.rawRemReqId = function (name, msg) {
    for (var id in msg) {
        if (this.live_transacts[id]) {
            delete this.live_transacts[id];
            //console.log("live trecact cnt=", Object.keys(this.live_transacts).length);
        }
    }
}

remoteutil.interfaceIO.prototype.updateTags = function (msg) {
    var cnt = 0;
    for (var tag in msg) {
        if (this.tags[tag]) {
            cnt++;
            var tmpiss = msg[tag];
            if (!tmpiss.error) {
                var valtmp = remoteutil.value.build(tmpiss);
                if (valtmp) {
                    this.tags[tag].value.value = valtmp.value;
                    this.tags[tag].value.valid = valtmp.valid;
                    this.tags[tag].value.error = 0;
                }
            }
            else {
                this.tags[tag].value.value = undefined;
                this.tags[tag].value.valid = 0;
                this.tags[tag].value.error = tmpiss.error;
            }
            if (this.tags[tag].expressions)
                for (var exp in this.tags[tag].expressions)
                    this.tags[tag].expressions[exp].hasUpdate = true;
        }
    }
    if (cnt)
        this.calculate(true);
}

remoteutil.interfaceIO.prototype.updateExecs = function (msg) {
    for (var id in msg) {
        if (this.live_transacts[id]) {
            if (this.live_transacts[id].handler) {
                var tmpiss = msg[id];
                if (!tmpiss.error) {
                    var valtmp = remoteutil.value.build(tmpiss);
                    event = {value: valtmp.value, valid: valtmp.valid, error: 0}
                    this.live_transacts[id].handler(event);
                }
                else {
                    event = {value: undefined, valid: 0, error: tmpiss.error}
                    this.live_transacts[id].handler(event);
                }
            }
            delete this.live_transacts[id];
        }
    }
}


remoteutil.interfaceIO.prototype.rawExecs = function (name, type, msg) {
    for (var id in msg) {
        if (this.live_transacts[id]) {
            if (this.live_transacts[id].handler) {
                event = this.proccessRslt(name, msg[id]);
                this.live_transacts[id].handler(event);
            }
            if (type != 'update') {
                delete this.live_transacts[id];
                //console.log("live trecact cnt=", Object.keys(this.live_transacts).length);
            }
        }
    }
}


remoteutil.interfaceIO.prototype.proccessRslt = function (name, ev) {
    switch (name) {
        case 'unregistrate':
        case  'registrate':
        case 'adduser':
        case 'removeuser':
        case 'changepassword':
        case 'changeaccess':
        {
            if (ev.error === undefined)
                return {error: 1};
            return {error: parseInt(ev.error)};
            break;
        }
        case 'entities':
        {
            if (!ev.error) {
                var nev={ list: []};
                for (var key in ev){
                    if (nev.type==undefined)
                        nev.type=ev[key].type & 0xFFFF;                    
                    if ((ev[key].type & 0xFFFF) == 0x600)
                        ev[key].type = ev[key].type >> 16;
                    nev.list.push(ev[key]);}
                
                ev=nev;
                return nev;
            }
            return ev;
            break;
        }
        case 'updatetrend':
        {
            for (var arr in ev) {
                for (var id in ev[arr]) {
                    switch (id) {
                        case 'start' :
                            ev[arr].start = (ev[arr].start == 'true') ? true : false;
                            break;
                        case 'data' :
                        {
                            for (var i = 0; i < ev[arr].data.length; ++i) {
                                if (ev[arr].data[i].length) {
                                    var num = parseInt(ev[arr].data[i][0]);
                                    if (num != undefined) {
                                        ev[arr].data[i][0] = new Date(num);
                                    }
                                }
                                if (ev[arr].data[i].length > 1) {
                                    ev[arr].data[i][1] = parseFloat(ev[arr].data[i][1]);
                                }
                            }
                            break;
                        }
                        case 'error' :{
                                ev[arr].error=parseInt(ev[arr].error);
                                break;
                        }                        
                    }
                }
            }
            return ev;
            break;
        }        
        default:
        {
        }
    }
    return ev;
}


remoteutil.setTrobler = function (state) {
    var docelem = document.documentElement;
    if (docelem) {
        if (!docelem.trobler) {
            
            var coord = {x: 0,
                y: 0,
                height: parseInt(docelem.getAttribute('height')),
                width: parseInt(docelem.getAttribute('width'))};
            
            var minside = (coord.width < coord.height ? coord.width : coord.height) / 4;
 
            var coordImg = {x: (coord.width - minside) / 2 ,
                y: (coord.height - minside) / 2 ,
                height: minside,
                width: minside};            
            
            docelem.trobler = libutil.svg.create_element('svg', docelem, [{
                    name: 'x',
                    value: coord.x
                },
                {
                    name: 'y',
                    value: coord.y
                },
                {
                    name: 'width',
                    value: coord.width
                },
                {
                    name: 'height',
                    value: coord.height
                }]);
            var rect = libutil.svg.create_element('rect', docelem.trobler, [{
                    name: 'x',
                    value: coord.x
                },
                {
                    name: 'y',
                    value: coord.y
                },
                {
                    name: 'width',
                    value: coord.width
                },
                {
                    name: 'height',
                    value: coord.height
                },
                {
                    name: 'stroke-width',
                    value: "0"
                },                
                {
                    name: 'fill-opacity',
                    value: "0.9"
                },                        
            ]);   
            
            var trob = libutil.svg.create_element('image', docelem.trobler, [{
                    name: 'x',
                    value: coordImg.x
                },
                {
                    name: 'y',
                    value: coordImg.y
                },
                {
                    name: 'width',
                    value: coordImg.width
                },
                {
                    name: 'height',
                    value: coordImg.height
                }]);
            trob.setAttributeNS(libutil.XLINK_NAMESPACE_URL, 'xlink:href', '../web-utils/css/res/throbber.svg');            
        }
        docelem.trobler.setAttribute('display' , state ? 'inhiret' : 'none');
    }
}