define(["config"],function(a){"use strict";return{initToolbar:function(a,b,c){this.sandbox=a,this.sandbox.once("sulu.header.initialized",function(){var a=this.getToolbarItems(b,c);this.sandbox.emit("sulu.header.set-toolbar",{data:a,groups:[{id:"left",align:"left"},{id:"right",align:"right"}]})},this)},getLanguageChanger:function(){var a,b,c=[];for(a=-1,b=this.sandbox.sulu.locales.length;++a<b;)c.push({title:this.sandbox.sulu.locales[a],locale:this.sandbox.sulu.locales[a]});return c},setProductActive:function(){this.sandbox.emit("product.state.change",a.get("product.status.active").id)},setProductInactive:function(){this.sandbox.emit("product.state.change",a.get("product.status.inactive").id)},getToolbarItems:function(b,c){var d,e;return c?c.id===a.get("product.status.active").id?(d=this.sandbox.translate(a.get("product.status.active").key),e="husky-publish"):(d=this.sandbox.translate(a.get("product.status.inactive").key),e="husky-test"):(d=this.sandbox.translate(a.get("product.status.active").key),e="husky-publish"),[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)},{icon:"gear",iconSize:"large",group:"left",id:"options-button",position:30,items:[{title:this.sandbox.translate("toolbar.delete"),callback:function(){this.sandbox.emit("sulu.header.toolbar.delete")}.bind(this)}]},{id:"workflow",icon:e,title:d,type:"select",group:"left",position:30,items:[{id:"inactive",icon:"husky-test",title:this.sandbox.translate("product.workfow.set.inactive"),callback:this.setProductInactive.bind(this)},{id:"active",icon:"husky-publish",title:this.sandbox.translate("product.workfow.set.active"),callback:this.setProductActive.bind(this)}]},{id:"language",iconSize:"large",group:"right",position:"99",type:"select","class":"highlight-white",title:b,items:this.getLanguageChanger(),itemsOption:{markable:!0,callback:function(a){this.sandbox.emit("sulu.header.language-changed",a.locale)}.bind(this)}}]}}});