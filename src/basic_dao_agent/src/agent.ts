import type { HttpAgent } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import { DaoClient } from "./canisters/dao/dao.client";
import type {
    Account,
    IDaoClient,
    Proposal,
    ProposalPayload,
    SubmitProposalResult,
    SystemParams,
    Tokens,
    TransferResult,
    UpdateSystemParamsPayload,
    Vote,
    VoteResult,
} from "./canisters/dao/dao.client.interface";

export class BasicDaoAgent {
    private readonly daoCanisterClient: IDaoClient;

    constructor(agent: HttpAgent, daoCanisterId: Principal) {
        this.daoCanisterClient = new DaoClient(agent, daoCanisterId);
    }

    accountBalance(): Promise<Tokens> {
        return this.daoCanisterClient.accountBalance();
    }

    getProposal(proposalId: bigint): Promise<Proposal | undefined> {
        return this.daoCanisterClient.getProposal(proposalId);
    }

    getSystemParams(): Promise<SystemParams> {
        return this.daoCanisterClient.getSystemParams();
    }

    listAccounts(): Promise<Array<Account>> {
        return this.daoCanisterClient.listAccounts();
    }

    listProposals(): Promise<Array<Proposal>> {
        return this.daoCanisterClient.listProposals();
    }

    submitProposal(proposal: ProposalPayload): Promise<SubmitProposalResult> {
        return this.daoCanisterClient.submitProposal(proposal);
    }

    transfer(to: Principal, amount: Tokens): Promise<TransferResult> {
        return this.daoCanisterClient.transfer(to, amount);
    }

    updateSystemParams(params: UpdateSystemParamsPayload): Promise<void> {
        return this.daoCanisterClient.updateSystemParams(params);
    }

    vote(proposalId: bigint, vote: Vote): Promise<VoteResult> {
        return this.daoCanisterClient.vote(proposalId, vote);
    }
}
