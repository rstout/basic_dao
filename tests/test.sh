#!ic-repl                                                                                             
load "prelude.sh";

identity Alice;
identity Bob;
identity Carol;

"Installing wasm";

let wasm = file "../target/wasm32-unknown-unknown/release/basic_dao_opt.wasm";


let init = record {
    accounts = vec { record { owner = principal "x4vjn-rrapj-c2kqe-a6m2b-7pzdl-ntmc4-riutz-5bylw-2q2bh-ds5h2-lae"; tokens = record { amount_e8s = 10000000:nat64 }; }; };
    proposals = (vec {} : vec record {
         id : nat64;
         votes_no : record { amount_e8s : nat64 };
         voters : vec principal;
         state : variant {
           Failed : text;
           Open;
           Executing;
           Rejected;
           Succeeded;
           Accepted;
         };
         timestamp : nat64;
         proposer : principal;
         votes_yes : record { amount_e8s : nat64 };
         payload : record {
           method : text;
           canister_id : principal;
           message : vec nat8;
         };
       });
    system_params = record {
        transfer_fee = record { amount_e8s = 10000:nat64 };
        proposal_vote_threshold = record { amount_e8s = 10000000:nat64 };
        proposal_submission_deposit = record { amount_e8s = 10000:nat64 };
    };
};

let basic_dao = install(wasm, init, null);

"wasm installed";

"Initial accounts:";
call basic_dao.list_accounts();
