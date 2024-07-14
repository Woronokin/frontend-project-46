.PHONY: install gendiff lint lint-fix test test-watch test-coverage publish

install:
	npm install

gendiff:
	./bin/gendiff.js $(file1) $(file2)
	
lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npx jest

test-watch:
	npx jest --watch

test-coverage:
	npx jest --coverage --coverageProvider=v8

publish:
	npm publish --dry-run