define(["config","suluproduct/models/product-addon","text!suluproduct/components/products/components/addons/overlay.html","text!suluproduct/components/products/components/addons/price.html"],function(a,b,c,d){"use strict";var e=null,f=null,g=null,h={datagridInstanceName:"product-addon-datagrid",toolbarInstanceName:"product-addon-toolbar",overlayInstanceName:"product-addon-overlay",selectInstanceName:"product-addon-select",priceListElementId:"#addon-price-list",loaderElementClass:".loader"},i=function(){this.sandbox.on("sulu.toolbar.delete",function(){k.call(this)}.bind(this)),this.sandbox.on("product.state.change",function(a){l.call(this,a)},this),this.sandbox.on("sulu.toolbar.save",function(){u.call(this)},this),this.sandbox.on("sulu.products.saved",function(){m.call(this)},this),this.sandbox.on("husky.datagrid."+h.datagridInstanceName+".number.selections",function(a){n.call(this,a)},this),this.sandbox.on("husky.auto-complete.addons-search.select",function(a){o.call(this,a)},this)},j=function(){this.sandbox.dom.on(this.$el,"change",function(a){p.call(this,a)}.bind(this),".change-price")},k=function(){this.sandbox.emit("sulu.product.delete",this.options.data.id)},l=function(a){this.options.data&&this.options.data.attributes.status&&this.options.data.attributes.status.id===a.id||(this.status=a,this.options.data.attributes.status=this.status,s.call(this,!1))},m=function(){s.call(this,!0),this.options.data.attributes.status=this.status},n=function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+h.toolbarInstanceName+".item."+b,"deleteSelected",!1)},o=function(a){this.sandbox.dom.empty(this.$find(h.priceListElementId)),q.call(this,h.priceListElementId);var a=$.getJSON("api/products/"+a.id+"?locale="+this.options.locale);a.done(function(a){y.call(this,a,null)}.bind(this))},p=function(a){var b=$(a.currentTarget),c=b.is(":checked"),d=this.sandbox.dom.find("#addon-price-"+b.data("currency"));d.prop("disabled",!c)},q=function(a){var b=this.sandbox.dom.createElement('<div class="'+h.loaderClass+'"/>'),c=this.sandbox.dom.find(a);this.sandbox.dom.append(c,b),this.sandbox.start([{name:"loader@husky",options:{el:b,size:"60px",color:"#ccc"}}])},r=function(){this.sandbox.dom.remove("."+h.loaderClass)},s=function(a){a!==this.productSaved&&(a?this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0):this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)),this.productSaved=a},t=function(){if(!this.currenciesRequest){var a="api/currencies?flat=true&locale="+this.options.locale;this.currenciesRequest=$.getJSON(a,function(a){e=a._embedded.currencies}.bind(this))}return this.currenciesRequest},u=function(){this.options.data.attributes.status=this.status,this.sandbox.emit("sulu.products.save",this.options.data.attributes,!0),this.saved=!1},v=function(){var a,c="post";if(null!==f){null!==g?(a=b.findOrCreate({id:g.id}),c="put"):a=new b,a.set({addon:f.id});var d=[];t.call(this).done(function(){this.sandbox.util.foreach(e,function(a){var b=this.sandbox.dom.find("#change-price-"+a.code,this.$el);if(b[0]&&b[0].checked){var c={};c.currency=a.code;var e=this.sandbox.parseFloat(this.sandbox.dom.val("#addon-price-"+a.code));isNaN(e)||(c.value=e,d.push(c))}}.bind(this))}.bind(this)),a.set({prices:d}),a.saveToProduct(this.options.data.id,{type:c,success:function(){this.sandbox.emit("husky.datagrid."+h.datagridInstanceName+".update"),this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0)}.bind(this),error:function(){this.sandbox.emit("sulu.labels.error.show","product.product-addons.save-error")}.bind(this)})}},w=function(){this.sandbox.emit("husky.datagrid."+h.datagridInstanceName+".items.get-selected",function(a){x.call(this,a)}.bind(this))},x=function(a){this.sandbox.util.foreach(a,function(a){var b=$.ajax("api/addons/"+a,{method:"delete"});b.done(function(){this.sandbox.emit("husky.datagrid."+h.datagridInstanceName+".record.remove",a),this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0)}.bind(this)),b.fail(function(){this.sandbox.emit("sulu.labels.error.show","product.product-addons.remove-error")}.bind(this))}.bind(this))},y=function(a,b){f=a,g=b,t.call(this).done(function(){var c,f=[],g=null,i={},j={};this.sandbox.util.foreach(a.prices,function(a){i[a.currency.code]=a.price}.bind(this)),null!==b&&this.sandbox.util.foreach(b.prices,function(a){j[a.currency.code]=a.price}.bind(this)),this.sandbox.util.foreach(e,function(a){g={},g.id=a.id,g.defaultPrice=this.sandbox.numberFormat(0,"n"),i[a.code]&&(g.defaultPrice=this.sandbox.numberFormat(i[a.code],"n")),g.price=g.defaultPrice,j[a.code]&&(g.price=this.sandbox.numberFormat(j[a.code],"n")),g.currencyCode=a.code,g.overwritten=g.defaultPrice==g.price?!1:!0,f.push(g),g=null}.bind(this)),c=this.$find(h.priceListElementId),r.call(this),this.sandbox.util.foreach(f,function(a){a.translate=this.sandbox.translate;var b=this.sandbox.util.template(d,a);this.sandbox.dom.append(c,b)}.bind(this))}.bind(this))},z=function(b){var c=a.get("suluproduct.components.autocomplete.default");c.instanceName="addons-search",c.el="#addons-search-field",c.remoteUrl="/admin/api/products?flat=true&searchFields=number,name&fields=id,name,number&type=3",c.noNewValues=!0,c.fields=[{id:"number",width:"60px"},{id:"name"}],null!==b&&(c.value=b.addon),this.sandbox.start([{name:"auto-complete@husky",options:c}])},A=function(a){var b=this.sandbox.dom.createElement(this.sandbox.util.template(c,{translate:this.sandbox.translate})),d=this.sandbox.dom.createElement("<div>");this.sandbox.dom.append(this.$el,d),this.sandbox.start([{name:"overlay@husky",options:{el:d,supportKeyInput:!1,title:this.sandbox.translate(a),skin:"wide",openOnStart:!0,removeOnClose:!0,instanceName:h.overlayInstanceName,data:b,okCallback:v.bind(this)}}])},B=function(){A.call(this,"product.product-addons.add"),z.call(this,null)},C=function(a){A.call(this,"product.product-addons.edit"),this.sandbox.once("husky.overlay.product-addon-overlay.opened",function(){q.call(this,h.priceListElementId)}.bind(this));var b=$.getJSON("api/addons/"+a+"?locale="+this.options.locale);b.done(function(a){z.call(this,a),this.sandbox.once("husky.auto-complete.addons-search.initialized",function(){this.sandbox.dom.attr(this.$find("#addons-search"),"disabled","disabled")}.bind(this)),y.call(this,a.addon,a)}.bind(this))},D=function(){this.sandbox.sulu.initListToolbarAndList.call(this,"addons","api/addon/fields",{el:"#product-addons-toolbar",instanceName:h.toolbarInstanceName,hasSearch:!1,template:this.sandbox.sulu.buttons.get({add:{options:{callback:B.bind(this)}},deleteSelected:{options:{callback:w.bind(this)}}})},{el:"#product-addons-list",url:"api/products/"+this.options.data.id+"/addons?flat=true",instanceName:h.datagridInstanceName,resultKey:"addons",actionCallback:C.bind(this),viewOptions:{table:{selectItem:{type:"checkbox"}}}})},E=function(){this.sandbox.start("#product-addons-form"),D.call(this)};return{name:"Sulu Product Addons View",templates:["/admin/product/template/product/addons"],render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0])),E.call(this)},initialize:function(){i.call(this),j.call(this),this.status=a.get("product.status.inactive"),this.options.data&&(this.status=this.options.data.attributes.status),this.sandbox.emit("product.state.change",this.status),this.render(),this.sandbox.emit("sulu.header.toolbar.item.disable","save",!1)}}});