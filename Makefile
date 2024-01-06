install:
	rvm use ruby-3.2.2
	bundle install

dev:
	bundle exec jekyll serve