enum Reaction {
  like = "like",
  love = "love",
  haha = "haha",
  wow = "wow",
  sad = "sad",
  angry = "angry",
}

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

enum Month {
  Jan = 1,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

const MAX_AGE = 200;
const NAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 40;

export {
  Month,
  Gender,
  Reaction,
  MAX_AGE,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
};
