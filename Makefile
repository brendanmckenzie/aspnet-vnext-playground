
all:
	@echo "Compiling LESS"
	lessc -x src/App.Web/content/style.less > src/App.Web/content/style.css
	@echo "Compressing JavaScript"
	uglifyjs \
		src/App.Web/content/vendor/bootstrap/js/tooltip.js \
		src/App.Web/content/vendor/bootstrap/js/popover.js \
		src/App.Web/content/vendor/signalr-hub.js \
		src/App.Web/content/vendor/moment.js \
		src/App.Web/content/vendor/angular-moment.js \
		src/App.Web/content/vendor/angular-ui-router.js \
		src/App.Web/content/site/js/main.js \
		src/App.Web/content/site/js/app/shared/__init__.js \
		src/App.Web/content/site/js/app/shared/PageService.js \
		src/App.Web/content/site/js/app/shared/NavigationCtrl.js \
		src/App.Web/content/site/js/app/shared/HeaderCtrl.js \
		src/App.Web/content/site/js/app/modules/__init__.js \
		src/App.Web/content/site/js/app/modules/home/home.js \
		src/App.Web/content/site/js/app/modules/chat/chat.js \
		-o src/App.Web/content/site.js \
		--source-map src/App.Web/content/site.js.map \
		--source-map-url /content/site.js.map \
		--source-map-root /content/
