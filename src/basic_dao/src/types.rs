use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct BasicDaoStableStorage {
    accounts: Vec<Account>,
    proposals: Vec<Proposal>,
}

// #[derive(Clone, Debug, Default, CandidType, Deserialize)]
// pub struct BasicDaoService {
//     accounts: HashMap<Principal, Tokens>,
//     proposals: HashMap<u64, Proposal>,
//     env: Box<dyn Environment>,
// }

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct Tokens {
    pub amount_e8s: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub enum ProposalState {
    Open,
    Accepted,
    Executing,
    Succeeded,
    Rejected,
    Failed,
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
pub enum TransferResult {
    Ok,
    Error(String),
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct VoteArgs {
    pub proposal_id: u64,
    pub vote: Vote,
}
