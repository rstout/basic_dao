.PHONY: all
all: build

.PHONY: build
.SILENT: build
build:
	cargo build --target wasm32-unknown-unknown --package  basic_dao --release
	ic-cdk-optimizer target/wasm32-unknown-unknown/release/basic_dao.wasm -o target/wasm32-unknown-unknown/release/basic_dao_opt.wasm

.PHONY: install
.SILENT: install
install: build
	dfx canister --no-wallet  install --all

.PHONY: upgrade
.SILENT: upgrade
upgrade: build
	dfx canister --no-wallet  install --all --mode=reinstall

.PHONY: test
.SILENT: test
test: upgrade
	$(eval publisher_id := $(shell dfx canister id publisher))
	dfx canister call subscriber setup_subscribe '(principal "$(publisher_id)","Apples")'
	dfx canister call subscriber get_count \
		| grep '(0 : nat64)' && echo 'PASS'
	dfx canister call publisher publish '(record { "topic" = "Apples"; "value" = 2 })'
	sleep 2 # Wait for update.
	dfx canister call subscriber get_count \
		| grep '(2 : nat64)' && echo 'PASS'
	dfx canister call publisher publish '(record { "topic" = "Bananas"; "value" = 3 })'
	sleep 2 # Wait for update.
	dfx canister call subscriber get_count \
		| grep '(2 : nat64)' && echo 'PASS'

.PHONY: clean
.SILENT: clean
clean:
	rm -fr .dfx
