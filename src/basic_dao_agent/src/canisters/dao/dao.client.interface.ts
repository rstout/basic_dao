import type { Principal } from "@dfinity/principal";

export interface IDaoClient {
    accountBalance(): Promise<Tokens>;
    getProposal(proposalId: bigint): Promise<Proposal | undefined>;
    getSystemParams(): Promise<SystemParams>;
    listAccounts(): Promise<Array<Account>>;
    listProposals(): Promise<Array<Proposal>>;
    submitProposal(proposal: ProposalPayload): Promise<SubmitProposalResult>;
    transfer(to: Principal, amount: Tokens): Promise<TransferResult>;
    updateSystemParams(params: UpdateSystemParamsPayload): Promise<void>;
    vote(proposalId: bigint, vote: Vote): Promise<VoteResult>;
}

export type Account = { owner: Principal; tokens: Tokens };
export type ErrorMessage = { kind: "error"; message: string };
export type ProposalState = "failed" | "open" | "executing" | "rejected" | "succeeded" | "accepted";
export type SubmitProposalResult = { kind: "success"; proposalId: bigint } | ErrorMessage;
export type Tokens = { amountE8s: bigint };
export type TransferResult = { kind: "success" } | ErrorMessage;
export type Vote = "yes" | "no";
export type VoteResult = { kind: "success"; proposalState: ProposalState } | ErrorMessage;

export type Proposal = {
    id: bigint;
    votesNo: Tokens;
    voters: Array<Principal>;
    state: ProposalState;
    timestamp: bigint;
    proposer: Principal;
    votesYes: Tokens;
    payload: ProposalPayload;
};

export type ProposalPayload = {
    method: string;
    canisterId: Principal;
    message: Array<number>;
};

export type SystemParams = {
    transferFee: Tokens;
    proposalVoteThreshold: Tokens;
    proposalSubmissionDeposit: Tokens;
};

export type UpdateSystemParamsPayload = {
    transferFee: Tokens | undefined;
    proposalVoteThreshold: Tokens | undefined;
    proposalSubmissionDeposit: Tokens | undefined;
};
