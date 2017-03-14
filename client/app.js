angular.module('tournament', ['ngRoute'])
  .controller('EnterTeams', function($scope, Teams) {


    Teams.getAllTeams().then(function(teams) {
      //console.log('teams were got')
      $scope.teams = teams;
    });

    $scope.addTeam = function(team) {
      Teams.removeTeam(team).then(function() {

      Teams.addNewTeam({name: team})
        .then(function() {
          Teams.getAllTeams()
            .then(function(teams) {
              //console.log('teams were got')
              $scope.teams = teams;
            });
        });
      //$scope.teams.push({name: team});
      })
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

    var addNewTeam = function(team) {
      return $http({
        method: 'POST',
        url: '/api',
        data: team
      });
    };

    var removeTeam = function(team) {
      console.log('app.js team: ', team)
      return $http.delete('/api', team);
    };

    return {
      getAllTeams: getAllTeams,
      addNewTeam: addNewTeam,
      removeTeam: removeTeam
    };

  })
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'EnterTeams'
      })
  })