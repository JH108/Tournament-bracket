angular.module('tournament', [])
  .controller('enterTeams', function($scope, Teams) {

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
        url: '/'
      }).then(function(res) {
        console.log('console log is here', res);
        return res.data;
      });
    };

    var addNewTeam = function(team) {
      return $http({
        method: 'POST',
        url: '/',
        data: team
      });
    }

    return {
      getAllTeams: getAllTeams,
      addNewTeam: addNewTeam
    };

  })