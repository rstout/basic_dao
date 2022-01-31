import type { HttpAgent } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import { DaoCanister, idlFactory } from "./candid/idl";
import {
    account,
    candidProposalPayload,
    candidTokens,
    candidUpdateSystemParamsPayload,
    candidVote,
    proposal,
    submitProposalResult,
    systemParams,
    tokens,
    transferResult,
    voteResult,
} from "./mappers";
import { CandidService } from "../candidService";
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
} from "./dao.client.interface";
import { optional, toVoid } from "../../utils/mapping";

export class DaoClient extends CandidService<DaoCanister> implements IDaoClient {
    constructor(agent: HttpAgent, canisterId: Principal) {
        super(agent, idlFactory, canisterId);
    }

    accountBalance(): Promise<Tokens> {
        return this.handleResponse(this.service.account_balance(), tokens);
    }

    getProposal(proposalId: bigint): Promise<Proposal | undefined> {
        return this.handleResponse(this.service.get_proposal(proposalId), (res) =>
            optional(res, proposal)
        );
    }

    getSystemParams(): Promise<SystemParams> {
        return this.handleResponse(this.service.get_system_params(), systemParams);
    }

    listAccounts(): Promise<Array<Account>> {
        return this.handleResponse(this.service.list_accounts(), (res) => res.map(account));
    }

    listProposals(): Promise<Array<Proposal>> {
        return this.handleResponse(this.service.list_proposals(), (res) => res.map(proposal));
    }

    submitProposal(proposal: ProposalPayload): Promise<SubmitProposalResult> {
        return this.handleResponse(
            this.service.submit_proposal(candidProposalPayload(proposal)),
            submitProposalResult
        );
    }

    transfer(to: Principal, amount: Tokens): Promise<TransferResult> {
        return this.handleResponse(
            this.service.transfer({ to, amount: candidTokens(amount) }),
            transferResult
        );
    }

    updateSystemParams(params: UpdateSystemParamsPayload): Promise<void> {
        return this.handleResponse(
            this.service.update_system_params(candidUpdateSystemParamsPayload(params)),
            toVoid
        );
    }

    vote(proposalId: bigint, vote: Vote): Promise<VoteResult> {
        return this.handleResponse(
            this.service.vote({ vote: candidVote(vote), proposal_id: proposalId }),
            voteResult
        );
    }
}
