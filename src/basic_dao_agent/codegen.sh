rm -f ./src/canisters/dao/candid/types.ts
rm -f ./src/canisters/dao/candid/idl.js
didc bind ../basic_dao/src/basic_dao.did -t ts > ./src/canisters/dao/candid/types.ts
didc bind ../basic_dao/src/basic_dao.did -t js > ./src/canisters/dao/candid/idl.js
