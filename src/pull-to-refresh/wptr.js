import Hammer from 'hammerjs';

export default function WebPullToRefresh() {
  'use strict';

  var defaults = {
    
    contentEl: 'content',

    ptrEl: 'ptr',

    bodyEl: document.body,

    distanceToRefresh: 70,

    loadingFunction: false,

    resistance: 2.5
  };

  var options = {};

  var pan = {
    enabled: false,
    distance: 0,
    startingPositionY: 0
  };

  var bodyClass = defaults.bodyEl.classList;

  var init = function(params) {
    params = params || {}
    options = {
      contentEl: params.contentEl || document.getElementById(defaults.contentEl),
      ptrEl: params.ptrEl || document.getElementById(defaults.ptrEl),
      bodyEl: params.bodyEl || defaults.bodyEl,
      distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
      loadingFunction: params.loadingFunction || defaults.loadingFunction,
      resistance: params.resistance || defaults.resistance,
      hammerOptions: params.hammerOptions || {}
    };

    if (!options.contentEl || !options.ptrEl) {
      return false;
    }

    bodyClass = options.bodyEl.classList;

    var h = new Hammer(options.contentEl, options.hammerOptions);

    h.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    h.on('panstart', _panStart);
    h.on('pandown', _panDown);
    h.on('panup', _panUp);
    h.on('panend', _panEnd);
  };

  var _panStart = function(e) {
    pan.startingPositionY = options.bodyEl.scrollTop;

    if (pan.startingPositionY === 0) {
      pan.enabled = true;
    }
  }

  var _panDown = function(e) {
    if (!pan.enabled) {
      return;
    }

    e.preventDefault();
    pan.distance = e.distance / options.resistance;

    _setContentPan();
    _setBodyClass();
  };

  var _panUp = function(e) {
    if (!pan.enabled || pan.distance === 0) {
      return;
    }

    e.preventDefault();

    if (pan.distance < e.distance / options.resistance) {
      pan.distance = 0;
    } else {
      pan.distance = e.distance / options.resistance;
    }

    _setContentPan();
    _setBodyClass();
  };

  var _setContentPan = function() {
    options.contentEl.style.transform = options.contentEl.style.webkitTransform = 'translate3d(0, ' + pan.distance + 'px, 0)';
    options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = 'translate3d(0, ' + (pan.distance - options.ptrEl.offsetHeight) + 'px, 0)';
  };

  var _setBodyClass = function() {
    if (pan.distance > options.distanceToRefresh) {
      bodyClass.add('ptr-refresh');
    } else {
      bodyClass.remove('ptr-refresh');
    }
  };

  var _panEnd = function(e) {
    if (!pan.enabled) {
      return;
    }

    e.preventDefault();

    options.contentEl.style.transform = options.contentEl.style.webkitTransform = '';
    options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = '';

    if (options.bodyEl.classList.contains('ptr-refresh')) {
      _doLoading();
    } else {
      _doReset();
    }

    pan.distance = 0;
    pan.enabled = false;
  };

  var _doLoading = function() {
    bodyClass.add('ptr-loading');

    if (!options.loadingFunction) {
      return _doReset();
    }

    var loadingPromise = options.loadingFunction();

    setTimeout(function() {
      loadingPromise.then(_doReset);
    }, 1000);
  };

  var _doReset = function() {
    bodyClass.remove('ptr-loading');
    bodyClass.remove('ptr-refresh');
    bodyClass.add('ptr-reset');

    var bodyClassRemove = function() {
      bodyClass.remove('ptr-reset');
      options.bodyEl.removeEventListener('transitionend', bodyClassRemove, false);
    };

    options.bodyEl.addEventListener('transitionend', bodyClassRemove, false);
  };

  return {
    init: init
  }
  
}