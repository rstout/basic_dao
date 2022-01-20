use crate::types::*;
use crate::env::{Environment, EmptyEnvironment};
use ic_cdk::export::Principal;
use std::collections::HashMap;


/// TODO: doc
pub struct BasicDaoService {
    pub env: Box<dyn Environment>,
    pub accounts: HashMap<Principal, Tokens>,
    pub proposals: HashMap<u64, Proposal>,
    pub next_proposal_id: u64,

    // The amount of tokens needed to vote "yes" to accept, or "no" to reject, a proposal
    pub proposal_vote_threshold: Tokens,

    // The amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    pub proposal_submission_deposit: Tokens,
}

impl Default for BasicDaoService {
    fn default() -> Self {
        BasicDaoService {
            env: Box::new(EmptyEnvironment {}),
            accounts: HashMap::new(),
            proposals: HashMap::new(),
            next_proposal_id: 0,
            proposal_vote_threshold: Default::default(),
            proposal_submission_deposit: Default::default(),
        }
    }
}

/// TODO: doc
impl BasicDaoService {
    /// Transfer tokens from the caller's account to another account
    pub fn transfer(&mut self, _args: TransferArgs) -> TransferResult {
        TransferResult::Ok
    }

    /// Return the account balance of the caller
    pub fn account_balance(&self) -> Tokens {
        let caller = self.env.caller();
        self.accounts.get(&caller).cloned().unwrap_or_else(|| Default::default())
    }

    /// Lists all accounts
    pub fn list_accounts(&self) -> Vec<Account> {
        self.accounts
            .clone()
            .into_iter()
            .map(|(owner, tokens)| Account { owner, tokens })
            .collect()
    }

    /// Submit a proposal
    pub fn submit_proposal(&mut self, payload: ProposalPayload) -> u64 {
        let proposal_id = self.next_proposal_id;
        self.next_proposal_id += 1;

        let proposal = Proposal {
            id: proposal_id,
            timestamp: self.env.now(),
            proposer: self.env.caller(),
            payload,
            state: ProposalState::Open,
            votes_yes: Default::default(),
            votes_no: Default::default(),
        };

        self.proposals.insert(proposal_id, proposal);
        proposal_id
    }

    // TODO: doc
    pub fn get_proposal(&self, proposal_id: u64) -> Option<Proposal> {
        self.proposals.get(&proposal_id).cloned()
    }

    // TODO: doc
    pub fn vote(&mut self, _args: VoteArgs) {
        ()
    }

    // TODO: doc
    pub fn list_proposals(&self) -> Vec<Proposal> {
        self.proposals.values().cloned().collect()
    }

    // TODO: doc
    pub async fn execute_proposal(&mut self, proposal: Proposal) {
        todo!()
    }
}