import type { Principal } from '@dfinity/principal';
export interface Account { 'owner' : Principal, 'tokens' : Tokens }
export interface BasicDaoStableStorage {
  'system_params' : SystemParams,
  'accounts' : Array<Account>,
  'proposals' : Array<Proposal>,
}
export interface Proposal {
  'id' : bigint,
  'votes_no' : Tokens,
  'voters' : Array<Principal>,
  'state' : ProposalState,
  'timestamp' : bigint,
  'proposer' : Principal,
  'votes_yes' : Tokens,
  'payload' : ProposalPayload,
}
export interface ProposalPayload {
  'method' : string,
  'canister_id' : Principal,
  'message' : Array<number>,
}
export type ProposalState = { 'Failed' : string } |
  { 'Open' : null } |
  { 'Executing' : null } |
  { 'Rejected' : null } |
  { 'Succeeded' : null } |
  { 'Accepted' : null };
export type SubmitProposalResult = { 'Ok' : bigint } |
  { 'Err' : string };
export interface SystemParams {
  'transfer_fee' : Tokens,
  'proposal_vote_threshold' : Tokens,
  'proposal_submission_deposit' : Tokens,
}
export interface Tokens { 'amount_e8s' : bigint }
export interface TransferArgs { 'to' : Principal, 'amount' : Tokens }
export type TransferResult = { 'Ok' : null } |
  { 'Err' : string };
export interface UpdateSystemParamsPayload {
  'transfer_fee' : [] | [Tokens],
  'proposal_vote_threshold' : [] | [Tokens],
  'proposal_submission_deposit' : [] | [Tokens],
}
export type Vote = { 'No' : null } |
  { 'Yes' : null };
export interface VoteArgs { 'vote' : Vote, 'proposal_id' : bigint }
export type VoteResult = { 'Ok' : ProposalState } |
  { 'Err' : string };
export interface _SERVICE {
  'account_balance' : () => Promise<Tokens>,
  'get_proposal' : (arg_0: bigint) => Promise<[] | [Proposal]>,
  'get_system_params' : () => Promise<SystemParams>,
  'list_accounts' : () => Promise<Array<Account>>,
  'list_proposals' : () => Promise<Array<Proposal>>,
  'submit_proposal' : (arg_0: ProposalPayload) => Promise<SubmitProposalResult>,
  'transfer' : (arg_0: TransferArgs) => Promise<TransferResult>,
  'update_system_params' : (arg_0: UpdateSystemParamsPayload) => Promise<
      undefined
    >,
  'vote' : (arg_0: VoteArgs) => Promise<VoteResult>,
}
