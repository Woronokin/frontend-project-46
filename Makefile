.PHONY: gendiff lint lint-fix 

gendiff:
	./bin/gendiff.js $(file1) $(file2)

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .