angular.module('App.Shared')
.factory('PageService', function () {
	var self = this;
	this.__suffix = 'ASP.NET vNext';
	this._title = this.__suffix;

	this.title = function () {
		return self._title;
	}

	this.setTitle = function (text) {
		if (text) {
			self._title = text + ' - ' + self.__suffix;
		}
		else {
			self._title = self.__suffix;
		}
	}

	return this;
});