(function(s,e,r,i,d,n,f,v){"use strict";
var g=r.findByProps("canUseEmojisEverywhere"),S=[
    i.instead("canUseEmojisEverywhere",g,()=>!0),
    i.instead("canUseAnimatedEmojis",g,()=>!0)
];

var {getCustomEmojiById:E}=r.findByStoreName("EmojiStore"),
    {getGuildId:h}=r.findByStoreName("SelectedGuildStore"),
    b=/<a?:(\w+):(\d+)>/i;

function u(t,a){
    var I=t.matchAll(/<a?:(\w+):(\d+)>/gi);
    for(var o of I){
        var m=E(o[2]);
        if(m.guildId!=h()||m.animated){
            var l="webp";
            m.animated&&(l="gif");
            var emojiLink=`https://cdn.discordapp.com/emojis/${o[2]}.${l}?size=${a}&quality=lossless&name=${o[1]}`;
            t=t.replace(o[0],`[.](${emojiLink})`);
        }
    }
    return { newContent: t.trim() };
}

function j(t){
    if(t.content.match(b)&&!(!e.storage.forceMoji&&e.storage.haveNitro)){
        var { newContent: a } = u(t.content, e.storage.emojiSize);
        t.content = a;
        t.invalidEmojis = [];
    }
}

var R=r.findByProps("sendMessage","receiveMessage"),
    w=r.findByProps("uploadLocalFiles"),
    z=[
        i.before("sendMessage",R,t=>j(t[1])),
        i.before("uploadLocalFiles",w,t=>j(t[0].parsedMessage))
    ];

var {FormSection:c,FormRadioRow:$,FormSwitchRow:y}=n.Forms,
    F={Tiny:16,Small:32,Medium:48,Big:56,Large:64,Huge:96,Jumbo:128},
    B="https://cdn.discordapp.com/emojis/926602689213767680.webp",
    p=()=>(
        f.useProxy(e.storage),
        React.createElement(d.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},
            React.createElement(c,{title:"Settings",titleStyleType:"no_border"},
                React.createElement(y,{label:"Hyperlink emoji",subLabel:"Hyperlinks emoji link to be less distractive",leading:React.createElement(n.Forms.FormIcon,{source:v.getAssetIDByName("ic_link")}),value:e.storage.hyperlink,onValueChange:()=>{e.storage.hyperlink=!e.storage.hyperlink},note:""}),
                React.createElement(y,{label:"Force Freemoji",subLabel:"Explicitly force Freemoji even if you have nitro (useful for testing)",leading:React.createElement(n.Forms.FormIcon,{source:v.getAssetIDByName("img_nitro_emojis")}),value:e.storage.forceMoji,onValueChange:()=>{e.storage.forceMoji=!e.storage.forceMoji},note:""})
            ),
            React.createElement(c,{title:"Emoji Size"},Object.entries(F).map(([t,a])=>
                React.createElement($,{label:t,subLabel:a,selected:e.storage.emojiSize===a,onPress:()=>{e.storage.emojiSize=a}}))),
            React.createElement(c,{title:"Preview"},
                React.createElement(d.ReactNative.Image,{source:{uri:`${B}?size=${e.storage.emojiSize}`,width:e.storage.emojiSize,height:e.storage.emojiSize}}))
        )
    );

e.storage.emojiSize??=48;
e.storage.hyperlink??=!0;
e.storage.haveNitro??=r.findByStoreName("UserStore").getCurrentUser()?.premiumType!==null;
e.storage.forceMoji??=!1;
if(typeof e.storage.emojiSize=="string") e.storage.emojiSize=parseInt(e.storage.emojiSize);

var M=[...S,...z],k=()=>M.forEach(t=>t());

return s.onUnload=k,s.settings=p,s;
})({},vendetta.plugin,vendetta.metro,vendetta.patcher,vendetta.metro.common,vendetta.ui.components,vendetta.storage,vendetta.ui.assets);
