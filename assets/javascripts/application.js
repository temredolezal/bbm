MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
});

SportsScore = Backbone.Model.extend({});

SportsScores = Backbone.Collection.extend({
  model: SportsScore,
  url: 'data.json',
  parse: function(response){
    return response.scores
  }
});

SportsScoreView = Backbone.Marionette.ItemView.extend({
  template: "#sports_score-template",
  tagName: 'tr',
  className: 'sports_score'
});

SportsScoresView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "sports_scores",
  className: "table-striped table-bordered",
  template: "#sports_scores-template",
  itemView: SportsScoreView,  
  appendHtml: function(collectionView, itemView){
    collectionView.$("tbody").append(itemView.el);
  }
});

MyApp.addInitializer(function(options){
  var sportsScoresView = new SportsScoresView({
    collection: options.scores
  });
  options.scores.fetch({
    success: function() {
      console.log("fetch: success");
      console.log(JSON.stringify(options.scores));
    },
    error: function() {
      console.log("fetch: error");
    }
  });
  MyApp.mainRegion.show(sportsScoresView);
});

$(document).ready(function(){
  var scores = new SportsScores();
  MyApp.start({scores: scores});
});
