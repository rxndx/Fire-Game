export const makeComputerMove = (matchesLeft, m, computerMatches) => {
    const optimalMove = matchesLeft % (m + 1);

    if (computerMatches % 2 === 0) {
        if (optimalMove > 0 && optimalMove <= m) {
            return optimalMove;
        }
    }

    if (computerMatches % 2 !== 0) {
        for (let i = 1; i <= m; i++) {
            if ((computerMatches + i) % 2 === 0 && i <= matchesLeft) {
                return i;
            }
        }
    }

    if (optimalMove > 0) {
        return Math.min(optimalMove, m);
    }

    return Math.min(m, matchesLeft);
};