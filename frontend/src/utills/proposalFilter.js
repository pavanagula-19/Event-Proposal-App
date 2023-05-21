export const proposalFilter = (filters, proposals) => {
  const {
    wedding,
    birthday,
    reception,
    charity,
    party,
    productLaunch,
    formal,
    inFormal,
    internal,
    external,
    budget_0_25000,
    budget_25001_50000,
    budget_50001_75000,
    budget_75001_100000,
    budget_gt_100000,
  } = filters;

  let final = [];
  let filteredProposals = proposals;

  if (
    wedding ||
    birthday ||
    reception ||
    charity ||
    party ||
    productLaunch ||
    formal ||
    inFormal ||
    internal ||
    external ||
    budget_0_25000 ||
    budget_25001_50000 ||
    budget_50001_75000 ||
    budget_75001_100000 ||
    budget_gt_100000
  ) {
    if (wedding || birthday || reception || charity || party || productLaunch) {
      const eventTypeFilters = ["Wedding", "Birthday", "Reception", "Charity", "Party", "Product launch"];
      const eventTypeArr = proposals.filter(({ eventType }) =>
        eventTypeFilters.includes(eventType)
      );
      if (eventTypeArr.length === 0) return [];
      filteredProposals = eventTypeArr;
      final = eventTypeArr;
    }

    if (formal || inFormal || internal || external) {
      const proposalTypeFilters = ["Formal", "In-Formal", "Internal", "External"];
      const proposalTypeArr = filteredProposals.filter(({ proposalType }) =>
        proposalTypeFilters.includes(proposalType)
      );
      if (proposalTypeArr.length === 0) return [];
      filteredProposals = proposalTypeArr;
      final = proposalTypeArr;
    }

    if (
      budget_0_25000 ||
      budget_25001_50000 ||
      budget_50001_75000 ||
      budget_75001_100000 ||
      budget_gt_100000
    ) {
      const budgetArr = [];

      if (budget_0_25000) {
        const temp = filteredProposals.filter(({ budget }) => budget >= 0 && budget <= 25000);
        budgetArr.push(...temp);
      }
      if (budget_25001_50000) {
        const temp = filteredProposals.filter(({ budget }) => budget >= 25001 && budget <= 50000);
        budgetArr.push(...temp);
      }
      if (budget_50001_75000) {
        const temp = filteredProposals.filter(({ budget }) => budget >= 50001 && budget <= 75000);
        budgetArr.push(...temp);
      }
      if (budget_75001_100000) {
        const temp = filteredProposals.filter(({ budget }) => budget >= 75001 && budget <= 100000);
        budgetArr.push(...temp);
      }
      if (budget_gt_100000) {
        const temp = filteredProposals.filter(({ budget }) => budget > 100000);
        budgetArr.push(...temp);
      }

      if (budgetArr.length === 0) return [];
      final = budgetArr;
    }

    return final;
  } else {
    return false;
  }
};
