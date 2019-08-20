## Requirements
In order to install and setup your local development environment, there are some prerequisites:

* git
* gcc/clang/llvm (Linux: build tools, Mac OS X: XCode w/ Command Line Tools)
* ruby w/ bundler

OS X:
First you'll need to install XCode which you can now get from the AppStore installed on your mac. After you download that and run it, then run this on the command line:

````
xcode-select --install
````

## Cloning the Projects

First, clone the project and then add a line to your `~/.bash_profile` that will let other programs know where the LibSass dev files are.

````
git clone git@github.com:sass/libsass.git
cd libsass
echo "export SASS_LIBSASS_PATH=$(pwd)" >> ~/.bash_profile

````

Then, if you run the "bootstrap" script, it should clone all the other required projects.

````
./script/bootstrap
````

You should now have a `sass-spec` and `sassc` folder within the libsass folder. Both of these are clones of their respective git projects. If you want to do a pull request, remember to work in those folders. For instance, if you want to add a test (see other documentation for how to do that), make sure to commit it to your *fork* of the sass-spec github project. Also, whenever you are running tests, make sure to `pull` from the origin! We want to make sure we are testing against the newest libsass, sassc, and sass-spec!

Now, try and see if you can build the project. We do that with the `make` command.

````
make
````

At this point, if you get an error, something is most likely wrong with your compiler installation. Yikes. It's hard to cover how to fix this in an article. Feel free to open an issue and we'll try and help! But, remember, before you do that, googling the error message is your friend! Many problems are solved quickly that way.

## Running The Spec Against LibSass

Then, to run the spec against LibSass, just run:

````
./script/spec
````

If you get an error about `SASS_LIBSASS_PATH`, you may still need to set a variable pointing to the libsass folder, like this:

````
export SASS_LIBSASS_PATH=/Users/you/path/libsass
````

...where the latter part is to the `libsass` directory you've cloned. You can get this path by typing `pwd` in the Terminal

## Running the Spec Against Ruby Sass

Go into the sass-spec folder that should have been cloned earlier with the "bootstrap" command. Run the following.

````
bundle install
./sass-spec.rb
````

Voila! Now you are testing against Sass too!

