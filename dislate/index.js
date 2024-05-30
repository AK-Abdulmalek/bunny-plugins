(function(p,E,T,t,B,C,o,h,k,x,j,H,A,R){"use strict";const V="https://deeplx.vercel.app/translate";var P={translate:async function(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"auto",s=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;try{if(i)return{source_lang:a,text:e};const n=await(await fetch(V,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e,source_lang:a,target_lang:s})})).json();if(n.code!==200)throw Error(`Failed to translate text from DeepL: ${n.message}`);return{source_lang:a,text:n.data}}catch(n){throw Error(`Failed to fetch from DeepL: ${n}`)}}},O={translate:async function(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"auto",s=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;try{if(i)return{source_lang:a,text:e};const n="https://translate.googleapis.com/translate_a/single?"+new URLSearchParams({client:"gtx",sl:a,tl:s,dt:"t",dj:"1",source:"input",q:e}),d=await(await fetch(n)).json();return console.log(d),{source_lang:a,text:d.sentences[0].trans}}catch(n){throw Error(`Failed to fetch from Google Translate: ${n}`)}}},v;const b=T.findByProps("openLazy","hideActionSheet"),M=((v=T.findByProps("ActionSheetRow"))===null||v===void 0?void 0:v.ActionSheetRow)??h.Forms.FormRow,z=T.findByStoreName("MessageStore"),K=T.findByStoreName("ChannelStore"),q=t.stylesheet.createThemedStyleSheet({iconComponent:{width:24,height:24,tintColor:C.semanticColors.INTERACTIVE_NORMAL}});let y=[];function X(){return B.before("openLazy",b,function(e){let[a,s,i]=e;const n=i?.message;s!=="MessageLongPressActionSheet"||!n||a.then(function(d){const le=B.after("default",d,function(Te,oe){t.React.useEffect(function(){return function(){le()}},[]);const _=k.findInReactTree(oe,function(l){var u,g;return(l==null||(g=l[0])===null||g===void 0||(u=g.type)===null||u===void 0?void 0:u.name)==="ButtonRow"});if(!_)return;const ce=Math.max(_.findIndex(function(l){return l.props.message===t.i18n.Messages.MARK_UNREAD}),0),c=z.getMessage(n.channel_id,n.id);if(!c?.content&&!n.content)return;const L=c?.id??n.id,ue=c?.content??n.content,w=y.find(function(l){return Object.keys(l)[0]===L},"cache object"),D=w?"Revert":"Translate",$=D==="Translate"?o.getAssetIDByName("ic_locale_24px"):o.getAssetIDByName("ic_highlight"),ge=async function(){try{const u=r.target_lang,g=D==="Translate";var l;switch(r.translator){case 0:console.log("Translating with DeepL: ",c.content),l=await P.translate(c.content,null,u,!g);case 1:console.log("Translating with GTranslate: ",c.content),l=await O.translate(c.content,null,u,!g)}t.FluxDispatcher.dispatch({type:"MESSAGE_UPDATE",message:{...c,content:`${g?l.text:w[L]} ${g?`\`[${u?.toLowerCase()}]\``:""}`,guild_id:K.getChannel(c.channel_id).guild_id},log_edit:!1}),g?y.unshift({[L]:ue}):y=y.filter(function(de){return de!==w},"cached data override")}catch(u){R.showToast("Failed to translate message. Please check Debug Logs for more info.",o.getAssetIDByName("Small")),x.logger.error(u)}finally{return b.hideActionSheet()}};_.splice(ce,0,t.React.createElement(M,{label:`${D} Message`,icon:t.React.createElement(M.Icon,{source:$,IconComponent:function(){return t.React.createElement(t.ReactNative.Image,{resizeMode:"cover",style:q.iconComponent,source:$})}}),onPress:ge}))})})})}var S;(function(e){e[e.BUILT_IN=0]="BUILT_IN",e[e.BUILT_IN_TEXT=1]="BUILT_IN_TEXT",e[e.BUILT_IN_INTEGRATION=2]="BUILT_IN_INTEGRATION",e[e.BOT=3]="BOT",e[e.PLACEHOLDER=4]="PLACEHOLDER"})(S||(S={}));var N;(function(e){e[e.SUB_COMMAND=1]="SUB_COMMAND",e[e.SUB_COMMAND_GROUP=2]="SUB_COMMAND_GROUP",e[e.STRING=3]="STRING",e[e.INTEGER=4]="INTEGER",e[e.BOOLEAN=5]="BOOLEAN",e[e.USER=6]="USER",e[e.CHANNEL=7]="CHANNEL",e[e.ROLE=8]="ROLE",e[e.MENTIONABLE=9]="MENTIONABLE",e[e.NUMBER=10]="NUMBER",e[e.ATTACHMENT=11]="ATTACHMENT"})(N||(N={}));var I;(function(e){e[e.CHAT=1]="CHAT",e[e.USER=2]="USER",e[e.MESSAGE=3]="MESSAGE"})(I||(I={}));var U={arabic:"AR",bulgarian:"BG",czech:"CS",danish:"DA",german:"DE",greek:"EL",english:"EN",spanish:"ES",estonian:"ET",finnish:"FI",french:"FR",hungarian:"HU",indonesian:"ID",italian:"IT",japanese:"JA",korean:"KO",lithuanian:"LT",latvian:"LV",norwegian:"NO",dutch:"NL",polish:"PL",portuguese:"PT",romanian:"RO",russian:"RU",slovak:"SK",slovenian:"SL",swedish:"SV",turkish:"TR",ukrainian:"UK","chinese-simplified":"ZH"};const Y=T.findByProps("sendBotMessage"),J=Object.entries(U).map(function(e){let[a,s]=e;return{name:a,displayName:a,value:s}});function Z(){return j.registerCommand({name:"translate",displayName:"translate",description:"Send a message using Dislate in any language chosen.",displayDescription:"Send a message using Dislate in any language chosen.",applicationId:"-1",type:I.CHAT,inputType:S.BUILT_IN_TEXT,options:[{name:"text",displayName:"text",description:"The text/message for Dislate to translate. Please note some formatting of mentions and emojis may break due to the API.",displayDescription:"The text/message for Dislate to translate. Please note some formatting of mentions and emojis may break due to the API.",type:N.STRING,required:!0},{name:"language",displayName:"language",description:"The language that Dislate will translate the text into. This can be any language from the list.",displayDescription:"The language that Dislate will translate the text into. This can be any language from the list.",type:N.STRING,choices:[...J],required:!0}],async execute(e,a){const[s,i]=e;try{var n;switch(r.translator){case 0:n=await P.translate(s.value,null,i.value);case 1:n=await O.translate(s.value,null,i.value)}return await new Promise(function(d){return H.showConfirmationAlert({title:"Are you sure you want to send it?",content:React.createElement(h.Codeblock,null,n.text),confirmText:"Yep, send it!",onConfirm:function(){return d({content:n.text})},cancelText:"Nope, don't send it"})})}catch(d){return x.logger.error(d),Y.sendBotMessage(a.channel.id,"Failed to translate message. Please check Debug Logs for more info.",o.getAssetIDByName("Small"))}}})}const{FormRow:G}=h.Forms,{ScrollView:Q}=t.ReactNative;function W(){A.useProxy(r);const[e,a]=t.React.useState("");return t.React.createElement(Q,{style:{flex:1}},t.React.createElement(h.Search,{style:{padding:15},placeholder:"Search Language",onChangeText:function(s){a(s)}}),Object.entries(U).filter(function(s){let[i,n]=s;return i.includes(e)}).map(function(s){let[i,n]=s;return t.React.createElement(G,{label:i,trailing:function(){return t.React.createElement(G.Arrow,null)},onPress:function(){r.target_lang!=n&&(r.target_lang=n,R.showToast(`Saved ToLang to ${i}`,o.getAssetIDByName("check")))}})}))}const{FormRow:m}=h.Forms,{ScrollView:ee}=t.ReactNative;function te(){return A.useProxy(r),t.React.createElement(ee,{style:{flex:1}},t.React.createElement(m,{label:"DeepL",trailing:function(){return t.React.createElement(m.Arrow,null)},onPress:function(){r.translator!=0&&(r.translator=0,R.showToast("Saved Translator to DeepL",o.getAssetIDByName("check")))}}),t.React.createElement(m,{label:"Google Translate",trailing:function(){return t.React.createElement(m.Arrow,null)},onPress:function(){r.translator!=1&&(r.translator=1,R.showToast("Saved Translator to Google Translate",o.getAssetIDByName("check")))}}))}const{ScrollView:ne,Text:ae}=t.ReactNative,{FormRow:f}=h.Forms,re=t.stylesheet.createThemedStyleSheet({subheaderText:{color:C.semanticColors.HEADER_SECONDARY,textAlign:"center",margin:10,marginBottom:50,letterSpacing:.25,fontFamily:t.constants.Fonts.PRIMARY_BOLD,fontSize:14}});function se(){var e;const a=t.NavigationNative.useNavigation();return A.useProxy(r),t.React.createElement(ne,null,t.React.createElement(f,{label:"Translate to",subLabel:(e=r.target_lang)===null||e===void 0?void 0:e.toLowerCase(),leading:t.React.createElement(f.Icon,{source:o.getAssetIDByName("ic_activity_24px")}),trailing:function(){return t.React.createElement(f.Arrow,null)},onPress:function(){return a.push("VendettaCustomPage",{title:"Translate to",render:W})}}),t.React.createElement(f,{label:"Translator",subLabel:r.translator?"Google Translate":"DeepL",leading:t.React.createElement(f.Icon,{source:o.getAssetIDByName("ic_locale_24px")}),trailing:function(){return t.React.createElement(f.Arrow,null)},onPress:function(){return a.push("VendettaCustomPage",{title:"Translator",render:te})}}),t.React.createElement(ae,{style:re.subheaderText,onPress:function(){return t.url.openURL("https://github.com/aeongdesu/vdplugins")}},`Build: (${E.manifest.hash.substring(0,7)})`))}const r=E.storage;r.target_lang??="EN",r.translator??=0;let F=[];var ie={onLoad:function(){return F=[X(),Z()]},onUnload:function(){for(const e of F)e()},settings:se};return p.default=ie,p.settings=r,Object.defineProperty(p,"__esModule",{value:!0}),p})({},vendetta.plugin,vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets,vendetta.ui.components,vendetta.utils,vendetta,vendetta.commands,vendetta.ui.alerts,vendetta.storage,vendetta.ui.toasts);
