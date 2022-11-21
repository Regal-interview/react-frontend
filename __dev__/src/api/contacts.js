const FIRST_NAMES = [
  "Michael",
  "James",
  "John",
  "Robert",
  "David",
  "William",
  "Mary",
  "Christopher",
  "Joseph",
  "Richard",
  "Daniel",
  "Thomas",
  "Matthew",
  "Jennifer",
  "Charles",
  "Anthony",
  "Patricia",
  "Linda",
  "Mark",
  "Elizabeth",
  "Joshua",
  "Steven",
  "Andrew",
  "Kevin",
  "Brian",
  "Barbara",
  "Jessica",
  "Jason",
  "Susan",
  "Timothy",
  "Paul",
  "Kenneth",
  "Lisa",
  "Ryan",
  "Sarah",
  "Karen",
  "Jeffrey",
  "Donald",
  "Ashley",
  "Eric",
  "Jacob",
  "Nicholas",
  "Jonathan",
  "Ronald",
  "Michelle",
  "Kimberly",
  "Nancy",
  "Justin",
  "Sandra",
  "Amanda",
  "Brandon",
  "Stephanie",
  "Emily",
  "Melissa",
  "Gary",
  "Edward",
  "Stephen",
  "Scott",
  "George",
  "Donna",
  "Jose",
  "Rebecca",
  "Deborah",
  "Laura",
  "Cynthia",
  "Carol",
  "Amy",
  "Margaret",
  "Gregory",
  "Sharon",
  "Larry",
  "Angela",
  "Maria",
  "Alexander",
  "Benjamin",
  "Nicole",
  "Kathleen",
  "Patrick",
  "Samantha",
  "Tyler",
  "Samuel",
  "Betty",
  "Brenda",
  "Pamela",
  "Aaron",
  "Kelly",
  "Heather",
  "Rachel",
  "Adam",
  "Christine",
  "Zachary",
  "Debra",
  "Katherine",
  "Dennis",
  "Nathan",
  "Christina",
  "Julie",
  "Jordan",
  "Kyle",
  "Anna",
];

const SURNAMES = [
  "SMITH",
  "JOHNSON",
  "WILLIAMS",
  "BROWN",
  "JONES",
  "MILLER",
  "DAVIS",
  "GARCIA",
  "RODRIGUEZ",
  "WILSON",
  "MARTINEZ",
  "ANDERSON",
  "TAYLOR",
  "THOMAS",
  "HERNANDEZ",
  "MOORE",
  "MARTIN",
  "JACKSON",
  "THOMPSON",
  "WHITE",
  "LOPEZ",
  "LEE",
  "GONZALEZ",
  "HARRIS",
  "CLARK",
  "LEWIS",
  "ROBINSON",
  "WALKER",
  "PEREZ",
  "HALL",
  "YOUNG",
  "ALLEN",
  "SANCHEZ",
  "WRIGHT",
  "KING",
  "SCOTT",
  "GREEN",
  "BAKER",
  "ADAMS",
  "NELSON",
  "HILL",
  "RAMIREZ",
];

const startupTime = new Date();

const ago = (secs) => {
  return new Date(startupTime.getTime() - secs * 1000);
};

const value = (values, idx) => {
  const l = values.length;
  return values[Math.floor(l * idx)];
};

const matches = (filter, firstname, surname) => {
  if (!filter) return true;
  if (firstname.toUpperCase().indexOf(filter) >= 0) return true;
  return surname.indexOf(filter) >= 0;
};

export function* generateContact(total, seed, filter) {
  if (filter.length > 0) {
    filter = filter.toUpperCase();
  } else {
    filter = undefined;
  }

  const next = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < total && seed < 1000; ) {
    const firstname = value(FIRST_NAMES, next());
    const surname = value(SURNAMES, next());
    const phonenumber = `+1 (240) 556-${String(seed).padStart(4, "0")}`;

    let contacted;
    const c = Math.floor(next() * 5000000);
    if (c % 4 === 0) {
      contacted = ago(c);
    }

    if (matches(filter, firstname, surname)) {
      yield [{ id: seed.toString(), firstname, surname, contacted, phonenumber }, seed];
      i++;
    }
  }
}
