angular.module('tournament', [])
  .controller('enterTeams', function($scope) {
    $scope.teams = [];

    $scope.addTeam = function(team) {
      $scope.teams.push({name: team});
    }
  })