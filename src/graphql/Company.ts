import { extendType, intArg, nonNull, objectType } from "nexus";
import faker from "@faker-js/faker";

const createCompany = (id: number) => ({
  id,
  name: faker.company.companyName(),
  postedAt: faker.date.past(),
  description: faker.lorem.paragraph(),
  expiredAt: faker.date.future(),
  address: faker.lorem.sentences(undefined, "\n"),
  city: faker.address.city(),
  email: faker.internet.email(),
  image: faker.image.business(undefined, undefined, true),
  jobs: () => {
    const n = Math.random() * 3 + 1;
    const j = [];
    for (let i = 0; i < n; i++) {
      j.push(createJob(i));
    }
    return j;
  },
});

const createJob = (id: number) => ({
  id,
  title: faker.name.jobTitle(),
  description: faker.lorem.paragraph(),
  qualifications: () => {
    const n = Math.random() * 4 + 1;
    const q = [];
    for (let i = 0; i < n; i++) {
      q.push(faker.lorem.sentence());
    }
    return q;
  },
});

export const Job = objectType({
  name: "Job",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.list.nonNull.string("qualifications");
  },
});

export const Company = objectType({
  name: "Company",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("postedAt");
    t.nonNull.string("expiredAt");
    t.nonNull.string("description");
    t.nonNull.string("address");
    t.nonNull.string("email");
    t.nonNull.string("city");
    t.nonNull.string("image");
    t.nonNull.list.nonNull.field("jobs", { type: "Job" });
  },
});

export const CompanyQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getCompanyJobs", {
      type: "Company",
      resolve: (_parent, _args, _ctx) => {
        const n = Math.random() * 3 + 1;
        const c = [];
        for (let i = 0; i < 10; i++) {
          c.push(createCompany(i));
        }
        return c;
      },
    });
  },
});
