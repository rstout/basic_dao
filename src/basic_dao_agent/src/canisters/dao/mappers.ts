import type {
    Account as CandidAccount,
    Proposal as CandidProposal,
    ProposalPayload as CandidProposalPayload,
    ProposalState as CandidProposalState,
    SubmitProposalResult as CandidSubmitProposalResult,
    SystemParams as CandidSystemParams,
    Tokens as CandidTokens,
    TransferResult as CandidTransferResult,
    UpdateSystemParamsPayload as CandidUpdateSystemParamsPayload,
    Vote as CandidVote,
    VoteResult as CandidVoteResult,
} from "./candid/types";
import type {
    Account,
    Proposal,
    ProposalPayload,
    ProposalState,
    SubmitProposalResult,
    SystemParams,
    Tokens,
    TransferResult,
    UpdateSystemParamsPayload,
    Vote,
    VoteResult,
} from "./dao.client.interface";
import { UnsupportedValueError } from "../../utils/error";
import { candidOptional } from "../../utils/mapping";

export function account(candid: CandidAccount): Account {
    return {
        owner: candid.owner,
        tokens: tokens(candid.tokens),
    };
}

export function proposal(candid: CandidProposal): Proposal {
    return {
        id: candid.id,
        votesNo: tokens(candid.votes_no),
        voters: candid.voters,
        state: proposalState(candid.state),
        timestamp: candid.timestamp,
        proposer: candid.proposer,
        votesYes: tokens(candid.votes_yes),
        payload: proposalPayload(candid.payload),
    };
}

export function proposalPayload(candid: CandidProposalPayload): ProposalPayload {
    return {
        method: candid.method,
        canisterId: candid.canister_id,
        message: candid.message,
    };
}

export function proposalState(candid: CandidProposalState): ProposalState {
    if ("Failed" in candid) {
        return "failed";
    }
    if ("Open" in candid) {
        return "open";
    }
    if ("Executing" in candid) {
        return "executing";
    }
    if ("Rejected" in candid) {
        return "rejected";
    }
    if ("Succeeded" in candid) {
        return "succeeded";
    }
    if ("Accepted" in candid) {
        return "accepted";
    }
    throw new UnsupportedValueError("Unexpected CandidProposalState type returned", candid);
}

export function submitProposalResult(candid: CandidSubmitProposalResult): SubmitProposalResult {
    if ("Ok" in candid) {
        return {
            kind: "success",
            proposalId: candid.Ok,
        };
    }
    if ("Err" in candid) {
        return {
            kind: "error",
            message: candid.Err,
        };
    }
    throw new UnsupportedValueError("Unexpected CandidSubmitProposalResult type returned", candid);
}

export function systemParams(candid: CandidSystemParams): SystemParams {
    return {
        transferFee: tokens(candid.transfer_fee),
        proposalVoteThreshold: tokens(candid.proposal_vote_threshold),
        proposalSubmissionDeposit: tokens(candid.proposal_submission_deposit),
    };
}

export function tokens(candid: CandidTokens): Tokens {
    return {
        amountE8s: candid.amount_e8s,
    };
}

export function transferResult(candid: CandidTransferResult): TransferResult {
    if ("Ok" in candid) {
        return { kind: "success" };
    }
    if ("Err" in candid) {
        return {
            kind: "error",
            message: candid.Err,
        };
    }
    throw new UnsupportedValueError("Unexpected CandidTransferResult type returned", candid);
}

export function voteResult(candid: CandidVoteResult): VoteResult {
    if ("Ok" in candid) {
        return {
            kind: "success",
            proposalState: proposalState(candid.Ok),
        };
    }
    if ("Err" in candid) {
        return {
            kind: "error",
            message: candid.Err,
        };
    }
    throw new UnsupportedValueError("Unexpected CandidVoteResult type returned", candid);
}

export function candidProposalPayload(proposal: ProposalPayload): CandidProposalPayload {
    return {
        method: proposal.method,
        canister_id: proposal.canisterId,
        message: proposal.message,
    };
}

export function candidTokens(tokens: Tokens): CandidTokens {
    return {
        amount_e8s: tokens.amountE8s,
    };
}

export function candidUpdateSystemParamsPayload(
    params: UpdateSystemParamsPayload
): CandidUpdateSystemParamsPayload {
    return {
        transfer_fee: candidOptional(params.transferFee, candidTokens),
        proposal_vote_threshold: candidOptional(params.proposalVoteThreshold, candidTokens),
        proposal_submission_deposit: candidOptional(params.proposalSubmissionDeposit, candidTokens),
    };
}

export function candidVote(vote: Vote): CandidVote {
    if (vote === "yes") return { Yes: null };
    if (vote === "no") return { No: null };
    throw new UnsupportedValueError("Unexpected Vote type", vote);
}
