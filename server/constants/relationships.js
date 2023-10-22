const RELATIONSHIP_STATUSES = [
  "Single",
  "In a relationship",
  "Engaged",
  "Married",
  "In a civil union",
  "In a domestic partnership",
  "In an open relationship",
  "It's complicated",
  "Separated",
  "Divorced",
  "Widowed",
];

const MALE_RELATIONSHIPS = [
  "Father",
  "Son",
  "Brother",
  "Uncle",
  "Nephew",
  "Cousin",
  "Grandfather",
  "Grandson",
  "Stepbrother",
  "Stepfather",
  "Stepson",
  "Brother-in-law",
  "Father-in-law",
  "Son-in-law",
];

const FEMALE_RELATIONSHIPS = [
  "Mother",
  "Daughter",
  "Sister",
  "Aunt",
  "Niece",
  "Cousin",
  "Grandmother",
  "Granddaughter",
  "Stepsister",
  "Stepmother",
  "Stepdaughter",
  "Sister-in-law",
  "Mother-in-law",
  "Daughter-in-law",
];

const FAMILY_RELATIONSHIPS = [...MALE_RELATIONSHIPS, ...FEMALE_RELATIONSHIPS];

module.exports = {
  RELATIONSHIP_STATUSES,
  FAMILY_RELATIONSHIPS,
};
