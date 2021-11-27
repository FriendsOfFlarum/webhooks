module.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=17)}([function(t,e){t.exports=flarum.core.compat["admin/app"]},function(t,e){t.exports=flarum.core.compat["common/Model"]},function(t,e){t.exports=flarum.core.compat["common/utils/Stream"]},function(t,e){t.exports=flarum.core.compat["common/components/Button"]},function(t,e){t.exports=flarum.core.compat["common/utils/withAttr"]},function(t,e){t.exports=flarum.core.compat["common/components/Select"]},function(t,e){t.exports=flarum.core.compat["common/components/Dropdown"]},function(t,e){t.exports=flarum.core.compat["common/components/Alert"]},function(t,e){t.exports=flarum.core.compat["common/components/Switch"]},function(t,e){t.exports=flarum.core.compat["common/models/Forum"]},function(t,e){t.exports=flarum.core.compat["admin/components/ExtensionPage"]},function(t,e){t.exports=flarum.core.compat["common/components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["common/Component"]},function(t,e){t.exports=flarum.core.compat["common/helpers/icon"]},function(t,e){t.exports=flarum.core.compat["common/models/Group"]},function(t,e){t.exports=flarum.core.compat["common/components/Modal"]},function(t,e){t.exports=flarum.core.compat["tags/common/helpers/tagIcon"]},function(t,e,o){"use strict";o.r(e);var n=o(0),a=o.n(n),s=o(1),r=o.n(s),i=o(9),l=o.n(i);function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,u(t,e)}var h=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))||this).id=r.a.attribute("id"),e.service=r.a.attribute("service"),e.url=r.a.attribute("url"),e.error=r.a.attribute("error"),e.events=r.a.attribute("events"),e.tagId=r.a.attribute("tag_id"),e.groupId=r.a.attribute("group_id"),e.extraText=r.a.attribute("extra_text"),e.isValid=r.a.attribute("is_valid",Boolean),e.usePlainText=r.a.attribute("use_plain_text",Boolean),e.maxPostContentLength=r.a.attribute("max_post_content_length"),e}c(e,t);var o=e.prototype;return o.apiEndpoint=function(){return"/fof/webhooks"+(this.exists?"/"+this.data.id:"")},o.tag=function(){return a.a.store.getById("tags",this.tagId())},e}(r.a),d=o(10),f=o.n(d),p=o(2),b=o.n(p),g=o(4),k=o.n(g),v=o(3),w=o.n(v),x=o(5),y=o.n(x),_=o(11),N=o.n(_),W=o(12),T=o.n(W),P=o(6),C=o.n(P),B=o(7),I=o.n(B),O=o(8),j=o.n(O),F=o(13),L=o.n(F),S=o(14),M=o.n(S),E=o(15),D=function(t){function e(){return t.apply(this,arguments)||this}c(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.webhook=this.attrs.webhook;var o=a.a.data["fof-webhooks.events"];this.groupId=b()(this.webhook.groupId()||M.a.GUEST_ID),this.extraText=b()(this.webhook.extraText()||""),this.usePlainText=b()(this.webhook.usePlainText()),this.maxPostContentLength=b()(this.webhook.maxPostContentLength()),this.events=function(t,e){var o=Object.keys(t),n=Object.values(t);return o.map("function"==typeof e?e:function(t){return t[e]}).reduce((function(t,e,a){return t[e]||(t[e]={}),t[e][o[a]]=n[a],t}),{})}(o.reduce((function(t,e){var o=/((?:[a-z]+\\?)+?)\\Events?\\([a-z]+)/i.exec(e);if(!o)return t.other.push({full:e,name:e}),t.other=t.other.sort(),t;var n=o[1].toLowerCase().replace("\\",".");return t[n]||(t[n]=[]),t[n]=t[n].concat({full:e,name:o[2]}).sort(),t}),{other:[]}),(function(t){return t.split(".")[0]}))},o.className=function(){return"Modal--medium"},o.title=function(){return a.a.translator.trans("fof-webhooks.admin.settings.modal.title")},o.content=function(){var t=this,e={2:"fas fa-globe",3:"fas fa-user"},o=a.a.store.getById("groups",this.groupId());return m("div",{className:"FofWebhooksModal Modal-body"},m("form",{className:"Form",onsubmit:this.onsubmit.bind(this)},m(j.a,{state:this.usePlainText(),onchange:this.usePlainText},a.a.translator.trans("fof-webhooks.admin.settings.modal.use_plain_text_label")),m("div",{className:"Form-group"},m("label",{className:"label"},a.a.translator.trans("fof-webhooks.admin.settings.modal.max_post_content_length_label")),m("p",{className:"helpText"},a.a.translator.trans("fof-webhooks.admin.settings.modal.max_post_content_length_help")),m("input",{type:"number",min:"0",className:"FormControl",bidi:this.maxPostContentLength,onkeypress:this.onkeypress.bind(this)})),m("div",{className:"Form-group hasLoading"},m("label",{className:"label"},a.a.translator.trans("fof-webhooks.admin.settings.modal.extra_text_label")),m("p",{className:"helpText"},a.a.translator.trans("fof-webhooks.admin.settings.modal.extra_text_help")),m("input",{type:"text",className:"FormControl",bidi:this.extraText,onkeypress:this.onkeypress.bind(this)})),m("div",{className:"Form-group"},m("label",{className:"label"},a.a.translator.trans("fof-webhooks.admin.settings.modal.group_label")),m("p",{className:"helpText"},a.a.translator.trans("fof-webhooks.admin.settings.modal.group_help")),m(C.a,{label:[L()(o.icon()||e[o.id()]),o.namePlural()],buttonClassName:"Button Button--danger"},a.a.store.all("groups").filter((function(t){return["1","2"].includes(t.id())})).map((function(n){return m(w.a,{active:o.id()===n.id(),disabled:o.id()===n.id(),icon:n.icon()||e[n.id()],onclick:function(){return t.groupId(n.id())}},n.namePlural())})))),m("div",{className:"Form-group Webhook-events"},m("label",{className:"label"},a.a.translator.trans("fof-webhooks.admin.settings.modal.events_label")),a.a.translator.trans("fof-webhooks.admin.settings.modal.description"),Object.entries(this.events).map((function(e){var o,n=e[1];return m("div",null,Object.entries(n).sort((o=0,function(t,e){var n=t[o].toUpperCase(),a=e[o].toUpperCase();return n<a?-1:n>a?1:0})).map((function(e){var o=e[0],n=e[1];return n.length?m("div",null,m("h3",null,t.translate(o)),n.map((function(e){return m(j.a,{state:t.webhook.events().includes(e.full),onchange:t.onchange.bind(t,e.full)},t.translate(o,e.name.toLowerCase()))}))):null})))}))),m("div",{className:"Form-group"},m(w.a,{type:"submit",className:"Button Button--primary",loading:this.loading,disabled:!this.isDirty()},a.a.translator.trans("core.admin.settings.submit_button")))))},o.translate=function(t,e){return void 0===e&&(e="title"),a.a.translator.trans("fof-webhooks.admin.settings.actions."+t+"."+e)},o.isDirty=function(){return this.extraText()!=this.webhook.extraText()||this.groupId()!==this.webhook.groupId()||this.usePlainText()!==this.webhook.usePlainText()||this.maxPostContentLength()!=this.webhook.maxPostContentLength()},o.onsubmit=function(t){var e=this;return t.preventDefault(),this.loading=!0,this.webhook.save({extraText:this.extraText(),group_id:this.groupId(),use_plain_text:this.usePlainText(),max_post_content_length:this.maxPostContentLength()||0}).then((function(){e.loading=!1,m.redraw()})).catch((function(){e.loading=!1,m.redraw()}))},o.onkeypress=function(t){"Enter"===t.key&&this.onsubmit(t)},o.onchange=function(t,e,o){o.loading=!0;var n=this.webhook.events();return e?n.push(t):n.splice(n.indexOf(t),1),this.attrs.updateWebhook(n).then((function(){o.loading=!1,m.redraw()}))},e}(o.n(E).a),z=function(t){function e(){return t.apply(this,arguments)||this}c(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.webhook=this.attrs.webhook,this.services=this.attrs.services,this.url=b()(this.webhook.url()),this.service=b()(this.webhook.service()),this.events=b()(this.webhook.events()),this.error=b()(this.webhook.error()),this.loading={}},n.view=function(){var t=this,e=this.webhook,n=this.services,s=e.service(),r=[e.error&&e.error()];n[s]?e.isValid()?!e.tag()&&e.attribute("tag_id")&&r.push(a.a.translator.trans("fof-webhooks.admin.errors.tag_invalid")):r.push(a.a.translator.trans("fof-webhooks.admin.errors.url_invalid")):r.push(a.a.translator.trans("fof-webhooks.admin.errors.service_not_found",{service:s}));var i=o(16),l=e.tag(),u=!!this.loading.tag_id;return m("div",{className:"Webhooks--row","data-webhook-id":e.id()},m("div",{className:"Webhook-input"},m(y.a,{options:n,value:s,onchange:this.update("service"),disabled:this.loading.service}),m("input",{className:"FormControl Webhook-url",type:"url",value:this.url(),onchange:k()("value",this.update("url")),disabled:this.loading.url,placeholder:a.a.translator.trans("fof-webhooks.admin.settings.help.url")}),i&&m(C.a,{buttonClassName:"Button",label:l?m("span",null,!u&&i(l,{className:"Button-icon"})," ",l.name()):a.a.translator.trans("fof-webhooks.admin.settings.item.tag_any_label"),icon:u?"fas fa-spinner fa-spin":!!l||"fas fa-tag",caretIcon:null},m(w.a,{icon:"fas fa-tag",onclick:function(){return t.update("tag_id")(null)}},a.a.translator.trans("fof-webhooks.admin.settings.item.tag_any_label")),m("hr",null),a.a.store.all("tags").map((function(e){return m(w.a,{icon:!0,onclick:function(){return t.update("tag_id")(e.id())}},i(e,{className:"Button-icon"})," ",e.name())}))),m(w.a,{type:"button",className:"Button Webhook-button",icon:"fas fa-edit",onclick:function(){return a.a.modal.show(D,{webhook:e,updateWebhook:t.update("events")})}}),m(w.a,{type:"button",className:"Button Button--warning Webhook-button",icon:"fas fa-times",onclick:this.delete.bind(this)})),!this.events().length&&m(I.a,{className:"Webhook-error",dismissible:!1},a.a.translator.trans("fof-webhooks.admin.settings.help.disabled")),r.filter(Boolean).map((function(t){return m(I.a,{className:"Webhook-error",type:"error",dismissible:!1},a.a.translator.trans(t))})))},n.update=function(t){var e=this;return function(o){var n;return e.loading[t]=!0,e.webhook.save((n={},n[t]=o,n)).catch((function(){})).then((function(){e.loading[t]=!1,e[t]&&e[t](o),m.redraw()}))}},n.delete=function(){return this.webhook.delete().then((function(){return m.redraw()}))},e}(T.a),A=function(t){function e(){return t.apply(this,arguments)||this}c(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.values={},this.services=a.a.data["fof-webhooks.services"].reduce((function(t,e){return t[e]=a.a.translator.trans("fof-webhooks.admin.settings.services."+e),t}),{}),this.newWebhook={service:b()("discord"),url:b()(""),loading:b()(!1)},this.loadingTags=this.isTagsEnabled()},o.oncreate=function(e){var o=this;t.prototype.oncreate.call(this,e),this.loadingTags&&a.a.store.find("tags").then((function(){o.loadingTags=!1,m.redraw()}))},o.content=function(){var t=this,e=a.a.store.all("webhooks");return this.loadingTags?m(N.a,null):m("div",{className:"WebhookContent"},m("div",{className:"container"},m("div",{className:"Form-group"},this.buildSettingComponent({type:"boolean",setting:"fof-webhooks.debug",label:a.a.translator.trans("fof-webhooks.admin.settings.debug_label"),help:a.a.translator.trans("fof-webhooks.admin.settings.debug_help"),loading:this.loading,onchange:this.updateDebug.bind(this)})),m("hr",null),m("form",null,m("p",{className:"helpText"},a.a.translator.trans("fof-webhooks.admin.settings.help.general")),m("fieldset",null,m("div",{className:"Webhooks--Container"},e.map((function(e){return m(z,{webhook:e,services:t.services})})),m("div",{className:"Webhooks--row"},m("div",{className:"Webhook-input"},m(y.a,{options:this.services,value:this.newWebhook.service(),onchange:this.newWebhook.service}),m("input",{className:"FormControl Webhook-url",type:"url",placeholder:a.a.translator.trans("fof-webhooks.admin.settings.help.url"),onchange:k()("value",this.newWebhook.url),onkeypress:this.onkeypress.bind(this)}),m(w.a,{type:"button",loading:this.newWebhook.loading(),className:"Button Button--warning Webhook-button",icon:"fas fa-plus",onclick:this.addWebhook.bind(this)}))))))))},o.addWebhook=function(){var t=this;if(!this.newWebhook.loading())return this.newWebhook.loading(!0),a.a.store.createRecord("webhooks").save({service:this.newWebhook.service(),url:this.newWebhook.url()}).then((function(){t.newWebhook.service("discord"),t.newWebhook.url(""),t.newWebhook.loading(!1),m.redraw()})).catch((function(){t.newWebhook.loading(!1),m.redraw()}))},o.onkeypress=function(t){"Enter"===t.key&&this.addWebhook()},o.changed=function(){var t=this;return this.fields.some((function(e){return t.values[e]()!==(a.a.data.settings[t.addPrefix(e)]||"")}))},o.isTagsEnabled=function(){return!!flarum.extensions["flarum-tags"]},o.updateDebug=function(t){return this.setting("fof-webhooks.debug")(t),this.saveSettings(new Event(null))},e}(f.a);a.a.initializers.add("fof/webhooks",(function(){a.a.store.models.webhooks=h,l.a.prototype.webhooks=r.a.hasMany("webhooks"),a.a.extensionData.for("fof-webhooks").registerPage(A)}))}]);
//# sourceMappingURL=admin.js.map