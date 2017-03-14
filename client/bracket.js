var width = 720;
var height = 540;

var tree = d3.layout.tree()
    .separation(function(a, b) {a.parent === b.parent ? 1 : 2}) // put logic for who won
    .size([height, width]);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

// Angular directive
  // create a directive
  // somehow make directive use the d3 code to update the dom
  // write d3 code to make a bracket structure
  // have bracket update once all scores are in

// Angular dynamic lists
  // create pairings for each team in teams
  // once all teams have a score
    // compare each teams pairing and add the team that won to the winners array
  // either add new list next to the old list with the winners from the last round as its entrants
    // or re-render current list with the winning teams
  // repeat process until only 1 team is left

  // should the losing team be removed from db or not? I think not, because we would want the ability to display all the teams that were in the tournament if needed.
  // winners table should be dynamic and constantly updating while the tournament is going on
  // this plan fails if I ever have to account for multiple users

