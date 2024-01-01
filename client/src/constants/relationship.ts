enum RelationshipStatus {
  single = "Single",
  inRelationship = "In a relationship",
  engaged = "Engaged",
  married = "Married",
  inCivilUnion = "In a civil union",
  inDomesticPartnership = "In a domestic partnership",
  inOpenRelationship = "In an open relationship",
  complicated = "It's complicated",
  separated = "Separated",
  divorced = "Divorced",
  widowed = "Widowed",
}

enum MaleRelationship {
  father = "Father",
  son = "Son",
  brother = "Brother",
  uncle = "Uncle",
  nephew = "Nephew",
  cousin = "Cousin",
  grandfather = "Grandfather",
  grandson = "Grandson",
  stepbrother = "Stepbrother",
  stepfather = "Stepfather",
  stepson = "Stepson",
  brotherInLaw = "Brother-in-law",
  fatherInLaw = "Father-in-law",
  sonInLaw = "Son-in-law",
}

enum FemaleRelationship {
  mother = "Mother",
  daughter = "Daughter",
  sister = "Sister",
  aunt = "Aunt",
  niece = "Niece",
  cousin = "Cousin",
  grandmother = "Grandmother",
  granddaughter = "Granddaughter",
  stepsister = "Stepsister",
  stepmother = "Stepmother",
  stepdaughter = "Stepdaughter",
  sisterInLaw = "Sister-in-law",
  motherInLaw = "Mother-in-law",
  daughterInLaw = "Daughter-in-law",
}

export { RelationshipStatus, MaleRelationship, FemaleRelationship };
