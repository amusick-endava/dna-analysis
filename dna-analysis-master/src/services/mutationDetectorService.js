class MutationDetectorService {
  hasMutation(dnaMatrix) {
    for (let i = 0; i < dnaMatrix.length; i++) {
      let memory = {
        horizontalCount: 0,
        horizontalLetter: "",
        verticalCount: 0,
        verticalLetter: "",
      };

      for (let j = 0; j < dnaMatrix.length; j++) {
        if (
          this.hasHorizontalMutation(dnaMatrix, memory, i, j) ||
          this.hasVerticalMutation(dnaMatrix, memory, i, j) ||
          this.hasDownhillDiagonalMutation(dnaMatrix, i, j) ||
          this.hasUphillDiagonalMutation(dnaMatrix, i, j)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  hasHorizontalMutation(dnaMatrix, mem, i, j) {
    if (dnaMatrix[i][j] === mem.horizontalLetter) {
      mem.horizontalCount++;
      if (mem.horizontalCount === 4) {
        return true;
      }
      mem.horizontalLetter = dnaMatrix[i][j];
    } else {
      mem.horizontalCount = 0;
    }
  }

  hasVerticalMutation(dnaMatrix, mem, i, j) {
    if (dnaMatrix[j][i] === mem.verticalLetter) {
      mem.verticalCount++;
      if (mem.verticalCount === 4) {
        return true;
      }
      mem.verticalLetter = dnaMatrix[j][i];
    } else {
      mem.verticalCount = 0;
    }
  }

  hasDownhillDiagonalMutation(dnaMatrix, i, j) {
    if (i <= dnaMatrix.length - 4 && j <= dnaMatrix.length - 4) {
      let letter = dnaMatrix[i][j];
      if (
        dnaMatrix[i + 1][j + 1] === letter &&
        dnaMatrix[i + 2][j + 2] === letter &&
        dnaMatrix[i + 3][j + 3] === letter
      ) {
        return true;
      }
    }
  }

  hasUphillDiagonalMutation(dnaMatrix, i, j) {
    if (i > 3 && j <= dnaMatrix.length - 4) {
      let letter = dnaMatrix[i][j];
      if (
        dnaMatrix[i - 1][j + 1] === letter &&
        dnaMatrix[i - 2][j + 2] === letter &&
        dnaMatrix[i - 3][j + 3] === letter
      ) {
        return true;
      }
    }
  }
}

module.exports = MutationDetectorService;
