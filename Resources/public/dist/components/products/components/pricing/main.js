define(["config"],function(a){"use strict";var b="#product-pricing-form",c=60,d=function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/pricing")),j.call(this),g.call(this,this.options.data)},e=function(){this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.products.delete",this.sandbox.dom.val("#id"))}.bind(this)),this.sandbox.on("product.state.change",function(a){this.options.data.status&&this.options.data.status.id===a||(this.status={id:a},i.call(this,!1))},this),this.sandbox.on("sulu.header.toolbar.save",function(){f.call(this)},this),this.sandbox.on("sulu.products.saved",function(){i.call(this,!0)},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.products.list")},this)},f=function(){if(this.sandbox.form.validate(b)){var a=this.sandbox.form.getData(b);a.status=this.status,this.sandbox.emit("sulu.products.save",a)}},g=function(a){var c=this.sandbox.form.create(b);c.initialized.then(function(){h.call(this,a),this.sandbox.form.addCollectionFilter(b,"prices",function(a){return""===a.id&&delete a.id,""!==a.price})}.bind(this))},h=function(a){this.sandbox.form.setData(b,a).then(function(){this.sandbox.start(b)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},i=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},j=function(){var a="pim.product.title",b=[{title:"navigation.pim"},{title:"pim.products.title"}];this.options.data&&this.options.data.name&&(a=this.options.data.name),a=this.sandbox.util.cropTail(a,c),this.sandbox.emit("sulu.header.set-title",a),b.push(this.options.data&&this.options.data.number?{title:"#"+this.options.data.number}:{title:"pim.product.title"}),this.sandbox.emit("sulu.header.set-breadcrumb",b)},k=function(){this.sandbox.dom.on(b,"change",function(){i.call(this,!1)}.bind(this),"select"),this.sandbox.dom.on(b,"keyup",function(){i.call(this,!1)}.bind(this),"input, textarea"),this.sandbox.on("sulu.content.changed",function(){i.call(this,!1)}.bind(this)),this.sandbox.on("husky.select.tax-class.selected.item",function(){i.call(this,!1)}.bind(this))};return{name:"Sulu Product Pricing View",view:!0,templates:["/admin/product/template/product/pricing"],initialize:function(){this.status=this.options.data?this.options.data.status:a.get("product.status.active"),e.call(this),d.call(this),k.call(this)}}});