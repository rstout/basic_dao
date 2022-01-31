rm -f ./types.ts
rm -f ./idl.js
didc bind ../../../../../basic_dao/src/basic_dao.did -t ts > ./types.ts
didc bind ../../../../../basic_dao/src/basic_dao.did -t js > ./idl.js
