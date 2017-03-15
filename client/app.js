angular.module('tournament', ['ngRoute'])
  .controller('EnterTeams', function($scope, Teams) {


    Teams.getAllTeams().then(function(teams) {
      //console.log('teams were got')
      $scope.teams = teams;
    });

    $scope.pairTeams = function(teams) {
      $scope.pairs = [];
      for(var i = 0; i < teams.length; i += 2) {
        if (teams[i + 1] !== undefined) {
          $scope.pairs.push([teams[i], teams[i + 1]]);
        } else {
          $scope.pairs.push([teams[teams.length - 1]]);
        }
      }
    };

    $scope.addScore = function(score, teamName) {
      console.log('add score', score + ' ' + teamName);
      Teams.addScore({name: teamName, score: score});
    };

    $scope.removeTeam = function(teamName) {
      //console.log('controller: ', teamName);
      Teams.removeTeam(teamName).then(function() {
        Teams.getAllTeams().then(function(teams) {
          $scope.teams = teams;
        });
      });
    };

    $scope.addTeam = function(team) {

      Teams.addNewTeam({name: team})
        .then(function() {
          Teams.getAllTeams()
            .then(function(teams) {
              //console.log('teams were got')
              $scope.teams = teams;
            });
        });
      //$scope.teams.push({name: team});

      $scope.newTeam = '';
    }

  })
  .factory('Teams', function($http) {

    var getAllTeams = function() {
      return $http({
        method: 'GET',
        url: '/api'
      }).then(function(res) {
        //console.log('console log is here', res);
        return res.data;
      });
    };

    var addScore = function(teamData) {
      return $http({
        method: 'POST',
        url: '/api/score',
        data: teamData
      });
    };

    var addNewTeam = function(team) {
      return $http({
        method: 'POST',
        url: '/api',
        data: team
      });
    };

    var removeTeam = function(teamName) {
      //console.log('factory: ', teamName);
      return $http({
        method: 'DELETE',
        url: '/api/' + teamName
      });
    };

    return {
      getAllTeams: getAllTeams,
      addNewTeam: addNewTeam,
      addScore: addScore,
      removeTeam: removeTeam
    };

  })
  // .directive('bracketVisualization', function(Teams) {

  //   var margin = 20,
  //     width = 960,
  //     height = 500 - margin;

  //   return {
  //     restrict: E,
  //     scope: {
  //       val: '=',
  //       grouped: '='
  //     }

  //   };

  // })
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'EnterTeams'
      })
  })