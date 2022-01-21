use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use std::ops::AddAssign;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct BasicDaoStableStorage {
    accounts: Vec<Account>,
    proposals: Vec<Proposal>,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, PartialEq, PartialOrd)]
pub struct Tokens {
    pub amount_e8s: u64,
}

impl AddAssign for Tokens {
    fn add_assign(&mut self, other: Self) {
        self.amount_e8s += other.amount_e8s;
    }
}

#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum ProposalState {
    Open,
    Accepted,
    Executing,
    Succeeded,
    Rejected,
    Failed(String),
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Proposal {
    pub id: u64,
    pub timestamp: u64,
    pub proposer: Principal,
    pub payload: ProposalPayload,
    pub state: ProposalState,
    pub votes_yes: Tokens,
    pub votes_no: Tokens,
    pub voters: Vec<Principal>,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct ProposalPayload {
    pub canister_id: Principal,
    pub method: String,
    pub message: Vec<u8>,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub enum Vote {
    Yes,
    No,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Account {
    pub owner: Principal,
    pub tokens: Tokens,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct TransferArgs {
    pub to: Principal,
    pub amount: Tokens,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct VoteArgs {
    pub proposal_id: u64,
    pub vote: Vote,
}
