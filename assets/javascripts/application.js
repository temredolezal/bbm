MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
});

AngryCat = Backbone.Model.extend({});

AngryCats = Backbone.Collection.extend({
  model: AngryCat,
  url: 'data.json',
  parse: function(response){
    return response.catz
  }
});

AngryCatView = Backbone.Marionette.ItemView.extend({
  template: "#angry_cat-template",
  tagName: 'tr',
  className: 'angry_cat'
});

AngryCatsView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "angry_cats",
  className: "table-striped table-bordered",
  template: "#angry_cats-template",
  itemView: AngryCatView,  
  appendHtml: function(collectionView, itemView){
    collectionView.$("tbody").append(itemView.el);
  }
});

MyApp.addInitializer(function(options){
  var angryCatsView = new AngryCatsView({
    collection: options.cats
  });
  options.cats.fetch();
  MyApp.mainRegion.show(angryCatsView);
});

$(document).ready(function(){
  var cats = new AngryCats();
  MyApp.start({cats: cats});
});
