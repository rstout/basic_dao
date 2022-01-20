use crate::env::CanisterEnvironment;
use crate::SERVICE;
use crate::service::BasicDaoService;
use ic_cdk_macros::init;

#[init]
fn init() {
    ic_cdk::setup();

    let env = CanisterEnvironment {};
    let init_service = BasicDaoService {
        env: Box::new(env),
        ..Default::default()
    };

    SERVICE.with(|service| *service.borrow_mut() = init_service);
}
