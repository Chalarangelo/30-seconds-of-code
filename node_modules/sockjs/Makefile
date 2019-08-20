.PHONY: all serve clean

COFFEE:=./node_modules/.bin/coffee

#### General

all: build

build: src/*coffee
	@$(COFFEE) -v > /dev/null
	$(COFFEE) -o lib/ -c src/*.coffee

clean:
	rm -f lib/*.js


#### Testing

test_server: build
	node tests/test_server/server.js

serve:
	@if [ -e .pidfile.pid ]; then		\
		kill `cat .pidfile.pid`;	\
		rm .pidfile.pid;		\
	fi

	@while [ 1 ]; do				\
		make build;				\
		echo " [*] Running http server";	\
		make test_server &			\
		SRVPID=$$!;				\
		echo $$SRVPID > .pidfile.pid;		\
		echo " [*] Server pid: $$SRVPID";	\
		inotifywait -r -q -e modify .;		\
		kill `cat .pidfile.pid`;		\
		rm -f .pidfile.pid;			\
		sleep 0.1;				\
	done
