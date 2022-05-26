/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  AboutType: "jurusan" | "organisasi"
  ArticleType: "nonScientific" | "scientific"
  VacancyType: "job" | "scholarship"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  About: { // root type
    description: string; // String!
    images: string[]; // [String!]!
    type: string; // String!
  }
  Article: { // root type
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    postedAt: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
  }
  Company: { // root type
    address: string; // String!
    city: string; // String!
    description: string; // String!
    email: string; // String!
    expiredAt: string; // String!
    id: number; // Int!
    image: string; // String!
    jobs: NexusGenRootTypes['Job'][]; // [Job!]!
    name: string; // String!
    postedAt: string; // String!
  }
  FieldError: { // root type
    field?: string | null; // String
    message?: string | null; // String
  }
  FieldErrors: { // root type
    errors?: Array<NexusGenRootTypes['FieldError'] | null> | null; // [FieldError]
  }
  HeroImage: { // root type
    id: number; // Int!
    image: string; // String!
    message: string; // String!
  }
  Job: { // root type
    description: string; // String!
    id: number; // Int!
    qualifications: string[]; // [String!]!
    title: string; // String!
  }
  Member: { // root type
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    title: string; // String!
  }
  Merch: { // root type
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    price: string; // String!
  }
  News: { // root type
    author: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    tags: string[]; // [String!]!
    title: string; // String!
  }
  Query: {};
  Testimony: { // root type
    description: string; // String!
    endYear: number; // Int!
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    startYear: number; // Int!
  }
  Vacancy: { // root type
    company: string; // String!
    id: number; // Int!
    title: string; // String!
    type: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  About: { // field return type
    description: string; // String!
    images: string[]; // [String!]!
    type: string; // String!
  }
  Article: { // field return type
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    postedAt: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
  }
  Company: { // field return type
    address: string; // String!
    city: string; // String!
    description: string; // String!
    email: string; // String!
    expiredAt: string; // String!
    id: number; // Int!
    image: string; // String!
    jobs: NexusGenRootTypes['Job'][]; // [Job!]!
    name: string; // String!
    postedAt: string; // String!
  }
  FieldError: { // field return type
    field: string | null; // String
    message: string | null; // String
  }
  FieldErrors: { // field return type
    errors: Array<NexusGenRootTypes['FieldError'] | null> | null; // [FieldError]
  }
  HeroImage: { // field return type
    id: number; // Int!
    image: string; // String!
    message: string; // String!
  }
  Job: { // field return type
    description: string; // String!
    id: number; // Int!
    qualifications: string[]; // [String!]!
    title: string; // String!
  }
  Member: { // field return type
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    title: string; // String!
  }
  Merch: { // field return type
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    price: string; // String!
  }
  News: { // field return type
    author: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    tags: string[]; // [String!]!
    title: string; // String!
  }
  Query: { // field return type
    getAbout: NexusGenRootTypes['About'] | null; // About
    getArticle: NexusGenRootTypes['Article'] | null; // Article
    getArticles: NexusGenRootTypes['Article'][]; // [Article!]!
    getCompanyJobs: NexusGenRootTypes['Company'][]; // [Company!]!
    getHeroImages: Array<NexusGenRootTypes['HeroImage'] | null>; // [HeroImage]!
    getMembers: NexusGenRootTypes['Member'][]; // [Member!]!
    getMerchList: NexusGenRootTypes['Merch'][]; // [Merch!]!
    getNews: NexusGenRootTypes['News'] | null; // News
    getNewsItems: NexusGenRootTypes['News'][]; // [News!]!
    getTestimonies: NexusGenRootTypes['Testimony'][]; // [Testimony!]!
    getVacancies: Array<NexusGenRootTypes['Vacancy'] | null>; // [Vacancy]!
  }
  Testimony: { // field return type
    description: string; // String!
    endYear: number; // Int!
    id: number; // Int!
    image: string; // String!
    name: string; // String!
    startYear: number; // Int!
  }
  Vacancy: { // field return type
    company: string; // String!
    id: number; // Int!
    title: string; // String!
    type: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  About: { // field return type name
    description: 'String'
    images: 'String'
    type: 'String'
  }
  Article: { // field return type name
    description: 'String'
    id: 'Int'
    image: 'String'
    postedAt: 'DateTime'
    title: 'String'
  }
  Company: { // field return type name
    address: 'String'
    city: 'String'
    description: 'String'
    email: 'String'
    expiredAt: 'String'
    id: 'Int'
    image: 'String'
    jobs: 'Job'
    name: 'String'
    postedAt: 'String'
  }
  FieldError: { // field return type name
    field: 'String'
    message: 'String'
  }
  FieldErrors: { // field return type name
    errors: 'FieldError'
  }
  HeroImage: { // field return type name
    id: 'Int'
    image: 'String'
    message: 'String'
  }
  Job: { // field return type name
    description: 'String'
    id: 'Int'
    qualifications: 'String'
    title: 'String'
  }
  Member: { // field return type name
    id: 'Int'
    image: 'String'
    name: 'String'
    title: 'String'
  }
  Merch: { // field return type name
    id: 'Int'
    image: 'String'
    name: 'String'
    price: 'String'
  }
  News: { // field return type name
    author: 'String'
    content: 'String'
    createdAt: 'DateTime'
    description: 'String'
    id: 'Int'
    image: 'String'
    tags: 'String'
    title: 'String'
  }
  Query: { // field return type name
    getAbout: 'About'
    getArticle: 'Article'
    getArticles: 'Article'
    getCompanyJobs: 'Company'
    getHeroImages: 'HeroImage'
    getMembers: 'Member'
    getMerchList: 'Merch'
    getNews: 'News'
    getNewsItems: 'News'
    getTestimonies: 'Testimony'
    getVacancies: 'Vacancy'
  }
  Testimony: { // field return type name
    description: 'String'
    endYear: 'Int'
    id: 'Int'
    image: 'String'
    name: 'String'
    startYear: 'Int'
  }
  Vacancy: { // field return type name
    company: 'String'
    id: 'Int'
    title: 'String'
    type: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    getAbout: { // args
      type: NexusGenEnums['AboutType']; // AboutType!
    }
    getArticle: { // args
      id: number; // Int!
    }
    getArticles: { // args
      limit: number; // Int!
      type: NexusGenEnums['ArticleType']; // ArticleType!
    }
    getHeroImages: { // args
      limit: number; // Int!
    }
    getMembers: { // args
      limit: number; // Int!
    }
    getMerchList: { // args
      limit: number; // Int!
    }
    getNews: { // args
      id: number; // Int!
    }
    getNewsItems: { // args
      limit: number; // Int!
    }
    getTestimonies: { // args
      limit: number; // Int!
    }
    getVacancies: { // args
      limit?: number | null; // Int
      type: NexusGenEnums['VacancyType']; // VacancyType!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}