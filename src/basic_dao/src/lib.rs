mod types;
mod service;
mod env;
mod init;
mod heartbeat;

use ic_cdk_macros::*;
use std::cell::RefCell;
use crate::service::BasicDaoService;
use crate::types::*;

thread_local! {
    /* non-stable */ static SERVICE: RefCell<BasicDaoService> = RefCell::default();
}

#[update]
fn transfer(args: TransferArgs) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().transfer(args))
}

#[query]
fn account_balance() -> Tokens {
    SERVICE.with(|service| service.borrow().account_balance())
}

#[query]
fn list_accounts() -> Vec<Account> {
    SERVICE.with(|service| service.borrow().list_accounts())
}

#[update]
fn submit_proposal(proposal: ProposalPayload) -> Result<u64, String> {
    SERVICE.with(|service| service.borrow_mut().submit_proposal(proposal))
}

#[query]
fn get_proposal(proposal_id: u64) -> Option<Proposal> {
    SERVICE.with(|service| service.borrow().get_proposal(proposal_id))
}

#[query]
fn list_proposals() -> Vec<Proposal> {
    SERVICE.with(|service| service.borrow().list_proposals())
}

#[update]
fn vote(args: VoteArgs) -> Result<ProposalState, String> {
    SERVICE.with(|service| service.borrow_mut().vote(args))
}
