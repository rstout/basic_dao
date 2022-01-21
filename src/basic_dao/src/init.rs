use crate::env::CanisterEnvironment;
use crate::SERVICE;
use crate::service::BasicDaoService;
use ic_cdk_macros::init;
use crate::types::{Tokens, SystemParams};
use ic_cdk::export::Principal;
use std::convert::TryFrom;
use std::collections::HashMap;

#[init]
fn init() {
    ic_cdk::setup();

    let env = CanisterEnvironment {};

    let account = Principal::try_from(
        "fwaet-g3gpl-2l6kc-6f2fz-xmbk4-6ipix-42t7o-hcuf5-uk2au-noxpg-uae"
    ).unwrap();

    let mut accounts = HashMap::new();
    accounts.insert(account, Tokens::one() * 100_000);

    let system_params = SystemParams {
        transfer_fee: Tokens { amount_e8s: 10_000 },
        proposal_vote_threshold: Tokens::one() * 100,
        proposal_submission_deposit: Tokens { amount_e8s: 10_000 },
    };

    let init_service = BasicDaoService {
        env: Box::new(env),
        accounts,
        system_params,
        ..Default::default()
    };

    SERVICE.with(|service| *service.borrow_mut() = init_service);
}
