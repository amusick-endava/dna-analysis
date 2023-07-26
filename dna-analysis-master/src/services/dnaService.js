const Dna = require("../models/Dna");

class DnaService {
  async saveMutationData(dnaMatrix, hasMutation) {
    const mutation = new Dna({
      has_mutation: hasMutation,
      dna_matrix: dnaMatrix,
    });
    // TODO:: define how to handle dnaMatrix duplicates
    await mutation.save();
  }

  async getStats() {
    const count_mutations = await Dna.count({ has_mutation: true });
    const count_no_mutation = await Dna.count({ has_mutation: false });
    const sum = count_mutations + count_no_mutation;
    const ratio = sum ? Math.round((count_mutations * 100) / sum) / 100 : 0;

    return { count_mutations, count_no_mutation, ratio };
  }
}

module.exports = DnaService;
