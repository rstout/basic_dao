export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat64 });
  const SystemParams = IDL.Record({
    'transfer_fee' : Tokens,
    'proposal_vote_threshold' : Tokens,
    'proposal_submission_deposit' : Tokens,
  });
  const Account = IDL.Record({ 'owner' : IDL.Principal, 'tokens' : Tokens });
  const ProposalState = IDL.Variant({
    'Failed' : IDL.Text,
    'Open' : IDL.Null,
    'Executing' : IDL.Null,
    'Rejected' : IDL.Null,
    'Succeeded' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const ProposalPayload = IDL.Record({
    'method' : IDL.Text,
    'canister_id' : IDL.Principal,
    'message' : IDL.Vec(IDL.Nat8),
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'votes_no' : Tokens,
    'voters' : IDL.Vec(IDL.Principal),
    'state' : ProposalState,
    'timestamp' : IDL.Nat64,
    'proposer' : IDL.Principal,
    'votes_yes' : Tokens,
    'payload' : ProposalPayload,
  });
  const BasicDaoStableStorage = IDL.Record({
    'system_params' : SystemParams,
    'accounts' : IDL.Vec(Account),
    'proposals' : IDL.Vec(Proposal),
  });
  const SubmitProposalResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : IDL.Text,
  });
  const TransferArgs = IDL.Record({ 'to' : IDL.Principal, 'amount' : Tokens });
  const TransferResult = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const UpdateSystemParamsPayload = IDL.Record({
    'transfer_fee' : IDL.Opt(Tokens),
    'proposal_vote_threshold' : IDL.Opt(Tokens),
    'proposal_submission_deposit' : IDL.Opt(Tokens),
  });
  const Vote = IDL.Variant({ 'No' : IDL.Null, 'Yes' : IDL.Null });
  const VoteArgs = IDL.Record({ 'vote' : Vote, 'proposal_id' : IDL.Nat64 });
  const VoteResult = IDL.Variant({ 'Ok' : ProposalState, 'Err' : IDL.Text });
  return IDL.Service({
    'account_balance' : IDL.Func([], [Tokens], ['query']),
    'get_proposal' : IDL.Func([IDL.Nat64], [IDL.Opt(Proposal)], []),
    'get_system_params' : IDL.Func([], [SystemParams], []),
    'list_accounts' : IDL.Func([], [IDL.Vec(Account)], ['query']),
    'list_proposals' : IDL.Func([], [IDL.Vec(Proposal)], []),
    'submit_proposal' : IDL.Func([ProposalPayload], [SubmitProposalResult], []),
    'transfer' : IDL.Func([TransferArgs], [TransferResult], []),
    'update_system_params' : IDL.Func([UpdateSystemParamsPayload], [], []),
    'vote' : IDL.Func([VoteArgs], [VoteResult], []),
  });
};
export const init = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat64 });
  const SystemParams = IDL.Record({
    'transfer_fee' : Tokens,
    'proposal_vote_threshold' : Tokens,
    'proposal_submission_deposit' : Tokens,
  });
  const Account = IDL.Record({ 'owner' : IDL.Principal, 'tokens' : Tokens });
  const ProposalState = IDL.Variant({
    'Failed' : IDL.Text,
    'Open' : IDL.Null,
    'Executing' : IDL.Null,
    'Rejected' : IDL.Null,
    'Succeeded' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const ProposalPayload = IDL.Record({
    'method' : IDL.Text,
    'canister_id' : IDL.Principal,
    'message' : IDL.Vec(IDL.Nat8),
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'votes_no' : Tokens,
    'voters' : IDL.Vec(IDL.Principal),
    'state' : ProposalState,
    'timestamp' : IDL.Nat64,
    'proposer' : IDL.Principal,
    'votes_yes' : Tokens,
    'payload' : ProposalPayload,
  });
  const BasicDaoStableStorage = IDL.Record({
    'system_params' : SystemParams,
    'accounts' : IDL.Vec(Account),
    'proposals' : IDL.Vec(Proposal),
  });
  return [BasicDaoStableStorage];
};
