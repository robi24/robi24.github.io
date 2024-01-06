install:
	# rvm use ruby-3.2.2
	bundle install

dev:
	bundle exec jekyll serve

# use to check if the post is included in the build
build-check:
	jekyll build --verbose