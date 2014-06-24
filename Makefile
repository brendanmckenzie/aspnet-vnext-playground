
all:
	@echo "Compiling LESS"
	lessc -x src/App.Web/content/style.less > src/App.Web/content/style.css
	uglifyjs src/App.Web/content/vendor/bootstrap/js/*.js \
		-o src/App.Web/content/site.js \
		--source-map src/App.Web/content/site.js.map
