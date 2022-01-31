export function optional<A, B>(candid: [] | [A], mapper: (a: A) => B): B | undefined {
    if (candid === []) {
        return undefined;
    }
    return candid[0] !== undefined ? mapper(candid[0]) : undefined;
}

export function candidOptional<D, A>(value: D | undefined, mapper: (d: D) => A): [] | [A] {
    return value ? [mapper(value)] : [];
}

export function toVoid(_x: unknown): void {
    return;
}
