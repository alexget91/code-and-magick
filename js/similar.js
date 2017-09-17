'use strict';

// Блок похожих персонажей
(function () {

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.coatColor === window.myWizard.coatColor) {
      rank += 2;
    }
    if (wizard.eyesColor === window.myWizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };

  var wizardsComparator = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  };

  var updateFilter = function () {
    window.render(wizards.sort(wizardsComparator));
  };

  var onLoadSuccess = function (data) {
    wizards = data.map(function (it) {
      return new window.Wizard(it);
    });
    updateFilter();
  };


  window.myWizard.onChange = function () {
    window.debounce(updateFilter);
  };

  window.backend.load(onLoadSuccess, window.backend.onLoadError);

})();
