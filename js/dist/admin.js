(()=>{var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};(()=>{"use strict";const e=flarum.core.compat["admin/app"];var o=t.n(e);const n=flarum.core.compat["common/Model"];var s=t.n(n);const a=flarum.core.compat["common/models/Forum"];var r=t.n(a);function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function l(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,i(t,e)}var h=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))||this).id=s().attribute("id"),e.service=s().attribute("service"),e.url=s().attribute("url"),e.error=s().attribute("error"),e.events=s().attribute("events"),e.tagIds=s().attribute("tag_id"),e.groupId=s().attribute("group_id"),e.extraText=s().attribute("extra_text"),e.name=s().attribute("name"),e.isValid=s().attribute("is_valid",Boolean),e.usePlainText=s().attribute("use_plain_text",Boolean),e.maxPostContentLength=s().attribute("max_post_content_length"),e.includeTags=s().attribute("include_tags",Boolean),e}l(e,t);var n=e.prototype;return n.apiEndpoint=function(){return"/fof/webhooks"+(this.exists?"/"+this.data.id:"")},n.tags=function(){return this.tagIds().map((function(t){return o().store.getById("tags",t)}))},e}(s());const c=flarum.core.compat["admin/components/ExtensionPage"];var u=t.n(c);const d=flarum.core.compat["common/utils/Stream"];var b=t.n(d);const p=flarum.core.compat["common/utils/withAttr"];var f=t.n(p);const g=flarum.core.compat["common/components/Button"];var k=t.n(g);const v=flarum.core.compat["common/components/Select"];var w=t.n(v);const x=flarum.core.compat["common/components/LoadingIndicator"];var _=t.n(x);const y=flarum.core.compat["common/Component"];var N=t.n(y);const T=flarum.core.compat["common/components/Dropdown"];var W=t.n(T);const P=flarum.core.compat["common/components/Alert"];var C=t.n(P);const B=flarum.core.compat["tags/common/helpers/tagsLabel"];var F=t.n(B);const I=flarum.core.compat["tags/common/components/TagSelectionModal"];var L=t.n(I);const O=flarum.core.compat["common/components/Switch"];var D=t.n(O);const E=flarum.core.compat["common/helpers/icon"];var j=t.n(E);const M=flarum.core.compat["common/models/Group"];var S=t.n(M);const z=flarum.core.compat["common/components/Modal"];var A=function(t){function e(){return t.apply(this,arguments)||this}l(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.webhook=this.attrs.webhook;var n,s,a,r,i=o().data["fof-webhooks.events"];this.groupId=b()(this.webhook.groupId()||S().GUEST_ID),this.extraText=b()(this.webhook.extraText()||""),this.name=b()(this.webhook.name()||""),this.usePlainText=b()(this.webhook.usePlainText()),this.maxPostContentLength=b()(this.webhook.maxPostContentLength()),this.includeTags=b()(this.webhook.includeTags()),this.events=(n=i.reduce((function(t,e){console.log(e);var o=/((?:[a-z]\\?)+?)\\Events?\\([a-z]+)/i.exec(e);if(!o)return t.other.push({full:e,name:e}),t.other=t.other.sort(),t;var n=o[1].toLowerCase().replaceAll("\\",".");return t[n]||(t[n]=[]),t[n]=t[n].concat({full:e,name:o[2]}).sort(),t}),{other:[]}),s=function(t){return t.split(".")[0]},a=Object.keys(n),r=Object.values(n),a.map(s).reduce((function(t,e,o){return t[e]||(t[e]={}),t[e][a[o]]=r[o],t}),{}))},n.className=function(){return"Modal--medium"},n.title=function(){return o().translator.trans("fof-webhooks.admin.settings.modal.title")},n.content=function(){var t,e=this,n={2:"fas fa-globe",3:"fas fa-user"},s=o().store.getById("groups",this.groupId()),a=!(null==(t=this.webhook.tags())||!t.length);return m("div",{className:"FofWebhooksModal Modal-body"},m("form",{className:"Form",onsubmit:this.onsubmit.bind(this)},m(D(),{state:this.usePlainText(),onchange:this.usePlainText},o().translator.trans("fof-webhooks.admin.settings.modal.use_plain_text_label")),m("div",{className:"Form-group"},m("label",{className:"label"},o().translator.trans("fof-webhooks.admin.settings.modal.max_post_content_length_label")),m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.modal.max_post_content_length_help")),m("input",{type:"number",min:"0",className:"FormControl",bidi:this.maxPostContentLength,onkeypress:this.onkeypress.bind(this)})),m("div",{className:"Form-group hasLoading"},m("label",{className:"label"},o().translator.trans("fof-webhooks.admin.settings.modal.extra_text_label")),m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.modal.extra_text_help")),m("input",{type:"text",className:"FormControl",bidi:this.extraText,onkeypress:this.onkeypress.bind(this)})),m("div",{className:"Form-group"},m("label",{className:"label"},o().translator.trans("fof-webhooks.admin.settings.modal.name_label")),m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.modal.name_help")),m("input",{type:"text",className:"FormControl",bidi:this.name,placeholder:o().forum.attribute("title"),onkeypress:this.onkeypress.bind(this)})),m("div",{className:"Form-group"},m("label",{className:"label"},o().translator.trans("fof-webhooks.admin.settings.modal.group_label")),m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.modal.group_help")),m(W(),{label:[j()(s.icon()||n[s.id()]),s.namePlural()],buttonClassName:"Button Button--danger"},o().store.all("groups").filter((function(t){return["1","2"].includes(t.id())})).map((function(t){return m(k(),{active:s.id()===t.id(),disabled:s.id()===t.id(),icon:t.icon()||n[t.id()],onclick:function(){return e.groupId(t.id())},type:"button"},t.namePlural())})))),m("div",{className:"Form-group Webhook-events"},m("label",{className:"label"},o().translator.trans("fof-webhooks.admin.settings.modal.events_label")),m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.modal.description")),"microsoft-teams"!==this.webhook.service()&&m("div",{style:{display:"block",marginTop:"30px"}},m(D(),{state:this.includeTags(),onchange:this.includeTags,disabled:!a},o().translator.trans("fof-webhooks.admin.settings.modal.include_matching_tags_label"))),Object.entries(this.events).map((function(t){var o=t[1];return m("div",null,Object.entries(o).sort((function(t,e){var o=t[0].toUpperCase(),n=e[0].toUpperCase();return o<n?-1:o>n?1:0})).map((function(t){var o=t[0],n=t[1];return n.length?m("div",null,m("h3",null,e.translate(o)),n.map((function(t){return m(D(),{state:e.webhook.events().includes(t.full),onchange:e.onchange.bind(e,t.full)},e.translate(o,t.name.toLowerCase()))}))):null})))}))),m("div",{className:"Form-group"},m(k(),{type:"submit",className:"Button Button--primary",loading:this.loading,disabled:!this.isDirty()},o().translator.trans("core.admin.settings.submit_button")))))},n.translate=function(t,e){return void 0===e&&(e="title"),o().translator.trans("fof-webhooks.admin.settings.actions."+t+"."+e)},n.isDirty=function(){return this.extraText()!=this.webhook.extraText()||this.groupId()!==this.webhook.groupId()||this.usePlainText()!==this.webhook.usePlainText()||this.includeTags()!==this.webhook.includeTags()||this.maxPostContentLength()!=this.webhook.maxPostContentLength()||this.name()!=this.webhook.name()},n.onsubmit=function(t){var e=this;return t.preventDefault(),this.loading=!0,this.webhook.save({extraText:this.extraText(),group_id:this.groupId(),use_plain_text:this.usePlainText(),include_tags:this.includeTags(),max_post_content_length:this.maxPostContentLength()||0,name:this.name()}).then((function(){e.loading=!1,m.redraw()})).catch((function(){e.loading=!1,m.redraw()}))},n.onkeypress=function(t){"Enter"===t.key&&this.onsubmit(t)},n.onchange=function(t,e,o){o.loading=!0;var n=this.webhook.events();return e?n.push(t):n.splice(n.indexOf(t),1),this.attrs.updateWebhook(n).then((function(){o.loading=!1,m.redraw()}))},e}(t.n(z)()),U=function(t){function e(){return t.apply(this,arguments)||this}l(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.webhook=this.attrs.webhook,this.services=this.attrs.services,this.url=b()(this.webhook.url()),this.service=b()(this.webhook.service()),this.events=b()(this.webhook.events()),this.error=b()(this.webhook.error()),this.loading={}},n.view=function(){var t=this,e=this.webhook,n=this.services,s=o().initializers.has("flarum-tags"),a=e.tags().filter(Boolean),r=e.service(),i=[e.error&&e.error()];n[r]?e.isValid()?s||0===e.tags().length?a.length!==e.attribute("tag_id").length&&i.push(o().translator.trans("fof-webhooks.admin.errors.tag_invalid")):i.push(o().translator.trans("fof-webhooks.admin.errors.tag_disabled")):i.push(o().translator.trans("fof-webhooks.admin.errors.url_invalid")):i.push(o().translator.trans("fof-webhooks.admin.errors.service_not_found",{service:r}));var l=function(){return o().modal.show(L(),{selectedTags:a,onsubmit:function(e){return t.update("tag_id")(e.map((function(t){return t.id()})))}})};return m("div",{className:"Webhooks--row","data-webhook-id":e.id()},m("div",{className:"Webhook-input"},m(w(),{options:n,value:r,onchange:this.update("service"),disabled:this.loading.service}),m("input",{className:"FormControl Webhook-url",type:"url",value:this.url(),onchange:f()("value",this.update("url")),disabled:this.loading.url,placeholder:o().translator.trans("fof-webhooks.admin.settings.help.url")}),s&&(a.length?F()(a,{onclick:l}):m("span",{className:"TagsLabel",onclick:l},o().translator.trans("fof-webhooks.admin.settings.item.tag_any_label"))),m(k(),{type:"button",className:"Button Webhook-button",icon:"fas fa-edit",onclick:function(){return o().modal.show(A,{webhook:e,updateWebhook:t.update("events")})}}),m(k(),{type:"button",className:"Button Button--warning Webhook-button",icon:"fas fa-times",onclick:this.delete.bind(this)})),!this.events().length&&m(C(),{className:"Webhook-error",dismissible:!1},o().translator.trans("fof-webhooks.admin.settings.help.disabled")),i.filter(Boolean).map((function(t){return m(C(),{className:"Webhook-error",type:"error",dismissible:!1},o().translator.trans(t))})))},n.update=function(t){var e=this;return function(o){var n;return e.loading[t]=!0,e.webhook.save((n={},n[t]=o,n)).catch((function(){})).then((function(){e.loading[t]=!1,e[t]&&e[t](o),m.redraw()}))}},n.delete=function(){return this.webhook.delete().then((function(){return m.redraw()}))},e}(N()),G=function(t){function e(){return t.apply(this,arguments)||this}l(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.values={},this.services=o().data["fof-webhooks.services"].reduce((function(t,e){return t[e]=o().translator.trans("fof-webhooks.admin.settings.services."+e),t}),{}),this.newWebhook={service:b()("discord"),url:b()(""),loading:b()(!1)},this.loadingData=b()(!0)},n.oncreate=function(e){var n=this;t.prototype.oncreate.call(this,e),Promise.all([o().store.find("fof/webhooks"),this.isTagsEnabled()&&o().store.find("tags")]).then((function(){n.loadingData(!1),m.redraw()}))},n.content=function(){var t=this,e=o().store.all("webhooks");return this.loadingData()?m(_(),null):m("div",{className:"WebhookContent"},m("div",{className:"container"},m("div",{className:"Form-group"},this.buildSettingComponent({type:"boolean",setting:"fof-webhooks.debug",label:o().translator.trans("fof-webhooks.admin.settings.debug_label"),help:o().translator.trans("fof-webhooks.admin.settings.debug_help"),loading:this.loading,onchange:this.updateDebug.bind(this)})),m("hr",null),m("form",null,m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.help.general")),this.isTagsEnabled()&&m("p",{className:"helpText"},o().translator.trans("fof-webhooks.admin.settings.help.tags")),m("fieldset",null,m("div",{className:"Webhooks--Container"},e.map((function(e){return m(U,{webhook:e,services:t.services})})),m("div",{className:"Webhooks--row"},m("div",{className:"Webhook-input"},m(w(),{options:this.services,value:this.newWebhook.service(),onchange:this.newWebhook.service}),m("input",{className:"FormControl Webhook-url",type:"url",placeholder:o().translator.trans("fof-webhooks.admin.settings.help.url"),onchange:f()("value",this.newWebhook.url),onkeypress:this.onkeypress.bind(this)}),m(k(),{type:"button",loading:this.newWebhook.loading(),className:"Button Button--warning Webhook-button",icon:"fas fa-plus",onclick:this.addWebhook.bind(this)}))))))))},n.addWebhook=function(){var t=this;if(!this.newWebhook.loading())return this.newWebhook.loading(!0),o().store.createRecord("webhooks").save({service:this.newWebhook.service(),url:this.newWebhook.url()}).then((function(){t.newWebhook.service("discord"),t.newWebhook.url(""),t.newWebhook.loading(!1),m.redraw()})).catch((function(){t.newWebhook.loading(!1),m.redraw()}))},n.onkeypress=function(t){"Enter"===t.key&&this.addWebhook()},n.changed=function(){var t=this;return this.fields.some((function(e){return t.values[e]()!==(o().data.settings[t.addPrefix(e)]||"")}))},n.isTagsEnabled=function(){return!!flarum.extensions["flarum-tags"]},n.updateDebug=function(t){return this.setting("fof-webhooks.debug")(t),this.saveSettings(new Event(null))},e}(u());o().initializers.add("fof/webhooks",(function(){o().store.models.webhooks=h,r().prototype.webhooks=s().hasMany("webhooks"),o().extensionData.for("fof-webhooks").registerPage(G)}))})(),module.exports={}})();
//# sourceMappingURL=admin.js.map