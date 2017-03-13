angular.module('tournament', ['ngRoute'])
  .controller('EnterTeams', function($scope, Teams) {

    Teams.getAllTeams().then(function(teams) {
      // console.log(teams)
      $scope.teams = teams;
    });

    $scope.addTeam = function(team) {
      Teams.addNewTeam({name: team});
      //$scope.teams.push({name: team});
    }

  })
  .factory('Teams', function($http) {

    var getAllTeams = function() {
      return $http({
        method: 'GET',
        url: '/api'
      }).then(function(res) {
        console.log('console log is here', res);
        return res.data;
      });
    };

    var addNewTeam = function(team) {
      return $http({
        method: 'POST',
        url: '/api',
        data: team
      });
    }

    return {
      getAllTeams: getAllTeams,
      addNewTeam: addNewTeam
    };

  })
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'EnterTeams'
      })
  })